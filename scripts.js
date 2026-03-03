/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO — Vinicius Florencio — Scripts
   ───────────────────────────────────────────────────────────────
   Table of Contents:
    0.  Utilities (easing, smooth scroll, floating menus)
    1.  Smooth Scroll Navigation
    2.  Floating Dropdown — My Work
    3.  CV Dropdown — Nav + Sections
    4.  Mobile Menu & Submenus
    5.  Inertial Wheel Scroll
    6.  Scroll Reveal Animation
    7.  Count-up Animation
    8.  Global Event Handlers (outside click, escape, resize)
   ═══════════════════════════════════════════════════════════════ */

(function () {
'use strict';

/* Shared close functions — assigned by each section, called in §8 */
let closeAllDropdowns, closeAllCv, closeMobileMenu;


/* ─── 0. UTILITIES ─────────────────────────────────────────────── */

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let _raf;
function smoothScrollTo(targetY, duration = 600) {
    if (_raf) cancelAnimationFrame(_raf);
    const startY = window.scrollY;
    const diff   = targetY - startY;
    const t0     = performance.now();

    (function step(now) {
        const t = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, Math.round(startY + diff * easeInOutCubic(t)));
        if (t < 1) _raf = requestAnimationFrame(step);
    })(t0);
}

/** Position a menu below its toggle using fixed coordinates. */
function positionFixed(toggle, menu, gap) {
    const r = toggle.getBoundingClientRect();
    Object.assign(menu.style, {
        position : 'fixed',
        left     : r.left + 'px',
        top      : (r.bottom + gap) + 'px',
        minWidth : Math.max(menu.offsetWidth, r.width) + 'px'
    });
}

/** Float a menu to document.body (once) and show it. */
function showFloating(toggle, menu, gap) {
    if (!menu.dataset.floating) {
        document.body.appendChild(menu);
        menu.dataset.floating = 'true';
    }
    menu.style.display = 'flex';
    positionFixed(toggle, menu, gap);
}

/** Hide a floating menu and detach its reposition listeners. */
function hideFloating(menu) {
    if (!menu) return;
    menu.style.display = 'none';
    if (menu._repo) {
        window.removeEventListener('resize', menu._repo);
        window.removeEventListener('scroll', menu._repo);
        delete menu._repo;
    }
}

/** Attach scroll/resize listeners that keep a floating menu aligned. */
function trackFloating(toggle, menu, gap) {
    const fn = () => positionFixed(toggle, menu, gap);
    menu._repo = fn;
    window.addEventListener('resize', fn);
    window.addEventListener('scroll', fn, { passive: true });
}


/* ─── 1. SMOOTH SCROLL NAVIGATION ──────────────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();

        if (href === '#home') return smoothScrollTo(0, 650);

        const el = document.querySelector(href);
        if (!el) return;
        const nav    = document.querySelector('.nav');
        const offset = nav ? nav.offsetHeight + 8 : 0;
        smoothScrollTo(window.scrollY + el.getBoundingClientRect().top - offset - 32, 650);
        setTimeout(() => { el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); }, 700);
    });
});


/* ─── 2. FLOATING DROPDOWN — MY WORK ───────────────────────────── */

(function () {
    const GAP = 14;
    let _idCounter = 0;

    function findMenu(dd) {
        if (!dd.dataset.ddId) dd.dataset.ddId = 'dd-' + (++_idCounter);
        const id = dd.dataset.ddId;
        return dd.querySelector('.dropdown-menu')
            || document.querySelector('.dropdown-menu[data-owner="' + id + '"]');
    }

    function open(dd) {
        const toggle = dd.querySelector('.dropdown-toggle');
        const menu   = findMenu(dd);
        if (!toggle || !menu) return;

        toggle.setAttribute('aria-expanded', 'true');
        dd.classList.add('open');
        if (!menu.dataset.owner) menu.dataset.owner = dd.dataset.ddId;

        showFloating(toggle, menu, GAP);
        trackFloating(toggle, menu, GAP);
    }

    function close(dd) {
        const toggle = dd.querySelector('.dropdown-toggle');
        const menu   = findMenu(dd);
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        dd.classList.remove('open');
        hideFloating(menu);
    }

    /* Expose for §8 */
    closeAllDropdowns = () => document.querySelectorAll('.dropdown').forEach(close);

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        const dd = toggle.closest('.dropdown');
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            dd.classList.contains('open') ? close(dd) : open(dd);
        });
    });
})();


/* ─── 3. CV DROPDOWN — NAV + SECTIONS ──────────────────────────── */

(function () {
    const NAV_GAP  = 16;
    const navDd    = document.querySelector('.cv-dropdown-nav');
    const navToggle = navDd?.querySelector('.cv-dropdown-toggle');
    const navMenu   = navDd?.querySelector('.cv-dropdown-menu');

    function openNav() {
        if (!navDd || !navMenu) return;
        navDd.classList.add('open');
        showFloating(navToggle, navMenu, NAV_GAP);
        trackFloating(navToggle, navMenu, NAV_GAP);
    }

    function closeNav() {
        if (!navDd) return;
        navDd.classList.remove('open');
        hideFloating(navMenu);
    }

    function closeAll() {
        document.querySelectorAll('.cv-dropdown.open').forEach(d =>
            d === navDd ? closeNav() : d.classList.remove('open')
        );
    }

    /* Expose for §8 */
    closeAllCv = closeAll;

    document.querySelectorAll('.cv-dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const dd      = this.closest('.cv-dropdown');
            const wasOpen = dd.classList.contains('open');
            closeAll();
            if (!wasOpen) dd === navDd ? openNav() : dd.classList.add('open');
        });
    });

    /* Prevent menu click from bubbling to the outside-click handler */
    document.querySelectorAll('.cv-dropdown-menu').forEach(m =>
        m.addEventListener('click', e => e.stopPropagation())
    );
})();


/* ─── 4. MOBILE MENU & SUBMENUS ────────────────────────────────── */

(function () {
    const btn  = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-dropdown-menu');
    if (!btn || !menu) return;

    function closeSubmenus() {
        menu.querySelectorAll('.mobile-submenu').forEach(s => s.classList.remove('open'));
        menu.querySelectorAll('.mobile-submenu-toggle').forEach(t => {
            t.classList.remove('open');
            t.setAttribute('aria-expanded', 'false');
        });
    }

    function close() {
        closeSubmenus();
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', onOutside);
        document.removeEventListener('keydown', onEsc);
    }

    function onOutside(e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) close();
    }

    function onEsc(e) {
        if (e.key === 'Escape') close();
    }

    /* Expose for §8 */
    closeMobileMenu = close;

    btn.addEventListener('click', e => {
        e.stopPropagation();
        const open = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-hidden', String(!open));
        if (open) {
            setTimeout(() => document.addEventListener('click', onOutside), 0);
            document.addEventListener('keydown', onEsc);
        } else {
            close();
        }
    });

    /* Submenu toggles (My Work, Full CV, etc.) */
    menu.querySelectorAll('.mobile-submenu-toggle').forEach(toggle => {
        const sub = toggle.closest('.mobile-has-submenu')?.querySelector('.mobile-submenu');
        if (!sub) return;
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            const open = sub.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
    });
})();


/* ─── 5. INERTIAL WHEEL SCROLL ─────────────────────────────────── */

(function () {
    const BASE = 16, DECAY = 0.92, SENSITIVITY = 0.1, V_MAX = 1200;
    let velocity = 0, animating = false, lastTime = 0;

    function isScrollable(el) {
        while (el && el !== document.body) {
            const ov = getComputedStyle(el).overflowY;
            if ((ov === 'auto' || ov === 'scroll') && el.scrollHeight > el.clientHeight) return true;
            el = el.parentElement;
        }
        return false;
    }

    function step(now) {
        if (!animating) return;
        const dt = Math.max(1, now - lastTime);
        lastTime = now;

        const maxY = Math.max(0, document.body.scrollHeight - window.innerHeight);
        window.scrollTo(0, Math.min(maxY, Math.max(0, window.scrollY + velocity * (dt / BASE))));
        velocity *= Math.pow(DECAY, dt / BASE);

        if (Math.abs(velocity) < 0.25) { animating = false; velocity = 0; return; }
        requestAnimationFrame(step);
    }

    document.addEventListener('wheel', e => {
        if (e.defaultPrevented) return;
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select' || isScrollable(e.target)) return;

        e.preventDefault();
        velocity = Math.max(-V_MAX, Math.min(V_MAX, velocity + e.deltaY * SENSITIVITY));
        if (!animating) { animating = true; lastTime = performance.now(); requestAnimationFrame(step); }
    }, { passive: false });
})();


/* ─── 6. SCROLL REVEAL ANIMATION ───────────────────────────────── */

(function () {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.12 });

    els.forEach(el => obs.observe(el));
})();


/* ─── 7. COUNT-UP ANIMATION ────────────────────────────────────── */

(function () {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animate(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const t0  = performance.now();

        (function step(now) {
            const p = Math.min((now - t0) / dur, 1);
            el.textContent = Math.round((1 - (1 - p) * (1 - p)) * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
        })(t0);
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => obs.observe(el));
})();


/* ─── 8. GLOBAL EVENT HANDLERS ─────────────────────────────────── */

/* Outside click — close My Work + CV dropdowns */
document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) closeAllDropdowns?.();
    closeAllCv?.();
});

/* Escape — close My Work dropdown */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllDropdowns?.();
});

/* Resize — responsive cleanup */
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) {
        closeAllDropdowns?.();
        closeAllCv?.();
    }
    /* Close mobile menu when resizing back to desktop */
    closeMobileMenu?.();
});

/* ─── Card tooltip follows mouse ──────────────────────────────── */

(function () {
    var tip = document.createElement('span');
    tip.id = 'card-tip';
    document.body.appendChild(tip);

    var templates = {
        'see-project':        'See project <img src="ArrowRight.svg" alt="" class="tooltip-icon">',
        'under-construction': '<img src="Warning.svg" alt="" class="tooltip-icon tooltip-icon-warning"> Under construction'
    };

    var activeCard = null;

    document.addEventListener('mousemove', function (e) {
        var card = e.target.closest('.card[data-tooltip]');
        if (card) {
            if (card !== activeCard) {
                activeCard = card;
                tip.innerHTML = templates[card.dataset.tooltip] || '';
            }
            tip.style.left = (e.clientX + 12) + 'px';
            tip.style.top  = (e.clientY + 12) + 'px';
            tip.classList.add('visible');
        } else if (activeCard) {
            activeCard = null;
            tip.classList.remove('visible');
        }
    });
})();

})();
