(function () {
  "use strict";

  var whatsappNumber = "917016777922";
  var forms = document.querySelectorAll("form[data-whatsapp-enquiry]");

  function value(form, name) {
    var field = form.querySelector('[name="' + name + '"]');
    return field ? field.value.trim() : "";
  }

  function makeMessage(form) {
    var product = value(form, "product") || form.getAttribute("data-product-context") || "";
    var requestedProduct = new URLSearchParams(window.location.search).get("product");
    if (!product && requestedProduct) {
      product = requestedProduct;
    }

    return [
      "Hello Heat Tech Technology,",
      "",
      "I would like to enquire about your industrial heating products.",
      "",
      "Name: " + value(form, "name"),
      "Company: " + (value(form, "company") || "Not provided"),
      "Phone: " + value(form, "phone"),
      "Email: " + (value(form, "email") || "Not provided"),
      "Product / Requirement: " + product,
      "",
      "Message:",
      value(form, "message"),
      "",
      "Please contact me regarding my requirement.",
      "",
      "Thank you."
    ].join("\n");
  }

  forms.forEach(function (form) {
    var phone = form.querySelector('[name="phone"]');
    var submit = form.querySelector('[type="submit"]');
    var status = form.querySelector("[data-whatsapp-status]");
    var fallback = form.querySelector("[data-whatsapp-fallback]");

    if (fallback) {
      fallback.href = "https://wa.me/" + whatsappNumber;
    }

    if (phone) {
      phone.addEventListener("input", function () {
        phone.setCustomValidity("");
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (form.dataset.whatsappOpening === "true") {
        return;
      }

      if (phone) {
        var digits = phone.value.replace(/\D/g, "");
        var validPhone = /^\+?[0-9\s().-]{7,30}$/.test(phone.value.trim()) && digits.length >= 7;
        phone.setCustomValidity(validPhone ? "" : "Enter a valid phone number with at least 7 digits.");
      }

      if (!form.reportValidity()) {
        return;
      }

      var url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(makeMessage(form));
      form.dataset.whatsappOpening = "true";
      if (submit) {
        submit.disabled = true;
      }
      if (fallback) {
        fallback.href = url;
        fallback.hidden = true;
      }
      if (status) {
        status.textContent = "";
      }

      var whatsappWindow = window.open(url, "_blank");
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        if (status) {
          status.textContent = "WhatsApp opened in a new tab. Review your message there and press Send to complete your enquiry.";
        }
      } else {
        if (status) {
          status.textContent = "WhatsApp could not be opened automatically. Use the link below to open WhatsApp Web or the app.";
        }
        if (fallback) {
          fallback.hidden = false;
        }
      }

      window.setTimeout(function () {
        form.dataset.whatsappOpening = "false";
        if (submit) {
          submit.disabled = false;
        }
      }, 1800);
    });
  });
})();
