const PROJECTS_MARKER = "data-projects-overhaul";

const icon = (path, className = "") => `
  <svg viewBox="0 0 24 24" aria-hidden="true" class="${className}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    ${path}
  </svg>
`;

const ICONS = {
  code: icon('<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/>', 'h-6 w-6'),
  shield: icon('<path d="M12 3 20 6v6c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6z"/><path d="m9 12 2 2 4-5"/>', 'h-6 w-6'),
  book: icon('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21.5z"/>', 'h-6 w-6'),
  github: icon('<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 2a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4"/><path d="M8 19c-3 .9-3-1.5-4-2"/>', 'h-5 w-5'),
  external: icon('<path d="M15 3h6v6"/><path d="m10 14 11-11"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>', 'h-4 w-4'),
  lock: icon('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>', 'h-4 w-4'),
  check: icon('<path d="m5 12 4 4L19 6"/>', 'h-4 w-4'),
};

const styles = `
  #projects.projects-overhaul {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(circle at 12% 12%, rgba(37,99,235,.12), transparent 32%),
      radial-gradient(circle at 88% 78%, rgba(8,145,178,.11), transparent 30%),
      linear-gradient(180deg, #f8fbff 0%, #ffffff 48%, #f4f8ff 100%);
    color: #0f172a;
  }
  #projects.projects-overhaul::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: .35;
    background-image:
      linear-gradient(rgba(15,23,42,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(15,23,42,.045) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
  }
  #projects [data-projects-shell] { position: relative; z-index: 1; }
  #projects .projects-kicker {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    border: 1px solid rgba(37,99,235,.2);
    border-radius: 999px;
    padding: .45rem .8rem;
    background: rgba(255,255,255,.85);
    color: #1d4ed8;
    box-shadow: 0 8px 24px rgba(37,99,235,.08);
    font-size: .75rem;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  #projects .projects-title {
    margin-top: 1rem;
    color: #0f172a;
    font-size: clamp(2rem, 5vw, 3.3rem);
    font-weight: 900;
    letter-spacing: -.04em;
    line-height: 1.05;
  }
  #projects .projects-intro {
    margin: 1rem auto 0;
    max-width: 760px;
    color: #475569;
    font-size: 1rem;
    line-height: 1.75;
  }
  #projects .project-overhaul-card {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(148,163,184,.34);
    border-radius: 1.75rem;
    background: rgba(255,255,255,.94);
    box-shadow: 0 24px 60px rgba(15,23,42,.11);
    transition: border-color .25s ease, box-shadow .25s ease;
    transform-style: preserve-3d;
    will-change: transform;
  }
  #projects .project-overhaul-card:hover {
    border-color: rgba(37,99,235,.38);
    box-shadow: 0 30px 75px rgba(30,64,175,.17);
  }
  #projects .project-overhaul-card::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    background: radial-gradient(480px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,.48), transparent 55%);
    opacity: 0;
    transition: opacity .25s ease;
  }
  #projects .project-overhaul-card:hover::after { opacity: 1; }
  #projects .project-featured {
    padding: clamp(1.35rem, 3vw, 2.5rem);
    background:
      linear-gradient(135deg, rgba(15,23,42,.99), rgba(30,64,175,.96) 58%, rgba(8,145,178,.93));
    color: white;
    border-color: rgba(125,211,252,.32);
    box-shadow: 0 30px 80px rgba(15,23,42,.28);
  }
  #projects .project-featured::before {
    content: "";
    position: absolute;
    width: 420px;
    height: 420px;
    right: -180px;
    top: -220px;
    border-radius: 999px;
    background: rgba(125,211,252,.13);
    filter: blur(2px);
  }
  #projects .project-status {
    display: inline-flex;
    align-items: center;
    gap: .45rem;
    border-radius: 999px;
    padding: .42rem .72rem;
    font-size: .72rem;
    font-weight: 800;
    letter-spacing: .04em;
  }
  #projects .project-status--featured {
    border: 1px solid rgba(165,243,252,.35);
    background: rgba(8,145,178,.22);
    color: #cffafe;
  }
  #projects .project-status--development {
    border: 1px solid rgba(250,204,21,.3);
    background: rgba(250,204,21,.12);
    color: #854d0e;
  }
  #projects .project-status--lab {
    border: 1px solid rgba(37,99,235,.2);
    background: rgba(37,99,235,.08);
    color: #1d4ed8;
  }
  #projects .project-icon {
    display: grid;
    width: 3rem;
    height: 3rem;
    place-items: center;
    border-radius: 1rem;
  }
  #projects .project-featured .project-icon {
    border: 1px solid rgba(255,255,255,.2);
    background: rgba(255,255,255,.11);
    color: #cffafe;
  }
  #projects .project-secondary .project-icon {
    background: linear-gradient(145deg, #dbeafe, #ecfeff);
    color: #1d4ed8;
  }
  #projects .project-heading {
    margin-top: 1rem;
    font-size: clamp(1.45rem, 3vw, 2.25rem);
    font-weight: 900;
    letter-spacing: -.025em;
    line-height: 1.13;
  }
  #projects .project-featured .project-heading { color: #fff; }
  #projects .project-secondary .project-heading { color: #0f172a; font-size: 1.45rem; }
  #projects .project-description {
    margin-top: .9rem;
    line-height: 1.75;
  }
  #projects .project-featured .project-description { color: rgba(241,245,249,.88); }
  #projects .project-secondary .project-description { color: #475569; }
  #projects .project-chip-list {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    margin-top: 1.1rem;
  }
  #projects .project-chip {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: .38rem .65rem;
    font-size: .72rem;
    font-weight: 750;
  }
  #projects .project-featured .project-chip {
    border: 1px solid rgba(255,255,255,.16);
    background: rgba(255,255,255,.09);
    color: #e0f2fe;
  }
  #projects .project-secondary .project-chip {
    border: 1px solid rgba(148,163,184,.25);
    background: #f8fafc;
    color: #334155;
  }
  #projects .project-control-grid {
    display: grid;
    gap: .65rem;
    margin-top: 1.25rem;
  }
  #projects .project-control {
    display: flex;
    align-items: flex-start;
    gap: .7rem;
    color: rgba(241,245,249,.9);
    font-size: .9rem;
    line-height: 1.5;
  }
  #projects .project-control svg { flex: 0 0 auto; margin-top: .12rem; color: #67e8f9; }
  #projects .project-actions {
    display: flex;
    flex-wrap: wrap;
    gap: .7rem;
    margin-top: 1.35rem;
  }
  #projects .project-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .55rem;
    min-height: 2.8rem;
    border-radius: .9rem;
    padding: .7rem 1rem;
    font-size: .86rem;
    font-weight: 800;
    text-decoration: none;
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  }
  #projects .project-link:hover { transform: translateY(-2px); }
  #projects .project-link--primary {
    background: white;
    color: #1e3a8a;
    box-shadow: 0 12px 28px rgba(2,6,23,.24);
  }
  #projects .project-link--secondary {
    border: 1px solid rgba(165,243,252,.38);
    background: rgba(255,255,255,.09);
    color: white;
  }
  #projects .project-secondary .project-link {
    background: linear-gradient(90deg, #2563eb, #0891b2);
    color: white;
    box-shadow: 0 10px 24px rgba(37,99,235,.18);
  }
  #projects .project-private-note {
    display: inline-flex;
    align-items: center;
    gap: .45rem;
    margin-top: 1.2rem;
    border-radius: .85rem;
    padding: .7rem .85rem;
    background: #f1f5f9;
    color: #475569;
    font-size: .78rem;
    font-weight: 700;
  }
  #projects .project-architecture {
    position: relative;
    min-height: 100%;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 1.4rem;
    padding: 1.15rem;
    background: rgba(2,6,23,.28);
    backdrop-filter: blur(8px);
  }
  #projects .architecture-label {
    color: #bae6fd;
    font-size: .72rem;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  #projects .architecture-flow {
    display: grid;
    gap: .55rem;
    margin-top: .9rem;
  }
  #projects .architecture-step {
    display: flex;
    align-items: center;
    gap: .65rem;
    border: 1px solid rgba(255,255,255,.11);
    border-radius: .85rem;
    padding: .7rem .78rem;
    background: rgba(255,255,255,.07);
    color: #e2e8f0;
    font-size: .78rem;
    font-weight: 700;
  }
  #projects .architecture-step span:first-child {
    display: grid;
    width: 1.7rem;
    height: 1.7rem;
    place-items: center;
    border-radius: .55rem;
    background: rgba(34,211,238,.16);
    color: #67e8f9;
    font-size: .7rem;
    font-weight: 900;
  }
  #projects .projects-reveal {
    opacity: 0;
    transform: translateY(26px);
  }
  #projects .projects-reveal.is-visible {
    opacity: 1;
    transform: none;
    transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
  }
  #projects .projects-footer-link {
    display: inline-flex;
    align-items: center;
    gap: .55rem;
    margin-top: 1.5rem;
    color: #1d4ed8;
    font-weight: 800;
    text-decoration: none;
  }
  #projects .projects-footer-link:hover { text-decoration: underline; }
  @media (min-width: 900px) {
    #projects .project-featured-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(290px, .75fr); gap: 1.5rem; align-items: stretch; }
    #projects .project-control-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    #projects .projects-secondary-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    #projects .projects-reveal { opacity: 1; transform: none; }
    #projects .project-overhaul-card, #projects .project-link { transition: none; }
  }
`;

const markup = `
  <div data-projects-shell class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
    <div class="projects-reveal text-center">
      <span class="projects-kicker">${ICONS.shield} Evidencia técnica</span>
      <h2 class="projects-title">Proyectos</h2>
      <p class="projects-intro">Proyectos que conectan automatización, desarrollo seguro, gestión de riesgos y prácticas académicas autorizadas.</p>
      <div class="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
        <span class="h-1 w-16 rounded-full bg-blue-600"></span>
        <span class="h-1 w-5 rounded-full bg-cyan-500"></span>
      </div>
    </div>

    <article data-project-card class="project-overhaul-card project-featured projects-reveal mt-12" style="transition-delay:80ms">
      <div class="project-featured-grid">
        <div class="relative z-10">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="project-status project-status--featured">${ICONS.shield} Proyecto principal</span>
            <span class="text-xs font-bold text-cyan-100">En evolución · Preproducción</span>
          </div>
          <div class="project-icon mt-5">${ICONS.code}</div>
          <h3 class="project-heading">Chatbot de pedidos con IA y controles de seguridad</h3>
          <p class="project-description">Sistema modular para automatizar pedidos por WhatsApp sin delegar decisiones sensibles directamente a la IA. Integra persistencia, pagos, validaciones y controles de abuso.</p>
          <div class="project-chip-list" aria-label="Tecnologías del proyecto">
            <span class="project-chip">Node.js</span><span class="project-chip">Baileys</span><span class="project-chip">SQLite</span><span class="project-chip">Mercado Pago</span><span class="project-chip">HMAC SHA-256</span><span class="project-chip">Pruebas automatizadas</span>
          </div>
          <div class="project-control-grid" aria-label="Controles implementados">
            <div class="project-control">${ICONS.check}<span>Validación de entorno y gestión de secretos con variables protegidas.</span></div>
            <div class="project-control">${ICONS.check}<span>Webhooks firmados con HMAC y comparación segura de firmas.</span></div>
            <div class="project-control">${ICONS.check}<span>Sanitización, límite de longitud y rate limiting persistente.</span></div>
            <div class="project-control">${ICONS.check}<span>IA con esquema estricto, umbral de confianza y acciones sensibles bloqueadas.</span></div>
          </div>
          <div class="project-actions">
            <a class="project-link project-link--primary" href="https://github.com/Dante2617012022/chatbot-hamburgueseria-v3" target="_blank" rel="noreferrer noopener">${ICONS.github}<span>Ver código y documentación</span>${ICONS.external}</a>
            <a class="project-link project-link--secondary" href="https://github.com/Dante2617012022/chatbot-hamburgueseria-v3#modelo-de-amenazas-resumido" target="_blank" rel="noreferrer noopener">${ICONS.shield}<span>Ver modelo de amenazas</span></a>
          </div>
        </div>

        <div class="project-architecture relative z-10 mt-6 lg:mt-0" aria-label="Arquitectura resumida del chatbot">
          <p class="architecture-label">Flujo seguro resumido</p>
          <div class="architecture-flow">
            <div class="architecture-step"><span>01</span><span>Mensaje del cliente por WhatsApp</span></div>
            <div class="architecture-step"><span>02</span><span>Sanitización y control de frecuencia</span></div>
            <div class="architecture-step"><span>03</span><span>Parser determinístico</span></div>
            <div class="architecture-step"><span>04</span><span>Fallback de IA controlado</span></div>
            <div class="architecture-step"><span>05</span><span>Validación contra catálogo y reglas</span></div>
            <div class="architecture-step"><span>06</span><span>Persistencia, pagos y trazabilidad</span></div>
          </div>
        </div>
      </div>
    </article>

    <div class="projects-secondary-grid mt-6">
      <article data-project-card class="project-overhaul-card project-secondary projects-reveal p-6 md:p-8" style="transition-delay:150ms">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <span class="project-status project-status--development">Proyecto aplicado en desarrollo</span>
          <div class="project-icon">${ICONS.shield}</div>
        </div>
        <h3 class="project-heading">Camdis Digital Security Program</h3>
        <p class="project-description">Plan director de tecnología, infraestructura y ciberseguridad para una PyME gastronómica, construido con foco en gobierno, continuidad y reducción progresiva del riesgo.</p>
        <div class="project-chip-list">
          <span class="project-chip">Activos</span><span class="project-chip">IAM</span><span class="project-chip">Riesgos</span><span class="project-chip">Backups</span><span class="project-chip">BCP</span><span class="project-chip">Incidentes</span>
        </div>
        <div class="project-private-note">${ICONS.lock}<span>La documentación completa es interna y no se publica por confidencialidad.</span></div>
      </article>

      <article data-project-card class="project-overhaul-card project-secondary projects-reveal p-6 md:p-8" style="transition-delay:220ms">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <span class="project-status project-status--lab">Laboratorios autorizados</span>
          <div class="project-icon">${ICONS.book}</div>
        </div>
        <h3 class="project-heading">Actividades UGR — Ciberseguridad</h3>
        <p class="project-description">Repositorio académico con documentación y prácticas autorizadas de seguridad, análisis técnico y gestión, presentadas como formación y no como experiencia profesional.</p>
        <div class="project-chip-list">
          <span class="project-chip">Nmap</span><span class="project-chip">Burp Suite</span><span class="project-chip">YARA</span><span class="project-chip">VirusTotal</span><span class="project-chip">Metasploit inicial</span><span class="project-chip">Riesgos</span>
        </div>
        <div class="project-actions">
          <a class="project-link" href="https://github.com/Dante2617012022/Actividades-UGR-Ciberseguridad" target="_blank" rel="noreferrer noopener">${ICONS.github}<span>Ver actividades académicas</span>${ICONS.external}</a>
        </div>
      </article>
    </div>

    <div class="projects-reveal text-center" style="transition-delay:260ms">
      <a class="projects-footer-link" href="https://github.com/Dante2617012022" target="_blank" rel="noreferrer noopener">${ICONS.github}<span>Ver perfil completo en GitHub</span>${ICONS.external}</a>
    </div>
  </div>
`;

const ensureStyles = () => {
  if (document.querySelector('style[data-projects-overhaul-styles]')) return;
  const style = document.createElement('style');
  style.dataset.projectsOverhaulStyles = 'true';
  style.textContent = styles;
  document.head.append(style);
};

const enableReveal = (section) => {
  const nodes = [...section.querySelectorAll('.projects-reveal')];
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  nodes.forEach((node) => observer.observe(node));
};

const enableTilt = (section) => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const finePointer = window.matchMedia?.('(pointer: fine)')?.matches;
  if (reduce || !finePointer) return;

  section.querySelectorAll('[data-project-card]').forEach((card) => {
    if (card.dataset.tiltReady === 'true') return;
    card.dataset.tiltReady = 'true';

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 6;
      const rotateY = (x - 0.5) * 8;
      card.style.setProperty('--glare-x', `${x * 100}%`);
      card.style.setProperty('--glare-y', `${y * 100}%`);
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    };

    const reset = () => {
      card.style.transform = '';
      card.style.setProperty('--glare-x', '50%');
      card.style.setProperty('--glare-y', '50%');
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
  });
};

const applyProjectsOverhaul = () => {
  const section = document.querySelector('#projects');
  if (!section || section.getAttribute(PROJECTS_MARKER) === 'true') return;

  ensureStyles();
  section.className = 'projects-overhaul';
  section.innerHTML = markup;
  section.setAttribute(PROJECTS_MARKER, 'true');
  enableReveal(section);
  enableTilt(section);
};

export const startProjectsOverhaul = () => {
  if (window.__portfolioProjectsOverhaulStarted) return;
  window.__portfolioProjectsOverhaulStarted = true;

  const root = document.getElementById('root');
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      applyProjectsOverhaul();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
