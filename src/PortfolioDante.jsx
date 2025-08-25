import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
// === Icons (SVG inline) ===
const IconGitHub = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.8-.25.8-.56v-2c-3.26.71-3.95-1.56-3.95-1.56-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.44.98.11-.77.41-1.28.74-1.57-2.6-.3-5.33-1.3-5.33-5.77 0-1.27.46-2.31 1.22-3.13-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.29 1.2a11.4 11.4 0 0 1 5.99 0c2.29-1.52 3.28-1.2 3.28-1.2.65 1.65.24 2.88.12 3.18.76.82 1.22 1.86 1.22 3.13 0 4.49-2.74 5.46-5.35 5.75.42.36.79 1.07.79 2.16v3.2c0 .31.21.66.81.55A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const IconMail = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20 4H4a2 2 0 0 0-2 2v.35l10 6.25L22 6.35V6a2 2 0 0 0-2-2Zm2 5.14-9.35 5.83a2 2 0 0 1-2.3 0L1 9.14V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.14Z"/>
  </svg>
);

const IconPhone = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A16 16 0 0 1 3 9a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.02l-2.21 2.21Z"/>
  </svg>
);

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


// === Cursor Binary Trail (canvas) ===
const BinaryTrail = ({
  targetRef,
  color = "rgba(100,167,255,0.9)",   // #64a7ff con alpha
  maxParticles = 160,
  spawnCount = 6,
  fadeMs = 1200,
  sizeRange = [12, 20],               // px
  enableOnTouch = false,              // evita gastar batería en móviles
  mixBlendMode = "screen"             // "normal" si lo prefieres
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const lastMoveRef = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: fine)")?.matches;

    if (prefersReduced) return;                   // respeta accesibilidad
    if (!enableOnTouch && !finePointer) return;   // desactiva en touch por defecto

    const el = targetRef?.current;
    const cvs = canvasRef.current;
    if (!el || !cvs) return;

    const ctx = cvs.getContext("2d");
    ctxRef.current = ctx;

    let rect = el.getBoundingClientRect();
    let running = true;

    const resize = () => {
      rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.style.width = rect.width + "px";
      cvs.style.height = rect.height + "px";
      cvs.width = Math.max(1, Math.floor(rect.width * dpr));
      cvs.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // DPI-correct
      ctx.clearRect(0, 0, rect.width, rect.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const spawn = (mx, my, vx, vy) => {
      const arr = particlesRef.current;
      for (let i = 0; i < spawnCount; i++) {
        if (arr.length >= maxParticles) arr.shift(); // pool
        const speedJitter = 0.5 + Math.random() * 0.8;
        const angle = (Math.random() - 0.5) * Math.PI / 2; // abanico
        const cos = Math.cos(angle), sin = Math.sin(angle);
        const svx = (vx * cos - vy * sin) * speedJitter;
        const svy = (vx * sin + vy * cos) * speedJitter;

        arr.push({
          x: mx,
          y: my,
          vx: svx * 0.06,
          vy: svy * 0.06 - (Math.random() * 0.4 + 0.1), // un poco hacia arriba
          born: performance.now(),
          ttl: fadeMs,
          rot: (Math.random() - 0.5) * 0.6,
          size: Math.floor(sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])),
          char: Math.random() < 0.5 ? "0" : "1"
        });
      }
    };

    const onMove = (e) => {
      const now = performance.now();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const { x: px, y: py, t: pt } = lastMoveRef.current;
      const dt = Math.max(16, now - pt || 16);
      const vx = (mx - (px || mx)) / dt;
      const vy = (my - (py || my)) / dt;

      spawn(mx, my, vx, vy);
      lastMoveRef.current = { x: mx, y: my, t: now };
    };

    const onLeave = () => {
      lastMoveRef.current = { x: 0, y: 0, t: 0 };
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    // Loop
    const loop = () => {
      if (!running) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.clearRect(0, 0, rect.width, rect.height);

      const now = performance.now();
      const arr = particlesRef.current;

      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        const life = now - p.born;
        if (life > p.ttl) {
          arr.splice(i, 1);
          continue;
        }
        // física simple
        p.x += p.vx * 16;
        p.y += p.vy * 16;
        p.vx *= 0.98;
        p.vy *= 0.98;

        const alpha = 1 - life / p.ttl;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = color;
        ctx.font = `${p.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
      particlesRef.current = [];
      ctx && ctx.clearRect(0, 0, rect.width, rect.height);
    };
  }, [targetRef, color, maxParticles, spawnCount, fadeMs, sizeRange, enableOnTouch]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ mixBlendMode }}
      aria-hidden
    />
  );
};

// === Hero ===
const Hero = () => {
  const heroRef = useRef(null);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[90vh] md:min-h-screen text-white"
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://web-assets.esetstatic.com/tn/-x700/wls/2022/07/curso-online-ciberseguridad-empresas.jpg')",
        }}
      />

      {/* Overlay por delante del fondo */}
      <div className="absolute inset-0 bg-black/45 z-0" />

      {/* 🔥 Rastro binario (sobre el overlay, debajo del contenido) */}
      <BinaryTrail
        targetRef={heroRef}
        color="rgba(100,167,255,0.9)" // ajusta a tu paleta
        mixBlendMode="screen"        // prueba "normal" si no querés brillo
        maxParticles={180}
        spawnCount={7}
        fadeMs={1300}
        sizeRange={[12, 22]}
        // enableOnTouch={true}      // activa en móviles si querés
      />

      {/* Contenido por encima de todo */}
      <Container className="relative z-20 pt-24 md:pt-28 pb-16 grid md:grid-cols-2 items-center gap-10">
        <div className="space-y-6">
          <p
            className="text-2xl md:text-3xl lg:text-4xl text-white/90"
            style={{ color: "#64a7ff", textShadow: "0 3px 16px rgba(0,0,0,.25)" }}
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
            phrases={["Ciberseguridad", "Desarrollo web", "Automatización digital"]}
            interval={2600}
            axis="x"
            duration={620}
          />

          <div className="flex items-center gap-6 pt-2 text-lg">
            <a
              href="https://github.com/Dante2617012022"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 underline hover:text-white/80"
            >
              <IconGitHub className="w-5 h-5" />
              <span>GitHub</span>
            </a>

            <a
              href="mailto:dantebalbuenaatar@gmail.com"
              className="inline-flex items-center gap-2 underline hover:text-white/80"
            >
              <IconMail className="w-5 h-5" />
              <span>Email</span>
            </a>

            <a
              href="tel:+543816654021"
              className="inline-flex items-center gap-2 underline hover:text-white/80"
            >
              <IconPhone className="w-5 h-5" />
              <span>Contacto</span>
            </a>
          </div>
        </div>

        <div className="hidden md:block" />
      </Container>
    </section>
  );
};

// === About ===
/* Helper: Tilt 3D suave sin librerías extra */
const Tilt = ({ className = "", children, max = 6 }) => {
  const ref = useRef(null);
  const reduce = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const onMove = (e) => {
    if (reduce) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const rx = (y - 0.5) * -max, ry = (x - 0.5) * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`transition-transform duration-200 will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

const About = () => {
  const reduce = useReducedMotion();

  // Variants para stagger del texto
  const list = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    show:   reduce ? { opacity: 1 } : { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <Container>
        {/* Título + subrayado animado */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
          >
            Perfil profesional
          </motion.h2>

          <div className="mt-3 flex items-center justify-center gap-2">
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 64, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-1 rounded-full bg-blue-600"
              style={{ width: 64 }}
            />
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 20, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="h-1 rounded-full bg-blue-400"
              style={{ width: 20 }}
            />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          {/* Imagen con glow + tilt */}
          <div className="relative">
            {/* glow detrás */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/10 blur-2xl" aria-hidden />
            <Tilt className="rounded-2xl">
              <motion.img
                alt="Dante - ciberseguridad"
                src="https://www.redseguridad.com/wp-content/uploads/sites/2/2021/12/soc-centro-de-operaciones-de-seguridad.jpg"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </Tilt>
          </div>

          {/* Texto con stagger */}
          <motion.div
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="space-y-5 text-gray-700"
          >
            <motion.p variants={item}>
              Estudiante de Ciberseguridad con experiencia práctica en soporte técnico,
              monitoreo de sistemas y gestión de incidentes.
            </motion.p>
            <motion.p variants={item}>
              Formación en seguridad operativa, cumplimiento normativo y herramientas
              ofensivas/defensivas.
            </motion.p>
            {/* CTA opcional */}
            <motion.div variants={item} className="pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Ver proyectos
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};


// === Skills ===
const Skills = () => (
  <section id="skills" className="py-20 bg-gray-900 text-white">
    <Container>
      <div className="text-center">
        <h2 className="text-4xl font-extrabold">Habilidades Técnicas</h2>
        <div className="mt-3 flex items-center gap-2 justify-center">
          <span className="h-1 w-16 rounded-full bg-blue-500" />
          <span className="h-1 w-5 rounded-full bg-blue-300" />
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {/* Avanzado */}
        <Card className="bg-gray-800 text-white border border-white border-opacity-10 shadow-xl">
          <h3 className="text-xl font-bold">Avanzado / uso frecuente</h3>
          <ul className="mt-3 space-y-2 text-white text-opacity-90 break-words">
            <li>Linux (Debian), Windows</li>
            <li>VirtualBox, Citrix</li>
            <li>JavaScript, Node.js, Python, React</li>
            <li>HTML, CSS, UX/UI</li>
            <li>MySQL/MariaDB, Apache</li>
            <li>Git &amp; GitHub, Docker</li>
          </ul>
        </Card>

        {/* Intermedio */}
        <Card className="bg-gray-800 text-white border border-white border-opacity-10 shadow-xl">
          <h3 className="text-xl font-bold">Intermedio / proyectos</h3>
          <ul className="mt-3 space-y-2 text-white text-opacity-90 break-words">
            <li>MITRE ATT&amp;CK, OWASP, OSINT</li>
            <li>VPN, VLAN, DMZ, Firewalls</li>
            <li>ISO 27001, NIST, GDPR, Leyes AR</li>
            <li>Wazuh, Graylog, Snort, Suricata</li>
          </ul>
        </Card>

        {/* Básico */}
        <Card className="bg-gray-800 text-white border border-white border-opacity-10 shadow-xl">
          <h3 className="text-xl font-bold">Básico / en progreso</h3>
          <ul className="mt-3 space-y-2 text-white text-opacity-90 break-words">
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


