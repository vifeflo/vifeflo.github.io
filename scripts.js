/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO — Vinicius Florencio — Scripts
   ───────────────────────────────────────────────────────────────
   Table of Contents:
    0.  Utilities (easing, smooth scroll, floating menus)
    1.  Smooth Scroll Navigation
    2.  Floating Dropdown — Projects
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

/* i18n tooltip hook — assigned by Card Tooltip section, used in §9 */
let applyTooltipLang;


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
        width    : 'fit-content',
        minWidth : 'fit-content'
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


/* ─── 2. FLOATING DROPDOWN — PROJECTS ──────────────────────────── */

(function () {
    const GAP = 16;
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
            if (!dd) return;
            const wasOpen = dd.classList.contains('open');
            closeAllDropdowns?.();
            closeAllCv?.();
            if (!wasOpen) open(dd);
        });
    });
})();


/* ─── 3. CV DROPDOWN — NAV + SECTIONS ──────────────────────────── */

(function () {
    const NAV_GAP = 16;
    let _idCounter = 0;

    function findMenu(dd) {
        if (!dd.dataset.cvId) dd.dataset.cvId = 'cv-' + (++_idCounter);
        const id = dd.dataset.cvId;
        return dd.querySelector('.cv-dropdown-menu')
            || document.querySelector('.cv-dropdown-menu[data-owner="' + id + '"]');
    }

    function openNav(dd) {
        if (!dd) return;
        const toggle = dd.querySelector('.cv-dropdown-toggle');
        const menu   = findMenu(dd);
        if (!toggle || !menu) return;

        if (dd.classList.contains('mobile-profile-dropdown')) {
            closeMobileMenu?.();
            dd.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
            if (menu.dataset.floating) {
                dd.appendChild(menu);
                delete menu.dataset.floating;
            }
            Object.assign(menu.style, {
                display: '',
                position: '',
                left: '',
                top: '',
                width: '',
                minWidth: ''
            });
            return;
        }

        dd.classList.add('open');
        if (!menu.dataset.owner) menu.dataset.owner = dd.dataset.cvId;

        showFloating(toggle, menu, NAV_GAP);
        trackFloating(toggle, menu, NAV_GAP);
    }

    function closeNav(dd) {
        if (!dd) return;
        const menu = findMenu(dd);
        const toggle = dd.querySelector('.cv-dropdown-toggle');
        dd.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        hideFloating(menu);
        if (dd.classList.contains('mobile-profile-dropdown') && menu) {
            menu.style.display = '';
        }
    }

    function closeAll() {
        document.querySelectorAll('.cv-dropdown.open').forEach(dd =>
            dd.classList.contains('cv-dropdown-nav') ? closeNav(dd) : dd.classList.remove('open')
        );
    }

    /* Expose for §8 */
    closeAllCv = closeAll;

    document.querySelectorAll('.cv-dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const dd      = this.closest('.cv-dropdown');
            if (!dd) return;
            const wasOpen = dd.classList.contains('open');
            closeAllDropdowns?.();
            closeAll();
            if (!wasOpen) {
                dd.classList.contains('cv-dropdown-nav') ? openNav(dd) : dd.classList.add('open');
            }
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
        closeAllCv?.();
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

    /* Submenu toggles (Projects, Full CV, etc.) */
    menu.querySelectorAll('.mobile-submenu-toggle').forEach(toggle => {
        const sub = toggle.closest('.mobile-has-submenu')?.querySelector('.mobile-submenu');
        if (!sub) return;
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            const shouldOpen = !sub.classList.contains('open');
            closeSubmenus();
            const open = shouldOpen;
            sub.classList.toggle('open', open);
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
    const pathname = (window.location.pathname || '').toLowerCase();
    const isHomePage = pathname.endsWith('/index.html') || pathname.endsWith('/') || pathname === '';

    function isTitleElement(el) {
        return el.matches('h1, h2, h3, h4, h5, h6, .section-title, .section-head, .studyin-section-title');
    }

    function makeStaggerItems(parent, orderState) {
        const children = Array.from(parent.children).filter(child => {
            if (isTitleElement(child)) return false;
            if (child.hasAttribute('data-reveal-group')) return false;
            return true;
        });
        children.forEach(child => {
            const alreadyStaggered = child.classList.contains('reveal-stagger');
            if (!child.classList.contains('reveal')) {
                child.classList.add('reveal');
            }
            child.classList.add('reveal-stagger');
            if (!alreadyStaggered && !child.dataset.revealOrder) {
                child.dataset.revealOrder = String(orderState.value++);
            }
        });
    }

    function setupProjectSectionStagger() {
        if (isHomePage) return;

        const sections = document.querySelectorAll('.section.reveal');
        sections.forEach((section, sectionIndex) => {
            if (!section.dataset.revealGroup) {
                const sectionId = section.id || String(sectionIndex + 1);
                section.dataset.revealGroup = `project-section-${sectionId}`;
            }

            const orderState = { value: 0 };
            makeStaggerItems(section, orderState);

            const nestedContainers = Array.from(section.children).filter(child => !isTitleElement(child));
            nestedContainers.forEach(container => {
                if (container.children && container.children.length > 1) {
                    makeStaggerItems(container, orderState);
                }
            });
        });
    }

    setupProjectSectionStagger();

    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const REVEAL_DELAY_MS = 380;
    const REVEAL_STAGGER_STEP_MS = 150;
    const REVEAL_STAGE_STEP_MS = 220;
    const timers = new WeakMap();

    function getRevealGroup(el) {
        return el.closest('[data-reveal-group]') || el.parentElement;
    }

    function getRevealDelay(el) {
        let delay = REVEAL_DELAY_MS;

        if (el.classList.contains('reveal-stagger')) {
            const explicitOrder = Number(el.dataset.revealOrder);
            if (Number.isFinite(explicitOrder)) {
                return delay + Math.max(0, explicitOrder) * REVEAL_STAGE_STEP_MS;
            }

            const group = getRevealGroup(el);
            const items = group ? Array.from(group.querySelectorAll('.reveal-stagger')) : [];
            const index = items.indexOf(el);
            if (index >= 0) {
                delay += index * REVEAL_STAGGER_STEP_MS;
            }
        }

        return delay;
    }

    function shouldPersistVisible(el) {
        if (el.closest('.hero, .project-hero')) return true;

        if (el.classList.contains('section')) {
            return Boolean(el.querySelector('h2, .section-title, .section-head, .studyin-section-title'));
        }

        return false;
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            const pending = timers.get(e.target);
            if (pending) {
                clearTimeout(pending);
                timers.delete(e.target);
            }

            if (e.isIntersecting) {
                const delay = getRevealDelay(e.target);
                const id = setTimeout(() => {
                    e.target.classList.add('visible');
                    timers.delete(e.target);
                }, delay);
                timers.set(e.target, id);
            } else {
                if (!shouldPersistVisible(e.target)) {
                    e.target.classList.remove('visible');
                }
            }
        });
    }, { threshold: 0.12 });

    els.forEach(el => obs.observe(el));
})();


/* ─── 7. COUNT-UP ANIMATION ────────────────────────────────────── */

(function () {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function formatStartValue(el) {
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const useGrouping = el.dataset.grouping === 'true';
        const locale = el.dataset.locale || 'en-US';
        const base = useGrouping ? (0).toLocaleString(locale) : '0';
        return prefix + base + suffix;
    }

    function animate(el) {
        const target = parseInt(el.dataset.count, 10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const useGrouping = el.dataset.grouping === 'true';
        const locale = el.dataset.locale || 'en-US';
        const dur = 1400;
        const t0  = performance.now();

        (function step(now) {
            const p = Math.min((now - t0) / dur, 1);
            const value = Math.round((1 - (1 - p) * (1 - p)) * target);
            const formatted = useGrouping ? value.toLocaleString(locale) : String(value);
            el.textContent = prefix + formatted + suffix;
            if (p < 1) requestAnimationFrame(step);
        })(t0);
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animate(e.target);
            } else {
                e.target.textContent = formatStartValue(e.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => {
        el.textContent = formatStartValue(el);
        obs.observe(el);
    });
})();


/* ─── 7B. EXPERIENCE TAG COLLAPSE ─────────────────────────────── */

(function () {
    const groups = Array.from(document.querySelectorAll('.experience-skills'));
    if (!groups.length) return;

    const MOBILE_BREAKPOINT = 768;
    const MAX_VISIBLE_ROWS = 3;

    function getTags(group) {
        return Array.from(group.querySelectorAll('.tag')).filter(el => !el.classList.contains('experience-tags-toggle'));
    }

    function setExpanded(group, toggle, expanded) {
        group.dataset.expanded = expanded ? 'true' : 'false';
        toggle.setAttribute('aria-expanded', String(expanded));
        toggle.textContent = 'Mostrar menos';

        getTags(group).forEach(tag => {
            tag.classList.remove('experience-tag-hidden');
        });
    }

    function setCollapsed(group, toggle) {
        const tags = getTags(group);
        const topValues = [];
        let visibleCount = 0;

        tags.forEach(tag => tag.classList.remove('experience-tag-hidden'));

        const groupTop = group.getBoundingClientRect().top;

        for (const tag of tags) {
            const rowTop = Math.round(tag.getBoundingClientRect().top - groupTop);
            if (!topValues.includes(rowTop)) topValues.push(rowTop);

            if (topValues.length > MAX_VISIBLE_ROWS) {
                tag.classList.add('experience-tag-hidden');
            } else {
                visibleCount += 1;
            }
        }

        const hiddenCount = tags.length - visibleCount;
        if (hiddenCount > 0) {
            group.dataset.expanded = 'false';
            toggle.hidden = false;
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Mostrar ' + hiddenCount + ' tags ocultas');
            toggle.textContent = '+' + hiddenCount;
        } else {
            toggle.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Mostrar menos';
        }
    }

    function refreshGroup(group) {
        let toggle = group.querySelector('.experience-tags-toggle');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'experience-tags-toggle';
            toggle.hidden = true;
            toggle.addEventListener('click', () => {
                const expanded = group.dataset.expanded === 'true';
                if (expanded) {
                    requestAnimationFrame(() => setCollapsed(group, toggle));
                } else {
                    setExpanded(group, toggle, true);
                }
            });
            group.appendChild(toggle);
        }

        const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        if (!isMobile) {
            group.dataset.expanded = 'true';
            toggle.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Mostrar menos';
            getTags(group).forEach(tag => tag.classList.remove('experience-tag-hidden'));
            return;
        }

        const expanded = group.dataset.expanded === 'true';
        if (expanded) {
            setExpanded(group, toggle, true);
        } else {
            setCollapsed(group, toggle);
        }
    }

    function refreshAll() {
        groups.forEach(refreshGroup);
    }

    let raf = 0;
    function scheduleRefresh() {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(refreshAll);
    }

    groups.forEach(group => {
        group.dataset.expanded = 'false';
    });

    window.addEventListener('resize', scheduleRefresh, { passive: true });
    window.addEventListener('orientationchange', scheduleRefresh);
    scheduleRefresh();
})();


/* ─── 7C. STICKY TITLE DIVIDER STATE ─────────────────────────── */

(function () {
    const selectors = [
        '#my-work .section-title',
        '#about > h2',
        '#experience > h2',
        '#certifications > h2',
        '.section .section-title',
        '.section .section-head',
        '.section .studyin-section-title'
    ];

    const stickyTitles = Array.from(new Set(
        selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)))
    ));

    if (!stickyTitles.length) return;

    function getStickyTop() {
        const raw = getComputedStyle(document.documentElement).getPropertyValue('--section-sticky-top');
        const value = parseFloat(raw);
        return Number.isFinite(value) ? value : 55;
    }

    function isPinned(titleEl, stickyTop) {
        if (getComputedStyle(titleEl).position !== 'sticky') return false;

        const section = titleEl.closest('.section');
        if (!section) return false;

        const titleRect = titleEl.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();

        const atStickyTop = titleRect.top <= stickyTop + 0.5;
        const sectionStarted = sectionRect.top < stickyTop;
        const hasRoomToStick = sectionRect.bottom > stickyTop + titleRect.height;

        return atStickyTop && sectionStarted && hasRoomToStick;
    }

    function updateState() {
        const stickyTop = getStickyTop();
        stickyTitles.forEach(titleEl => {
            titleEl.classList.toggle('sticky-active', isPinned(titleEl, stickyTop));
        });
    }

    let rafId = 0;
    function scheduleUpdate() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateState);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    window.addEventListener('orientationchange', scheduleUpdate);
    scheduleUpdate();
})();


/* ─── 8. GLOBAL EVENT HANDLERS ─────────────────────────────────── */

/* Outside click — close Projects + CV dropdowns */
document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) closeAllDropdowns?.();
    closeAllCv?.();
});

/* Escape — close Projects dropdown */
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

    /* Expose for §9 language switcher */
    applyTooltipLang = function (dict) {
        if (dict['tooltip.see-project'])
            templates['see-project'] = dict['tooltip.see-project'] + ' <img src="ArrowRight.svg" alt="" class="tooltip-icon">';
        if (dict['tooltip.under-construction'])
            templates['under-construction'] = '<img src="Warning.svg" alt="" class="tooltip-icon tooltip-icon-warning"> ' + dict['tooltip.under-construction'];
    };

    var activeTarget = null;

    document.addEventListener('mousemove', function (e) {
        var target = e.target.closest('.card[data-tooltip], .dropdown-item[data-tooltip], .mobile-submenu-item[data-tooltip]');
        if (target) {
            if (target !== activeTarget) {
                activeTarget = target;
                tip.innerHTML = templates[target.dataset.tooltip] || '';
            }
            tip.style.left = (e.clientX + 12) + 'px';
            tip.style.top  = (e.clientY + 12) + 'px';
            tip.classList.add('visible');
        } else if (activeTarget) {
            activeTarget = null;
            tip.classList.remove('visible');
        }
    });
})();


/* ─── 9. LANGUAGE SWITCHER (i18n) ──────────────────────────────── */

(function () {
    const STORAGE_KEY = 'vf-lang';
    const DEFAULT_LANG = 'pt-BR';

    function resolveLanguage(lang) {
        if (!lang) return null;
        if (window.TRANSLATIONS?.[lang]) return lang;

        const normalized = String(lang).toLowerCase();
        if (normalized.startsWith('pt')) return 'pt-BR';
        if (normalized.startsWith('en')) return 'en';

        return null;
    }

    function getBrowserPreferredLanguage() {
        const preferred = Array.isArray(navigator.languages) && navigator.languages.length
            ? navigator.languages
            : [navigator.language, navigator.userLanguage];

        for (const lang of preferred) {
            const resolved = resolveLanguage(lang);
            if (resolved) return resolved;
        }

        return null;
    }

    /**
     * Update the first non-empty text node of an element.
     * Works for plain text elements AND elements that contain icon children.
     */
    function setText(el, val) {
        if (el.childElementCount === 0) {
            el.textContent = val;
        } else {
            for (const node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    const lead  = node.textContent.match(/^\s*/)[0];
                    const trail = node.textContent.match(/\s*$/)[0];
                    node.textContent = lead + val.trim() + trail;
                    return;
                }
            }
        }
    }

    function getCurrentLanguageFlag(lang) {
        return lang === 'pt-BR'
            ? { src: 'brazil.png', alt: 'Português' }
            : { src: 'usa.png', alt: 'English' };
    }

    let heroTitleTyped = false;
    function typeHeroTitleOnLoad() {
        if (heroTitleTyped) return;

        const headerEl = document.querySelector('#home .hero-text .hero-header');
        const titleEl = document.querySelector('#home .hero-text h1');
        const descEl = document.querySelector('#home .hero-text > p');
        if (!headerEl || !titleEl || !descEl) return;

        const titleText = titleEl.textContent || '';
        if (!titleText.trim()) return;

        heroTitleTyped = true;

        function prepareFadeUp(el) {
            el.classList.remove('hero-fade-visible');
            el.style.transition = 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)';
        }

        function showFadeUp(el, delayMs) {
            setTimeout(() => {
                el.classList.add('hero-fade-visible');
            }, delayMs);
        }

        function randomBetween(min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        }

        function getNaturalDelay(ch) {
            if (ch === '\n') return randomBetween(150, 240);
            if (ch === ' ') return randomBetween(18, 38);

            let delay = randomBetween(28, 62);
            if (/[.,!?;:]/.test(ch)) delay += randomBetween(110, 220);

            if (Math.random() < 0.08) delay += randomBetween(70, 160);
            return delay;
        }

        function wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function typeText(el, text) {
            el.textContent = '';
            const chars = Array.from(text);
            let i = 0;

            return new Promise(resolve => {
                (function step() {
                    if (i >= chars.length) {
                        resolve();
                        return;
                    }

                    const ch = chars[i++];
                    el.textContent += ch;
                    setTimeout(step, getNaturalDelay(ch));
                })();
            });
        }

        // Reserve final height so the layout does not shift while typing.
        titleEl.textContent = titleText;
        const finalHeight = titleEl.offsetHeight;
        if (finalHeight > 0) titleEl.style.minHeight = finalHeight + 'px';
        titleEl.textContent = '';
        titleEl.classList.add('hero-type-ready');

        prepareFadeUp(headerEl);
        prepareFadeUp(descEl);

        (async function runTypingSequence() {
            showFadeUp(headerEl, 420);
            await wait(1250);
            await typeText(titleEl, titleText);
            await wait(520);
            showFadeUp(descEl, 0);
        })();
    }

    function applyLang(lang, { persist = true, source = 'manual' } = {}) {
        const resolvedLang = resolveLanguage(lang) || DEFAULT_LANG;
        const dict = window.TRANSLATIONS?.[resolvedLang];
        if (!dict) return;

        /* Update <html lang> attribute */
        document.documentElement.lang = resolvedLang;

        /* Translate all tagged elements */
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const val = dict[el.dataset.i18n];
            if (val !== undefined) setText(el, val);
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const val = dict[el.dataset.i18nHtml];
            if (val !== undefined) el.innerHTML = val;
        });

        /* Update page <title> */
        const titleKey = document.documentElement.dataset.i18nPageTitle;
        if (titleKey && dict[titleKey]) document.title = dict[titleKey];

        /* Update card tooltips */
        applyTooltipLang?.(dict);

        /* Update current language flags in nav/mobile toggles */
        const flag = getCurrentLanguageFlag(resolvedLang);
        document.querySelectorAll('[data-current-language-flag]').forEach(img => {
            img.setAttribute('src', flag.src);
            img.setAttribute('alt', flag.alt);
        });

        /* Persist choice */
        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY, resolvedLang);
            } catch (e) {}
        }
    }

    /* Listen to all [data-language] buttons directly (desktop + mobile) */
    document.querySelectorAll('[data-language]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            applyLang(this.dataset.language, { persist: true, source: 'manual' });
            closeAllCv?.();
            closeMobileMenu?.();
        });
    });

    /* Apply saved language, otherwise browser preference */
    const savedRaw = (function () {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    })();
    const saved = resolveLanguage(savedRaw);
    const browserPreferred = getBrowserPreferredLanguage();
    const initialLang = saved || browserPreferred || DEFAULT_LANG;

    applyLang(initialLang, { persist: !!saved });
    typeHeroTitleOnLoad();
})();

})();
