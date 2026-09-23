document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      const hamIcon = this.querySelector('.hamburger-icon');
      const crossIcon = this.querySelector('.cross-icon');
      if (hamIcon.style.display === "none") {
        hamIcon.style.display = "inline-block";
        menu.style.display = "none";
        crossIcon.style.display = "none";
      } else {
        crossIcon.style.display = "inline-block";
        hamIcon.style.display = "none";
        menu.style.display = "block";
      }
    });
  }

  // Highlight the active navigation link based on the current page.
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".menu-list a");
  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Background animation.
  if (typeof particlesJS === "function" && document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 120, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1, direction: "none", out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, resize: true },
        modes: { repulse: { distance: 100 } }
      },
      retina_detect: true
    });
  }
});

// Load a compact About preview and the full Education preview on the home page.
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  const aboutBox = document.getElementById("about-section");

  if (aboutBox) {
    fetch("about.html")
      .then(response => response.text())
      .then(data => {
        const doc = new DOMParser().parseFromString(data, "text/html");
        const aboutContent = doc.querySelector("#about-main");
        if (!aboutContent) return;

        aboutBox.innerHTML = aboutContent.innerHTML;
        aboutBox.classList.add("home-section-wrapper");

        const aboutText = aboutBox.querySelector(".about-text");
        if (aboutText) {
          const paragraphs = aboutText.querySelectorAll("p");
          paragraphs.forEach((paragraph, index) => {
            if (index > 0) paragraph.classList.add("about-preview-extra");
          });

          const readMoreContainer = document.createElement("div");
          readMoreContainer.className = "read-more-container";
          readMoreContainer.innerHTML = '<a href="about.html" class="read-more">Read More →</a>';
          aboutText.appendChild(readMoreContainer);
        }
      })
      .catch(error => console.error("Error loading About section:", error));
  }

  const educationBox = document.getElementById("education");
  if (educationBox) {
    fetch("education.html")
      .then(response => response.text())
      .then(data => {
        const doc = new DOMParser().parseFromString(data, "text/html");
        const educationContent = doc.querySelector("#education");
        if (!educationContent) return;

        educationBox.innerHTML = educationContent.innerHTML;
        educationBox.classList.add("home-section-wrapper");

        const section = educationBox.querySelector(".education-box");
        const readMoreContainer = document.createElement("div");
        readMoreContainer.className = "read-more-container";
        readMoreContainer.innerHTML = '<a href="education.html" class="read-more">Read More →</a>';

        if (section) section.appendChild(readMoreContainer);
        else educationBox.appendChild(readMoreContainer);
      })
      .catch(error => console.error("Error loading Education section:", error));
  }
}
