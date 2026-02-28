(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".helptext[data-help-for]").forEach((help) => {
    const inputId = help.getAttribute("data-help-for");
    const input = inputId ? document.getElementById(inputId) : null;
    if (!input) return;

    const activate = () => help.classList.add("is-active");
    const deactivate = () => help.classList.remove("is-active");

    input.addEventListener("focus", activate);
    input.addEventListener("blur", deactivate);

    help.addEventListener("click", () => {
      input.focus();
    });
  });

  const map = {
    pass1: "id_new_password1",
    pass2: "id_new_password2",
  };

  document.querySelectorAll("button.eye[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-toggle");
      const inputId = map[key];
      const input = inputId ? document.getElementById(inputId) : null;
      if (!input) return;

      const isPass = input.type === "password";
      input.type = isPass ? "text" : "password";
      btn.textContent = isPass ? "🙈" : "👁";

      if (!prefersReduced) {
        btn.animate(
          [
            { transform: "translateY(-50%) scale(1)" },
            { transform: "translateY(-50%) scale(1.06)" },
            { transform: "translateY(-50%) scale(1)" },
          ],
          { duration: 180, easing: "ease-out" }
        );
      }
    });
  });

  const card = document.querySelector(".reset-card");
  if (!card || prefersReduced) return;

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 3;
    const rotateX = (0.5 - (y / rect.height)) * 3;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
})();
