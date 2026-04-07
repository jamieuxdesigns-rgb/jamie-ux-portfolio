/* FADE IN ON SCROLL */
const faders = document.querySelectorAll(".fade-up");
function show() {
  const trigger = window.innerHeight * 0.9;
  faders.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) el.classList.add("visible");
  });
}
window.addEventListener("scroll", show);
window.addEventListener("DOMContentLoaded", show);

/* PROGRESS BAR */
window.addEventListener("scroll", () => {
  const win = window.scrollY;
  const h = document.body.scrollHeight - window.innerHeight;
  document.getElementById("progress").style.width = (win / h) * 100 + "%";
});

/* BEFORE/AFTER SLIDERS */
function initCompareSlider(containerId, sliderId, afterId) {
  const container = document.getElementById(containerId);
  const slider = document.getElementById(sliderId);
  const after = document.getElementById(afterId);
  const beforeImg = container.querySelector(".before-img");
  const afterImg = after.querySelector("img");
  let isDragging = false;

  function init() {
    const rect = container.getBoundingClientRect();
    const middle = rect.width / 2;
    after.style.width = middle + "px";
    slider.style.left = middle + "px";
    slider.style.height = container.offsetHeight + "px";
  }

  function moveSlider(x) {
    const rect = container.getBoundingClientRect();
    let posX = x - rect.left;
    posX = Math.max(0, Math.min(posX, rect.width));
    after.style.width = posX + "px";
    slider.style.left = posX + "px";
  }

  slider.addEventListener("mousedown", () => { isDragging = true; });
  window.addEventListener("mouseup", () => { isDragging = false; });
  window.addEventListener("mousemove", e => { if (isDragging) moveSlider(e.clientX); });

  slider.addEventListener("touchstart", () => { isDragging = true; });
  window.addEventListener("touchend", () => { isDragging = false; });
  window.addEventListener("touchmove", e => {
    if (isDragging && e.touches.length > 0) moveSlider(e.touches[0].clientX);
  });

  if (beforeImg.complete && afterImg.complete) init();
  else {
    let loaded = 0;
    [beforeImg, afterImg].forEach(img => img.addEventListener("load", () => {
      loaded++;
      if (loaded === 2) init();
    }));
  }
}

// Initialize both sliders
initCompareSlider("compare1", "slider1", "after1");
initCompareSlider("compare2", "slider2", "after2");

/* FADE */
const faders=document.querySelectorAll(".fade-up");
function show(){const t=window.innerHeight*.9;
faders.forEach(el=>{if(el.getBoundingClientRect().top<t)el.classList.add("visible");});}
window.addEventListener("scroll",show);
window.addEventListener("DOMContentLoaded",show);

/* PROGRESS BAR */
window.addEventListener("scroll",()=>{
  const win=window.scrollY;
  const h=document.body.scrollHeight-window.innerHeight;
  document.getElementById("progress").style.width=(win/h)*100+"%";
})