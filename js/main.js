// Sayfa Yükleme Animasyonu
const tl = gsap.timeline();

tl.to(".reveal-text", { opacity: 1, duration: 1.5, letterSpacing: "25px" })
  .to(".loader-line", { width: "100%", duration: 1, ease: "power2.inOut" })
  .to("#loader", { y: "-100%", duration: 1, ease: "expo.inOut" })
  .from(".hero-img", { scale: 1.5, duration: 2, ease: "expo.out" }, "-=0.5")
  .from(".main-title", { y: 100, opacity: 0, duration: 1, stagger: 0.2 }, "-=1");

// Özel İmleç Hareketi
document.addEventListener("mousemove", (e) => {
    gsap.to("#cursor", { x: e.clientX, y: e.clientY, duration: 0.5 });
});
