(() => {
  const btn = document.querySelector("button.eye[data-toggle='pass']");
  const input = document.getElementById("id_password");
  if (!btn || !input) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  btn.addEventListener("click", () => {
    const isPass = input.type === "password";
    input.type = isPass ? "text" : "password";
    btn.textContent = isPass ? "🙈" : "👁";

    if (!prefersReduced) {
      btn.animate(
        [
          { transform: "translateY(-50%) scale(1)" },
          { transform: "translateY(-50%) scale(1.06)" },
          { transform: "translateY(-50%) scale(1)" }
        ],
        { duration: 180, easing: "ease-out" }
      );
    }
  });
})();
