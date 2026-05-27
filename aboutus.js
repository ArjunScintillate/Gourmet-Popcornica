/* About Us-specific scripts */

const initAboutUsScripts = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const motionScale = reduceMotion ? 0.65 : 1;

  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (hasGsap && hasScrollTrigger) {
    // Scale Band Articles Animation
    if (document.querySelector(".scale-band")) {
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
            trigger: ".scale-band",
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    // Commitment Section Feature Cards
    if (document.querySelector(".commitment-section")) {
      window.gsap.fromTo(
        ".commitment-section .feature-card",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75 * motionScale,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".commitment-section .feature-rail",
            start: "top 85%",
            once: true,
          },
        },
      );
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAboutUsScripts);
} else {
  initAboutUsScripts();
}
