(() => {
  // Фокус на "На главную" для клавиатуры. Маленькая забота в мире багов.
  const primary = document.querySelector(".btn-primary");
  if (primary) primary.focus({ preventScroll: true });
})();
