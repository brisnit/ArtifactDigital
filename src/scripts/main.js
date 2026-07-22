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

  const tryPlay = (vid) => {
    const p = vid.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  const load = (vid) => {
    if (vid.src) return;
    // iOS honours the muted PROPERTY, not just the HTML attribute, when
    // playback is started from script — without this, iPhones never leave
    // the poster frame.
    vid.muted = true;
    vid.src = vid.dataset.src;
    vid.addEventListener('loadeddata', () => vid.classList.add('is-loaded'), { once: true });
    // The immediate play() below can be aborted on slow mobile connections
    // before any data has arrived; retry once the browser can actually play.
    vid.addEventListener('canplay', () => tryPlay(vid), { once: true });
    vid.load();
    tryPlay(vid);
  };

  // Below-the-fold videos only start when they scroll near the viewport.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          load(vid);
          tryPlay(vid);
        } else if (!vid.paused) {
          vid.pause();
        }
      });
    },
    { rootMargin: '0px 0px 20% 0px', threshold: 0.2 }
  );

  const start = () => vids.forEach((v) => io.observe(v));
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 3000 });
  else if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });

  // iOS Low Power Mode blocks every autoplay — only a real user gesture may
  // start playback. The first touch anywhere quietly restarts stalled videos
  // (play() must stay synchronous here to count as gesture-activated).
  const rescue = () => {
    vids.forEach((v) => {
      if (!v.src) load(v);
      else if (v.paused) tryPlay(v);
    });
  };
  window.addEventListener('touchstart', rescue, { once: true, passive: true });
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

// ---------- Case attribution dismiss ----------
// The "About this work" note renders visible by default (it's an honesty
// disclosure and must never depend on JS). This only lets a reader close it,
// and remembers the choice so the identical note doesn't nag on every case.
const attribution = document.getElementById('caseAttribution');
if (attribution) {
  const KEY = 'artifact:attribution-dismissed';
  let dismissed = false;
  try {
    dismissed = localStorage.getItem(KEY) === '1';
  } catch {}
  if (dismissed) attribution.hidden = true;

  const closeBtn = attribution.querySelector('.case-attribution__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      attribution.hidden = true;
      try {
        localStorage.setItem(KEY, '1');
      } catch {}
    });
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
