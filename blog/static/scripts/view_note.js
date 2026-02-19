(() => {
  // Полировка пагинации:
  // 1) подсветить активную страницу по aria-current="page"
  // 2) если активная страница — <a>, убрать клик (чтобы не мигало)

  document.querySelectorAll('.paginator').forEach((root) => {
    const current = root.querySelector('.paginator-page[aria-current="page"]');
    if (current) {
      current.classList.add('is-active');

      if (current.tagName === 'A') {
        current.addEventListener('click', (e) => e.preventDefault());
      }
    }
  });
})();
