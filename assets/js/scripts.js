// Product Showcase Slider
document.addEventListener("DOMContentLoaded", function () {
  const sliderItems = document.querySelectorAll(".slider-item");
  const showcaseImage = document.querySelector(".showcase-image img");

  sliderItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      sliderItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Update showcase image
      const newImageSrc = this.querySelector("img").src;
      showcaseImage.src = newImageSrc;

      // Smooth transition for the image
      showcaseImage.style.opacity = "0";
      setTimeout(() => {
        showcaseImage.style.opacity = "1";
      }, 100);
    });
  });
});
