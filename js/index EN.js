// js/index-en.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. REAL-TIME SEARCH ENGINE
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
                    
                    // If the title includes the input, show it; otherwise, hide it
                    if (title.includes(query)) {
                        card.style.display = "flex"; // Se cambia a flex para mantener tu estructura de tarjetas
                        matchesFound++;
                    } else {
                        card.style.display = "none";
                    }
                }
            });

            // Show or hide "No results" message
            if (noResultsMessage) {
                if (matchesFound === 0) {
                    noResultsMessage.style.display = "block";
                } else {
                    noResultsMessage.style.display = "none";
                }
            }
        });
    }

    // Prevent "Search" button from reloading page unnecessarily
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => e.preventDefault());
    }


    // ==========================================
    // 2. ACTIVE CATEGORIES SELECTION
    // ==========================================
    const categoryLinks = document.querySelectorAll('#categories-nav .nav-card');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Stops the link '#' jump
            
            // Remove active class from all buttons
            categoryLinks.forEach(item => item.classList.remove('active'));
            
            // Add it only to the clicked button
            link.classList.add('active');

            // Launch a quick notification
            const category = link.querySelector('span').textContent;
            showToast(`Loading section: ${category}`);
        });
    });


    // ==========================================
    // 3. FLOATING NOTIFICATIONS SYSTEM (TOASTS)
    // ==========================================
    const cotizarButtons = document.querySelectorAll('.btn-cotizar-card');

    cotizarButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get product name directly from its container card
            const titleElement = button.parentElement.querySelector('.server-title');
            if (titleElement) {
                const productName = titleElement.textContent;
                showToast(`🛒 ${productName} added to your quotation list.`);
            }
        });
    });

    // Reusable function to create dynamic alerts on screen
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Output animation and auto-deletion after 3.5 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }


    // ==========================================
    // 4. AUTOMATIC BRAND FILTERING (EXTRA)
    // ==========================================
    const badges = document.querySelectorAll('.partner-badge');
    
    badges.forEach(badge => {
        badge.style.cursor = 'pointer'; // Transforms cursor into a pointer hand
        badge.addEventListener('click', () => {
            const brand = badge.textContent;
            if (searchInput) {
                searchInput.value = brand;
                // Artificially triggers input event to run real-time filtering
                searchInput.dispatchEvent(new Event('input')); 
                showToast(`Filtering catalog by: ${brand}`);
            }
        });
    });


    // ==========================================
    // 5. LANGUAGE DROPDOWN NAVIGATION CONTROL
    // ==========================================
    const langBtn = document.getElementById('langBtn');
    const langPanel = document.getElementById('langPanel');

    if (langBtn && langPanel) {
        // Toggle view on button click
        langBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents event from bubbling to document
            langPanel.classList.toggle('show');
        });

        // Auto close panel if user clicks outside
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
        // --- IMPORTANTE: NO pongas event.preventDefault() aquí ---
        
        // Cerramos el panel antes de que cargue la nueva página
        if (langPanel) {
            langPanel.classList.remove('show');
        }
        
        // El navegador ahora sí ejecutará el "href" del enlace de manera natural
    });
});

});

function cambiarIdiomaSitio(idioma) {
    alert(`Switching site language to: ${idioma.toUpperCase()}`);
}
