const EXPERIENCE_MARKER = "data-experience-overhaul-ready";

const EXPERIENCES = [
  {
    order: "01",
    eyebrow: "Experiencia operativa",
    period: "2019 – 2025",
    title: "Soporte técnico y gestión de incidentes",
    company: "CityTech S.A. / Teleperformance",
    summary:
      "Casi siete años de experiencia atendiendo, diagnosticando y gestionando incidentes técnicos para servicios de telecomunicaciones y energía, con foco en SLA, documentación, criticidad y escalamiento.",
    highlights: [
      "Diagnóstico remoto de incidentes en ADSL/VDSL, HFC, FTTH, CATV, telefonía móvil y servicios digitales.",
      "Registro, clasificación, seguimiento y documentación de casos en entornos de alta demanda.",
      "Priorización por impacto y criticidad, con escalamiento a niveles técnicos especializados.",
      "Atención de usuarios, cumplimiento de métricas operativas y comunicación clara durante la resolución.",
    ],
    tags: [
      "Gestión de incidentes",
      "Telecomunicaciones",
      "SLA",
      "Documentación",
      "Escalamiento",
    ],
    tools: "Citrix · Salesforce · Oracle Siebel · Watchdog · CC&B · Avaya",
    flow: ["Detectar", "Registrar", "Clasificar", "Diagnosticar", "Escalar", "Cerrar"],
    featured: true,
  },
  {
    order: "02",
    eyebrow: "Proyecto aplicado en desarrollo",
    period: "2025 – Actualidad",
    title: "Tecnología, automatización y seguridad aplicada",
    company: "Camdis Hamburguesas",
    summary:
      "Diseño y desarrollo de soluciones para digitalizar operaciones, automatizar la atención y mejorar progresivamente la seguridad tecnológica de una PyME gastronómica.",
    highlights: [
      "Desarrollo de un chatbot modular para WhatsApp con Node.js, SQLite e integración con Mercado Pago.",
      "Aplicación de validación de entorno, protección HMAC de webhooks, sanitización y límites de solicitudes.",
      "Restricción de acciones sensibles y validación de respuestas generadas mediante inteligencia artificial.",
      "Diseño y documentación del Camdis Digital Security Program, actualmente en desarrollo.",
    ],
    tags: [
      "Node.js",
      "Automatización",
      "Security by Design",
      "SQLite",
      "Proyecto en desarrollo",
    ],
    tools: "JavaScript · Node.js · SQLite · APIs · GitHub",
    featured: false,
  },
];

const addStyles = () => {
  if (document.querySelector("style[data-experience-overhaul-styles]")) return;

  const style = document.createElement("style");
  style.dataset.experienceOverhaulStyles = "true";
  style.textContent = `
    #experience.experience-overhaul-section {
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(circle at 12% 15%, rgba(37, 99, 235, .13), transparent 32%),
        radial-gradient(circle at 88% 78%, rgba(8, 145, 178, .12), transparent 30%),
        linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
    }

    #experience.experience-overhaul-section::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(37, 99, 235, .045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(37, 99, 235, .045) 1px, transparent 1px);
      background-size: 36px 36px;
      mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
    }

    [data-experience-overhaul] {
      position: relative;
      z-index: 1;
      width: min(1152px, calc(100% - 2rem));
      margin: 0 auto;
      padding: 6rem 0;
      color: #0f172a;
    }

    .experience-overhaul__heading {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .experience-overhaul__heading h2 {
      margin: 0;
      color: #0f172a;
      font-size: clamp(2rem, 5vw, 2.65rem);
      font-weight: 850;
      letter-spacing: -.035em;
    }

    .experience-overhaul__underline {
      width: 92px;
      height: 4px;
      margin: .85rem auto 0;
      border-radius: 999px;
      background: linear-gradient(90deg, #2563eb 0 72%, #22d3ee 72% 100%);
    }

    .experience-overhaul__intro {
      margin: 1.15rem auto 0;
      color: #475569;
      font-size: 1rem;
      line-height: 1.75;
    }

    .experience-overhaul__summary {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: .85rem;
      max-width: 760px;
      margin: 2rem auto 0;
    }

    .experience-overhaul__metric {
      padding: .95rem 1rem;
      border: 1px solid rgba(37, 99, 235, .15);
      border-radius: 1rem;
      background: rgba(255, 255, 255, .72);
      box-shadow: 0 10px 30px rgba(15, 23, 42, .06);
      backdrop-filter: blur(12px);
    }

    .experience-overhaul__metric strong,
    .experience-overhaul__metric span {
      display: block;
    }

    .experience-overhaul__metric strong {
      color: #0f3b75;
      font-size: .98rem;
      font-weight: 850;
    }

    .experience-overhaul__metric span {
      margin-top: .2rem;
      color: #64748b;
      font-size: .78rem;
      font-weight: 650;
    }

    .experience-overhaul__timeline {
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
      margin-top: 3.5rem;
    }

    .experience-overhaul__timeline::before {
      content: "";
      position: absolute;
      left: 10%;
      right: 10%;
      top: -1.45rem;
      height: 3px;
      border-radius: 999px;
      background: linear-gradient(90deg, #2563eb, #22d3ee);
      opacity: .6;
    }

    .experience-overhaul__card-wrap {
      position: relative;
      opacity: 0;
      transform: translateY(28px);
      transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
    }

    .experience-overhaul__card-wrap[data-visible="true"] {
      opacity: 1;
      transform: translateY(0);
    }

    .experience-overhaul__node {
      position: absolute;
      z-index: 3;
      top: -2rem;
      left: 50%;
      display: grid;
      width: 2.45rem;
      height: 2.45rem;
      place-items: center;
      border: 4px solid #eef5ff;
      border-radius: 999px;
      background: linear-gradient(145deg, #2563eb, #0891b2);
      color: white;
      font-size: .72rem;
      font-weight: 900;
      transform: translateX(-50%);
      box-shadow: 0 8px 22px rgba(37, 99, 235, .28);
    }

    .experience-overhaul__card {
      position: relative;
      min-height: 100%;
      overflow: hidden;
      border: 1px solid rgba(148, 163, 184, .24);
      border-radius: 1.5rem;
      background: linear-gradient(155deg, rgba(255, 255, 255, .96), rgba(241, 245, 249, .94));
      box-shadow: 0 25px 60px rgba(15, 23, 42, .12), inset 0 1px 0 rgba(255, 255, 255, .9);
      transform-style: preserve-3d;
      will-change: transform;
      transition: box-shadow .25s ease, border-color .25s ease;
    }

    .experience-overhaul__card:hover {
      border-color: rgba(37, 99, 235, .42);
      box-shadow: 0 32px 75px rgba(15, 23, 42, .16), 0 0 0 1px rgba(59, 130, 246, .08);
    }

    .experience-overhaul__card[data-featured="true"] {
      background: linear-gradient(155deg, #0f274d, #102f5f 58%, #0b3a5d);
      border-color: rgba(125, 211, 252, .24);
      color: #f8fafc;
    }

    .experience-overhaul__glare {
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      background: radial-gradient(500px circle at 50% 50%, rgba(255,255,255,.16), transparent 48%);
      opacity: 0;
      transition: opacity .2s ease;
    }

    .experience-overhaul__card:hover .experience-overhaul__glare {
      opacity: 1;
    }

    .experience-overhaul__card-content {
      position: relative;
      z-index: 1;
      padding: 1.75rem;
      transform: translateZ(22px);
    }

    .experience-overhaul__topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .experience-overhaul__eyebrow {
      display: inline-flex;
      align-items: center;
      gap: .45rem;
      color: #2563eb;
      font-size: .72rem;
      font-weight: 850;
      letter-spacing: .075em;
      text-transform: uppercase;
    }

    .experience-overhaul__eyebrow::before {
      content: "";
      width: .55rem;
      height: .55rem;
      border-radius: 999px;
      background: #22d3ee;
      box-shadow: 0 0 0 4px rgba(34, 211, 238, .13);
    }

    [data-featured="true"] .experience-overhaul__eyebrow {
      color: #7dd3fc;
    }

    .experience-overhaul__period {
      flex: 0 0 auto;
      padding: .4rem .65rem;
      border: 1px solid rgba(37, 99, 235, .16);
      border-radius: 999px;
      background: rgba(37, 99, 235, .07);
      color: #1d4ed8;
      font-size: .72rem;
      font-weight: 800;
    }

    [data-featured="true"] .experience-overhaul__period {
      border-color: rgba(125, 211, 252, .22);
      background: rgba(125, 211, 252, .1);
      color: #bae6fd;
    }

    .experience-overhaul__card h3 {
      margin: 1rem 0 0;
      color: #0f172a;
      font-size: clamp(1.45rem, 3vw, 1.8rem);
      font-weight: 850;
      line-height: 1.18;
      letter-spacing: -.025em;
    }

    [data-featured="true"] h3 {
      color: #fff;
    }

    .experience-overhaul__company {
      margin: .45rem 0 0;
      color: #2563eb;
      font-size: .95rem;
      font-weight: 800;
    }

    [data-featured="true"] .experience-overhaul__company {
      color: #67e8f9;
    }

    .experience-overhaul__card-summary {
      margin: 1.15rem 0 0;
      color: #475569;
      line-height: 1.72;
    }

    [data-featured="true"] .experience-overhaul__card-summary {
      color: #dbeafe;
    }

    .experience-overhaul__list {
      display: grid;
      gap: .8rem;
      margin: 1.3rem 0 0;
      padding: 0;
      list-style: none;
    }

    .experience-overhaul__list li {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: .7rem;
      color: #334155;
      line-height: 1.55;
    }

    [data-featured="true"] .experience-overhaul__list li {
      color: #e2e8f0;
    }

    .experience-overhaul__check {
      display: grid;
      width: 1.25rem;
      height: 1.25rem;
      margin-top: .08rem;
      place-items: center;
      border-radius: 999px;
      background: rgba(37, 99, 235, .1);
      color: #2563eb;
      font-size: .72rem;
      font-weight: 900;
    }

    [data-featured="true"] .experience-overhaul__check {
      background: rgba(34, 211, 238, .13);
      color: #67e8f9;
    }

    .experience-overhaul__flow {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: .45rem;
      margin-top: 1.45rem;
      padding: 1rem;
      border: 1px solid rgba(125, 211, 252, .16);
      border-radius: 1rem;
      background: rgba(2, 6, 23, .18);
    }

    .experience-overhaul__flow-step {
      display: inline-flex;
      align-items: center;
      gap: .45rem;
      color: #e0f2fe;
      font-size: .7rem;
      font-weight: 800;
    }

    .experience-overhaul__flow-step:not(:last-child)::after {
      content: "→";
      color: #38bdf8;
      font-size: .9rem;
    }

    .experience-overhaul__tags {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
      margin-top: 1.35rem;
    }

    .experience-overhaul__tag {
      padding: .42rem .65rem;
      border: 1px solid rgba(37, 99, 235, .15);
      border-radius: 999px;
      background: rgba(37, 99, 235, .07);
      color: #1e40af;
      font-size: .7rem;
      font-weight: 780;
    }

    [data-featured="true"] .experience-overhaul__tag {
      border-color: rgba(125, 211, 252, .19);
      background: rgba(125, 211, 252, .09);
      color: #bae6fd;
    }

    .experience-overhaul__tools {
      margin: 1.25rem 0 0;
      padding-top: 1rem;
      border-top: 1px solid rgba(148, 163, 184, .2);
      color: #64748b;
      font-size: .78rem;
      font-weight: 650;
      line-height: 1.55;
    }

    [data-featured="true"] .experience-overhaul__tools {
      border-color: rgba(148, 163, 184, .17);
      color: #bfdbfe;
    }

    .experience-overhaul__tools strong {
      color: #0f172a;
      font-weight: 850;
    }

    [data-featured="true"] .experience-overhaul__tools strong {
      color: #fff;
    }

    @media (max-width: 820px) {
      [data-experience-overhaul] {
        padding: 5rem 0;
      }

      .experience-overhaul__summary,
      .experience-overhaul__timeline {
        grid-template-columns: 1fr;
      }

      .experience-overhaul__timeline {
        gap: 2.6rem;
      }

      .experience-overhaul__timeline::before {
        top: 0;
        bottom: 0;
        left: 1.2rem;
        right: auto;
        width: 3px;
        height: auto;
      }

      .experience-overhaul__card-wrap {
        padding-left: 2.4rem;
      }

      .experience-overhaul__node {
        top: 1.4rem;
        left: 1.2rem;
      }
    }

    @media (max-width: 520px) {
      .experience-overhaul__summary {
        grid-template-columns: 1fr;
      }

      .experience-overhaul__topline {
        align-items: flex-start;
        flex-direction: column;
      }

      .experience-overhaul__card-content {
        padding: 1.35rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .experience-overhaul__card-wrap {
        opacity: 1;
        transform: none;
        transition: none;
      }

      .experience-overhaul__card {
        transform: none !important;
      }
    }
  `;
  document.head.append(style);
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const addTilt = (card, glare) => {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const onMove = (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 7;
    const rotateY = (x - 0.5) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    glare.style.background = `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.18), transparent 48%)`;
  };

  const reset = () => {
    card.style.transform = "";
  };

  card.addEventListener("pointermove", onMove);
  card.addEventListener("pointerleave", reset);
};

const createCard = (experience) => {
  const wrap = createElement("article", "experience-overhaul__card-wrap");
  wrap.dataset.visible = "false";

  const node = createElement("div", "experience-overhaul__node", experience.order);
  node.setAttribute("aria-hidden", "true");

  const card = createElement("div", "experience-overhaul__card");
  card.dataset.featured = String(experience.featured);

  const glare = createElement("div", "experience-overhaul__glare");
  glare.setAttribute("aria-hidden", "true");

  const content = createElement("div", "experience-overhaul__card-content");
  const topline = createElement("div", "experience-overhaul__topline");
  topline.append(
    createElement("span", "experience-overhaul__eyebrow", experience.eyebrow),
    createElement("span", "experience-overhaul__period", experience.period),
  );

  const title = createElement("h3", "", experience.title);
  const company = createElement("p", "experience-overhaul__company", experience.company);
  const summary = createElement("p", "experience-overhaul__card-summary", experience.summary);

  const list = createElement("ul", "experience-overhaul__list");
  experience.highlights.forEach((highlight) => {
    const item = createElement("li");
    item.append(
      createElement("span", "experience-overhaul__check", "✓"),
      createElement("span", "", highlight),
    );
    list.append(item);
  });

  content.append(topline, title, company, summary, list);

  if (experience.flow) {
    const flow = createElement("div", "experience-overhaul__flow");
    flow.setAttribute("aria-label", "Flujo operativo de gestión de incidentes");
    experience.flow.forEach((step) => {
      flow.append(createElement("span", "experience-overhaul__flow-step", step));
    });
    content.append(flow);
  }

  const tags = createElement("div", "experience-overhaul__tags");
  experience.tags.forEach((tag) => tags.append(createElement("span", "experience-overhaul__tag", tag)));

  const tools = createElement("p", "experience-overhaul__tools");
  const toolsLabel = createElement("strong", "", experience.featured ? "Plataformas: " : "Tecnologías: ");
  tools.append(toolsLabel, document.createTextNode(experience.tools));

  content.append(tags, tools);
  card.append(glare, content);
  wrap.append(node, card);
  addTilt(card, glare);
  return wrap;
};

const applyExperienceOverhaul = () => {
  const section = document.querySelector("#experience");
  if (!section || section.hasAttribute(EXPERIENCE_MARKER)) return;

  const originalContainer = section.querySelector(":scope > div");
  if (!originalContainer) return;

  addStyles();
  section.classList.add("experience-overhaul-section");
  originalContainer.style.display = "none";
  originalContainer.setAttribute("aria-hidden", "true");

  const root = createElement("div");
  root.dataset.experienceOverhaul = "true";

  const heading = createElement("header", "experience-overhaul__heading");
  const title = createElement("h2", "", "Experiencia");
  title.id = "experience-overhaul-title";
  const underline = createElement("div", "experience-overhaul__underline");
  underline.setAttribute("aria-hidden", "true");
  const intro = createElement(
    "p",
    "experience-overhaul__intro",
    "Una trayectoria que conecta operación, gestión de incidentes, telecomunicaciones, automatización y seguridad aplicada.",
  );
  heading.append(title, underline, intro);

  const summary = createElement("div", "experience-overhaul__summary");
  [
    ["Casi 7 años", "Operaciones y soporte técnico"],
    ["Incidentes + SLA", "Priorización y escalamiento"],
    ["Telecom + automatización", "Base diferencial para SOC"],
  ].forEach(([strongText, spanText]) => {
    const metric = createElement("div", "experience-overhaul__metric");
    metric.append(createElement("strong", "", strongText), createElement("span", "", spanText));
    summary.append(metric);
  });

  const timeline = createElement("div", "experience-overhaul__timeline");
  EXPERIENCES.forEach((experience) => timeline.append(createCard(experience)));

  root.append(heading, summary, timeline);
  section.append(root);
  section.setAttribute(EXPERIENCE_MARKER, "true");
  section.setAttribute("aria-labelledby", "experience-overhaul-title");

  const cards = [...root.querySelectorAll(".experience-overhaul__card-wrap")];
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    cards.forEach((card) => {
      card.dataset.visible = "true";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.visible = "true";
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 110}ms`;
    observer.observe(card);
  });
};

export const startExperienceOverhaul = () => {
  if (window.__portfolioExperienceOverhaulStarted) return;
  window.__portfolioExperienceOverhaulStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      applyExperienceOverhaul();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
