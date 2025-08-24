import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

// === Helpers ===
const Container = ({ children, className = "" }) => (
  <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>
);

const SectionTitle = ({ children, id }) => (
  <div id={id} className="text-center">
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
      {children}
    </h2>
    <div className="mt-3 flex items-center justify-center gap-2">
      <span className="h-1 w-16 rounded-full bg-blue-600" />
      <span className="h-1 w-5 rounded-full bg-blue-400" />
    </div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>{children}</div>
);

const IconCircle = ({ children }) => (
  <div className="w-16 h-16 rounded-full bg-blue-600/10 text-blue-600 grid place-items-center text-3xl mx-auto" aria-hidden>
    {children}
  </div>
);

const Progress = ({ label, value }) => (
  <div className="space-y-1">
    <div className="flex items-baseline justify-between text-sm font-medium text-gray-100">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-white/80"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

// === 3D Rotating Words (stable + fixed width + colors) ===
const FlippyWords = ({
  phrases,
  interval = 2600,
  className = "",
  style = {},
  axis = "x",
  duration = 620
}) => {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [maxW, setMaxW] = useState(null);
  const next = (i + 1) % phrases.length;
  const t = duration;

  const measureRef = useRef(null);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  // 🎨 Colores por índice (sumá más si hay más frases)
  const colors = ["#64a7ff", "#f97316", "#10b981"];

  // Mide ancho máximo
  useLayoutEffect(() => {
    if (!measureRef.current) return;
    let widest = 0;
    const nodes = measureRef.current.querySelectorAll("[data-measure-item]");
    nodes.forEach((n) => (widest = Math.max(widest, n.offsetWidth)));
    setMaxW(widest);
  }, [phrases]);

  // Re-medición en resize
  useEffect(() => {
    const onR = () => {
      if (!measureRef.current) return;
      let widest = 0;
      const nodes = measureRef.current.querySelectorAll("[data-measure-item]");
      nodes.forEach((n) => (widest = Math.max(widest, n.offsetWidth)));
      setMaxW(widest);
    };
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  // Animación
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const tick = () => {
      if (prefersReduced) {
        setI((v) => (v + 1) % phrases.length);
        return;
      }
      setFlip(true);
      timeoutRef.current = setTimeout(() => {
        setI((v) => (v + 1) % phrases.length);
        setFlip(false);
      }, t);
    };

    intervalRef.current = setInterval(tick, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [interval, phrases.length, t]);

  const rotateA =
    flip ? (axis === "x" ? "rotateX(-180deg)" : "rotateY(-180deg)") : "rotate(0)";
  const faceBRot = axis === "x" ? "rotateX(180deg)" : "rotateY(180deg)";

  return (
    <span
      aria-live="polite"
      className={`inline-block align-middle ${className}`}
      style={{
        ...style,
        perspective: "1000px",
        contain: "layout paint style",
        isolation: "isolate",
        width: maxW ? `${maxW}px` : undefined,
        whiteSpace: "nowrap",
      }}
    >
      {/* wrapper que rota */}
      <span
        className="relative block will-change-transform overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transition: `transform ${t}ms cubic-bezier(0.22,1,0.36,1)`,
          transform: rotateA,
          translate: "0 0",
          transformOrigin: axis === "x" ? "50% 60%" : "50% 50%",
          paddingTop: "0.15em",
          paddingBottom: "0.15em",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* cara A */}
        <span
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0.01px)",
            color: colors[i] || "inherit",
            transition: "color 0.6s ease-in-out",
          }}
        >
          {phrases[i]}
        </span>

        {/* cara B */}
        <span
          className="absolute inset-0"
          style={{
            transform: `${faceBRot} translateZ(0.01px)`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            color: colors[next] || "inherit",
            transition: "color 0.6s ease-in-out",
          }}
        >
          {phrases[next]}
        </span>

        {/* clon invisible para fijar altura */}
        <span
          className="invisible block"
          style={{ paddingTop: "0.15em", paddingBottom: "0.15em" }}
        >
          {phrases[i]}
        </span>
      </span>

      {/* medidor oculto (misma tipografía) */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className={`absolute -z-50 opacity-0 pointer-events-none ${className}`}
        style={{ whiteSpace: "nowrap", position: "fixed", top: -9999, left: -9999 }}
      >
        {phrases.map((p, k) => (
          <span key={k} data-measure-item className="inline-block">
            {p}
          </span>
        ))}
      </span>
    </span>
  );
};


// === Navbar ===
const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls =
    "text-sm font-semibold text-white/90 hover:text-white transition-colors";

  const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Perfil" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experiencia" },
  { href: "#education", label: "Educación" },
  { href: "#projects", label: "Proyectos" },
  { href: "#certs", label: "Certificados" },
  { href: "#contact", label: "Contacto" }
];

return (
  <header className="fixed top-0 inset-x-0 z-50 
                     bg-blue-900 bg-opacity-60  /* azul translúcido */
                     text-white 
                     border-b border-white border-opacity-10">
    <Container className="flex items-center justify-between h-16">
      <a href="#home" className="text-2xl font-extrabold tracking-wider">
        DANTE
      </a>
      <nav className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a key={l.href} href={l.href}
             className="text-sm font-semibold text-white hover:text-blue-200 transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <button
        className="md:hidden inline-flex items-center justify-center w-10 h-10"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </Container>

    {open && (
      <div className="md:hidden border-t border-white border-opacity-20 bg-blue-900 bg-opacity-40">
        <Container className="py-4 grid gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href}
               className="text-sm font-semibold text-white hover:text-blue-200 transition-colors">
              {l.label}
            </a>
          ))}
        </Container>
      </div>
    )}
  </header>
);
};


// === Hero ===
const Hero = () => (
  <section
    id="home"
    className="relative min-h-[90vh] md:min-h-screen text-white"
  >
    {/* Fondo (queda detrás) */}
    <div
      className="absolute inset-0 -z-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://web-assets.esetstatic.com/tn/-x700/wls/2022/07/curso-online-ciberseguridad-empresas.jpg')",
      }}
    />

    {/* Overlay por delante del fondo */}
    <div className="absolute inset-0 bg-black/45 z-0" />

    {/* Contenido por encima de todo */}
    <Container className="relative z-10 pt-24 md:pt-28 pb-16 grid md:grid-cols-2 items-center gap-10">
      <div className="space-y-6">
        <p
          className="text-2xl md:text-3xl lg:text-4xl text-white/90"
          style={{
            color: "#64a7ff",
            textShadow: "0 3px 16px rgba(0,0,0,.25)",
          }}
        >
          Hola, soy
        </p>

        <h1 className="leading-tight">
          <span
            className="block font-extrabold tracking-tight"
            style={{
              color: "#0b1b55",
              textShadow: "0 6px 28px rgba(0,0,0,.45)",
              fontSize: "clamp(30px, 10vw, 60px)",
            }}
          >
            Dante Gabriel Balbuena Atar
          </span>
        </h1>

        <FlippyWords
          className="block text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
          style={{ textShadow: "0 3px 16px rgba(0,0,0,.25)" }}
          phrases={[
            "Ciberseguridad",
            "Desarrollo web",
            "Automatización digital",
          ]}
          interval={2600}
          axis="x"
          duration={620}
        />



        <div className="flex items-center gap-6 pt-2 text-lg">
          <a
            href="https://github.com/Dante2617012022"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white/80"
          >
            GitHub
          </a>
          <a
            href="mailto:dantebalbuenaatar@gmail.com"
            className="underline hover:text-white/80"
          >
            Email
          </a>
          <a
            href="#contact"
            className="underline hover:text-white/80"
          >
            Contacto
          </a>
        </div>
      </div>

      <div className="hidden md:block" />
    </Container>
  </section>
);

// === About ===
const About = () => (
  <section id="about" className="py-20 bg-white">
    <Container>
      <SectionTitle id="about-title">Perfil profesional</SectionTitle>
      <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
        <img
          alt="Dante - ciberseguridad"
          className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
          src="https://www.redseguridad.com/wp-content/uploads/sites/2/2021/12/soc-centro-de-operaciones-de-seguridad.jpg"
        />
        <div className="space-y-5 text-gray-700">
          <p>
            Estudiante de Ciberseguridad con experiencia práctica en soporte técnico, 
            monitoreo de sistemas y gestión de incidentes. Formación en seguridad operativa, 
            cumplimiento normativo y herramientas ofensivas/defensivas. Documentación de 
            proyectos y TPs en GitHub.
          </p>

          
        </div>
      </div>
    </Container>
  </section>
);


// === Skills ===
const Skills = () => (
  <section id="skills" className="py-20 bg-slate-900 text-white">
    <Container>
      <div className="text-center">
        <h2 className="text-4xl font-extrabold">Habilidades Técnicas</h2>
        <div className="mt-3 flex items-center gap-2 justify-center">
          <span className="h-1 w-16 rounded-full bg-blue-500" />
          <span className="h-1 w-5 rounded-full bg-blue-300" />
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <Card className="bg-white/5">
          <h3 className="text-xl font-bold">Avanzado / uso frecuente</h3>
          <ul className="mt-3 space-y-2 text-white/90">
            <li>Linux (Debian), Windows</li>
            <li>VirtualBox, Citrix</li>
            <li>JavaScript, Node.js, Python, React</li>
            <li>HTML, CSS, UX/UI</li>
            <li>MySQL/MariaDB, Apache</li>
            <li>Git & GitHub, Docker</li>
          </ul>
        </Card>

        <Card className="bg-white/5">
          <h3 className="text-xl font-bold">Intermedio / proyectos</h3>
          <ul className="mt-3 space-y-2 text-white/90">
            <li>MITRE ATT&amp;CK, OWASP, OSINT</li>
            <li>VPN, VLAN, DMZ, Firewalls</li>
            <li>ISO 27001, NIST, GDPR, Leyes AR</li>
            <li>Wazuh, Graylog, Snort, Suricata</li>
          </ul>
        </Card>

        <Card className="bg-white/5">
          <h3 className="text-xl font-bold">Básico / en progreso</h3>
          <ul className="mt-3 space-y-2 text-white/90">
            <li>Burp Suite, Hydra</li>
            <li>Wireshark, VirusTotal, YARA</li>
            <li>(Nessus, Metasploit – plan de práctica)</li>
          </ul>
        </Card>
      </div>
    </Container>
  </section>
);
const Experience = () => (
  <section id="experience" className="py-20 bg-white">
    <Container>
      <SectionTitle>Experiencia</SectionTitle>

      <div className="mt-12 grid gap-6">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">Automatización Digital – Camdis</h3>
              <p className="text-gray-600">2025 – Actualidad</p>
            </div>
          </div>
          <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
            <li>Desarrollo de herramientas de automatización con JavaScript y Node.js.</li>
            <li>Soporte técnico y optimización de procesos internos.</li>
          </ul>
        </Card>

        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">
                Agente telefónico (Soporte Técnico / Gestión de Incidentes) – CityTech S.A. / Teleperformance
              </h3>
              <p className="text-gray-600">2019 – 2025</p>
            </div>
          </div>
          <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
            <li>Soporte en XDSL, HFC, FTTH y 5G.</li>
            <li>Gestión de incidentes técnicos en entornos críticos, escalamiento y documentación.</li>
            <li>Uso de Citrix, Salesforce, Oracle (Siebel, Watchdog, CC&amp;B), Avaya, Office y herramientas internas.</li>
            <li>Capacitación periódica en ciberseguridad (e-learning).</li>
          </ul>
        </Card>
      </div>
    </Container>
  </section>
);
const Education = () => (
  <section id="education" className="py-20 bg-gray-50">
    <Container>
      <SectionTitle>Educación</SectionTitle>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold">Tecnicatura en Ciberseguridad – UGR</h3>
          <p className="text-gray-600">2024 – en curso</p>
          <p className="mt-2 text-gray-700">
            1º año y mitad de 2º año completos (promedio ≥ 8). Avance: 57,69%.
          </p>
        </Card>
        <Card>
          <h3 className="text-xl font-bold">Título Secundario</h3>
          <p className="text-gray-600">Colegio Gral. Don José de San Martín – 2014</p>
          <p className="mt-2 text-gray-700">Economía y Gestión de las Organizaciones.</p>
        </Card>
      </div>
    </Container>
  </section>
);
const Certificates = () => (
  <section id="certs" className="py-20 bg-white">
    <Container>
      <SectionTitle>Certificados</SectionTitle>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold">Newbie Security Auditor – Diosdelared.com</h3>
          <p className="text-gray-600">2025</p>
          <p className="mt-2 text-gray-700">
            Fundamentos de auditoría, pentesting básico y hardening.
          </p>
          <a
            href="https://cert.ddlr.org/cert.php?id=55"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-blue-600 hover:underline"
          >
            Verificación: cert.ddlr.org/cert.php?id=55
          </a>
        </Card>
      </div>
    </Container>
  </section>
);




// === Projects ===
const Projects = () => (
  <section id="projects" className="py-20 bg-white">
    <Container>
      <SectionTitle>Proyectos</SectionTitle>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-2xl font-extrabold">Chatbot con IA y Automatización de Pedidos</h3>
          <p className="text-gray-700 mt-3">
            Node.js, Baileys, APIs, JavaScript. Integración con GitHub/Codex IA.
          </p>
          <a
            href="https://github.com/Dante2617012022"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-blue-600 hover:underline"
          >
            Ver en GitHub
          </a>
        </Card>

        <Card>
          <h3 className="text-2xl font-extrabold">Integración de herramientas de seguridad Open Source</h3>
          <p className="text-gray-700 mt-3">
            Wazuh, Graylog, Snort/Suricata, VirusTotal/YARA, MikroTik. 
            Documentación y prácticas orientadas a PyME.
          </p>
          <a
            href="https://github.com/Dante2617012022"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-blue-600 hover:underline"
          >
            Ver documentación / repos
          </a>
        </Card>
      </div>
    </Container>
  </section>
);


// === Contact ===
const Contact = () => (
  <section id="contact" className="py-20 bg-white">
    <Container>
      <SectionTitle>Contacto</SectionTitle>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <Card className="text-center">
          <IconCircle>📍</IconCircle>
          <h4 className="mt-4 text-xl font-bold">Ubicación</h4>
          <p className="text-gray-600 mt-2">Tafí Viejo, Tucumán, Argentina</p>
        </Card>
        <Card className="text-center">
          <IconCircle>📞</IconCircle>
          <h4 className="mt-4 text-xl font-bold">Teléfono</h4>
          <p className="text-gray-600 mt-2">(381) 665-4021</p>
        </Card>
        <Card className="text-center">
          <IconCircle>✉️</IconCircle>
          <h4 className="mt-4 text-xl font-bold">Email</h4>
          <p className="text-gray-600 mt-2">
            <a href="mailto:dantebalbuenaatar@gmail.com" className="text-blue-600 hover:underline">
              dantebalbuenaatar@gmail.com
            </a>
          </p>
        </Card>
      </div>

      <div className="mt-8 max-w-md mx-auto">
        <Card className="text-center">
          <IconCircle>🌐</IconCircle>
          <h4 className="mt-4 text-xl font-bold">Perfiles</h4>
          <div className="mt-2 space-y-1">
            <a
              href="https://github.com/Dante2617012022"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              github.com/Dante2617012022
            </a>
            <br />
            <a
              href="https://www.interestingsite.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              www.interestingsite.com
            </a>
          </div>
        </Card>
      </div>
    </Container>
  </section>
);


// === Scroll To Top ===
const ScrollTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 rounded-xl shadow-lg p-3 bg-blue-600 text-white transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default function PortfolioDante() {
  useEffect(() => {
    const anchorHandler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    document.addEventListener('click', anchorHandler);
    return () => document.removeEventListener('click', anchorHandler);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
  <Hero />
  <About />
  <Skills />
  <Experience />
  <Education />
  <Projects />
  <Certificates />
  <Contact />
</main>

      <footer className="py-8 text-center text-sm text-gray-500 bg-gray-50">
        © {new Date().getFullYear()} Dante Balbuena — All rights reserved.
      </footer>
      <ScrollTop />
    </>
  );
}


