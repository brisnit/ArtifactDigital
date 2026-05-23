/* ============================================================
   Artifact Interactive — interactions
   - Page loader
   - Sticky header on scroll
   - Hero word reveal on load
   - IntersectionObserver-driven reveals for lines, rows, cards
   - Lazy-load images with smooth fade/scale-in
   - Stat number count-up
   - Smooth scroll for in-page nav
   - Subtle custom cursor (pointer devices only)
   - Footer year
   ============================================================ */

(function () {
  const supportsReduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  document.body.classList.add('is-loading');

  // ---------- Page loader ----------
  window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
      loader && loader.classList.add('is-done');
      document.body.classList.remove('is-loading');
      revealHero();
    }, supportsReduceMotion ? 0 : 900);
  });

  // ---------- Hero reveal on load ----------
  function revealHero() {
    const hero = document.querySelector('.hero-heading');
    if (!hero) return;
    const words = hero.querySelectorAll('.reveal-word');
    words.forEach((word, i) => {
      setTimeout(() => word.classList.add('is-in'), i * 110);
    });
  }

  // ---------- Sticky header ----------
  // Header is permanently in the light ("is-stuck") state.
  const header = document.getElementById('pageHeader');
  if (header) header.classList.add('is-stuck');

  // ---------- IntersectionObserver reveals ----------
  const revealTargets = document.querySelectorAll(
    '.reveal, .reveal-line, .reveal-row, .reveal-card'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Stagger if a parent groups children together
        const siblings = Array.from(
          el.parentElement
            ? el.parentElement.querySelectorAll(
                '.reveal, .reveal-line, .reveal-row, .reveal-card'
              )
            : []
        );
        const stagger = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = `${stagger * 90}ms`;
        el.classList.add('is-in');
        revealObserver.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  // ---------- Lazy-load images ----------
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const src = img.dataset.src;
        if (!src) return;
        const preload = new Image();
        preload.onload = () => {
          img.src = src;
          img.classList.add('is-loaded');
        };
        preload.src = src;
        imageObserver.unobserve(img);
      });
    },
    { rootMargin: '0px 0px 25% 0px', threshold: 0.05 }
  );
  lazyImages.forEach((img) => imageObserver.observe(img));

  // ---------- Lazy-load + play videos ----------
  // On small screens, skip video entirely and let the poster image show.
  // The hosted .mp4 files are QuickTime-containered and unreliable on mobile.
  const skipVideoOnMobile = window.matchMedia('(max-width: 760px)').matches;
  const lazyVideos = document.querySelectorAll('video[data-src]');
  if (!skipVideoOnMobile) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting) {
            if (!vid.src && vid.dataset.src) {
              vid.src = vid.dataset.src;
              vid.addEventListener(
                'loadeddata',
                () => vid.classList.add('is-loaded'),
                { once: true }
              );
              vid.load();
            }
            const play = vid.play();
            if (play && typeof play.catch === 'function') play.catch(() => {});
          } else {
            if (!vid.paused) vid.pause();
          }
        });
      },
      { rootMargin: '0px 0px 20% 0px', threshold: 0.2 }
    );
    lazyVideos.forEach((v) => videoObserver.observe(v));
  } else {
    lazyVideos.forEach((v) => v.classList.add('is-loaded'));
  }

  // ---------- Stat count-up ----------
  const statEls = document.querySelectorAll('.stat__num');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count || '0', 10);
        if (supportsReduceMotion) {
          el.textContent = String(target);
        } else {
          animateCount(el, target, 1400);
        }
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  statEls.forEach((el) => statObserver.observe(el));

  function animateCount(el, target, duration) {
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(easeOut(t) * target));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ---------- Smooth scroll for anchor links ----------
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({
        top,
        behavior: supportsReduceMotion ? 'auto' : 'smooth',
      });
    });
  });

  // ---------- Custom cursor (pointer devices only) ----------
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !supportsReduceMotion) {
    const ring = document.querySelector('.cursor');
    const dot = document.querySelector('.cursor-dot');
    if (ring && dot) {
      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;
      let rx = mx,
        ry = my;
      let raf;
      const tick = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        raf = requestAnimationFrame(tick);
      };
      window.addEventListener(
        'mousemove',
        (e) => {
          mx = e.clientX;
          my = e.clientY;
          if (!document.body.classList.contains('cursor-ready')) {
            document.body.classList.add('cursor-ready');
          }
          if (!raf) raf = requestAnimationFrame(tick);
        },
        { passive: true }
      );

      const hoverables = document.querySelectorAll(
        'a, button, .service-row, .project-card, .approach-card'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () =>
          document.body.classList.add('cursor-hover')
        );
        el.addEventListener('mouseleave', () =>
          document.body.classList.remove('cursor-hover')
        );
      });
    }
  }

  // ---------- Footer year ----------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
