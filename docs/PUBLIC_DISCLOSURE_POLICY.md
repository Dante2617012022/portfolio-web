# Política de divulgación pública del portfolio

## Objetivo

Mostrar competencias verificables de ciberseguridad sin convertir el portfolio en un inventario operativo de sistemas reales.

La regla principal es:

> Publicar capacidades, decisiones y evidencia sanitizada; mantener privados los detalles que permitan identificar, localizar o reconstruir una implementación productiva.

## Información apta para publicación

- objetivos profesionales y alcance real de la experiencia;
- tecnologías conocidas, presentadas como competencias generales;
- patrones de seguridad como IAM, MFA, RBAC, OIDC, PKCE, seguridad de APIs y defensa en profundidad;
- prácticas DevSecOps como pruebas, SAST, detección de secretos, escaneo de vulnerabilidades y SBOM;
- modelos de amenazas resumidos sin topología ni datos operativos;
- resultados de laboratorio y evidencia académica sanitizada;
- decisiones de diseño, metodología, riesgos tratados y aprendizajes;
- estados generales como laboratorio, piloto técnico o producción, sin exponer controles pendientes en detalle.

## Información que debe permanecer privada

- IP, dominios internos, subdominios no públicos y nombres de hosts;
- puertos, reglas de firewall, redes, segmentos y topología productiva;
- proveedor, región, tamaño o identificadores del hosting cuando no sean necesarios;
- rutas administrativas, endpoints internos y estructura completa de APIs;
- nombres de realms, clientes IAM, audiencias, cookies, roles internos o cuentas;
- versiones operativas exactas y combinaciones de componentes vinculadas al sistema real;
- archivos de configuración, variables de entorno, secretos, certificados y credenciales;
- pedidos, precios operativos, usuarios, correos, teléfonos, logs y datos de clientes;
- procedimientos de recuperación que revelen ubicaciones, accesos o secuencias sensibles;
- hallazgos abiertos, excepciones, controles ausentes o riesgos residuales detallados de un entorno real;
- capturas con URLs, tokens, cookies, identificadores, correos, rutas o datos operativos;
- documentación contractual, comercial o interna de Camdis.

## Presentación de tecnologías

Los nombres de herramientas pueden aparecer en la sección de competencias para demostrar experiencia. No deben asociarse públicamente con:

- una topología productiva exacta;
- un endpoint o dominio real;
- una versión operativa;
- una ruta administrativa;
- un control faltante explotable;
- una relación completa entre componentes.

Por ejemplo, es válido afirmar experiencia con PostgreSQL, Keycloak, Docker, Fastify, Caddy, CodeQL, Gitleaks y Trivy. No corresponde publicar cómo están conectados en producción, dónde se alojan, qué puertos utilizan o qué versiones están desplegadas.

## Casos de estudio

Todo caso público debe:

1. declarar su estado real y no presentarse como más maduro de lo que es;
2. usar arquitectura conceptual, no topología operativa;
3. demostrar el riesgo identificado, el control aplicado y la forma de validación;
4. omitir secretos, datos personales, rutas, identificadores y configuraciones;
5. agrupar limitaciones por categoría, evitando una lista accionable de defensas ausentes;
6. separar evidencia pública de documentación privada completa;
7. pasar una revisión de contenido, metadatos, enlaces e imágenes antes de publicarse.

## Revisión previa a publicación

Antes de fusionar cambios públicos, verificar:

- búsqueda de secretos y credenciales;
- ausencia de datos personales y comerciales;
- ausencia de inventario, topología, versiones y endpoints productivos;
- sanitización de imágenes, enlaces, documentos y metadatos;
- coherencia entre CV, LinkedIn, GitHub y portfolio;
- diferenciación entre experiencia profesional, proyecto aplicado y laboratorio académico;
- ausencia de afirmaciones absolutas como “100 % seguro” o “listo para producción” sin evidencia;
- vigencia del contenido y eliminación de detalles que hayan pasado a ser operativos.

## Excepciones

Una divulgación más detallada requiere autorización explícita del propietario del sistema, evaluación de riesgo y una justificación profesional concreta. La ausencia de secretos no convierte automáticamente una configuración o arquitectura en información apta para publicación.
