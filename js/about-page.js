(function () {
  "use strict";

  var targets = document.querySelectorAll(".about-page [data-reveal]");
  if (!targets.length || !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach(function (target) {
      target.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -45px 0px", threshold: 0.08 });

  targets.forEach(function (target) {
    observer.observe(target);
  });
  document.body.classList.add("about-reveal-ready");
})();
