(() => {
  // Микро-UX: фокус на первой безопасной кнопке, чтобы клавиатурой было удобно уйти.
  const primary = document.querySelector(".btn-primary");
  if (primary) primary.focus({ preventScroll: true });
})();
