/* ----------------- Mobile menu ----------------- */
(function () {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!burger || !mobileMenu) return;

  function toggle() {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  }

  burger.addEventListener("click", toggle);

  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
})();

/* ----------------- Year ----------------- */
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();

/* ----------------- Typewriter ----------------- */
(function () {
  const el = document.querySelector(".type");
  if (!el) return;

  const phrases = JSON.parse(el.getAttribute("data-type") || "[]");
  if (!phrases.length) return;

  // Ensure first text node exists
  if (!el.firstChild || el.firstChild.nodeType !== Node.TEXT_NODE) {
    el.prepend(document.createTextNode(""));
  }

  let p = 0, i = 0, deleting = false;

  function tick() {
    const text = phrases[p];
    i = deleting ? i - 1 : i + 1;

    el.firstChild.textContent = text.slice(0, i);

    if (!deleting && i === text.length) {
      deleting = true;
      setTimeout(tick, 1400);
      return;
    }
    if (deleting && i === 0) {
      deleting = false;
      p = (p + 1) % phrases.length;
    }

    setTimeout(tick, deleting ? 28 : 38);
  }

  tick();
})();

/* ----------------- Scroll Reveal ----------------- */
(function () {
  const targets = document.querySelectorAll(".card, .section__head, .hero__left, .hero__right");
  targets.forEach(t => t.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });

  targets.forEach(t => io.observe(t));
})();

/* ----------------- Video Modal (safe placeholder) ----------------- */
(function () {
  const modal = document.getElementById("videoModal");
  const closeBg = document.getElementById("closeVideo");
  const closeBtn = document.getElementById("closeVideoBtn");
  const openBtn = document.getElementById("openVideoBtn");
  if (!modal || !closeBg || !closeBtn) return;

  const video = modal.querySelector("video");

  function open() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    if (video) video.play().catch(() => {});
  }

  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (video) { video.pause(); video.currentTime = 0; }
  }

  closeBg.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  if (openBtn) openBtn.addEventListener("click", open);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();
