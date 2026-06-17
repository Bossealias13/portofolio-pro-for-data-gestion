/* ==========================================================================
   FICHIER APP.JS - Interactivité globale du portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. GESTION DYNAMIQUE DU MENU ACTIF --- */
    // Récupère le nom du fichier actuel dans l'URL (ex: "index.html" ou "expertises.html")
    const currentPage = window.location.pathname.split('/').pop();

    // Sélectionne tous les liens de la barre de navigation
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Par sécurité, on retire la classe 'active' de tous les liens
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        // On récupère vers où pointe le bouton actuel
        const linkTarget = link.getAttribute('href');

        // Si le lien correspond à la page actuelle, on l'illumine
        // L'astuce gère aussi le cas où l'URL est vide (racine du site)
        if (linkTarget === currentPage || (currentPage === '' && linkTarget === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page'); // Norme d'accessibilité
        }
    });

    /* --- 2. CHARGEMENT PROGRESSIF DES VIDÉOS PROJET --- */
    const lazyProjectVideos = document.querySelectorAll('video[data-src]');

    const loadProjectVideo = (video) => {
        const source = video.querySelector('source');
        const src = video.dataset.src;
        if (!source || !src || source.src) return;
        source.src = src;
        video.load();
    };

    if (lazyProjectVideos.length) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadProjectVideo(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 });

            lazyProjectVideos.forEach(video => observer.observe(video));
        } else {
            lazyProjectVideos.forEach(loadProjectVideo);
        }
    }

    /* --- 3. LIGHTBOX / MODALE POUR LES IMAGES DE PROJET --- */
    const zoomButtons = document.querySelectorAll('.media-zoom-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.modal-content img') : null;
    const closeBtn = lightbox ? lightbox.querySelector('.modal-close') : null;

    const openLightbox = (src, alt) => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
    };

    const closeLightbox = () => {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        // supprime la source pour libérer la mémoire
        lightboxImg.src = '';
    };

    if (zoomButtons.length && lightbox) {
        zoomButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wrapper = e.currentTarget.closest('.media-zoom-wrapper');
                const img = wrapper ? wrapper.querySelector('img') : null;
                if (!img) return;
                const src = img.dataset.full || img.src;
                openLightbox(src, img.alt);
            });
            // Ouvrir aussi au clic sur l'image elle-même (comportement attendu)
            const imgElem = btn.closest('.media-zoom-wrapper')?.querySelector('img');
            if (imgElem) {
                imgElem.addEventListener('click', (e) => {
                    const src = imgElem.dataset.full || imgElem.src;
                    openLightbox(src, imgElem.alt);
                });
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });
    }

});