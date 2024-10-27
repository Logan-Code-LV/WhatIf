document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const itemWidth = items[0].offsetWidth;
  const gap = 32; // 2rem gap
  const visibleItems = 3; // Number of items visible at once

  // Calculate the position to move for each slide
  const slideMove = -(itemWidth + gap);
  let currentIndex = 0;

  // Clone enough items from the start and append them to the end
  // This ensures we always have enough items visible
  for (let i = 0; i < visibleItems; i++) {
    const clone = items[i].cloneNode(true);
    carousel.appendChild(clone);
  }

  function slideCarousel() {
    currentIndex++;

    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(${currentIndex * slideMove}px)`;

    // When we reach the original last item
    if (currentIndex >= items.length) {
      // After the transition ends, quietly reset to the first real item
      setTimeout(() => {
        currentIndex = 0;
        carousel.style.transition = "none";
        carousel.style.transform = `translateX(0)`;
      }, 500); // Match this to your transition duration
    }
  }

  // Set up the interval for automatic rotation
  let carouselInterval = setInterval(slideCarousel, 3000);

  // Pause on hover
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  carouselWrapper.addEventListener("mouseenter", () => {
    clearInterval(carouselInterval);
  });

  carouselWrapper.addEventListener("mouseleave", () => {
    carouselInterval = setInterval(slideCarousel, 3000);
  });

  // Ensure the carousel wrapper shows only three items
  carouselWrapper.style.width = `${
    itemWidth * visibleItems + gap * (visibleItems - 1)
  }px`;
  carouselWrapper.style.margin = "0 auto";
});
