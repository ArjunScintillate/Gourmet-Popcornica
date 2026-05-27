/* Farmer Ecosystem-specific scripts */

const initFarmerEcosystemScripts = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const motionScale = reduceMotion ? 0.65 : 1;
  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (window.GP_LIGHT_MOTION) return;

  if (hasGsap && hasScrollTrigger) {
    // Scale Band Articles Animation
    if (document.querySelector(".farmer-scale-band")) {
      window.gsap.fromTo(
        ".scale-stats article",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8 * motionScale,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".farmer-scale-band",
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    // Farmer highlight cards animation
    if (document.querySelector(".farmer-highlight-grid")) {
      window.gsap.fromTo(
        ".farmer-highlight-card",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75 * motionScale,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".farmer-highlight-grid",
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    // Farmer process rail cards animation
    if (document.querySelector(".farmer-process-rail")) {
      window.gsap.fromTo(
        ".farmer-process-rail .feature-card",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75 * motionScale,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".farmer-process-rail",
            start: "top 85%",
            once: true,
          },
        },
      );
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFarmerEcosystemScripts);
} else {
  initFarmerEcosystemScripts();
}
