console.log("JS connected");

document.addEventListener("DOMContentLoaded", () => {

  /* ================= SCROLL PROGRESS ================= */
  const progress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    if (!progress) return;
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.style.width = (scrollTop / height) * 100 + "%";
  });

  /* ================= BACK TO TOP ================= */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.style.display = "none";
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 200 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================= FADE UP SECTIONS ================= */
  const fadeEls = document.querySelectorAll(".fade-up");
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

  /* ================= FANCYBOX ================= */
  if (typeof Fancybox !== "undefined") {
    Fancybox.bind("[data-fancybox]", {
      infinite: true,
      Thumbs: { autoStart: true },
      Toolbar: { display: ["zoom", "close"] },
      dragToClose: true
    });
  }

  /* ================= CONTACT FORM ================= */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  contactForm?.addEventListener("submit", function(e) {
    e.preventDefault();
    if (formSuccess) {
      formSuccess.style.display = "block";
      setTimeout(() => { formSuccess.style.display = "none"; }, 5000);
    }
    contactForm.reset();
  });

  /* ================= RESUME VIDEO ================= */
  const resumeVideo = document.querySelector('.resume-image');
  if (resumeVideo) {
    resumeVideo.play().catch(() => { resumeVideo.muted = true; resumeVideo.play(); });
  }

  /* ================= LAZY LOAD VIDEOS ================= */
  const lazyVideos = document.querySelectorAll(".lazy-video");
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (video.dataset.src && !video.src) {
          video.src = video.dataset.src;
          video.load();
        }
        video.play().catch(() => { video.muted = true; video.play(); });
      } else {
        video.pause();
      }
    });
  }, { root: null, threshold: 0.25 });

  lazyVideos.forEach(video => {
    videoObserver.observe(video);

    // Hover play for cards
    const card = video.closest(".project-card, .glance-item");
    if (!card) return;
    card.addEventListener("mouseenter", () => video.play().catch(() => { video.muted = true; video.play(); }));
    card.addEventListener("mouseleave", () => video.pause());
  });

});
