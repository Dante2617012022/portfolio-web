import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PROFILE = {
  name: "Dante Gabriel Balbuena Atar",
  role: "Analista SOC Jr. | Gestión de Incidentes | Telecomunicaciones",
  location: "Tafí Viejo, Tucumán, Argentina",
  email: "dantebalbuenaatar@gmail.com",
  phone: "+54 381 665-4021",
  github: "https://github.com/Dante2617012022",
};

const navigation = [
  { href: "#perfil", label: "Perfil" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#formacion", label: "Formación" },
  { href: "#contacto", label: "Contacto" },
];

const skillGroups = [
  {
    title: "Operaciones y SOC",
    description:
      "Competencias transferibles desde operaciones técnicas hacia monitoreo y respuesta de seguridad.",
    items: [
      "Gestión de incidentes",
      "Triage inicial",
      "Documentación y escalamiento",
      "SLA y criticidad",
      "Análisis básico de eventos",
      "Respuesta inicial",
      "MITRE ATT&CK",
      "OWASP",
      "ISO 27001",
      "NIST",
    ],
  },
  {
    title: "Sistemas, redes y telecomunicaciones",
    description:
      "Base operativa construida en soporte de servicios de conectividad y entornos de usuario.",
    items: [
      "Linux Debian",
      "Windows",
      "VirtualBox",
      "TCP/IP",
      "DNS",
      "DHCP",
      "VPN",
      "ADSL/VDSL",
      "HFC",
      "FTTH",
      "CATV",
      "4G/5G",
    ],
  },
  {
    title: "Laboratorios autorizados",
    description:
      "Herramientas utilizadas en prácticas académicas, con el nivel indicado de forma transparente.",
    items: [
      "Nmap · uso práctico",
      "Wireshark",
      "Burp Suite",
      "Hydra",
      "OpenSSL",
      "VirusTotal",
      "YARA",
      "Metasploit · nivel inicial",
      "Wazuh · académico",
      "Graylog · académico",
      "Snort · académico",
      "Suricata · académico",
    ],
  },
  {
    title: "Desarrollo y automatización",
    description:
      "Capacidad para entender aplicaciones, automatizar procesos y conversar con equipos de desarrollo.",
    items: [
      "JavaScript",
      "Node.js",
      "Python básico",
      "Git/GitHub",
      "APIs REST",
      "SQLite",
      "MySQL/MariaDB",
      "Flask",
      "FastAPI",
      "HTML/CSS",
    ],
  },
  {
    title: "Herramientas corporativas",
    description:
      "Experiencia diaria en plataformas de atención, gestión de casos y operación empresarial.",
    items: [
      "Citrix",
      "Salesforce",
      "Oracle Siebel",
      "Watchdog",
      "Oracle CC&B",
      "Avaya",
    ],
  },
];

const experiences = [
  {
    company: "Camdis",
    role: "Tecnología, Automatización y Ciberseguridad",
    period: "2025 – Actualidad",
    summary:
      "Diseño y coordinación inicial de iniciativas tecnológicas para una PyME gastronómica en crecimiento.",
    bullets: [
      "Desarrollo y mejora de automatizaciones con JavaScript y Node.js para procesos operativos.",
      "Documentación de procesos críticos, riesgos, activos tecnológicos y necesidades de soporte.",
      "Diseño del Camdis Digital Security Program, un plan director de tecnología y ciberseguridad actualmente en desarrollo.",
    ],
  },
  {
    company: "CityTech / Teleperformance",
    role: "Soporte Técnico, Comercial y Gestión de Incidentes",
    period: "2019 – 2025",
    summary:
      "Casi siete años de operación en campañas de telecomunicaciones, servicios digitales y servicios críticos.",
    bullets: [
      "Diagnóstico y resolución remota de incidentes en ADSL, VDSL, HFC, FTTH, telefonía fija, televisión y servicios móviles.",
      "Registro, seguimiento, documentación y escalamiento de casos conforme a criticidad, procedimientos y SLA.",
      "Trabajo bajo métricas de calidad, productividad, tiempos de atención y satisfacción del cliente.",
      "Campañas atendidas: Arnet, Telecom, Cablevisión/Fibertel, Personal Hogares, Flow, telefonía móvil y Edenor.",
    ],
  },
];

const projects = [
  {
    title: "Chatbot de pedidos con IA y controles de seguridad",
    status: "Proyecto propio · público",
    description:
      "Aplicación modular para automatizar pedidos por WhatsApp, integrando catálogo, pagos y asistencia controlada con IA.",
    highlights: [
      "Node.js, WhatsApp/Baileys y SQLite",
      "Gestión de secretos y validación de entorno",
      "Sanitización, límites de entrada y rate limiting",
      "Validación HMAC de webhooks",
      "Restricciones de IA y pruebas automatizadas",
      "CI, CodeQL, Dependabot y política de seguridad",
    ],
    href: "https://github.com/Dante2617012022/chatbot-hamburgueseria-v3",
    linkLabel: "Ver repositorio",
  },
  {
    title: "Camdis Digital Security Program",
    status: "Proyecto aplicado · en desarrollo",
    description:
      "Plan director basado en riesgo para ordenar la tecnología y construir capacidades de seguridad sostenibles en una PyME real.",
    highlights: [
      "Inventario de activos, cuentas y responsables",
      "Gestión de accesos, backups y continuidad",
      "Registro y respuesta ante incidentes",
      "Políticas, indicadores y roadmap por fases",
      "Arquitectura objetivo y futura capacidad de monitoreo",
      "La documentación completa permanece confidencial",
    ],
  },
  {
    title: "Laboratorios de ciberseguridad",
    status: "Académico · entornos autorizados",
    description:
      "Prácticas universitarias orientadas a comprender vulnerabilidades, evidencias, controles y respuesta defensiva.",
    highlights: [
      "Reconocimiento y enumeración con Nmap",
      "Análisis de tráfico y eventos",
      "Hacking ético y Metasploit en nivel inicial",
      "Análisis forense e investigación digital",
      "Matrices de riesgo, informes y mitigaciones",
      "Evidencias completas disponibles para entrevista",
    ],
  },
];

const education = [
  {
    title: "Tecnicatura Universitaria en Ciberseguridad",
    institution: "Universidad del Gran Rosario",
    period: "2024 – 2026",
    details: [
      "Finalización próxima: dos exámenes finales pendientes.",
      "Promedio académico igual o superior a 8.",
      "Plan de estudios de 1.600 horas con reconocimiento oficial y validez nacional.",
      "Formación en incidentes, vulnerabilidades, hacking ético, criptografía, cloud, análisis forense y ciberdefensa.",
    ],
  },
  {
    title: "Economía y Gestión de las Organizaciones",
    institution: "Colegio Gral. Don José de San Martín",
    period: "Egreso 2014",
    details: ["Formación secundaria con orientación administrativa y organizacional."],
  },
];

function Container({ children, className = "" }) {
  return <div className={`w-full max-w-6xl mx-auto px-5 sm:px-6 ${className}`}>{children}</div>;
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-bold uppercase tracking-widest ${light ? "text-blue-200" : "text-blue-700"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight ${light ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-gray-300" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Tag({ children, dark = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold border ${
        dark
          ? "border-white border-opacity-20 bg-white bg-opacity-10 text-gray-100"
          : "border-blue-100 bg-blue-50 text-blue-800"
      }`}
    >
      {children}
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-800 bg-gray-900 text-white shadow-lg">
      <Container className="flex h-16 items-center justify-between">
        <a href="#inicio" className="font-extrabold tracking-wider text-white" aria-label="Ir al inicio">
          DANTE BALBUENA
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-gray-200 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-white"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Abrir o cerrar navegación"
        >
          <span aria-hidden className="text-xl">☰</span>
        </button>
      </Container>

      {open && (
        <nav id="mobile-navigation" className="border-t border-gray-800 bg-gray-900 md:hidden" aria-label="Navegación móvil">
          <Container className="grid gap-1 py-3">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-200 hover:bg-gray-800 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gray-900 pt-16 text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-700 opacity-20 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-indigo-700 opacity-20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-80" />
      </div>

      <Container className="relative py-20 sm:py-24 lg:py-32">
        <Reveal className="max-w-4xl">
          <Tag dark>Orientado a oportunidades SOC Tier 1</Tag>
          <p className="mt-7 text-lg font-semibold text-blue-200">Hola, soy</p>
          <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {PROFILE.name}
          </h1>
          <p className="mt-5 text-xl sm:text-2xl font-bold text-blue-100">{PROFILE.role}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
            Profesional de soporte y gestión de incidentes con casi siete años de experiencia en telecomunicaciones y
            servicios críticos. Estudiante avanzado de Ciberseguridad, con dos finales pendientes, y experiencia en
            automatización, documentación técnica y proyectos de seguridad aplicados.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#proyectos" className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white shadow-lg hover:bg-blue-500">
              Ver proyectos
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-gray-500 px-5 py-3 font-bold text-white hover:border-white hover:bg-white hover:bg-opacity-10"
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="rounded-lg border border-gray-500 px-5 py-3 font-bold text-white hover:border-white hover:bg-white hover:bg-opacity-10"
            >
              Contactar
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            ["Casi 7 años", "Operaciones y telecomunicaciones"],
            ["2 finales", "Para completar la Tecnicatura"],
            ["1.600 horas", "Plan universitario con validez nacional"],
          ].map(([value, label], index) => (
            <Reveal key={value} delay={index * 0.08} className="rounded-2xl border border-white border-opacity-10 bg-white bg-opacity-10 p-5 backdrop-blur">
              <p className="text-2xl font-extrabold text-white">{value}</p>
              <p className="mt-1 text-sm text-gray-300">{label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProfileSection() {
  return (
    <section id="perfil" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Perfil profesional"
          title="Una transición natural desde operaciones hacia seguridad"
          description="Mi diferencial no es una lista extensa de herramientas: es la combinación de experiencia operativa real, telecomunicaciones, gestión de incidentes, formación universitaria y proyectos técnicos aplicados."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Experiencia operativa",
              text: "Diagnóstico remoto, atención bajo presión, documentación, seguimiento, escalamiento y cumplimiento de SLA.",
            },
            {
              title: "Formación en ciberseguridad",
              text: "Incidentes, riesgos, vulnerabilidades, hacking ético, criptografía, cloud, análisis forense y ciberdefensa.",
            },
            {
              title: "Mentalidad orientada al negocio",
              text: "Seguridad proporcional al riesgo, continuidad operativa, documentación y mejoras que puedan mantenerse en el tiempo.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-xl font-extrabold text-gray-900">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-600">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experiencia" className="bg-gray-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Trayectoria"
          title="Experiencia profesional"
          description="Experiencia real en operación, atención de incidentes y soporte de servicios que requieren continuidad, trazabilidad y comunicación clara."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} delay={index * 0.08} className="h-full rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-700">{experience.company}</p>
                  <h3 className="mt-2 text-2xl font-extrabold text-gray-900">{experience.role}</h3>
                </div>
                <Tag>{experience.period}</Tag>
              </div>
              <p className="mt-5 leading-relaxed text-gray-600">{experience.summary}</p>
              <ul className="mt-6 space-y-3">
                {experience.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 leading-relaxed text-gray-700">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm transition-shadow hover:shadow-xl">
        <Tag>{project.status}</Tag>
        <h3 className="mt-5 text-2xl font-extrabold text-gray-900">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-gray-600">{project.description}</p>
        <ul className="mt-6 space-y-2">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
              <span className="text-blue-600" aria-hidden>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-7 inline-flex items-center font-bold text-blue-700 hover:text-blue-900"
          >
            {project.linkLabel} ↗
          </a>
        ) : (
          <p className="mt-7 text-sm font-semibold text-gray-500">Material sensible o académico conservado de forma privada.</p>
        )}
      </article>
    </Reveal>
  );
}

function ProjectsSection() {
  return (
    <section id="proyectos" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Evidencia técnica"
          title="Proyectos destacados"
          description="Una selección breve para mostrar capacidad de desarrollo, análisis de riesgos, documentación y seguridad aplicada sin publicar información confidencial."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="habilidades" className="bg-gray-900 py-20 text-white sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Capacidades"
          title="Habilidades técnicas por contexto de uso"
          description="Las herramientas se presentan según experiencia práctica, académica o corporativa para mantener un perfil honesto y defendible en entrevista."
          light
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05} className={index === skillGroups.length - 1 ? "md:col-span-2" : ""}>
              <article className="h-full rounded-2xl border border-gray-700 bg-gray-800 p-6">
                <h3 className="text-xl font-extrabold text-white">{group.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-300">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item} dark>{item}</Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="formacion" className="bg-gray-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Formación"
          title="Educación y certificación"
          description="La formación universitaria complementa la experiencia operativa y los proyectos técnicos."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {education.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">{item.title}</h3>
                    <p className="mt-2 font-semibold text-blue-700">{item.institution}</p>
                  </div>
                  <Tag>{item.period}</Tag>
                </div>
                <ul className="mt-6 space-y-3">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-3 leading-relaxed text-gray-700">
                      <span className="text-blue-600" aria-hidden>✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Certificación</p>
            <h3 className="mt-3 text-2xl font-extrabold text-gray-900">Newbie Security Auditor</h3>
            <p className="mt-2 font-semibold text-gray-700">Diosdelared.com · 2025</p>
            <p className="mt-5 leading-relaxed text-gray-600">
              Fundamentos de auditoría, pentesting básico y hardening.
            </p>
            <a
              href="https://cert.ddlr.org/cert.php?id=55"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex font-bold text-blue-700 hover:text-blue-900"
            >
              Verificar certificado ↗
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactSection() {
  const contacts = [
    { label: "Correo", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { label: "Teléfono", value: PROFILE.phone, href: "tel:+543816654021" },
    { label: "GitHub", value: "github.com/Dante2617012022", href: PROFILE.github, external: true },
  ];

  return (
    <section id="contacto" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="rounded-3xl bg-gradient-to-br from-blue-900 to-gray-900 px-6 py-10 text-white shadow-2xl sm:px-10 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Contacto</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">Preparado para dar el siguiente paso hacia un SOC</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
                Busco oportunidades donde pueda aportar experiencia operativa, capacidad de documentación y criterio de
                escalamiento mientras profundizo mi práctica en monitoreo y respuesta de seguridad.
              </p>
              <p className="mt-5 font-semibold text-blue-100">{PROFILE.location}</p>
            </div>

            <div className="grid gap-3">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noreferrer noopener" : undefined}
                  className="rounded-xl border border-white border-opacity-20 bg-white bg-opacity-10 px-5 py-4 hover:bg-opacity-20"
                >
                  <span className="block text-xs font-bold uppercase tracking-wider text-blue-200">{contact.label}</span>
                  <span className="mt-1 block break-all font-semibold text-white">
                    {contact.value}{contact.external ? " ↗" : ""}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-5 z-40 h-11 w-11 rounded-full bg-blue-600 font-bold text-white shadow-xl transition-opacity hover:bg-blue-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Volver al inicio"
    >
      ↑
    </button>
  );
}

export default function PortfolioDante() {
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-blue-800">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <ProfileSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="border-t border-gray-200 bg-gray-50 py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Dante Gabriel Balbuena Atar · Portfolio profesional de ciberseguridad.
      </footer>
      <ScrollToTop />
    </>
  );
}
