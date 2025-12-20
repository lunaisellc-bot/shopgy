/* ----------------- Mobile menu ----------------- */
(function () {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!burger || !mobileMenu) return;

  function close() {
    mobileMenu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }

  function toggle() {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  }

  burger.addEventListener("click", toggle);
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
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
  const targets = document.querySelectorAll(".card, .section__head, .hero__left, .hero__right, .showcase, .mock, .trust-bar");
  targets.forEach(t => t.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });

  targets.forEach(t => io.observe(t));
})();

/* ----------------- Showcase Slider ----------------- */
(function () {
  const track = document.getElementById("showcaseTrack");
  const dotsWrap = document.getElementById("showcaseDots");
  const prev = document.getElementById("showcasePrev");
  const next = document.getElementById("showcaseNext");
  if (!track || !dotsWrap || !prev || !next) return;

  const slides = Array.from(track.children);
  let index = 0;
  let timer = null;

  function renderDots() {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Slayt ${i + 1}`);
      b.setAttribute("aria-current", i === index ? "true" : "false");
      b.addEventListener("click", () => go(i, true));
      dotsWrap.appendChild(b);
    });
  }

  function go(i, user = false) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    renderDots();
    if (user) restart();
  }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => go(index + 1, false), 4200);
  }

  prev.addEventListener("click", () => go(index - 1, true));
  next.addEventListener("click", () => go(index + 1, true));

  renderDots();
  go(0);
  restart();
})();

/* ----------------- Video Modal (placeholder) ----------------- */
(function () {
  const modal = document.getElementById("videoModal");
  const closeBg = document.getElementById("closeVideo");
  const closeBtn = document.getElementById("closeVideoBtn");
  const openBtn = document.getElementById("openVideoBtn");
  if (!modal || !closeBg || !closeBtn || !openBtn) return;

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

  openBtn.addEventListener("click", open);
  closeBg.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();
