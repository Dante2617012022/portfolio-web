const setText = (element, value) => {
  if (!element) return;
  if (element.textContent.trim() !== value) element.textContent = value;
};

const setLinkLabel = (link, value) => {
  if (!link) return;
  const label = link.querySelector("span.block") || link;
  setText(label, value);
};

const replaceList = (list, values) => {
  if (!list) return;
  const items = list.querySelectorAll("li");
  values.forEach((value, index) => {
    const item = items[index];
    if (!item) return;
    const textNode = item.querySelector("span:last-child") || item;
    setText(textNode, value);
  });
};

const updateHero = () => {
  const hero = document.querySelector("#home");
  if (!hero) return;

  setText(
    hero.querySelector(".space-y-6 > p"),
    "Ciberseguridad | SOC Jr. | AppSec y DevSecOps Jr.",
  );
};

const updateProfile = () => {
  const section = document.querySelector("#about");
  if (!section) return;

  const paragraphs = section.querySelectorAll(".max-w-prose > p");
  setText(
    paragraphs[0],
    "Profesional con más de cinco años y medio de experiencia en soporte técnico y gestión de incidentes para telecomunicaciones y servicios críticos. Experiencia en diagnóstico remoto, documentación, priorización por criticidad, cumplimiento de SLA y escalamiento a niveles especializados.",
  );
  setText(
    paragraphs[1],
    "Finalizando la Tecnicatura Universitaria en Ciberseguridad, con dos exámenes finales pendientes. Orientado a oportunidades junior en SOC, AppSec y DevSecOps, combinando experiencia operativa, redes y Linux Debian con desarrollo seguro, automatización de controles, CI/CD y respuesta inicial ante incidentes.",
  );
};

const findFloatingLogoWrapper = (image, section) => {
  let node = image.parentElement;

  while (node && node !== section) {
    if (window.getComputedStyle(node).position === "absolute") return node;
    node = node.parentElement;
  }

  return image.parentElement || image;
};

const hideUnsupportedSkillLogos = (section) => {
  const unsupportedTerms = [
    "wireshark",
    "apache",
    "aws.png",
    "gdpr",
    "python-original",
  ];

  section.querySelectorAll("img").forEach((image) => {
    const descriptor = `${image.alt || ""} ${image.title || ""} ${image.src || ""}`.toLowerCase();
    if (!unsupportedTerms.some((term) => descriptor.includes(term))) return;

    const wrapper = findFloatingLogoWrapper(image, section);
    wrapper.hidden = true;
    wrapper.setAttribute("aria-hidden", "true");
  });
};

const addVerifiedSkillsSummary = (section) => {
  if (section.querySelector("[data-verified-skills-summary]")) return;

  const groups = [
    {
      title: "Operación, desarrollo y automatización",
      values:
        "Linux Debian · Windows · VirtualBox · JavaScript · Node.js · Git/GitHub · Docker · GitHub Actions · SQLite · TCP/IP · DNS · DHCP · VPN · ADSL/VDSL · HFC · FTTH · CATV · 4G/5G",
    },
    {
      title: "AppSec y DevSecOps aplicados",
      values:
        "OWASP · APIs REST · IAM · OIDC · MFA · RBAC · CI/CD · CodeQL · Gitleaks · Trivy · SBOM · auditoría de dependencias · backups y rollback",
    },
    {
      title: "Seguridad técnica y laboratorios",
      values:
        "Nmap · OpenSSL · MITRE ATT&CK · ISO 27001 · NIST · Burp Suite · Hydra · VirusTotal · YARA · Metasploit inicial · Wazuh · Graylog · Snort · Suricata",
    },
  ];

  const summary = document.createElement("div");
  summary.dataset.verifiedSkillsSummary = "true";
  summary.className = "mt-8 grid gap-4 md:grid-cols-3 px-2";

  groups.forEach((group) => {
    const card = document.createElement("div");
    card.className =
      "rounded-2xl border border-white/10 bg-gray-800 p-5 text-left shadow-lg";

    const title = document.createElement("h4");
    title.className = "text-base font-bold text-white";
    title.textContent = group.title;

    const description = document.createElement("p");
    description.className = "mt-2 text-sm leading-relaxed text-white/80";
    description.textContent = group.values;

    card.append(title, description);
    summary.append(card);
  });

  const grid = section.querySelector(".mt-12.grid");
  grid?.insertAdjacentElement("afterend", summary);
};

const updateSkills = () => {
  const section = document.querySelector("#skills");
  if (!section) return;

  const headings = section.querySelectorAll("h3");
  setText(headings[0], "Uso práctico y operativo");
  setText(headings[1], "Desarrollo seguro y DevSecOps");
  setText(headings[2], "Seguridad técnica y laboratorios");

  hideUnsupportedSkillLogos(section);
  addVerifiedSkillsSummary(section);

  let note = section.querySelector("[data-content-level-note]");
  if (!note) {
    note = document.createElement("p");
    note.dataset.contentLevelNote = "true";
    note.className = "mt-8 text-center text-sm text-white/80 max-w-4xl mx-auto px-4";
    section.querySelector("[data-verified-skills-summary]")?.insertAdjacentElement("afterend", note);
  }

  setText(
    note,
    "Nivel declarado: prácticas DevSecOps aplicadas en proyectos propios mediante CI, análisis estático, detección de secretos, escaneo y SBOM; Nmap de uso práctico en entornos autorizados; Metasploit en nivel inicial; Wazuh, Graylog, Snort y Suricata utilizados en actividades académicas. No se afirma experiencia profesional consolidada en DevSecOps ni en operaciones SOC.",
  );
};

const updateExperience = () => {
  const section = document.querySelector("#experience");
  if (!section) return;

  const headings = section.querySelectorAll("h3");
  const camdisCard = headings[0]?.closest('div[class*="rounded-2xl"]');
  const cityTechCard = headings[1]?.closest('div[class*="rounded-2xl"]');

  if (camdisCard) {
    const header = camdisCard.querySelector("header");
    setText(headings[0], "Desarrollo seguro y automatización aplicada – Camdis");
    setText(
      header?.querySelector("p"),
      "Proyecto propio · Período: 2025 – Actualidad",
    );
    setText(
      header?.nextElementSibling,
      "Desarrollo de soluciones operativas para una PyME gastronómica, incorporando controles de AppSec, IAM, DevSecOps y continuidad desde el diseño.",
    );
    replaceList(camdisCard.querySelector("ul"), [
      "Plataforma privada de pedidos con separación de identidades, autorización backend, seguridad de sesiones, pruebas automatizadas y controles de cadena de suministro.",
      "Chatbot de pedidos con Node.js y controles de validación, rate limiting, gestión de secretos, pruebas y CI.",
    ]);

    const meta = camdisCard.querySelector("p.mt-5");
    if (meta) {
      meta.innerHTML =
        '<strong class="font-semibold text-slate-800">Tecnologías y enfoque:</strong> JavaScript · Node.js · Docker · GitHub Actions · AppSec · IAM · DevSecOps · gestión de riesgos y continuidad';
    }
  }

  if (cityTechCard) {
    const header = cityTechCard.querySelector("header");
    setText(
      headings[1],
      "Soporte técnico y gestión de incidentes – CityTech / Teleperformance",
    );
    setText(
      header?.querySelector("p"),
      "Soporte técnico en campañas de telecomunicaciones y servicios críticos · Período: 2019 – 2025",
    );
    setText(
      header?.nextElementSibling,
      "Más de cinco años y medio de diagnóstico remoto, registro, seguimiento y escalamiento de incidentes, con trabajo bajo métricas y SLA.",
    );
    replaceList(cityTechCard.querySelector("ul"), [
      "Soporte sobre ADSL/VDSL, HFC, FTTH, CATV y servicios móviles 4G/5G.",
      "Documentación de casos, priorización por criticidad, cumplimiento de SLA y coordinación con áreas de segundo nivel.",
      "Atención de campañas vinculadas a Arnet/Telecom, Cablevisión/Fibertel, Personal Hogares/Flow y Edenor.",
    ]);

    const meta = cityTechCard.querySelector("p.mt-5");
    if (meta) {
      meta.innerHTML =
        '<strong class="font-semibold text-slate-800">Herramientas y plataformas:</strong> Citrix · Salesforce · Oracle Siebel / Watchdog / CC&amp;B · Avaya · Microsoft Office · herramientas internas de monitoreo y gestión';
    }
  }
};

const updateEducation = () => {
  const section = document.querySelector("#education");
  const university = section?.querySelectorAll("article")[1];
  if (!university) return;

  setText(
    university.querySelector("h3"),
    "Tecnicatura Universitaria en Ciberseguridad",
  );
  setText(university.querySelector(".edu-badge"), "2024 – 2026");

  const institutionBlock = university.querySelector(".text-sm.text-slate-700");
  const institutionParagraphs = institutionBlock?.querySelectorAll("p");
  setText(institutionParagraphs?.[0], "Universidad del Gran Rosario (UGR)");
  setText(
    institutionParagraphs?.[1],
    "Finalización próxima · dos exámenes finales pendientes",
  );

  const achievements = university.querySelectorAll("ul li");
  setText(achievements[0], "Carrera oficial de 1.600 horas y validez nacional");
  setText(
    achievements[1],
    "Gestión de incidentes, vulnerabilidades, redes, desarrollo seguro, análisis forense y ciberdefensa",
  );
  setText(
    achievements[2],
    "Laboratorios autorizados con Nmap, Burp Suite, Hydra y Metasploit en nivel inicial",
  );
};

const updateProjects = () => {
  const section = document.querySelector("#projects");
  if (!section) return;

  const headings = section.querySelectorAll("h3");
  const firstCard = headings[0]?.closest('div[class*="group bg-white"]');
  const secondCard = headings[1]?.closest('div[class*="group bg-white"]');

  if (firstCard) {
    setText(headings[0], "Chatbot de pedidos con IA y controles de seguridad");
    setText(
      firstCard.querySelector("p"),
      "Node.js, WhatsApp/Baileys, SQLite y Mercado Pago. Incluye validación de entorno, HMAC para webhooks, rate limiting, sanitización, restricciones de IA, pruebas automatizadas, CI y CodeQL.",
    );
    const link = firstCard.querySelector("a");
    if (link) link.href = "https://github.com/Dante2617012022/chatbot-hamburgueseria-v3";
    setLinkLabel(link, "Ver proyecto principal");
  }

  if (secondCard) {
    setText(headings[1], "Seguridad aplicada y laboratorios académicos");
    setText(
      secondCard.querySelector("p"),
      "Camdis Digital Security Program en desarrollo: activos, accesos, riesgos, backups, continuidad e incidentes. Complementado con laboratorios autorizados de Nmap, Burp Suite, Hydra, YARA y Metasploit inicial.",
    );
    const link = secondCard.querySelector("a");
    if (link) link.href = "https://github.com/Dante2617012022/Actividades-UGR-Ciberseguridad";
    setLinkLabel(link, "Ver actividades académicas");
  }
};

const updateCertificate = () => {
  const section = document.querySelector("#certs");
  if (!section) return;
  const paragraphs = section.querySelectorAll("p");
  setText(
    paragraphs[1],
    "Auditoría de seguridad en entorno CTF autorizado, pentesting básico y hardening.",
  );
};

const updateNavigationAndFooter = () => {
  const homeLink = [...document.querySelectorAll('header a[href="#home"]')].find(
    (link) => link.textContent.trim() === "Home",
  );
  setText(homeLink, "Inicio");

  const footer = document.querySelector("footer");
  if (footer) {
    footer.textContent = `© ${new Date().getFullYear()} Dante Balbuena — Todos los derechos reservados.`;
  }
};

export const applyPortfolioContentUpdates = () => {
  updateHero();
  updateProfile();
  updateSkills();
  updateExperience();
  updateEducation();
  updateProjects();
  updateCertificate();
  updateNavigationAndFooter();
};

export const startPortfolioContentOverrides = () => {
  if (window.__portfolioContentOverridesStarted) return;
  window.__portfolioContentOverridesStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      applyPortfolioContentUpdates();
    });
  };

  const observer = new MutationObserver(scheduleUpdate);
  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  scheduleUpdate();
};
