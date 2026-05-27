const loadPartial = async (selector, path) => {
  const mount = document.querySelector(selector);
  if (!mount) return;

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load partial: ${path}`);
  }

  mount.innerHTML = await response.text();
};

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

const loadSharedLayout = async () => {
  try {
    await Promise.all([
      loadPartial("[data-site-header]", "partials/navbar.html"),
      loadPartial("[data-site-footer]", "partials/footer.html"),
    ]);
    applyNavState();
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  } finally {
    window.dispatchEvent(new Event("site-layout-ready"));
  }
};

loadSharedLayout();
