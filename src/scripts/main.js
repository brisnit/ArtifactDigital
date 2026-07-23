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
    // Phones get the 2.1MB 640px rendition instead of the 5.3MB 720p file —
    // it starts several times sooner on cell connections.
    vid.src =
      vid.dataset.srcMobile && window.matchMedia('(max-width: 760px)').matches
        ? vid.dataset.srcMobile
        : vid.dataset.src;
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

// ---------- Insights index: search / filter / sort / paginate ----------
// All posts are rendered server-side (crawlable). This only reorders and
// hides cards client-side. Without JS every post stays visible — the
// controls are hidden via a `.js` gate in the page's CSS.
(function insightsBrowser() {
  const root = document.querySelector('[data-insights]');
  const grid = document.querySelector('[data-grid]');
  if (!root || !grid) return;

  const PAGE_SIZE = 12;
  const cards = Array.from(grid.querySelectorAll('[data-post]'));
  const searchInput = root.querySelector('[data-search]');
  const sortSelect = root.querySelector('[data-sort]');
  const chips = Array.from(root.querySelectorAll('[data-filter]'));
  const countEl = root.querySelector('[data-count]');
  const emptyEl = document.querySelector('[data-empty]');
  const pager = document.querySelector('[data-pagination]');

  const state = { q: '', cluster: '', sort: 'newest', page: 1 };

  const sorters = {
    newest: (a, b) => Number(b.dataset.date) - Number(a.dataset.date),
    oldest: (a, b) => Number(a.dataset.date) - Number(b.dataset.date),
    az: (a, b) => a.dataset.title.localeCompare(b.dataset.title),
  };

  function matches(card) {
    if (state.cluster && card.dataset.cluster !== state.cluster) return false;
    if (state.q && !card.dataset.search.includes(state.q)) return false;
    return true;
  }

  function makeBtn(label, opts = {}) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'insights-pagination__btn';
    b.textContent = label;
    if (opts.label) b.setAttribute('aria-label', opts.label);
    if (opts.current) b.setAttribute('aria-current', 'page');
    if (opts.disabled) b.disabled = true;
    if (opts.onClick) b.addEventListener('click', opts.onClick);
    return b;
  }

  function goTo(page) {
    state.page = page;
    render();
    // Keep the top of the list in view when paging.
    grid.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function renderPager(totalPages) {
    pager.textContent = '';
    if (totalPages <= 1) {
      pager.hidden = true;
      return;
    }
    pager.hidden = false;

    pager.appendChild(
      makeBtn('‹', {
        label: 'Previous page',
        disabled: state.page === 1,
        onClick: () => goTo(state.page - 1),
      })
    );

    // Compact window of page numbers with ellipses for long lists.
    const pages = new Set([1, totalPages, state.page, state.page - 1, state.page + 1]);
    let prev = 0;
    for (let n = 1; n <= totalPages; n++) {
      if (!pages.has(n)) continue;
      if (n - prev > 1) {
        const dots = document.createElement('span');
        dots.className = 'insights-pagination__ellipsis';
        dots.textContent = '…';
        pager.appendChild(dots);
      }
      pager.appendChild(
        makeBtn(String(n), {
          label: `Page ${n}`,
          current: n === state.page,
          onClick: () => goTo(n),
        })
      );
      prev = n;
    }

    pager.appendChild(
      makeBtn('›', {
        label: 'Next page',
        disabled: state.page === totalPages,
        onClick: () => goTo(state.page + 1),
      })
    );
  }

  function render() {
    const visible = cards.filter(matches).sort(sorters[state.sort]);
    const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = visible.slice(start, start + PAGE_SIZE);
    const shown = new Set(pageItems);

    // Hide everything, then reveal the current page in sorted order.
    cards.forEach((card) => {
      card.hidden = !shown.has(card);
    });
    pageItems.forEach((card) => {
      card.style.transitionDelay = '0ms';
      card.classList.add('is-in');
      grid.appendChild(card); // reorder to match the active sort
    });

    if (countEl) {
      const n = visible.length;
      countEl.textContent = n === 0 ? '' : `${n} ${n === 1 ? 'insight' : 'insights'}`;
    }
    if (emptyEl) emptyEl.hidden = visible.length !== 0;
    renderPager(totalPages);
  }

  // ----- events -----
  let debounce;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        state.q = searchInput.value.trim().toLowerCase();
        state.page = 1;
        render();
      }, 120);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      state.page = 1;
      render();
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      state.cluster = chip.dataset.filter;
      state.page = 1;
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      render();
    });
  });

  render();
})();
