# Índice de evidencias técnicas

Este documento ayuda a reclutadores y evaluadores a revisar el portfolio por competencia, sin depender únicamente de afirmaciones personales y sin exponer detalles operativos de sistemas reales.

## Recorrido para evaluación técnica

| Interés | Evidencia | Alcance |
|---|---|---|
| IAM e integridad | [Camdis Operations](case-studies/camdis-operations-security.md) | Beta interna; validaciones documentadas |
| AppSec y sesiones | [Camdis Commerce](case-studies/camdis-commerce-security.md) | Piloto técnico |
| Automatización e IA | [Chatbot](#automatización-segura-e-ia) | Proyecto privado; evidencia sanitizada |
| GRC | [Plan Director](case-studies/camdis-governance.md) | Propuesta en desarrollo |
| Pentesting | [Laboratorios](case-studies/offensive-security-labs.md) | Práctica académica autorizada |
| SOC | Soporte y formación en incidentes, detallados debajo | Experiencia transferible; sin empleo previo en SOC |

[Solicitar CV](https://dante2617012022.github.io/portfolio-web/#cv)

## Seguridad aplicada y AppSec

### Camdis Operations Platform

- [Caso de seguridad e integridad](case-studies/camdis-operations-security.md): lectura breve y tres controles con evidencia y límites.
- [Guion de demostración](case-studies/camdis-operations-walkthrough.md): datos ficticios y criterios observables; ejecución pendiente.
- Autenticación y autorización server-side.
- Idempotencia y transacciones ante reintentos.
- Correcciones auditables sin borrar evidencia confirmada.
- Cambios de esquema verificables, CI y UAT documentadas.

**Estado:** beta interna controlada con desarrollo posterior en revisión. Evidencia documentada, no auditoría independiente.


### Camdis Commerce Platform

- [Caso de estudio sanitizado](case-studies/camdis-commerce-security.md)
- separación de identidades y sesiones entre clientes y personal;
- OIDC, PKCE, MFA y autorización por roles;
- seguridad de sesiones y autorización backend;
- validación de entradas, idempotencia y reglas de negocio;
- CI con pruebas, análisis estático, detección de secretos, escaneo y SBOM;
- backups, restauración y rollback.

**Estado:** repositorio privado; evidencia pública sanitizada. La topología, configuración, endpoints, versiones y documentación operativa no se publican.

## Pentesting y seguridad ofensiva

### Laboratorios UGR

- [Resumen profesional](case-studies/offensive-security-labs.md)
- [Casos sanitizados en el repositorio académico](https://github.com/Dante2617012022/Actividades-UGR-Ciberseguridad/tree/main/hacking-etico)
- Pentesting web y Linux en entornos autorizados.
- SQLi, XSS, CSRF, IDOR, LFI, command injection y file upload.
- Post-explotación, escalada, movimiento lateral y pivoting.
- Reportes con impacto y remediación.

**Estado:** práctica académica; no se presenta como experiencia profesional de Red Team.

## Automatización segura e IA

### Chatbot de pedidos

**Estado:** proyecto privado. Se publica únicamente evidencia sanitizada de arquitectura, controles y prácticas de validación; no se expone el repositorio operativo.

- Parser determinístico con fallback de IA controlado.
- JSON Schema, umbral de confianza y allowlist de intenciones.
- Acciones sensibles bloqueadas para la IA.
- Rate limiting, sanitización y gestión de secretos.
- HMAC para webhooks de pago.
- CI, pruebas automatizadas y CodeQL.

## SOC, soporte e incidentes

### Experiencia profesional transferible

- Registro y seguimiento de incidentes.
- Priorización por impacto y criticidad.
- Trabajo con SLA.
- Diagnóstico y escalamiento.
- Redes, telecomunicaciones y Linux Debian.

La experiencia se presenta como soporte técnico y gestión operativa, sin afirmar experiencia formal previa dentro de un SOC.

## Formación académica

### Tecnicatura Universitaria en Ciberseguridad

- [Repositorio de actividades](https://github.com/Dante2617012022/Actividades-UGR-Ciberseguridad)
- Desarrollo seguro y OWASP.
- Criptografía y PKI.
- Gestión de riesgos, auditoría y SGSI.
- Continuidad del negocio.
- Cloud Security e infraestructuras críticas.
- Hacking ético y tratamiento de vulnerabilidades.

## Política de evidencia pública

La publicación se rige por la [política de divulgación pública](PUBLIC_DISCLOSURE_POLICY.md). Las tecnologías pueden mencionarse como competencias generales, pero no se vinculan con una topología productiva, versiones exactas, endpoints ni configuración real.

## Evidencias que no se publican

Por seguridad y confidencialidad quedan fuera del portfolio público:

- secretos, tokens, cookies, certificados y credenciales;
- datos personales, pedidos, precios operativos, usuarios y logs reales;
- IP, dominios internos, hosts, puertos, redes y topología;
- proveedor, región, tamaño o identificadores del hosting;
- rutas administrativas, endpoints internos y estructura completa de APIs;
- nombres de clientes IAM, audiencias, cookies, roles y cuentas;
- versiones operativas y archivos de configuración;
- controles pendientes, hallazgos abiertos o riesgos residuales con detalle explotable;
- payloads ofensivos reutilizables y flags de desafíos activos;
- documentos académicos con enlaces privados o metadatos no sanitizados.

