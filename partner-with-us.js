/* Partner With Us page-specific scripts */

const initPartnerWithUsScripts = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const motionScale = reduceMotion ? 0.65 : 1;
  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  const select = document.querySelector("#partner-enquiry-type");
  const cards = document.querySelectorAll(".partner-category-card");
  const form = document.querySelector("#partner-enquiry-form");

  const setActiveCard = (value) => {
    cards.forEach((card) => {
      const match = card.dataset.enquiryValue === value;
      card.classList.toggle("is-active", match);
      card.setAttribute("aria-pressed", String(match));
    });
  };

  const syncSelectFromCard = (value) => {
    if (!select) return;
    const option = Array.from(select.options).find(
      (opt) => opt.value === value,
    );
    if (option) {
      select.value = value;
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const value = card.dataset.enquiryValue;
      if (!value) return;
      syncSelectFromCard(value);
      setActiveCard(value);
    });
  });

  select?.addEventListener("change", () => {
    setActiveCard(select.value);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (typeof window.gsap !== "undefined") {
      window.gsap.fromTo(
        form,
        { scale: 0.99 },
        { scale: 1, duration: 0.35, ease: "power2.out" },
      );
    }
    window.alert(
      "Thank you for your enquiry. This is a preview form — connect your backend or email handler to submit messages.",
    );
  });

  if (!hasGsap || reduceMotion || window.GP_LIGHT_MOTION) return;

  if (hasScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  window.gsap.to(".partner-kernel, .partner-brand-kernel", {
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
      .toArray(".partner-category-card, .partner-business-card, .partner-form-panel")
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
    .querySelectorAll(".partner-category-card, .partner-business-card, .partner-form-panel")
    .forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        window.gsap.to(card, {
          x: x * 6,
          y: y * 4,
          rotateZ: x * 0.85,
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
  document.addEventListener("DOMContentLoaded", initPartnerWithUsScripts);
} else {
  initPartnerWithUsScripts();
}
