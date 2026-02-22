(() => {
  const form = document.getElementById("commentForm");
  if (!form) return;

  const nameInput = document.getElementById("id_name");
  const emailInput = document.getElementById("id_email");
  const bodyInput = document.getElementById("id_body");
  const counter = document.getElementById("commentCounter");
  const helper = document.getElementById("commentHelper");
  const submitBtn = form.querySelector("button[type='submit']");

  if (nameInput && !nameInput.placeholder) {
    nameInput.placeholder = "Как к вам обращаться?";
  }

  if (emailInput && !emailInput.placeholder) {
    emailInput.placeholder = "you@example.com";
  }

  if (bodyInput && !bodyInput.placeholder) {
    bodyInput.placeholder = "Напишите ваш комментарий...";
  }

  const autosizeTextarea = () => {
    if (!bodyInput) return;
    bodyInput.style.height = "auto";
    bodyInput.style.height = `${Math.max(150, bodyInput.scrollHeight)}px`;
  };

  const updateCounter = () => {
    if (!bodyInput || !counter) return;

    const length = (bodyInput.value || "").trim().length;
    counter.textContent = String(length);

    if (!helper) return;

    if (length === 0) {
      helper.textContent = "Добавьте мысль, которая реально поможет автору.";
      return;
    }

    if (length < 40) {
      helper.textContent = "Неплохо. Можно добавить чуть больше деталей.";
      return;
    }

    if (length < 180) {
      helper.textContent = "Отличный баланс: кратко и содержательно.";
      return;
    }

    helper.textContent = "Сильный комментарий, выглядит очень полезно.";
  };

  if (bodyInput) {
    bodyInput.addEventListener("input", () => {
      autosizeTextarea();
      updateCounter();
    });
    autosizeTextarea();
    updateCounter();
  }

  if (submitBtn) {
    form.addEventListener("submit", () => {
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправка...";
    });
  }

  const firstError = form.querySelector(".error");
  if (firstError) {
    firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  }
})();
