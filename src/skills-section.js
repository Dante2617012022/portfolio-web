import { createBubbleArena, createTooltip } from "./skills-bubbles.js";

const GROUPS = [
  {
    accent: ["#2563eb", "#0891b2"],
    bubbles: [["WAZUH", "Wazuh (SIEM)"], ["IDS", "Suricata / EVE JSON"], ["LOGS", "Análisis de logs y triage"], ["FIM", "FIM e integridad de archivos"], ["MITRE", "Contexto MITRE ATT&CK"], ["FW", "nftables y respuesta acotada"], ["YARA", "YARA y consulta de hashes en VirusTotal"]],
    title: "Monitoreo y análisis de alertas",
    context: "Laboratorio propio · práctica actual",
    description: "Revisión de telemetría, contexto y evidencia antes de decidir una respuesta.",
    skills: ["Wazuh (SIEM)", "Suricata / EVE JSON", "Análisis de logs y triage", "FIM e integridad de archivos", "Contexto MITRE ATT&CK", "nftables y respuesta acotada", "YARA y consulta de hashes en VirusTotal"],
    href: "https://github.com/Dante2617012022/mini-soc-lab",
    label: "Ver casos de detección",
  },
  {
    accent: ["#0f766e", "#2563eb"],
    bubbles: [["TICKET", "Tickets, seguimiento y escalamiento"], ["SLA", "SLA y documentación"], ["FTTH", "FTTH, HFC, xDSL y ONT/CPE"], ["TCP/IP", "TCP/IP, DNS y diagnóstico"], ["LINUX", "Linux Debian/Ubuntu, SSH y NAT"], ["VBOX", "VirtualBox"], ["CRM", "Salesforce, Oracle/Siebel y Citrix"]],
    title: "Operaciones, redes y sistemas",
    context: "Soporte profesional y práctica de Linux",
    description: "Más de cinco años en telecomunicaciones; Linux y virtualización en proyectos y laboratorio.",
    skills: ["Tickets, seguimiento y escalamiento", "SLA y documentación", "FTTH, HFC, xDSL y ONT/CPE", "TCP/IP, DNS y diagnóstico", "Linux Debian/Ubuntu, SSH y NAT", "VirtualBox", "Salesforce, Oracle/Siebel y Citrix"],
  },
  {
    accent: ["#4f46e5", "#0284c7"],
    bubbles: [["RBAC", "Autorización por roles y pruebas negativas"], ["MFA", "Keycloak, OIDC y MFA en piloto"], ["API", "Seguridad de sesiones y APIs REST"], ["GIT", "Git/GitHub y GitHub Actions"], ["DOCKER", "Docker Compose y PostgreSQL"], ["PY/JS", "Python y JavaScript básicos"], ["UAT", "Pruebas de aceptación y documentación"]],
    title: "Seguridad aplicada en proyectos",
    context: "Muestras públicas · beta interna y piloto",
    description: "Validación de permisos, sesiones e integridad en proyectos propios de Camdis.",
    skills: ["Autorización por roles y pruebas negativas", "Keycloak, OIDC y MFA en piloto", "Seguridad de sesiones y APIs REST", "Git/GitHub y GitHub Actions", "Docker Compose y PostgreSQL", "Python y JavaScript básicos", "Pruebas de aceptación y documentación"],
    href: "https://github.com/Dante2617012022/camdis-erp-case-study",
    label: "Ver muestras y límites",
  },
];

export const startSkillsOverhaul = () => {
  const root = document.getElementById("root");
  if (!root) return;
  const apply = () => {
    const section = document.getElementById("skills");
    if (!section || section.dataset.skillsOverhaulReady) return;
    section.dataset.skillsOverhaulReady = "true";
    section.replaceChildren();
    const style = document.createElement("style");
    style.textContent = `
      #skills { background:#0f172a; color:#f8fafc; padding:4rem 0; }
      [data-skills-overhaul] { width:min(1152px,calc(100% - 2rem)); margin:auto; }
      .skills-heading { text-align:center; font-size:clamp(1.8rem,4vw,2.5rem); font-weight:800; }
      .skills-intro { max-width:760px; margin:1rem auto 2rem; color:#cbd5e1; text-align:center; line-height:1.7; }
      .skills-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1.25rem; }
      .skills-card { min-width:0; padding:1.5rem; border:1px solid #475569; border-radius:1.25rem; background:#1e293b; }
      .skills-card h3 { color:#fff; font-size:1.15rem; font-weight:800; line-height:1.4; }
      .skills-context { color:#7dd3fc; font-size:.82rem; margin:.6rem 0; font-weight:600; }
      .skills-card p { line-height:1.65; }
      .skills-description { color:#cbd5e1; }
      .skills-card ul { margin:1.2rem 0; padding-left:1.15rem; list-style:disc; }
      .skills-card li { margin:.6rem 0; line-height:1.5; overflow-wrap:anywhere; }
      .skills-card a { display:inline-block; color:#bae6fd; text-decoration:underline; font-weight:600; }
      .skills-card .skills-overhaul__arena { height:290px; margin:1.2rem -1rem .5rem; border-radius:1rem; }
      .skills-motion-toggle { display:block; margin:.5rem 0; padding:.5rem .7rem; color:#bae6fd; background:#0f172a; border:1px solid #64748b; font-size:.8rem; }
      .skills-motion-toggle:disabled { opacity:.65; cursor:default; }
      .skills-motion-toggle:focus-visible { outline:3px solid #7dd3fc; outline-offset:3px; }
      .skills-card a:focus-visible { outline:3px solid #7dd3fc; outline-offset:5px; }
      @media(max-width:800px) { .skills-grid { grid-template-columns:1fr; } }
    `;
    const shell = document.createElement("div");
    shell.dataset.skillsOverhaul = "true";
    const heading = document.createElement("h2");
    heading.className = "skills-heading";
    heading.textContent = "Habilidades técnicas";
    const intro = document.createElement("p");
    intro.className = "skills-intro";
    intro.textContent = "Experiencia laboral, laboratorio y proyectos propios, con el contexto de uso indicado en cada bloque.";
    const grid = document.createElement("div");
    grid.className = "skills-grid";
    const tooltip = createTooltip();
    GROUPS.forEach(group => {
      const card = document.createElement("article");
      card.className = "skills-card";
      const title = document.createElement("h3");
      title.textContent = group.title;
      const context = document.createElement("p");
      context.className = "skills-context";
      context.textContent = group.context;
      const description = document.createElement("p");
      description.className = "skills-description";
      description.textContent = group.description;
      const list = document.createElement("ul");
      group.skills.forEach(skill => {
        const item = document.createElement("li");
        item.textContent = skill;
        list.append(item);
      });
      const arena = createBubbleArena(group, tooltip);
      const hint = document.createElement("p");
      hint.className = "skills-context";
      hint.textContent = "Tocá una burbuja para hacer rebotar el grupo. Los nombres están debajo.";
      card.append(title, context, description, arena, arena.motionToggle, hint, list);
      if (group.href) {
        const link = document.createElement("a");
        link.href = group.href;
        link.textContent = group.label;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.append(link);
      }
      grid.append(card);
    });
    shell.append(heading, intro, grid);
    section.append(style, shell);
    observer.disconnect();
  };
  const observer = new MutationObserver(apply);
  observer.observe(root, { childList:true, subtree:true });
  apply();
};
