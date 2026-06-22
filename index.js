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

    // Preload & Autoplay the local video immediately
    container.innerHTML = `
      <video src="assets/home-video.mp4" autoplay muted playsinline></video>
    `;

    // Create Brand Reveal overlay elements
    const revealWrapper = document.createElement("div");
    revealWrapper.className = "intro-brand-reveal-wrapper";
    revealWrapper.innerHTML = `
      <div class="intro-brand-reveal-scrim"></div>
      <div class="intro-brand-reveal">
        <h1 class="brand-reveal-text">
          <span class="type-serif" id="reveal-serif"></span><span class="type-brand" id="reveal-brand"></span><span class="reveal-cursor"></span>
        </h1>
      </div>
    `;
    overlay.appendChild(revealWrapper);

    const handleLoaderComplete = () => {
      // Ensure scrolling is disabled during intro
      document.body.classList.add("is-playing-intro");

      // Step 1: Fade-in the brand reveal wrapper (takes 400ms-500ms in CSS)
      setTimeout(() => {
        revealWrapper.classList.add("is-visible");
      }, 100);

      // Step 2: Start typewriter animation sequence after fade-in
      setTimeout(() => {
        const text1 = "Gourmet";
        const text2 = "Popcornica";
        const serifSpan = document.getElementById("reveal-serif");
        const brandSpan = document.getElementById("reveal-brand");
        
        if (!serifSpan || !brandSpan) return;

        let index = 0;

        function typeSerif() {
          if (index < text1.length) {
            serifSpan.textContent += text1[index];
            index++;
            setTimeout(typeSerif, 75 + Math.random() * 45);
          } else {
            // Append the space and move to the brand word
            serifSpan.textContent += " ";
            index = 0;
            setTimeout(typeBrand, 180);
          }
        }

        function typeBrand() {
          if (index < text2.length) {
            brandSpan.textContent += text2[index];
            index++;
            setTimeout(typeBrand, 75 + Math.random() * 45);
          } else {
            // Typing complete: transition cursor out and enable shimmer
            revealWrapper.classList.add("is-typing-done");
            setTimeout(() => {
              revealWrapper.classList.add("is-complete");
            }, 200);
          }
        }

        typeSerif();
      }, 500);

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

