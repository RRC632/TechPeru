document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const userInput = document.getElementById('user');
    const passInput = document.getElementById('pass');
    const errorMessage = document.getElementById('errorMessage');
    const langBtn = document.getElementById('langBtn');
    const langPanel = document.getElementById('langPanel');

    // --- MÓDULO DE TRADUCCIÓN ---
    if (langBtn && langPanel) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langPanel.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!langPanel.contains(e.target) && e.target !== langBtn) {
                langPanel.classList.remove('show');
            }
        });
    }

    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const seleccionado = option.getAttribute('data-lang');
            traducirSitio(seleccionado);
            langPanel.classList.remove('show');
        });
    });

    function traducirSitio(idioma) {
        document.documentElement.lang = idioma;
        errorMessage.textContent = ''; // Limpia errores al cambiar idioma
        
        document.querySelectorAll('.lang-text').forEach(el => {
            if (el.tagName === 'INPUT' && el.type === 'submit') {
                el.value = el.getAttribute(`data-${idioma}`);
            } else {
                el.textContent = el.getAttribute(`data-${idioma}`);
            }
        });

        document.querySelectorAll('input[data-placeholder-es]').forEach(input => {
            const ph = input.getAttribute(`data-placeholder-${idioma}`);
            if (ph) input.placeholder = ph;
        });
    }

    // --- LOGICA DE LOGEO ---
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            errorMessage.textContent = ''; 

            const userValue = userInput.value.trim();
            const passValue = passInput.value.trim();
            const currentLang = document.documentElement.lang;

            if (userValue.length < 4) {
                if (currentLang === 'en') {
                    errorMessage.textContent = 'The username or email must be at least 4 characters long.';
                } else {
                    errorMessage.textContent = 'El usuario o correo debe tener al menos 4 caracteres.';
                }
                return;
            }

            if (passValue.length < 6) {
                if (currentLang === 'en') {
                    errorMessage.textContent = 'The password must be at least 6 characters long.';
                } else {
                    errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                }
                return;
            }

            if (currentLang === 'en') {
                alert(`Attempting to log in with user: ${userValue}`);
            } else {
                alert(`Intentando iniciar sesión con el usuario: ${userValue}`);
            }
        });
    }
});
