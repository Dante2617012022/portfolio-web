const HERO_CONTENT_MARKER = "data-hero-content-ready";

const createHeroAction = ({ href, label, primary = false, external = false }) => {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  link.className = primary
    ? "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-lg transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900"
    : "inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 font-semibold text-white shadow-lg backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900";

  if (external) {
    link.target = "_blank";
    link.rel = "noreferrer noopener";
  }

  return link;
};

const applyHeroContent = () => {
  const hero = document.querySelector("#home");
  const content = hero?.querySelector(".space-y-6");
  if (!content || content.hasAttribute(HERO_CONTENT_MARKER)) return;

  const heading = content.querySelector("h1");
  const name = heading?.querySelector("span");
  const rotatingWords = content.querySelector('[aria-live="polite"]');
  const role = content.querySelector(":scope > p");
  const actions = content.querySelector(".flex.flex-wrap.items-center");

  if (!heading || !name || !rotatingWords || !role || !actions) return;

  name.textContent = "Dante Gabriel Balbuena Atar";
  name.style.color = "#f8fbff";
  name.style.textShadow =
    "0 4px 18px rgba(0,0,0,.45), 0 0 18px rgba(100,167,255,.25)";
  name.style.fontWeight = "800";

  const greeting = document.createElement("div");
  greeting.dataset.heroGreeting = "true";
  greeting.className = "text-2xl md:text-3xl lg:text-4xl font-semibold";
  greeting.style.color = "#64a7ff";
  greeting.style.textShadow = "0 3px 16px rgba(0,0,0,.25)";
  greeting.textContent = "Hola, soy";
  heading.insertAdjacentElement("beforebegin", greeting);

  role.className = "max-w-2xl text-xl sm:text-2xl font-semibold leading-snug text-white";
  role.textContent = "Analista SOC Jr. | Gestión de Incidentes | Telecomunicaciones";
  rotatingWords.insertAdjacentElement("afterend", role);

  actions.className = "flex flex-wrap items-center gap-3 pt-2 text-sm sm:text-base";
  actions.replaceChildren(
    createHeroAction({ href: "#projects", label: "Ver proyectos", primary: true }),
    createHeroAction({
      href: "https://github.com/Dante2617012022",
      label: "GitHub",
      external: true,
    }),
    createHeroAction({ href: "#contact", label: "Contacto" }),
  );

  content.setAttribute(HERO_CONTENT_MARKER, "true");
};

export const startHeroContent = () => {
  if (window.__portfolioHeroContentStarted) return;
  window.__portfolioHeroContentStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;

    window.requestAnimationFrame(() => {
      scheduled = false;
      applyHeroContent();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
