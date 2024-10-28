document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const gap = 32; // 2rem gap

  function updateCarousel() {
    const containerWidth =
      document.querySelector(".carousel-wrapper").offsetWidth;
    let visibleItems = 3;

    // Determine number of visible items based on screen width
    if (window.innerWidth <= 480) {
      visibleItems = 1;
    } else if (window.innerWidth <= 768) {
      visibleItems = 2;
    }

    const itemWidth =
      (containerWidth - gap * (visibleItems - 1)) / visibleItems;

    // Update item widths
    items.forEach((item) => {
      item.style.width = `${itemWidth}px`;
    });

    // Remove existing clones
    const clones = carousel.querySelectorAll(".carousel-item-clone");
    clones.forEach((clone) => clone.remove());

    // Add new clones
    for (let i = 0; i < visibleItems; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add("carousel-item-clone");
      carousel.appendChild(clone);
    }

    // Reset position
    currentIndex = 0;
    carousel.style.transform = `translateX(0)`;

    return itemWidth;
  }

  let currentIndex = 0;
  let itemWidth = updateCarousel();

  function slideCarousel() {
    currentIndex++;
    const slideMove = -(itemWidth + gap);
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(${currentIndex * slideMove}px)`;

    if (currentIndex >= items.length) {
      setTimeout(() => {
        currentIndex = 0;
        carousel.style.transition = "none";
        carousel.style.transform = `translateX(0)`;
      }, 500);
    }
  }

  let carouselInterval = setInterval(slideCarousel, 3000);

  const carouselWrapper = document.querySelector(".carousel-wrapper");
  carouselWrapper.addEventListener("mouseenter", () => {
    clearInterval(carouselInterval);
  });

  carouselWrapper.addEventListener("mouseleave", () => {
    carouselInterval = setInterval(slideCarousel, 3000);
  });

  // Update carousel on window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      itemWidth = updateCarousel();
    }, 250);
  });
});
