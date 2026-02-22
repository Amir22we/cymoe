(() => {
  const modal = document.getElementById("deleteModal");
  const openBtn = document.getElementById("openDeleteModal");
  if (!modal || !openBtn) return;

  const closeEls = modal.querySelectorAll("[data-close='1']");

  const open = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeEls.forEach((el) => el.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
})();
