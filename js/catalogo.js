document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.catalog-products-grid');

    if (productsGrid) {
        productsGrid.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-catalog-buy')) {
                const button = event.target;
                const productCard = button.closest('.catalog-product-card');
                const productName = productCard.querySelector('h4').textContent;

                // Detectamos el idioma actual del documento HTML
                const currentLang = document.documentElement.lang;

                // Si la página está configurada en inglés ("en") cambia el mensaje
                if (currentLang === 'en') {
                    alert(`"${productName}" added to cart! 🛒`);
                } else {
                    alert(`¡"${productName}" agregado al carrito! 🛒`);
                }
            }
        });
    }
});






document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    const langPanel = document.getElementById('langPanel');

    // Alternar visualización al hacer clic en el botón
    langBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el evento burbujee al documento
        langPanel.classList.toggle('show');
    });

    // Cerrar el panel automáticamente si el usuario hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (!langPanel.contains(event.target) && event.target !== langBtn) {
            langPanel.classList.remove('show');
        }
    });

    // Controlar el clic en las opciones de idioma
const langOptions = document.querySelectorAll('.lang-option');
langOptions.forEach(option => {
    option.addEventListener('click', (event) => {
        // --- IMPORTANTE: NO pongas event.preventDefault() aquí ---
        
        // Cerramos el panel antes de que cargue la nueva página
        if (langPanel) {
            langPanel.classList.remove('show');
        }
        
        // El navegador ahora sí ejecutará el "href" del enlace de manera natural
    });
});

})
