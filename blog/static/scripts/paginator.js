(() => {
  const paginators = document.querySelectorAll('.paginator');

  paginators.forEach((root) => {
    const current = root.querySelector('.paginator-page[aria-current="page"]');
    if (current) {
      current.classList.add('is-active');
    }

    root.querySelectorAll('.paginator-page, .paginator-btn').forEach((el) => {
      el.addEventListener('mousedown', () => el.classList.add('is-pressed'));
      el.addEventListener('mouseup', () => el.classList.remove('is-pressed'));
      el.addEventListener('mouseleave', () => el.classList.remove('is-pressed'));
      el.addEventListener('blur', () => el.classList.remove('is-pressed'));
    });

    root.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      const selector = event.key === 'ArrowLeft'
        ? 'a[rel="prev"]'
        : 'a[rel="next"]';

      const link = root.querySelector(selector);
      if (link) {
        event.preventDefault();
        window.location.href = link.href;
      }
    });

    if (!root.hasAttribute('tabindex')) {
      root.setAttribute('tabindex', '0');
    }
  });
})();
