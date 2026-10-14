// js/index.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. BUSCADOR EN TIEMPO REAL
    // ==========================================
    const searchInput = document.getElementById('search-input');
    const serverCards = document.querySelectorAll('.server-card');
    const noResultsMessage = document.getElementById('no-results-message');
    const searchForm = document.querySelector('.search-form');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            let matchesFound = 0;

            serverCards.forEach(card => {
                const titleElement = card.querySelector('.server-title');
                if (titleElement) {
                    const title = titleElement.textContent.toLowerCase();
                    
                    // Si el título incluye lo escrito, se muestra; si no, se oculta
                    if (title.includes(query)) {
                        card.style.display = "flex"; // Se usa flex para mantener la estructura original de tus tarjetas
                        matchesFound++;
                    } else {
                        card.style.display = "none";
                    }
                }
            });

            // Mostrar u ocultar mensaje de "No resultados"
            if (noResultsMessage) {
                if (matchesFound === 0) {
                    noResultsMessage.style.display = "block";
                } else {
                    noResultsMessage.style.display = "none";
                }
            }
        });
    }

    // Evitar que el botón "Buscar" recargue la página innecesariamente
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => e.preventDefault());
    }


    // ==========================================
    // 2. SELECCIÓN ACTIVA DE CATEGORÍAS
    // ==========================================
    const categoryLinks = document.querySelectorAll('#categories-nav .nav-card');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Detiene el salto del enlace '#'
            
            // Remover la clase activa de todos los botones
            categoryLinks.forEach(item => item.classList.remove('active'));
            
            // Agregársela únicamente al botón presionado
            link.classList.add('active');

            // Lanzar una notificación rápida
            const categoria = link.querySelector('span').textContent;
            showToast(`Cargando sección: ${categoria}`);
        });
    });


    // ==========================================
    // 3. SISTEMA DE NOTIFICACIONES FLOTANTES (TOASTS)
    // ==========================================
    const cotizarButtons = document.querySelectorAll('.btn-cotizar-card');

    cotizarButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtener el nombre del producto directamente desde su tarjeta contenedora
            const titleElement = button.parentElement.querySelector('.server-title');
            if (titleElement) {
                const productoNombre = titleElement.textContent;
                showToast(`🛒 ${productoNombre} añadido a tu lista de cotización.`);
            }
        });
    });

    // Función reutilizable para crear las alertas dinámicas en pantalla
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Animación de salida y auto-eliminación después de 3.5 segundos
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }


    // ==========================================
    // 4. AUTO-FILTRADO POR MARCAS (BADGES)
    // ==========================================
    const badges = document.querySelectorAll('.partner-badge');
    
    badges.forEach(badge => {
        badge.style.cursor = 'pointer'; // Transforma el cursor en una mano interactiva
        badge.addEventListener('click', () => {
            const marca = badge.textContent;
            if (searchInput) {
                searchInput.value = marca;
                // Dispara el evento artificialmente para activar el buscador en tiempo real anterior
                searchInput.dispatchEvent(new Event('input')); 
                showToast(`Filtrando catálogo por: ${marca}`);
            }
        });
    });


    // ==========================================
    // 5. CONTROL DEL DESPLEGABLE DE IDIOMA
    // ==========================================
    const langBtn = document.getElementById('langBtn');
    const langPanel = document.getElementById('langPanel');

    if (langBtn && langPanel) {
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
    }

    // Controlar el clic en las opciones de idioma
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            const seleccionado = option.getAttribute('data-lang');
            // Si usamos la redirección directa por HREF (Estrategia A), dejamos que actúe el enlace nativo
            if (!option.getAttribute('href') || option.getAttribute('href') === '#') {
                event.preventDefault();
                cambiarIdiomaSitio(seleccionado);
            }
        });
    });
});

function cambiarIdiomaSitio(idioma) {
    alert(`Cambiando el sitio al idioma: ${idioma.toUpperCase()}`);
}
