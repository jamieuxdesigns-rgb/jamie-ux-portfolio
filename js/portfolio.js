document.addEventListener("DOMContentLoaded", () => {

  console.log("Portfolio JS connected");

  /* ================= FLIPBOOK SCROLL ================= */
  document.querySelectorAll(".flipbook-container").forEach(container => {
    const flipbook = container.querySelector(".flipbook");
    const nextBtn = container.querySelector(".next");
    const prevBtn = container.querySelector(".prev");

    if (!flipbook) return;

    nextBtn?.addEventListener("click", () => {
      flipbook.scrollBy({
        left: flipbook.clientWidth,
        behavior: "smooth"
      });
    });

    prevBtn?.addEventListener("click", () => {
      flipbook.scrollBy({
        left: -flipbook.clientWidth,
        behavior: "smooth"
      });
    });
  });

  /* ================= SCROLL PROGRESS ================= */
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progress.style.width = (scrollTop / height) * 100 + "%";
    });
  }

  /* ================= BACK TO TOP ================= */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 200 ? "flex" : "none";
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================= FADE UP ================= */
  const fadeEls = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => observer.observe(el));

  /* ================= LAZY VIDEO ================= */
  const lazyVideos = document.querySelectorAll(".lazy-video");

  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        if (video.dataset.src && !video.src) {
          video.src = video.dataset.src;
          video.load();
        }
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });

  lazyVideos.forEach(video => videoObserver.observe(video));

});

Fancybox.bind("[data-fancybox]", {
  infinite: true,       // loop through images
  Toolbar: true,        // show toolbar
  Thumbs: false,        // hide thumbnails
  dragToClose: true,    // swipe to close
});

Fancybox.bind("[data-fancybox='magazine']", {
  Thumbs: false,
  Toolbar: {
    display: ["close"],
  },
  Image: {
    zoom: true,
  },
});