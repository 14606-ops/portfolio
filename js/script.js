/* =========================================================
   Portfolio — shared scripts
   1) Mobile nav toggle
   2) Ambient ember particle field
   3) Gallery lightbox (award.html / activities.html)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1) Mobile nav toggle ---------- */
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.navbar ul');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('show');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => menu.classList.remove('show'));
        });
    }

    /* ---------- 2) Ambient ember particles ---------- */
    document.querySelectorAll('.ember-field').forEach(field => {
        const count = 22;
        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            const left = Math.random() * 100;
            const delay = Math.random() * 8;
            const duration = 6 + Math.random() * 6;
            const drift = (Math.random() * 60 - 30) + 'px';

            span.style.left = left + '%';
            span.style.animationDelay = delay + 's';
            span.style.animationDuration = duration + 's';
            span.style.setProperty('--drift', drift);

            field.appendChild(span);
        }
    });

    /* ---------- 3) Gallery lightbox ---------- */
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('lightbox');

    if (galleryItems.length && lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            const item = galleryItems[currentIndex];
            const fullSrc = item.dataset.full || item.querySelector('img').src;
            const caption = item.dataset.caption || '';

            lightboxImg.src = fullSrc;
            lightboxImg.alt = item.querySelector('img').alt || '';
            lightboxCaption.textContent = caption;

            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        function showRelative(step) {
            currentIndex = (currentIndex + step + galleryItems.length) % galleryItems.length;
            openLightbox(currentIndex);
        }

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', () => showRelative(-1));
        nextBtn.addEventListener('click', () => showRelative(1));

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showRelative(-1);
            if (e.key === 'ArrowRight') showRelative(1);
        });
    }
});
