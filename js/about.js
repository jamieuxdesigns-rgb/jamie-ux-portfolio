document.addEventListener('DOMContentLoaded', () => {
  
  // ===============================
  // LAZY LOAD VIDEOS
  // ===============================
  const lazyVideos = document.querySelectorAll('.lazy-video');
  lazyVideos.forEach(video => {
    if (video.dataset.src) video.src = video.dataset.src; // only if data-src exists
    video.load();
  });

  // ===============================
  // AUTOPLAY VIDEOS
  // ===============================
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Autoplay blocked for a video:', error);
        // fallback: show poster image if desired
      });
    }
  });

  // ===============================
  // BACK TO TOP BUTTON
  // ===============================
  const backToTopBtn = document.getElementById('backToTop');

  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
