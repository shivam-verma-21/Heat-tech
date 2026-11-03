(function () {
  "use strict";

  var products = [
    ["Ceramic Band Heater", "ceramic-band-heater.html"],
    ["Casting Heater", "casting-heater.html"],
    ["Tubular Heater", "tubular-heater.html"],
    ["Sealed Nozzle Heater", "sealded-nozzle-heater.html"],
    ["Oil Immersion Heater", "oil-immersion-heater.html"],
    ["Coil Heater", "coil-heater.html"],
    ["Cartridge Heater", "cartridge-heater.html"],
    ["Ceramic Power Saver Heater", "ceramic-heater.html"],
    ["Hot Air Gun Heater", "hot-air-gun-heater.html"],
    ["Thermocouple &amp; Sensor", "thermocouple-sensor.html"],
    ["Corrugation Heater", "corrugation-heater.html"],
    ["Bobbin Heater", "bobbin-heater.html"],
    ["Mica Band Heater", "mica-band-heater.html"]
  ];

  var productPages = products.map(function (product) {
    return product[1];
  });

  class HeatTechNavbar extends HTMLElement {
    connectedCallback() {
      if (this.hasAttribute("data-rendered")) {
        return;
      }

      this.setAttribute("data-rendered", "");
      var currentPage = window.location.pathname.split("/").pop() || "index.html";
      var isHome = currentPage === "index.html";
      var isProducts = currentPage === "products.html";
      var isProductDetail = productPages.indexOf(currentPage) !== -1;

      var productLinks = products.map(function (product) {
        var productName = product[0].replace(/&amp;/g, "&");
        var current = currentPage === product[1];
        return '<a class="site-mega-menu__link' + (current ? " is-current" : "") + '" href="' + product[1] + '"' +
          (current ? ' aria-current="page"' : "") + '><span>' + productName + '</span><span aria-hidden="true">→</span></a>';
      }).join("");

      this.innerHTML =
        '<header class="site-header">' +
          '<div class="site-topbar">' +
            '<div class="site-topbar__inner">' +
              '<div class="site-topbar__contact">' +
                '<a href="tel:+917016777922">+91 70167 77922</a>' +
                '<span aria-hidden="true"></span>' +
                '<a href="mailto:heattech482@gmail.com">heattech482@gmail.com</a>' +
              '</div>' +
              '<div class="site-topbar__details">' +
                '<span>Industrial heaters &amp; sensors · Vapi, Gujarat</span>' +
                '<div class="site-social" aria-label="Social media">' +
                  '<a href="https://www.facebook.com/profile.php?id=61576664455164" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>' +
                  '<a href="https://x.com/heattech1972" target="_blank" rel="noopener noreferrer" aria-label="X">𝕏</a>' +
                  '<a href="https://www.instagram.com/heat_tech_technology/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="site-nav-shell">' +
            '<nav class="site-nav" aria-label="Main navigation">' +
              '<a class="site-brand" href="index.html"' + (isHome ? ' aria-current="page"' : "") + '>' +
                '<img src="images/logo.png" width="56" height="56" alt="Heat Tech Technology logo">' +
                '<span>Heat Tech Technology</span>' +
              '</a>' +
              '<button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav-panel" aria-label="Open navigation">' +
                '<span></span><span></span><span></span>' +
              '</button>' +
              '<div class="site-nav__panel" id="site-nav-panel">' +
                '<ul class="site-nav__list">' +
                  '<li><a class="site-nav__link' + (isHome ? " is-current" : "") + '" href="index.html"' + (isHome ? ' aria-current="page"' : "") + '>Home</a></li>' +
                  '<li><a class="site-nav__link' + (currentPage === "about.html" ? " is-current" : "") + '" href="about.html"' + (currentPage === "about.html" ? ' aria-current="page"' : "") + '>About Us</a></li>' +
                  '<li class="site-products' + (isProducts || isProductDetail ? " is-current" : "") + '">' +
                    '<div class="site-products__heading">' +
                      '<a class="site-nav__link' + (isProducts || isProductDetail ? " is-current" : "") + '" href="products.html"' + (isProducts ? ' aria-current="page"' : "") + '>Products</a>' +
                      '<button class="site-products__toggle" type="button" aria-expanded="false" aria-controls="site-products-menu" aria-label="Show product menu">' +
                        '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 6 4.5 4 4.5-4"></path></svg>' +
                      '</button>' +
                    '</div>' +
                    '<div class="site-mega-menu" id="site-products-menu" role="region" aria-label="Products">' +
                      '<div class="site-mega-menu__header"><span>Product range</span><a href="products.html">Browse all products <span aria-hidden="true">→</span></a></div>' +
                      '<div class="site-mega-menu__grid">' + productLinks + '</div>' +
                    '</div>' +
                  '</li>' +
                  '<li><a class="site-nav__link' + (currentPage === "contact.html" ? " is-current" : "") + '" href="contact.html"' + (currentPage === "contact.html" ? ' aria-current="page"' : "") + '>Contact</a></li>' +
                  '<li><a class="site-nav__link' + (currentPage === "enquiry.html" ? " is-current" : "") + '" href="enquiry.html"' + (currentPage === "enquiry.html" ? ' aria-current="page"' : "") + '>Enquiry</a></li>' +
                  '<li class="site-nav__cta-item"><a class="site-nav__cta" href="enquiry.html">Request an Enquiry<span aria-hidden="true">→</span></a></li>' +
                '</ul>' +
              '</div>' +
            '</nav>' +
          '</div>' +
        '</header>';

      var nav = this.querySelector(".site-nav");
      var panel = this.querySelector(".site-nav__panel");
      var navShell = this.querySelector(".site-nav-shell");
      var navToggle = this.querySelector(".site-nav__toggle");
      var productsItem = this.querySelector(".site-products");
      var productsMenu = this.querySelector(".site-mega-menu");
      var productsToggle = this.querySelector(".site-products__toggle");
      var productsCloseTimer;

      function setNavOpen(open) {
        nav.classList.toggle("is-menu-open", open);
        navToggle.setAttribute("aria-expanded", String(open));
        navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      }

      function setProductsOpen(open) {
        window.clearTimeout(productsCloseTimer);
        productsCloseTimer = null;
        productsItem.classList.toggle("is-open", open);
        productsToggle.setAttribute("aria-expanded", String(open));
        productsToggle.setAttribute("aria-label", open ? "Hide product menu" : "Show product menu");
      }

      function scheduleProductsClose() {
        window.clearTimeout(productsCloseTimer);
        productsCloseTimer = window.setTimeout(function () {
          if (!productsItem.contains(document.activeElement)) {
            setProductsOpen(false);
          }
        }, 200);
      }

      navToggle.addEventListener("click", function () {
        var open = navToggle.getAttribute("aria-expanded") !== "true";
        setNavOpen(open);
        if (!open) {
          setProductsOpen(false);
        }
      });

      productsToggle.addEventListener("click", function () {
        setProductsOpen(productsToggle.getAttribute("aria-expanded") !== "true");
      });

      var desktopHover = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
      productsItem.addEventListener("mouseenter", function () {
        if (desktopHover.matches) {
          setProductsOpen(true);
        }
      });
      navShell.addEventListener("mouseenter", function () {
        window.clearTimeout(productsCloseTimer);
        productsCloseTimer = null;
      });
      navShell.addEventListener("mouseleave", function () {
        if (desktopHover.matches && !productsItem.contains(document.activeElement)) {
          scheduleProductsClose();
        }
      });
      productsMenu.addEventListener("mouseenter", function () {
        window.clearTimeout(productsCloseTimer);
        productsCloseTimer = null;
      });
      productsMenu.addEventListener("mouseleave", function () {
        if (desktopHover.matches && !productsItem.contains(document.activeElement)) {
          scheduleProductsClose();
        }
      });
      productsItem.addEventListener("focusin", function () {
        if (desktopHover.matches) {
          setProductsOpen(true);
        }
      });

      productsItem.addEventListener("focusout", function (event) {
        if (!productsItem.contains(event.relatedTarget)) {
          scheduleProductsClose();
        }
      });

      panel.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          setNavOpen(false);
          setProductsOpen(false);
        }
      });

      document.addEventListener("click", function (event) {
        if (!nav.contains(event.target)) {
          setNavOpen(false);
          setProductsOpen(false);
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") {
          return;
        }

        var navWasOpen = nav.classList.contains("is-menu-open");
        var productsWereOpen = productsItem.classList.contains("is-open");
        if (navWasOpen || productsWereOpen) {
          setNavOpen(false);
          setProductsOpen(false);
          (navWasOpen ? navToggle : productsToggle).focus();
        }
      });

      window.addEventListener("resize", function () {
        setNavOpen(false);
        setProductsOpen(false);
      });
    }
  }

  customElements.define("heat-tech-navbar", HeatTechNavbar);
})();
