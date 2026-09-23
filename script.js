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
  const loadSection = (source, targetId, configure) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    fetch(source)
      .then(response => {
        if (!response.ok) throw new Error(`Unable to load ${source}`);
        return response.text();
      })
      .then(data => {
        const doc = new DOMParser().parseFromString(data, "text/html");
        const content = doc.querySelector(`#${targetId}`);
        if (!content) return;
        target.innerHTML = content.innerHTML;
        target.classList.add("home-section-wrapper");
        configure(target);
      })
      .catch(error => console.error(`Error loading ${source}:`, error));
  };

  loadSection("about.html", "about-section", aboutBox => {
    const aboutText = aboutBox.querySelector(".about-text");
    if (!aboutText) return;

    aboutText.querySelectorAll("p").forEach((paragraph, index) => {
      if (index > 0) paragraph.classList.add("about-preview-extra");
    });

    const readMoreContainer = document.createElement("div");
    readMoreContainer.className = "read-more-container";
    readMoreContainer.innerHTML = '<a href="about.html" class="read-more">Read More →</a>';
    aboutText.appendChild(readMoreContainer);
  });

  loadSection("education.html", "education", educationBox => {
    const section = educationBox.querySelector(".education-box");
    const readMoreContainer = document.createElement("div");
    readMoreContainer.className = "read-more-container";
    readMoreContainer.innerHTML = '<a href="education.html" class="read-more">Read More →</a>';

    if (section) section.appendChild(readMoreContainer);
    else educationBox.appendChild(readMoreContainer);
  });

  loadSection("experiences.html", "experiences", experiencesBox => {
    const section = experiencesBox.querySelector(".experiences-box");
    if (!section) return;

    const experienceItems = section.querySelectorAll(".experience-item");
    experienceItems.forEach((item, index) => {
      if (index >= 2) item.classList.add("experience-preview-extra");
    });

    const readMoreContainer = document.createElement("div");
    readMoreContainer.className = "read-more-container";
    readMoreContainer.innerHTML = '<a href="experiences.html" class="read-more">Read More →</a>';
    section.appendChild(readMoreContainer);
  });
}
