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
corte: "2026-10-22",

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
areas: ["Finanzas", "Canales", "Estrategia", "Riesgos", "Operaciones", "Jurídico"],
integrantes: ["Sergio Olivero", "Carlos Budar", "Rubén Cohen", "Diana Angeles", "Karen Ramírez", "Rosaura Flores", "Christian Carreón", "Nelly Trejo", "Agustín Nava", "Miguel Martínez", "Federico Lage", "Aura Marrón", "Leonor Arias"],
entregables: [
"Certificación como banco con cuentas otorgantes",
"Modelo de negocio: mercado objetivo y producto de crédito y captación",
"Modelo y gestión de riesgos: KRI, límites, prelación, riesgo operativo y de crédito",
"Cálculo de capacidad de pago y políticas de otorgamiento",
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
areas: ["Operaciones", "Tecnología y Datos", "Regulatorio", "Riesgos", "Auditoría"],
integrantes: ["Agustín Nava", "Miguel Matus", "Gabriela Hernández", "Christian Carreón", "Rosaura Flores", "Nelly Trejo", "Karen Ramírez", "Rodrigo De Marchena", "Berenice Serrano", "Mauricio Méndez", "Leonor Arias"],
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
"Mecanismo de prelación",
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
{ nombre: "Instalación de cadencia de sesiones", avance: 100 }
]
},

/* Decisiones que requieren a la Mesa de decisión / Dirección */
/* Vacío muestra en el tablero "No hay decisiones pendientes por el momento" */
decisiones: [],

/* Alertas y riesgos. nivel: "alto" | "medio" */
/* Vacío muestra en el tablero "No identificados por el momento" */
alertas: [
{ nivel: "alto", titulo: "La ventana de pruebas cierra sin lograr la conexión con CECOBAN", detalle: "El periodo de pruebas termina el 23 de octubre y no se consigue la conexión ni siquiera con la respuesta previa de CECOBAN. Se reenviaron los correos solicitando retroalimentación, con el contacto de la ABM copiado, y no hay respuesta; se le llamará para que apoye a presionar a CECOBAN. Otros bancos tampoco han podido conectarse ni enviar los archivos JSON.", fuente: "Habilitadores, 22 oct 2026" }
],

/* Actividades por mesa. inicio es opcional; fin es la fecha compromiso.
ref = identificador de la minuta (opcional). */
actividades: [
/* ---- Mesa de decisión ---- */
{ mesa: "decision", titulo: "Sesión de entendimiento y constitución de las tres mesas de trabajo", responsable: "Abigail Vásquez", fin: "2026-09-09", estado: "completado", fuente: "Reportado en la Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Primera Mesa de decisión: integración de resultados, metodología de trabajo y draft del timeline general", responsable: "Abigail Vásquez", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Definición de roles de gobierno: Project Manager, Product Owner, arquitecto y arquitecto de negocio", responsable: "Mesa de decisión", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "decision", titulo: "Instalación de la cadencia de sesiones de las mesas", responsable: "Abigail Vásquez", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },

/* ---- Mesa Otorgante ---- */
{ mesa: "otorgante", titulo: "Sesión de actividades de la mesa: responsables asignados y evaluación de capacidades", responsable: "Sergio Olivero", fin: "2026-08-26", estado: "completado", fuente: "Presentación Mesa Otorgante, 26 ago 2026" },
{ mesa: "otorgante", titulo: "Definición de capacidades", responsable: "Sergio Olivero", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "otorgante", titulo: "Presentación Propuesta de producto: mercado objetivo, buyer persona, competencia y estrategia en tres fases", responsable: "Diana Angeles", fin: "2026-09-15", estado: "completado", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", titulo: "Propuesta de capacidad de pago y score de riesgo (conceptualmente correcta, sujeta a ajustes)", responsable: "Linda Romero", fin: "2026-09-15", estado: "completado", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", ref: "MO-01", titulo: "Compartir con el equipo la presentación de producto expuesta en la sesión", responsable: "Diana Angeles", fin: "2026-09-15", estado: "completado", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", ref: "MO-02", titulo: "Compartir la presentación de la propuesta de capacidad de pago y score de riesgo", responsable: "Linda Romero", fin: "2026-09-15", estado: "completado", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", titulo: "Sesión con el Director de Riesgos para revisar la propuesta de capacidad de pago y sus ajustes", responsable: "Abigail Vásquez", fin: "2026-10-02", estado: "completado", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },
{ mesa: "otorgante", ref: "MO-04", titulo: "Confirmar con CECOBAN qué incluye la variable “disponible” (variable inicial y ajustes)", responsable: "Nelly Trejo y equipo", fin: "2026-09-15", estado: "completado", fuente: "Minuta Mesa Otorgante, 15 sep 2026" },

/* ---- Mesa Ordenante ---- */
{ mesa: "ordenante", titulo: "Sesión de contexto: plan de auditoría regulatoria, matriz maestra de 18 puntos y cronograma propuesto", responsable: "Christian Carreón", fin: "2026-08-24", estado: "completado", fuente: "Contexto Modelo Ordenante, 24 ago 2026" },
{ mesa: "ordenante", titulo: "Definición de capacidades", responsable: "Christian Carreón", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "ordenante", titulo: "Coordinar la sesión para generar las matrices de funcionalidades, necesidades y validaciones de cada etapa de los macroprocesos", responsable: "Isaí Juárez", fechaTexto: "ASAP", nota: "Con Berenice Serrano y Rodrigo De Marchena", fuente: "Minuta Modelo Ordenante, 25 sep 2026" },
{ mesa: "ordenante", titulo: "Avisar a la mesa en qué momentos se podrán certificar los avances y buscar espacios de trabajo conjunto en las definiciones", responsable: "Isaí Juárez y Abigail Vásquez", estado: "continuo", fuente: "Minuta Modelo Ordenante, 25 sep 2026" },
{ mesa: "ordenante", titulo: "Gap assessment: matriz de brechas", responsable: "Rodrigo De Marchena", inicio: "2026-09-01", fin: "2026-10-31", fuente: "Cronograma de auditoría propuesto" },
{ mesa: "ordenante", titulo: "Modelo de operación ordenante", responsable: "Christian Carreón", inicio: "2026-09-21", fin: "2026-11-20", nota: "Fechas del draft del timeline", fuente: "Mesa de decisión, 9 sep 2026" },

/* ---- Habilitadores ---- */
{ mesa: "habilitadores", titulo: "Sesión de contexto: macroproceso de originación, flujo operativo CECOBAN y documentación técnica v1.2", responsable: "Agustín Nava", fin: "2026-08-25", estado: "completado", fuente: "Contexto Habilitadores, 25 ago 2026" },
{ mesa: "habilitadores", titulo: "Definición de capacidades", responsable: "Agustín Nava", fin: "2026-09-09", estado: "completado", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "habilitadores", titulo: "Conexión de la banca al simulador de CECOBAN", responsable: "Juan Ramón Becerra", inicio: "2026-09-01", fin: "2026-09-18", estado: "completado", fuente: "Draft del timeline (actividad finalizada)" },
{ mesa: "habilitadores", titulo: "Subir la matriz de cumplimiento regulatorio a la carpeta compartida", responsable: "Edsel Martínez", fin: "2026-09-11", estado: "completado", fuente: "Minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Actualizar la matriz de pruebas con casos de rechazo y sus motivos, y ajustar los macroprocesos", responsable: "Isaí Juárez", fin: "2026-09-24", estado: "completado", fuente: "Minuta Habilitadores, 24 sep 2026" },
{ mesa: "habilitadores", titulo: "Compartir la liga del tablero ejecutivo con el estatus de todas las mesas", responsable: "Abigail Vásquez", fin: "2026-09-28", estado: "completado", fuente: "Minuta Habilitadores, 24 sep 2026" },
{ mesa: "habilitadores", titulo: "Responder el comunicado de CECOBAN y solicitar un contacto que atienda la incidencia de conectividad", responsable: "Alejandra Muñoz", fin: "2026-09-29", estado: "completado", fuente: "Minuta Habilitadores, 24 sep 2026" },
{ mesa: "habilitadores", titulo: "Revisar con el proveedor del Core Bancario la cotización para la configuración de reserva de descuentos y aplicación de prelaciones sobre cuentas", responsable: "Miguel Matus, Esperanza Hernández y Juan Ramón Becerra", fechaTexto: "Por definir", nota: "Sin fecha compromiso: primero se revisa con el equipo y con el proveedor", fuente: "Minuta Habilitadores, 1 oct 2026" },
{ mesa: "habilitadores", titulo: "Compartir a la mesa la versión actualizada del alcance enviada por la consultora", responsable: "Abigail Vásquez", fin: "2026-10-15", estado: "completado", fuente: "Minuta Habilitadores, 15 oct 2026" },
{ mesa: "habilitadores", titulo: "Dar seguimiento con CECOBAN a la retroalimentación de las evidencias, revisar la fecha de cierre de la ventana de pruebas y externar que el retraso no es atribuible al banco", responsable: "Nelly Trejo y Alejandra Muñoz", fin: "2026-10-19", estado: "completado", fuente: "Minuta Habilitadores, 15 oct 2026" },
{ mesa: "habilitadores", titulo: "Revisar y validar el alcance de la consultora, rolarlo al interior con todos los equipos y enviar comentarios para que lo actualice", responsable: "Nelly Trejo y equipo", fin: "2026-10-19", estado: "completado", fuente: "Minuta Habilitadores, 15 oct 2026" },
{ mesa: "habilitadores", titulo: "Enviar correo formal a la ABM, con copia a CECOBAN, solicitando que se confirmen oficialmente las fechas de las actividades próximas a vencer que dependen de CECOBAN", responsable: "Nelly Trejo", fin: "2026-10-19", estado: "completado", fuente: "Minuta Habilitadores, 15 oct 2026" },
{ mesa: "habilitadores", titulo: "Entregar el plan con las fechas en que se concluirán las definiciones de los componentes a habilitar, mapeado contra el inventario de componentes", responsable: "Edsel Martínez e Isaí Juárez", fin: "2026-10-21", nota: "Permitirá a Tecnología determinar si se requieren recursos internos o externos", estado: "completado", fuente: "Minuta Habilitadores, 15 oct 2026" },
{ mesa: "habilitadores", titulo: "Revisar entre todas las mesas el alcance de la consultora y validarlo", responsable: "Todas las mesas", fin: "2026-10-26", nota: "Reprogramada: se revisará en el foro del 26 de octubre", fuente: "Minuta Habilitadores, 15 oct 2026" },
{ mesa: "habilitadores", titulo: "Recibir la cotización del consultor externo", responsable: "Rosaura Flores y Sergio Olivero", fin: "2026-10-19", nota: "La consultora envió una actualización del alcance el 15 de octubre, que ya incorpora el acompañamiento en la generación de manuales; se espera una actualización más junto con la cotización", estado: "completado", fuente: "Minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Generar la matriz de pruebas de los módulos de conexión con CECOBAN", responsable: "Isaí Juárez, Mauricio Méndez, Alejandra Muñoz y Nelly Trejo", fin: "2026-09-25", estado: "completado", fuente: "Minuta Habilitadores, 10 sep 2026" },
{ mesa: "habilitadores", titulo: "Volver a compartir el documento de definiciones actualizado con los comentarios de la sesión y validarlo con Operaciones", responsable: "Isaí Juárez", fin: "2026-10-22", estado: "completado", fuente: "Minuta Habilitadores, 22 oct 2026" },
{ mesa: "habilitadores", titulo: "Llamar al contacto de la ABM para que apoye a presionar a CECOBAN sobre las evidencias y el cierre de la ventana de pruebas", responsable: "Alejandra Muñoz", fin: "2026-10-22", estado: "completado", fuente: "Minuta Habilitadores, 22 oct 2026" },
{ mesa: "habilitadores", titulo: "Entregar a Tecnología el paquete de definiciones para que dimensione los recursos y componentes del CAN", responsable: "Isaí Juárez", fin: "2026-10-23", nota: "Primer entregable para el levantamiento de necesidades técnicas", fuente: "Minuta Habilitadores, 22 oct 2026" },
{ mesa: "habilitadores", titulo: "Compartir el tabulador aproximado del costo mensual de los recursos que requiere Operación", responsable: "Alejandra Muñoz", fin: "2026-10-23", nota: "Para integrarlo a los costos totales del proyecto", fuente: "Minuta Habilitadores, 22 oct 2026" },
{ mesa: "habilitadores", titulo: "Presentar en el foro con el líder de la mesa Otorgante la valoración de la propuesta de la consultora, explorar otras estrategias y mostrar el compilado de costos conocidos", responsable: "Abigail Vásquez", fin: "2026-10-26", nota: "Incluye los costos que informó CECOBAN", fuente: "Minuta Habilitadores, 22 oct 2026" },
{ mesa: "habilitadores", titulo: "Promover en la mesa Otorgante las definiciones de prospección, tableros e interacciones de datos que requiere Data Hub", responsable: "Abigail Vásquez", fin: "2026-10-26", fuente: "Minuta Habilitadores, 22 oct 2026" },
{ mesa: "habilitadores", titulo: "Evaluar si el desarrollo puede realizarse con equipo externo, con involucramiento del equipo interno de Tecnología, y proponer la mejor alternativa", responsable: "Juan Ramón Becerra", fechaTexto: "Al entregarse el SOW", fuente: "Minuta Habilitadores, 22 oct 2026" },
{ mesa: "habilitadores", titulo: "Entregar la estimación del bloque de proyectos 2027, que incluye el desarrollo de prelación en el core", responsable: "Juan Ramón Becerra", inicio: "2026-10-26", fin: "2026-10-30", nota: "Necesaria para el presupuesto del siguiente año", fuente: "Minuta Habilitadores, 22 oct 2026" },
{ mesa: "habilitadores", titulo: "Periodo de pruebas con el simulador API de CECOBAN", responsable: "Juan Ramón Becerra", inicio: "2026-09-14", fin: "2026-10-23", nota: "La ventana cierra el 23 de octubre sin posibilidad de otra prórroga. No se logra la conexión y los correos con evidencias siguen sin respuesta", fuente: "Roadmap CECOBAN; comunicado CECOBAN" },
{ mesa: "habilitadores", titulo: "CECOBAN informa el esquema de recuperación de gastos", responsable: "TBD", fin: "2026-10-16", estado: "completado", nota: "CECOBAN informó el esquema y la información se compartió al equipo", fuente: "Roadmap CECOBAN" },
{ mesa: "habilitadores", titulo: "Entrega de la carta vinculante a CECOBAN", responsable: "Gabriela Hernández (Legal)", inicio: "2026-10-19", fin: "2026-10-23", fuente: "Roadmap CECOBAN" },
{ mesa: "habilitadores", titulo: "Entrega del contrato marco", responsable: "Gabriela Hernández (Legal)", fin: "2026-10-28", fuente: "Roadmap CECOBAN" },
{ mesa: "habilitadores", titulo: "Construcción del sistema", responsable: "Juan Ramón Becerra", inicio: "2026-10-01", fin: "2027-03-31", nota: "Fechas del draft del timeline", fuente: "Mesa de decisión, 9 sep 2026" },
{ mesa: "habilitadores", titulo: "Compartir en la carpeta del programa toda la información que envíe la ABM", responsable: "Alejandra Muñoz", estado: "continuo", fuente: "Minuta Habilitadores, 10 sep 2026" }
],

/* Definiciones pendientes que se muestran en la pestaña Actividades */
definiciones: [
{ titulo: "Decisión sobre la consultora: el costo se considera elevado y se evaluarán otras estrategias", responsable: "Todas las mesas", nota: "A revisar el 26 de octubre" },
{ titulo: "Periodo a presupuestar: seis o siete meses de recursos, ante el retraso de CECOBAN", responsable: "Abigail Vásquez" },
{ titulo: "Costo del desarrollo de prelación en el core: sólo hay evaluación, se incluirá en la estimación del bloque de proyectos 2027", responsable: "Juan Ramón Becerra" },
{ titulo: "Conexión con CECOBAN: sin respuesta a las evidencias y la ventana de pruebas termina el 23 de octubre", responsable: "Alejandra Muñoz" },
{ titulo: "Definiciones de la mesa Otorgante: comercialización, oferta y prospección, que condicionan la participación de Data Hub", responsable: "Mesa Otorgante" },
{ titulo: "Recursos internos o externos para el desarrollo: Tecnología lo evaluará al recibir las definiciones", responsable: "Juan Ramón Becerra" }
],

/* Draft de la EDT de construcción del sistema */
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
inicio: "2026-10-19",
fin: "2026-10-23",
titular: "El paquete de definiciones queda listo para Tecnología y se cerraron los pendientes de la semana previa; el costo de la consultora se consideró elevado y la conexión con CECOBAN sigue sin lograrse.",
sesiones: [{ mesa: "habilitadores", fecha: "2026-10-22", nombre: "Sesión Mesa Habilitadores" }],
puntos: {
habilitadores: [
"La PMO presentó el plan de trabajo macro que elabora con Isaí Juárez, en revisión con Mauricio Méndez y Alejandra Muñoz. Ya se desglosaron varias actividades; faltan definiciones y revisar las relaciones de predecesoras y sucesoras. Al estar ligadas las dependencias, un cambio de fecha o duración actualiza el resto del plan. Las sesiones con negocio corren del 26 al 30 de octubre.",
"Isaí Juárez presentó el documento de definiciones. Para el modelo ordenante incluye recepción de solicitudes de disponibilidad, validaciones de consulta, envío de información, actualización de la prelación de cobro, registro en sistema, Domi CAN y mantenimiento. Para el otorgante, configuración del producto, cálculo de capacidad, prospección, consulta interbancaria vía CECOBAN, evaluación automática de capacidad de pago y elegibilidad, y conexión con buró. Contiene premisas, restricciones y un desglose en épicas con criterios de aceptación y capacidades tecnológicas. Falta explicitar la gestión de la cartera (contable, reportes regulatorios y cálculo de reservas), que se agregará al SOW.",
"El paquete se entrega a Tecnología el 23 de octubre como primer entregable para el levantamiento de necesidades técnicas. No incluye las necesidades de comercialización y oferta del modelo de negocio de la mesa Otorgante, que aún no se definen. Juan Ramón Becerra planteó ver el CAN en dos rutas: la habilitación y el cumplimiento frente a CECOBAN, y el caso de negocio, donde el proyecto Cash Loan se apalancará del CAN como canal de cobro mediante domiciliación.",
"Tecnología consultó al proveedor del core: la administración de prelaciones no es una funcionalidad nativa y requiere un desarrollo con costo. El equipo revisó cómo habilitarla sin construir un módulo completo; aún no hay costo, sólo la evaluación. La estimación del bloque de proyectos 2027 se entregará la próxima semana e incluirá esta parte.",
"Se pidió un roadmap más general sobre el cual detallar después las historias de usuario, incluir la planificación del cálculo de capacidad de pago que trabaja Riesgos, considerar una calculadora de capacidad con reglas propias y ubicar en el plan las pruebas integrales, que dependen de la estimación de Tecnología y orientan cuándo se necesitarán los recursos solicitados.",
"Data Hub señaló que aún no ubica cómo cuantificar su participación: las definiciones de prospección dependen de la mesa Otorgante. Mientras tanto puede involucrarse en el proceso que se entrega a Tecnología, asegurando que la información persista completa en las fuentes de datos y plataformas de explotación, ya que alimentará reportes regulatorios, estadísticas y métricas.",
"La ventana de pruebas se extendió una semana y finaliza el 23 de octubre. Tecnología compartió evidencias de que, aun con la respuesta previa de CECOBAN, no se logra la conexión; se reenviaron los correos sin obtener respuesta. El contacto de la ABM está copiado y se le llamará para presionar a CECOBAN, ya que otros bancos tampoco han podido conectarse ni enviar los archivos JSON."
],
otorgante: [
"Operaciones consideró sumamente alto el costo de la propuesta económica de la consultora para la parte documental y propuso recopilar la opinión de todas las mesas. La sesión con el líder de la mesa Otorgante se movió al lunes 26 de octubre para revisar la propuesta junto con los costos que informó CECOBAN. Se señaló que se necesitarán manos, pero que podría seguirse otra estrategia de menor costo, salvo que el mercado potencial y los beneficios del programa la sustenten."
]
},
acuerdos: [
"Se cerraron los pendientes de la semana previa: CECOBAN informó el esquema de recuperación de gastos y la información se compartió al equipo; Alejandra Muñoz compartió las fechas confirmadas, entre ellas la confirmación de participación en el CAN el 30 de octubre; se recibió la última actualización de la propuesta de la consultora; y el plan con fechas de las definiciones se envió el 21 de octubre mapeado contra el inventario de componentes.",
"Se integrará un compilado con los costos visibles a la fecha: la consultoría, marcada para evaluación; los costos de implementación y operación que dio a conocer CECOBAN, con la precisión de que cualquier funcionalidad incremental tendrá costos adicionales para todo el gremio; los recursos que requiere Operación; y lo que Tecnología estime necesario.",
"Se solicitará un rubro de servicios externos, en lugar de contrataciones, para el apoyo que requiere Operación, por un tema de plazo de tres meses validado previamente con Capital Humano.",
"Juan Ramón Becerra evaluará, al recibir las definiciones, si el desarrollo puede realizarse con equipo externo con involucramiento del equipo interno de Tecnología, y propondrá la mejor alternativa una vez entregado el SOW."
],
alertas: [
"La ventana de pruebas cierra el 23 de octubre sin que se logre la conexión y sin respuesta de CECOBAN a los correos con evidencias.",
"El costo de la propuesta de la consultora se considera elevado; la decisión se revisará el 26 de octubre junto con otras estrategias de implementación.",
"La administración de prelaciones no es nativa del core y requiere un desarrollo con costo, aún sin cuantificar.",
"Las definiciones de comercialización, oferta y prospección de la mesa Otorgante siguen pendientes y condicionan la participación de Data Hub."
],
siguientes: [
"Entregar a Tecnología el paquete de definiciones el 23 de octubre para que dimensione recursos y componentes.",
"Presentar el 26 de octubre, en el foro con el líder de la mesa Otorgante, la valoración de la propuesta de la consultora y el compilado de costos.",
"Definir el periodo a presupuestar, seis o siete meses, ante el retraso de CECOBAN.",
"Recibir de Tecnología la estimación del bloque de proyectos 2027, que incluye el desarrollo de prelación."
],
fuentes: ["Sesión Mesa Habilitadores, 22 oct 2026"]
},
{
inicio: "2026-10-12",
fin: "2026-10-16",
titular: "La consultora actualizó su alcance e incorporó los manuales, pero el diseño del flujo quedó fuera; CECOBAN amplió una semana las pruebas y acumula entregables con atraso.",
sesiones: [{ mesa: "habilitadores", fecha: "2026-10-15", nombre: "Seguimiento Habilitadores" }],
puntos: {
habilitadores: [
"La consultora envió una actualización de su alcance que ya incorpora una de las solicitudes de la mesa: el acompañamiento en la generación de manuales. La propuesta contempla manuales de procedimiento para crédito, políticas y facultades; onboarding, KYC y PLD; originación y dispersión; cobro voluntario y cobranza; cargo a cuenta y conciliación; renovación con mejora; designación, mandato y prelación; cancelación y cambio de banco; transparencia (CAT, contratos y RECA); UNE, quejas y atención a adultos mayores; y reporteo regulatorio, aplicables a Cash Loan Express, anticipo de nómina, Cash Loan y F3 CAN. Incluye una secuencia de trabajo por fases y se espera todavía una actualización más.",
"Operaciones señaló que entendía que la consultoría cubriría, además de la parte documental, el diseño completo del flujo y posiblemente la implementación. La PMO precisó que el alcance solicitado originalmente por esta mesa se limitaba a manuales y documentación, y que el diseño del flujo completo no está en la propuesta.",
"Sobre el apoyo externo por mesa: la Ordenante manifestó que haría su parte internamente y Habilitadores planteaba un esquema híbrido; falta recuperar la postura de Juan Ramón Becerra y de la mesa Otorgante. Se propuso retomar el tema con todas las mesas tras el primer contacto con la consultora. Tecnología indicó que, con las definiciones pendientes, aún no puede evaluar el alcance y que probablemente se requerirá apoyo externo.",
"Operaciones subrayó que la mesa está en un punto crucial: aunque se trabajan las primeras definiciones con la guía operativa de CECOBAN, falta definir el flujo de otorgamiento completo y sus reglas para que Tecnología pueda estimar, considerando el modelo integral de otorgamiento, la administración o generación de la cuenta otorgante y el ecosistema de transferencia de archivos con CECOBAN.",
"Soluciones de negocio confirmó su apoyo: trabaja con Isaí Juárez en matrices del lado otorgante y de prelación, y en la documentación que debe recabarse al aperturar un contrato de CAN, incorporando las definiciones a nivel matriz y regulatorio para después presentarlas a cada área.",
"Tecnología envió las evidencias a CECOBAN y monitorea el correo sin recibir respuesta; pidió apoyo para gestionar una llamada, ya que el tema se escaló sin solución. Operaciones consideró que la ventana de pruebas no tendría por qué cerrarse para el banco, dado que CECOBAN tuvo que reenviar la guía por inconsistencias en la primera versión y el atraso le corresponde a CECOBAN.",
"Quedó pendiente del lado de CECOBAN informar el esquema de recuperación de gastos, con vencimiento el 16 de octubre, y entregar la carta vinculante para revisión del área legal. Se dejó constancia de que estos atrasos son atribuibles a CECOBAN.",
"En la mesa gremial del CAN varios bancos expusieron su experiencia ante CECOBAN y anunciaron que no podrán salir en las fechas del plan. La ABM pidió a cada banco una estimación del tiempo que le llevaría la implementación."
],
otorgante: [
"La PMO señaló como punto relevante para la próxima sesión definir con qué producto se iniciará y en qué aplicación se implementará el CAN, por ejemplo si será en la nueva aplicación de inversiones u otra; esta definición podría depender de la definición de producto. Planteó como posible estrategia iniciar con Habilitadores, después con Ordenante y al final con Otorgante, una vez definido el modelo de negocio."
]
},
acuerdos: [
"Se compartió a la mesa la versión actualizada del alcance enviada por la consultora.",
"Nelly Trejo y su equipo revisarán y validarán el alcance de la consultora, incluida la propuesta de manuales, lo rolarán al interior con todos los equipos para asegurar que cubra todos los frentes documentales y enviarán comentarios para que la consultora lo actualice (19 de octubre). Todas las mesas lo revisarán y validarán el 22 de octubre.",
"Edsel Martínez e Isaí Juárez entregarán el 21 de octubre el plan con las fechas en que se concluirán las definiciones de los componentes a habilitar, mapeado contra el inventario de componentes, para que Tecnología determine si se requieren recursos internos o externos.",
"Nelly Trejo enviará correo formal a la ABM, con copia a CECOBAN, solicitando que se confirmen oficialmente las fechas de las actividades próximas a vencer que dependen de CECOBAN (19 de octubre)."
],
alertas: [
"CECOBAN amplió el periodo de pruebas una semana más, del 19 al 23 de octubre, y confirmó que no podrá ampliarlo otra vez porque no puede mover las fechas del plan de trabajo compartido a la banca.",
"El banco ejecutó las pruebas y envió las evidencias, pero sigue sin respuesta de CECOBAN pese a que el tema ya se escaló.",
"El esquema de recuperación de gastos venció el 16 de octubre sin que CECOBAN lo informara, y la carta vinculante tampoco se ha entregado para revisión legal.",
"Sin las definiciones de flujos, procesos y reglas, Tecnología no puede estimar el esfuerzo ni definir si se requieren recursos internos o externos."
],
siguientes: [
"Cerrar el alcance definitivo de la consultoría con los comentarios de todas las mesas y la nueva actualización de la propuesta.",
"Definir el flujo de otorgamiento completo y sus reglas para que Tecnología pueda estimar.",
"Definir con la mesa Otorgante con qué producto se inicia y en qué aplicación se implementará el CAN.",
"Gestionar una llamada con CECOBAN para destrabar la retroalimentación de las evidencias dentro de la última semana de pruebas."
],
fuentes: ["Seguimiento Habilitadores, 15 oct 2026", "Comunicado CECOBAN sobre la ampliación del periodo de pruebas"]
},
{
inicio: "2026-09-28",
fin: "2026-10-02",
titular: "Se restableció la conexión con CECOBAN y las pruebas resultaron satisfactorias salvo un hallazgo; la revisión del cronograma confirmó que no hay actividades en retraso.",
sesiones: [{ mesa: "habilitadores", fecha: "2026-10-01", nombre: "Seguimiento Habilitadores" }],
puntos: {
habilitadores: [
"El problema de conectividad se resolvió el 30 de septiembre: la guía que había enviado CECOBAN contenía errores y fue corregida. Con la guía corregida el equipo técnico ejecutó las pruebas y todas resultaron satisfactorias, salvo un hallazgo de incidencia en una conexión. Las evidencias y el hallazgo se enviaron a CECOBAN el 1 de octubre y se espera su respuesta.",
"Los hallazgos deben informarse antes de cada jueves para que CECOBAN regrese una confirmación. La ventana de pruebas cierra el 16 de octubre, por lo que se pidió dar seguimiento para no llegar con el tiempo justo.",
"Revisión del cronograma: modelo de negocio en ejecución con ajustes a los productos; certificación otorgante y ordenante en curso de forma continua, con Auditoría Interna participando en las sesiones para tener contexto; macroprocesos otorgante y ordenante ya elaborados, pendientes de desglosarse en actividades; conexión al simulador y matriz de pruebas concluidas. Se confirmó que no hay actividades en retraso.",
"Conforme al timeline de CECOBAN, la construcción del sistema debía iniciar el 1 de octubre a cargo del equipo de Tecnología. El siguiente paso relevante es bajar los macroprocesos a definiciones puntuales de los requerimientos que deberá preparar Tecnología.",
"La carta vinculante sigue programada para el 19 de octubre y está a la espera de la información de CECOBAN.",
"Se recorrió el tablero de seguimiento y se pidió al equipo enviar observaciones sobre las minutas, ya que alimentan el resumen semanal. Atendiendo una retroalimentación previa, el mecanismo de prelación ya se agregó a la mesa de Habilitadores, dado que no figuraba en ninguna mesa.",
"Grupos de trabajo de la ABM: no ha habido mesas recientes. En el grupo de Domican, Consubanco se manifestó a favor de que la cancelación de la domiciliación del CAN se realice solo en el banco otorgante y no en el ordenante, y planteó mantener un único formato de domiciliación para no tener que localizar al cliente en otros bancos cuando cambie de institución. Se pidió confirmar la fecha que dio Banxico para recibir a ambos grupos de trabajo; aún no hay respuesta.",
"Auditoría Interna propuso revisar de forma parcial cada entregable conforme se concluya, en lugar de esperar al final, y documentar cada revisión en el informe de auditoría que se elaborará a lo largo del proyecto. Las revisiones iniciarán cuando el equipo dé luz verde."
],
otorgante: [
"La sesión con el Director de Riesgos para revisar la propuesta de capacidad de pago y sus ajustes se llevó a cabo el 2 de octubre.",
"El líder de la mesa y producto revisaron las características del producto; el tema no está cerrado y se espera mayor claridad en la semana del 12 de octubre. La mesa de Habilitadores depende de esa definición para elaborar la matriz técnica de características con la que se configurará el producto en el core bancario.",
"Mientras la definición se cierra, se continuará con lo que solicita CECOBAN, con los habilitadores del lado otorgante y con el desglose detallado de actividades. Se solicitó una sesión con Inés, con fechas disponibles en la semana del 19 de octubre."
]
},
acuerdos: [
"Todo el equipo revisará el tablero de seguimiento y enviará dudas o comentarios, además de comunicar cualquier observación o desacuerdo sobre las minutas, ya que alimentan el resumen semanal del tablero.",
"Miguel Matus, con Esperanza Hernández y Juan Ramón Becerra, revisará con el proveedor del core bancario la cotización para la configuración de reserva de descuentos y la aplicación de prelación sobre las cuentas. Queda sin fecha compromiso: primero se revisa con el equipo y con el proveedor.",
"Auditoría Interna revisará parcialmente cada entregable conforme se concluya, documentando cada revisión en el informe de auditoría."
],
alertas: [
"La ventana de pruebas cierra el 16 de octubre y el hallazgo enviado el 1 de octubre sigue a la espera de respuesta de CECOBAN.",
"La definición de producto no está cerrada y de ella depende la matriz técnica de características para configurar el producto en el core.",
"La carta vinculante del 19 de octubre depende de información que aún no envía CECOBAN."
],
siguientes: [
"Dar seguimiento al hallazgo con CECOBAN, informando antes de cada jueves, para cerrar las pruebas antes del 16 de octubre.",
"Compartir la carta vinculante con Leonor Arias y su equipo una vez que CECOBAN envíe la información (Alejandra Muñoz).",
"Bajar los macroprocesos a definiciones puntuales de los requerimientos que deberá preparar Tecnología.",
"Cerrar el alcance de la propuesta con la consultora en la sesión del 12 de octubre para recibir la cotización.",
"Agendar la sesión con Inés para la mesa Otorgante en la semana del 19 de octubre."
],
fuentes: ["Seguimiento Habilitadores, 1 oct 2026"]
},
{
inicio: "2026-09-21",
fin: "2026-09-25",
titular: "La matriz de pruebas quedó lista y se entregó a la ABM, las pruebas con el simulador están detenidas por un problema de conectividad.",
sesiones: [
{ mesa: "habilitadores", fecha: "2026-09-24", nombre: "Seguimiento Habilitadores" },
{ mesa: "ordenante", fecha: "2026-09-25", nombre: "Seguimiento Modelo Ordenante" }
],
puntos: {
habilitadores: [
"Tecnología tiene los componentes habilitados, las aplicaciones instaladas y al equipo de Integraciones listo, pero no se logra comunicación con el sitio de CECOBAN: no se alcanza la IP del manual de pruebas ni la que se probó al inicio. Los puertos internos ya se abrieron y la incidencia se reportó con evidencia.",
"La ventana de pruebas exige reportar incidencias antes de cada jueves, con sesión con CECOBAN los viernes; esas sesiones aún no se realizan.",
"La matriz de pruebas cubre consulta y regreso de capacidad, confirmación del otorgamiento, regreso de la prelación y conciliación, e incluye los casos de rechazo y sus motivos. Es una primera versión: en abril se entrega una más amplia, trabajada con los bancos en la ABM.",
"El proceso del CAN debe contemplar la consulta al buró por otros créditos del cliente, no vinculados a su cuenta de nómina, y el reporte de la información de los clientes al buró.",
"Se generó y envió el NDA a la consultora, necesario para compartir la información sensible con la que cerrará su cotización; el proceso tomó dos semanas.",
"Tras presentar el planteamiento a la dirección ejecutiva se determinó que se requiere una consultoría que acompañe todo el proyecto, no solo las definiciones documentadas. La mesa seguirá avanzando con sus capacidades actuales para cumplir los tiempos del gremio y de CECOBAN."
],
ordenante: [
"Se presentó el macroproceso otorgante por etapas con los habilitadores de cada una: precalificación, originación, dispersión, prelación, cobro (C70, C72 y C71), conciliación y mantenimiento (C58). Contempla créditos sobre cuentas propias y sobre cuentas en otros bancos ordenantes.",
"Como banco ordenante, Consubanco responderá consultas de capacidad (C51), registrará los créditos y las prelaciones que informen otros bancos (C53), procesará instrucciones de cobro validando cuenta, saldo y prelación, y conciliará confirmaciones y devoluciones. Ya hay matrices de prueba para todos los escenarios.",
"Se distinguieron dos entregables que no deben confundirse: la guía de conexiones de las pruebas técnicas con CECOBAN y la matriz de pruebas que pidió la ABM, que quedó lista y se envió el 25 de septiembre.",
"CECOBAN asigna la prelación y el banco debe registrarla y administrarla en su core, funcionalidad que hoy no existe. El tema está en análisis técnico con el proveedor y se sugirió representarlo de forma explícita como habilitador del programa.",
"Auditoría trabajará en dos frentes: coordinar con Legal las definiciones normativas pendientes e ir certificando lo que se construya conforme el equipo avise."
]
},
acuerdos: [
"Matriz de pruebas actualizada con los casos de rechazo y los macroprocesos ajustados (Isaí Juárez), revisada y entregada (Alejandra Muñoz y Mauricio Méndez).",
"Se respondió el comunicado de CECOBAN para solicitar un contacto que atienda la incidencia de conectividad.",
"Se compartió la liga del tablero ejecutivo con el estatus de todas las mesas.",
"Isaí Juárez coordinará una sesión con Berenice Serrano y Rodrigo De Marchena para generar las matrices de funcionalidades, necesidades y validaciones de cada etapa.",
"La mesa Ordenante tendrá un grupo de chat para resolver temas sin convocar sesión, como el que ya opera en Habilitadores."
],
alertas: [
"Las pruebas con el simulador están detenidas.",
"El core no administra la prelación; falta confirmar si lo resuelve el proveedor o si se requiere un desarrollo externo que después se conecte."
],
siguientes: [
"Retomar las pruebas técnicas en cuanto CECOBAN confirme que sus sistemas están estables.",
"Recibir de la consultora el alcance redefinido para saber hasta dónde participará en las definiciones que hoy trabaja el equipo.",
"Generar las matrices de funcionalidades, necesidades y validaciones de cada etapa de los macroprocesos."
],
fuentes: ["Seguimiento Habilitadores, 24 sep 2026", "Seguimiento Modelo Ordenante, 25 sep 2026"]
},
{
inicio: "2026-09-14",
fin: "2026-09-18",
titular: "La Mesa Otorgante presentó la propuesta de producto y la arquitectura de capacidad de pago; Riesgos pidió no desviar los tiempos regulatorios del CAN.",
sesiones: [{ mesa: "otorgante", fecha: "2026-09-15", nombre: "Seguimiento Mesa Otorgante" }],
puntos: {
otorgante: [
"El cliente objetivo compite contra el préstamo familiar, el fiado o el empeño, y decide por rapidez, discreción y certeza de aprobación. La variable competitiva es la velocidad para liberar capacidad de pago.",
"Se propone Estrategia en tres fases según el mecanismo de cobro: Cash Express con pago voluntario, anticipo de pensión y Cash Loan con cargo a cuenta (requiere portar la pensión) y, al final, cobro vía CAN.",
"Se propone Regla de originación con tope de capacidad de pago de 30%; los montos mayores a 3,000 pesos se otorgan a dos meses. El CAT aún no se calcula.",
"Se propone Capacidad de pago = depósito neto − obligaciones externas (círculo de crédito) − reserva de liquidez (piso de 30%). El score pondera comportamiento, presión financiera, estabilidad y capacidad; se simularán factores de utilización de 30%, 40% y 50%."
],
habilitadores: [
"La conexión al simulador de CECOBAN se reporta como finalizada; el periodo de pruebas con el simulador API corre del 14 de septiembre al 16 de octubre."
]
},
acuerdos: [
"Compartir las presentaciones de producto y de capacidad de pago, agendar sesión con el Director de Riesgos y confirmar con CECOBAN el alcance de la variable “disponible”.",
"La propuesta de capacidad de pago se consideró conceptualmente correcta, sujeta a ajustes de detalle."
],
alertas: [
"El foco en Cash Express no debe desviar los plazos del CAN; la metodología de capacidad de pago tiene tiempos propios ante el Comité de Riesgos y Banxico.",
"Falta confirmar si la variable “disponible” de CECOBAN incluye los compromisos internos de cada banco y cómo refleja la prelación."
],
siguientes: [
"Concentrar el diseño en la fase 1 (Cash Express) y sustituir el pricing de mercado por un modelo con supuestos propios.",
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
"Avance del arranque: sesión de entendimiento y constitución de mesas al 100%; definición del consultor e identificación de recursos al 80%; cadencia de sesiones por autorizar.",
"Se requiere consultor para (1) desarrollo y validación de la estrategia, incluyendo cumplimiento, diseño de producto, validación de mercado, procesos y ciclo de vida; (2) acompañamiento de program management y proceso de implementación; (3) la función de arquitecto de negocio; y (4) generación de manuales.",
"Metodología de trabajo: Se propuso a Juan Ramón Becerra como arquitecto, Abigail Vásquez como Project Manager, Isaí Juárez como Product Owner y Mauricio Méndez como arquitecto de negocio.",
"Se solicitaron 20 posiciones adicionales: 13 para la Mesa Otorgante, 1 para la Mesa Ordenante y 6 para Habilitadores."
],
habilitadores: [
"Se compartió el draft de la EDT con 12 componentes de la construcción del sistema, desde el módulo de consultas de prelación y capacidad hasta la consistencia de datos.",
"El plan de trabajo que solicitó CECOBAN se enviará con las fechas que ellos establecieron; cualquier cambio se les notificará."
]
},
acuerdos: [
"Se solicitarán ajustes a la cotización del consultor Akya.",
"Matriz de pruebas de los módulos de conexión con CECOBAN al 25 de septiembre (Isaí Juárez, Mauricio Méndez, Alejandra Muñoz y Nelly Trejo).",
"Subir la matriz de cumplimiento regulatorio a la carpeta compartida el 11 de septiembre."
],
alertas: [
"Las autorizaciones de consultor y recursos siguen pendientes.",
"Los servicios de desarrollo externo aún están en dimensionamiento.",
"Falta definir dónde se ejecutará el flujo de otorgamiento (¿nueva aplicación? ¿PUC?) y los formatos de contrato."
],
siguientes: [
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
"Se asignaron responsables por actividad y se evaluaron capacidades."
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
nota: "Draft de alto nivel. Las fechas de las mesas son aproximadas y se confirmarán con el plan de trabajo y la ruta crítica.",
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
{ nombre: "Matriz de pruebas", inicio: "2026-09-19", fin: "2026-09-25", estado: "completado" },
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

};
