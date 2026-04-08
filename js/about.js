document.addEventListener('DOMContentLoaded', () => {
  const lazyVideos = document.querySelectorAll('.lazy-video');
  lazyVideos.forEach(video => {
    video.src = video.dataset.src;
    video.load();
  });
  // ===============================
// Autoplay all videos on page load
// ===============================
window.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    // Try to play, catch errors if autoplay is blocked
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Autoplay blocked for a video:', error);
        // fallback: show poster image if you want
      });
      // Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // show button after scrolling down 300px
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // smooth scroll to top
  });
});
    }
  });
});
});
