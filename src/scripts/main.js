/* ============================================================
   Artifact Interactive — interactions

   Bundled by Astro as a module, so it is deferred by default and runs
   after the DOM is parsed. Everything here is progressive enhancement:
   the page is fully readable and usable if this never executes.
   ============================================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Hero reveal ----------
// Runs immediately rather than waiting on window.load, so the hero headline
// is never gated behind images or video finishing their downloads.
(function revealHero() {
  const hero = document.querySelector('.hero-heading');
  if (!hero) return;
  const words = hero.querySelectorAll('.reveal-word');
  if (reduceMotion) {
    words.forEach((w) => w.classList.add('is-in'));
    return;
  }
  words.forEach((word, i) => setTimeout(() => word.classList.add('is-in'), i * 110));
})();

// ---------- Sticky header ----------
const header = document.getElementById('pageHeader');
if (header) header.classList.add('is-stuck');

// ---------- IntersectionObserver reveals ----------
const revealTargets = document.querySelectorAll('.reveal, .reveal-line, .reveal-row, .reveal-card');
if (reduceMotion) {
  revealTargets.forEach((el) => el.classList.add('is-in'));
} else {
  // Anything already on screen at load is shown instantly, with no transition.
  // Fading in content the user is *already looking at* buys nothing and was
  // measurably delaying LCP by ~1.4s, since the LCP element is usually the
  // hero copy. The scroll-reveal effect is kept for everything below the fold,
  // which is the only place it was ever meaningful.
  const inViewport = [];
  const below = [];
  revealTargets.forEach((el) => {
    const r = el.getBoundingClientRect();
    (r.top < window.innerHeight && r.bottom > 0 ? inViewport : below).push(el);
  });

  inViewport.forEach((el) => {
    el.style.transition = 'none';
    el.classList.add('is-in');
  });
  // Flush the no-transition paint, then hand transitions back for later state changes.
  if (inViewport.length) {
    void document.body.offsetHeight;
    requestAnimationFrame(() => inViewport.forEach((el) => el.style.removeProperty('transition')));
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(
          el.parentElement
            ? el.parentElement.querySelectorAll('.reveal, .reveal-line, .reveal-row, .reveal-card')
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
  below.forEach((el) => revealObserver.observe(el));
}

// ---------- Hero video ----------
// The poster is the LCP element and paints without JS. The video file is only
// fetched once the page is idle, so it never competes with first paint.
(function lazyVideos() {
  const vids = document.querySelectorAll('video[data-src]');
  if (!vids.length || reduceMotion) return; // reduced motion: poster only

  const load = (vid) => {
    if (vid.src) return;
    vid.src = vid.dataset.src;
    vid.addEventListener('loadeddata', () => vid.classList.add('is-loaded'), { once: true });
    vid.load();
    const p = vid.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  // Below-the-fold videos only start when they scroll near the viewport.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          load(vid);
          const p = vid.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else if (!vid.paused) {
          vid.pause();
        }
      });
    },
    { rootMargin: '0px 0px 20% 0px', threshold: 0.2 }
  );

  const start = () => vids.forEach((v) => io.observe(v));
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 3000 });
  else window.addEventListener('load', start, { once: true });
})();

// ---------- Stat count-up ----------
const statEls = document.querySelectorAll('.stat__num');
if (statEls.length) {
  const animateCount = (el, target, duration) => {
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const frame = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(easeOut(t) * target));
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count || '0', 10);
        if (reduceMotion) el.textContent = String(target);
        else animateCount(el, target, 1400);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  statEls.forEach((el) => statObserver.observe(el));
}

// ---------- Smooth scroll for anchor links ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

// ---------- Custom cursor (fine pointers only) ----------
// The rAF loop parks itself once the ring catches the pointer instead of
// running forever, so an idle tab costs nothing.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  const ring = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  if (ring && dot) {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = null;

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        raf = null; // settled — stop burning frames
        return;
      }
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

    // Two delegated listeners instead of a pair per element.
    const hoverSel = 'a, button, .service-row, .project-card, .approach-card';
    document.addEventListener(
      'mouseover',
      (e) => {
        if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.add('cursor-hover');
      },
      { passive: true }
    );
    document.addEventListener(
      'mouseout',
      (e) => {
        if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.remove('cursor-hover');
      },
      { passive: true }
    );
  }
}

// ---------- Mobile navigation (hamburger) ----------
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
  const setMenu = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
    if (open) {
      const first = mobileNav.querySelector('a');
      if (first) first.focus();
    }
  };

  navToggle.addEventListener('click', () => {
    setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
  });
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      navToggle.focus();
    }
  });
  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > 760 && navToggle.getAttribute('aria-expanded') === 'true') setMenu(false);
    },
    { passive: true }
  );
}
