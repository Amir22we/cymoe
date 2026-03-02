/* Logout page – mouse-tracking glow + tilt */
(function () {
  const card = document.querySelector('.logout-card');
  if (!card || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Subtle tilt on mouse move */
  card.addEventListener('mousemove', function (e) {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 … 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    card.style.transform =
      'perspective(800px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg)';

    /* Move glow radial to cursor position */
    const px = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const py = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    card.style.setProperty('--gx', px + '%');
    card.style.setProperty('--gy', py + '%');
  });

  card.addEventListener('mouseleave', function () {
    card.style.transform = '';
  });

  /* Override ::after to follow cursor */
  var style = document.createElement('style');
  style.textContent =
    '.logout-card::after{' +
    '  background:radial-gradient(45% 40% at var(--gx,50%) var(--gy,15%),rgba(120,120,255,0.14),transparent 60%)!important;' +
    '}';
  document.head.appendChild(style);
})();
