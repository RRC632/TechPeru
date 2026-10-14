document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos el contenedor principal que agrupa todas las tarjetas de productos
    const productsGrid = document.querySelector('.catalog-products-grid');

    if (productsGrid) {
        // Escuchamos los clics dentro de la grilla de productos
        productsGrid.addEventListener('click', (event) => {
            
            // Verificamos si el elemento clickeado es el botón de compra
            if (event.target.classList.contains('btn-catalog-buy')) {
                const button = event.target;
                
                // Buscamos la tarjeta contenedora del producto más cercana (.catalog-product-card)
                const productCard = button.closest('.catalog-product-card');
                
                // Extraemos el nombre del producto (dentro de la etiqueta h4)
                const productName = productCard.querySelector('h4').textContent;

                // Mostramos el mensaje solicitado en pantalla
                alert(`¡"${productName}" agregado al carrito! 🛒`);
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
            event.preventDefault();
            const seleccionado = option.getAttribute('data-lang');
            
            // Aquí ejecutaremos la lógica de cambio de idioma
            cambiarIdiomaSitio(seleccionado);
        });
    });
});

function cambiarIdiomaSitio(idioma) {
    alert(`Cambiando el sitio al idioma: ${idioma.toUpperCase()}`);
    // Aquí implementas la estrategia elegida abajo
}
