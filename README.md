# Programa CAN · Tablero ejecutivo

Tablero estático (HTML, CSS y JavaScript puro, sin frameworks) para Dirección Ejecutiva y sponsors del Programa CAN (Crédito Asociado a la Nómina) de Grupo Consupago.

**URL publicada:** https://avaguilar-do.github.io/Proyecto-CAN/

## Pestañas

| Pestaña | Contenido |
|---|---|
| Tablero | Objetivo, cuenta regresiva al 29-jun-2027, ruta de hitos, decisiones pendientes, alertas, próximos vencimientos, estructura de mesas, avance del arranque y oportunidad de negocio |
| Actividades | Realizadas y próximas a vencer por mesa, con estado automático y filtro por mesa; EDT de la construcción del sistema |
| Resumen semanal | Vista automática de "esta semana" y resumen de cada semana con minutas |
| Timeline del proyecto | Gantt por mesa, plan de auditoría regulatoria y lista de hitos |
| Timeline CECOBAN | Roadmap de CECOBAN, tabla de detalle, flujo operativo y macroproceso de originación |
| Regulatorio y auditoría | Estatus regulatorio, plazos clave y matriz maestra de auditoría filtrable por riesgo |
| Equipo y recursos | Roles, cadencia, matriz de responsabilidades, recursos solicitados, consultor y documentos |

## Archivos

```
index.html Estructura de la página y pestañas
styles.css Estilos (paleta azul Consupago, responsivo e impresión)
app.js Lógica: pestañas, estados por fecha, Gantt y renderizado
data.js TODOS los datos del tablero (el único archivo a editar)
.nojekyll Indica a GitHub Pages que publique los archivos tal cual
README.md Este documento
```

## Publicar en GitHub Pages

1. Sube los archivos a la raíz de la rama `main` del repositorio.
2. En el repositorio: **Settings → Pages**.
3. En **Build and deployment → Source** elige **Deploy from a branch**.
4. Selecciona la rama **main** y la carpeta **/ (root)**, y guarda.
5. En 1 a 3 minutos el sitio queda en https://avaguilar-do.github.io/Proyecto-CAN/ con HTTPS (en dominios `github.io` el HTTPS es automático; verifica que **Enforce HTTPS** esté marcado).

## Actualizar la información (cada semana)

Todo se edita en `data.js`:

- **Actividad nueva:** agrega un objeto en `actividades` con `mesa`, `titulo`, `responsable` y `fin` (AAAA-MM-DD).
- **Cerrar una actividad:** agrega `estado: "completado"` y deja en `fin` la fecha real de cierre.
- **Resumen de la semana:** copia un bloque de `semanas` y ajusta fechas, titular, puntos por mesa, acuerdos, alertas y siguientes pasos.
- **Fecha de corte:** cambia `corte` en la primera línea de datos.

Los estados (vencida, vence pronto, en curso, programada) se calculan solos con la fecha del día.

**Probar otra fecha:** agrega `?hoy=AAAA-MM-DD` a la URL, por ejemplo `.../Proyecto-CAN/?hoy=2026-10-20#actividades`.

## Privacidad

El contenido es información interna. En cuentas gratuitas de GitHub, un sitio de Pages es público aunque no aparezca en buscadores (la página incluye `noindex`). Para restringir el acceso se requiere GitHub Enterprise Cloud con Pages privado.
