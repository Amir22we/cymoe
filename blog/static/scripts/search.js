(() => {
  const queryInput = document.getElementById("id_query") || document.querySelector(".search-form input");

  if (queryInput) {
    queryInput.setAttribute("placeholder", "Например: тревога, устал, радость");
    queryInput.focus();
  }

  document.querySelectorAll(".preview[data-preview='1']").forEach((el) => {
    const text = (el.textContent || "").trim();
    if (!text) {
      el.textContent = "У этой записи слишком короткий фрагмент для предпросмотра.";
    }
  });
})();