document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').innerText;
            const productPrice = productCard.querySelector('.product-price').innerText;
            
            alert(`🛒 ¡Servidor añadido con éxito!\n\nModelo: ${productTitle}\nPrecio: ${productPrice}`);
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