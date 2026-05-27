/* Index-specific scripts */

const initIndexScripts = () => {
  const productTrack = document.querySelector("[data-product-track]");
  const prevButton = document.querySelector("[data-scroll-prev]");
  const nextButton = document.querySelector("[data-scroll-next]");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const motionScale = reduceMotion ? 0.65 : 1;

  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  const scrollProducts = (direction) => {
    if (!productTrack) return;
    const cardWidth =
      productTrack.querySelector(".product-card")?.getBoundingClientRect()
        .width || 180;
    productTrack.scrollBy({
      left: direction * (cardWidth + 34) * 2,
      behavior: "smooth",
    });
  };

  prevButton?.addEventListener("click", () => scrollProducts(-1));
  nextButton?.addEventListener("click", () => scrollProducts(1));

  if (hasGsap && hasScrollTrigger) {
    // Metric Pill Animation (only on index)
    if (document.querySelector(".metric-strip")) {
      window.gsap.fromTo(
        ".metric-pill",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65 * motionScale,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".metric-strip",
            start: "top 90%",
            once: true,
          },
        },
      );
    }

    // Process Step Animation (Complete Control section)
    if (document.querySelector(".process-line")) {
      window.gsap.fromTo(
        ".process-step",
        { y: 26, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85 * motionScale,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-line",
            start: "top 85%",
            once: true,
          },
        },
      );
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initIndexScripts);
} else {
  initIndexScripts();
}
