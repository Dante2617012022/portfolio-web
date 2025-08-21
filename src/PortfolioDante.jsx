import React, { useEffect, useState } from "react";

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
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "My Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-blue-700/70">
      <Container className="flex items-center justify-between h-16">
        <a href="#home" className="text-2xl font-extrabold tracking-wider text-white">
          YAYADY
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Container>
      {open && (
        <div className="md:hidden border-t border-white/20">
          <Container className="py-4 grid gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={linkCls}>
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
          "url('https://images.squarespace-cdn.com/content/v1/5fa4b5ace41c003a0a498fe3/197e92d0-085e-45f5-841f-0c5ecae4c9fc/internal_artificial-intelligence-ai-and-security-a-match-made-in-the-soc.jpeg')",
      }}
    />
    {/* Overlay por delante del fondo */}
    <div className="absolute inset-0 bg-black/45 z-0" />

    {/* Contenido por encima de todo */}
    <Container className="relative z-10 pt-24 md:pt-28 pb-16 grid md:grid-cols-2 items-center gap-10">
      <div className="space-y-6">
        <p className="text-xl md:text-2xl text-white/85">Hello, I'm</p>

        <h1 className="leading-tight">
          <span
            className="block text-[48px] sm:text-[64px] md:text-[80px] lg:text-[92px] font-extrabold tracking-tight"
            style={{ color: '#0b1b55' }}
          >
            Yayady S
          </span>
        </h1>

        <p
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
          style={{ color: '#64a7ff' }}
        >
          Web Developer
        </p>

        <a
          href="#projects"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold shadow-lg"
        >
          SEE MY WORK
        </a>

        <div className="flex items-center gap-8 pt-2 text-2xl">
          <a href="#" aria-label="Facebook" className="hover:text-white/80"></a>
          <a href="#" aria-label="Instagram" className="hover:text-white/80"></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white/80"></a>
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
      <SectionTitle id="about-title">About Me</SectionTitle>
      <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
        <img
          alt="Yayady portrait"
          className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
          src="https://www.redseguridad.com/wp-content/uploads/sites/2/2021/12/soc-centro-de-operaciones-de-seguridad.jpg"
        />
        <div className="space-y-5 text-gray-700">
          <h3 className="text-3xl font-extrabold text-gray-900">
            Hey There! I'm Yayady S
          </h3>
          <p>
            I am an Engineering graduate from Vellore Institute of Technology with a
            bachelor's degree in B.Tech CSE and a specialisation in Digital Forensics
            and Cyber security. Born in Tamil Nadu and raised across India, early
            exposure to many cultures helped me work well with others. I am an
            enthusiastic Web Developer, a passionate Cyber security analyst, and a
            vivid traveller.
          </p>
          <a
            href="#skills"
            className="inline-flex px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-500"
          >
            SEE MORE
          </a>
        </div>
      </div>
    </Container>
  </section>
);



// === Skills ===
const Skills = () => (
  <section id="skills" className="py-20 bg-slate-900 text-white">
    <Container>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-4xl font-extrabold">Coding Skills</h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-1 w-16 rounded-full bg-blue-500" />
            <span className="h-1 w-5 rounded-full bg-blue-300" />
          </div>
          <p className="mt-8 text-white/80">
            I am a pre final year student undergoing my Bachelor's degree of
            Science for CSE Engineering with specialisation in Cyber security &
            Digital Forensics. A wide range of experiences improved my
            communication and teamwork.
          </p>
          <a
            href="#about"
            className="inline-flex mt-8 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-500"
          >
            SEE MORE
          </a>
        </div>
        <div className="grid gap-5">
          <Progress label="HTML,CSS,Javascript" value={95} />
          <Progress label="C,C++" value={90} />
          <Progress label="DBMS" value={85} />
          <Progress label="Java" value={80} />
          <Progress label="Python" value={65} />
          <Progress label="UI/UX designing" value={85} />
        </div>
      </div>
    </Container>
  </section>
);

// === Services ===
const Services = () => (
  <section id="services" className="py-20 bg-white">
    <Container>
      <SectionTitle>My Services</SectionTitle>
      <p className="max-w-3xl mx-auto text-center text-gray-700 mt-6">
        As an Engineer of Computer Science my knowledge and skills are good in the
        domain of computer science and I have learned algorithms, data structures,
        computer programming, system architecture, discrete mathematics, and data
        management. Specialisation in Cyber security and Digital Forensics gives me
        insight into the field of security.
      </p>
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <Card>
          <IconCircle>🎓</IconCircle>
          <h3 className="text-center text-2xl font-bold mt-4">CSE Engineer</h3>
          <p className="text-gray-600 mt-3 text-center">
            I am involved in many aspects of computing, from the design of
            individual microprocessors to personal computers and supercomputers.
          </p>
        </Card>
        <Card>
          <IconCircle>📄</IconCircle>
          <h3 className="text-center text-2xl font-bold mt-4">Web Developer</h3>
          <p className="text-gray-600 mt-3 text-center">
            Keen interest in Front‑end Development, skills in HTML, CSS,
            Javascript and a strong eye for detail.
          </p>
        </Card>
      </div>
    </Container>
  </section>
);

// === Highlight Card ===
const SecurityHighlight = () => (
  <section className="py-12 bg-white">
    <Container>
      <div className="max-w-xl mx-auto">
        <Card className="text-center">
          <IconCircle>🐞</IconCircle>
          <h3 className="text-2xl font-bold mt-4">Cyber security analyst</h3>
          <p className="text-gray-600 mt-3">
            As a Security analyst I can monitor, prevent, and stop attacks on
            private data. I create and implement firewalls and software systems to
            protect data and network infrastructures.
          </p>
        </Card>
      </div>
    </Container>
  </section>
);

// === Projects ===
const Projects = () => (
  <section id="projects" className="py-20 bg-white">
    <Container>
      <SectionTitle>My Projects</SectionTitle>
      <div className="mt-12 grid gap-8">
        <div className="rounded-2xl bg-indigo-700 text-white p-10">
          <div className="grid place-items-center">
            <div className="w-24 h-24 rounded-full bg-white text-indigo-700 grid place-items-center text-4xl shadow-xl">
              📶
            </div>
          </div>
          <h3 className="text-center text-3xl font-extrabold mt-6">
            Wifi Penetration Testing
          </h3>
          <p className="text-center max-w-3xl mx-auto mt-4 text-white/90">
            This is a custom tool with an easy understanding that helps anyone test
            the integrity and strength of a secure WPA2 Wi‑Fi or Hotspot. It can
            also be used to crack the password and gain access into the router to
            get free data.
          </p>
        </div>
      </div>
    </Container>
  </section>
);

// === Contact ===
const Contact = () => (
  <section id="contact" className="py-20 bg-white">
    <Container>
      <SectionTitle>Contact Me</SectionTitle>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <Card className="text-center">
          <IconCircle>📍</IconCircle>
          <h4 className="mt-4 text-xl font-bold">Address</h4>
          <p className="text-gray-600 mt-2">Chennai, India</p>
        </Card>
        <Card className="text-center">
          <IconCircle>📞</IconCircle>
          <h4 className="mt-4 text-xl font-bold">Phone</h4>
          <p className="text-gray-600 mt-2">+91 960066640</p>
        </Card>
        <Card className="text-center">
          <IconCircle>✉️</IconCircle>
          <h4 className="mt-4 text-xl font-bold">Email Address</h4>
          <p className="text-gray-600 mt-2">yayady1999@gmail.com</p>
        </Card>
      </div>

      <div className="mt-8 max-w-md mx-auto">
        <Card className="text-center">
          <IconCircle>in</IconCircle>
          <h4 className="mt-4 text-xl font-bold">LinkedIn</h4>
          <a
            href="https://www.linkedin.com/in/"
            className="text-blue-600 hover:underline break-all"
          >
            www.linkedin.com/in/
          </a>
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
        <Services />
        <SecurityHighlight />
        <Projects />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-gray-500 bg-gray-50">
        © {new Date().getFullYear()} YAYADY — All rights reserved.
      </footer>
      <ScrollTop />
    </>
  );
}


