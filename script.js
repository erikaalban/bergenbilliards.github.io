// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    navLinks.classList.remove("active");

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Gallery images
const galleryImages = [
  { src: "pool-table-1.jpg", alt: "Pool Table 1" },
  { src: "pool-table-2.jpg", alt: "Pool Table 2" },
  { src: "pool-table-3.jpg", alt: "Pool Table 3" },
  { src: "facility-1.jpg", alt: "Facility View 1" },
  { src: "facility-2.jpg", alt: "Facility View 2" },
  { src: "tournament.jpg", alt: "Tournament Action" },
];

// Populate gallery
const galleryGrid = document.querySelector(".gallery-grid");
galleryImages.forEach((image) => {
  const imgContainer = document.createElement("div");
  imgContainer.className = "gallery-item";
  imgContainer.innerHTML = `
        <img src="${image.src}" alt="${image.alt}" onerror="this.src='background.jpg'">
    `;
  galleryGrid.appendChild(imgContainer);
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add additional styles for gallery items
const style = document.createElement("style");
style.textContent = `
    .gallery-item {
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .gallery-item:hover {
        transform: scale(1.05);
    }

    .gallery-item img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    section.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
