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
    }
  });
});
});