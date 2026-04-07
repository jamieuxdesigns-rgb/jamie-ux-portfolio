// ===============================
// FADE UP ANIMATION
// ===============================
const faders = document.querySelectorAll(".fade-up");

function showFade() {
  const triggerPoint = window.innerHeight * 0.9;
  faders.forEach(el => {
    if (el.getBoundingClientRect().top < triggerPoint) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", showFade);
window.addEventListener("DOMContentLoaded", showFade);

// ===============================
// PROGRESS BAR
// ===============================
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("progress").style.width = progress + "%";
});

// ===============================
// BEFORE / AFTER SLIDER
// ===============================
window.addEventListener("load", () => {
  const container = document.getElementById("compare");
  const slider = document.getElementById("slider");
  const after = document.getElementById("after");
  const beforeImg = container.querySelector("img");
  const afterImg = after.querySelector("img");
  let isDragging = false;

  // Initialize slider after both images load
  function initSlider() {
    const rect = container.getBoundingClientRect();
    const middle = rect.width / 2;
    after.style.width = middle + "px";
    slider.style.left = middle + "px";
  }

  if (beforeImg.complete && afterImg.complete) {
    initSlider();
  } else {
    let loadedCount = 0;
    [beforeImg, afterImg].forEach(img => {
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === 2) initSlider();
      });
    });
  }

  // Move slider helper
  function moveSlider(x) {
    const rect = container.getBoundingClientRect();
    let posX = x - rect.left;
    posX = Math.max(0, Math.min(posX, rect.width));
    after.style.width = posX + "px";
    slider.style.left = posX + "px";
  }

  // Mouse events
  slider.addEventListener("mousedown", () => { isDragging = true; });
  window.addEventListener("mouseup", () => { isDragging = false; });
  window.addEventListener("mousemove", e => { if (isDragging) moveSlider(e.clientX); });

  // Touch events
  slider.addEventListener("touchstart", () => { isDragging = true; });
  window.addEventListener("touchend", () => { isDragging = false; });
  window.addEventListener("touchmove", e => {
    if (isDragging && e.touches.length > 0) moveSlider(e.touches[0].clientX);
  });

  // Check if URL has hash and scroll to it
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1); // remove #
  if (hash) {
    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

// Optional: if you want links from index.html to scroll smoothly without page reload
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.dataset.target;
    // If on same page
    if (window.location.pathname.endsWith('portfolio.html')) {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    // If on a different page, let the browser navigate, then scroll will run on DOMContentLoaded
  });
});
});