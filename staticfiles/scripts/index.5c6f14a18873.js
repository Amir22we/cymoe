(() => {
  document.documentElement.classList.add("js");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const delay = el.getAttribute("data-delay");
    if (delay) el.style.setProperty("--d", `${delay}ms`);
  });

  if (!prefersReduced && reveals.length) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    reveals.forEach((el) => revealObs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // маленькая анимация счетчиков (дешево, но приятно)
  const counters = document.querySelectorAll(".trust-num[data-count]");

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 700;
    const start = performance.now();

    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = String(value);
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!prefersReduced) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((c) => obs.observe(c));
  } else {
    counters.forEach((c) => {
      c.textContent = c.getAttribute("data-count") || "0";
    });
  }

  // плавный скролл к якорям (включая ссылки вида /path#id)
  const smoothToHash = (hash) => {
    if (!hash || hash === "#") return false;
    const target = document.querySelector(hash);
    if (!target) return false;
    target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    return true;
  };

  document.querySelectorAll('a[href*="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex);
      // Only hijack same-page anchors
      const path = href.slice(0, hashIndex);
      const samePage = !path || path === window.location.pathname || path === window.location.href;
      if (!samePage) return;

      const ok = smoothToHash(hash);
      if (!ok) return;
      e.preventDefault();
      history.replaceState(null, "", hash);
    });
  });

  // Typewriter in mock
  const typeEl = document.getElementById("mockType");
  if (typeEl) {
    const text = "Сегодня я просто устал(а).\nВыписываю это сюда — и становится легче.";
    if (prefersReduced) {
      typeEl.textContent = text;
    } else {
      let i = 0;
      const speed = 20;
      const tick = () => {
        i += 1;
        typeEl.textContent = text.slice(0, i);
        if (i < text.length) window.setTimeout(tick, speed);
      };
      window.setTimeout(tick, 300);
    }
  }

  // Subtle mouse tilt for the mock card
  const mock = document.getElementById("mockCard");
  if (mock && !prefersReduced) {
    const max = 7;
    const onMove = (ev) => {
      const r = mock.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width;
      const y = (ev.clientY - r.top) / r.height;
      const rotY = (x - 0.5) * (max * 2);
      const rotX = (0.5 - y) * (max * 2);
      mock.style.transform = `translateY(-4px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    };
    const onLeave = () => {
      mock.style.transform = "";
    };
    mock.addEventListener("pointermove", onMove);
    mock.addEventListener("pointerleave", onLeave);
  }
})();
