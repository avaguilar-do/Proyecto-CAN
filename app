/* ==========================================================================
Programa CAN · Tablero ejecutivo — lógica de la página
JavaScript puro, sin dependencias. Lee los datos de window.CAN_DATA
(data.js). Para probar otra fecha de "hoy" agrega ?hoy=AAAA-MM-DD a la URL.
========================================================================== */
(function () {
"use strict";

const D = window.CAN_DATA;
if (!D) {
const aviso = document.getElementById("error-datos");
if (aviso) aviso.hidden = false;
return;
}

/* ---------------------------------------------------------------------
Utilidades de DOM
--------------------------------------------------------------------- */
function h(tag, attrs, ...kids) {
const el = document.createElement(tag);
if (attrs) {
for (const [k, v] of Object.entries(attrs)) {
if (v === null || v === undefined || v === false) continue;
if (k === "class") el.className = v;
else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
else el.setAttribute(k, v === true ? "" : String(v));
}
}
appendKids(el, kids);
return el;
}
function appendKids(el, kids) {
for (const kid of kids) {
if (kid === null || kid === undefined || kid === false) continue;
if (Array.isArray(kid)) appendKids(el, kid);
else el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
}
}
const $ = (sel) => document.querySelector(sel);
function fill(target, ...kids) {
const el = typeof target === "string" ? $(target) : target;
if (!el) return null;
el.replaceChildren();
appendKids(el, kids);
return el;
}

/* ---------------------------------------------------------------------
Fechas (siempre en hora local, sin desfases por zona horaria)
--------------------------------------------------------------------- */
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function fecha(s) {
if (!s) return null;
const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s).trim());
if (!m) return null;
const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
return d.getMonth() === Number(m[2]) - 1 ? d : null; // descarta fechas imposibles
}
const HOY_SIMULADO = fecha(new URLSearchParams(window.location.search).get("hoy"));
const HOY = HOY_SIMULADO || (function () {
const n = new Date();
return new Date(n.getFullYear(), n.getMonth(), n.getDate());
})();

const dias = (a, b) => Math.round((b - a) / 864e5);
const sumarDias = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const fDM = (d) => d.getDate() + " " + MES[d.getMonth()];
const fCorta = (d) => fDM(d) + " " + d.getFullYear();
const fLarga = (d) => d.getDate() + " de " + MESES[d.getMonth()] + " de " + d.getFullYear();
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function fRango(a, b) {
if (!a) return "";
if (!b || +a === +b) return fCorta(a);
if (a.getFullYear() === b.getFullYear()) {
if (a.getMonth() === b.getMonth()) return a.getDate() + "–" + fCorta(b);
return fDM(a) + " – " + fCorta(b);
}
return fCorta(a) + " – " + fCorta(b);
}

/* ---------------------------------------------------------------------
Mesas y estados
--------------------------------------------------------------------- */
const MESAS = {
programa: "Programa",
decision: "Mesa de decisión",
otorgante: "Mesa Otorgante",
ordenante: "Mesa Ordenante",
habilitadores: "Habilitadores"
};
const tagMesa = (id) => h("span", { class: "tag", "data-mesa": id }, MESAS[id] || id);
const dotMesa = (id) => h("span", { class: "dot", "data-mesa": id, "aria-hidden": "true" });

function estadoActividad(a) {
if (a.estado === "completado") return { k: "hecho", t: "Completada" };
if (a.estado === "continuo") return { k: "continuo", t: "Continuo" };
const ini = fecha(a.inicio);
const fin = fecha(a.fin) || ini;
if (!fin) return { k: "sinfecha", t: a.fechaTexto || "Sin fecha" };
if (fin < HOY) return { k: "vencida", t: "Vencida, confirmar cierre" };
const d = dias(HOY, fin);
if (d <= 14) return { k: "pronto", t: d === 0 ? "Vence hoy" : d === 1 ? "Vence mañana" : "Vence en " + d + " días" };
if (ini && ini <= HOY) return { k: "curso", t: "En curso" };
return { k: "programada", t: "Programada" };
}
const chip = (est) => h("span", { class: "status status--" + est.k }, est.t);

/* Estado de una fila de timeline según el calendario */
function estadoFila(f, a, b) {
if (f.estado === "completado") return { k: "hecho", t: "Completada" };
if (b < HOY) return { k: "pasado", t: "Concluida según calendario" };
if (a <= HOY) return { k: "curso", t: "En curso" };
return { k: "futuro", t: "Programada" };
}

const ACTS = D.actividades.map((a, i) => {
const ini = fecha(a.inicio);
const fin = fecha(a.fin) || ini;
return Object.assign({}, a, { _i: i, _ini: ini, _fin: fin, _est: estadoActividad(a) });
});
const ABIERTA = (a) => a._est.k !== "hecho" && a._est.k !== "continuo";
const RANGO_PROXIMAS = { vencida: 0, pronto: 1, curso: 1, programada: 1, continuo: 2, sinfecha: 3 };
function ordenProximas(x, y) {
const r = RANGO_PROXIMAS[x._est.k] - RANGO_PROXIMAS[y._est.k];
if (r) return r;
if (x._fin && y._fin && +x._fin !== +y._fin) return x._fin - y._fin;
return x._i - y._i;
}
function ordenRealizadas(x, y) {
if (x._fin && y._fin && +x._fin !== +y._fin) return y._fin - x._fin;
return x._i - y._i;
}

/* ---------------------------------------------------------------------
Elementos reutilizables
--------------------------------------------------------------------- */
function actItem(a, compacto) {
const d = a._fin;
const fechaBloque = d
? h("time", { class: "act__date", datetime: a.fin || a.inicio, "data-mesa": a.mesa },
h("span", { class: "act__day" }, d.getDate()),
h("span", { class: "act__mon" }, MES[d.getMonth()]),
h("span", { class: "act__year" }, d.getFullYear()))
: h("span", { class: "act__date", "data-mesa": a.mesa }, h("span", { class: "act__nodate" }, "Sin fecha"));
const rango = a._ini && a._fin && +a._ini !== +a._fin ? fRango(a._ini, a._fin) : null;
const notas = [a.nota, a.fuente].filter(Boolean).join(". ");
return h("li", { class: "act act--" + a._est.k },
fechaBloque,
h("div", { class: "act__body" },
h("p", { class: "act__title" }, a.ref ? h("span", { class: "act__ref" }, a.ref) : null, a.titulo),
h("p", { class: "act__meta" },
tagMesa(a.mesa),
a.responsable ? h("span", null, "Responsable: " + a.responsable) : null,
rango ? h("span", null, rango) : null),
!compacto && notas ? h("p", { class: "act__src" }, notas) : null),
chip(a._est));
}

function lista(titulo, items, variante) {
if (!items || !items.length) return null;
return h("div", { class: "week__list" + (variante ? " week__list--" + variante : "") },
h("h4", null, titulo),
h("ul", null, items.map((t) => h("li", null, t))));
}

/* ---------------------------------------------------------------------
Gantt genérico
cfg: { inicio, fin, grupos:[{mesa, nombre, nota, filas:[...]}],
colorPor: "estado" | "categoria", minWidth, etiqueta }
--------------------------------------------------------------------- */
function meses(t0, t1) {
const out = [];
let y = t0.getFullYear();
let m = t0.getMonth();
while (new Date(y, m, 1) <= t1) {
const iniMes = new Date(y, m, 1);
const finMes = new Date(y, m + 1, 0);
const a = iniMes < t0 ? t0 : iniMes;
const b = finMes > t1 ? t1 : finMes;
const conAnio = out.length === 0 || m === 0;
out.push({ a: a, b: b, label: cap(MES[m]) + (conAnio ? " " + y : "") });
m += 1;
if (m > 11) { m = 0; y += 1; }
}
return out;
}

function gantt(cfg) {
const t0 = fecha(cfg.inicio);
const t1 = fecha(cfg.fin);
const total = dias(t0, t1) + 1;
const pct = (d) => (dias(t0, d) / total) * 100;
const clamp = (v) => Math.max(0, Math.min(100, v));
const unDia = 100 / total;
const ms = meses(t0, t1);
const hoyDentro = HOY >= t0 && HOY <= t1;

const head = h("div", { class: "g-row g-row--head" },
h("div", { class: "g-lab" }, cfg.etiqueta || "Actividad"),
h("div", { class: "g-track" },
ms.map((m) => h("span", {
class: "g-month",
style: "left:" + pct(m.a) + "%;width:" + (dias(m.a, m.b) + 1) * unDia + "%"
}, m.label)),
hoyDentro ? h("span", { class: "g-hoy", style: "left:" + (pct(HOY) + unDia / 2) + "%" }, "Hoy") : null));

const grid = h("div", { class: "g-grid", "aria-hidden": "true" },
ms.slice(1).map((m) => h("span", { class: "g-line", style: "left:" + pct(m.a) + "%" })),
hoyDentro ? h("span", { class: "g-today", style: "left:" + (pct(HOY) + unDia / 2) + "%" }) : null);

const body = h("div", { class: "g-body" }, grid);

cfg.grupos.forEach((g) => {
if (g.nombre) {
body.append(h("div", { class: "g-row g-row--group" },
h("div", { class: "g-lab" },
g.mesa ? dotMesa(g.mesa) : null,
h("span", { class: "g-group-text" }, g.nombre, g.nota ? h("span", { class: "g-note" }, g.nota) : null)),
h("div", { class: "g-track" })));
}
g.filas.forEach((f) => {
const a = fecha(f.inicio);
const b = fecha(f.fin) || a;
if (!a) return;
const est = estadoFila(f, a, b);
const esHito = +a === +b;
let color;
if (cfg.colorPor === "categoria") {
color = "cat-" + f.categoria + (est.k === "pasado" || est.k === "hecho" ? " is-past" : "");
} else {
color = "st-" + est.k;
}
const titulo = f.nombre + ": " + fRango(a, b) + " (" + est.t.toLowerCase() + ")";
const marca = esHito
? h("span", {
class: "g-ms " + color + (f.clave ? " is-key" : ""),
style: "left:" + (pct(a) + unDia / 2) + "%",
title: titulo
})
: h("span", {
class: "g-bar " + color,
style: "left:" + clamp(pct(a)) + "%;width:" + (clamp(pct(b) + unDia) - clamp(pct(a))) + "%",
title: titulo
});
const estadoTexto = est.k === "hecho" ? "Completada" : est.k === "curso" ? "En curso" : null;
body.append(h("div", { class: "g-row" + (est.k === "curso" ? " is-current" : "") },
h("div", { class: "g-lab" },
h("span", { class: "g-name" }, f.nombre),
h("span", { class: "g-dates" }, fRango(a, b) + (estadoTexto ? ". " + estadoTexto : ""))),
h("div", { class: "g-track" }, marca)));
});
});

return h("div", { class: "gantt", style: "--g-min:" + (cfg.minWidth || 900) + "px" },
h("div", { class: "gantt__scroll", tabindex: "0", role: "region", "aria-label": cfg.aria || "Diagrama de Gantt" },
h("div", { class: "gantt__inner" }, head, body)));
}

function leyenda(items) {
return items.map((it) => h("li", null, h("span", { class: "sw " + it.clase, "aria-hidden": "true" }), it.texto));
}

/* =====================================================================
1. TABLERO
===================================================================== */
function renderEncabezado() {
fill("#fecha-corte", fCorta(fecha(D.corte)));
fill("#fecha-hoy", fCorta(HOY) + (HOY_SIMULADO ? " (fecha simulada)" : ""));
const btn = $("#btn-imprimir");
if (btn) btn.addEventListener("click", () => window.print());
}

function renderHero() {
fill("#objetivo-programa", D.programa.objetivo);
fill("#contexto-programa", D.programa.contexto);

const inicioOp = fecha(D.programa.inicioOperaciones);
const faltan = dias(HOY, inicioOp);
let num;
let txt;
if (faltan > 1) { num = faltan.toLocaleString("es-MX"); txt = "días para el inicio de operaciones"; }
else if (faltan === 1) { num = "1"; txt = "día para el inicio de operaciones"; }
else if (faltan === 0) { num = "Hoy"; txt = "inicia la operación del CAN"; }
else { num = String(-faltan); txt = "días desde el inicio de operaciones"; }
fill("#countdown",
h("span", { class: "countdown__num" }, num),
h("span", { class: "countdown__txt" }, txt),
h("span", { class: "countdown__date" }, fLarga(inicioOp)));

/* Ruta de hitos */
const t0 = fecha(D.programa.inicioPrograma);
const t1 = fecha(D.programa.inicioOperaciones);
const total = dias(t0, t1);
const pos = (d) => Math.max(0, Math.min(100, (dias(t0, d) / total) * 100));
const hitos = D.hitos.filter((x) => x.rail).map((x) => Object.assign({}, x, { _f: fecha(x.fecha) }))
.sort((x, y) => x._f - y._f);
const pHoy = pos(HOY);

const stops = [];
let hoyInsertado = false;
const hoyLi = h("li", { class: "rail__now" }, "Hoy, " + fCorta(HOY));
hitos.forEach((x, i) => {
if (!hoyInsertado && x._f > HOY) { stops.push(hoyLi); hoyInsertado = true; }
const p = pos(x._f);
const hecho = x.estado === "completado";
const cls = ["rail__stop", i % 2 === 0 ? "tier-a" : "tier-b"];
if (hecho) cls.push("is-done");
if (x.clave) cls.push("is-key");
if (p < 9) cls.push("is-start");
if (p > 91) cls.push("is-end");
stops.push(h("li", { class: cls.join(" "), style: "--pos:" + p + "%" },
h("span", { class: "rail__dot", "aria-hidden": "true" }),
h("span", { class: "rail__label" },
h("strong", null, fCorta(x._f)),
x.titulo,
hecho ? h("span", { class: "visually-hidden" }, " (completado)") : null)));
});
if (!hoyInsertado) stops.push(hoyLi);

const hoyCls = "rail__today" + (pHoy < 6 ? " is-start" : pHoy > 94 ? " is-end" : "");
const rail = fill("#rail",
h("div", { class: "rail__line", "aria-hidden": "true" }, h("span", { class: "rail__fill" })),
h("div", { class: hoyCls, "aria-hidden": "true" }, h("span", null, "Hoy, " + fDM(HOY))),
h("ol", { class: "rail__stops" }, stops));
rail.style.setProperty("--hoy", pHoy + "%");
}

function renderDecisionesAlertas() {
fill("#decisiones", D.decisiones.map((d) =>
h("li", null,
h("div", { class: "decision__head" },
h("p", { class: "decision__title" }, d.titulo),
h("span", { class: "status status--decision" }, d.estado)),
h("p", { class: "decision__text" }, d.detalle))));

fill("#alertas", D.alertas.map((a) =>
h("li", null,
h("div", { class: "alert__head" },
h("p", { class: "alert__title" }, a.titulo),
h("span", { class: "level level--" + a.nivel }, a.nivel === "alto" ? "Alta" : "Media")),
h("p", { class: "alert__text" }, a.detalle),
a.fuente ? h("p", { class: "alert__src" }, "Fuente: " + a.fuente) : null)));
}

function renderVencimientosResumen() {
const abiertas = ACTS.filter(ABIERTA);
const vencidas = abiertas.filter((a) => a._est.k === "vencida").sort(ordenProximas);
const limite = sumarDias(HOY, 30);
const proximas = abiertas
.filter((a) => a._fin && a._fin >= HOY && a._fin <= limite)
.sort(ordenProximas)
.slice(0, 6);

const partes = [];
if (vencidas.length) {
partes.push(h("div", { class: "overdue", role: "note" },
h("p", null, vencidas.length === 1
? "1 compromiso con fecha vencida espera confirmación de cierre"
: vencidas.length + " compromisos con fecha vencida esperan confirmación de cierre"),
h("ul", null, vencidas.map((a) =>
h("li", null, (a.ref ? a.ref + ": " : "") + a.titulo + " (" + fCorta(a._fin) + ", " + a.responsable + ")")))));
}
partes.push(proximas.length
? h("ul", { class: "acts" }, proximas.map((a) => actItem(a, true)))
: h("p", { class: "empty" }, "Sin compromisos con fecha en los próximos 30 días."));
fill("#vencimientos-resumen", partes);
}

function totalPosiciones(mesa) {
return D.recursos.posiciones.filter((p) => !mesa || p.mesa === mesa).reduce((s, p) => s + p.n, 0);
}

function mesaCard(m) {
const consultor = D.recursos.consultor.find((c) => c.mesa === m.id);
const posiciones = totalPosiciones(m.id);
return h("article", { class: "mesa", "data-mesa": m.id, "aria-labelledby": "mesa-" + m.id },
h("header", { class: "mesa__head" },
h("h4", { id: "mesa-" + m.id }, m.nombre),
h("p", { class: "mesa__sub" }, m.subtitulo)),
h("dl", { class: "mesa__facts" },
m.lideres.map((l) => h("div", null, h("dt", null, l.rol), h("dd", null, l.nombre))),
h("div", null, h("dt", null, "Sesiona"), h("dd", null, m.cadencia))),
h("p", { class: "mesa__obj" }, m.objetivo),
h("h5", null, "Entregables principales"),
h("ul", { class: "mesa__list" }, m.entregables.map((e) => h("li", null, e))),
h("div", { class: "mesa__foot" },
h("span", { class: "mesa__pill" }, "Consultor externo: ", h("strong", null, consultor && consultor.requiere ? "Sí" : "No")),
h("span", { class: "mesa__pill" }, "Posiciones solicitadas: ", h("strong", null, posiciones))),
h("details", null,
h("summary", null, "Integrantes (" + m.integrantes.length + ") y áreas"),
h("p", null, m.integrantes.join(", ") + "."),
h("p", null, "Áreas: " + m.areas.join(", ") + ".")));
}

function renderEstructura() {
const g = D.gobierno;
const principales = ["Project Manager", "Product Owner", "Arquitecto", "Arquitecto de negocio"];
fill("#estructura", h("div", { class: "org" },
h("div", { class: "org__top", "data-mesa": "decision" },
h("h4", null, "Mesa de decisión"),
h("p", null, g.mesaDecision.funcion),
h("p", { class: "org__meta" }, "Sesiona de forma " + g.mesaDecision.cadencia + " y rinde cuentas a " + g.mesaDecision.rindeCuentas + ".")),
h("ul", { class: "org__roles", "aria-label": "Roles de gobierno del programa" },
g.roles.filter((r) => principales.includes(r.rol)).map((r) =>
h("li", null, r.rol + ":", h("strong", null, r.nombre)))),
h("div", { class: "org__mesas" }, D.mesas.map(mesaCard))));
}

function renderArranque() {
fill("#arranque-fecha", "Reportado en la Mesa de decisión del " + fLarga(fecha(D.arranque.fecha)) + ".");
fill("#arranque", h("ul", { class: "progress-list" }, D.arranque.frentes.map((f) => {
const tieneValor = typeof f.avance === "number";
return h("li", null,
h("span", { class: "pl__name" }, f.nombre),
tieneValor
? h("span", { class: "pl__val" }, f.avance + "%")
: h("span", { class: "pl__val" }, h("span", { class: "status status--decision" }, f.estado || "Pendiente")),
tieneValor
? h("div", { class: "bar", role: "img", "aria-label": f.nombre + ": " + f.avance + "% de avance" },
h("span", { class: f.avance >= 100 ? "is-full" : null, style: "width:" + f.avance + "%" }))
: null);
})));
}

function renderMercado() {
const M = D.mercado;
fill("#mercado",
h("div", { class: "figures" }, M.cifras.map((c) =>
h("div", null, h("span", { class: "figure__val" }, c.valor), h("span", { class: "figure__txt" }, c.texto)))),
h("h4", { class: "subhead" }, "Ruta de mercado"),
h("ol", { class: "phases" }, M.fases.map((f) => h("li", null, h("span", null, h("strong", null, f.nombre), ": " + f.detalle)))),
h("h4", { class: "subhead" }, "Estrategia de producto en tres fases"),
h("ol", { class: "phases" }, M.producto.map((f) => h("li", null, h("span", null, h("strong", null, f.nombre), ": " + f.detalle)))),
h("p", { class: "source" }, "Fuente: " + M.fuente));
}

/* =====================================================================
2. ACTIVIDADES
===================================================================== */
let filtroMesa = "todas";

function renderFiltroMesas() {
const opciones = [["todas", "Todas"]].concat(
["decision", "otorgante", "ordenante", "habilitadores"].map((id) => [id, MESAS[id]]));
fill("#filtro-mesas", opciones.map(([id, texto]) => {
const n = id === "todas" ? ACTS.length : ACTS.filter((a) => a.mesa === id).length;
return h("button", {
type: "button",
class: "chip-btn",
"data-mesa": id === "todas" ? null : id,
"data-filtro": id,
"aria-pressed": String(id === filtroMesa),
onclick: () => {
filtroMesa = id;
document.querySelectorAll("#filtro-mesas .chip-btn").forEach((b) =>
b.setAttribute("aria-pressed", String(b.dataset.filtro === id)));
pintarActividades();
}
}, texto, h("span", { class: "chip-btn__n" }, "(" + n + ")"));
}));
}

function pintarActividades() {
const set = ACTS.filter((a) => filtroMesa === "todas" || a.mesa === filtroMesa);
const abiertas = set.filter((a) => a._est.k !== "hecho").sort(ordenProximas);
const hechas = set.filter((a) => a._est.k === "hecho").sort(ordenRealizadas);
const cuenta = (k) => set.filter((a) => a._est.k === k).length;

fill("#act-conteos",
h("li", { class: cuenta("vencida") ? "is-alert" : null }, h("strong", null, cuenta("vencida")), "vencidas por confirmar"),
h("li", null, h("strong", null, cuenta("pronto")), "vencen en 14 días"),
h("li", null, h("strong", null, cuenta("curso")), "en curso"),
h("li", null, h("strong", null, cuenta("programada") + cuenta("sinfecha") + cuenta("continuo")), "programadas o sin fecha"),
h("li", null, h("strong", null, hechas.length), "completadas"));

fill("#lista-proximas", abiertas.length
? abiertas.map((a) => actItem(a))
: h("li", { class: "empty" }, "No hay actividades abiertas para esta mesa."));
fill("#lista-realizadas", hechas.length
? hechas.map((a) => actItem(a))
: h("li", { class: "empty" }, "Todavía no hay actividades completadas para esta mesa."));
}

function renderEDT() {
fill("#edt", D.edt.map((e) =>
h("li", { class: e.codigo.split(".").length > 2 ? "is-sub" : null },
h("span", { class: "edt__code" }, e.codigo),
h("span", null, e.nombre, e.consideracion ? h("span", { class: "edt__note" }, e.consideracion) : null))));
}

/* =====================================================================
3. RESUMEN SEMANAL
===================================================================== */
function rangoSemana(s) {
const a = fecha(s.inicio);
const b = fecha(s.fin);
return fRango(a, b);
}

function renderEstaSemana() {
const lunes = sumarDias(HOY, -((HOY.getDay() + 6) % 7));
const domingo = sumarDias(lunes, 6);
fill("#semana-actual-rango", "Del " + fDM(lunes) + " al " + fCorta(domingo) + ". Se calcula automáticamente con las fechas registradas.");

const abiertas = ACTS.filter(ABIERTA);
const vencen = abiertas.filter((a) => a._fin && a._fin >= HOY && a._fin <= domingo).sort(ordenProximas);
const enCurso = abiertas.filter((a) => a._ini && a._ini <= HOY && a._fin > domingo).sort(ordenProximas);
const vencidas = abiertas.filter((a) => a._est.k === "vencida").sort(ordenProximas);
const horizonte = sumarDias(HOY, 45);
const hitos = D.hitos.map((x) => Object.assign({}, x, { _f: fecha(x.fecha) }))
.filter((x) => x._f > HOY && x._f <= horizonte).sort((x, y) => x._f - y._f);

const col = (titulo, items, fmt, vacio) => h("div", { class: "now-col" },
h("h4", null, titulo + " (" + items.length + ")"),
items.length ? h("ul", null, items.map(fmt)) : h("p", { class: "empty" }, vacio));
const fmtAct = (a) => h("li", null,
(a.ref ? a.ref + ": " : "") + a.titulo,
h("span", { class: "when" }, MESAS[a.mesa] + ". " + (a._fin ? fCorta(a._fin) : "") + (a.responsable ? ". " + a.responsable : "")));

fill("#semana-actual",
col("Vencen esta semana", vencen, fmtAct, "Nada vence esta semana."),
col("En curso", enCurso, fmtAct, "Sin actividades de varias semanas en curso."),
col("Vencidas por confirmar", vencidas, fmtAct, "Sin compromisos vencidos."),
col("Próximos hitos (45 días)", hitos, (x) => h("li", null, x.titulo, h("span", { class: "when" }, fCorta(x._f))), "Sin hitos en los próximos 45 días."));
}

function renderSemanas() {
const semanas = D.semanas.slice().sort((x, y) => fecha(y.inicio) - fecha(x.inicio));
if (!semanas.length) {
fill("#semana-detalle", h("p", { class: "empty" }, "Aún no hay resúmenes semanales. Agrega uno en data.js."));
return;
}
let sel = 0;
const detalle = (s) => {
const a = fecha(s.inicio);
const b = fecha(s.fin);
return [
h("h3", null, "Semana del " + a.getDate() + (a.getMonth() !== b.getMonth() ? " de " + MESES[a.getMonth()] : "") + " al " + fLarga(b)),
h("p", { class: "week__lead" }, s.titular),
s.sesiones && s.sesiones.length
? h("ul", { class: "week__sessions", "aria-label": "Sesiones de la semana" }, s.sesiones.map((x) =>
h("li", { "data-mesa": x.mesa }, dotMesa(x.mesa), x.nombre + ", " + fDM(fecha(x.fecha)))))
: null,
h("h4", null, "Lo más importante"),
h("div", { class: "week__groups" }, Object.entries(s.puntos || {}).map(([mesa, pts]) =>
h("section", { class: "week__group", "data-mesa": mesa },
h("h5", null, dotMesa(mesa), MESAS[mesa] || mesa),
h("ul", null, pts.map((p) => h("li", null, p)))))),
h("div", { class: "split split--tight" },
lista("Acuerdos y decisiones", s.acuerdos),
lista("Alertas", s.alertas, "alert")),
lista("Siguientes pasos", s.siguientes),
s.fuentes ? h("p", { class: "week__src" }, "Fuentes: " + s.fuentes.join("; ") + ".") : null
];
};
const pintar = () => {
document.querySelectorAll("#semanas-indice .week-btn").forEach((b, i) =>
b.setAttribute("aria-current", i === sel ? "true" : "false"));
fill("#semana-detalle", detalle(semanas[sel]));
};
fill("#semanas-indice", semanas.map((s, i) =>
h("li", null, h("button", {
type: "button",
class: "week-btn",
"aria-current": i === sel ? "true" : "false",
onclick: () => { sel = i; pintar(); }
},
h("span", { class: "week-btn__range" }, rangoSemana(s)),
h("span", { class: "week-btn__head" }, s.titular)))));
pintar();
}

/* =====================================================================
4. TIMELINE DEL PROYECTO
===================================================================== */
function renderTimelineProyecto() {
const T = D.timelineProyecto;
fill("#tl-nota", T.nota);
fill("#tl-leyenda", leyenda([
{ clase: "st-hecho", texto: "Completada" },
{ clase: "st-curso", texto: "En curso" },
{ clase: "st-futuro", texto: "Programada" },
{ clase: "st-pasado", texto: "Concluida según calendario" },
{ clase: "sw--ms ms-futuro", texto: "Hito" },
{ clase: "sw--ms ms-key", texto: "Hito regulatorio o arranque" },
{ clase: "sw--today", texto: "Hoy" }
]));

fill("#gantt-proyecto", gantt({
inicio: T.inicio, fin: T.fin, grupos: T.grupos, colorPor: "estado",
minWidth: 980, aria: "Timeline del proyecto por mesa"
}));

const hitos = D.hitos.map((x) => Object.assign({}, x, { _f: fecha(x.fecha) })).sort((x, y) => x._f - y._f);
fill("#hitos-lista", hitos.map((x) => {
const est = x.estado === "completado"
? { k: "hecho", t: "Completado" }
: x._f < HOY ? { k: "vencida", t: "Fecha pasada, confirmar" }
: dias(HOY, x._f) <= 30 ? { k: "pronto", t: "En " + dias(HOY, x._f) + " días" }
: { k: "programada", t: "Faltan " + dias(HOY, x._f) + " días" };
return h("li", { class: x.clave ? "is-key" : null, "data-mesa": x.mesa },
h("span", { class: "ms-date" }, fCorta(x._f)),
h("span", { class: "ms-title" }, x.titulo),
tagMesa(x.mesa), " ", chip(est));
}));
}

/* =====================================================================
5. TIMELINE CECOBAN
===================================================================== */
function renderCecoban() {
const C = D.cecoban;
fill("#cecoban-leyenda", leyenda(
Object.entries(C.categorias).map(([k, v]) => ({ clase: "cat-" + k, texto: v }))
.concat([{ clase: "sw--today", texto: "Hoy" }])));

fill("#gantt-cecoban", gantt({
inicio: C.inicio, fin: C.fin, colorPor: "categoria", minWidth: 1100,
grupos: [{ filas: C.filas }], aria: "Roadmap CECOBAN"
}));

const filas = C.filas.map((f) => {
const a = fecha(f.inicio);
const b = fecha(f.fin) || a;
return { f: f, a: a, b: b, est: estadoFila(f, a, b) };
});
const clase = { hecho: "hecho", pasado: "programada", curso: "curso", futuro: "programada" };
fill("#tabla-cecoban",
h("thead", null, h("tr", null,
h("th", { scope: "col", class: "t-min" }, "Actividad"),
h("th", { scope: "col" }, "Categoría"),
h("th", { scope: "col" }, "Fechas"),
h("th", { scope: "col", class: "num" }, "Días"),
h("th", { scope: "col" }, "Estado"))),
h("tbody", null, filas.map((r) => h("tr", { class: r.est.k === "curso" ? "is-current" : null },
h("th", { scope: "row" }, r.f.nombre),
h("td", null, C.categorias[r.f.categoria] || ""),
h("td", null, fRango(r.a, r.b)),
h("td", { class: "num" }, dias(r.a, r.b) + 1),
h("td", null, h("span", { class: "status status--" + clase[r.est.k] }, r.est.t))))));

/* Flujo operativo */
const flecha = (dir, lado) => {
if (dir === "ambas") return lado === "izq" ? "←" : "→";
if (dir === "derecha") return "→";
return "←";
};
const celdas = [
h("div", { class: "flow__h flow__h--otorgante" }, "Banco otorgante del crédito"),
h("div", { class: "flow__h flow__h--cecoban" }, "CECOBAN, plataforma central"),
h("div", { class: "flow__h flow__h--ordenante" }, "Banco ordenante (recibe la nómina)")
];
D.flujoCecoban.forEach((p, i) => {
celdas.push(
h("div", { class: "flow__cell flow__cell--otorgante" },
h("span", { class: "flow__n" }, i + 1),
h("span", null, h("span", { class: "flow__label" }, "Banco otorgante"), p.otorgante),
h("span", { class: "flow__arrow", "aria-hidden": "true" }, flecha(p.direccion, "izq"))),
h("div", { class: "flow__cell flow__cell--cecoban" },
h("span", null, h("span", { class: "flow__label" }, "CECOBAN"), p.cecoban)),
h("div", { class: "flow__cell flow__cell--ordenante" },
h("span", { class: "flow__arrow", "aria-hidden": "true" }, flecha(p.direccion, "der")),
h("span", null, h("span", { class: "flow__label" }, "Banco ordenante"), p.ordenante)));
});
celdas.push(h("div", { class: "flow__close" }, h("strong", null, "5. "), D.flujoCierre));
fill("#flujo-cecoban", h("div", { class: "flow" }, celdas));

fill("#macroproceso", D.macroproceso.map((p) =>
h("li", null, h("strong", null, p.nombre), p.detalle)));
}

/* =====================================================================
6. REGULATORIO Y AUDITORÍA
===================================================================== */
const claseRiesgo = (nivel) => "risk risk--" + nivel.toLowerCase()
.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
let filtroRiesgo = "todos";

function renderRegulatorio() {
const R = D.regulatorio;
fill("#reg-estatus", R.estatus.map((e) => h("div", null, h("dt", null, e.titulo), h("dd", null, e.texto))));
fill("#reg-plazos", R.plazos.map((p) =>
h("li", null, h("strong", null, p.titulo), h("span", null, p.plazo), h("small", null, "Referencia: " + p.referencia))));
fill("#aud-objetivos", R.objetivosAuditoria.map((o) => h("li", null, o)));

const niveles = [];
R.matriz.forEach((r) => { if (!niveles.includes(r.riesgo)) niveles.push(r.riesgo); });
const orden = ["Crítico", "Alto", "Medio/Alto", "Medio", "Bajo"];
niveles.sort((a, b) => orden.indexOf(a) - orden.indexOf(b));

fill("#filtro-riesgo", [["todos", "Todos", R.matriz.length]].concat(
niveles.map((n) => [n, n, R.matriz.filter((r) => r.riesgo === n).length])).map(([id, texto, n]) =>
h("button", {
type: "button",
class: "chip-btn",
"data-filtro": id,
"aria-pressed": String(id === filtroRiesgo),
onclick: () => {
filtroRiesgo = id;
document.querySelectorAll("#filtro-riesgo .chip-btn").forEach((b) =>
b.setAttribute("aria-pressed", String(b.dataset.filtro === id)));
pintarMatriz();
}
}, texto, h("span", { class: "chip-btn__n" }, "(" + n + ")"))));
pintarMatriz();

fill("#riesgo-defs", R.nivelesRiesgo.map((n) =>
h("div", null, h("dt", null, h("span", { class: claseRiesgo(n.nivel) }, n.nivel)), h("dd", null, n.texto))));
}

function pintarMatriz() {
const filas = D.regulatorio.matriz.filter((r) => filtroRiesgo === "todos" || r.riesgo === filtroRiesgo);
fill("#tabla-matriz",
h("thead", null, h("tr", null,
h("th", { scope: "col", class: "num" }, "#"),
h("th", { scope: "col" }, "Área"),
h("th", { scope: "col" }, "Regulación"),
h("th", { scope: "col", class: "t-min" }, "Qué debe probar Auditoría"),
h("th", { scope: "col", class: "t-min" }, "Evidencia principal"),
h("th", { scope: "col" }, "Riesgo"))),
h("tbody", null, filas.map((r) => h("tr", null,
h("td", { class: "num" }, r.n),
h("th", { scope: "row" }, r.area),
h("td", null, r.regulacion),
h("td", null, r.prueba),
h("td", null, r.evidencia),
h("td", null, h("span", { class: claseRiesgo(r.riesgo) }, r.riesgo))))));
}

/* =====================================================================
7. EQUIPO Y RECURSOS
===================================================================== */
function renderEquipo() {
fill("#roles", D.gobierno.roles.map((r) =>
h("li", null, h("span", { class: "r-rol" }, r.rol), h("span", { class: "r-name" }, r.nombre), h("p", null, r.descripcion))));

const C = D.cadencia;
fill("#cadencia",
h("p", null, "Estado: ", h("span", { class: "status status--decision" }, C.estado)),
h("div", { class: "week-strip" }, C.dias.map((d) =>
h("div", { class: d.mesa ? "is-on" : null, "data-mesa": d.mesa },
h("strong", null, d.dia), d.mesa ? MESAS[d.mesa] : "Sin sesión"))),
h("div", { class: "decision-bar" }, "Mesa de decisión: mensual, última semana de cada mes"),
h("p", { class: "meta", style: "margin-top:.6rem" }, C.nota));

const cols = ["otorgante", "ordenante", "habilitadores"];
fill("#tabla-resp",
h("thead", null, h("tr", null,
h("th", { scope: "col" }, "Responsable"),
h("th", { scope: "col", class: "t-min" }, "Objetivo"),
cols.map((c) => h("th", { scope: "col", class: "center" }, MESAS[c])))),
h("tbody", null, D.responsabilidades.map((r) => h("tr", null,
h("th", { scope: "row" }, r.nombre, h("br"), h("span", { class: "meta" }, r.rol)),
h("td", null, r.objetivo),
cols.map((c) => {
const on = r.mesas.includes(c);
return h("td", { class: "center" },
h("span", { class: "part" + (on ? " is-on" : ""), "data-mesa": c, role: "img", "aria-label": on ? "Participa" : "No participa" }));
})))));

/* Recursos */
const P = D.recursos.posiciones;
const total = totalPosiciones();
const tipos = ["Estructural", "Operacional", "Implementación"];
const porTipo = tipos.map((t) => ({ t: t, n: P.filter((p) => p.tipo === t).reduce((s, p) => s + p.n, 0) }));
const slug = (t) => "t-" + t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
fill("#recursos-resumen", h("div", { class: "res-summary" },
h("div", { class: "res-total" }, total, h("small", null, "posiciones por autorizar")),
h("div", null,
h("div", { class: "stack", role: "img", "aria-label": porTipo.map((x) => x.n + " " + x.t.toLowerCase()).join(", ") },
porTipo.map((x) => h("span", { class: slug(x.t), style: "width:" + (x.n / total) * 100 + "%" }))),
h("ul", { class: "res-legend" }, porTipo.map((x) =>
h("li", null, h("span", { class: "sw " + slug(x.t), "aria-hidden": "true" }), x.n + " " + x.t.toLowerCase()))),
h("p", { class: "res-bymesa" }, ["otorgante", "ordenante", "habilitadores"].map((m) =>
h("span", { "data-mesa": m }, dotMesa(m), MESAS[m] + ": ", h("strong", null, totalPosiciones(m))))))));

const filas = [];
["otorgante", "ordenante", "habilitadores"].forEach((m) => {
filas.push(h("tr", { class: "group-row" }, h("th", { colspan: "6", scope: "colgroup" }, MESAS[m] + " (" + totalPosiciones(m) + ")")));
P.filter((p) => p.mesa === m).forEach((p) => filas.push(h("tr", null,
h("td", null, p.actividad),
h("td", null, p.responsable),
h("td", null, p.posicion),
h("td", { class: "num" }, p.n),
h("td", null, p.tipo),
h("td", null, p.temporalidad))));
});
fill("#tabla-recursos",
h("caption", null, "Fuente: " + D.recursos.fuente + ". Servicios de desarrollo externo contados como 1 mientras se dimensionan."),
h("thead", null, h("tr", null,
h("th", { scope: "col", class: "t-min" }, "Actividad"),
h("th", { scope: "col" }, "Responsable"),
h("th", { scope: "col" }, "Posición"),
h("th", { scope: "col", class: "num" }, "Núm."),
h("th", { scope: "col" }, "Tipo"),
h("th", { scope: "col" }, "Temporalidad"))),
h("tbody", null, filas));

fill("#recursos-aprobacion", D.recursos.enAprobacion.map((r) =>
h("div", { class: "res-note" },
h("strong", null, "En proceso de aprobación, fuera de las " + total + ": "),
r.n + " " + r.posicion.toLowerCase() + " para " + MESAS[r.mesa] + " (" + r.responsable + "). " + r.detalle)));

fill("#consultor", D.recursos.consultor.map((c) =>
h("li", null,
h("div", null, tagMesa(c.mesa), c.detalle ? h("p", null, c.detalle) : h("p", null, "Cuenta con capacidades internas.")),
h("span", { class: "status " + (c.requiere ? "status--decision" : "status--hecho") }, c.requiere ? "Sí requiere" : "No requiere"))));

fill("#documentos", h("div", { class: "docs" }, D.documentos.map((d) =>
h("section", null,
h("h4", null, d.grupo),
h("ul", null, d.items.map((i) => h("li", null, i))),
h("a", { href: d.enlace, target: "_blank", rel: "noopener noreferrer" }, "Abrir carpeta en Google Drive")))));
}

/* =====================================================================
Pestañas (patrón ARIA tabs + hash en la URL)
===================================================================== */
const TABS = Array.from(document.querySelectorAll('[role="tab"]'));
const IDS = TABS.map((t) => t.dataset.tab);

function activar(id, opciones) {
const op = opciones || {};
const tab = TABS.find((t) => t.dataset.tab === id) || TABS[0];
TABS.forEach((t) => {
const sel = t === tab;
t.setAttribute("aria-selected", String(sel));
t.tabIndex = sel ? 0 : -1;
const panel = document.getElementById(t.getAttribute("aria-controls"));
if (panel) panel.hidden = !sel;
});
if (op.foco) tab.focus();
tab.scrollIntoView({ block: "nearest", inline: "nearest" });
if (op.subir) {
const barra = document.querySelector(".tabs-wrap");
const tope = barra ? barra.getBoundingClientRect().top + window.scrollY : 0;
if (window.scrollY > tope) window.scrollTo(0, tope);
}
}

function irA(id, foco) {
if (!IDS.includes(id)) id = IDS[0];
if (window.location.hash !== "#" + id) {
history.pushState(null, "", "#" + id);
}
activar(id, { foco: foco, subir: true });
}

TABS.forEach((t, i) => {
t.addEventListener("click", () => irA(t.dataset.tab));
t.addEventListener("keydown", (e) => {
let j = null;
if (e.key === "ArrowRight") j = (i + 1) % TABS.length;
else if (e.key === "ArrowLeft") j = (i - 1 + TABS.length) % TABS.length;
else if (e.key === "Home") j = 0;
else if (e.key === "End") j = TABS.length - 1;
if (j !== null) { e.preventDefault(); irA(TABS[j].dataset.tab, true); }
});
});
document.addEventListener("click", (e) => {
const btn = e.target.closest("[data-ir]");
if (btn) irA(btn.dataset.ir, true);
});
window.addEventListener("popstate", () => activar(window.location.hash.slice(1)));
window.addEventListener("hashchange", () => activar(window.location.hash.slice(1)));

/* =====================================================================
Arranque
===================================================================== */
const pasos = [
renderEncabezado, renderHero, renderDecisionesAlertas, renderVencimientosResumen,
renderEstructura, renderArranque, renderMercado,
renderFiltroMesas, pintarActividades, renderEDT,
renderEstaSemana, renderSemanas,
renderTimelineProyecto, renderCecoban, renderRegulatorio, renderEquipo
];
pasos.forEach((fn) => {
try { fn(); } catch (err) {
// Un error en una sección no debe tumbar el resto del tablero
console.error("Error al construir la sección " + fn.name + ":", err);
}
});
activar(window.location.hash.slice(1) || IDS[0]);
})();
