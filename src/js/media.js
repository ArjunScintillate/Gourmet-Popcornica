/* Media page-specific scripts */

const initMediaScripts = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const motionScale = reduceMotion ? 0.65 : 1;
  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (!hasGsap || reduceMotion || window.GP_LIGHT_MOTION) return;

  if (hasScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  window.gsap.to(".media-kernel, .media-brand-kernel", {
    y: (index) => (index % 2 === 0 ? -34 : 32),
    x: (index) => (index % 3 === 0 ? 16 : -16),
    rotation: (index) => (index % 2 === 0 ? 11 : -11),
    duration: 9,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  if (hasScrollTrigger) {
    window.gsap.utils
      .toArray(
        ".media-feature-card, .media-press-item, .media-kit-item, .media-update-card",
      )
      .forEach((el) => {
        window.gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72 * motionScale,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
  }

  if (isTouch) return;

  document
    .querySelectorAll(".media-feature-card, .media-update-card")
    .forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        window.gsap.to(card, {
          x: x * 5,
          y: y * 3,
          rotateZ: x * 0.7,
          duration: 0.45,
          ease: "power2.out",
          overwrite: true,
        });
      });

      card.addEventListener("pointerleave", () => {
        window.gsap.to(card, {
          x: 0,
          y: 0,
          rotateZ: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.75)",
          overwrite: true,
        });
      });
    });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMediaScripts);
} else {
  initMediaScripts();
}
