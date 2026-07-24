const EDUCATION_MARKER = "data-education-overhaul-ready";

const ACADEMIC_AREAS = [
  "Tratamiento de incidentes",
  "Gestión de riesgos",
  "Gestión de accesos",
  "Tratamiento de vulnerabilidades",
  "Criptografía",
  "Hacking ético",
  "Análisis forense",
  "Ciberdefensa",
  "Infraestructuras críticas",
  "Software seguro",
  "Seguridad cloud",
];

const addStyles = () => {
  if (document.querySelector("style[data-education-overhaul-styles]")) return;

  const style = document.createElement("style");
  style.dataset.educationOverhaulStyles = "true";
  style.textContent = `
    #education[data-education-overhaul-ready] {
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(circle at 15% 10%, rgba(37, 99, 235, .18), transparent 34%),
        radial-gradient(circle at 86% 34%, rgba(8, 145, 178, .14), transparent 34%),
        linear-gradient(155deg, #020617 0%, #0f172a 52%, #111827 100%) !important;
    }

    #education[data-education-overhaul-ready]::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: .26;
      background-image:
        linear-gradient(rgba(96, 165, 250, .055) 1px, transparent 1px),
        linear-gradient(90deg, rgba(96, 165, 250, .055) 1px, transparent 1px);
      background-size: 34px 34px;
      mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
    }

    [data-education-overhaul] {
      position: relative;
      z-index: 1;
      width: min(1120px, calc(100% - 2rem));
      margin: 0 auto;
    }

    .education-overhaul__heading {
      max-width: 790px;
      margin: 0 auto;
      text-align: center;
    }

    .education-overhaul__heading h2 {
      margin: 0;
      color: #fff;
      font-size: clamp(2rem, 5vw, 2.6rem);
      font-weight: 850;
      letter-spacing: -.035em;
    }

    .education-overhaul__underline {
      width: 92px;
      height: 4px;
      margin: .85rem auto 0;
      border-radius: 999px;
      background: linear-gradient(90deg, #3b82f6 0 72%, #67e8f9 72% 100%);
    }

    .education-overhaul__intro {
      margin: 1rem auto 0;
      color: #cbd5e1;
      font-size: 1rem;
      line-height: 1.7;
    }

    .education-overhaul__timeline {
      position: relative;
      display: grid;
      gap: 1.35rem;
      margin-top: 3rem;
      padding-left: 3rem;
    }

    .education-overhaul__timeline::before {
      content: "";
      position: absolute;
      top: 1.15rem;
      bottom: 1.15rem;
      left: 1.05rem;
      width: 3px;
      border-radius: 999px;
      background: linear-gradient(#38bdf8, #2563eb 62%, #64748b);
      box-shadow: 0 0 24px rgba(56, 189, 248, .24);
    }

    .education-overhaul__item {
      position: relative;
      opacity: 0;
      transform: translateY(28px);
    }

    .education-overhaul__item[data-visible="true"] {
      opacity: 1;
      transform: translateY(0);
      transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
    }

    .education-overhaul__node {
      position: absolute;
      top: 1.65rem;
      left: -2.55rem;
      display: grid;
      width: 2.2rem;
      height: 2.2rem;
      place-items: center;
      border: 3px solid rgba(186, 230, 253, .9);
      border-radius: 999px;
      background: #0f172a;
      color: #7dd3fc;
      box-shadow: 0 0 0 5px rgba(37, 99, 235, .13), 0 0 28px rgba(56, 189, 248, .28);
      font-size: 1rem;
    }

    .education-overhaul__card {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(148, 163, 184, .25);
      border-radius: 1.6rem;
      background: linear-gradient(145deg, rgba(30, 41, 59, .94), rgba(15, 23, 42, .98));
      box-shadow: 0 28px 65px rgba(2, 6, 23, .38), inset 0 1px 0 rgba(255, 255, 255, .05);
      transform-style: preserve-3d;
      transition: border-color .25s ease, box-shadow .25s ease;
      will-change: transform;
    }

    .education-overhaul__card:hover {
      border-color: rgba(96, 165, 250, .48);
      box-shadow: 0 34px 75px rgba(2, 6, 23, .46), 0 0 0 1px rgba(56, 189, 248, .08);
    }

    .education-overhaul__glare {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0;
      border-radius: inherit;
      transition: opacity .2s ease;
    }

    .education-overhaul__card:hover .education-overhaul__glare {
      opacity: 1;
    }

    .education-overhaul__main {
      padding: clamp(1.35rem, 4vw, 2.25rem);
    }

    .education-overhaul__topline {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: .8rem;
    }

    .education-overhaul__status {
      display: inline-flex;
      align-items: center;
      gap: .45rem;
      padding: .48rem .75rem;
      border: 1px solid rgba(103, 232, 249, .4);
      border-radius: 999px;
      background: rgba(8, 145, 178, .12);
      color: #a5f3fc;
      font-size: .78rem;
      font-weight: 800;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    .education-overhaul__status::before {
      content: "";
      width: .55rem;
      height: .55rem;
      border-radius: 999px;
      background: #22d3ee;
      box-shadow: 0 0 12px rgba(34, 211, 238, .9);
    }

    .education-overhaul__date {
      color: #93c5fd;
      font-size: .88rem;
      font-weight: 800;
    }

    .education-overhaul__title {
      margin: 1rem 0 0;
      color: #fff;
      font-size: clamp(1.55rem, 4vw, 2.25rem);
      font-weight: 850;
      line-height: 1.18;
      letter-spacing: -.025em;
    }

    .education-overhaul__institution {
      margin: .45rem 0 0;
      color: #7dd3fc;
      font-size: 1rem;
      font-weight: 750;
    }

    .education-overhaul__summary {
      max-width: 860px;
      margin: 1.1rem 0 0;
      color: #cbd5e1;
      line-height: 1.75;
    }

    .education-overhaul__metrics {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: .8rem;
      margin-top: 1.45rem;
    }

    .education-overhaul__metric {
      min-width: 0;
      padding: 1rem;
      border: 1px solid rgba(96, 165, 250, .18);
      border-radius: 1rem;
      background: rgba(15, 23, 42, .72);
    }

    .education-overhaul__metric strong {
      display: block;
      color: #fff;
      font-size: 1.18rem;
      font-weight: 850;
      line-height: 1.15;
    }

    .education-overhaul__metric span {
      display: block;
      margin-top: .35rem;
      color: #94a3b8;
      font-size: .78rem;
      font-weight: 700;
      line-height: 1.35;
    }

    .education-overhaul__validity {
      display: flex;
      align-items: flex-start;
      gap: .8rem;
      margin-top: 1rem;
      padding: 1rem 1.05rem;
      border: 1px solid rgba(52, 211, 153, .24);
      border-radius: 1rem;
      background: rgba(6, 78, 59, .13);
      color: #d1fae5;
      line-height: 1.55;
    }

    .education-overhaul__validity-icon {
      flex: 0 0 auto;
      color: #6ee7b7;
      font-size: 1.2rem;
    }

    .education-overhaul__areas-title {
      margin: 1.45rem 0 .8rem;
      color: #fff;
      font-size: .95rem;
      font-weight: 800;
    }

    .education-overhaul__areas {
      display: flex;
      flex-wrap: wrap;
      gap: .55rem;
    }

    .education-overhaul__area {
      padding: .48rem .7rem;
      border: 1px solid rgba(96, 165, 250, .24);
      border-radius: 999px;
      background: rgba(37, 99, 235, .11);
      color: #dbeafe;
      font-size: .78rem;
      font-weight: 700;
    }

    .education-overhaul__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: .8rem;
      margin-top: 1.5rem;
    }

    .education-overhaul__link {
      display: inline-flex;
      align-items: center;
      gap: .55rem;
      padding: .75rem 1rem;
      border: 1px solid rgba(125, 211, 252, .38);
      border-radius: .9rem;
      background: linear-gradient(135deg, #2563eb, #0891b2);
      color: #fff;
      font-size: .88rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 12px 28px rgba(37, 99, 235, .24);
      transition: transform .18s ease, filter .18s ease;
    }

    .education-overhaul__link:hover,
    .education-overhaul__link:focus-visible {
      transform: translateY(-2px);
      filter: brightness(1.08);
      outline: none;
    }

    .education-overhaul__secondary {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1rem;
      align-items: start;
      padding: 1.4rem 1.5rem;
    }

    .education-overhaul__secondary-icon {
      display: grid;
      width: 3rem;
      height: 3rem;
      place-items: center;
      border: 1px solid rgba(148, 163, 184, .26);
      border-radius: 1rem;
      background: rgba(51, 65, 85, .56);
      font-size: 1.35rem;
    }

    .education-overhaul__secondary h3 {
      margin: 0;
      color: #f8fafc;
      font-size: 1.15rem;
      font-weight: 800;
    }

    .education-overhaul__secondary p {
      margin: .35rem 0 0;
      color: #94a3b8;
      line-height: 1.55;
    }

    @media (max-width: 820px) {
      .education-overhaul__metrics {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 560px) {
      .education-overhaul__timeline {
        padding-left: 2.25rem;
      }

      .education-overhaul__timeline::before {
        left: .72rem;
      }

      .education-overhaul__node {
        left: -2rem;
        width: 1.8rem;
        height: 1.8rem;
        font-size: .82rem;
      }

      .education-overhaul__metrics {
        grid-template-columns: 1fr;
      }

      .education-overhaul__secondary {
        grid-template-columns: 1fr;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .education-overhaul__item {
        opacity: 1;
        transform: none;
      }

      .education-overhaul__card,
      .education-overhaul__link,
      .education-overhaul__glare {
        transition: none;
      }
    }
  `;
  document.head.append(style);
};

const addTilt = (card) => {
  if (card.dataset.tiltReady === "true") return;
  card.dataset.tiltReady = "true";

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const glare = card.querySelector(".education-overhaul__glare");

  const onMove = (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 5;
    const rotateY = (x - 0.5) * 5;

    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    if (glare) {
      glare.style.background = `radial-gradient(520px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.15), transparent 58%)`;
    }
  };

  const reset = () => {
    card.style.transform = "";
  };

  card.addEventListener("pointermove", onMove);
  card.addEventListener("pointerleave", reset);
};

const createMetric = (value, label) => {
  const metric = document.createElement("div");
  metric.className = "education-overhaul__metric";

  const strong = document.createElement("strong");
  strong.textContent = value;

  const span = document.createElement("span");
  span.textContent = label;

  metric.append(strong, span);
  return metric;
};

const createPrimaryEducation = () => {
  const item = document.createElement("article");
  item.className = "education-overhaul__item";
  item.dataset.visible = "false";

  const node = document.createElement("div");
  node.className = "education-overhaul__node";
  node.setAttribute("aria-hidden", "true");
  node.textContent = "🛡";

  const card = document.createElement("div");
  card.className = "education-overhaul__card";

  const glare = document.createElement("div");
  glare.className = "education-overhaul__glare";
  glare.setAttribute("aria-hidden", "true");

  const main = document.createElement("div");
  main.className = "education-overhaul__main";

  const topline = document.createElement("div");
  topline.className = "education-overhaul__topline";

  const status = document.createElement("span");
  status.className = "education-overhaul__status";
  status.textContent = "Finalización próxima";

  const date = document.createElement("span");
  date.className = "education-overhaul__date";
  date.textContent = "2024 – 2026";

  topline.append(status, date);

  const title = document.createElement("h3");
  title.className = "education-overhaul__title";
  title.textContent = "Tecnicatura Universitaria en Ciberseguridad";

  const institution = document.createElement("p");
  institution.className = "education-overhaul__institution";
  institution.textContent = "Universidad del Gran Rosario";

  const summary = document.createElement("p");
  summary.className = "education-overhaul__summary";
  summary.textContent =
    "Formación universitaria orientada al análisis, prevención y respuesta ante incidentes. Actualmente restan dos exámenes finales para completar la carrera.";

  const metrics = document.createElement("div");
  metrics.className = "education-overhaul__metrics";
  metrics.append(
    createMetric("2", "Exámenes finales pendientes"),
    createMetric("1.600 h", "Carga horaria total"),
    createMetric("≥ 8", "Promedio académico"),
    createMetric("1226/2022", "Resolución ministerial"),
  );

  const validity = document.createElement("div");
  validity.className = "education-overhaul__validity";

  const validityIcon = document.createElement("span");
  validityIcon.className = "education-overhaul__validity-icon";
  validityIcon.setAttribute("aria-hidden", "true");
  validityIcon.textContent = "✓";

  const validityText = document.createElement("span");
  validityText.textContent =
    "Título de pregrado con reconocimiento oficial y validez nacional, dictado bajo modalidad a distancia.";

  validity.append(validityIcon, validityText);

  const areasTitle = document.createElement("h4");
  areasTitle.className = "education-overhaul__areas-title";
  areasTitle.textContent = "Áreas relevantes para un SOC";

  const areas = document.createElement("div");
  areas.className = "education-overhaul__areas";
  ACADEMIC_AREAS.forEach((area) => {
    const chip = document.createElement("span");
    chip.className = "education-overhaul__area";
    chip.textContent = area;
    areas.append(chip);
  });

  const actions = document.createElement("div");
  actions.className = "education-overhaul__actions";

  const link = document.createElement("a");
  link.className = "education-overhaul__link";
  link.href = "https://github.com/Dante2617012022/Actividades-UGR-Ciberseguridad";
  link.target = "_blank";
  link.rel = "noreferrer noopener";
  link.textContent = "Ver actividades académicas ↗";

  actions.append(link);
  main.append(topline, title, institution, summary, metrics, validity, areasTitle, areas, actions);
  card.append(glare, main);
  item.append(node, card);
  addTilt(card);
  return item;
};

const createSecondaryEducation = () => {
  const item = document.createElement("article");
  item.className = "education-overhaul__item";
  item.dataset.visible = "false";

  const node = document.createElement("div");
  node.className = "education-overhaul__node";
  node.setAttribute("aria-hidden", "true");
  node.textContent = "🎓";

  const card = document.createElement("div");
  card.className = "education-overhaul__card education-overhaul__secondary";

  const glare = document.createElement("div");
  glare.className = "education-overhaul__glare";
  glare.setAttribute("aria-hidden", "true");

  const icon = document.createElement("div");
  icon.className = "education-overhaul__secondary-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "📘";

  const body = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = "Economía y Gestión de las Organizaciones";

  const description = document.createElement("p");
  description.textContent = "Colegio General Don José de San Martín · Egreso 2014";

  body.append(title, description);
  card.append(glare, icon, body);
  item.append(node, card);
  addTilt(card);
  return item;
};

const applyReveal = (root) => {
  const items = root.querySelectorAll(".education-overhaul__item");
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => {
      item.dataset.visible = "true";
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
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 110}ms`;
    observer.observe(item);
  });
};

const applyEducationOverhaul = () => {
  const section = document.querySelector("#education");
  if (!section || section.hasAttribute(EDUCATION_MARKER)) return;

  const originalContainer = section.querySelector(":scope > div");
  if (!originalContainer) return;

  addStyles();
  originalContainer.style.display = "none";
  originalContainer.setAttribute("aria-hidden", "true");

  const root = document.createElement("div");
  root.dataset.educationOverhaul = "true";

  const heading = document.createElement("header");
  heading.className = "education-overhaul__heading";

  const title = document.createElement("h2");
  title.textContent = "Educación";

  const underline = document.createElement("div");
  underline.className = "education-overhaul__underline";
  underline.setAttribute("aria-hidden", "true");

  const intro = document.createElement("p");
  intro.className = "education-overhaul__intro";
  intro.textContent =
    "Formación universitaria oficial en etapa final, con contenidos directamente aplicables al análisis y la respuesta ante incidentes.";

  heading.append(title, underline, intro);

  const timeline = document.createElement("div");
  timeline.className = "education-overhaul__timeline";
  timeline.append(createPrimaryEducation(), createSecondaryEducation());

  root.append(heading, timeline);
  section.append(root);
  section.setAttribute(EDUCATION_MARKER, "true");
  applyReveal(root);
};

export const startEducationOverhaul = () => {
  if (window.__portfolioEducationOverhaulStarted) return;
  window.__portfolioEducationOverhaulStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;

    window.requestAnimationFrame(() => {
      scheduled = false;
      applyEducationOverhaul();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
