document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const userInput = document.getElementById('user');
    const passInput = document.getElementById('pass');
    const errorMessage = document.getElementById('errorMessage');
    const langBtn = document.getElementById('langBtn');
    const langPanel = document.getElementById('langPanel');

    // --- INICIALIZACIÓN DE SUPABASE CON TUS CREDENCIALES ---
    const supabaseUrl = 'https://brelkbtbketukkoymulh.supabase.co';
    const supabaseKey = 'sb_publishable_ID-Wtr_ca5gVB-MmrHY50w_tsBmFf4D';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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

    // --- LÓGICA DE LOGIN CON SUPABASE ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            errorMessage.textContent = ''; 

            const userValue = userInput.value.trim();
            const passValue = passInput.value.trim();
            const currentLang = document.documentElement.lang || 'es';

            // Validaciones locales previas
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

try {
                // Consultamos directamente la tabla 'Registro'
                const { data, error } = await supabase
                    .from('Registro')
                    .select('*')
                    .eq('Correo', userValue)          // Columna exacta de tu tabla Registro
                    .eq('Contraseña', passValue);     // Columna exacta de tu tabla Registro

                if (error) {
                    console.error('Error detallado de Supabase:', error);
                    errorMessage.textContent = currentLang === 'en' 
                        ? 'Database error: ' + error.message 
                        : 'Error de base de datos: ' + error.message;
                    return;
                }

                if (data && data.length > 0) {
                    alert(currentLang === 'en' 
                        ? `Welcome! Successfully logged in as: ${userValue}` 
                        : `¡Bienvenido! Sesión iniciada correctamente como: ${userValue}`);
                    window.location.href = 'index.html';
                    // window.location.href = 'index.html'; // Redirección opcional
                } else {
                    errorMessage.textContent = currentLang === 'en' 
                        ? 'Invalid email or password.' 
                        : 'Correo o contraseña incorrectos.';
                }

            } catch (err) {
                console.error('Error imprevisto:', err);
                errorMessage.textContent = currentLang === 'en' 
                    ? 'An unexpected error occurred.' 
                    : 'Ocurrió un error inesperado.';
            }
        });
    }
});