/* Solutions-specific scripts */

const initSolutionsScripts = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const motionScale = reduceMotion ? 0.65 : 1;
  const hasGsap = typeof window.gsap !== "undefined";

  if (hasGsap && !reduceMotion) {
    // Hero & Section Kernels Idle Drift
    window.gsap.to(".sol-kernel, .brand-kernel", {
      y: (i) => (i % 2 === 0 ? -40 : 40),
      x: (i) => (i % 3 === 0 ? 20 : -20),
      rotation: (i) => (i % 2 === 0 ? 15 : -15),
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Editorial Sections Reveal
    window.gsap.utils.toArray(".solution-editorial").forEach((section) => {
      const visual = section.querySelector(".editorial-visual");
      const content = section.querySelector(".editorial-content");

      window.gsap.fromTo(
        visual,
        {
          x: section.classList.contains("editorial-reverse") ? 40 : -40,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        },
      );

      window.gsap.fromTo(
        content,
        {
          x: section.classList.contains("editorial-reverse") ? -40 : 40,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        },
      );
    });

    // Reliability Bespoke Cards Staggered Animation
    window.gsap.fromTo(
      ".reliability-card-bespoke",
      {
        y: 26,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.75 * motionScale,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reliability-grid-bespoke",
          start: "top 85%",
          once: true,
        },
      },
    );

    // Hover effect for bespoke reliability cards (skip on touch)
    if (!isTouch) {
      document.querySelectorAll(".reliability-card-bespoke").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          if (event.pointerType === "touch") return;
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          window.gsap.to(card, {
            x: x * 6,
            y: y * 4,
            rotateZ: x * 0.9,
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
    }

    // Industry Cards Staggered Animation
    window.gsap.fromTo(
      ".industry-card",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6 * motionScale,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".industry-grid",
          start: "top 85%",
          once: true,
        },
      },
    );

    // Hover effect for industry cards (tilt) — skip on touch
    if (!isTouch) {
      document.querySelectorAll(".industry-card").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          if (event.pointerType === "touch") return;
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          window.gsap.to(card, {
            x: x * 8,
            y: y * 5,
            rotateZ: x * 1,
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
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSolutionsScripts);
} else {
  initSolutionsScripts();
}
