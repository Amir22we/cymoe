(() => {
  // Безопасность для людей, которые кликают на всё подряд.
  const form = document.querySelector("form.form");
  const btn = document.querySelector(".btn-danger");
  if (!form || !btn) return;

  let armed = false;

  const reset = () => {
    armed = false;
    btn.textContent = "Удалить аккаунт";
  };

  form.addEventListener("submit", (e) => {
    if (armed) return;

    e.preventDefault();
    armed = true;

    btn.textContent = "Точно удалить? (нажми ещё раз)";
    btn.focus();

    setTimeout(reset, 5000);
  });
})();
