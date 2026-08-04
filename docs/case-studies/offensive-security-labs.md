# Caso de estudio - Laboratorios de seguridad ofensiva

## Resumen

Conjunto de prácticas académicas de pentesting web y sistemas Linux realizadas en CTF, máquinas deliberadamente vulnerables, contenedores y entornos autorizados.

Los informes originales documentan reconocimiento, explotación, post-explotación, impacto y remediación. Para el portfolio se publica una versión curada que evita credenciales, flags, datos de terceros y payloads reutilizables.

## Áreas trabajadas

- Reconocimiento pasivo y activo.
- Enumeración de puertos, servicios, rutas y tecnologías.
- Pentesting web alineado con OWASP Top 10.
- SQL Injection, XSS, CSRF, IDOR, LFI y command injection.
- Carga insegura de archivos y encadenamiento de vulnerabilidades.
- Análisis de WordPress y vulnerabilidades conocidas.
- Obtención y estabilización de shells en laboratorio.
- Enumeración local de Linux.
- Escalada mediante SUID, `sudo` y configuraciones inseguras.
- Movimiento lateral y pivoting en entornos multihost.
- Persistencia y limpieza controladas.
- Elaboración de reportes ejecutivos y técnicos.

## Casos principales

### Auditoría web autorizada

Cadena documentada desde una inyección SQL hasta acceso al panel, carga insegura, inclusión local y ejecución limitada. El trabajo incluye alcance, metodología, evidencias, clasificación y recomendaciones.

### WordPress y Linux

Análisis manual de una vulnerabilidad en un componente WordPress, acceso administrativo, ejecución controlada, enumeración local, movimiento a otro usuario y escalada por permisos inseguros.

### Pivoting multihost

Compromiso del primer entorno, descubrimiento de una red interna, evaluación de un segundo servicio y análisis de cómo la exposición de secretos y la segmentación insuficiente amplían el impacto.

## Herramientas

- Debian, Kali Linux, VirtualBox y Docker.
- Nmap, Gobuster, cURL, herramientas DNS y DevTools.
- Burp Suite.
- Netcat y utilidades de shell en laboratorio.
- WordPress, phpMyAdmin y aplicaciones vulnerables.
- Referencias CVE, GTFOBins y scripts de enumeración.

## Posicionamiento profesional

La evidencia permite afirmar:

> Práctica de pentesting web y Linux a nivel junior en laboratorios académicos autorizados, con documentación de hallazgos, impacto y remediación.

También demuestra fundamentos de técnicas relacionadas con red teaming, como post-explotación, movimiento lateral, persistencia y pivoting. No se presenta como experiencia profesional de Red Team porque no se ejecutó una campaña completa contra una organización productiva.

## Diferenciadores

- Los informes registran intentos exitosos y fallidos.
- Se analiza el funcionamiento de exploits antes de utilizarlos.
- Las cadenas de ataque se acompañan con controles que habrían interrumpido el compromiso.
- Se distingue evidencia técnica, inferencia y riesgo residual.
- Se incluye una mirada defensiva y de remediación.

## Ética

Todas las pruebas se realizaron en entornos propios o autorizados. No se autoriza el uso de este contenido contra infraestructura de terceros.

## Evidencia pública

Los casos sanitizados se encuentran en:

- [Repositorio académico UGR - Hacking Ético](https://github.com/Dante2617012022/Actividades-UGR-Ciberseguridad/tree/main/hacking-etico)
- [Tratamiento de Vulnerabilidades](https://github.com/Dante2617012022/Actividades-UGR-Ciberseguridad/tree/main/tratamiento%20de%20vulnerabilidades)
