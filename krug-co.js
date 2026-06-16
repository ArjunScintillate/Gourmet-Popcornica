/* Krug & Co-specific scripts */

const initKrugCoScripts = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const motionScale = reduceMotion ? 0.65 : 1;
  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (hasGsap && hasScrollTrigger) {
    // Services Cards stagger animation
    if (document.querySelector(".krug-services-grid")) {
      window.gsap.fromTo(
        ".krug-service-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8 * motionScale,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".krug-services-grid",
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    // Scale stats stagger animation in capabilities section
    if (document.querySelector(".krug-capabilities-band")) {
      window.gsap.fromTo(
        ".krug-capabilities-band .scale-stats article",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75 * motionScale,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".krug-capabilities-band",
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    // Gallery placeholders stagger animation
    if (document.querySelector(".krug-gallery-grid")) {
      window.gsap.fromTo(
        ".krug-gallery-grid .gallery-placeholder",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8 * motionScale,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".krug-gallery-grid",
            start: "top 85%",
            once: true,
          },
        },
      );
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initKrugCoScripts);
} else {
  initKrugCoScripts();
}
