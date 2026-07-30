const applyNavState = () => {
  const page = document.body.dataset.page || "home";
  const navLinks = document.querySelectorAll(".primary-nav a[data-nav-id]");

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.navId === page);
  });

  if (page === "home" || page === "solutions") {
    document
      .querySelectorAll('.primary-nav a[href^="index.html#"]')
      .forEach((link) => {
        link.setAttribute(
          "href",
          link.getAttribute("href").replace("index.html", ""),
        );
      });
  }
};

const initializeLayout = () => {
  try {
    applyNavState();
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  } finally {
    window.dispatchEvent(new Event("site-layout-ready"));
  }
};

document.addEventListener("DOMContentLoaded", initializeLayout);
