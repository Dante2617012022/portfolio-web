# Portfolio profesional - Dante Gabriel Balbuena Atar

Portfolio web orientado a posiciones junior de **ciberseguridad, SOC, Security Operations, AppSec y Security Engineering**.

El sitio conecta experiencia operativa en soporte técnico y gestión de incidentes con formación académica y proyectos aplicados de seguridad.

## Enlaces

- **Sitio publicado:** https://dante2617012022.github.io/portfolio-web/
- **Índice de evidencias:** [docs/PORTFOLIO_EVIDENCE_INDEX.md](docs/PORTFOLIO_EVIDENCE_INDEX.md)
- **Política de divulgación pública:** [docs/PUBLIC_DISCLOSURE_POLICY.md](docs/PUBLIC_DISCLOSURE_POLICY.md)
- **GitHub:** https://github.com/Dante2617012022
- **LinkedIn:** https://www.linkedin.com/in/dante-gabriel-balbuena-179963235/

## Posicionamiento profesional

**Ciberseguridad | SOC / Security Operations | AppSec / Security Engineering junior**

El portfolio diferencia claramente:

- experiencia profesional en soporte, telecomunicaciones, SLA y gestión de incidentes;
- proyectos aplicados de desarrollo y seguridad;
- pentesting y hacking ético realizados en laboratorios académicos autorizados;
- conocimientos en evolución que todavía no constituyen experiencia profesional especializada.

## Proyectos principales

### Camdis Operations Platform — Security Engineering

Proyecto privado de producción e inventario utilizado como caso aplicado de ingeniería de seguridad:

- identidad y autorización server-side con enfoque de mínimo privilegio;
- mutaciones transaccionales e idempotentes resistentes a retries y concurrencia;
- evidencia histórica preservada mediante correcciones auditables y append-only;
- proveniencia e integridad de migraciones con comportamiento fail-closed;
- autenticación criptográfica de callbacks externos;
- threat modeling, UAT y change control documentados;
- paginación determinística y vistas operativas acotadas sin eliminar historial.

El repositorio fuente y la documentación operativa permanecen privados. La evidencia pública se presenta mediante un [caso de estudio sanitizado](docs/case-studies/camdis-operations-security.md).

### Camdis Commerce Platform

Plataforma privada de pedidos y operación gastronómica con seguridad integrada:

- separación de identidades, sesiones y permisos entre clientes y personal;
- OIDC, PKCE, MFA y autorización por roles;
- seguridad de sesiones, validación de entradas y reglas de negocio en backend;
- pruebas automatizadas, análisis estático, detección de secretos, escaneo y SBOM;
- backups, restauración, actualización y rollback.

El código, la topología operativa y la configuración permanecen privados. La evidencia pública se presenta mediante un [caso de estudio sanitizado](docs/case-studies/camdis-commerce-security.md) que demuestra capacidades sin publicar inventarios, endpoints ni detalles productivos.

### Chatbot de pedidos con IA y controles de seguridad

Repositorio público que demuestra:

- arquitectura modular en Node.js;
- parser determinístico y fallback de IA controlado;
- JSON Schema, umbral de confianza y validación contra catálogo;
- bloqueo de acciones sensibles delegadas a IA;
- sanitización, rate limiting y gestión de secretos;
- HMAC para webhooks;
- pruebas automatizadas, CI y CodeQL.

[Ver repositorio](https://github.com/Dante2617012022/chatbot-hamburgueseria-v3)

### Hacking Ético y Tratamiento de Vulnerabilidades

Prácticas académicas sobre CTF, aplicaciones vulnerables y sistemas Linux:

- reconocimiento y enumeración;
- OWASP Top 10;
- SQLi, XSS, CSRF, IDOR, LFI y command injection;
- carga insegura y encadenamiento de hallazgos;
- escalada de privilegios;
- post-explotación, movimiento lateral y pivoting;
- reportes técnicos, impacto y remediación.

[Ver resumen profesional](docs/case-studies/offensive-security-labs.md)

## Objetivos laborales compatibles

- Analista SOC Nivel 1.
- Analista de ciberseguridad junior.
- Security Operations junior.
- AppSec / Security Engineering junior.
- Pentester o analista de vulnerabilidades junior.
- DevSecOps junior.
- IAM junior.
- Soporte e infraestructura con enfoque en seguridad.

No se afirma experiencia profesional como Red Team Operator. Las técnicas asociadas a red teaming fueron practicadas en laboratorios controlados.

## Competencias transferibles desde experiencia profesional

- Registro, clasificación y seguimiento de incidentes.
- Priorización por impacto y criticidad.
- Trabajo bajo SLA y métricas operativas.
- Diagnóstico, documentación y escalamiento técnico.
- Redes, telecomunicaciones y Linux Debian.
- Comunicación con usuarios y equipos técnicos.

## Tecnologías del portfolio web

- React 19.
- Vite 7.
- JavaScript.
- Framer Motion.
- Tailwind CSS.
- ESLint.
- GitHub Actions.
- GitHub Pages.

## Ejecución local

```bash
git clone git@github.com:Dante2617012022/portfolio-web.git
cd portfolio-web
npm ci
npm run dev
```

Validación:

```bash
npm run lint
npm run build
npm audit --audit-level=high
```

## Seguridad y privacidad

El portfolio es un sitio estático:

- no implementa autenticación;
- no almacena información de visitantes;
- no incorpora base de datos ni backend propio;
- no solicita credenciales;
- utiliza enlaces directos de contacto;
- abre enlaces externos con aislamiento de contexto.

Los casos de estudio publican capacidades, decisiones y evidencia sanitizada. No publican secretos, datos personales, inventarios productivos, IP, dominios internos, puertos, rutas administrativas, nombres de clientes IAM, configuración, versiones operativas ni una lista detallada de controles pendientes.

## Accesibilidad

- diseño responsive;
- foco visible para teclado;
- compatibilidad con `prefers-reduced-motion`;
- contenido legible sin depender de animaciones;
- enlaces descriptivos y navegación directa.

## Arquitectura actual

```mermaid
flowchart TD
    U[Usuario] --> P[GitHub Pages]
    P --> R[Aplicación React]
    R --> B[Componente base]
    R --> M[Módulos por sección]
    M --> C[Contenido profesional]
    M --> I[Interacciones y accesibilidad]
    C --> V[Vista final]
    I --> V
```

## Deuda técnica declarada

- consolidar mejoras progresivas del DOM en componentes React declarativos;
- centralizar el contenido en una fuente de datos única;
- incorporar pruebas de componentes y E2E;
- automatizar accesibilidad y rendimiento;
- reducir módulos correctivos heredados;
- establecer releases y changelog estables.

El detalle se mantiene en [`docs/TECHNICAL_ROADMAP.md`](docs/TECHNICAL_ROADMAP.md).

## Alcance ético

Todas las actividades ofensivas mencionadas fueron realizadas en laboratorios propios o autorizados. No se realizaron pruebas sobre sistemas de terceros fuera del alcance académico.

## Autor

**Dante Gabriel Balbuena Atar**  
Técnico en formación avanzada en Ciberseguridad, con experiencia en soporte técnico, telecomunicaciones, gestión de incidentes y documentación operativa.
