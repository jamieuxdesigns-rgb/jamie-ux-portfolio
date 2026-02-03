// Minimal JS: toggle nav and set current year
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  toggle?.addEventListener('click', () => nav.classList.toggle('open'));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});