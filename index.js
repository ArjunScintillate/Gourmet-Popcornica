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

  /* Kernel idle-drift — matches Innovation/Media benchmark */
  if (hasGsap && !reduceMotion) {
    window.gsap.to(".home-kernel, .brand-kernel", {
      y: (i) => (i % 2 === 0 ? -34 : 32),
      x: (i) => (i % 3 === 0 ? 16 : -16),
      rotation: (i) => (i % 2 === 0 ? 11 : -11),
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

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

  // Intro Video Logic
  const initIntroVideo = () => {
    const overlay = document.getElementById("intro-video-overlay");
    const container = document.getElementById("intro-video-container");
    const homepageContent = document.getElementById("homepage-content");
    if (!overlay || !container) return;

    // Preload & Autoplay the YouTube iframe immediately
    container.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/5ZYw6NsFQTw?autoplay=1&amp;mute=1&amp;loop=0&amp;controls=0&amp;rel=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;disablekb=1&amp;fs=0&amp;playsinline=1"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media"></iframe>
    `;

    const handleLoaderComplete = () => {
      // Ensure scrolling is disabled during intro
      document.body.classList.add("is-playing-intro");

      setTimeout(() => {
        // Step 1: Start fading out the intro overlay
        overlay.classList.add("is-hidden");

        // Step 2: Immediately mount and display the homepage content
        if (homepageContent) {
          homepageContent.style.display = "block";
        }

        // Step 3: Wait for fade-out transition, then clean up resources and refresh GSAP
        setTimeout(() => {
          container.innerHTML = "";
          overlay.remove();
          document.body.classList.remove("is-playing-intro");
          
          if (typeof window.ScrollTrigger !== "undefined") {
            window.ScrollTrigger.refresh();
          }
        }, 1000); // Overlay transition duration buffer
      }, 10000); // Play for exactly 10 seconds after loader finishes
    };

    window.addEventListener("site-loader-complete", handleLoaderComplete, { once: true });
  };
  
  initIntroVideo();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initIndexScripts);
} else {
  initIndexScripts();
}

