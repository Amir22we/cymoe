(() => {
  const map = {
    pass1: 'id_password1',
    pass2: 'id_password2',
  };

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("button.eye[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-toggle");
      const inputId = map[key];
      const input = document.getElementById(inputId);
      if (!input) return;

      const isPass = input.type === "password";
      input.type = isPass ? "text" : "password";
      btn.textContent = isPass ? "🙈" : "👁";

      if (!prefersReduced) {
        btn.animate(
          [{ transform: "translateY(-50%) scale(1)" }, { transform: "translateY(-50%) scale(1.06)" }, { transform: "translateY(-50%) scale(1)" }],
          { duration: 180, easing: "ease-out" }
        );
      }
    });
  });
})();
