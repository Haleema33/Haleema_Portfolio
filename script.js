document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');
  hamburger.addEventListener('click', function () {
    const hamIcon = this.querySelector('.hamburger-icon');
    const crossIcon = this.querySelector('.cross-icon');
    if (hamIcon.style.display === "none") {
      hamIcon.style.display = "inline-block"
      menu.style.display = "none"
      crossIcon.style.display = "none"
    }
    else {
      crossIcon.style.display = "inline-block"
      hamIcon.style.display = "none"
      menu.style.display = "block"
    }
  });

  // Highlight active nav link based on current page URL
  document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop(); // e.g. "about.html"
    const navLinks = document.querySelectorAll(".menu-list a");

    navLinks.forEach(link => {
      const linkPage = link.getAttribute("href");

      // Match current page with nav link
      if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });

  //adding background animation

  particlesJS("particles-js", {
    particles: {
      number: { value: 120, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: { repulse: { distance: 100 } },
    },
    retina_detect: true,
  });
});

//fetching ABOUT page content to Home page
fetch("about.html")
  .then(response => response.text())
  .then(data => {
    // Create a temporary DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    // Extract only the main content (without header/footer)
    const aboutContent = doc.querySelector("#about-main");

    // Inject it into your homepage
    document.getElementById("about-section").innerHTML = aboutContent.innerHTML;
  })
  .catch(error => console.error("Error loading About section:", error));





if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  fetch("education.html")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const aboutContent = doc.querySelector("#education");
      const educationBox = document.getElementById("education");

      if (aboutContent && educationBox) {
        // Copy only the inner content of education.html's #education
        educationBox.innerHTML = aboutContent.innerHTML;

        // ✅ Now, find the section inside educationBox
        const section = educationBox.querySelector(".education-box");

        // Create the "Read More" container
        const readMoreContainer = document.createElement("div");
        readMoreContainer.className = "read-more-container";
        readMoreContainer.innerHTML = `
          <a href="education.html" class="read-more"
             style="display:inline-block;margin-top:15px;color:#00bfff;text-decoration:none;">
             Read More →
          </a>
        `;

        // ✅ Append it INSIDE the section (bottom)
        if (section) {
          section.appendChild(readMoreContainer);
        } else {
          // fallback if section not found
          educationBox.appendChild(readMoreContainer);
        }
      }
    })
    .catch(error => console.error("Error loading Education section:", error));
}
