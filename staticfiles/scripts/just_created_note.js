(() => {
  const copyBtn = document.getElementById("copyBtn");
  const toggleBtn = document.getElementById("toggleBtn");
  const noteText = document.getElementById("noteText");

  if (toggleBtn && noteText) {
    // если текст короткий, кнопка "показать" не нужна
    const isShort = (noteText.textContent || "").trim().length < 450;
    if (isShort) toggleBtn.style.display = "none";

    toggleBtn.addEventListener("click", () => {
      const open = noteText.classList.toggle("is-open");
      toggleBtn.textContent = open ? "Свернуть" : "Показать полностью";
    });
  }

  if (copyBtn && noteText) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(noteText.textContent || "");
        const old = copyBtn.textContent;
        copyBtn.textContent = "Скопировано ✓";
        setTimeout(() => (copyBtn.textContent = old), 900);
      } catch {
        // fallback: выделить текст
        const range = document.createRange();
        range.selectNodeContents(noteText);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        copyBtn.textContent = "Выделено (Ctrl+C)";
        setTimeout(() => (copyBtn.textContent = "Копировать"), 1200);
      }
    });
  }
})();
