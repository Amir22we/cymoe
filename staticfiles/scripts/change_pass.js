(() => {
  const map = {
    old: "id_old_password",
    new1: "id_new_password1",
    new2: "id_new_password2",
  };

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("button.eye[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-toggle");
      const input = document.getElementById(map[key]);
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
})();
