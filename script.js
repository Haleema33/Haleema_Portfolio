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

  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-list a").forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

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

if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  fetch("about.html")
    .then(response => response.text())
    .then(data => {
      const doc = new DOMParser().parseFromString(data, "text/html");
      const aboutContent = doc.querySelector("#about-main");
      const aboutSection = document.getElementById("about-section");

      if (aboutContent && aboutSection) {
        aboutSection.innerHTML = aboutContent.innerHTML;
      }
    })
    .catch(error => console.error("Error loading About section:", error));

  fetch("education.html")
    .then(response => response.text())
    .then(data => {
      const doc = new DOMParser().parseFromString(data, "text/html");
      const educationContent = doc.querySelector("#education");
      const educationBox = document.getElementById("education");

      if (educationContent && educationBox) {
        educationBox.innerHTML = educationContent.innerHTML;

        const section = educationBox.querySelector(".education-box");
        const readMoreContainer = document.createElement("div");
        readMoreContainer.className = "read-more-container";
        readMoreContainer.innerHTML = '<a href="education.html" class="read-more">Read More →</a>';

        if (section) section.appendChild(readMoreContainer);
        else educationBox.appendChild(readMoreContainer);
      }
    })
    .catch(error => console.error("Error loading Education section:", error));

  fetch("experiences.html")
    .then(response => response.text())
    .then(data => {
      const doc = new DOMParser().parseFromString(data, "text/html");
      const sourceSection = doc.querySelector(".experiences-box");
      const target = document.getElementById("experiences");

      if (!sourceSection || !target) return;

      const previewSection = document.createElement("section");
      previewSection.className = "main-section experiences-box";

      const heading = document.createElement("h2");
      heading.className = "section-title";
      heading.textContent = "Experiences";
      previewSection.appendChild(heading);

      const items = Array.from(sourceSection.querySelectorAll(".experience-item")).slice(0, 2);
      items.forEach(item => {
        previewSection.appendChild(item.cloneNode(true));
      });

      const readMoreContainer = document.createElement("div");
      readMoreContainer.className = "read-more-container";
      readMoreContainer.innerHTML = '<a href="experiences.html" class="read-more">Read More →</a>';
      previewSection.appendChild(readMoreContainer);

      target.innerHTML = "";
      target.appendChild(previewSection);
    })
    .catch(error => console.error("Error loading Experiences preview:", error));
}
