const HERO_BACKGROUND_MARKER = "data-soc-background-ready";

const applyHeroBackground = () => {
  const hero = document.querySelector("#home");
  const background = hero?.querySelector(":scope > div.absolute.inset-0.bg-cover.bg-center");
  if (!background || background.hasAttribute(HERO_BACKGROUND_MARKER)) return;

  const assetUrl = `${import.meta.env.BASE_URL}hero-soc-bg.svg`;
  background.style.backgroundImage = `url("${assetUrl}")`;
  background.style.backgroundPosition = "center";
  background.style.backgroundSize = "cover";
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
