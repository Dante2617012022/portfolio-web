# Roadmap técnico del portfolio

Este documento registra mejoras técnicas priorizadas para mantener el portfolio estable, verificable, seguro y fácil de evolucionar.

## Criterios de prioridad

- **P0 - Integridad:** información profesional exacta, ética y verificable.
- **P1 - Mantenibilidad:** reducir duplicación, acoplamiento y manipulación imperativa del DOM.
- **P2 - Seguridad y cadena de suministro:** controlar dependencias, publicación y evidencia.
- **P3 - Calidad:** pruebas automatizadas, accesibilidad y rendimiento.
- **P4 - Presentación:** facilitar la revisión por reclutadores y evaluadores técnicos.

## P0 - Integridad de contenido

- [x] Unificar la antigüedad profesional verificable.
- [x] Diferenciar experiencia profesional de formación académica.
- [x] Eliminar herramientas no respaldadas del contenido visible.
- [x] Mantener CV, LinkedIn y portfolio con fechas y cargos consistentes.
- [x] Diferenciar pentesting académico de experiencia profesional de Red Team.
- [x] Publicar casos sanitizados de Camdis y laboratorios ofensivos.
- [x] Crear un índice de evidencias técnicas.
- [ ] Consolidar todos los textos en un único archivo de datos validable.
- [ ] Revisar trimestralmente consistencia entre CV, LinkedIn, GitHub y sitio.

## P1 - Refactor de arquitectura

La aplicación combina React con módulos que mejoran el DOM después del renderizado. Esta estrategia permitió estabilizar el sitio de forma incremental, pero aumenta el acoplamiento con selectores, observadores y orden de montaje.

### Objetivo

Convertir cada sección en componentes React declarativos y retirar progresivamente observadores y capas correctivas.

### Orden propuesto

1. Proyectos y fuente única de evidencias.
2. Contacto.
3. Certificaciones.
4. Educación.
5. Experiencia.
6. Habilidades.
7. Perfil e inicio.

### Criterios de aceptación

- Sin `MutationObserver` para contenido estático.
- Sin sobrescrituras de texto posteriores al renderizado.
- Datos profesionales importados desde una fuente única.
- Efectos visuales encapsulados en hooks o componentes.
- Misma experiencia visual en escritorio y móvil.
- Pruebas de regresión para contenido y enlaces.

## P2 - Seguridad y dependencias

- [ ] Migrar Tailwind desde CDN a una dependencia administrada por npm.
- [x] Habilitar actualización automática de dependencias con Dependabot.
- [x] Agregar auditoría de dependencias en CI.
- [ ] Incorporar análisis estático de código.
- [ ] Revisar política de seguridad de contenido para el sitio estático.
- [ ] Documentar revisión periódica de enlaces externos.
- [ ] Confirmar mediante secret scanning que no existan credenciales o tokens versionados.
- [x] Agregar `SECURITY.md`.
- [x] Fijar acciones nuevas por commit en el workflow de seguridad.

## P3 - Pruebas y calidad

### Pruebas unitarias y de componentes

- [ ] Agregar Vitest y React Testing Library.
- [ ] Probar renderizado de secciones críticas.
- [ ] Probar enlaces de contacto y navegación.
- [ ] Probar modo de movimiento reducido.
- [ ] Probar que Camdis, chatbot y laboratorios ofensivos mantengan su jerarquía y enlaces.

### Pruebas de interfaz

- [ ] Agregar recorridos Playwright para escritorio y móvil.
- [ ] Verificar navegación por teclado.
- [ ] Verificar ausencia de desbordamiento horizontal.
- [ ] Validar enlaces externos y anclas internas.
- [ ] Capturar regresiones visuales de Inicio, Perfil y Proyectos.

### Calidad automática

- [ ] Ejecutar Lighthouse en CI.
- [ ] Ejecutar auditoría de accesibilidad.
- [ ] Definir presupuestos de rendimiento.
- [x] Verificar lint y compilación con Node.js 22 en CI.
- [ ] Añadir secret scanning y análisis de enlaces rotos.

## P4 - Presentación profesional

- [x] Reemplazar README predeterminado por documentación del proyecto.
- [x] Documentar arquitectura y limitaciones actuales.
- [x] Presentar Camdis como proyecto principal mediante un caso sanitizado.
- [x] Incorporar pentesting académico y fundamentos de red teaming con alcance explícito.
- [x] Publicar índice de evidencias.
- [ ] Agregar una captura principal optimizada.
- [ ] Incorporar capturas sanitizadas de IAM, pruebas y CI.
- [ ] Publicar una versión etiquetada estable.
- [ ] Añadir badges de CI y despliegue cuando los workflows estén validados.
- [ ] Crear README de perfil en `Dante2617012022/Dante2617012022`.

## P5 - Gobierno del portfolio

- [ ] Definir revisión mensual de dependencias y enlaces.
- [ ] Definir revisión trimestral de afirmaciones profesionales.
- [ ] Mantener un changelog de cambios relevantes.
- [ ] Cerrar PR y ramas reemplazadas.
- [ ] Conservar evidencia completa en privado y publicar únicamente versiones sanitizadas.
- [ ] Verificar metadatos de PDF antes de publicar documentación académica.

## Definición de terminado

El portfolio se considerará estabilizado cuando:

- el contenido se renderice directamente desde React;
- no existan módulos correctivos que compitan por el mismo elemento;
- lint, build, pruebas, accesibilidad y recorridos críticos se ejecuten automáticamente;
- el sitio mantenga coherencia con CV y LinkedIn;
- las dependencias estén administradas, auditadas y actualizadas;
- los casos de estudio puedan verificarse sin exponer información sensible;
- un reclutador pueda comprender el perfil y encontrar evidencia relevante en menos de cinco minutos.
