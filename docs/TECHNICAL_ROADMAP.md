# Roadmap técnico del portfolio

Este documento registra mejoras técnicas priorizadas para mantener el portfolio estable, verificable y fácil de evolucionar.

## Criterios de prioridad

- **P0 — Corrección:** información profesional exacta y funcionamiento sin regresiones.
- **P1 — Mantenibilidad:** reducir duplicación, acoplamiento y manipulación imperativa del DOM.
- **P2 — Seguridad y cadena de suministro:** controlar dependencias, secretos y publicación.
- **P3 — Calidad:** pruebas automatizadas, accesibilidad y rendimiento.

## P0 — Integridad de contenido

- [x] Unificar la antigüedad profesional verificable.
- [x] Diferenciar experiencia profesional de formación académica.
- [x] Eliminar herramientas no respaldadas del contenido visible.
- [x] Mantener CV, LinkedIn y portfolio con fechas y cargos consistentes.
- [ ] Consolidar todos los textos en un único archivo de datos validable.

## P1 — Refactor de arquitectura

La aplicación actual combina React con módulos que mejoran el DOM después del renderizado. Esta estrategia permitió estabilizar el sitio de forma incremental, pero aumenta el acoplamiento con selectores y orden de montaje.

### Objetivo

Convertir cada sección en un componente React declarativo y retirar progresivamente observadores y capas correctivas.

### Orden propuesto

1. Contacto.
2. Certificaciones.
3. Proyectos.
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

## P2 — Seguridad y dependencias

- [ ] Migrar Tailwind desde CDN a una dependencia administrada por npm.
- [ ] Habilitar actualización automática de dependencias.
- [ ] Agregar análisis de dependencias vulnerables en CI.
- [ ] Incorporar análisis estático de código.
- [ ] Revisar política de seguridad de contenido para el sitio estático.
- [ ] Documentar revisión periódica de enlaces externos.
- [ ] Confirmar que ninguna credencial, token o dato personal sensible esté versionado.

## P3 — Pruebas y calidad

### Pruebas unitarias y de componentes

- [ ] Agregar Vitest y React Testing Library.
- [ ] Probar renderizado de secciones críticas.
- [ ] Probar enlaces de contacto y navegación.
- [ ] Probar modo de movimiento reducido.

### Pruebas de interfaz

- [ ] Agregar recorridos Playwright para escritorio y móvil.
- [ ] Verificar navegación por teclado.
- [ ] Verificar ausencia de desbordamiento horizontal.
- [ ] Validar enlaces externos y anclas internas.

### Calidad automática

- [ ] Ejecutar Lighthouse en CI.
- [ ] Ejecutar auditoría de accesibilidad.
- [ ] Definir presupuestos de rendimiento.
- [ ] Verificar compilación con versiones LTS de Node.js.

## P4 — Presentación profesional

- [x] Reemplazar README predeterminado por documentación del proyecto.
- [x] Documentar arquitectura y limitaciones actuales.
- [ ] Agregar una captura principal optimizada.
- [ ] Publicar una versión etiquetada estable.
- [ ] Añadir badges de CI y despliegue una vez estabilizados los nombres de workflows.

## Definición de terminado

El refactor se considerará completo cuando:

- Todo el contenido se renderice directamente desde React.
- No existan módulos correctivos que compitan por el mismo elemento.
- Lint, build, pruebas, accesibilidad y recorridos críticos se ejecuten automáticamente.
- El sitio mantenga coherencia con CV y LinkedIn.
- Las dependencias externas estén administradas, auditadas y actualizadas.
