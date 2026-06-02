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

});