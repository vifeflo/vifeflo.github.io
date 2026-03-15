/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX — Fullscreen Image Viewer
   ───────────────────────────────────────────────────────────────
   Auto-initialises on DOMContentLoaded.
   Every <img> with class "lightbox-trigger" becomes clickable.
   Features: prev/next arrows, keyboard nav, click-to-zoom,
   scroll-to-zoom, drag-to-pan, close (X / Escape / overlay click).
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ─── Build DOM ────────────────────────────────────────────── */

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
        <button class="lightbox-prev" aria-label="Previous image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
            </svg>
        </button>
        <button class="lightbox-next" aria-label="Next image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 6 15 12 9 18"/>
            </svg>
        </button>
        <span class="lightbox-counter"></span>
        <div class="lightbox-image-wrap">
            <img src="" alt="" draggable="false">
        </div>
        <p class="lightbox-caption"></p>
    `;
    document.body.appendChild(overlay);

    const closeBtn  = overlay.querySelector('.lightbox-close');
    const prevBtn   = overlay.querySelector('.lightbox-prev');
    const nextBtn   = overlay.querySelector('.lightbox-next');
    const counter   = overlay.querySelector('.lightbox-counter');
    const wrap      = overlay.querySelector('.lightbox-image-wrap');
    const img       = wrap.querySelector('img');
    const caption   = overlay.querySelector('.lightbox-caption');

    /* ─── State ────────────────────────────────────────────────── */

    let images  = [];
    let current = 0;
    let scale   = 1;
    let panX    = 0;
    let panY    = 0;
    let isDragging = false;
    let didDrag    = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragPanX   = 0;
    let dragPanY   = 0;

    const MIN_SCALE = 1;
    const MAX_SCALE = 5;

    /* ─── Helpers ──────────────────────────────────────────────── */

    function getImageName(src) {
        try {
            const url = new URL(src, window.location.href);
            let name = decodeURIComponent(url.pathname.split('/').pop());
            /* Strip extension */
            name = name.replace(/\.[^.]+$/, '');
            return name;
        } catch {
            return '';
        }
    }

    function getTrimmedText(el) {
        if (!el) return '';
        return (el.textContent || '').trim();
    }

    function getLightboxCaption(el) {
        if (!el) return '';

        const explicitCaption = (el.dataset.lightboxCaption || '').trim();
        if (explicitCaption) return explicitCaption;

        const lookupSelectors = [
            '.caption',
            '.card-title h3',
            '.key-feature-content h3',
            '.section-title h2',
            '.studyin-section-title',
            '.section-head',
            '.hero-card h1',
            '.project-hero-content h1',
            '.project-hero-bottom h1',
            'h1'
        ];

        const containerSelectors = [
            '.showcase-item',
            '.key-feature',
            '.card',
            '.card-full',
            '.showcase-image',
            '.project-hero-image',
            '.project-hero-top',
            '.hero-card',
            '.section',
            '.project-hero'
        ];

        for (const containerSelector of containerSelectors) {
            const container = el.closest(containerSelector);
            if (!container) continue;

            for (const lookupSelector of lookupSelectors) {
                const found = container.querySelector(lookupSelector);
                const text = getTrimmedText(found);
                if (text) return text;
            }
        }

        const alt = (el.alt || '').trim();
        if (alt) return alt;

        return getImageName(el.src);
    }

    function updateArrows() {
        prevBtn.classList.toggle('hidden', current <= 0);
        nextBtn.classList.toggle('hidden', current >= images.length - 1);
        counter.textContent = images.length > 1
            ? `${current + 1} / ${images.length}`
            : '';
    }

    function resetZoom() {
        scale = 1;
        panX = 0;
        panY = 0;
        applyTransform();
        wrap.classList.remove('zoomed');
        overlay.classList.remove('lightbox-zoomed');
    }

    function applyTransform() {
        img.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    }

    function clampPan() {
        if (scale <= 1) { panX = 0; panY = 0; return; }
        const rect = wrap.getBoundingClientRect();
        const imgW = img.naturalWidth  * (rect.width  / img.naturalWidth)  * scale;
        const imgH = img.naturalHeight * (rect.height / img.naturalHeight) * scale;
        const maxX = Math.max(0, (imgW - rect.width) / 2);
        const maxY = Math.max(0, (imgH - rect.height) / 2);
        panX = Math.min(maxX, Math.max(-maxX, panX));
        panY = Math.min(maxY, Math.max(-maxY, panY));
    }

    /* ─── Show / Navigate ──────────────────────────────────────── */

    function show(index) {
        current = index;
        const entry = images[current];
        img.src = entry.src;
        img.alt = entry.alt || '';
        caption.textContent = entry.caption || entry.alt || getImageName(entry.src);
        resetZoom();
        updateArrows();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
    }

    function prev() { if (current > 0)                 { resetZoom(); show(current - 1); } }
    function next() { if (current < images.length - 1)  { resetZoom(); show(current + 1); } }

    /* ─── Zoom ─────────────────────────────────────────────────── */

    function toggleZoom() {
        if (scale > 1) {
            resetZoom();
        } else {
            scale = 2.5;
            panX = 0;
            panY = 0;
            applyTransform();
            wrap.classList.add('zoomed');
            overlay.classList.add('lightbox-zoomed');
        }
    }

    function scrollZoom(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.25 : 0.25;
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));

        if (scale <= 1) {
            resetZoom();
        } else {
            clampPan();
            applyTransform();
            wrap.classList.add('zoomed');
            overlay.classList.add('lightbox-zoomed');
        }
    }

    /* ─── Drag / Pan ───────────────────────────────────────────── */

    function onPointerDown(e) {
        if (scale <= 1) return;
        isDragging = true;
        didDrag    = false;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragPanX = panX;
        dragPanY = panY;
        wrap.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag = true;
        panX = dragPanX + dx;
        panY = dragPanY + dy;
        clampPan();
        applyTransform();
    }

    function onPointerUp() {
        isDragging = false;
    }

    /* ─── Events ───────────────────────────────────────────────── */

    /* Triggers */
    document.addEventListener('click', function (e) {
        const trigger = e.target.closest('.lightbox-trigger');
        if (!trigger) return;
        /* Collect all trigger images in DOM order */
        images = Array.from(document.querySelectorAll('.lightbox-trigger')).map(function (el) {
            return {
                src: el.src,
                alt: el.alt,
                caption: getLightboxCaption(el)
            };
        });
        const idx = images.findIndex(function (item) { return item.src === trigger.src; });
        show(idx >= 0 ? idx : 0);
    });

    /* Close */
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) close();
    });

    /* Arrows */
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); });

    /* Image click = toggle zoom (only if user didn't drag) */
    wrap.addEventListener('click', function (e) {
        if (didDrag) { didDrag = false; return; }
        e.stopPropagation();
        toggleZoom();
    });

    /* Scroll zoom */
    wrap.addEventListener('wheel', scrollZoom, { passive: false });

    /* Drag to pan */
    wrap.addEventListener('pointerdown', onPointerDown);
    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerup', onPointerUp);
    wrap.addEventListener('pointercancel', onPointerUp);

    /* Keyboard */
    document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('active')) return;
        switch (e.key) {
            case 'Escape':     close(); break;
            case 'ArrowLeft':  prev();  break;
            case 'ArrowRight': next();  break;
        }
    });
})();
