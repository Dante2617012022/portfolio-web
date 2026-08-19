# Camdis Operations Platform — caso de estudio de Security Engineering

## Resumen

Camdis Operations Platform es un proyecto aplicado para transformar registros operativos informales de producción e inventario en flujos estructurados, trazables y auditables.

El objetivo del caso de estudio no es publicar la implementación privada ni describir una topología real. La evidencia pública se concentra en el razonamiento de seguridad: qué riesgos se identificaron, dónde se colocaron los controles, cómo se validaron y qué límites se mantuvieron explícitos.

**Estado:** release candidate validada en entorno de pruebas/UAT. No se presenta como certificación, cumplimiento formal ni sistema completamente endurecido para producción.

## Problema de seguridad e integridad

En un sistema que registra movimientos físicos, producción, correcciones y cierres, una falla de diseño puede producir efectos difíciles de detectar:

- duplicación de movimientos por reintentos o doble envío;
- cambios sin trazabilidad del actor;
- correcciones destructivas que eliminan evidencia previa;
- expansión accidental de privilegios durante cambios de roles;
- callbacks externos no autenticados alterando estados internos;
- migraciones aplicadas sobre una base incorrecta o con historial ambiguo;
- historiales extensos que degradan la experiencia operativa y aumentan consumo innecesario;
- errores de paginación que omiten o duplican registros en límites temporales.

Por eso el proyecto trata la integridad, autenticación, autorización, idempotencia, auditabilidad y change control como requisitos de seguridad, no sólo como detalles de desarrollo.

## Controles implementados

### Identidad y autorización server-side

La aplicación utiliza un proveedor OIDC y tokens firmados. La API valida la identidad antes de permitir operaciones protegidas y mantiene la autorización como responsabilidad del backend.

El navegador puede ocultar acciones que un usuario no debe utilizar, pero no se considera una frontera de seguridad. Las decisiones privilegiadas se evalúan en la API y en políticas de dominio probadas semánticamente.

Durante una normalización del modelo de roles se evitó convertir compatibilidad heredada en una ampliación automática de privilegios. La transición se diseñó para conservar compatibilidad sólo en el límite de autenticación y mantener las decisiones de negocio sobre roles canónicos.

**Principios demostrados:** least privilege, separation of duties, deny by default y control de privilegios durante migraciones IAM.

### Idempotencia y concurrencia

Las mutaciones críticas incorporan claves de idempotencia acotadas, fingerprints canónicos del request, transacciones y constraints de unicidad en base de datos.

El objetivo es que un timeout, un doble click o varias solicitudes concurrentes no generen dos efectos físicos o contables para la misma intención del usuario.

La resolución de la carrera no depende sólo de una verificación previa en aplicación: la base de datos participa como autoridad de integridad.

**Principios demostrados:** atomicidad, idempotencia, defensa en profundidad y seguridad ante condiciones de carrera.

### Evidencia append-only y correcciones auditables

El diseño evita borrar silenciosamente evidencia confirmada para “corregir” una operación. Cuando corresponde una corrección, el registro original permanece disponible y se agrega evidencia de la acción correctiva con actor, motivo y timestamp.

Esta decisión mejora la capacidad de reconstruir qué ocurrió durante una revisión de integridad, un incidente o una conciliación.

**Principios demostrados:** auditabilidad, non-repudiation operacional, trazabilidad y conservación de evidencia.

### Proveniencia de migraciones y cambio fail-safe

Se implementó un ledger de migraciones que conserva metadata y checksums normalizados para detectar drift y cambios inesperados en archivos históricos.

La evidencia del ledger es inmutable y la ejecución de cambios se serializa para evitar carreras entre procesos de despliegue.

Un hardening adicional hace que el mecanismo de `apply` rechace bases nuevas, no administradas o inconsistentes cuando la proveniencia de su baseline es ambigua. En lugar de “adivinar” cómo provisionar el entorno, falla cerrado y exige un flujo explícito.

**Principios demostrados:** change control, fail-safe defaults, integrity checking, provenance y separación entre provisioning y migration history.

### Webhooks externos autenticados

La integración de notificaciones externas utiliza validación criptográfica del callback antes de interpretar su contenido o tocar persistencia.

El diseño también limita el callback a mensajes ya conocidos por la plataforma: un identificador externo desconocido no puede inventar evidencia local por sí solo.

Se minimiza la información persistida de proveedores externos y los estados se procesan con reglas controladas para evitar regresiones o transiciones incoherentes.

**Principios demostrados:** authentication of external data, data minimization, trust-boundary validation y monotonic state handling.

### Paginación determinística y precisión temporal

El historial operativo utiliza keyset pagination con un orden total y determinístico. Se identificó un riesgo sutil: la base de datos puede conservar más precisión temporal que la representación estándar del navegador.

El cursor opaco mantiene la precisión necesaria para que el límite de una página coincida exactamente con el orden de la base de datos, evitando depender de una representación temporal degradada en el cliente.

**Principios demostrados:** data integrity, deterministic ordering y prevención de skip/duplicate en paginación.

### Presentación acotada sin pérdida de historial

Las vistas operativas evitan listas crecientes sin límite. Los historiales se presentan de forma paginada o acotada y el acceso explícito a registros anteriores continúa disponible.

El objetivo es separar “evidencia histórica completa” de “contexto operativo inmediato”, manteniendo trazabilidad sin degradar innecesariamente la interfaz.

**Principios demostrados:** bounded resource usage, availability y evidencia preservada.

## Validación

El proyecto mantiene evidencia privada más detallada de pruebas y UAT. Para el portfolio público se resume únicamente lo necesario:

- regresiones completas de API y frontend superadas;
- validaciones focalizadas de RBAC y políticas privilegiadas;
- pruebas de idempotencia y concurrencia;
- verificación de integridad y proveniencia de migraciones;
- pruebas runtime de rechazo fail-closed sobre targets no provisionados;
- validación de callbacks externos autenticados;
- pruebas de paginación en límites de precisión temporal;
- build de frontend y health/readiness del servicio validados;
- worktrees limpios al cierre de gates de cambio.

Los resultados completos, identificadores internos, rutas, configuración y evidencia operativa permanecen en el repositorio privado.

## Threat model resumido

| Riesgo | Control principal |
|---|---|
| Suplantación de actor | Identidad derivada del token autenticado y validación server-side |
| Escalada de privilegios | RBAC canónico, compatibilidad heredada aislada y pruebas semánticas |
| Duplicación por retry | Idempotency key + fingerprint + constraint de DB |
| Escritura parcial | Transacciones y rollback |
| Manipulación de historial | Evidencia append-only y correcciones explícitas |
| Drift de esquema | Checksums y ledger de migraciones inmutable |
| Target de DB ambiguo | Migración fail-closed |
| Callback externo falsificado | Firma criptográfica antes de procesar contenido |
| Registros omitidos/duplicados | Keyset pagination determinística con precisión preservada |
| Crecimiento indefinido de UI | Historial paginado y vistas operativas acotadas |

## Competencias que demuestra

- Security Engineering aplicado a un sistema realista de negocio.
- AppSec y diseño de APIs con controles server-side.
- IAM/OIDC/RBAC y least privilege.
- Modelado de amenazas y análisis de trust boundaries.
- Integridad transaccional, idempotencia y concurrencia.
- Audit logging y preservación de evidencia.
- Seguridad de webhooks y HMAC.
- Change management y migraciones auditables.
- PostgreSQL, Node.js/Fastify, Docker y Linux Debian.
- UAT basado en evidencia y documentación de decisiones.

## Límites de divulgación

El proyecto fuente permanece privado. Este caso de estudio no publica:

- IP, hosts, puertos, dominios ni topología operativa;
- rutas o contratos internos de API;
- nombres internos de roles, clientes IAM o cuentas;
- versiones desplegadas ni archivos de configuración;
- secretos, tokens, certificados o credenciales;
- datos personales, inventarios, pedidos, logs o información comercial;
- una lista accionable de controles ausentes o riesgos residuales del entorno real.

La publicación sigue la [política de divulgación pública](../PUBLIC_DISCLOSURE_POLICY.md).

## Cómo presentarlo en una entrevista

Una forma breve de resumir el proyecto es:

> “Tomé un flujo operativo con riesgo de duplicación, cambios sin trazabilidad y dependencia de registros informales, y lo convertí en un sistema donde identidad, autorización, integridad transaccional, evidencia append-only y change control están incorporados desde el diseño. Además documenté y validé los controles en UAT, incluyendo casos fail-closed y problemas sutiles de paginación y precisión temporal.”
