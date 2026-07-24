const HERO_BACKGROUND_MARKER = "data-soc-background-ready";
const HERO_BACKGROUND_STYLE_MARKER = "data-soc-background-styles";

const addHeroBackgroundStyles = () => {
  if (document.querySelector(`style[${HERO_BACKGROUND_STYLE_MARKER}]`)) return;

  const style = document.createElement("style");
  style.setAttribute(HERO_BACKGROUND_STYLE_MARKER, "true");
  style.textContent = `
    #home .hero-soc-background {
      overflow: hidden;
      background: #020617;
      isolation: isolate;
    }

    #home .hero-soc-background__blur,
    #home .hero-soc-background__art {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: var(--hero-soc-image);
      background-repeat: no-repeat;
    }

    #home .hero-soc-background__blur {
      inset: -8%;
      z-index: 0;
      background-position: center;
      background-size: cover;
      filter: blur(22px) saturate(.82);
      opacity: .2;
      transform: scale(1.08);
    }

    #home .hero-soc-background__art {
      z-index: 1;
      background-position: center;
      background-size: cover;
    }

    @media (max-width: 767px) {
      #home .hero-soc-background__blur {
        opacity: .52;
      }

      #home .hero-soc-background__art {
        background-position: center 4.25rem;
        background-size: 100% auto;
      }
    }

    @media (max-width: 420px) {
      #home .hero-soc-background__art {
        background-position: center 4.75rem;
      }
    }
  `;

  document.head.append(style);
};

const createBackgroundLayer = (className) => {
  const layer = document.createElement("div");
  layer.className = className;
  layer.setAttribute("aria-hidden", "true");
  return layer;
};

const applyHeroBackground = () => {
  const hero = document.querySelector("#home");
  const background = hero?.querySelector(":scope > div.absolute.inset-0.bg-cover.bg-center");
  if (!background || background.hasAttribute(HERO_BACKGROUND_MARKER)) return;

  addHeroBackgroundStyles();

  const assetUrl = `${import.meta.env.BASE_URL}hero-soc-network-v3.svg`;
  background.classList.add("hero-soc-background");
  background.style.backgroundImage = "none";
  background.style.backgroundPosition = "initial";
  background.style.backgroundSize = "initial";
  background.style.setProperty("--hero-soc-image", `url("${assetUrl}")`);

  background.replaceChildren(
    createBackgroundLayer("hero-soc-background__blur"),
    createBackgroundLayer("hero-soc-background__art"),
  );

  background.setAttribute(HERO_BACKGROUND_MARKER, "true");
};

export const startHeroBackground = () => {
  if (window.__portfolioHeroBackgroundStarted) return;
  window.__portfolioHeroBackgroundStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;

    window.requestAnimationFrame(() => {
      scheduled = false;
      applyHeroBackground();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
