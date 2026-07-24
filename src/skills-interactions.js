import wazuhLogo from "./assets/logos/wazuh.png";
import graylogLogo from "./assets/logos/graylog.svg";
import snortLogo from "./assets/logos/snort.png";
import suricataLogo from "./assets/logos/suricata.jpg";
import yaraLogo from "./assets/logos/yara.webp";
import virustotalLogo from "./assets/logos/virustotal.svg";
import flaskLogo from "./assets/logos/flask.png";
import nmapLogo from "./assets/logos/nmap.jpeg";
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
  "Linux Debian": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg",
  Windows: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg",
  VirtualBox: virtualboxLogo,
  "TCP/IP": svgIcon('<circle cx="22" cy="48" r="10"/><circle cx="74" cy="22" r="10"/><circle cx="74" cy="74" r="10"/><path d="M31 43 64 27M31 53l33 16"/>'),
  DNS: svgIcon('<circle cx="48" cy="48" r="32"/><path d="M16 48h64M48 16c12 10 18 21 18 32S60 70 48 80M48 16C36 26 30 37 30 48s6 22 18 32"/>'),
  DHCP: svgIcon('<rect x="14" y="18" width="32" height="46" rx="6"/><path d="M24 30h12M24 42h12M24 54h12M46 40h14M60 28v24M60 28h18M60 52h18"/><circle cx="78" cy="28" r="5"/><circle cx="78" cy="52" r="5"/>'),
  VPN: svgIcon('<path d="M48 12 76 23v21c0 19-11 32-28 40-17-8-28-21-28-40V23z"/><rect x="35" y="43" width="26" height="22" rx="5"/><path d="M41 43v-7a7 7 0 0 1 14 0v7"/>'),
  "ADSL / VDSL": svgIcon('<path d="M12 68h72M18 58c15-18 27-18 42 0 9 11 16 11 24 0M18 42c14-16 25-16 39 0 10 12 18 12 27 0"/>'),
  "Redes HFC": svgIcon('<path d="M15 48h25M56 48h25"/><circle cx="48" cy="48" r="8"/><path d="M25 30v36M71 30v36"/>'),
  "Redes FTTH": svgIcon('<path d="M12 48h34M50 48h34"/><circle cx="48" cy="48" r="7"/><path d="m48 14 5 15 15-5-11 12 14 8-16 1 3 16-10-13-10 13 3-16-16-1 14-8-11-12 15 5z"/>'),
  CATV: svgIcon('<rect x="16" y="24" width="64" height="44" rx="7"/><path d="M38 80h20M48 68v12M34 15l14 9 14-9"/>'),
  "Redes móviles 4G / 5G": svgIcon('<path d="M48 78V48M38 78h20M32 48a23 23 0 0 1 32 0M22 38a37 37 0 0 1 52 0M13 28a50 50 0 0 1 70 0"/><circle cx="48" cy="40" r="5"/>'),
  "Gestión de incidentes": svgIcon('<path d="M48 12 84 78H12z"/><path d="M48 34v20M48 66h.1"/>'),
  "SLA, documentación y escalamiento": svgIcon('<circle cx="40" cy="44" r="25"/><path d="M40 29v16l11 7M64 63l8 8 14-17"/>'),
  "Nmap — uso práctico": nmapLogo,
  OpenSSL: opensslLogo,
  VirusTotal: virustotalLogo,
  YARA: yaraLogo,
  "Metasploit — nivel inicial": "https://cdn.simpleicons.org/metasploit/2596CD",
  "MITRE ATT&CK": mitreLogo,
  OWASP: owaspLogo,
  "ISO 27001": isoLogo,
  NIST: nistLogo,
  "Wazuh — formación académica": wazuhLogo,
  "Graylog — formación académica": graylogLogo,
  "Snort — formación académica": snortLogo,
  "Suricata — formación académica": suricataLogo,
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Git y GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "APIs REST": svgIcon('<path d="m30 26-18 22 18 22M66 26l18 22-18 22M56 18 40 78"/>'),
  SQLite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "MySQL / MariaDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Python básico": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Flask: flaskLogo,
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "HTML y CSS": svgIcon('<path d="M17 18h62l-6 60-25 7-25-7z"/><path d="M30 34h36l-2 12H39l1 9h23l-2 13-13 4-13-4-1-8"/>'),
  "Automatización con Baileys": "https://cdn.simpleicons.org/whatsapp/25D366",
};

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
