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

/* ----------------- Scroll Reveal (stabilized) ----------------- */
/*
  Not: Önceki sürümde ".card" otomatik reveal alıyordu.
  Ancak ".card" hover'da transform yapıyor, ".reveal" da transform yapıyor.
  Bu çakışma bazı cihazlarda "metin/kart kayması" gibi hissedilir.

  Bu yüzden:
  - Reveal hedeflerini kartlar yerine daha güvenli bloklara çektik.
  - Eğer ekstra elementlere reveal istersen HTML'de o elemente "reveal" class'ı eklemen yeter.
*/
(function () {
  const targets = document.querySelectorAll(
    ".section__head, .hero__left, .hero__right, .showcase, .mock, .trust-bar, .reveal"
  );

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

/* ----------------- Video Modal ----------------- */
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

/* ----------------- Charts (Chart.js) + Scroll Focus ----------------- */
/*
  Gereksinimler:
  1) index.html içinde Chart.js script'i, script.js'den önce yüklenmiş olmalı:
     <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
     <script src="script.js"></script>

  2) Canvas id'leri:
     - chartCheckout
     - chartEtsy
     - chartCost

  3) Kart wrapper'ları:
     class="card chartCard" ve data-chart="chartCheckout|chartEtsy|chartCost"
     örn: <div class="card chartCard" data-chart="chartCheckout">...</div>
*/
(function () {
  if (typeof Chart === "undefined") {
    console.warn("[Shopgy] Chart.js bulunamadı. index.html'e Chart.js ekledin mi?");
    return;
  }

  const ids = ["chartCheckout", "chartEtsy", "chartCost"];
  const missingCanvas = ids.filter(id => !document.getElementById(id));
  if (missingCanvas.length) {
    console.warn("[Shopgy] Canvas bulunamadı:", missingCanvas);
    return;
  }

  function makeBarChart(canvasId, labels, targetData, yMax = 100) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

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
    return chart;
  }

  // Bu değerleri sonra stratejiye göre güncelleriz; şimdilik animasyon + görünürlük için net rakamlar.
  const charts = {
    chartCheckout: makeBarChart("chartCheckout", ["Checkout", "Satın Alma"], [70, 30], 100),
    chartEtsy: makeBarChart("chartEtsy", ["Etsy", "Yeni Kanal"], [80, 20], 100),
    chartCost: makeBarChart("chartCost", ["Klasik Yapı", "Shopgy"], [100, 35], 110),
  };

  const cards = document.querySelectorAll(".chartCard[data-chart]");
  if (!cards.length) {
    console.warn("[Shopgy] .chartCard bulunamadı. HTML'de chart kartlarına class/data-chart ekli mi?");
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;

      // kart focus efekti
      cards.forEach(c => c.classList.remove("is-active"));
      e.target.classList.add("is-active");

      const key = e.target.getAttribute("data-chart");
      const chart = charts[key];
      if (!chart || chart.__played) return;

      chart.data.datasets[0].data = chart.__targetData;
      chart.update();
      chart.__played = true;
    });
  }, { threshold: 0.55 });

  cards.forEach(c => io.observe(c));
})();