const CONTROL_ATTRIBUTE = "data-skill-motion-control";

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

const randomBetween = (minimum, maximum) =>
  Math.random() * (maximum - minimum) + minimum;

const findMotionSurface = (card) =>
  card.querySelector("canvas")?.parentElement ||
  card.querySelector(".h-72") ||
  card;

const findFloatingElements = (surface) => {
  const wrappers = new Set();

  surface.querySelectorAll("img").forEach((image) => {
    if (image.closest("[hidden]")) return;

    let node = image.parentElement;
    while (node && node !== surface) {
      if (window.getComputedStyle(node).position === "absolute") {
        wrappers.add(node);
        break;
      }
      node = node.parentElement;
    }

    if (node === surface || !node) wrappers.add(image);
  });

  return [...wrappers].filter((element) => !element.hidden);
};

const dispatchMotionEvent = (target, clientX, clientY) => {
  const mouseEvent = new MouseEvent("mousemove", {
    bubbles: true,
    cancelable: true,
    clientX,
    clientY,
    movementX: randomBetween(-24, 24),
    movementY: randomBetween(-24, 24),
  });

  target.dispatchEvent(mouseEvent);
  window.dispatchEvent(
    new MouseEvent("mousemove", {
      bubbles: true,
      clientX,
      clientY,
    }),
  );

  if (typeof PointerEvent === "function") {
    target.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        cancelable: true,
        clientX,
        clientY,
        pointerType: "mouse",
      }),
    );
  }
};

const animateFloatingElements = (surface) => {
  if (prefersReducedMotion()) return;

  findFloatingElements(surface).forEach((element, index) => {
    const distance = randomBetween(14, 34);
    const angle = randomBetween(0, Math.PI * 2);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const rotation = randomBetween(-16, 16);

    element.animate(
      [
        { transform: "translate(0, 0) rotate(0deg)" },
        { transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)` },
        { transform: "translate(0, 0) rotate(0deg)" },
      ],
      {
        duration: 620 + index * 22,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );
  });
};

const applyMotionBurst = (card, button) => {
  const surface = findMotionSurface(card);
  const eventTarget = surface.querySelector("canvas") || surface;
  const rect = surface.getBoundingClientRect();
  const reduced = prefersReducedMotion();
  const pulses = reduced ? 1 : 12;

  button.disabled = true;
  button.textContent = reduced ? "Movimiento activado" : "¡En movimiento!";
  button.setAttribute("aria-pressed", "true");

  surface.dispatchEvent(
    new CustomEvent("portfolio:skill-burst", {
      bubbles: true,
      detail: { strength: reduced ? 0.25 : 1 },
    }),
  );

  animateFloatingElements(surface);

  for (let index = 0; index < pulses; index += 1) {
    window.setTimeout(() => {
      dispatchMotionEvent(
        eventTarget,
        rect.left + randomBetween(rect.width * 0.15, rect.width * 0.85),
        rect.top + randomBetween(rect.height * 0.15, rect.height * 0.85),
      );
    }, index * 28);
  }

  window.setTimeout(() => {
    button.disabled = false;
    button.textContent = "Mover habilidades";
    button.setAttribute("aria-pressed", "false");
  }, reduced ? 500 : 1050);
};

const addSkillMotionControls = () => {
  const section = document.querySelector("#skills");
  const grid = section?.querySelector(".mt-12.grid");
  if (!grid) return;

  [...grid.children].forEach((cardContainer, index) => {
    const card = cardContainer.querySelector(".bg-gray-800") || cardContainer;
    if (card.querySelector(`[${CONTROL_ATTRIBUTE}]`)) return;

    const controlWrapper = document.createElement("div");
    controlWrapper.className = "px-6 pb-6 pt-2 text-center";

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.skillMotionControl = String(index + 1);
    button.className =
      "inline-flex items-center justify-center rounded-xl border border-blue-300/40 bg-blue-600/90 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:cursor-wait disabled:opacity-70";
    button.textContent = "Mover habilidades";
    button.setAttribute("aria-label", `Mover los elementos del bloque ${index + 1}`);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => applyMotionBurst(card, button));

    controlWrapper.append(button);
    card.append(controlWrapper);
  });
};

const markPreservedEffects = () => {
  document.querySelector("#home canvas")?.setAttribute("data-preserved-effect", "binary-cursor");

  const profileImages = document.querySelectorAll("#about img[src*='tenor.com']");
  profileImages.forEach((image) => image.setAttribute("data-preserved-effect", "profile-gif"));

  document
    .querySelector("#certs canvas")
    ?.setAttribute("data-preserved-effect", "certificate-background");
};

export const startVisualEffectsEnhancements = () => {
  if (window.__portfolioVisualEffectsStarted) return;
  window.__portfolioVisualEffectsStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const enhance = () => {
    if (scheduled) return;
    scheduled = true;

    window.requestAnimationFrame(() => {
      scheduled = false;
      addSkillMotionControls();
      markPreservedEffects();
    });
  };

  const observer = new MutationObserver(enhance);
  observer.observe(root, { childList: true, subtree: true });
  enhance();
};
