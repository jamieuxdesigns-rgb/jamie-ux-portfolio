window.addEventListener("load", () => {
  const container = document.getElementById("compare");
  const slider = document.getElementById("slider");
  const after = document.getElementById("after");
  const beforeImg = after.querySelector("img"); // top image
  const afterImg = container.querySelector("img"); // base image
  let isDragging = false;

  // Initialize slider after both images are loaded
  function initSlider() {
    const rect = container.getBoundingClientRect();
    const middle = rect.width / 2;

    after.style.width = middle + "px";
    slider.style.left = middle + "px";
    slider.style.height = container.offsetHeight + "px";
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

  // Helper function to move slider
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
});