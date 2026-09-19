# Camdis Operations Platform: seguridad e integridad operativa

Proyecto propio para estructurar producción e inventario de una PyME gastronómica. Sustituye registros informales por operaciones autorizadas, trazables y verificables.

**Estado:** beta interna controlada, con desarrollo posterior sujeto a CI y UAT. La evidencia revisada corresponde a hitos documentados; no implica que todos los cambios de desarrollo estén integrados o desplegados. No es una certificación ni una auditoría independiente.

## Problema y responsabilidad

Un movimiento físico exige responder quién actuó, qué cambió y qué pasa si la operación falla o se reintenta. Un doble envío puede duplicar stock; una corrección destructiva puede ocultar lo ocurrido; un permiso excesivo puede permitir cambios no autorizados.

Mi trabajo comprende diseño y desarrollo de flujos, controles de acceso, integridad, pruebas y documentación. El alcance se concentra en producción, depósito e inventario; no se presenta como un ERP integral de contabilidad, ventas y recursos humanos.

## Decisiones y evidencia

| Riesgo | Decisión | Evidencia documentada |
|---|---|---|
| Acción privilegiada no autorizada | Validar identidad y roles en el servidor | Pruebas de autenticación y políticas semánticas de autorización |
| Reintento o doble envío duplica stock | Claves de idempotencia, huella del contenido y unicidad en base de datos | Ocho solicitudes concurrentes equivalentes y una sola recepción persistida |
| Escritura parcial | Recepción, líneas y movimientos dentro de una transacción | Pruebas de rollback y consistencia |
| Corrección que borra historia | Evidencia original más movimientos compensatorios | UAT documentada de corrección y anulación de conteos |
| Cambio de esquema no trazable | Ledger de migraciones, checksums y serialización | Pruebas de procedencia e integridad |
| Recuperación fallida | Restaurar aplicación e identidad en entorno aislado | Simulacro documentado con comprobación de invariantes |

## Caso concreto: reintento concurrente

En el escenario documentado de laboratorio, ocho solicitudes concurrentes con la misma intención produjeron una recepción nueva y siete respuestas de reutilización. Todas se asociaron al mismo registro; el efecto sobre el inventario se produjo una sola vez.

La garantía de unicidad reside en la base de datos y se combina con una transacción. Un chequeo previo en la interfaz o API, por sí solo, no resuelve la carrera.

Es una prueba específica con datos artificiales, no una garantía universal ni una prueba de carga de producción.

## Correcciones con trazabilidad

Las correcciones conservan el registro original e incorporan evidencia posterior. La identidad del actor se deriva de la autenticación; el cliente no decide quién realizó la operación.

Se demuestra trazabilidad y evidencia protegida por controles de acceso. No se afirma no repudio criptográfico ni inmutabilidad frente a cualquier administrador.

## Gobierno de cambios

- Ramas y pull requests con objetivo concreto.
- Pruebas de API, base de datos y cliente según el flujo.
- CI sobre la revisión del cambio y UAT operativa.
- Respaldo y reversión para activaciones relevantes.
- Distinción entre beta autorizada, integración y cambios en revisión.

## Alcance de verificación

Resumen contrastado el 19 de septiembre de 2026 con documentación privada de estado, idempotencia y validación de políticas de acceso de la rama de integración. Los resultados son históricos y documentados: no se volvieron a ejecutar los ensayos del ERP durante esta actualización del portfolio.

El código operativo, informes completos y despliegue permanecen privados. Una evaluación puede utilizar ejemplos ficticios y evidencia sanitizada, sin acceso a sistemas ni datos reales.

**Competencias:** IAM, autorización server-side, mínimo privilegio, transacciones, idempotencia, concurrencia, auditoría, gestión de cambios y continuidad.

[Índice de evidencias](../PORTFOLIO_EVIDENCE_INDEX.md) · [Política de divulgación](../PUBLIC_DISCLOSURE_POLICY.md)
