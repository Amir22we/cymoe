(() => {
  const header = document.getElementById("siteHeader");
  const burger = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();
  if (!header || !burger || !mobileMenu) return;

  const openMenu = () => {
    header.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    header.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  };

  burger.addEventListener("click", () => {
    header.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  mobileMenu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) closeMenu();
  });
})();
