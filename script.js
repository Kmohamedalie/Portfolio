document.addEventListener("DOMContentLoaded", function () {
  // Burger menu functionality
  const burger = document.querySelector(".burger-menu");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", function () {
    // Toggle navigation
    burger.classList.toggle("active");
    nav.classList.toggle("active");

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Update aria-expanded state
    const isExpanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", !isExpanded);
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInside =
      burger.contains(event.target) || nav.contains(event.target);

    if (!isClickInside && nav.classList.contains("active")) {
      burger.classList.remove("active");
      nav.classList.remove("active");

      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    }
  });

  // Modal functionality
  const modal = document.getElementById("contact-modal");
  const contactLinks = document.querySelectorAll('a[href="#contact"]');
  const closeButton = document.querySelector(".close-button");

  // Open modal when clicking contact links
  contactLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "block";
      document.body.classList.add("modal-open");
    });
  });

  // Close modal when clicking close button
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#contact") {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Make burger menu keyboard accessible
  burger.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });

  // Update copyright year automatically
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
