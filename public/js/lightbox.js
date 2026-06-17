(function () {
  class Lightbox {
    constructor(options = {}) {
      this.options = Object.assign(
        {
          animationDuration: 300,
          closeOnOverlayClick: true,
          rootSelector: "[data-lightbox-root]",
          imageSelector: "img",
          onOpen: null,
          onClose: null,
          onNavigate: null,
        },
        options,
      );

      this.images = [];
      this.currentIndex = 0;
      this.isOpen = false;
      this.zoomLevel = 1;
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.wheelTimer = null;
      this.preloadedImages = {};
      this.isDocumentBound = false;
      this.isOverlayBound = false;

      this.handleDocumentClick = this.handleDocumentClick.bind(this);
      this.handleOverlayClick = this.handleOverlayClick.bind(this);
      this.handlePreviousClick = this.showPreviousImage.bind(this);
      this.handleNextClick = this.showNextImage.bind(this);
      this.handleCloseClick = this.close.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleWheel = this.handleWheel.bind(this);
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchMove = this.handleTouchMove.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);

      this.init();
    }

    init() {
      this.createStyles();
      this.ensureMounted();
      this.bindDocumentEvents();
    }

    createStyles() {
      if (document.getElementById("lb-lightbox-styles")) return;

      const style = document.createElement("style");
      style.id = "lb-lightbox-styles";
      style.textContent = `
        .lb-lightbox-overlay {
          --lb-edge-space: clamp(12px, 3vw, 24px);
          --lb-top-space: calc(env(safe-area-inset-top, 0px) + var(--lb-edge-space));
          --lb-bottom-space: calc(env(safe-area-inset-bottom, 0px) + var(--lb-edge-space));
          --lb-button-size: 50px;
          position: fixed;
          inset: 0;
          background-color: rgb(15 23 42 / 0.24);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity ${this.options.animationDuration}ms ease;
          pointer-events: none;
          z-index: 10000;
        }
        .lb-lightbox-overlay.active {
          pointer-events: auto;
          opacity: 1;
        }
        .lb-lightbox-content-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          padding:
            var(--lb-top-space)
            var(--lb-edge-space)
            var(--lb-bottom-space);
        }
        .lb-lightbox-container {
          width: min(100%, 1400px);
          height: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .lb-lightbox-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          padding-inline: calc(var(--lb-button-size) + var(--lb-edge-space));
        }
        .lb-lightbox-image {
          max-width: 100%;
          max-height: calc(100vh - var(--lb-top-space) - var(--lb-bottom-space));
          height: auto;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition:
            transform ${this.options.animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1),
            opacity ${this.options.animationDuration}ms ease;
          opacity: 0;
        }
        .lb-lightbox-nav,
        .lb-lightbox-close {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.88);
          color: #18181b;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          width: var(--lb-button-size);
          height: var(--lb-button-size);
          font-size: 30px;
          line-height: 1;
          z-index: 2;
          transition: transform 0.2s ease;
        }
        .lb-lightbox-nav:hover,
        .lb-lightbox-close:hover {
          transform: scale(1.06);
        }
        .lb-lightbox-prev {
          left: var(--lb-edge-space);
          top: 50%;
          transform: translateY(-50%);
        }
        .lb-lightbox-next {
          right: var(--lb-edge-space);
          top: 50%;
          transform: translateY(-50%);
        }
        .lb-lightbox-close {
          top: var(--lb-top-space);
          right: var(--lb-edge-space);
        }
        @media (max-width: 768px) {
          .lb-lightbox-content-wrapper {
            --lb-button-size: 44px;
            padding-bottom: calc(var(--lb-bottom-space) + 72px);
          }
          .lb-lightbox-nav,
          .lb-lightbox-close {
            font-size: 20px;
          }
          .lb-lightbox-image-wrapper {
            padding-inline: 0;
          }
          .lb-lightbox-image {
            max-height: calc(100vh - var(--lb-top-space) - var(--lb-bottom-space) - 72px);
          }
          .lb-lightbox-prev,
          .lb-lightbox-next {
            top: auto;
            bottom: var(--lb-bottom-space);
            transform: none;
          }
          .lb-lightbox-prev {
            left: calc(50% - var(--lb-button-size) - 10px);
          }
          .lb-lightbox-next {
            right: calc(50% - var(--lb-button-size) - 10px);
          }
        }
        @media (max-width: 480px) {
          .lb-lightbox-overlay {
            --lb-edge-space: 10px;
          }
          .lb-lightbox-image {
            border-radius: 12px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    createLightbox() {
      this.isOverlayBound = false;
      this.overlay = document.createElement("div");
      this.overlay.className = "lb-lightbox-overlay";

      this.contentWrapper = document.createElement("div");
      this.contentWrapper.className = "lb-lightbox-content-wrapper";

      this.container = document.createElement("div");
      this.container.className = "lb-lightbox-container";

      this.imageWrapper = document.createElement("div");
      this.imageWrapper.className = "lb-lightbox-image-wrapper";

      this.image = document.createElement("img");
      this.image.className = "lb-lightbox-image";

      this.prevButton = document.createElement("button");
      this.prevButton.className = "lb-lightbox-nav lb-lightbox-prev";
      this.prevButton.type = "button";
      this.prevButton.setAttribute("aria-label", "Previous image");
      this.prevButton.innerHTML = "&#10094;";

      this.nextButton = document.createElement("button");
      this.nextButton.className = "lb-lightbox-nav lb-lightbox-next";
      this.nextButton.type = "button";
      this.nextButton.setAttribute("aria-label", "Next image");
      this.nextButton.innerHTML = "&#10095;";

      this.closeButton = document.createElement("button");
      this.closeButton.className = "lb-lightbox-close";
      this.closeButton.type = "button";
      this.closeButton.setAttribute("aria-label", "Close lightbox");
      this.closeButton.innerHTML = "&times;";

      this.imageWrapper.appendChild(this.image);
      this.container.appendChild(this.imageWrapper);
      this.contentWrapper.appendChild(this.container);
      this.contentWrapper.appendChild(this.prevButton);
      this.contentWrapper.appendChild(this.nextButton);
      this.contentWrapper.appendChild(this.closeButton);
      this.overlay.appendChild(this.contentWrapper);

      document.body.appendChild(this.overlay);
    }

    bindDocumentEvents() {
      if (this.isDocumentBound) return;
      document.addEventListener("click", this.handleDocumentClick, true);
      document.addEventListener("keydown", this.handleKeyDown);
      this.isDocumentBound = true;
    }

    bindOverlayEvents() {
      if (!this.overlay || this.isOverlayBound) return;

      this.overlay.addEventListener("click", this.handleOverlayClick);
      this.prevButton.addEventListener("click", this.handlePreviousClick);
      this.nextButton.addEventListener("click", this.handleNextClick);
      this.closeButton.addEventListener("click", this.handleCloseClick);
      this.overlay.addEventListener("wheel", this.handleWheel, {
        passive: false,
      });
      this.overlay.addEventListener("touchstart", this.handleTouchStart, {
        passive: true,
      });
      this.overlay.addEventListener("touchmove", this.handleTouchMove, {
        passive: true,
      });
      this.overlay.addEventListener("touchend", this.handleTouchEnd);

      this.isOverlayBound = true;
    }

    ensureMounted() {
      if (!document.body) return false;

      const isMounted =
        this.overlay &&
        this.overlay.ownerDocument === document &&
        document.body.contains(this.overlay);

      if (isMounted) return true;

      this.createLightbox();
      this.bindOverlayEvents();
      return true;
    }

    syncWithDocument() {
      if (!this.ensureMounted()) return;

      if (!this.overlay.classList.contains("active")) {
        document.body.style.overflow = "";
        this.isOpen = false;
      }
    }

    getImageCollection(clickedImage) {
      const root = clickedImage.closest(this.options.rootSelector);
      if (!root) return [];

      return Array.from(
        root.querySelectorAll(this.options.imageSelector),
      ).filter((img) => img.currentSrc || img.src);
    }

    handleDocumentClick(event) {
      if (this.isOpen) return;

      const clickedImage = event.target.closest("img");
      if (!clickedImage) return;

      const images = this.getImageCollection(clickedImage);
      if (images.length === 0) return;

      const currentIndex = images.indexOf(clickedImage);
      if (currentIndex === -1) return;

      event.preventDefault();
      event.stopPropagation();

      this.images = images;
      this.currentIndex = currentIndex;
      this.open();
    }

    handleOverlayClick(event) {
      if (event.target === this.overlay && this.options.closeOnOverlayClick) {
        this.close();
      }
    }

    handleKeyDown(event) {
      if (!this.isOpen) return;

      switch (event.key) {
        case "ArrowLeft":
          this.showPreviousImage();
          break;
        case "ArrowRight":
          this.showNextImage();
          break;
        case "Escape":
          this.close();
          break;
      }
    }

    handleWheel(event) {
      if (!this.isOpen) return;

      event.preventDefault();

      if (event.ctrlKey || event.metaKey) {
        this.zoomLevel += event.deltaY > 0 ? -0.1 : 0.1;
        this.zoomLevel = Math.max(1, this.zoomLevel);
        this.image.style.transform = `scale(${this.zoomLevel})`;
        return;
      }

      clearTimeout(this.wheelTimer);
      this.wheelTimer = setTimeout(() => {
        const delta = Math.sign(event.deltaY);
        if (delta > 0) {
          this.showNextImage();
        } else if (delta < 0) {
          this.showPreviousImage();
        }
      }, 50);
    }

    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
      this.touchEndX = event.touches[0].clientX;
    }

    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    }

    handleTouchEnd() {
      if (!this.isOpen) return;

      const difference = this.touchStartX - this.touchEndX;
      if (Math.abs(difference) > 50) {
        difference > 0 ? this.showNextImage() : this.showPreviousImage();
      }
    }

    open() {
      if (!this.ensureMounted()) return;

      const activeImage = this.images[this.currentIndex];
      if (!activeImage) return;

      this.isOpen = true;
      this.overlay.classList.add("active");
      document.body.style.overflow = "hidden";
      this.showImage(activeImage);

      if (typeof this.options.onOpen === "function") {
        this.options.onOpen(activeImage, this.currentIndex);
      }
    }

    close() {
      this.overlay.classList.remove("active");
      document.body.style.overflow = "";
      this.isOpen = false;
      this.zoomLevel = 1;
      this.image.style.transform = "scale(1)";
      this.image.style.opacity = "0";
      this.clearPreloadedImages();

      if (typeof this.options.onClose === "function") {
        this.options.onClose();
      }
    }

    showPreviousImage() {
      if (this.currentIndex <= 0) return;

      this.currentIndex -= 1;
      this.showImage(this.images[this.currentIndex]);
      this.resetButtonScale(this.prevButton);
      this.notifyNavigate();
    }

    showNextImage() {
      if (this.currentIndex >= this.images.length - 1) return;

      this.currentIndex += 1;
      this.showImage(this.images[this.currentIndex]);
      this.resetButtonScale(this.nextButton);
      this.notifyNavigate();
    }

    notifyNavigate() {
      if (typeof this.options.onNavigate === "function") {
        this.options.onNavigate(
          this.images[this.currentIndex],
          this.currentIndex,
        );
      }
    }

    resetButtonScale(button) {
      button.style.transform = "scale(1.1)";
      window.setTimeout(() => {
        button.style.transform = "";
      }, 200);
    }

    showImage(imgElement) {
      if (!imgElement) return;

      const imgSrc = imgElement.currentSrc || imgElement.src;
      const imgAlt = imgElement.getAttribute("alt") || "";
      const newImage = new Image();

      newImage.onload = () => {
        this.zoomLevel = 1;
        this.image.style.transform = "scale(1)";
        this.image.style.transition = `opacity ${this.options.animationDuration}ms ease`;
        this.image.src = imgSrc;
        this.image.alt = imgAlt;
        this.image.style.opacity = "1";

        this.preloadImages();
        this.prevButton.style.display =
          this.currentIndex === 0 ? "none" : "block";
        this.nextButton.style.display =
          this.currentIndex === this.images.length - 1 ? "none" : "block";
      };

      newImage.onerror = () => {
        console.error("Failed to load image:", imgSrc);
      };

      newImage.src = imgSrc;
    }

    preloadImages() {
      const preloadIndexes = [this.currentIndex + 1, this.currentIndex - 1];

      preloadIndexes.forEach((index) => {
        if (index < 0 || index >= this.images.length) return;

        const preloadImage = new Image();
        preloadImage.src =
          this.images[index].currentSrc || this.images[index].src;
        this.preloadedImages[index] = preloadImage;
      });
    }

    clearPreloadedImages() {
      Object.values(this.preloadedImages).forEach((image) => {
        image.src = "";
      });
      this.preloadedImages = {};
    }
  }

  let instance = null;

  function setupLightbox(options = {}) {
    if (!instance) {
      instance = new Lightbox(options);
    }

    return instance;
  }

  window.Lightbox = Lightbox;
  window.setupLightbox = setupLightbox;

  const mount = () => {
    if (document.body) {
      setupLightbox().syncWithDocument();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }

  document.addEventListener("astro:page-load", mount);
})();
