(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  const burger = document.getElementById("burger");
  const mobile = document.getElementById("mobileMenu");

  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      mobile.style.display = expanded ? "none" : "block";
      mobile.setAttribute("aria-hidden", expanded ? "true" : "false");
    });

    // Close menu after click
    mobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobile.style.display = "none";
        mobile.setAttribute("aria-hidden", "true");
      });
    });
  }
})();
