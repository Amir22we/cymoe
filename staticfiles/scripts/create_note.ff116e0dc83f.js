(() => {
  const textarea = document.getElementById("id_content") || document.querySelector("textarea");
  const title = document.getElementById("id_title") || document.querySelector("input[type='text']");
  const counter = document.getElementById("counter");
  const helper = document.getElementById("helperText");

  const placeholders = [
    "Пиши всё, что внутри. Даже если это звучит странно. Особенно если звучит странно.",
    "Можно матом. Можно поэтично. Можно тупо списком. Здесь можно как угодно.",
    "Опиши день. Опиши боль. Опиши злость. Или просто: “я устал”. Это уже достаточно.",
    "Если не знаешь с чего начать: “Меня бесит…” или “Мне страшно потому что…”",
    "Тут нет правильных слов. Есть твои слова."
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (textarea) textarea.setAttribute("placeholder", pick(placeholders));
  if (title) title.setAttribute("placeholder", "Коротко и по делу. Или вообще не по делу. Как хочешь.");

  const updateCounter = () => {
    if (!textarea || !counter) return;
    const n = (textarea.value || "").length;
    counter.textContent = String(n);
    if (helper) {
      helper.textContent =
        n === 0
          ? "Начни с одной фразы. Потом станет легче."
          : n < 80
          ? "Норм. Пиши дальше, не тормози себя."
          : "Вот так. Теперь оно хотя бы в тексте, а не в голове.";
    }
  };

  if (textarea) {
    textarea.addEventListener("input", updateCounter);
    updateCounter();
  }
})();
