(() => {
  // Микро-полировка: если превью пустое (например, у записи только пробелы) — показать заглушку.
  document.querySelectorAll(".preview[data-collapsible='1']").forEach((el) => {
    const t = (el.textContent || "").trim();
    if (!t) {
      el.textContent = "Тут пусто. Либо ты написал(а) только тишину. Такое тоже бывает.";
    }
  });
})();
