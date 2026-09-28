/* ==========================================================================
Programa CAN · Datos del tablero ejecutivo
--------------------------------------------------------------------------
Este es el archivo que normalmente se edita para actualizar el tablero.
- Todas las fechas van en formato "AAAA-MM-DD".
- Mesas válidas: "programa", "decision", "otorgante", "ordenante",
"habilitadores".
- Estados de actividad: "completado", "continuo" o sin estado (abierta).
El estado de las abiertas (vencida, vence pronto, en curso,
programada) se calcula solo, comparando con la fecha de hoy.
Fuentes: presentaciones y minutas del Programa CAN del 24-ago al
15-sep-2026.
========================================================================== */
window.CAN_DATA = {
/* Fecha de corte de la información mostrada */
corte: "2026-09-22",

programa: {
nombre: "Programa CAN",
nombreLargo: "Crédito Asociado a la Nómina",
objetivo:
"Habilitar a Consubanco para operar el Crédito Asociado a la Nómina (CAN), en cumplimiento de la Circular 6/2025 y sus requerimientos regulatorios, con el propósito de abrir un nuevo camino a un mercado conocido y diversificar el portafolio de crédito minorista domiciliado.",
contexto:
"La Circular 6/2025 de Banxico permite usar la cuenta de nómina como fuente de pago de créditos contratados con cualquier banco o SOFOM regulada, sin que la nómina tenga que estar en esa misma institución.",
inicioPrograma: "2026-08-01",
inicioOperaciones: "2027-06-29"
},

/* Hitos clave (rail: true = aparecen en la ruta del Tablero) */
hitos: [
{ fecha: "2026-09-18", titulo: "Conexión a simulador", mesa: "habilitadores", estado: "completado", rail: true },
{ fecha: "2026-10-19", titulo: "Carta vinculante", mesa: "habilitadores", rail: true },
{ fecha: "2027-01-29", titulo: "Contratos firmados", mesa: "habilitadores", rail: true },
{ fecha: "2027-03-31", titulo: "Fin de construcción del sistema", mesa: "habilitadores", rail: true },
{ fecha: "2027-05-21", titulo: "Pruebas integrales", mesa: "habilitadores", rail: true },
{ fecha: "2027-06-21", titulo: "Dictamen de Auditoría Interna", mesa: "ordenante", rail: false },
{ fecha: "2027-06-29", titulo: "Inicio de operaciones", mesa: "programa", rail: true, clave: true }
],

gobierno: {
mesaDecision: {
funcion:
"Fija objetivos y prioridades, tiene la visión estratégica del programa y toma decisiones. Integra los resultados de cada mesa de trabajo para definir los siguientes pasos.",
cadencia: "mensual, última semana de cada mes",
rindeCuentas: "la Dirección Ejecutiva"
},
roles: [
{ rol: "Project Manager", nombre: "Abigail Vásquez", descripcion: "Coordina el día a día: plan de trabajo, entregables, cadencia, gestión y seguimiento entre mesas." },
{ rol: "Product Owner", nombre: "Isaí Juárez", descripcion: "Representa la necesidad de negocio, prioriza la solución y asegura que la entrega genere el valor esperado. Trabaja 1:1 con el arquitecto." },
{ rol: "Arquitecto", nombre: "Juan Ramón Becerra", descripcion: "Define la arquitectura y la solución técnica: integración con CECOBAN, adaptación del core y sistema de originación. Coordina los frentes técnicos de core de originación, captación y PUC." },
{ rol: "Arquitecto de negocio", nombre: "Mauricio Méndez", descripcion: "Habilita el modelo operativo integral de prospección, otorgamiento y servicio." },
{ rol: "Core de originación", nombre: "Gamaliel Rosas", descripcion: "Apoya al Product Owner en el frente de core de originación." },
{ rol: "Regulatorios", nombre: "Edsel Martínez", descripcion: "Apoya al Product Owner en el frente regulatorio." }
]
},

mesas: [
{
id: "otorgante",
nombre: "Mesa Otorgante",
subtitulo: "Modelo Otorgante",
lideres: [{ rol: "Líder", nombre: "Sergio Olivero" }],
cadencia: "Miércoles",
objetivo:
"Diversificar el portafolio de banca minorista con productos de crédito y captación originados vía CAN y llevarlos a implementación.",
areas: ["Producto", "Finanzas", "Canales", "Estrategia", "Riesgos", "Operaciones"],
integrantes: ["Sergio Olivero", "Carlos Budar", "Rubén Cohen", "Diana Ángeles", "Karen Ramírez", "Rosaura Flores", "Christian Carreón", "Nelly Trejo", "Agustín Nava", "Miguel Martínez", "Federico Lage", "Aura Marrón", "Leonor Arias"],
entregables: [
"Certificación como banco con cuentas otorgantes",
"Modelo de negocio: mercado objetivo y producto de crédito y captación",
"Modelo y gestión de riesgos: KRI, límites, prelación, riesgo operativo y de crédito",
"Modelo de rentabilidad: ingresos, gastos, costo de fondeo, originación, servicing y margen",
"Journey del cliente para crédito domiciliado",
"Comercialización: masificación de productos, canales y comisiones"
]
},
{
id: "ordenante",
nombre: "Mesa Ordenante",
subtitulo: "Auditoría y certificación",
lideres: [{ rol: "Líder", nombre: "Christian Carreón" }],
cadencia: "Viernes",
objetivo:
"Emitir el dictamen de Auditoría Interna que certifica el cumplimiento regulatorio para operar como CAN.",
areas: ["Operaciones", "TI", "Regulatorio", "Riesgos", "Auditoría"],
integrantes: ["Agustín Nava", "Miguel Matus", "Gabriela Hernández", "Christian Carreón", "Rosaura Flores", "Nelly Trejo", "Karen Ramírez", "Rodrigo De Marchena", "Berenice Serrano", "Leonor Arias"],
entregables: [
"Certificación como banco con cuentas ordenantes",
"Mecanismo de identificación de cuenta ordenante",
"Mecanismo de atención a aclaraciones",
"Mecanismo para la recepción y gestión de solicitudes de domiciliación",
"Dictamen aprobatorio de Auditoría Interna (ordenante y otorgante) antes del 29-jun-2027"
]
},
{
id: "habilitadores",
nombre: "Habilitadores",
subtitulo: "Tecnológicos, operativos y regulatorios",
lideres: [
{ rol: "Líder", nombre: "Agustín Nava" },
{ rol: "Arquitecto", nombre: "Juan Ramón Becerra" }
],
cadencia: "Jueves",
objetivo:
"Habilitar la operación del CAN como base para diversificar el crédito minorista. Participa en las sesiones de CECOBAN y la ABM.",
areas: ["Operaciones", "Tecnología y Datos", "Jurídico", "Normatividad", "Estrategia", "Soluciones de negocio"],
integrantes: ["Agustín Nava", "Miguel Matus", "Gabriela Hernández", "Rosaura Flores", "Federico Lage", "Nelly Trejo", "Diana Torres", "Alejandra Muñoz", "Mauricio Méndez", "Esperanza Hernández", "Juan Ramón Becerra", "Leonor Arias", "Karen Ramírez"],
entregables: [
"Construcción del sistema de originación",
"Adaptación del core bancario",
"Pruebas e integración con CECOBAN",
"Cálculo de capacidad de pago, políticas de otorgamiento y motor de prelación",
"Carta vinculante y contrato marco",
"Manual de operaciones y evidencia para Auditoría",
"Inicio de operaciones (29-jun-2027)"
]
}
],

/* Avance del arranque reportado en la Mesa de decisión */
arranque: {
fecha: "2026-09-09",
frentes: [
{ nombre: "Sesión de entendimiento", avance: 100 },
{ nombre: "Constitución de mesas", avance: 100 },
{ nombre: "Definición del consultor", avance: 80 },
{ nombre: "Identificación de recursos adicionales", avance: 80 },
{ nombre: "Instalación de cadencia de sesiones", avance: null, estado: "Por autorizar" }
]
},

/* Decisiones que requieren a la Mesa de decisión / Dirección */
decisiones: [
{ titulo: "Autorizar el consultor externo para Habilitadores", detalle: "Para la documentación de procesos (manual de operaciones). La cotización del consultor se esperaba el 17-sep-2026.", estado: "Por autorizar" },
{ titulo: "Autorizar 20 posiciones adicionales", detalle: "13 para la Mesa Otorgante, 1 para la Mesa Ordenante y 6 para Habilitadores: 2 estructurales, 12 operacionales y 6 de implementación.", estado: "Por autorizar" },
{ titulo: "Dimensionar los servicios de desarrollo externo", detalle: "Construcción del sistema de originación, adaptación del core, PUC e integración, sin afectar a las células actuales.", estado: "En dimensionamiento" },
{ titulo: "Autorizar la cadencia de sesiones", detalle: "Semanal el primer mes (miércoles Otorgante, jueves Habilitadores, viernes Ordenante) y después evaluar quincenal. Mesa de decisión mensual.", estado: "Por autorizar" },
{ titulo: "Aprobar el plan de trabajo con ruta crítica", detalle: "Actividades, alcance, responsables y fechas compromiso, para la Mesa de decisión de octubre.", estado: "Por definir" }
],

/* Alertas y riesgos. nivel: "alto" | "medio" */
alertas: [
{ nivel: "alto", titulo: "Tiempos regulatorios del CAN", detalle: "Riesgos advierte que el foco en Cash Express (producto no asociado a la nómina) no debe desviar los plazos del CAN. La metodología de capacidad de pago debe pasar por el Comité de Riesgos y notificarse a Banxico antes del arranque.", fuente: "Mesa Otorgante, 15 sep 2026" },
{ nivel: "medio", titulo: "Alcance de la variable “disponible” de CECOBAN", detalle: "Falta confirmar si incluye los compromisos internos de cada banco y cómo refleja la prelación. Es la variable inicial del cálculo de capacidad de pago.", fuente: "Mesa Otorgante, 15 sep 2026" },
{ nivel: "medio", titulo: "Recursos sin autorizar", detalle: "Las 20 posiciones y los servicios de desarrollo externo siguen pendientes; la construcción del sistema está planeada del 1-oct-2026 al 31-mar-2027.", fuente: "Mesa de decisión, 9 sep 2026" },
{ nivel: "medio", titulo: "Brecha tecnológica en el core", detalle: "El core requiere configuración para la reserva de descuentos y la prelación sobre cuentas. Falta definir dónde se ejecutará el flujo de otorgamiento (¿nueva aplicación? ¿PUC?).", fuente: "Integración de equipos; Habilitadores, 10 sep 2026" }
],

/* Actividades por mesa. inicio es opcional; fin es la fecha compromiso.
ref = identificador de la minuta (opcional). */
actividades: [
/* ---- Mesa de decisión ---- */
{ mesa: "decision", titulo: "Sesión de entendimiento y constitución de las tres mesas de trabajo", responsable: "Abigail Vásquez", fin: "2026-09-09", estado: "completado", fuente: "Reportado en la Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Primera Mesa de decisión: integración de resultados, metodología de trabajo y draft del timeline general", responsable: "Abigail Vásquez", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Definición de roles de gobierno: Project Manager, Product Owner, arquitecto y arquitecto de negocio", responsable: "Mesa de decisión", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Mesa de decisión de octubre: aprobar el plan de trabajo con actividades, alcance, responsables, fechas compromiso y ruta crítica", responsable: "Abigail Vásquez", inicio: "2026-10-26", fin: "2026-10-30", nota: "Fecha estimada: última semana de octubre", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Autorizar el consultor externo para Habilitadores (manual de operaciones)", responsable: "Mesa de decisión", fechaTexto: "Por definir", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Autorizar 20 posiciones adicionales y dimensionar los servicios de desarrollo externo", responsable: "Mesa de decisión", fechaTexto: "Por definir", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Autorizar la cadencia de sesiones de las mesas", responsable: "Mesa de decisión", fechaTexto: "Por autorizar", fuente: "Mesa de decisión, 9 sep 2026" },

/* ---- Mesa Otorgante ---- */
{ mesa: "otorgante", titulo: "Sesión de actividades de la mesa: responsables asignados y evaluación de capacidades", responsable: "Sergio Olivero", fin: "2026-08-26", estado: "completado", fuente: "Presentación Mesa Otorgante, 26 ago 2026" },
{ mesa: "otorgante", titulo: "Definición de capacidades: no requiere consultor; requiere 13 posiciones adicionales", responsable: "Sergio Olivero", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "otorgante", titulo: "Propuesta de producto: mercado objetivo, buyer persona, competencia y estrategia en tres fases", responsable: "Diana Ángeles", fin: "2026-09-15", estado: "completado", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", titulo: "Propuesta de capacidad de pago y score de riesgo (conceptualmente correcta, sujeta a ajustes)", responsable: "Linda Romero", fin: "2026-09-15", estado: "completado", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", ref: "MO-01", titulo: "Compartir con el equipo la presentación de producto expuesta en la sesión", responsable: "Diana Ángeles", fechaTexto: "ASAP", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", ref: "MO-02", titulo: "Compartir la presentación de la propuesta de capacidad de pago y score de riesgo", responsable: "Linda Romero", fin: "2026-09-15", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", ref: "MO-03", titulo: "Gestionar una sesión con el Director de Riesgos para revisar la propuesta de capacidad de pago y sus ajustes", responsable: "Abigail Vásquez", fin: "2026-09-15", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", ref: "MO-04", titulo: "Confirmar con CECOBAN qué incluye la variable “disponible” (variable inicial y ajustes)", responsable: "Nelly Trejo y equipo", fin: "2026-09-15", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", titulo: "Modelo de negocio", responsable: "Diana Ángeles", inicio: "2026-09-21", fin: "2026-10-30", nota: "Fechas del draft del timeline", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "otorgante", titulo: "Diseño de la fase 1 (Cash Express) con pricing basado en supuestos propios e información solicitada a BKAYA", responsable: "Mesa Otorgante", fechaTexto: "Por definir", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", titulo: "Metodología de capacidad de pago: presentación al Comité de Riesgos y notificación a Banxico", responsable: "Miguel Martínez y Riesgos", fechaTexto: "Por definir", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },

/* ---- Mesa Ordenante ---- */
{ mesa: "ordenante", titulo: "Sesión de contexto: plan de auditoría regulatoria, matriz maestra de 18 puntos y cronograma propuesto", responsable: "Christian Carreón", fin: "2026-08-24", estado: "completado", fuente: "Contexto Modelo Ordenante, 24 ago 2026" },
{ mesa: "ordenante", titulo: "Definición de capacidades: no requiere consultor; 1 posición adicional (aclaraciones vía SAAC) y 1 especialista de auditoría en aprobación", responsable: "Christian Carreón", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "ordenante", titulo: "Planeación de auditoría: universo regulatorio y matriz de riesgos", responsable: "Rodrigo De Marchena", inicio: "2026-08-01", fin: "2026-09-30", fuente: "Cronograma de auditoría propuesto" },
{ mesa: "ordenante", titulo: "Gap assessment: matriz de brechas", responsable: "Rodrigo De Marchena", inicio: "2026-09-01", fin: "2026-10-31", fuente: "Cronograma de auditoría propuesto" },
{ mesa: "ordenante", titulo: "Modelo de operación ordenante", responsable: "Christian Carreón", inicio: "2026-09-21", fin: "2026-11-20", nota: "Fechas del draft del timeline", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "ordenante", titulo: "Asignar responsable y necesidad de TI a cada punto de la matriz maestra de auditoría", responsable: "Christian Carreón", fechaTexto: "Por definir", fuente: "Columnas vacías en la versión del 24 ago 2026" },

/* ---- Habilitadores ---- */
{ mesa: "habilitadores", titulo: "Sesión de contexto: macroproceso de originación, flujo operativo CECOBAN y documentación técnica v1.2", responsable: "Agustín Nava", fin: "2026-08-25", estado: "completado", fuente: "Contexto Habilitadores, 25 ago 2026" },
{ mesa: "habilitadores", titulo: "Definición de capacidades: requiere consultor externo para el manual de operaciones y 6 posiciones adicionales", responsable: "Agustín Nava", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "habilitadores", titulo: "Draft de la estructura de trabajo (EDT) de la construcción del sistema, con 12 componentes", responsable: "Abigail Vásquez", fin: "2026-09-10", estado: "completado", fuente: "Minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Conexión de la banca al simulador de CECOBAN", responsable: "Juan Ramón Becerra", inicio: "2026-09-01", fin: "2026-09-18", estado: "completado", fuente: "Draft del timeline (actividad finalizada)" },
{ mesa: "habilitadores", titulo: "Validar si se puede liberar un recurso temporal (posición de validador funcional)", responsable: "Abigail Vásquez", fin: "2026-09-11", fuente: "Minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Subir la matriz de cumplimiento regulatorio a la carpeta compartida", responsable: "Edsel Martínez", fin: "2026-09-11", fuente: "Minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Recibir la cotización del consultor externo", responsable: "Consultor externo", fin: "2026-09-17", nota: "Fecha estimada", fuente: "Minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Generar la matriz de pruebas de los módulos de conexión con CECOBAN", responsable: "Isaí Juárez, Mauricio Méndez, Alejandra Muñoz y Nelly Trejo", fin: "2026-09-25", fuente: "Minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Periodo de pruebas con el simulador API de CECOBAN", responsable: "Por confirmar", inicio: "2026-09-14", fin: "2026-10-16", fuente: "Roadmap CECOBAN" },
{ mesa: "habilitadores", titulo: "CECOBAN informa el esquema de recuperación de gastos", responsable: "CECOBAN", fin: "2026-10-16", fuente: "Roadmap CECOBAN" },
{ mesa: "habilitadores", titulo: "Entrega de la carta vinculante a CECOBAN", responsable: "Gabriela Hernández (Legal)", inicio: "2026-10-19", fin: "2026-10-23", fuente: "Roadmap CECOBAN" },
{ mesa: "habilitadores", titulo: "Entrega del contrato marco", responsable: "Gabriela Hernández (Legal)", fin: "2026-10-28", fuente: "Roadmap CECOBAN" },
{ mesa: "habilitadores", titulo: "Construcción del sistema", responsable: "Juan Ramón Becerra", inicio: "2026-10-01", fin: "2027-03-31", nota: "Fechas del draft del timeline", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "habilitadores", titulo: "Definir dónde se ejecutará el flujo de otorgamiento (¿nueva aplicación? ¿PUC?) y los formatos de contrato", responsable: "Juan Ramón Becerra", fechaTexto: "Por definir", fuente: "EDT 1.3.1, minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Compartir en la carpeta del programa toda la información que envíe la ABM", responsable: "Alejandra Muñoz", estado: "continuo", fuente: "Minuta Habilitadores, 10 sep 2026" }
],

/* Draft de la EDT de construcción del sistema (minuta 10-sep-2026) */
edt: [
{ codigo: "1.1", nombre: "Módulo de consultas de prelaciones y capacidad" },
{ codigo: "1.2", nombre: "Módulo de notificaciones de cuentas ordenantes" },
{ codigo: "1.3", nombre: "Proceso de otorgamiento (envío)" },
{ codigo: "1.3.1", nombre: "Configuración de reglas, flujo e instalación del descuento", consideracion: "Definir dónde se hará el flujo: ¿nueva aplicación? ¿PUC? Formatos de contrato." },
{ codigo: "1.4", nombre: "Configuración del producto en el core bancario" },
{ codigo: "1.5", nombre: "Prelación en el core bancario (orden de aplicación del descuento)" },
{ codigo: "1.6", nombre: "Domiciliación Domi CAN" },
{ codigo: "1.7", nombre: "Conciliación" },
{ codigo: "1.8", nombre: "Interpretación de resultados" },
{ codigo: "1.9", nombre: "Administración de portafolio: reservas, reportes regulatorios, SIC y calificación de cartera" },
{ codigo: "1.10", nombre: "Parametrización contable" },
{ codigo: "1.11", nombre: "Servicios de atención al cliente" },
{ codigo: "1.12", nombre: "Consistencia y sincronía de la información en las fuentes de datos" }
],

/* Resumen semanal. Agrega una semana nueva al inicio del arreglo. */
semanas: [
{
inicio: "2026-09-14",
fin: "2026-09-18",
titular: "La Mesa Otorgante presentó la propuesta de producto y la arquitectura de capacidad de pago; Riesgos pidió no desviar los tiempos regulatorios del CAN.",
sesiones: [{ mesa: "otorgante", fecha: "2026-09-15", nombre: "Seguimiento Mesa Otorgante" }],
puntos: {
otorgante: [
"Propuesta de producto con enfoque jobs to be done: de 5.4 M de pensionados, 2.75 M quedan hoy fuera del crédito por descuento vía nómina por contar solo con la pensión mínima garantizada.",
"El cliente objetivo compite contra el préstamo familiar, el fiado o el empeño, y decide por rapidez, discreción y certeza de aprobación. La variable competitiva es la velocidad para liberar capacidad de pago.",
"Estrategia en tres fases según el mecanismo de cobro: Cash Express con pago voluntario, anticipo de pensión y Cash Loan con cargo a cuenta (requiere portar la pensión) y, al final, cobro vía CAN.",
"Regla de originación con tope de capacidad de pago de 30%; los montos mayores a 3,000 pesos se otorgan a dos meses. El CAT aún no se calcula.",
"Capacidad de pago = depósito neto − obligaciones externas (círculo de crédito) − reserva de liquidez (piso de 30%). El score pondera comportamiento, presión financiera, estabilidad y capacidad; se simularán factores de utilización de 30%, 40% y 50%."
],
habilitadores: [
"La conexión al simulador de CECOBAN se reporta como finalizada; el periodo de pruebas con el simulador API corre del 14 de septiembre al 16 de octubre."
]
},
acuerdos: [
"MO-01 a MO-04: compartir las presentaciones de producto y de capacidad de pago, agendar sesión con el Director de Riesgos y confirmar con CECOBAN el alcance de la variable “disponible”.",
"La propuesta de capacidad de pago se consideró conceptualmente correcta, sujeta a ajustes de detalle."
],
alertas: [
"Riesgos: el foco en Cash Express no debe desviar los plazos del CAN; la metodología de capacidad de pago tiene tiempos propios ante el Comité de Riesgos y Banxico.",
"Falta confirmar si la variable “disponible” de CECOBAN incluye los compromisos internos de cada banco y cómo refleja la prelación."
],
siguientes: [
"Concentrar el diseño en la fase 1 (Cash Express) y sustituir el pricing de mercado por un modelo con supuestos propios.",
"Solicitar información a BKAYA para el modelado y evaluar con ellos el producto digital.",
"Avanzar en paralelo procesos y conexiones con CECOBAN, domiciliación y prelación en la mesa de Habilitadores."
],
fuentes: ["Minuta Mesa Otorgante, 15 sep 2026", "Draft del timeline, Mesa de decisión"]
},
{
inicio: "2026-09-07",
fin: "2026-09-11",
titular: "Primera Mesa de decisión: se formalizó el gobierno del programa y se presentaron las autorizaciones pendientes de consultor y recursos.",
sesiones: [
{ mesa: "decision", fecha: "2026-09-09", nombre: "Mesa de decisión" },
{ mesa: "habilitadores", fecha: "2026-09-10", nombre: "Seguimiento Habilitadores" }
],
puntos: {
decision: [
"Metodología de trabajo: Abigail Vásquez como Project Manager, Isaí Juárez como Product Owner, Juan Ramón Becerra como arquitecto y Mauricio Méndez como arquitecto de negocio.",
"Avance del arranque: sesión de entendimiento y constitución de mesas al 100%; definición del consultor e identificación de recursos al 80%; cadencia de sesiones por autorizar.",
"Solo Habilitadores requiere consultor externo, para la documentación de procesos (manual de operaciones).",
"Se solicitaron 20 posiciones adicionales: 13 para la Mesa Otorgante, 1 para la Mesa Ordenante y 6 para Habilitadores."
],
habilitadores: [
"Se compartió el draft de la EDT con 12 componentes de la construcción del sistema, desde el módulo de consultas de prelación y capacidad hasta la consistencia de datos.",
"El plan de trabajo que solicitó CECOBAN se enviará con las fechas que ellos establecieron; cualquier cambio se les notificará."
]
},
acuerdos: [
"Cotización del consultor externo estimada para el 17 de septiembre.",
"Matriz de pruebas de los módulos de conexión con CECOBAN al 25 de septiembre (Isaí Juárez, Mauricio Méndez, Alejandra Muñoz y Nelly Trejo).",
"Validar la liberación de un recurso temporal como validador funcional y subir la matriz de cumplimiento regulatorio, ambos al 11 de septiembre."
],
alertas: [
"Las autorizaciones de consultor y recursos siguen pendientes.",
"Los servicios de desarrollo externo aún están en dimensionamiento.",
"Falta definir dónde se ejecutará el flujo de otorgamiento (¿nueva aplicación? ¿PUC?) y los formatos de contrato."
],
siguientes: [
"Presentar el plan de trabajo con ruta crítica en la Mesa de decisión de octubre.",
"Mantener el acompañamiento de equipos y el seguimiento de entregables."
],
fuentes: ["Mesa de decisión, 9 sep 2026", "Minuta Habilitadores, 10 sep 2026"]
},
{
inicio: "2026-08-24",
fin: "2026-08-28",
titular: "Arranque formal de las tres mesas de trabajo con sesiones de contexto.",
sesiones: [
{ mesa: "ordenante", fecha: "2026-08-24", nombre: "Contexto Mesa Ordenante" },
{ mesa: "habilitadores", fecha: "2026-08-25", nombre: "Contexto Habilitadores" },
{ mesa: "otorgante", fecha: "2026-08-26", nombre: "Actividades Mesa Otorgante" }
],
puntos: {
programa: [
"Las tres mesas recibieron el mismo contexto: Circular 6/2025, kick off, integración de equipos y metodología, y la propuesta de la consultora Akya."
],
ordenante: [
"Plan de auditoría regulatoria con fecha límite al 29-jun-2027: 5 objetivos, matriz maestra de 18 puntos (9 de riesgo crítico) y cronograma de agosto 2026 a junio 2027."
],
habilitadores: [
"Se revisó el macroproceso de originación y administración (6 etapas), el flujo operativo con CECOBAN y la documentación técnica v1.2: especificaciones, simulador, schemas y ejemplos JSON."
],
otorgante: [
"Se asignaron responsables por actividad y se evaluaron capacidades: la mesa no requiere consultor, pero sí personal adicional en producto, procesos y operación."
]
},
acuerdos: [
"Cada mesa define si cuenta con capacidades internas o requiere consultoría, y en qué modalidad: asesoría o construcción."
],
alertas: [
"Product Owner y líder técnico aún por definir al cierre de la semana."
],
siguientes: [
"Calibrar alcance y entregables, confirmar responsables y definir la postura de operación: interna, externa o híbrida."
],
fuentes: ["Contexto Modelo Ordenante, 24 ago 2026", "Contexto Habilitadores, 25 ago 2026", "Presentación Mesa Otorgante, 26 ago 2026"]
}
],

/* Timeline del proyecto (draft de alto nivel, Mesa de decisión 9-sep-2026) */
timelineProyecto: {
inicio: "2026-08-01",
fin: "2027-06-30",
nota: "Draft de alto nivel presentado en la Mesa de decisión del 9 de septiembre de 2026. Las fechas de las mesas son aproximadas y se confirmarán con el plan de trabajo y la ruta crítica.",
grupos: [
{
mesa: "programa",
nombre: "Hitos clave",
filas: [
{ nombre: "Conexión a simulador", inicio: "2026-09-18", estado: "completado" },
{ nombre: "Carta vinculante", inicio: "2026-10-19" },
{ nombre: "Contratos firmados", inicio: "2027-01-29" },
{ nombre: "Fin de construcción del sistema", inicio: "2027-03-31" },
{ nombre: "Pruebas integrales", inicio: "2027-05-21" },
{ nombre: "Inicio de operaciones", inicio: "2027-06-29", clave: true }
]
},
{
mesa: "otorgante",
nombre: "Mesa Otorgante",
nota: "Actividades iterativas: se retroalimentan entre sí y no dependen una de otra para avanzar.",
filas: [
{ nombre: "Modelo de negocio", inicio: "2026-09-21", fin: "2026-10-30" },
{ nombre: "Producto", inicio: "2026-11-02", fin: "2026-12-15" },
{ nombre: "Modelo de riesgo", inicio: "2026-12-16", fin: "2027-02-05" },
{ nombre: "Modelo de rentabilidad", inicio: "2027-02-05", fin: "2027-03-19" },
{ nombre: "Certificación otorgante", inicio: "2026-09-21", fin: "2027-03-19" }
]
},
{
mesa: "ordenante",
nombre: "Mesa Ordenante",
filas: [
{ nombre: "Modelo de operación ordenante", inicio: "2026-09-21", fin: "2026-11-20" },
{ nombre: "Certificación ordenante", inicio: "2026-09-21", fin: "2027-03-19" },
{ nombre: "Dictamen de Auditoría Interna", inicio: "2027-06-21" }
]
},
{
mesa: "ordenante",
nombre: "Plan de auditoría regulatoria (propuesto)",
filas: [
{ nombre: "Planeación: universo regulatorio y matriz de riesgos", inicio: "2026-08-01", fin: "2026-09-30" },
{ nombre: "Gap assessment: matriz de brechas", inicio: "2026-09-01", fin: "2026-10-31" },
{ nombre: "Procesos: walkthroughs CAN", inicio: "2026-10-01", fin: "2026-11-30" },
{ nombre: "Datos y sistemas: data lineage y pruebas de TI", inicio: "2026-11-01", fin: "2026-12-31" },
{ nombre: "Pruebas 1: cuentas ordenantes y capacidad de pago", inicio: "2027-01-01", fin: "2027-01-31" },
{ nombre: "Pruebas 2: mandatos y domiciliación", inicio: "2027-02-01", fin: "2027-02-28" },
{ nombre: "Pruebas 3: prelación y comunicaciones", inicio: "2027-03-01", fin: "2027-03-31" },
{ nombre: "Pruebas 4: cancelaciones y reclamaciones", inicio: "2027-04-01", fin: "2027-04-30" },
{ nombre: "Remediación: cierre de hallazgos", inicio: "2027-05-01", fin: "2027-05-31" },
{ nombre: "Pre-dictamen: informe preliminar", inicio: "2027-06-01", fin: "2027-06-15" },
{ nombre: "Gobierno: Comité de Auditoría y DG", inicio: "2027-06-16", fin: "2027-06-28" },
{ nombre: "Entrega a Banco de México", inicio: "2027-06-29", clave: true }
]
},
{
mesa: "habilitadores",
nombre: "Habilitadores",
filas: [
{ nombre: "Conexión a simulador CECOBAN", inicio: "2026-09-01", fin: "2026-09-18", estado: "completado" },
{ nombre: "Matriz de pruebas", inicio: "2026-09-19", fin: "2026-09-25" },
{ nombre: "Construcción del sistema", inicio: "2026-10-01", fin: "2027-03-31" },
{ nombre: "Preparación operativa", inicio: "2027-05-03", fin: "2027-06-18" }
]
}
]
},

/* Roadmap de CECOBAN para la banca */
cecoban: {
inicio: "2026-04-01",
fin: "2027-06-30",
categorias: {
definicion: "Definiciones y documentación",
tecnologia: "Arquitectura, simulador y construcción",
conectividad: "Conexión y pruebas",
legal: "Legal y contractual",
limite: "Fecha límite",
entrega: "Demo, manual y UAT",
preparacion: "Preparación",
arranque: "Arranque"
},
filas: [
{ nombre: "Análisis y aclaración de definiciones del DE versión 3.0 congelada", inicio: "2026-04-20", fin: "2026-06-30", categoria: "definicion" },
{ nombre: "Actualización y envío del DE versión 4.0", inicio: "2026-07-01", fin: "2026-07-07", categoria: "definicion" },
{ nombre: "Elaboración y entrega de documentación técnica para bancos", inicio: "2026-06-30", fin: "2026-07-10", categoria: "definicion" },
{ nombre: "Análisis y definición de arquitectura", inicio: "2026-04-27", fin: "2026-08-01", categoria: "tecnologia" },
{ nombre: "Creación del simulador API", inicio: "2026-06-15", fin: "2026-08-31", categoria: "tecnologia" },
{ nombre: "Conexión de la banca al simulador", inicio: "2026-09-01", fin: "2026-09-18", categoria: "conectividad", estado: "completado" },
{ nombre: "Periodo de pruebas con el simulador API", inicio: "2026-09-14", fin: "2026-10-16", categoria: "conectividad" },
{ nombre: "Informar el esquema de recuperación de gastos", inicio: "2026-10-16", categoria: "legal" },
{ nombre: "Entrega de la carta vinculante a CECOBAN", inicio: "2026-10-19", fin: "2026-10-23", categoria: "legal" },
{ nombre: "Entrega del contrato marco", inicio: "2026-10-28", categoria: "legal" },
{ nombre: "Fecha límite de contratos firmados", inicio: "2027-01-29", categoria: "limite" },
{ nombre: "Conexión de la banca a UAT y producción", inicio: "2027-02-01", fin: "2027-03-01", categoria: "conectividad" },
{ nombre: "Construcción del sistema", inicio: "2026-08-01", fin: "2027-03-31", categoria: "tecnologia" },
{ nombre: "Demo de la solución", inicio: "2027-04-05", fin: "2027-04-09", categoria: "entrega" },
{ nombre: "Entrega del manual de operaciones", inicio: "2027-04-16", categoria: "entrega" },
{ nombre: "Entrega del guion de pruebas", inicio: "2027-04-16", categoria: "entrega" },
{ nombre: "Pruebas con la banca en UAT", inicio: "2027-04-26", fin: "2027-05-21", categoria: "entrega" },
{ nombre: "Revisar con el Comité de Riesgos la política de nivel de endeudamiento", inicio: "2027-05-03", fin: "2027-06-18", categoria: "preparacion" },
{ nombre: "Preparación operativa", inicio: "2027-05-03", fin: "2027-06-18", categoria: "preparacion" },
{ nombre: "Inicio de operaciones", inicio: "2027-06-29", categoria: "arranque" },
{ nombre: "Dictamen de Auditoría Interna: correcto funcionamiento del proceso", inicio: "2027-06-29", categoria: "arranque" }
]
},

/* Flujo operativo general con CECOBAN */
flujoCecoban: [
{ otorgante: "Solicita información del nominado y su disponibilidad de pago", cecoban: "Recibe y valida la solicitud", ordenante: "Recibe la solicitud de información", direccion: "derecha" },
{ otorgante: "Recibe la respuesta con la información del nominado y su disponibilidad", cecoban: "Distribuye la información y realiza consultas", ordenante: "Responde la solicitud de información y disponibilidad", direccion: "izquierda" },
{ otorgante: "Envía la información del otorgamiento del crédito CAN", cecoban: "Actualiza los datos en tiempo real", ordenante: "Recibe la información del crédito CAN otorgado", direccion: "derecha" },
{ otorgante: "Recibe la prelación asignada", cecoban: "Determina y actualiza la prelación de los créditos CAN", ordenante: "Recibe la prelación asignada", direccion: "ambas" }
],
flujoCierre: "Notificación y actualización: ambos bancos reciben la prelación y actualizan sus sistemas y controles internos. CECOBAN orquesta, valida y administra la información.",

/* Macroproceso de originación y administración */
macroproceso: [
{ nombre: "Prospección", detalle: "Integración del expediente, validación de biométricos, folio NOM 151 y precalificación con la documentación presentada." },
{ nombre: "Mesa de control", detalle: "Validación de datos del expediente, precalificación con políticas internas y armado automático de archivos para el intercambio de información." },
{ nombre: "Ingreso al sistema CAN", detalle: "Solicitud y recepción de información, y validación de la capacidad de pago conforme a reglas internas." },
{ nombre: "Dispersión del crédito", detalle: "Si cumple las reglas internas, dispersión automática y formalización del crédito en ODS y en el core bancario." },
{ nombre: "Recepción del flujo en cuenta CIEC", detalle: "Monitoreo de la recepción del flujo y conciliación para enviarlo a posteo." },
{ nombre: "Posteo de pagos", detalle: "Conciliación periódica con los layouts de respuesta de CECOBAN para identificar y postear los pagos de los créditos." }
],

mercado: {
cifras: [
{ valor: "33.5 M", texto: "personas con ingreso recurrente verificable (empleo formal y pensionados contributivos)" },
{ valor: "10.6–11.1 M", texto: "en el segmento prioritario: gobierno, ISSSTE, pensionados y jubilados" },
{ valor: "5.4 M", texto: "pensionados IMSS en base interna, punta de lanza de la fase 1" },
{ valor: "2.75 M", texto: "pensionados que hoy no son elegibles para descuento vía nómina (51.3%)" }
],
fases: [
{ nombre: "Pensionados IMSS", detalle: "2.75 M incrementales" },
{ nombre: "ISSSTE y gobierno", detalle: "4.1 M de gobierno y 1.3 M del ISSSTE" },
{ nombre: "Nómina privada", detalle: "22.8 M de puestos IMSS" }
],
producto: [
{ nombre: "Cash Express", detalle: "Pago voluntario; solo requiere una cuenta en el banco. Producto de entrada." },
{ nombre: "Anticipo de pensión y Cash Loan", detalle: "Cargo directo a cuenta; requiere que el cliente porte su pensión." },
{ nombre: "Crédito asociado a la nómina", detalle: "Cobro vía CAN, trasladable si el cliente cambia de institución." }
],
fuente: "Integración de equipos y metodología; minuta Mesa Otorgante, 15 sep 2026. Cifras en validación."
},

regulatorio: {
estatus: [
{ titulo: "Prelación definida", texto: "Sin CAN, la cobranza queda al final: bienes, servicios y créditos distintos al CAN se pagan después de Mis en Mis y CAN. Entre créditos CAN, la prelación se determina por fecha y hora de designación." },
{ titulo: "Brecha tecnológica", texto: "El core requiere configuración para la reserva de descuentos y la aplicación de la prelación sobre cuentas." },
{ titulo: "Requisitos", texto: "Definir el mecanismo de identificación de cuenta ordenante, el mandato del cliente y el dictamen de Auditoría." },
{ titulo: "Motor de riesgo por definir", texto: "Se prestará a segmentos sin convenio y sin conocer su transaccionalidad: ¿cuánto prestar y a quién?" },
{ titulo: "Oportunidad de negocio", texto: "Originar en cuentas de mercados no elegibles en los convenios actuales (IMSS y otros), pensionados Ley 97, y captar el depósito (Mis en Mis)." }
],
plazos: [
{ titulo: "Comunicación a Banxico del límite CAN aprobado", plazo: "Dentro de 10 días hábiles bancarios", referencia: "63 Bis" },
{ titulo: "Cancelación de la domiciliación", plazo: "Dentro de 3 días hábiles bancarios", referencia: "65–66" },
{ titulo: "Dictamen aprobado y firmado", plazo: "Comité de Auditoría y Dirección General", referencia: "Transitoria Segunda" },
{ titulo: "Entrega a Banco de México", plazo: "29 de junio de 2027", referencia: "Hito regulatorio" }
],
objetivosAuditoria: [
"Identificación y documentación de las cuentas ordenantes",
"Sistemas y procesos para la domiciliación y prelación del CAN",
"Mecanismos para ejecutar los mandatos de los clientes",
"Determinación y aplicación del límite CAN aprobado por el Comité de Riesgos",
"Cumplimiento integral de las obligaciones relacionadas con estos procesos"
],
matriz: [
{ n: 1, area: "Cuentas ordenantes", regulacion: "22 Bis / 22 Bis 1", prueba: "Correcta identificación y clasificación", evidencia: "Catálogo, reglas, expedientes", riesgo: "Alto" },
{ n: 2, area: "Información de cuenta", regulacion: "22 Bis 1", prueba: "Información usada para determinar la capacidad de pago", evidencia: "Interfaces, archivos, estados de cuenta", riesgo: "Crítico" },
{ n: 3, area: "Promedio de abonos", regulacion: "63 Bis", prueba: "Cálculo correcto del promedio mensual", evidencia: "Base de datos y cálculo independiente", riesgo: "Crítico" },
{ n: 4, area: "Límite CAN", regulacion: "63 Bis", prueba: "Amortizaciones dentro del límite aprobado", evidencia: "Parámetro, metodología, pruebas", riesgo: "Crítico" },
{ n: 5, area: "Comité de Riesgos", regulacion: "63 Bis", prueba: "Límite formalmente aprobado", evidencia: "Acta o minuta y metodología", riesgo: "Crítico" },
{ n: 6, area: "Comunicación a Banxico", regulacion: "63 Bis", prueba: "Comunicación dentro de 10 días hábiles bancarios", evidencia: "Acuse o documento enviado", riesgo: "Alto" },
{ n: 7, area: "Identificación del cliente", regulacion: "63 Bis", prueba: "Identidad validada", evidencia: "Expediente y evidencia digital", riesgo: "Alto" },
{ n: 8, area: "Mandato", regulacion: "63 Bis", prueba: "Mandato válido y trazable", evidencia: "Contrato o mandato electrónico o físico", riesgo: "Crítico" },
{ n: 9, area: "Domiciliación", regulacion: "63 Bis / 63 Bis 1 / 64", prueba: "Domiciliación correctamente solicitada", evidencia: "Formato, logs", riesgo: "Crítico" },
{ n: 10, area: "Prelación", regulacion: "22 Bis 1", prueba: "Orden de cargos correcto", evidencia: "Motor de reglas y pruebas", riesgo: "Crítico" },
{ n: 11, area: "Comunicación interbancaria", regulacion: "63 Bis 3", prueba: "Mecanismo autorizado y transparente", evidencia: "Convenios, especificaciones, logs", riesgo: "Alto" },
{ n: 12, area: "Cancelación", regulacion: "65–66", prueba: "Cancelación dentro de 3 días hábiles bancarios", evidencia: "Solicitudes y timestamps", riesgo: "Alto" },
{ n: 13, area: "Objeciones", regulacion: "67–69", prueba: "Gestión y evidencia de reclamaciones", evidencia: "Expedientes, logs", riesgo: "Medio/Alto" },
{ n: 14, area: "Información al cliente", regulacion: "63 Bis", prueba: "Comparativo CAN vs. crédito ordinario", evidencia: "Formatos, contratos", riesgo: "Alto" },
{ n: 15, area: "CBE", regulacion: "63 Bis", prueba: "Cada CAN con Clave Básica Estandarizada", evidencia: "Base de créditos / SIC", riesgo: "Medio" },
{ n: 16, area: "Refinanciamiento", regulacion: "63 Bis", prueba: "Cumplimiento de condiciones", evidencia: "SPEI, CBE, contratos", riesgo: "Alto" },
{ n: 17, area: "Sistemas", regulacion: "63 Bis 3", prueba: "Integridad de interfaces y controles", evidencia: "Arquitectura, logs, pruebas", riesgo: "Crítico" },
{ n: 18, area: "Gobierno", regulacion: "Transitoria Segunda", prueba: "Dictamen aprobado y firmado", evidencia: "Comité de Auditoría y DG", riesgo: "Crítico" }
],
nivelesRiesgo: [
{ nivel: "Crítico", texto: "Puede provocar incumplimiento directo o impedir el dictamen: límite incorrecto, mandato inexistente, domiciliación o prelación incorrecta, ausencia de evidencia o un sistema que permita exceder el límite." },
{ nivel: "Alto", texto: "Deficiencia importante que requiere remediación prioritaria: evidencia incompleta, comunicaciones fuera de plazo o deficiencias relevantes en cancelaciones." },
{ nivel: "Medio", texto: "Deficiencia de control sin incumplimiento directo evidente." },
{ nivel: "Bajo", texto: "Observaciones documentales o de eficiencia." }
]
},

/* Matriz de responsabilidades */
responsabilidades: [
{ nombre: "Sergio Olivero", rol: "Líder Mesa Otorgante", objetivo: "Lidera y coordina al equipo de la mesa Otorgante, asegurando el cumplimiento de los objetivos en tiempo y forma.", mesas: ["otorgante"] },
{ nombre: "Agustín Nava", rol: "Líder Habilitadores", objetivo: "Lidera y coordina al equipo de la mesa Habilitadores, asegurando el cumplimiento de los objetivos en tiempo y forma.", mesas: ["otorgante", "habilitadores"] },
{ nombre: "Christian Carreón", rol: "Líder Mesa Ordenante", objetivo: "Lidera la gestión integral de riesgos operativos y de crédito: KRI, límites, prelación y validación de capacidad de pago.", mesas: ["otorgante", "ordenante"] },
{ nombre: "Juan Ramón Becerra", rol: "Arquitecto", objetivo: "Define la arquitectura y la solución técnica: integración con CECOBAN, adaptación del core y sistema de originación.", mesas: ["habilitadores"] },
{ nombre: "Isaí Juárez", rol: "Product Owner", objetivo: "Representa la necesidad de negocio, prioriza la solución y asegura que la entrega genere el valor esperado.", mesas: ["otorgante", "ordenante", "habilitadores"] },
{ nombre: "Abigail Vásquez", rol: "Project Manager", objetivo: "Coordina el día a día: plan de trabajo, entregables, cadencia, gestión y seguimiento entre mesas.", mesas: ["otorgante", "ordenante", "habilitadores"] },
{ nombre: "Mauricio Méndez", rol: "Arquitecto de negocio", objetivo: "Habilita el modelo operativo integral de prospección, otorgamiento y servicio.", mesas: ["habilitadores"] },
{ nombre: "Carlos Budar", rol: "Rentabilidad", objetivo: "Gestiona el modelo de rentabilidad: ingresos, gastos y costos de fondeo, originación y servicing.", mesas: ["otorgante"] },
{ nombre: "Diana Ángeles", rol: "Modelo de negocio y producto", objetivo: "Define la propuesta de valor del producto: mercado objetivo, oferta de crédito y captación, y conceptualización del cliente.", mesas: ["otorgante"] },
{ nombre: "Rodrigo De Marchena", rol: "Certificación y auditoría", objetivo: "Garantiza el cumplimiento de auditoría y certificación mediante evidencia documental y el dictamen de Auditoría Interna.", mesas: ["otorgante", "ordenante", "habilitadores"] },
{ nombre: "Karen Ramírez", rol: "Journey funcional", objetivo: "Diseña y optimiza el journey del cliente, alineando procesos, controles y tecnología.", mesas: ["otorgante", "ordenante", "habilitadores"] },
{ nombre: "Diana Torres", rol: "Procesos y atención a clientes", objetivo: "Diseña e implementa los procesos de atención y servicio al cliente, y la gestión de aclaraciones.", mesas: ["habilitadores"] },
{ nombre: "Sergio Olivero y Rubén Cohen", rol: "Comercialización", objetivo: "Diseñan e implementan la estrategia de masificación de productos y canales de distribución.", mesas: ["otorgante"] },
{ nombre: "Miguel Martínez", rol: "Normatividad", objetivo: "Diseña la metodología de capacidad de pago y las políticas de otorgamiento, validadas por Riesgos.", mesas: ["otorgante"] },
{ nombre: "Alejandra Muñoz", rol: "Funcional y pruebas", objetivo: "Diseña procesos y pruebas funcionales de prelación, otorgamiento, domiciliación y conciliación.", mesas: ["ordenante", "habilitadores"] },
{ nombre: "Gabriela Hernández", rol: "Legal", objetivo: "Asegura la estructura jurídica y contractual del negocio: carta vinculante y contrato marco.", mesas: ["ordenante", "habilitadores"] },
{ nombre: "Nelly Trejo", rol: "Operaciones", objetivo: "Diseña e implementa el manual de operaciones: procesos, roles, controles y lineamientos operativos.", mesas: ["otorgante", "ordenante", "habilitadores"] },
{ nombre: "Aura Marrón", rol: "Banca Patrimonial", objetivo: "Diseña el mecanismo de identificación de cuentas ordenantes, con trazabilidad y validación.", mesas: ["ordenante"] }
],

cadencia: {
estado: "Por autorizar",
dias: [
{ dia: "Lunes", mesa: null },
{ dia: "Martes", mesa: null },
{ dia: "Miércoles", mesa: "otorgante" },
{ dia: "Jueves", mesa: "habilitadores" },
{ dia: "Viernes", mesa: "ordenante" }
],
nota: "El primer mes las sesiones son semanales; después se evaluará cambiarlas a quincenales. La Mesa de decisión sesiona la última semana de cada mes."
},

recursos: {
fuente: "Mesa de decisión, 9 sep 2026",
posiciones: [
{ mesa: "otorgante", actividad: "Mercado objetivo: oportunidad, barreras de entrada y definición de fases", responsable: "Diana Ángeles", posicion: "Especialista", n: 1, tipo: "Estructural", temporalidad: "Por definir" },
{ mesa: "otorgante", actividad: "Producto crédito y captación: competitividad, precio, monto y comisiones", responsable: "Diana Ángeles", posicion: "Gerente", n: 1, tipo: "Estructural", temporalidad: "Por definir" },
{ mesa: "otorgante", actividad: "Procesos, atención a clientes y ciclo operativo mensual", responsable: "Diana Torres", posicion: "Gerente", n: 1, tipo: "Operacional", temporalidad: "Permanente" },
{ mesa: "otorgante", actividad: "Procesos, atención a clientes y ciclo operativo mensual", responsable: "Diana Torres", posicion: "Coordinador", n: 1, tipo: "Operacional", temporalidad: "Permanente" },
{ mesa: "otorgante", actividad: "Procesos, atención a clientes y ciclo operativo mensual", responsable: "Diana Torres", posicion: "Especialistas (post venta)", n: 3, tipo: "Operacional", temporalidad: "Permanente" },
{ mesa: "otorgante", actividad: "Procesos, atención a clientes y ciclo operativo mensual", responsable: "Diana Torres", posicion: "Ejecutivos (atención a clientes)", n: 3, tipo: "Operacional", temporalidad: "Permanente" },
{ mesa: "otorgante", actividad: "Operar el otorgamiento de crédito CAN", responsable: "Nelly Trejo", posicion: "Gerente", n: 1, tipo: "Operacional", temporalidad: "Permanente" },
{ mesa: "otorgante", actividad: "Operar el otorgamiento de crédito CAN", responsable: "Nelly Trejo", posicion: "Especialistas (procesamiento y mesa de control)", n: 2, tipo: "Operacional", temporalidad: "Permanente" },
{ mesa: "ordenante", actividad: "Mecanismo de atención de aclaraciones (SAAC con CECOBAN)", responsable: "Alejandra Muñoz", posicion: "Especialista", n: 1, tipo: "Implementación", temporalidad: "Temporal" },
{ mesa: "habilitadores", actividad: "Construcción del sistema: validación funcional y matriz de pruebas integrales", responsable: "Alejandra Muñoz", posicion: "Especialista", n: 1, tipo: "Implementación", temporalidad: "Temporal" },
{ mesa: "habilitadores", actividad: "Construcción del sistema: operativa de la cámara y mejora continua", responsable: "Alejandra Muñoz", posicion: "Especialista", n: 1, tipo: "Operacional", temporalidad: "Permanente" },
{ mesa: "habilitadores", actividad: "Preparación interna: flujogramas, validación de procesos y documentación", responsable: "Mauricio Méndez", posicion: "Especialistas", n: 2, tipo: "Implementación", temporalidad: "Temporal" },
{ mesa: "habilitadores", actividad: "Transversal: asegurar la definición funcional integral del CAN", responsable: "Karen Ramírez", posicion: "PO Sr", n: 1, tipo: "Implementación", temporalidad: "Temporal" },
{ mesa: "habilitadores", actividad: "Construcción del sistema de originación TI, core bancario, PUC e integración", responsable: "Juan Ramón Becerra", posicion: "Servicios de desarrollo externo (en dimensionamiento)", n: 1, tipo: "Implementación", temporalidad: "Temporal" }
],
enAprobacion: [
{ mesa: "ordenante", actividad: "Certificación como banco ordenante (y otorgante)", responsable: "Christian Carreón", posicion: "Especialista de auditoría", n: 1, temporalidad: "Permanente", detalle: "Auditoría del nuevo producto CAN, seguimiento de eventos operativos y de seguridad informática, auditoría del plan de prevención de fraude en TI y seguimiento de la auditoría de Indeval." }
],
consultor: [
{ mesa: "otorgante", requiere: false },
{ mesa: "ordenante", requiere: false },
{ mesa: "habilitadores", requiere: true, detalle: "Documentación de procesos (manual de operaciones)." }
]
},

/* Carpetas de referencia (requieren acceso con cuenta de Consubanco) */
documentos: [
{
grupo: "Contexto del programa",
enlace: "https://drive.google.com/drive/folders/11fIIHn-wKXwYNXAYLVuntwj6rw80BEjJ",
items: ["Circular 6/2025", "Kick off", "Integración de equipos y metodología", "Propuesta de la consultora Akya"]
},
{
grupo: "Operaciones",
enlace: "https://drive.google.com/drive/folders/189bjh2vaB7bYqeB2gWY6qOtlS_LK2auY",
items: ["Circular 6/2025", "Minutas y consultas del gremio a Banxico, con respuestas", "Plan de trabajo con fechas", "Entendimiento operativo de Domi CAN", "Catálogos y causas de rechazo de la operación CAN"]
},
{
grupo: "Tecnología (CECOBAN v1.2)",
enlace: "https://drive.google.com/drive/folders/19SyDQNWtCw8a-1qCxpMGIcdNtnWkxdHF",
items: ["Especificaciones técnicas CAN v1.2", "Guía de conexión al simulador CAN v1.2", "CAN Schemas JSON v1.2 ABM", "CAN Ejemplos JSON v1.2 ABM"]
}
]
};
