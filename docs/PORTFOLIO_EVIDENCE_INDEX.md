# Índice de evidencias técnicas

Este documento ayuda a reclutadores y evaluadores a revisar el portfolio por competencia, sin depender únicamente de afirmaciones personales.

## Seguridad aplicada y AppSec

### Camdis Commerce Platform

- [Caso de estudio sanitizado](case-studies/camdis-commerce-security.md)
- IAM con clientes OIDC separados.
- PKCE, MFA TOTP y RBAC.
- Sesiones BFF y cookies `HttpOnly`.
- CSRF, idempotencia y reglas de negocio en API.
- CI con secret scanning, escaneo de imágenes y SBOM.
- Backups, restauración y rollback.

**Estado:** repositorio privado; evidencia pública sanitizada.

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

- [Repositorio público](https://github.com/Dante2617012022/chatbot-hamburgueseria-v3)
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

## Evidencias que no se publican

Por seguridad y confidencialidad quedan fuera del portfolio público:

- secretos, tokens y cookies;
- credenciales y datos personales;
- configuraciones internas de Camdis;
- pedidos, precios operativos y usuarios reales;
- payloads ofensivos reutilizables;
- flags de desafíos activos;
- documentos académicos con enlaces privados o metadatos no sanitizados.
