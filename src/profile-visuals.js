const PROFILE_VISUAL_MARKER = "data-profile-visual-ready";
const PROFILE_STYLE_MARKER = "data-profile-contrast-styles";

const addProfileStyles = () => {
  if (document.querySelector(`style[${PROFILE_STYLE_MARKER}]`)) return;

  const style = document.createElement("style");
  style.setAttribute(PROFILE_STYLE_MARKER, "true");
  style.textContent = `
    #about [data-profile-text-block] {
      color: #f8fafc;
      background: linear-gradient(145deg, #0f172a 0%, #172554 100%);
    }

    #about [data-profile-text-block] > p {
      color: #e2e8f0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, .28);
    }

    #about [data-profile-text-block] a {
      color: #ffffff;
    }

    #about [data-profile-highlights] {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 767px) {
      #about [data-profile-content-grid] {
        padding: 1rem;
        gap: 1.5rem;
      }

      #about [data-profile-text-block] {
        padding: 1.25rem;
      }

      #about [data-profile-highlights] {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.append(style);
};

const createHighlight = (value, label) => {
  const card = document.createElement("div");
  card.className =
    "rounded-2xl px-4 py-4 text-center shadow-lg backdrop-blur-sm";
  card.style.background =
    "linear-gradient(145deg, rgba(30,64,175,.96), rgba(15,23,42,.98))";
  card.style.border = "1px solid rgba(125,211,252,.55)";
  card.style.boxShadow =
    "0 12px 30px rgba(2,132,199,.18), inset 0 1px 0 rgba(255,255,255,.08)";

  const valueNode = document.createElement("strong");
  valueNode.className = "block text-xl font-extrabold";
  valueNode.style.color = "#ffffff";
  valueNode.style.textShadow = "0 2px 10px rgba(0,0,0,.45)";
  valueNode.textContent = value;

  const labelNode = document.createElement("span");
  labelNode.className = "mt-1 block text-sm font-semibold tracking-wide";
  labelNode.style.color = "#bae6fd";
  labelNode.style.textShadow = "0 1px 6px rgba(0,0,0,.5)";
  labelNode.textContent = label;

  card.append(valueNode, labelNode);
  return card;
};

const applyProfileVisuals = () => {
  const section = document.querySelector("#about");
  if (!section || section.hasAttribute(PROFILE_VISUAL_MARKER)) return;

  const container = section.querySelector(":scope > div");
  const contentGrid = section.querySelector(".mt-12.grid");
  const textBlock = section.querySelector(".max-w-prose");
  const image = section.querySelector('img[alt="Dante - ciberseguridad"]');
  const button = textBlock?.querySelector('a[href="#projects"]');

  if (!container || !contentGrid || !textBlock || !image || !button) return;

  addProfileStyles();

  section.classList.remove("bg-white");
  section.classList.add("relative", "overflow-hidden");
  section.style.background =
    "radial-gradient(circle at 12% 18%, rgba(59,130,246,.16), transparent 28%), radial-gradient(circle at 88% 76%, rgba(14,165,233,.12), transparent 30%), linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)";

  const heading = section.querySelector("h2");
  if (heading) {
    heading.style.color = "#0f172a";
    heading.style.textShadow = "0 2px 12px rgba(255,255,255,.75)";
  }

  section
    .querySelectorAll('img[alt="GIF Cyber Joy"], img[alt="GIF Locked In"]')
    .forEach((gif) => {
      gif.style.mixBlendMode = "multiply";
      gif.style.filter = "contrast(1.04) saturate(1.05)";
    });

  const gridBackdrop = document.createElement("div");
  gridBackdrop.dataset.profileGridBackdrop = "true";
  gridBackdrop.className = "pointer-events-none absolute inset-0 opacity-40";
  gridBackdrop.style.backgroundImage =
    "linear-gradient(rgba(37,99,235,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.05) 1px, transparent 1px)";
  gridBackdrop.style.backgroundSize = "34px 34px";
  section.insertBefore(gridBackdrop, container);

  contentGrid.dataset.profileContentGrid = "true";
  contentGrid.classList.add(
    "relative",
    "z-10",
    "rounded-3xl",
    "border",
    "border-blue-100/80",
    "bg-white/80",
    "p-5",
    "sm:p-8",
    "lg:p-10",
    "shadow-2xl",
    "shadow-blue-900/10",
    "backdrop-blur-sm",
  );
  contentGrid.style.alignItems = "start";
  contentGrid.style.background = "rgba(255, 255, 255, .9)";
  contentGrid.style.border = "1px solid rgba(191, 219, 254, .9)";

  const imageWrapper = image.closest(".relative.z-10");
  imageWrapper?.classList.add("group");
  image.classList.add("border", "border-white/70", "ring-1", "ring-blue-200/70");

  const imageCaption = document.createElement("div");
  imageCaption.dataset.profileImageCaption = "true";
  imageCaption.className =
    "absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider shadow-xl backdrop-blur";
  imageCaption.style.background = "rgba(2, 6, 23, .88)";
  imageCaption.style.color = "#dbeafe";
  imageCaption.textContent = "Operaciones + Ciberseguridad";
  imageWrapper?.append(imageCaption);

  textBlock.dataset.profileTextBlock = "true";
  textBlock.classList.remove("text-gray-700", "max-w-prose");
  textBlock.classList.add(
    "rounded-3xl",
    "border",
    "p-6",
    "sm:p-8",
    "shadow-2xl",
  );
  textBlock.style.background =
    "linear-gradient(145deg, #0f172a 0%, #172554 100%)";
  textBlock.style.border = "1px solid rgba(96, 165, 250, .42)";
  textBlock.style.color = "#f8fafc";
  textBlock.style.boxShadow =
    "0 24px 55px rgba(15, 23, 42, .24), inset 0 1px 0 rgba(255,255,255,.06)";

  textBlock.querySelectorAll(":scope > p").forEach((paragraph) => {
    paragraph.classList.add("text-base", "sm:text-lg");
    paragraph.style.color = "#e2e8f0";
    paragraph.style.lineHeight = "1.75";
    paragraph.style.fontWeight = "500";
    paragraph.style.textShadow = "0 1px 2px rgba(0,0,0,.28)";
  });

  const badge = document.createElement("span");
  badge.dataset.profileBadge = "true";
  badge.className =
    "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest";
  badge.style.borderColor = "rgba(96, 165, 250, .45)";
  badge.style.background = "rgba(59, 130, 246, .16)";
  badge.style.color = "#bfdbfe";
  badge.textContent = "Transición profesional hacia SOC";
  textBlock.insertBefore(badge, textBlock.firstChild);

  const highlights = document.createElement("div");
  highlights.dataset.profileHighlights = "true";
  highlights.className = "grid gap-3 sm:grid-cols-3";
  highlights.append(
    createHighlight("Más de 5 años y medio", "Operaciones"),
    createHighlight("SLA", "Priorización y escalamiento"),
    createHighlight("Debian + redes", "Base técnica"),
  );

  const buttonWrapper = button.closest("div");
  textBlock.insertBefore(highlights, buttonWrapper);

  button.classList.remove("bg-blue-600");
  button.classList.add(
    "font-extrabold",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-300",
    "focus:ring-offset-2",
  );
  button.style.color = "#ffffff";
  button.style.background = "linear-gradient(90deg, #2563eb 0%, #0891b2 100%)";
  button.style.border = "1px solid rgba(165,243,252,.65)";
  button.style.boxShadow = "0 12px 30px rgba(8,145,178,.35)";
  button.style.textShadow = "0 1px 5px rgba(0,0,0,.45)";

  section.setAttribute(PROFILE_VISUAL_MARKER, "true");
};

export const startProfileVisuals = () => {
  if (window.__portfolioProfileVisualsStarted) return;
  window.__portfolioProfileVisualsStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;

    window.requestAnimationFrame(() => {
      scheduled = false;
      applyProfileVisuals();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
