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

// Vendors Section
document.addEventListener("DOMContentLoaded", function () {
  // Apply background images to vendor cards
  const vendorCards = document.querySelectorAll(".vendor-card");
  vendorCards.forEach((card) => {
    const bgImage = card.getAttribute("data-bg-image");
    if (bgImage) {
      card.style.backgroundImage = `url(${bgImage})`;
    }
  });

  // Category switching functionality
  const vendorCategoryButtons = document.querySelectorAll(
    ".vendors-section .category-btn"
  );

  vendorCategoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      vendorCategoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      // Add animation for category switch
      vendorCards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 300);
      });
    });
  });

  // Carousel functionality
  const carousel = document.querySelector(".vendor-carousel");
  const cardsContainer = carousel.querySelector(".vendor-cards");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");

  let currentPosition = 0;
  const cardWidth = 330; // Width of each vendor card including margins
  const cardsPerView = Math.floor(carousel.offsetWidth / cardWidth);
  const maxPosition = Math.max(
    0,
    (vendorCards.length - cardsPerView) * cardWidth
  );

  // Function to update button states
  function updateButtons() {
    prevBtn.disabled = currentPosition <= 0;
    nextBtn.disabled = currentPosition >= maxPosition;
  }

  // Previous button click handler
  prevBtn.addEventListener("click", () => {
    if (currentPosition > 0) {
      currentPosition = Math.max(0, currentPosition - cardWidth);
      cardsContainer.style.transform = `translateX(-${currentPosition}px)`;
      updateButtons();
    }
  });

  // Next button click handler
  nextBtn.addEventListener("click", () => {
    if (currentPosition < maxPosition) {
      currentPosition = Math.min(maxPosition, currentPosition + cardWidth);
      cardsContainer.style.transform = `translateX(-${currentPosition}px)`;
      updateButtons();
    }
  });

  // Initialize button states
  updateButtons();

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newCardsPerView = Math.floor(carousel.offsetWidth / cardWidth);
      const newMaxPosition = Math.max(
        0,
        (vendorCards.length - newCardsPerView) * cardWidth
      );

      // Reset position if needed
      if (currentPosition > newMaxPosition) {
        currentPosition = newMaxPosition;
        cardsContainer.style.transform = `translateX(-${currentPosition}px)`;
      }

      updateButtons();
    }, 200);
  });

  // Add hover effects for vendor cards
  vendorCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.transition = "transform 0.3s ease";
    });
  });
});

// New Products Section
document.addEventListener("DOMContentLoaded", function () {
  // Initialize product state
  const products = new Map();
  const productCards = document.querySelectorAll(".new-products .product-card");

  productCards.forEach((card) => {
    const productId =
      card.dataset.productId || Math.random().toString(36).substr(2, 9);
    products.set(productId, {
      isFavorite: false,
      inCart: false,
      price: card.querySelector(".price").textContent,
      name: card.querySelector("h3").textContent,
    });

    // Add product ID to the card
    card.dataset.productId = productId;
  });

  // Favorite button functionality
  const favoriteButtons = document.querySelectorAll(
    ".new-products .favorite-btn"
  );
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = button.closest(".product-card").dataset.productId;
      const product = products.get(productId);

      // Toggle favorite state
      product.isFavorite = !product.isFavorite;

      // Update icon
      const icon = button.querySelector("i");
      icon.classList.toggle("far");
      icon.classList.toggle("fas");

      // Add heart animation
      button.classList.add("favorite-animation");
      setTimeout(() => {
        button.classList.remove("favorite-animation");
      }, 600);

      // Show feedback tooltip
      const message = product.isFavorite
        ? "Added to wishlist"
        : "Removed from wishlist";
      showTooltip(button, message, false);

      // Remove tooltip after delay
      setTimeout(() => {
        hideTooltip(button);
      }, 2000);
    });

    // Add hover events
    button.addEventListener("mouseenter", () => {
      if (!button.querySelector(".product-tooltip.show")) {
        const isFavorite = button.querySelector("i").classList.contains("fas");
        const message = isFavorite
          ? "Remove from favorites"
          : "Add to favorites";
        showTooltip(button, message, false);
      }
    });

    button.addEventListener("mouseleave", () => {
      if (!button.classList.contains("favorite-animation")) {
        hideTooltip(button);
      }
    });
  });

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll(
    ".new-products .add-to-cart"
  );
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productCard = button.closest(".product-card");
      const productId = productCard.dataset.productId;
      const product = products.get(productId);

      // Toggle cart state
      product.inCart = !product.inCart;

      // Add click animation
      button.style.transform = "scale(0.9)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 200);

      // Show success animation
      const icon = button.querySelector("i");
      icon.classList.remove("fa-shopping-cart");
      icon.classList.add(product.inCart ? "fa-check" : "fa-times");

      // Create and animate cart notification if adding to cart
      if (product.inCart) {
        showCartNotification(productCard);
      }

      // Show feedback tooltip
      showTooltip(
        button,
        product.inCart ? "Added to cart" : "Removed from cart",
        true
      );

      // Remove tooltip after delay
      setTimeout(() => {
        hideTooltip(button);
      }, 2000);

      // Reset icon after delay
      setTimeout(() => {
        icon.classList.remove(product.inCart ? "fa-check" : "fa-times");
        icon.classList.add("fa-shopping-cart");
      }, 1500);
    });

    // Add hover events
    button.addEventListener("mouseenter", () => {
      if (!button.querySelector(".cart-tooltip.show")) {
        const productId = button.closest(".product-card").dataset.productId;
        const product = products.get(productId);
        const message = product.inCart ? "Remove from cart" : "Add to cart";
        showTooltip(button, message, true);
      }
    });

    button.addEventListener("mouseleave", () => {
      if (
        !button.querySelector("i").classList.contains("fa-check") &&
        !button.querySelector("i").classList.contains("fa-times")
      ) {
        hideTooltip(button);
      }
    });
  });

  // Add hover effect for product cards
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
});

// Designer Tables Section
document.addEventListener("DOMContentLoaded", function () {
  // Initialize product state for designer tables
  const designerProducts = new Map();
  const tableCards = document.querySelectorAll(".table-card");

  tableCards.forEach((card) => {
    const productId =
      card.dataset.productId || Math.random().toString(36).substr(2, 9);
    designerProducts.set(productId, {
      isFavorite: false,
      inCart: false,
      price: card.querySelector(".price").textContent,
      name: card.querySelector("h3").textContent,
    });

    // Add product ID to the card
    card.dataset.productId = productId;
  });

  // Category switching functionality
  const categoryButtons = document.querySelectorAll(
    ".table-categories .category-btn"
  );

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter tables based on category
      const category = button.textContent.toLowerCase();
      tableCards.forEach((card) => {
        card.style.opacity = "0";
        setTimeout(() => {
          card.style.opacity = "1";
        }, 300);
      });
    });
  });

  // Carousel functionality
  const carousel = document.querySelector(".table-carousel");
  const cardsContainer = carousel.querySelector(".table-cards");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");

  let currentPosition = 0;
  const cardWidth = 330;
  const visibleCards = Math.floor(cardsContainer.offsetWidth / cardWidth);
  const maxPosition = (tableCards.length - visibleCards) * cardWidth;

  function updateButtons() {
    prevBtn.style.opacity = currentPosition === 0 ? "0.5" : "1";
    nextBtn.style.opacity = currentPosition >= maxPosition ? "0.5" : "1";
    prevBtn.style.pointerEvents = currentPosition === 0 ? "none" : "auto";
    nextBtn.style.pointerEvents =
      currentPosition >= maxPosition ? "none" : "auto";
  }

  updateButtons();

  prevBtn.addEventListener("click", () => {
    if (currentPosition > 0) {
      currentPosition = Math.max(currentPosition - cardWidth, 0);
      cardsContainer.style.transform = `translateX(-${currentPosition}px)`;
      cardsContainer.style.transition = "transform 0.3s ease-in-out";
      updateButtons();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPosition < maxPosition) {
      currentPosition = Math.min(currentPosition + cardWidth, maxPosition);
      cardsContainer.style.transform = `translateX(-${currentPosition}px)`;
      cardsContainer.style.transition = "transform 0.3s ease-in-out";
      updateButtons();
    }
  });

  cardsContainer.style.transition = "transform 0.3s ease-in-out";

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      currentPosition = 0;
      cardsContainer.style.transform = `translateX(0)`;
      const newVisibleCards = Math.floor(
        cardsContainer.offsetWidth / cardWidth
      );
      maxPosition = (tableCards.length - newVisibleCards) * cardWidth;
      updateButtons();
    }, 200);
  });

  // Add favorite functionality with tooltips
  const favoriteButtons = document.querySelectorAll(
    ".table-card .favorite-btn"
  );
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = button.closest(".table-card").dataset.productId;
      const product = designerProducts.get(productId);

      // Toggle favorite state
      product.isFavorite = !product.isFavorite;

      // Update icon
      const icon = button.querySelector("i");
      icon.classList.toggle("far");
      icon.classList.toggle("fas");

      // Add heart animation
      button.classList.add("favorite-animation");
      setTimeout(() => {
        button.classList.remove("favorite-animation");
      }, 600);

      // Show feedback tooltip
      const message = product.isFavorite
        ? "Added to wishlist"
        : "Removed from wishlist";
      showTooltip(button, message, false);

      // Remove tooltip after delay
      setTimeout(() => {
        hideTooltip(button);
      }, 2000);
    });

    // Add hover events
    button.addEventListener("mouseenter", () => {
      if (!button.querySelector(".product-tooltip.show")) {
        const isFavorite = button.querySelector("i").classList.contains("fas");
        const message = isFavorite
          ? "Remove from favorites"
          : "Add to favorites";
        showTooltip(button, message, false);
      }
    });

    button.addEventListener("mouseleave", () => {
      if (!button.classList.contains("favorite-animation")) {
        hideTooltip(button);
      }
    });
  });

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll(
    ".new-products .add-to-cart, .table-card .add-to-cart"
  );
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productCard = button.closest(".product-card, .table-card");
      const productId = productCard.dataset.productId;
      const product = productCard.closest(".new-products")
        ? products.get(productId)
        : designerProducts.get(productId);

      // Toggle cart state
      product.inCart = !product.inCart;

      // Add click animation
      button.style.transform = "scale(0.9)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 200);

      // Show success/remove animation
      const icon = button.querySelector("i");
      const currentIcon = icon.classList.contains("fa-shopping-cart")
        ? "fa-shopping-cart"
        : icon.classList.contains("fa-check")
        ? "fa-check"
        : "fa-times";
      icon.classList.remove(currentIcon);
      icon.classList.add(product.inCart ? "fa-check" : "fa-times");

      // Create and animate cart notification if adding to cart
      if (product.inCart) {
        showCartNotification(productCard);
      }

      // Show feedback tooltip
      showTooltip(
        button,
        product.inCart ? "Added to cart" : "Removed from cart",
        true
      );

      // Remove tooltip after delay
      setTimeout(() => {
        hideTooltip(button);
      }, 2000);

      // Reset icon after delay
      setTimeout(() => {
        const currentIcon = icon.classList.contains("fa-check")
          ? "fa-check"
          : "fa-times";
        icon.classList.remove(currentIcon);
        icon.classList.add("fa-shopping-cart");
      }, 1500);
    });

    // Add hover events
    button.addEventListener("mouseenter", () => {
      if (!button.querySelector(".cart-tooltip.show")) {
        const productCard = button.closest(".product-card, .table-card");
        const productId = productCard.dataset.productId;
        const product = productCard.closest(".new-products")
          ? products.get(productId)
          : designerProducts.get(productId);
        const message = product.inCart ? "Remove from cart" : "Add to cart";
        showTooltip(button, message, true);
      }
    });

    button.addEventListener("mouseleave", () => {
      if (
        !button.querySelector("i").classList.contains("fa-check") &&
        !button.querySelector("i").classList.contains("fa-times")
      ) {
        hideTooltip(button);
      }
    });
  });
});

// Shared tooltip and notification functions
function showTooltip(button, message, isCart = false) {
  let tooltip = button.querySelector(
    isCart ? ".cart-tooltip" : ".product-tooltip"
  );

  if (tooltip) {
    tooltip.textContent = message;
  } else {
    tooltip = document.createElement("div");
    tooltip.className = isCart ? "cart-tooltip" : "product-tooltip";
    tooltip.textContent = message;
    button.appendChild(tooltip);
  }

  tooltip.classList.add("show");
}

function hideTooltip(button) {
  const tooltip = button.querySelector(".product-tooltip, .cart-tooltip");
  if (tooltip) {
    tooltip.classList.remove("show");
  }
}

function showCartNotification(productCard) {
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.innerHTML = '<i class="fas fa-shopping-cart"></i>';

  // Add to DOM
  document.body.appendChild(notification);

  // Get positions for animation
  const startRect = productCard.getBoundingClientRect();
  const cartIcon = document.querySelector(".user-actions .cart");
  const endRect = cartIcon.getBoundingClientRect();

  // Set start position
  notification.style.top = `${startRect.top + startRect.height / 2}px`;
  notification.style.left = `${startRect.left + startRect.width / 2}px`;

  // Trigger animation
  setTimeout(() => {
    notification.style.top = `${endRect.top + endRect.height / 2}px`;
    notification.style.left = `${endRect.left + endRect.width / 2}px`;
    notification.style.transform = "scale(0)";

    // Remove notification after animation
    setTimeout(() => notification.remove(), 500);
  }, 10);
}
// Header functionality
document.addEventListener("DOMContentLoaded", function () {
  // Language selector functionality
  const languageSelector = document.querySelector(".language-selector");
  const languageDropdown = document.querySelector(".language-dropdown");
  const selectedLang = document.querySelector(".language-selector span");

  // Handle language selection
  document.querySelectorAll(".language-dropdown a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const lang = this.getAttribute("data-lang");
      selectedLang.textContent = lang.toUpperCase();
      // Add logic here to change the website language
    });
  });

  // Close language dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!languageSelector.contains(e.target)) {
      languageDropdown.style.display = "none";
    }
  });

  // Search functionality
  const searchForms = document.querySelectorAll(
    ".search-container, .search-bar"
  );

  searchForms.forEach((form) => {
    const searchInput = form.querySelector('input[type="text"]');
    const searchButton = form.querySelector('button[type="submit"]');

    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      handleSearch(searchInput.value);
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch(this.value);
      }
    });
  });

  function handleSearch(query) {
    if (query.trim()) {
      // Add your search logic here
      console.log("Searching for:", query);
      // You can redirect to search results page or show results in a dropdown
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  }

  // Category select functionality
  const categorySelect = document.querySelector(".category-select select");

  // Populate categories (you can replace with your actual categories)
  const categories = [
    "All categories",
    "Fruits & Vegetables",
    "Meat & Fish",
    "Dairy & Eggs",
    "Beverages",
    "Snacks",
    "Household",
  ];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.toLowerCase().replace(/\s+/g, "-");
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  // Mobile menu functionality (if needed)
  // Add mobile menu toggle button and functionality here
});
