# Checklist de aceptación del portfolio

## Objetivo

Validar que el reposicionamiento profesional y los nuevos casos de estudio se presenten correctamente antes de fusionar el PR.

## Preparación local

```bash
git fetch origin --prune
git switch portfolio/security-positioning-20260804
npm ci
npm run lint
npm run build
npm run dev -- --host 127.0.0.1
```

Abrir la URL local indicada por Vite.

## 1. Jerarquía de proyectos

La sección Proyectos debe mostrar, en este orden:

1. **Camdis Commerce Platform** como proyecto principal.
2. **Chatbot de pedidos con IA y controles de seguridad**.
3. **Hacking Ético y Tratamiento de Vulnerabilidades**.

Comprobar:

- [ ] Camdis conserva la tarjeta destacada.
- [ ] La arquitectura resumida menciona Caddy, Fastify, Keycloak, PostgreSQL y CI.
- [ ] El chatbot aparece como repositorio público.
- [ ] Los laboratorios se presentan como académicos y autorizados.
- [ ] No se afirma experiencia profesional como Red Team Operator.

## 2. Enlaces

Abrir y comprobar:

- [ ] caso sanitizado de Camdis;
- [ ] índice de evidencias;
- [ ] repositorio del chatbot;
- [ ] casos de Hacking Ético;
- [ ] portfolio, GitHub y LinkedIn desde README cuando corresponda.

Los enlaces externos deben abrir una pestaña nueva sin conservar acceso al contexto de la página original.

## 3. Escritorio

Probar al menos en 1440 × 900 y 1366 × 768:

- [ ] títulos completos y legibles;
- [ ] chips sin superposiciones;
- [ ] arquitectura sin cortes;
- [ ] botones dentro de las tarjetas;
- [ ] tarjetas alineadas;
- [ ] sin desplazamiento horizontal;
- [ ] animaciones suaves.

## 4. Móvil

Probar al menos en 390 × 844 y 360 × 800:

- [ ] menú y botones accesibles;
- [ ] Camdis permanece como primer proyecto;
- [ ] textos no desbordan las tarjetas;
- [ ] chips se adaptan a varias líneas;
- [ ] enlaces pueden pulsarse sin solapamiento;
- [ ] no existe scroll horizontal;
- [ ] hero y perfil mantienen contraste.

## 5. Teclado y accesibilidad

Sin utilizar mouse:

- [ ] recorrer la navegación con `Tab`;
- [ ] observar foco visible;
- [ ] activar enlaces con `Enter`;
- [ ] comprobar orden lógico de foco;
- [ ] verificar que los enlaces tengan nombres comprensibles;
- [ ] confirmar que la arquitectura de Camdis tenga etiqueta accesible.

Activar reducción de movimiento en el sistema o DevTools:

- [ ] el contenido continúa visible;
- [ ] las animaciones no son necesarias para comprender la página;
- [ ] no se producen movimientos intensos o inesperados.

## 6. Consola y red

En DevTools:

- [ ] Console sin errores de JavaScript;
- [ ] Network sin recursos 404;
- [ ] ninguna solicitud a un dominio inesperado;
- [ ] no se exponen tokens, cookies o datos sensibles;
- [ ] los documentos públicos abren correctamente;
- [ ] no aparecen errores de contenido mixto.

## 7. Contenido profesional

- [ ] nombre y experiencia coinciden con CV y LinkedIn;
- [ ] Camdis se describe como piloto técnico, no como producto definitivo;
- [ ] pentesting se limita a laboratorios autorizados;
- [ ] experiencia SOC se presenta como objetivo y capacidad transferible;
- [ ] limitaciones y deuda técnica permanecen visibles;
- [ ] no existen afirmaciones como “100 % seguro”.

## Criterio de cierre

El PR puede fusionarse cuando:

- CI, CodeQL, lint, build y auditoría están en verde;
- el artefacto compilado coincide con la revisión local;
- no existen errores visuales o de consola;
- los cuatro enlaces principales funcionan;
- no se expone información sensible;
- la narrativa profesional es verificable y coherente.
