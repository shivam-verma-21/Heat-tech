(function () {
  "use strict";

  var slides = [
    {
      eyebrow: "Heat Tech Technology · Vapi, Gujarat",
      title: "Industrial heaters built around your process.",
      description: "We manufacture industrial heaters and sensors for heating requirements across a range of applications.",
      image: "images/product/tubular_heater.png",
      imageSize: [491, 325],
      imageAlt: "Tubular industrial heater product from Heat Tech Technology",
      caption: "Industrial heating products",
      primary: "Explore Products",
      primaryHref: "products.html",
      secondary: "Send an Enquiry",
      secondaryHref: "enquiry.html"
    },
    {
      eyebrow: "Mica Band Heaters",
      title: "Reliable heating for demanding industrial applications.",
      description: "Explore our mica band heater solutions for industrial heating requirements.",
      image: "images/product/mica_band_heater.png",
      imageSize: [555, 449],
      imageAlt: "Mica band heater product",
      caption: "Mica band heater",
      primary: "Explore Mica Band Heaters",
      primaryHref: "mica-band-heater.html",
      secondary: "Get a Quote",
      secondaryHref: "enquiry.html?product=Mica%20Band%20Heater"
    },
    {
      eyebrow: "Tubular Heaters",
      title: "Engineered heating solutions for industrial applications.",
      description: "Discover tubular heating solutions designed for different industrial requirements.",
      image: "images/product/tubular_heater.png",
      imageSize: [491, 325],
      imageAlt: "Tubular industrial heater product",
      caption: "Tubular heater",
      primary: "Explore Tubular Heaters",
      primaryHref: "tubular-heater.html",
      secondary: "Enquire Now",
      secondaryHref: "enquiry.html?product=Tubular%20Heater"
    },
    {
      eyebrow: "Ceramic Heating Solutions",
      title: "Efficient heating solutions for industrial processes.",
      description: "Discover ceramic heater solutions for suitable industrial heating applications.",
      image: "images/product/ceramic_heater.png",
      imageSize: [502, 497],
      imageAlt: "Ceramic power saver heater product",
      caption: "Ceramic heater",
      primary: "Explore Ceramic Heaters",
      primaryHref: "ceramic-heater.html",
      secondary: "Contact Us",
      secondaryHref: "contact.html"
    },
    {
      eyebrow: "Custom Industrial Heating & Sensors",
      title: "Looking for a specific heating solution?",
      description: "Connect with Heat Tech Technology for your industrial heater and temperature sensor requirements.",
      image: "images/product/thermocouple_sensor.png",
      imageSize: [482, 517],
      imageAlt: "Thermocouple and temperature sensor product",
      caption: "Temperature sensing products",
      primary: "Discuss Your Requirement",
      primaryHref: "enquiry.html?product=Thermocouple%20%26%20Sensor",
      secondary: "WhatsApp Us",
      secondaryHref: "https://wa.me/917016777922?text=Hello%20Heat%20Tech%20Technology%2C%20I%20would%20like%20to%20discuss%20an%20industrial%20heating%20or%20temperature%20sensor%20requirement."
    }
  ];

  function arrowIcon(direction) {
    var path = direction === "previous" ? "M14 3 6 8l8 5" : "m6 3 8 5-8 5";
    return '<svg viewBox="0 0 20 16" aria-hidden="true"><path d="' + path + '"></path></svg>';
  }

  class HeatTechHeroCarousel extends HTMLElement {
    connectedCallback() {
      if (this.hasAttribute("data-ready")) {
        return;
      }

      this.setAttribute("data-ready", "");
      this.innerHTML =
        '<div class="container home-hero__container">' +
          '<div class="home-hero__layout">' +
            '<div class="home-hero__copy" aria-live="off">' +
              '<p class="eyebrow" data-eyebrow></p><h1 data-title></h1>' +
              '<p class="home-hero__description" data-description></p>' +
              '<div class="hero-actions"><a class="btn btn-primary" data-primary></a><a class="btn btn-outline-light" data-secondary></a></div>' +
              '<p class="home-hero__note">Established in 2017 · Based in GIDC, Vapi</p>' +
            '</div>' +
            '<div class="home-hero__visual"><figure class="home-hero__figure"><div class="home-hero__image-frame"><img width="491" height="325" fetchpriority="high" alt=""></div><figcaption class="home-hero__caption"></figcaption></figure></div>' +
          '</div>' +
          '<div class="home-hero__controls" role="group" aria-label="Hero carousel controls">' +
            '<button class="home-hero__arrow" type="button" data-action="previous" aria-label="Previous slide">' + arrowIcon("previous") + '</button>' +
            '<div class="home-hero__dots" role="group" aria-label="Choose a slide"></div>' +
            '<span class="home-hero__counter" aria-hidden="true"></span>' +
            '<button class="home-hero__rotation" type="button" data-action="rotation" aria-label="Pause automatic slide rotation"><span aria-hidden="true">Ⅱ</span></button>' +
            '<button class="home-hero__arrow" type="button" data-action="next" aria-label="Next slide">' + arrowIcon("next") + '</button>' +
          '</div>' +
        '</div>';

      this.copy = this.querySelector(".home-hero__copy");
      this.eyebrow = this.querySelector("[data-eyebrow]");
      this.heading = this.querySelector("[data-title]");
      this.description = this.querySelector("[data-description]");
      this.image = this.querySelector(".home-hero__image-frame img");
      this.caption = this.querySelector(".home-hero__caption");
      this.primary = this.querySelector("[data-primary]");
      this.secondary = this.querySelector("[data-secondary]");
      this.counter = this.querySelector(".home-hero__counter");
      this.rotationButton = this.querySelector('[data-action="rotation"]');
      this.dots = this.querySelector(".home-hero__dots");
      this.currentSlide = 0;
      this.transitionVersion = 0;
      this.rotationTimer = null;
      this.isHovered = false;
      this.hasFocus = false;
      this.isManuallyPaused = false;
      this.preloadedImages = {};
      this.motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

      this.dots.innerHTML = slides.map(function (slide, index) {
        return '<button class="home-hero__dot" type="button" data-slide="' + index +
          '" aria-label="Show slide ' + (index + 1) + ': ' + slide.title +
          '" aria-pressed="' + String(index === 0) + '"><span class="home-hero__sr-only">Slide ' + (index + 1) + '</span></button>';
      }).join("");

      this.updateSlide(slides[0], 0);
      this.preloadImage(1);
      this.updateRotationButton();
      this.scheduleRotation();
      this.addEventListener("click", this.handleClick.bind(this));
      this.addEventListener("keydown", this.handleKeydown.bind(this));
      this.addEventListener("pointerenter", this.handlePointerEnter.bind(this));
      this.addEventListener("pointerleave", this.handlePointerLeave.bind(this));
      this.addEventListener("pointerdown", this.handlePointerDown.bind(this));
      this.addEventListener("pointerup", this.handlePointerUp.bind(this));
      this.addEventListener("pointercancel", this.handlePointerCancel.bind(this));
      this.addEventListener("focusin", this.handleFocusIn.bind(this));
      this.addEventListener("focusout", this.handleFocusOut.bind(this));
      document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));
      if (this.motionPreference.addEventListener) {
        this.motionPreference.addEventListener("change", this.handleMotionChange.bind(this));
      } else if (this.motionPreference.addListener) {
        this.motionPreference.addListener(this.handleMotionChange.bind(this));
      }
    }

    updateSlide(slide, index) {
      this.eyebrow.textContent = slide.eyebrow;
      this.heading.textContent = slide.title;
      this.description.textContent = slide.description;
      this.image.src = slide.image;
      this.image.width = slide.imageSize[0];
      this.image.height = slide.imageSize[1];
      this.image.alt = slide.imageAlt;
      this.caption.textContent = slide.caption;
      this.primary.textContent = slide.primary;
      this.primary.href = slide.primaryHref;
      this.secondary.textContent = slide.secondary;
      this.secondary.href = slide.secondaryHref;
      this.secondary.removeAttribute("target");
      this.secondary.removeAttribute("rel");
      if (slide.secondaryHref.indexOf("https://") === 0) {
        this.secondary.target = "_blank";
        this.secondary.rel = "noopener noreferrer";
      }
      this.counter.textContent = (index + 1) + " / " + slides.length;
      this.dots.querySelectorAll(".home-hero__dot").forEach(function (dot, dotIndex) {
        dot.setAttribute("aria-pressed", String(dotIndex === index));
      });
    }

    preloadImage(index) {
      var slideIndex = index % slides.length;
      if (this.preloadedImages[slideIndex]) {
        return;
      }
      var image = new Image();
      this.preloadedImages[slideIndex] = image;
      image.src = slides[slideIndex].image;
    }

    showSlide(index) {
      var nextIndex = (index + slides.length) % slides.length;
      if (nextIndex === this.currentSlide) {
        return;
      }

      window.clearTimeout(this.rotationTimer);
      this.rotationTimer = null;
      this.currentSlide = nextIndex;
      this.preloadImage(nextIndex + 1);
      var version = ++this.transitionVersion;
      this.copy.classList.add("is-changing");
      this.updateSlide(slides[nextIndex], nextIndex);
      window.requestAnimationFrame(function () {
        if (version !== this.transitionVersion || !this.isConnected) {
          return;
        }
        this.copy.classList.remove("is-changing");
        this.scheduleRotation();
      }.bind(this));
    }

    scheduleRotation() {
      window.clearTimeout(this.rotationTimer);
      this.rotationTimer = null;
      if (this.motionPreference.matches || this.isManuallyPaused || this.isHovered ||
          this.hasFocus || document.hidden) {
        return;
      }
      this.rotationTimer = window.setTimeout(function () {
        this.showSlide(this.currentSlide + 1);
      }.bind(this), 5500);
    }

    updateRotationButton() {
      var reducedMotion = this.motionPreference.matches;
      var paused = this.isManuallyPaused || reducedMotion;
      this.rotationButton.disabled = reducedMotion;
      this.rotationButton.setAttribute("aria-label", reducedMotion
        ? "Automatic rotation is off because reduced motion is enabled"
        : (paused ? "Resume automatic slide rotation" : "Pause automatic slide rotation"));
      this.rotationButton.querySelector("span").textContent = paused ? "▶" : "Ⅱ";
    }

    handleClick(event) {
      var button = event.target.closest("button");
      if (!button || !this.contains(button)) {
        return;
      }
      if (button.hasAttribute("data-slide")) {
        this.showSlide(Number(button.getAttribute("data-slide")));
      } else if (button.dataset.action === "previous") {
        this.showSlide(this.currentSlide - 1);
      } else if (button.dataset.action === "next") {
        this.showSlide(this.currentSlide + 1);
      } else if (button.dataset.action === "rotation") {
        this.isManuallyPaused = !this.isManuallyPaused;
        if (!this.isManuallyPaused) {
          this.hasFocus = false;
        }
        this.updateRotationButton();
        this.scheduleRotation();
      }
    }

    handleKeydown(event) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        this.showSlide(this.currentSlide + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.showSlide(this.currentSlide - 1);
      }
    }

    handlePointerEnter() {
      this.isHovered = true;
      this.scheduleRotation();
    }

    handlePointerLeave() {
      this.isHovered = false;
      this.scheduleRotation();
    }

    handlePointerDown(event) {
      if (event.pointerType === "touch" && !event.target.closest("a, button")) {
        this.touchStartX = event.clientX;
      }
    }

    handlePointerUp(event) {
      if (this.touchStartX === undefined || event.pointerType !== "touch") {
        return;
      }
      var distance = event.clientX - this.touchStartX;
      this.touchStartX = undefined;
      if (Math.abs(distance) > 45) {
        this.showSlide(this.currentSlide + (distance < 0 ? 1 : -1));
      }
    }

    handlePointerCancel() {
      this.touchStartX = undefined;
    }

    handleFocusIn() {
      this.hasFocus = true;
      this.scheduleRotation();
    }

    handleFocusOut(event) {
      if (!this.contains(event.relatedTarget)) {
        this.hasFocus = false;
        this.scheduleRotation();
      }
    }

    handleVisibilityChange() {
      this.scheduleRotation();
    }

    handleMotionChange() {
      this.updateRotationButton();
      this.scheduleRotation();
    }
  }

  customElements.define("heat-tech-hero-carousel", HeatTechHeroCarousel);
})();
