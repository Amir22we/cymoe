(() => {
  const input = document.querySelector("input[type='text']");
  if (!input) return;

  // лёгкий UX: автоселект имени
  window.addEventListener("load", () => {
    input.focus();
    input.select();
  });
})();
