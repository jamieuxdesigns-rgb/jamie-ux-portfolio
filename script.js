document.addEventListener('DOMContentLoaded', () => {

  const hero = document.querySelector('.hero');
  const heroText = hero.querySelectorAll('h1, p, .btn');
  const cards = document.querySelectorAll('.case-card');
  const skillPills = document.querySelectorAll('.skill-pill');
  const backToTop = document.getElementById('backToTop');
  const progressBar = document.getElementById('scrollProgress');

  // Intersection Observer for fade-in
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        if (entry.target.classList.contains('hero')) {
          heroText.forEach((el, i) => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            el.style.transition = `all 0.8s ease-out ${i * 0.3}s`;
          });
        }

        if (entry.target.tagName === 'SECTION') {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'all 0.8s ease-out';
        }

        if (entry.target.classList.contains('case-card')) {
          const index = entry.target.dataset.index || 0;
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        }

        if (entry.target.classList.contains('skill-pill')) {
          const index = Array.from(skillPills).indexOf(entry.target);
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = `all 0.5s ease-out ${index * 0.1 + 0.2}s`;
        }

        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .case-card, .skill-pill, .hero').forEach(el => observer.observe(el));

  // Scroll events
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / scrollHeight) * 100;

    // Update progress bar
    progressBar.style.width = `${scrollPercent}%`;

    // Show/hide Back-to-Top button
    if (scrollY > 300) {
      backToTop.style.opacity = 1;
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = 0;
      backToTop.style.pointerEvents = 'none';
    }
  });

  // Smooth scroll to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});

