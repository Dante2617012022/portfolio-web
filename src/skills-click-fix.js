const GROUP_FIX_MARKER = "data-skills-group-bounce-ready";

const animateBubble = (bubble, delay = 0) => {
  const inner = bubble.querySelector(".skill-bubble__inner");
  if (!inner) return;

  window.setTimeout(() => {
    inner.getAnimations().forEach((animation) => animation.cancel());
    inner.animate(
      [
        { transform: "translateY(0) scale(1, 1)" },
        { transform: "translateY(6px) scale(.88, 1.12)", offset: 0.2 },
        { transform: "translateY(-14px) scale(1.1, .92)", offset: 0.48 },
        { transform: "translateY(3px) scale(.96, 1.04)", offset: 0.76 },
        { transform: "translateY(0) scale(1, 1)" },
      ],
      {
        duration: 560,
        easing: "cubic-bezier(.2,.85,.25,1)",
      },
    );
  }, delay);
};

const impulseArena = (arena) => {
  [0, 65, 130].forEach((delay) => {
    window.setTimeout(() => {
      arena.dispatchEvent(new MouseEvent("click", { bubbles: false }));
    }, delay);
  });
};

const applyGroupFix = () => {
  const section = document.querySelector("#skills");
  if (!section) return;

  const bubbles = section.querySelectorAll(".skill-bubble");
  if (!bubbles.length) return;

  bubbles.forEach((bubble) => bubble.removeAttribute("title"));

  if (section.hasAttribute(GROUP_FIX_MARKER)) return;

  const triggerGroupBounce = (bubble) => {
    const arena = bubble.closest(".skills-overhaul__arena");
    if (!arena) return;

    arena.querySelectorAll(".skill-bubble").forEach((item, index) => {
      animateBubble(item, index * 22);
    });
    impulseArena(arena);
  };

  section.addEventListener(
    "click",
    (event) => {
      const bubble = event.target.closest(".skill-bubble");
      if (!bubble || !section.contains(bubble)) return;
      triggerGroupBounce(bubble);
    },
    true,
  );

  section.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const bubble = event.target.closest(".skill-bubble");
      if (!bubble || !section.contains(bubble)) return;
      triggerGroupBounce(bubble);
    },
    true,
  );

  section.querySelectorAll(".skills-overhaul__hint").forEach((hint) => {
    hint.textContent = "Pasá el mouse para ver el nombre y hacé clic para hacer rebotar todo el bloque";
  });

  section.setAttribute(GROUP_FIX_MARKER, "true");
};

export const startSkillsClickFix = () => {
  if (window.__portfolioSkillsClickFixStarted) return;
  window.__portfolioSkillsClickFixStarted = true;

  const root = document.getElementById("root");
  if (!root) return;

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      applyGroupFix();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true });
  schedule();
};
