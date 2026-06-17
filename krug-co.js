/* Krug & Co-specific scripts */

const initKrugCoScripts = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const motionScale = reduceMotion ? 0.65 : 1;
  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (hasGsap && hasScrollTrigger) {
    /* Kernel idle-drift — matches Innovation/Media benchmark */
    if (!reduceMotion) {
      window.gsap.to(".krug-kernel, .brand-kernel", {
        y: (i) => (i % 2 === 0 ? -34 : 32),
        x: (i) => (i % 3 === 0 ? 16 : -16),
        rotation: (i) => (i % 2 === 0 ? 11 : -11),
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Tins Cards stagger animation
    if (document.querySelector(".krug-tins-grid")) {
      window.gsap.fromTo(
        ".krug-tin-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8 * motionScale,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".krug-tins-grid",
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    // Expanded flavors tag cloud stagger
    if (document.querySelector(".krug-expanded-flavors")) {
      window.gsap.fromTo(
        ".expanded-flavor-tag",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6 * motionScale,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".krug-expanded-flavors",
            start: "top 90%",
            once: true,
          },
        },
      );
    }

    // Kiosks features animation
    if (document.querySelector(".krug-kiosks-grid")) {
      window.gsap.fromTo(
        ".krug-kiosk-feature",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85 * motionScale,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".krug-kiosks-grid",
            start: "top 80%",
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
