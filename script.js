// Run only after HTML is loaded
document.addEventListener("DOMContentLoaded", () => {

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close when clicking link
    document.querySelectorAll("#navLinks .navlink").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove("open");
      }
    });
  }

  // Typing effect
  const roles = [
    "Cybersecurity Specialist",
    "Ethical Hacking Specialist",
    "Networking Support Engineer",
    "IT Support Engineer",
  ];

  const typingText = document.getElementById("typingText");

  if (typingText) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];

      if (!deleting) {
        typingText.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 900);
          return;
        }
      } else {
        typingText.textContent = current.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(typeLoop, deleting ? 45 : 65);
    }

    typeLoop();
  }

  // Skill rings percent
  document.querySelectorAll(".ring").forEach(ring => {
    const pct = Number(ring.getAttribute("data-pct") || "70");
    ring.style.setProperty("--pct", pct);
  });

  // Active nav highlight
  const sections = ["about", "journey", "skills", "projects", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navItems = document.querySelectorAll(".navlink");

  function setActiveNav() {
    let currentId = "";
    const scrollY = window.scrollY + 140;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) {
        currentId = sec.id;
      }
    });

    navItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentId}`
      );
    });
  }

  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  // Contact form
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const message = formData.get("message") || "";

      const subject = encodeURIComponent(`Portfolio Contact - ${name}`);
      const body = encodeURIComponent(
        `From: ${name} (${email})\n\n${message}`
      );

      // FIXED: removed wrong _attachment parameter
      window.location.href =
        `mailto:ayodyasashminda@gmail.com?subject=${subject}&body=${body}`;
    });
  }

});
