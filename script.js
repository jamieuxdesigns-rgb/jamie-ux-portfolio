// ===== Back to Top Button =====
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 400 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ===== Contact Form =====
const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");
if (success) success.style.display = "none";

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        success.style.display = "block";
        form.reset();
        setTimeout(() => success.style.display = "none", 5000);
      }
    })
    .catch(console.error);
  });
}


// ===== Fade Up Animation (existing sections) =====
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-up");

  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add("visible");
  });

  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.9;
    fadeEls.forEach((el, i) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom && !el.classList.contains("visible")) {
        setTimeout(() => el.classList.add("visible"), i * 100);
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});


// ===== Smooth Scroll for Nav & Footer Links =====
const navLinks = document.querySelectorAll(".nav-link");
const footerLinks = document.querySelectorAll(".footer-link");
const sections = document.querySelectorAll("section");
const navbar = document.querySelector(".navbar");
const navbarHeight = navbar ? navbar.offsetHeight : 0;

function fastScroll(link) {
  const targetID = link.getAttribute("href");
  if (!targetID.startsWith("#")) return;

  const target = document.querySelector(targetID);
  if (target) {
    const offsetTop = target.offsetTop - navbarHeight + 5;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
  }
}

[...navLinks, ...footerLinks].forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    fastScroll(link);
  });
});


// ===== Active Nav Link on Scroll =====
function setActiveNav() {
  const scrollPos = window.scrollY + navbarHeight + 50;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const navLink = document.querySelector(`.nav-link[href="#${section.id}"]`);

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("DOMContentLoaded", setActiveNav);
setActiveNav();


// ===== Active Footer Link on Scroll =====
function setFooterActive() {
  const scrollPos = window.scrollY + navbarHeight + 50;

  sections.forEach(section => {
    footerLinks.forEach(link => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        if (scrollPos >= target.offsetTop && scrollPos < target.offsetTop + target.offsetHeight) {
          footerLinks.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  });
}

window.addEventListener("scroll", setFooterActive);
window.addEventListener("DOMContentLoaded", setFooterActive);
setFooterActive();


// ===================================================
// ===== NEW: Project Card Scroll-In Animation =====
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => observer.observe(card));
});

const resumeVideo = document.querySelector('.resume-image');

if (resumeVideo) {
  resumeVideo.pause(); // start paused

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resumeVideo.play().catch(e => console.log(e)); // play only when visible
          observer.unobserve(entry.target); // stop observing
        }
      });
    },
    { threshold: 0.5 } // 50% visible
  );

  observer.observe(resumeVideo);
}

document.querySelectorAll(".slider").forEach(slider => {
  const images = slider.querySelectorAll(".slide-images img");
  let index = 0;

  function showImage(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
  }

  slider.querySelector(".left").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  slider.querySelector(".right").addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage(index);
  });
});
