(() => {
  const noteTextEl = document.getElementById("noteText");
  const copyAllBtn = document.getElementById("copyAllBtn");
  const copyTextBtn = document.getElementById("copyTextBtn");
  const selectBtn = document.getElementById("selectBtn");
  const toast = document.getElementById("toast");

  if (!noteTextEl) return;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-show"), 1200);
  };

  const selectText = () => {
    const range = document.createRange();
    range.selectNodeContents(noteTextEl);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const safeCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const title = document.title.replace(" — CYMOE", "").trim();
  const body = noteTextEl.textContent || "";

  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", async () => {
      const full = `${title}\n\n${body}`;
      const ok = await safeCopy(full);
      if (ok) showToast("Скопировано ✓");
      else {
        selectText();
        showToast("Выделено (Ctrl+C)");
      }
    });
  }

  if (copyTextBtn) {
    copyTextBtn.addEventListener("click", async () => {
      const ok = await safeCopy(body);
      if (ok) showToast("Текст скопирован ✓");
      else {
        selectText();
        showToast("Выделено (Ctrl+C)");
      }
    });
  }

  if (selectBtn) {
    selectBtn.addEventListener("click", () => {
      selectText();
      showToast("Выделено");
    });
  }
})();
