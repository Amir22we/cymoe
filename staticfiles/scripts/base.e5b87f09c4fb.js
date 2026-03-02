(() => {
  const header = document.getElementById("siteHeader");
  const burger = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();
  if (!header || !burger || !mobileMenu) return;

  const openMenu = () => {
    header.classList.add("is-open");
    document.body.classList.add("menu-open");
    burger.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    header.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  };

  burger.addEventListener("click", () => {
    header.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  mobileMenu.addEventListener("click", (e) => {
    const clickable = e.target.closest("a, button");
    if (clickable) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
})();
