import wazuhLogo from "./assets/logos/wazuh.png";
import graylogLogo from "./assets/logos/graylog.svg";
import snortLogo from "./assets/logos/snort.png";
import suricataLogo from "./assets/logos/suricata.jpg";
import yaraLogo from "./assets/logos/yara.webp";
import virustotalLogo from "./assets/logos/virustotal.svg";
import flaskLogo from "./assets/logos/flask.png";
import nmapLogo from "./assets/logos/nmap.jpeg";
import burpLogo from "./assets/logos/burpsuite.svg";
import opensslLogo from "./assets/logos/OpenSSL.png";
import virtualboxLogo from "./assets/logos/VirtualBox.png";
import mitreLogo from "./assets/logos/mitre-attack.png";
import owaspLogo from "./assets/logos/OWASP.png";
import isoLogo from "./assets/logos/ISO 27001.png";
import nistLogo from "./assets/logos/NIST-Logo.png";

const ENHANCEMENT_MARKER = "data-skills-logos-bounce-ready";

const svgIcon = (body, color = "#0f3b75") => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <g fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        ${body}
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const ICONS = {
  "Keycloak": svgIcon('<circle cx="34" cy="48" r="15"/><path d="M49 48h34M72 48v11M61 48v8"/><path d="M28 39V28a9 9 0 0 1 18 0v5"/>'),
  "OpenID Connect (OIDC)": svgIcon('<circle cx="48" cy="31" r="14"/><path d="M22 78c3-20 13-30 26-30s23 10 26 30"/><path d="M70 24h14M77 17v14"/>'),
  "OAuth 2.0": svgIcon('<circle cx="32" cy="48" r="15"/><path d="M47 48h35M70 48v12M59 48v9"/>'),
  "Authorization Code + PKCE S256": svgIcon('<path d="M48 10 78 21v22c0 20-12 34-30 43-18-9-30-23-30-43V21z"/><path d="m33 48 10 10 21-25"/>'),
  "JWT": svgIcon('<rect x="14" y="24" width="68" height="48" rx="9"/><path d="M27 39h42M27 51h28M27 63h18"/>'),
  "JWKS": svgIcon('<circle cx="31" cy="46" r="14"/><path d="M44 46h35M68 46v12M57 46v9"/><circle cx="68" cy="23" r="7"/>'),
  "RBAC y mínimo privilegio": svgIcon('<circle cx="36" cy="31" r="11"/><circle cx="64" cy="35" r="9"/><path d="M16 76c3-17 11-25 20-25s18 8 21 25M56 54c13 0 21 7 24 22"/><path d="M74 14 84 19v9c0 8-4 14-10 18-6-4-10-10-10-18v-9z"/>'),
  "MFA": svgIcon('<rect x="28" y="10" width="40" height="76" rx="8"/><path d="M40 22h16M43 72h10"/><path d="m38 51 8 8 16-21"/>'),
  "Protección CSRF": svgIcon('<path d="M48 10 78 21v22c0 20-12 34-30 43-18-9-30-23-30-43V21z"/><path d="M33 49h30M48 34v30"/>'),
  "Autorización server-side": svgIcon('<rect x="15" y="18" width="66" height="54" rx="8"/><path d="M15 33h66M28 50h19"/><rect x="55" y="45" width="16" height="17" rx="3"/><path d="M59 45v-5a4 4 0 0 1 8 0v5"/>'),
  "HMAC-SHA256 para webhooks": svgIcon('<path d="M16 24h64v48H16z"/><path d="M24 37h30M24 49h22M24 61h14"/><path d="m59 59 6 6 14-17"/>'),
  "OWASP y desarrollo seguro": owaspLogo,

  "Linux Debian": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Fastify: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Git y GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  CodeQL: svgIcon('<path d="m28 27-14 21 14 21M68 27l14 21-14 21M59 18 37 78"/><circle cx="73" cy="72" r="11"/><path d="m81 80 9 9"/>'),
  Gitleaks: svgIcon('<path d="M20 20h56v56H20z"/><path d="M31 35h34M31 47h24"/><circle cx="61" cy="61" r="8"/><path d="M61 53V43M61 69v9"/>'),
  Trivy: svgIcon('<path d="M14 24h68M22 24l7 52h38l7-52M35 38h26M39 51h18M42 64h12"/><circle cx="48" cy="15" r="7"/>'),
  "SBOM / CycloneDX": svgIcon('<path d="M24 12h34l14 14v58H24z"/><path d="M58 12v18h18M34 44h28M34 56h28M34 68h20"/>'),

  Windows: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg",
  "TCP/IP": svgIcon('<circle cx="22" cy="48" r="10"/><circle cx="74" cy="22" r="10"/><circle cx="74" cy="74" r="10"/><path d="M31 43 64 27M31 53l33 16"/>'),
  DNS: svgIcon('<circle cx="48" cy="48" r="32"/><path d="M16 48h64M48 16c12 10 18 21 18 32S60 70 48 80M48 16C36 26 30 37 30 48s6 22 18 32"/>'),
  "xDSL, HFC, FTTH, CATV y 4G/5G": svgIcon('<path d="M48 82V50M38 82h20M32 50a23 23 0 0 1 32 0M22 40a37 37 0 0 1 52 0M13 30a50 50 0 0 1 70 0"/><circle cx="48" cy="42" r="5"/>'),
  "Gestión de incidentes": svgIcon('<path d="M48 12 84 78H12z"/><path d="M48 34v20M48 66h.1"/>'),
  "SLA, documentación y escalamiento": svgIcon('<circle cx="40" cy="44" r="25"/><path d="M40 29v16l11 7M64 63l8 8 14-17"/>'),
  Nmap: nmapLogo,
  "Burp Suite": burpLogo,
  "Metasploit — nivel inicial": "https://cdn.simpleicons.org/metasploit/2596CD",
  Netcat: svgIcon('<rect x="14" y="19" width="68" height="58" rx="7"/><path d="m26 36 12 11-12 11M45 60h22"/>'),
  OpenSSL: opensslLogo,
  "MITRE ATT&CK": mitreLogo,
  "ISO 27001 y NIST — formación aplicada": isoLogo,
  "ISO 27001 — formación aplicada": isoLogo,
  "NIST — formación aplicada": nistLogo,

  VirtualBox: virtualboxLogo,
  DHCP: svgIcon('<rect x="14" y="18" width="32" height="46" rx="6"/><path d="M24 30h12M24 42h12M24 54h12M46 40h14M60 28v24M60 28h18M60 52h18"/><circle cx="78" cy="28" r="5"/><circle cx="78" cy="52" r="5"/>'),
  VPN: svgIcon('<path d="M48 12 76 23v21c0 19-11 32-28 40-17-8-28-21-28-40V23z"/><rect x="35" y="43" width="26" height="22" rx="5"/><path d="M41 43v-7a7 7 0 0 1 14 0v7"/>'),
  "ADSL / VDSL": svgIcon('<path d="M12 68h72M18 58c15-18 27-18 42 0 9 11 16 11 24 0M18 42c14-16 25-16 39 0 10 12 18 12 27 0"/>'),
  "Redes HFC": svgIcon('<path d="M15 48h25M56 48h25"/><circle cx="48" cy="48" r="8"/><path d="M25 30v36M71 30v36"/>'),
  "Redes FTTH": svgIcon('<path d="M12 48h34M50 48h34"/><circle cx="48" cy="48" r="7"/><path d="m48 14 5 15 15-5-11 12 14 8-16 1 3 16-10-13-10 13 3-16-16-1 14-8-11-12 15 5z"/>'),
  CATV: svgIcon('<rect x="16" y="24" width="64" height="44" rx="7"/><path d="M38 80h20M48 68v12M34 15l14 9 14-9"/>'),
  "Redes móviles 4G / 5G": svgIcon('<path d="M48 78V48M38 78h20M32 48a23 23 0 0 1 32 0M22 38a37 37 0 0 1 52 0M13 28a50 50 0 0 1 70 0"/><circle cx="48" cy="40" r="5"/>'),
  "Nmap — uso práctico": nmapLogo,
  VirusTotal: virustotalLogo,
  YARA: yaraLogo,
  OWASP: owaspLogo,
  "ISO 27001": isoLogo,
  NIST: nistLogo,
  "Wazuh — formación académica": wazuhLogo,
  "Graylog — formación académica": graylogLogo,
  "Snort — formación académica": snortLogo,
  "Suricata — formación académica": suricataLogo,
  "APIs REST": svgIcon('<path d="m30 26-18 22 18 22M66 26l18 22-18 22M56 18 40 78"/>'),
  SQLite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "MySQL / MariaDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Python básico": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Flask: flaskLogo,
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "HTML y CSS": svgIcon('<path d="M17 18h62l-6 60-25 7-25-7z"/><path d="M30 34h36l-2 12H39l1 9h23l-2 13-13 4-13-4-1-8"/>'),
  "Automatización con Baileys": "https://cdn.simpleicons.org/whatsapp/25D366",
}

const addStyles = () => {
  if (document.querySelector("style[data-skills-logos-bounce-styles]")) return;

  const style = document.createElement("style");
  style.dataset.skillsLogosBounceStyles = "true";
  style.textContent = `
    .skill-bubble {
      cursor: pointer !important;
    }

    .skill-bubble__inner {
      overflow: hidden;
    }

    .skill-bubble__logo-shell {
      display: grid;
      width: 72%;
      height: 72%;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, .76);
      border-radius: 999px;
      background: rgba(255, 255, 255, .94);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .95), 0 5px 13px rgba(2, 6, 23, .22);
    }

    .skill-bubble__logo {
      display: block;
      width: 70%;
      height: 70%;
      object-fit: contain;
    }

    .skill-bubble__logo-fallback {
      color: #0f3b75;
      font-size: .67rem;
      font-weight: 900;
      letter-spacing: .02em;
      line-height: 1;
      text-align: center;
      text-shadow: none;
    }

    .skill-bubble[data-clicked="true"] .skill-bubble__inner {
      filter: brightness(1.2) saturate(1.12);
      box-shadow:
        0 18px 38px rgba(56, 189, 248, .38),
        0 0 0 4px rgba(125, 211, 252, .3),
        inset 0 1px 0 rgba(255, 255, 255, .3);
    }
  `;
  document.head.append(style);
};

const animateBounce = (bubble) => {
  const inner = bubble.querySelector(".skill-bubble__inner");
  if (!inner) return;

  bubble.dataset.clicked = "true";
  inner.getAnimations().forEach((animation) => animation.cancel());
  inner.animate(
    [
      { transform: "translateY(0) scale(1, 1)" },
      { transform: "translateY(7px) scale(.86, 1.14)", offset: 0.2 },
      { transform: "translateY(-16px) scale(1.12, .9)", offset: 0.48 },
      { transform: "translateY(3px) scale(.96, 1.05)", offset: 0.76 },
      { transform: "translateY(0) scale(1, 1)" },
    ],
    {
      duration: 560,
      easing: "cubic-bezier(.2,.85,.25,1)",
    },
  ).finished.finally(() => {
    delete bubble.dataset.clicked;
  });
};

const addLogo = (bubble) => {
  if (bubble.dataset.logoReady === "true") return;

  const label = bubble.getAttribute("aria-label") || bubble.title || "Tecnología";
  const inner = bubble.querySelector(".skill-bubble__inner");
  const icon = ICONS[label];
  if (!inner || !icon) return;

  const fallbackText = inner.textContent.trim();
  inner.textContent = "";

  const shell = document.createElement("span");
  shell.className = "skill-bubble__logo-shell";

  const image = document.createElement("img");
  image.className = "skill-bubble__logo";
  image.src = icon;
  image.alt = "";
  image.decoding = "async";
  image.draggable = false;

  image.addEventListener("error", () => {
    shell.textContent = fallbackText;
    shell.classList.add("skill-bubble__logo-fallback");
  }, { once: true });

  shell.append(image);
  inner.append(shell);
  bubble.dataset.logoReady = "true";

  bubble.addEventListener("click", () => {
    animateBounce(bubble);

    const arena = bubble.closest(".skills-overhaul__arena");
    if (arena) {
      arena.dispatchEvent(new MouseEvent("click", { bubbles: false }));
    }
  });

  bubble.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    animateBounce(bubble);
  });
};

const enhanceSkills = () => {
  const section = document.querySelector("#skills");
  const overhaul = section?.querySelector("[data-skills-overhaul]");
  if (!section || !overhaul) return;

  addStyles();
  overhaul.querySelectorAll(".skill-bubble").forEach(addLogo);
  overhaul.querySelectorAll(".skills-overhaul__hint").forEach((hint) => {
    hint.textContent = "Pasá el mouse para ver el nombre y hacé clic para impulsar las burbujas";
  });
  section.setAttribute(ENHANCEMENT_MARKER, "true");
};

export const startSkillsInteractions = () => {
  if (window.__portfolioSkillsInteractionsStarted) return;
  window.__portfolioSkillsInteractionsStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;

    window.requestAnimationFrame(() => {
      scheduled = false;
      enhanceSkills();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
