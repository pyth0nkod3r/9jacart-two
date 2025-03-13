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
