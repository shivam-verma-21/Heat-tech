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

  function icon(name) {
    var icons = {
      arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
      home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
      about: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
      products: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
      phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.8L7.7 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.8-.6l2.8.5a2 2 0 0 1 1.7 2.7Z"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      external: '<path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
      facebook: '<path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.3 1.2 16.2 1 15 1c-3.1 0-5 1.9-5 5.3V9H7v4h3v8h4Z"/>',
      instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
      x: '<path d="M4 4 20 20"/><path d="M20 4 4 20"/><path d="M7 4h3l7 16h-3L7 4Z"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (icons[name] || icons.arrow) + "</svg>";
  }

  function link(label, href, iconName) {
    return '<li><a href="' + href + '">' + icon(iconName) + "<span>" + label + "</span>" + icon("arrow") + "</a></li>";
  }

  class HeatTechFooter extends HTMLElement {
    connectedCallback() {
      if (this.hasAttribute("data-rendered")) {
        return;
      }

      this.setAttribute("data-rendered", "");
      var productLinks = products.map(function (product) {
        return '<li><a href="' + product[1] + '">' + product[0] + icon("arrow") + "</a></li>";
      }).join("");

      this.innerHTML =
        '<footer class="site-footer" aria-label="Site footer">' +
          '<div class="site-footer__texture" aria-hidden="true"></div>' +
          '<div class="container site-footer__container">' +
            '<div class="site-footer__grid">' +
              '<section class="site-footer__company" aria-labelledby="footer-company-title">' +
                '<a class="site-footer__brand" href="index.html"><img src="images/logo.png" width="64" height="64" alt=""><span id="footer-company-title">Heat Tech <b>Technology</b></span></a>' +
                '<p class="site-footer__description">Industrial heaters and sensors manufacturer based in Vapi, Gujarat.</p>' +
                '<div class="site-footer__socials" aria-label="Verified social media profiles">' +
                  '<a href="https://www.facebook.com/profile.php?id=61576664455164" target="_blank" rel="noopener noreferrer" aria-label="Heat Tech Technology on Facebook">' + icon("facebook") + "</a>" +
                  '<a href="https://x.com/heattech1972" target="_blank" rel="noopener noreferrer" aria-label="Heat Tech Technology on X">' + icon("x") + "</a>" +
                  '<a href="https://www.instagram.com/heat_tech_technology/" target="_blank" rel="noopener noreferrer" aria-label="Heat Tech Technology on Instagram">' + icon("instagram") + "</a>" +
                "</div>" +
              "</section>" +
              '<nav class="site-footer__links" aria-labelledby="footer-links-title">' +
                '<h2 id="footer-links-title">Quick Links</h2><ul>' +
                  link("Home", "index.html", "home") +
                  link("About Us", "about.html", "about") +
                  link("Products", "products.html", "products") +
                  link("Contact", "contact.html", "pin") +
                  link("Enquiry", "enquiry.html", "mail") +
                "</ul>" +
              "</nav>" +
              '<nav class="site-footer__products" aria-labelledby="footer-products-title">' +
                '<h2 id="footer-products-title">Our Products</h2><ul>' + productLinks + "</ul>" +
              "</nav>" +
              '<section class="site-footer__contact" aria-labelledby="footer-contact-title">' +
                '<h2 id="footer-contact-title">Contact &amp; Location</h2>' +
                '<ul class="site-footer__contact-list">' +
                  '<li><span class="site-footer__icon">' + icon("phone") + '</span><div><span class="site-footer__label">Call our team</span><a href="tel:+919328195206">+91 93281 95206</a><a href="tel:+917016777922">+91 70167 77922</a><a href="tel:+919428704857">+91 94287 04857</a><a href="tel:+919374062751">+91 93740 62751</a></div></li>' +
                  '<li><span class="site-footer__icon">' + icon("mail") + '</span><div><span class="site-footer__label">Email</span><a href="mailto:heattech482@gmail.com">heattech482@gmail.com</a><a href="mailto:singhpriyam8780@gmail.com">singhpriyam8780@gmail.com</a></div></li>' +
                  '<li><span class="site-footer__icon">' + icon("pin") + '</span><div><span class="site-footer__label">Business address</span><a class="site-footer__address" href="https://www.google.com/maps/search/?api=1&amp;query=Globe+Chamber%2C+GIDC%2C+Vapi+396195" target="_blank" rel="noopener noreferrer">26, 1st Floor, Globe Chamber, Opp. Sardar Bhilad Wala Bank, Near V.I.A. Char Rasta, GIDC, Vapi - 396195, Gujarat, India.<span class="site-footer__map-link">Open in Google Maps ' + icon("external") + "</span></a></div></li>" +
                "</ul>" +
              "</section>" +
            "</div>" +
            '<div class="site-footer__bottom"><p>© 2026 Heat Tech Technology. All rights reserved.</p><p>Website Developed by <a href="https://websitedesignvapi.com/" target="_blank" rel="noopener noreferrer">Accurate Management</a></p></div>' +
          "</div>" +
        "</footer>";
    }
  }

  customElements.define("heat-tech-footer", HeatTechFooter);
})();
