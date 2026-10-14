document.addEventListener('DOMContentLoaded', () => {
    console.log("¡Módulo de Catálogo NAS interactivo cargado correctamente!");

    // 1. Configuración de navegación para las pestañas superiores
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.querySelector('.tab-name').innerText.toLowerCase();
            
            // Redirección automática simulando un sistema de navegación real
            if (tabName.includes('firewall')) {
                window.location.href = 'firewall.html';
            } else if (tabName.includes('almacenamiento') || tabName.includes('nas')) {
                window.location.href = 'nas.html';
            } else if (tabName.includes('biométricos')) {
                window.location.href = 'biometricos.html'; // Próxima página a crear
            }
        });
    });

    // 2. Control de los botones de compra (Mensaje emergente al añadir al carrito)
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Evita cualquier comportamiento extraño o recarga de la página
            event.preventDefault(); 
            
            // Busca la tarjeta de producto contenedora para extraer sus textos reales
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').innerText;
            const productPrice = productCard.querySelector('.product-price').innerText;
            
            // Alerta informativa con los datos del servidor NAS seleccionado
            alert(`🛒 ¡Producto añadido con éxito!\n\nArtículo: ${productTitle}\nPrecio: ${productPrice}\n\nUn asesor comercial validará las bahías y discos de tu pedido.`);
        });
    });
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
