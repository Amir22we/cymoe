(() => {
  const comments = document.getElementById("id_comments") || document.querySelector("textarea");
  const nameInput = document.getElementById("id_name");
  const emailInput = document.getElementById("id_email");
  const toInput = document.getElementById("id_to");
  const counter = document.getElementById("counter");
  const helper = document.getElementById("helperText");

  if (nameInput) nameInput.setAttribute("placeholder", "Как к вам обращаться?");
  if (emailInput) emailInput.setAttribute("placeholder", "you@example.com");
  if (toInput) toInput.setAttribute("placeholder", "friend@example.com");
  if (comments) comments.setAttribute("placeholder", "Пара слов получателю (необязательно)");

  const updateCounter = () => {
    if (!comments || !counter) return;
    const value = comments.value || "";
    const n = value.length;

    counter.textContent = String(n);

    if (!helper) return;
    helper.textContent =
      n === 0
        ? "Добавьте короткий комментарий, если хотите."
        : n < 60
        ? "Хорошее начало. Можно отправлять."
        : "Отлично. Тёплое письмо получается.";
  };

  if (comments) {
    comments.addEventListener("input", updateCounter);
    updateCounter();
  }
})();
