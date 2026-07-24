const SKILLS_MARKER = "data-skills-overhaul-ready";

const SKILL_GROUPS = [
  {
    title: "Operaciones, sistemas y redes",
    description: "Experiencia operativa, soporte técnico y telecomunicaciones.",
    accent: ["#2563eb", "#0891b2"],
    skills: [
      ["DEB", "Linux Debian"],
      ["WIN", "Windows"],
      ["VM", "VirtualBox"],
      ["TCP", "TCP/IP"],
      ["DNS", "DNS"],
      ["DHCP", "DHCP"],
      ["VPN", "VPN"],
      ["XDSL", "ADSL / VDSL"],
      ["HFC", "Redes HFC"],
      ["FTTH", "Redes FTTH"],
      ["CATV", "CATV"],
      ["4G/5G", "Redes móviles 4G / 5G"],
      ["INC", "Gestión de incidentes"],
      ["SLA", "SLA, documentación y escalamiento"],
    ],
  },
  {
    title: "Seguridad y laboratorios autorizados",
    description: "Uso práctico inicial y formación académica, sin atribuir experiencia profesional en un SOC.",
    accent: ["#0f766e", "#2563eb"],
    skills: [
      ["NMAP", "Nmap — uso práctico"],
      ["SSL", "OpenSSL"],
      ["VT", "VirusTotal"],
      ["YARA", "YARA"],
      ["MSF", "Metasploit — nivel inicial"],
      ["MITRE", "MITRE ATT&CK"],
      ["OWASP", "OWASP"],
      ["ISO", "ISO 27001"],
      ["NIST", "NIST"],
      ["WAZ", "Wazuh — formación académica"],
      ["GRAY", "Graylog — formación académica"],
      ["SNORT", "Snort — formación académica"],
      ["SURI", "Suricata — formación académica"],
    ],
  },
  {
    title: "Desarrollo y automatización",
    description: "Proyectos propios, integraciones, APIs y automatización de procesos.",
    accent: ["#4f46e5", "#0284c7"],
    skills: [
      ["JS", "JavaScript"],
      ["NODE", "Node.js"],
      ["GIT", "Git y GitHub"],
      ["API", "APIs REST"],
      ["SQLITE", "SQLite"],
      ["SQL", "MySQL / MariaDB"],
      ["PY", "Python básico"],
      ["FLASK", "Flask"],
      ["FAST", "FastAPI"],
      ["WEB", "HTML y CSS"],
      ["BOT", "Automatización con Baileys"],
    ],
  },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const addStyles = () => {
  if (document.querySelector("style[data-skills-overhaul-styles]")) return;

  const style = document.createElement("style");
  style.dataset.skillsOverhaulStyles = "true";
  style.textContent = `
    [data-skills-overhaul] {
      width: min(1152px, calc(100% - 2rem));
      margin: 0 auto;
    }

    .skills-overhaul__intro {
      max-width: 760px;
      margin: 1rem auto 0;
      color: rgba(226, 232, 240, .88);
      text-align: center;
      line-height: 1.7;
    }

    .skills-overhaul__grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.25rem;
      margin-top: 3rem;
    }

    .skills-overhaul__card {
      min-width: 0;
      overflow: hidden;
      border: 1px solid rgba(148, 163, 184, .22);
      border-radius: 1.5rem;
      background: linear-gradient(160deg, rgba(30, 41, 59, .96), rgba(15, 23, 42, .98));
      box-shadow: 0 24px 55px rgba(2, 6, 23, .34), inset 0 1px 0 rgba(255, 255, 255, .05);
    }

    .skills-overhaul__header {
      min-height: 142px;
      padding: 1.5rem 1.5rem 1.1rem;
      border-bottom: 1px solid rgba(148, 163, 184, .16);
    }

    .skills-overhaul__header h3 {
      margin: 0;
      color: #fff;
      font-size: 1.18rem;
      font-weight: 800;
      line-height: 1.3;
    }

    .skills-overhaul__header p {
      margin: .65rem 0 0;
      color: #cbd5e1;
      font-size: .9rem;
      line-height: 1.55;
    }

    .skills-overhaul__arena {
      position: relative;
      height: 360px;
      overflow: hidden;
      cursor: default;
      background-image:
        linear-gradient(rgba(96, 165, 250, .045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(96, 165, 250, .045) 1px, transparent 1px),
        radial-gradient(circle at 50% 20%, rgba(59, 130, 246, .11), transparent 46%);
      background-size: 28px 28px, 28px 28px, auto;
    }

    .skill-bubble {
      position: absolute;
      left: 0;
      top: 0;
      display: grid;
      place-items: center;
      border: 0;
      padding: 0;
      border-radius: 999px;
      background: transparent;
      color: white;
      cursor: help;
      touch-action: none;
      will-change: transform;
      outline: none;
    }

    .skill-bubble__inner {
      display: grid;
      width: 100%;
      height: 100%;
      place-items: center;
      border: 1px solid rgba(186, 230, 253, .55);
      border-radius: inherit;
      color: #fff;
      font-size: .72rem;
      font-weight: 900;
      letter-spacing: .025em;
      text-align: center;
      text-shadow: 0 1px 5px rgba(0, 0, 0, .65);
      box-shadow:
        0 11px 24px rgba(2, 132, 199, .22),
        inset 0 1px 0 rgba(255, 255, 255, .22);
      transition: transform .16s ease, filter .16s ease, box-shadow .16s ease;
      user-select: none;
    }

    .skill-bubble:hover .skill-bubble__inner,
    .skill-bubble:focus-visible .skill-bubble__inner {
      transform: scale(1.12);
      filter: brightness(1.16);
      box-shadow:
        0 16px 32px rgba(56, 189, 248, .32),
        0 0 0 3px rgba(125, 211, 252, .28),
        inset 0 1px 0 rgba(255, 255, 255, .28);
    }

    .skills-overhaul__hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .45rem;
      padding: .85rem 1rem 1.05rem;
      color: #93c5fd;
      font-size: .78rem;
      font-weight: 700;
      letter-spacing: .02em;
    }

    .skills-overhaul__hint::before {
      content: "↗";
      color: #67e8f9;
      font-size: 1rem;
    }

    .skills-overhaul__tooltip {
      position: fixed;
      z-index: 9999;
      max-width: min(290px, calc(100vw - 2rem));
      padding: .55rem .75rem;
      border: 1px solid rgba(125, 211, 252, .45);
      border-radius: .7rem;
      background: rgba(2, 6, 23, .96);
      color: #f8fafc;
      font-size: .8rem;
      font-weight: 700;
      line-height: 1.35;
      box-shadow: 0 14px 35px rgba(2, 6, 23, .45);
      pointer-events: none;
      opacity: 0;
      transform: translateY(5px);
      transition: opacity .12s ease, transform .12s ease;
    }

    .skills-overhaul__tooltip[data-visible="true"] {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 960px) {
      .skills-overhaul__grid {
        grid-template-columns: 1fr;
      }

      .skills-overhaul__header {
        min-height: auto;
      }

      .skills-overhaul__arena {
        height: 330px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .skill-bubble__inner,
      .skills-overhaul__tooltip {
        transition: none;
      }
    }
  `;
  document.head.append(style);
};

const createTooltip = () => {
  const tooltip = document.createElement("div");
  tooltip.className = "skills-overhaul__tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.dataset.visible = "false";
  document.body.append(tooltip);
  return tooltip;
};

const placeTooltip = (tooltip, clientX, clientY) => {
  const margin = 14;
  const width = tooltip.offsetWidth || 220;
  const height = tooltip.offsetHeight || 44;
  const left = clamp(clientX + 16, margin, window.innerWidth - width - margin);
  const topCandidate = clientY - height - 14;
  const top = topCandidate > margin ? topCandidate : clientY + 18;
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${clamp(top, margin, window.innerHeight - height - margin)}px`;
};

const createBubbleArena = (group, tooltip) => {
  const arena = document.createElement("div");
  arena.className = "skills-overhaul__arena";
  arena.setAttribute("aria-label", `Burbujas de ${group.title}`);

  const bubbles = group.skills.map(([shortName, fullName], index) => {
    const diameter = shortName.length >= 6 ? 68 : shortName.length >= 4 ? 62 : 58;
    const bubble = document.createElement("button");
    bubble.type = "button";
    bubble.className = "skill-bubble";
    bubble.style.width = `${diameter}px`;
    bubble.style.height = `${diameter}px`;
    bubble.setAttribute("aria-label", fullName);
    bubble.title = fullName;

    const inner = document.createElement("span");
    inner.className = "skill-bubble__inner";
    inner.style.background = `linear-gradient(145deg, ${group.accent[0]}, ${group.accent[1]})`;
    inner.textContent = shortName;
    bubble.append(inner);

    const showTooltip = (event) => {
      tooltip.textContent = fullName;
      tooltip.dataset.visible = "true";
      const x = event.clientX || bubble.getBoundingClientRect().left + diameter / 2;
      const y = event.clientY || bubble.getBoundingClientRect().top;
      placeTooltip(tooltip, x, y);
    };

    bubble.addEventListener("pointerenter", showTooltip);
    bubble.addEventListener("pointermove", (event) => {
      if (tooltip.dataset.visible === "true") placeTooltip(tooltip, event.clientX, event.clientY);
    });
    bubble.addEventListener("focus", showTooltip);
    bubble.addEventListener("pointerleave", () => {
      tooltip.dataset.visible = "false";
    });
    bubble.addEventListener("blur", () => {
      tooltip.dataset.visible = "false";
    });

    arena.append(bubble);

    return {
      element: bubble,
      radius: diameter / 2,
      x: diameter / 2 + index * 3,
      y: diameter / 2 + index * 2,
      vx: (Math.random() < 0.5 ? -1 : 1) * (0.38 + Math.random() * 0.42),
      vy: (Math.random() < 0.5 ? -1 : 1) * (0.38 + Math.random() * 0.42),
    };
  });

  let frameId = 0;
  let lastTime = performance.now();
  let width = 0;
  let height = 0;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const layout = () => {
    const rect = arena.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (!width || !height) return;

    bubbles.forEach((bubble, index) => {
      let placed = false;
      for (let attempt = 0; attempt < 120 && !placed; attempt += 1) {
        const x = bubble.radius + Math.random() * Math.max(1, width - bubble.radius * 2);
        const y = bubble.radius + Math.random() * Math.max(1, height - bubble.radius * 2);
        const overlaps = bubbles.slice(0, index).some((other) => {
          const dx = x - other.x;
          const dy = y - other.y;
          return Math.hypot(dx, dy) < bubble.radius + other.radius + 4;
        });
        if (!overlaps) {
          bubble.x = x;
          bubble.y = y;
          placed = true;
        }
      }

      if (!placed) {
        const columns = Math.max(1, Math.floor(width / 76));
        bubble.x = bubble.radius + (index % columns) * 72;
        bubble.y = bubble.radius + Math.floor(index / columns) * 72;
      }
    });
  };

  const resolveCollision = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy) || 0.01;
    const minimum = a.radius + b.radius;
    if (distance >= minimum) return;

    const nx = dx / distance;
    const ny = dy / distance;
    const overlap = minimum - distance;
    a.x -= nx * overlap * 0.5;
    a.y -= ny * overlap * 0.5;
    b.x += nx * overlap * 0.5;
    b.y += ny * overlap * 0.5;

    const relativeVelocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
    if (relativeVelocity > 0) return;

    const impulse = -(1.72 * relativeVelocity) / 2;
    a.vx -= impulse * nx;
    a.vy -= impulse * ny;
    b.vx += impulse * nx;
    b.vy += impulse * ny;
  };

  const render = (time) => {
    const delta = clamp((time - lastTime) / 16.67, 0.45, 1.8);
    lastTime = time;

    bubbles.forEach((bubble) => {
      bubble.x += bubble.vx * delta;
      bubble.y += bubble.vy * delta;

      if (bubble.x - bubble.radius <= 0 || bubble.x + bubble.radius >= width) {
        bubble.vx *= -1;
        bubble.x = clamp(bubble.x, bubble.radius, Math.max(bubble.radius, width - bubble.radius));
      }
      if (bubble.y - bubble.radius <= 0 || bubble.y + bubble.radius >= height) {
        bubble.vy *= -1;
        bubble.y = clamp(bubble.y, bubble.radius, Math.max(bubble.radius, height - bubble.radius));
      }
    });

    for (let i = 0; i < bubbles.length; i += 1) {
      for (let j = i + 1; j < bubbles.length; j += 1) {
        resolveCollision(bubbles[i], bubbles[j]);
      }
    }

    bubbles.forEach((bubble) => {
      const speed = Math.hypot(bubble.vx, bubble.vy);
      if (speed > 1.25) {
        bubble.vx = (bubble.vx / speed) * 1.25;
        bubble.vy = (bubble.vy / speed) * 1.25;
      }
      bubble.element.style.transform = `translate3d(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px, 0)`;
    });

    frameId = window.requestAnimationFrame(render);
  };

  const observer = new ResizeObserver(layout);
  observer.observe(arena);
  window.requestAnimationFrame(layout);

  if (!reduceMotion) frameId = window.requestAnimationFrame(render);
  else {
    window.requestAnimationFrame(() => {
      bubbles.forEach((bubble) => {
        bubble.element.style.transform = `translate3d(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px, 0)`;
      });
    });
  }

  arena.addEventListener("click", (event) => {
    if (event.target.closest(".skill-bubble")) return;
    bubbles.forEach((bubble) => {
      bubble.vx += (Math.random() - 0.5) * 0.7;
      bubble.vy += (Math.random() - 0.5) * 0.7;
    });
  });

  arena.dataset.cleanup = "registered";
  window.addEventListener(
    "pagehide",
    () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      observer.disconnect();
    },
    { once: true },
  );

  return arena;
};

const createSkillsCard = (group, tooltip) => {
  const card = document.createElement("article");
  card.className = "skills-overhaul__card";

  const header = document.createElement("header");
  header.className = "skills-overhaul__header";
  header.style.boxShadow = `inset 0 3px 0 ${group.accent[0]}`;

  const title = document.createElement("h3");
  title.textContent = group.title;

  const description = document.createElement("p");
  description.textContent = group.description;

  header.append(title, description);

  const arena = createBubbleArena(group, tooltip);

  const hint = document.createElement("div");
  hint.className = "skills-overhaul__hint";
  hint.textContent = "Pasá el mouse sobre una burbuja para ver su nombre";

  card.append(header, arena, hint);
  return card;
};

const applySkillsOverhaul = () => {
  const section = document.querySelector("#skills");
  if (!section || section.hasAttribute(SKILLS_MARKER)) return;

  const originalContainer = section.querySelector(":scope > div");
  if (!originalContainer) return;

  addStyles();
  originalContainer.style.display = "none";
  originalContainer.setAttribute("aria-hidden", "true");

  const root = document.createElement("div");
  root.dataset.skillsOverhaul = "true";

  const heading = document.createElement("div");
  heading.style.textAlign = "center";

  const title = document.createElement("h2");
  title.textContent = "Habilidades Técnicas";
  title.style.margin = "0";
  title.style.color = "#ffffff";
  title.style.fontSize = "clamp(2rem, 5vw, 2.5rem)";
  title.style.fontWeight = "800";
  title.style.letterSpacing = "-.025em";

  const underline = document.createElement("div");
  underline.style.width = "88px";
  underline.style.height = "4px";
  underline.style.margin = ".8rem auto 0";
  underline.style.borderRadius = "999px";
  underline.style.background = "linear-gradient(90deg, #3b82f6 0 72%, #7dd3fc 72% 100%)";

  const intro = document.createElement("p");
  intro.className = "skills-overhaul__intro";
  intro.textContent =
    "Competencias organizadas según experiencia operativa, práctica en laboratorios autorizados y proyectos propios.";

  heading.append(title, underline, intro);

  const tooltip = createTooltip();
  const grid = document.createElement("div");
  grid.className = "skills-overhaul__grid";
  SKILL_GROUPS.forEach((group) => grid.append(createSkillsCard(group, tooltip)));

  root.append(heading, grid);
  section.append(root);
  section.setAttribute(SKILLS_MARKER, "true");
};

export const startSkillsOverhaul = () => {
  if (window.__portfolioSkillsOverhaulStarted) return;
  window.__portfolioSkillsOverhaulStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      applySkillsOverhaul();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
