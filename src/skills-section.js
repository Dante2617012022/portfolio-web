import nmapLogo from "./assets/logos/nmap.jpeg";
import burpLogo from "./assets/logos/burpsuite.svg";
import opensslLogo from "./assets/logos/OpenSSL.png";
import mitreLogo from "./assets/logos/mitre-attack.png";
import owaspLogo from "./assets/logos/OWASP.png";
import isoLogo from "./assets/logos/ISO 27001.png";
import nistLogo from "./assets/logos/NIST-Logo.png";

const SKILLS_MARKER = "data-skills-overhaul-ready";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const pictogram = (kind) => {
  const bodies = {
    identity: '<circle cx="32" cy="22" r="10"/><path d="M14 51c2-11 10-17 18-17s16 6 18 17"/>',
    key: '<circle cx="22" cy="31" r="10"/><path d="M31 31h21m-7 0v7m-8-7v5"/>',
    token: '<rect x="10" y="17" width="44" height="30" rx="7"/><path d="M20 27h24M20 37h15"/>',
    shield: '<path d="M32 8 50 15v14c0 12-7 21-18 27C21 50 14 41 14 29V15z"/><path d="m23 31 6 6 12-13"/>',
    users: '<circle cx="25" cy="24" r="8"/><circle cx="43" cy="27" r="6"/><path d="M10 50c2-10 8-15 15-15s14 5 16 15M38 39c7 0 12 4 14 11"/>',
    phone: '<rect x="20" y="8" width="24" height="48" rx="5"/><path d="M28 15h8M29 49h6"/><path d="m26 34 5 5 9-11"/>',
    code: '<path d="m23 20-12 12 12 12M41 20l12 12-12 12M36 14 28 50"/>',
    scan: '<path d="M12 24V12h12M40 12h12v12M52 40v12H40M24 52H12V40"/><circle cx="32" cy="32" r="8"/><path d="m38 38 8 8"/>',
    secret: '<path d="M14 20h36v28H14z"/><path d="M22 20v-5h20v5M22 30h20M22 38h12"/><circle cx="43" cy="39" r="4"/>',
    document: '<path d="M18 8h20l10 10v38H18z"/><path d="M38 8v12h10M25 30h16M25 39h16M25 48h11"/>',
    network: '<circle cx="32" cy="32" r="7"/><circle cx="13" cy="15" r="6"/><circle cx="51" cy="15" r="6"/><circle cx="13" cy="49" r="6"/><circle cx="51" cy="49" r="6"/><path d="m18 19 9 8m19-8-9 8m-19 18 9-8m19 8-9-8"/>',
    globe: '<circle cx="32" cy="32" r="23"/><path d="M9 32h46M32 9c8 7 12 15 12 23S40 48 32 55M32 9c-8 7-12 15-12 23s4 16 12 23"/>',
    radio: '<path d="M32 52V29M23 52h18M27 29h10"/><circle cx="32" cy="20" r="4"/><path d="M20 12c-5 5-5 11 0 16M44 12c5 5 5 11 0 16M14 6C5 14 5 25 14 34M50 6c9 8 9 19 0 28"/>',
    alert: '<path d="M32 9 57 53H7z"/><path d="M32 24v14M32 46h.01"/>',
    clock: '<circle cx="32" cy="32" r="23"/><path d="M32 18v15l10 6"/>',
    terminal: '<rect x="8" y="12" width="48" height="40" rx="5"/><path d="m17 25 8 7-8 7M29 40h15"/>',
    target: '<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="13"/><circle cx="32" cy="32" r="4"/><path d="M32 4v8M32 52v8M4 32h8M52 32h8"/>',
  };
  const body = bodies[kind] || bodies.shield;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const SKILL_GROUPS = [
  {
    title: "IAM, AppSec y autorización",
    description: "Controles implementados y validados en proyectos propios de Camdis.",
    accent: ["#2563eb", "#0891b2"],
    skills: [
      ["KC", "Keycloak", `${DEVICON}/keycloak/keycloak-original.svg`],
      ["OIDC", "OpenID Connect (OIDC)", pictogram("identity")],
      ["OAUTH", "OAuth 2.0", pictogram("key")],
      ["PKCE", "Authorization Code + PKCE S256", pictogram("shield")],
      ["JWT", "JWT", pictogram("token")],
      ["JWKS", "JWKS", pictogram("key")],
      ["RBAC", "RBAC y mínimo privilegio", pictogram("users")],
      ["MFA", "MFA", pictogram("phone")],
      ["CSRF", "Protección CSRF", pictogram("shield")],
      ["AUTHZ", "Autorización server-side", pictogram("shield")],
      ["HMAC", "HMAC-SHA256 para webhooks", pictogram("secret")],
      ["OWASP", "OWASP y desarrollo seguro", owaspLogo],
    ],
  },
  {
    title: "DevSecOps, backend y datos",
    description: "Tecnologías usadas en desarrollo, automatización, CI y controles de cadena de suministro.",
    accent: ["#4f46e5", "#0284c7"],
    skills: [
      ["DEB", "Linux Debian", `${DEVICON}/debian/debian-original.svg`],
      ["JS", "JavaScript", `${DEVICON}/javascript/javascript-original.svg`],
      ["NODE", "Node.js", `${DEVICON}/nodejs/nodejs-original.svg`],
      ["FAST", "Fastify", `${DEVICON}/fastify/fastify-original.svg`],
      ["PG", "PostgreSQL", `${DEVICON}/postgresql/postgresql-original.svg`],
      ["DOCKER", "Docker", `${DEVICON}/docker/docker-original.svg`],
      ["GIT", "Git y GitHub", `${DEVICON}/github/github-original.svg`],
      ["GHA", "GitHub Actions", `${DEVICON}/githubactions/githubactions-original.svg`],
      ["CQL", "CodeQL", pictogram("code")],
      ["GL", "Gitleaks", pictogram("secret")],
      ["TRIVY", "Trivy", pictogram("scan")],
      ["SBOM", "SBOM / CycloneDX", pictogram("document")],
    ],
  },
  {
    title: "Operaciones, redes y laboratorios",
    description: "Experiencia profesional en soporte y telecomunicaciones, más práctica técnica en entornos autorizados.",
    accent: ["#0f766e", "#2563eb"],
    skills: [
      ["WIN", "Windows", `${DEVICON}/windows8/windows8-original.svg`],
      ["TCP", "TCP/IP", pictogram("network")],
      ["DNS", "DNS", pictogram("globe")],
      ["TELCO", "xDSL, HFC, FTTH, CATV y 4G/5G", pictogram("radio")],
      ["INC", "Gestión de incidentes", pictogram("alert")],
      ["SLA", "SLA, documentación y escalamiento", pictogram("clock")],
      ["NMAP", "Nmap", nmapLogo],
      ["BURP", "Burp Suite", burpLogo],
      ["MSF", "Metasploit — nivel inicial", pictogram("target")],
      ["NC", "Netcat", pictogram("terminal")],
      ["SSL", "OpenSSL", opensslLogo],
      ["MITRE", "MITRE ATT&CK", mitreLogo],
      ["ISO", "ISO 27001 — formación aplicada", isoLogo],
      ["NIST", "NIST — formación aplicada", nistLogo],
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
      overflow: hidden;
      border: 1px solid rgba(186, 230, 253, .68);
      border-radius: inherit;
      background:
        radial-gradient(circle at 32% 24%, rgba(255, 255, 255, .98), rgba(241, 245, 249, .94) 58%, rgba(203, 213, 225, .92));
      box-shadow:
        0 11px 24px rgba(2, 132, 199, .22),
        inset 0 1px 0 rgba(255, 255, 255, .88);
      transition: transform .16s ease, filter .16s ease, box-shadow .16s ease;
      user-select: none;
    }

    .skill-bubble__logo {
      width: 68%;
      height: 68%;
      object-fit: contain;
      filter: drop-shadow(0 2px 3px rgba(15, 23, 42, .16));
      pointer-events: none;
    }

    .skill-bubble__fallback {
      color: #0f172a;
      font-size: .68rem;
      font-weight: 900;
      letter-spacing: .02em;
      text-align: center;
      pointer-events: none;
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

  const bubbles = group.skills.map(([shortName, fullName, iconSrc], index) => {
    const diameter = shortName.length >= 6 ? 68 : shortName.length >= 4 ? 62 : 58;
    const bubble = document.createElement("button");
    bubble.type = "button";
    bubble.className = "skill-bubble";
    bubble.style.width = `${diameter}px`;
    bubble.style.height = `${diameter}px`;
    bubble.style.setProperty("--skill-accent", group.accent[0]);
    bubble.setAttribute("aria-label", fullName);
    bubble.title = fullName;

    const inner = document.createElement("span");
    inner.className = "skill-bubble__inner";

    const image = document.createElement("img");
    image.className = "skill-bubble__logo";
    image.src = iconSrc;
    image.alt = "";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";

    const fallback = document.createElement("span");
    fallback.className = "skill-bubble__fallback";
    fallback.textContent = shortName;
    fallback.hidden = true;

    image.addEventListener("error", () => {
      image.hidden = true;
      fallback.hidden = false;
    });

    inner.append(image, fallback);
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
    "Tecnologías y prácticas que puedo respaldar con experiencia profesional, proyectos propios o laboratorios autorizados. Cada bloque indica el contexto real de uso.";

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
