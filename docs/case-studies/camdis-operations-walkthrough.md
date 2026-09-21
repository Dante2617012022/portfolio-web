# Camdis Operations: guion de demostración técnica

**Duración propuesta:** 5–7 minutos. **Estado:** guion preparado; demostración pendiente de ejecutar y registrar.

Este documento acompaña al [caso público del ERP](camdis-operations-security.md). Los ejemplos son ficticios y los resultados de la tabla son criterios de aceptación, no resultados de una nueva sesión.

## Preparación

Usar un entorno de demostración aislado, con datos artificiales y dos identidades de prueba: una con permiso para la operación elegida y otra sin ese permiso. Los nombres de pantalla pueden ser “Operador de ejemplo” y “Usuario de ejemplo”; no representan roles internos.

Elegir un material ficticio, “Insumo de prueba”, y una cantidad de ejemplo. No conectar la demostración con inventario, identidades ni servicios operativos.

## Recorrido

| Escena | Qué mostrar | Criterio observable |
|---|---|---|
| 1. Permiso denegado | Intentar la misma operación con la identidad sin permiso. Explicar la diferencia entre ocultar un botón y autorizar en el servidor. | Se rechaza la operación y el estado del inventario no cambia. |
| 2. Reintento seguro | Registrar una recepción ficticia y repetir la misma intención con la misma clave. | Se recupera la misma operación; el stock cambia una sola vez. |
| 3. Corrección trazable | Corregir la operación elegida mediante su flujo autorizado. Comparar el estado antes y después y mostrar el historial. | El resultado corregido es consistente y la evidencia original sigue disponible. |

En la segunda escena, cambiar el contenido manteniendo la clave debe producir un conflicto. Ejecutar dos solicitudes sucesivas ilustra reutilización; **no demuestra concurrencia**. Para demostrar concurrencia hace falta un ensayo simultáneo separado.

En la tercera escena, elegir una corrección admitida por las reglas vigentes y usar el procedimiento documentado del entorno de prueba. No modificar datos directamente para fabricar el resultado.

## Cómo registrar evidencia útil

Para cada escena, conservar una captura del estado previo y otra del resultado, junto con una explicación breve de la acción, el resultado esperado y el observado. Registrar internamente la revisión de código y la fecha usadas.

Si una escena falla, registrar el fallo y analizarlo antes de publicar. No presentar el criterio esperado como si fuera el resultado observado.

Antes de publicar capturas o una grabación, comprobar que no aparezcan direcciones internas, rutas administrativas, tokens, identificadores, datos personales, precios ni información comercial. Aplicar la [política de divulgación](../PUBLIC_DISCLOSURE_POLICY.md), incluidos metadatos y enlaces.

## Preguntas para defender las decisiones

1. ¿Por qué la interfaz no puede ser la frontera de autorización?
2. ¿Qué ocurre si una solicitud se repite después de persistir, pero antes de recibir respuesta?
3. ¿Por qué una consulta previa no evita por sí sola una carrera entre solicitudes?
4. ¿Qué conserva una transacción si falla una escritura intermedia?
5. ¿Cómo reconstruirías una operación después de una corrección?
6. ¿Qué aspectos de esta sesión no cubren las pruebas automatizadas?

Al explicar el desarrollo, distinguir el aporte propio, las bibliotecas utilizadas y la asistencia de IA. Vincular cada decisión a una revisión o prueba concreta que se pueda explicar.

[Volver al caso de estudio](camdis-operations-security.md)
