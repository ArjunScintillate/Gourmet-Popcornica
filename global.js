/* Global scripts for Gourmet Popcornica */

document.documentElement.classList.add("js");

/* ── Lenis Smooth Scroll — Premium scrolling engine ── */
const initLenis = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || typeof globalThis.Lenis === "undefined") return null;

  const lenis = new Lenis({
    lerp: 0.08,
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.6,
    infinite: false,
    autoResize: true,
  });

  /* Bridge Lenis → GSAP ScrollTrigger so scroll-driven
     animations stay in perfect sync with interpolated scroll. */
  if (typeof window.ScrollTrigger !== "undefined" && typeof window.gsap !== "undefined") {
    lenis.on("scroll", window.ScrollTrigger.update);

    window.gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    window.gsap.ticker.lagSmoothing(0);
  } else {
    /* Fallback — run Lenis off rAF */
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* Expose globally so page-specific scripts can use lenis.scrollTo() */
  window.lenis = lenis;
  return lenis;
};

const siteLenis = initLenis();

const initPreloader = () => {
  const preloader = document.getElementById("site-preloader");
  const progressText = document.getElementById("preloader-progress");
  if (!preloader) return;

  document.body.classList.add("is-loading");

  let progress = 0;
  let isLoaded = false;

  // Fake progress animation
  const interval = setInterval(() => {
    if (progress < 90) {
      progress += Math.floor(Math.random() * 10) + 1;
      if (progress > 90) progress = 90;
      if (progressText) progressText.textContent = `${progress}%`;
    }
  }, 150);

  const completeLoading = () => {
    if (isLoaded) return;
    isLoaded = true;
    clearInterval(interval);

    if (progressText) progressText.textContent = '100%';

    setTimeout(() => {
      preloader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
      window.dispatchEvent(new CustomEvent("site-loader-complete"));
      setTimeout(() => {
        preloader.remove();
      }, 800); // Wait for fade out
    }, 400); // Slight delay at 100%
  };

  // Wait for window load or fallback timeout
  if (document.readyState === "complete") {
    completeLoading();
  } else {
    window.addEventListener("load", completeLoading);
    // Fallback in case load takes too long
    setTimeout(completeLoading, 8000);
  }
};
initPreloader();

const initGlobalScripts = () => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector(".primary-nav");
  const navScrim = document.querySelector("[data-nav-scrim]");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const motionScale = reduceMotion ? 0.65 : 1;

  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const setNavOpen = (open) => {
    nav?.classList.toggle("is-open", open);
    header?.classList.toggle("is-nav-open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navScrim?.classList.toggle("is-visible", open);
    navScrim?.setAttribute("aria-hidden", String(!open));
    document.documentElement.classList.toggle("no-scroll", open);
    document.body.classList.toggle("no-scroll", open);

    /* Pause/resume Lenis so scroll doesn't bleed through nav overlay */
    if (window.lenis) {
      open ? window.lenis.stop() : window.lenis.start();
    }
  };

  const closeMenu = () => {
    if (!nav?.classList.contains("is-open")) return;
    setNavOpen(false);
  };

  menuToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setNavOpen(!nav?.classList.contains("is-open"));
  });

  navScrim?.addEventListener("click", closeMenu);

  nav?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!nav?.classList.contains("is-open")) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (nav.contains(target) || menuToggle?.contains(target)) return;
    closeMenu();
  });

  const desktopMq = window.matchMedia("(min-width: 1025px)");
  const handleViewportChange = () => {
    if (desktopMq.matches) closeMenu();
  };
  if (typeof desktopMq.addEventListener === "function") {
    desktopMq.addEventListener("change", handleViewportChange);
  } else if (typeof desktopMq.addListener === "function") {
    desktopMq.addListener(handleViewportChange);
  }

  const revealWithObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
  };

  if (hasGsap && hasScrollTrigger) {
    try {
      window.gsap.registerPlugin(window.ScrollTrigger);

      window.gsap.utils.toArray(".reveal").forEach((element) => {
        window.gsap.fromTo(
          element,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9 * motionScale,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      window.gsap.fromTo(
        ".hero-copy > *",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9 * motionScale,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.08,
        },
      );

      window.gsap.fromTo(
        ".bucket",
        { y: 28, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1 * motionScale,
          ease: "power3.out",
          delay: 0.14,
        },
      );

      window.gsap.fromTo(
        ".feature-card, .process-step, .product-card, .story-panel, .commitment-cards article, .intro-card, .ecosystem-feature, .reliability-card-bespoke, .industry-card, .pouch-frame, .metric-pill, .scale-stats article, .solution-highlights-editorial li, .innov-core-card, .innov-key-pill, .innov-eco-tile, .innov-visual-frame, .testimonial-card",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75 * motionScale,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            once: true,
          },
        },
      );

      if (!reduceMotion) {
        /* Kernel idle-drift animations are handled by each page's own JS
           (index.js, aboutus.js, solutions.js, innovation.js, media.js, etc.)
           using a unified GSAP yoyo sine.inOut loop. */

        if (!isTouch) {
          window.gsap.utils
            .toArray(".feature-card, .product-card, .story-panel, .final-card, .reliability-card-bespoke, .industry-card, .pouch-frame, .intro-card, .ecosystem-feature, .leadership-card, .journey-card, .metric-pill, .scale-stats article, .solution-highlights-editorial li, .process-step, .farmer-highlight-card, .farmer-prose-card, .farmer-quote-card, .innov-core-card, .innov-key-pill, .innov-eco-tile, .innov-visual-frame, .testimonial-card")
            .forEach((card) => {
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



        // About Intro Section Specific Interactions
        if (document.querySelector(".about-intro-section")) {
          window.gsap.fromTo(
            ".intro-card",
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75 * motionScale,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".about-intro-rail",
                start: "top 85%",
                once: true,
              },
            },
          );
        }

        // Ecosystem Section Specific Interactions
        if (document.querySelector(".ecosystem-editorial-section")) {
          window.gsap.fromTo(
            ".ecosystem-feature",
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75 * motionScale,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".ecosystem-feature-rail",
                start: "top 85%",
                once: true,
              },
            },
          );
        }

        // Self-Reliant Section Specific Interactions
        if (document.querySelector(".self-reliance-section")) {
          window.gsap.fromTo(
            ".leadership-card, .journey-card",
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75 * motionScale,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".reliance-highlights",
                start: "top 85%",
                once: true,
              },
            },
          );
        }
      }
    } catch (error) {
      console.warn("GSAP init failed, using observer fallback.", error);
      revealWithObserver();
    }
  } else {
    revealWithObserver();
  }

  document.addEventListener("click", (event) => {
    const anchor =
      event.target instanceof Element
        ? event.target.closest('a[href^="#"]')
        : null;
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const headerOffset = 82;

    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -headerOffset, duration: 1.6 });
    } else {
      const y =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
};

if (document.querySelector("[data-header]")) {
  initGlobalScripts();
} else {
  window.addEventListener("site-layout-ready", initGlobalScripts, {
    once: true,
  });
}
