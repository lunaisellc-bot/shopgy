/* =========================================================
   Shopgy — script.js (FINAL / ULTRA CLEAN)
   - Mobile menu
   - Year
   - Typewriter
   - Scroll Reveal
   - Showcase Slider
   - Video Modal
   - Charts (Chart.js) + Scroll Focus
   ========================================================= */

/* ----------------- Helpers ----------------- */
function $(id) { return document.getElementById(id); }

/* ----------------- Mobile menu ----------------- */
(function () {
  const burger = $("burger");
  const mobileMenu = $("mobileMenu");
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
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
})();

/* ----------------- Year ----------------- */
(function () {
  const y = $("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();

/* ----------------- Typewriter ----------------- */
(function () {
  const el = document.querySelector(".type");
  if (!el) return;

  const phrases = JSON.parse(el.getAttribute("data-type") || "[]");
  if (!phrases.length) return;

  // Ensure first child is a text node so we can safely mutate it
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
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });

  targets.forEach((t) => io.observe(t));
})();

/* ----------------- Showcase Slider ----------------- */
(function () {
  const track = $("showcaseTrack");
  const dotsWrap = $("showcaseDots");
  const prev = $("showcasePrev");
  const next = $("showcaseNext");
  if (!track || !dotsWrap || !prev || !next) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

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

/* ----------------- Video Modal ----------------- */
(function () {
  const modal = $("videoModal");
  const closeBg = $("closeVideo");
  const closeBtn = $("closeVideoBtn");
  const openBtn = $("openVideoBtn");
  const openBtnMobile = $("openVideoBtnMobile");
  const openBtnCard = $("openVideoBtnCard");

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

  if (openBtn) openBtn.addEventListener("click", open);
  if (openBtnMobile) openBtnMobile.addEventListener("click", open);
  if (openBtnCard) openBtnCard.addEventListener("click", open);

  closeBg.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();

/* ----------------- Charts (Chart.js) + Scroll Focus ----------------- */
(function () {
  if (typeof window.Chart === "undefined") {
    console.warn("[Shopgy] Chart.js bulunamadı. index.html'e Chart.js ekledin mi?");
    return;
  }

  const ids = ["chartCheckout", "chartEtsy", "chartCost"];
  const missingCanvas = ids.filter((id) => !document.getElementById(id));
  if (missingCanvas.length) {
    console.warn("[Shopgy] Canvas bulunamadı:", missingCanvas);
    return;
  }

  function makeBarChart(canvasId, labels, targetData, yMax = 100) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
    if (!canvas || !ctx) return null;

    // hot reload/yeniden init güvenliği
    if (canvas._chartInstance) {
      try { canvas._chartInstance.destroy(); } catch (_) {}
      canvas._chartInstance = null;
    }

    const initialData = targetData.map(() => 0);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "",
          data: initialData,
          borderWidth: 0,
          borderRadius: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, max: yMax, ticks: { stepSize: 20 } }
        },
        animation: {
          duration: 900,
          easing: "easeOutQuart"
        }
      }
    });

    chart.__targetData = targetData;
    chart.__played = false;
    canvas._chartInstance = chart;
    return chart;
  }

  // Demo değerler (sonra metinle %100 eşleştiririz)
  const charts = {
    chartCheckout: makeBarChart("chartCheckout", ["Checkout", "Satın Alma"], [70, 30], 100),
    chartEtsy: makeBarChart("chartEtsy", ["Etsy", "Yeni Kanal"], [80, 20], 100),
    chartCost: makeBarChart("chartCost", ["Klasik Yapı", "Shopgy"], [100, 35], 110),
  };

  const cards = document.querySelectorAll(".chartCard[data-chart]");
  if (!cards.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;

      // focus efekti
      cards.forEach((c) => c.classList.remove("is-active"));
      e.target.classList.add("is-active");

      const key = e.target.getAttribute("data-chart");
      const chart = charts[key];
      if (!chart || chart.__played) return;

      chart.data.datasets[0].data = chart.__targetData;
      chart.update();
      chart.__played = true;
    });
  }, { threshold: 0.55 });

  cards.forEach((c) => io.observe(c));
})();