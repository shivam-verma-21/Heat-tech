(function () {
  "use strict";

  var descriptions = {
    "ceramic-band-heater.html": "Ceramic band heater options for industrial heating requirements.",
    "casting-heater.html": "Casting heater products for specified industrial heating applications.",
    "tubular-heater.html": "Tubular heating elements for a range of industrial requirements.",
    "sealded-nozzle-heater.html": "Sealed nozzle heaters for compatible heating applications.",
    "oil-immersion-heater.html": "Oil immersion heaters for industrial process requirements.",
    "coil-heater.html": "Coil heaters for industrial heating applications.",
    "cartridge-heater.html": "Cartridge heaters for localized heating requirements.",
    "ceramic-heater.html": "Ceramic power saver heaters for industrial use.",
    "hot-air-gun-heater.html": "Hot air gun heater products for compatible equipment.",
    "thermocouple-sensor.html": "Thermocouples and sensors for temperature measurement.",
    "corrugation-heater.html": "Corrugation heater products for specified applications.",
    "bobbin-heater.html": "Bobbin heaters for industrial heating requirements.",
    "mica-band-heater.html": "Mica band heaters for industrial heating requirements."
  };

  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.body.classList.add(currentPage === "index.html" ? "home-page" : "inner-page");

  var requestedProduct = new URLSearchParams(window.location.search).get("product");
  if (requestedProduct) {
    var productSelect = document.getElementById("contact-form-product");
    if (productSelect && Array.prototype.some.call(productSelect.options, function (option) {
      return option.textContent === requestedProduct;
    })) {
      productSelect.value = requestedProduct;
    } else {
      var productInput = document.getElementById("contact-product");
      if (productInput) {
        productInput.value = requestedProduct;
      }
    }
  }

  var year = document.getElementById("current-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll("img").forEach(function (image) {
    if (!image.hasAttribute("alt")) {
      image.setAttribute("alt", image.getAttribute("src").split("/").pop().replace(/[-_]/g, " ").replace(/\.\w+$/, ""));
    }
  });

  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll(".pro").forEach(function (image) {
    var card = image.closest(".col-lg-4, .col-md-4, .col-sm-6");
    if (card) {
      card.classList.add("product-card");
      var link = card.querySelector("a[href]");
      var file = link ? link.getAttribute("href").split("/").pop() : "";
      var description = descriptions[file];
      if (description && !card.querySelector(".product-description")) {
        var paragraph = document.createElement("p");
        paragraph.className = "product-description";
        paragraph.textContent = description;
        image.insertAdjacentElement("afterend", paragraph);
      }
      if (link && !card.querySelector(".product-link")) {
        var linkText = document.createElement("span");
        linkText.className = "product-link";
        linkText.textContent = "View product details";
        link.appendChild(linkText);
      }
    }
  });

  if (!document.querySelector(".site-whatsapp")) {
    var whatsapp = document.createElement("a");
    whatsapp.className = "site-whatsapp";
    whatsapp.href = "https://wa.me/917016777922?text=Hello%20Heat%20Tech%20Technology%2C%20I%20would%20like%20to%20make%20an%20enquiry.";
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener noreferrer";
    whatsapp.setAttribute("aria-label", "Contact Heat Tech Technology on WhatsApp");
    whatsapp.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 11.6a8.3 8.3 0 0 1-12.3 7.3L3 20l1.2-5A8.3 8.3 0 1 1 20.5 11.6Z"/><path d="M8.2 8.1c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.5.6c-.2.2-.2.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1.1-.7 1.4-.5.4-1.1.5-1.8.3-1-.2-2.2-.8-3.4-1.9a13 13 0 0 1-2.3-3c-.6-1.1-.7-2.1-.3-2.7Z"/></svg><span>WhatsApp enquiry</span>';
    document.body.appendChild(whatsapp);

    var footerHost = document.querySelector("heat-tech-footer");
    if (footerHost && "IntersectionObserver" in window) {
      var footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            whatsapp.classList.remove("is-footer-visible");
            whatsapp.removeAttribute("aria-hidden");
            whatsapp.removeAttribute("tabindex");
            return;
          }

          whatsapp.classList.add("is-footer-visible");
          whatsapp.setAttribute("aria-hidden", "true");
          whatsapp.tabIndex = -1;
          if (document.activeElement === whatsapp) {
            whatsapp.blur();
          }
        });
      });
      footerObserver.observe(footerHost);
    }
  }
})();
