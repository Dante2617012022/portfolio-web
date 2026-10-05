# Mini-SOC Lab — detección, triage y respuesta

## Resumen

Laboratorio defensivo propio y controlado para demostrar fundamentos de Security Operations sin presentarlos como experiencia operando un SOC productivo.

La v1 implementa un recorrido reproducible desde telemetría y detección hasta triage, respuesta temporal y rollback. El laboratorio se gobierna con cambios pequeños, pull requests, CI, UAT y evidencia versionada.

[Ver repositorio público del Mini-SOC](https://github.com/Dante2617012022/mini-soc-lab)

## Problema y objetivo

El objetivo no era acumular herramientas, sino construir evidencia defendible de cómo se diseña y valida un flujo Blue Team: separar trust boundaries, reducir superficie de ataque, distinguir una detección de un incidente y automatizar únicamente una respuesta acotada y reversible.

## Arquitectura y controles

El entorno distribuye endpoint, gateway, workload de prueba y plataforma de gestión en máquinas virtuales. Un segmento de prueba aislado atraviesa un gateway con política de forwarding default-deny. Wazuh centraliza telemetría y correlación; Suricata aporta detección de red; YARA cubre detección local de archivos.

VirusTotal se utiliza únicamente para enriquecimiento por SHA-256: no se suben artefactos y la indisponibilidad o ausencia de un hash no se interpreta como evidencia de archivo limpio.

La [arquitectura implementada y sus trust boundaries](https://github.com/Dante2617012022/mini-soc-lab/blob/main/docs/ARCHITECTURE.md) están documentadas en el repositorio del laboratorio.

## Evidencia detection-to-response

La evidencia pública incluye:

- detección y triage de fallos de autenticación SSH;
- File Integrity Monitoring sobre un archivo de prueba controlado;
- observación y contextualización de actividad privilegiada autorizada;
- Suricata → EVE JSON → Wazuh para una detección de red determinística;
- YARA sobre un artefacto benigno reproducible;
- enriquecimiento externo hash-only con degradación segura;
- Active Response específico y temporal sobre el workload autorizado, seguido de rollback automático.

El criterio analítico es explícito: un match técnico no equivale automáticamente a un incidente. La evidencia separa detección, contexto, disposición y respuesta.

## Decisiones de seguridad

**Una sola fuente de verdad para firewall.** Se mantuvo nftables en el gateway y se descartó introducir iptables únicamente para reutilizar una respuesta preexistente.

**Automatización proporcional al riesgo.** La respuesta automática se habilitó después de validar la detección y quedó limitada a una regla específica, un workload autorizado y un timeout con recuperación.

**Privacidad en enriquecimiento.** VirusTotal recibe únicamente hashes SHA-256; los archivos no se cargan al tercero.

**Gobierno del cambio.** Los incrementos se documentan y validan mediante ramas, PR, CI, UAT y rollback, evitando cambios oportunistas fuera de alcance.

## Riesgos residuales y límites

La v1 no representa un SOC productivo ni experiencia profesional de operación SOC. Alta disponibilidad, retención dimensionada, operación 24×7, multi-tenancy, SLA y controles empresariales adicionales están fuera de alcance.

El Active Response es deliberadamente temporal y runtime-only; un reload del ruleset persistente elimina ese estado. Esa propiedad es aceptada para el laboratorio y requeriría otro diseño antes de un uso productivo.

## Qué demuestra

El caso aporta evidencia práctica para posiciones SOC L1, Junior Blue Team, Cybersecurity Analyst y Security Engineering junior: telemetría, análisis de alertas, defensa en profundidad, segmentación, detección, triage, respuesta acotada, rollback, privacidad y gestión de cambios.

La fortaleza del proyecto está en poder explicar por qué se aplicó cada control, cómo se validó, qué alternativa se descartó y qué riesgo residual permanece, no en afirmar experiencia que el laboratorio no representa.
