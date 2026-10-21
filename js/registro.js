// Inicializar Supabase con tus credenciales
const SUPABASE_URL = 'https://brelkbtbketukkoymulh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ID-Wtr_ca5gVB-MmrHY50w_tsBmFf4D';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('regPass');
    const confirmPassInput = document.getElementById('confirmPass');
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
        errorMessage.textContent = ''; 
        
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

    // --- LÓGICA DE REGISTRO E INSERCIÓN EN SUPABASE ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            errorMessage.textContent = ''; 

            const nombreValue = firstNameInput.value.trim();
            const apellidoValue = lastNameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const passValue = passInput.value;
            const confirmPassValue = confirmPassInput.value;
            const currentLang = document.documentElement.lang;

            // Validar que sea correo Gmail
            if (!emailValue.toLowerCase().endsWith('@gmail.com')) {
                errorMessage.textContent = currentLang === 'en' 
                    ? 'Please enter a valid Gmail address (@gmail.com).' 
                    : 'Por favor, ingrese un correo válido de Gmail (@gmail.com).';
                return;
            }

            // Validar longitud de la contraseña
            if (passValue.length < 6) {
                errorMessage.textContent = currentLang === 'en' 
                    ? 'The password must be at least 6 characters long.' 
                    : 'La contraseña debe tener al menos 6 caracteres.';
                return;
            }

            // Verificador: Validar que las contraseñas coincidan
            if (passValue !== confirmPassValue) {
                errorMessage.textContent = currentLang === 'en' 
                    ? 'Passwords do not match. Please verify.' 
                    : 'Las contraseñas no coinciden. Verifíquelas.';
                return;
            }

            try {
                // Insertar datos en la tabla "Registro" de Supabase
                const { data, error } = await supabaseClient
                    .from('Registro')
                    .insert([
                        { 
                            Nombre: nombreValue, 
                            Apellido: apellidoValue, 
                            Correo: emailValue, 
                            Contraseña: passValue 
                        }
                    ]);

                if (error) {
                    throw error;
                }

                // Mensaje de éxito
                if (currentLang === 'en') {
                    alert(`Account created successfully for ${nombreValue} ${apellidoValue}!`);
                } else {
                    alert(`¡Cuenta creada con éxito para ${nombreValue} ${apellidoValue}!`);
                }

                // Limpiar formulario o redirigir
                registerForm.reset();
                // window.location.href = "login.html";

            } catch (error) {
                console.error('Error al registrar:', error.message);
                errorMessage.textContent = currentLang === 'en'
                    ? 'Error registering. The email might already be registered.'
                    : 'Hubo un error al registrar. Es posible que el correo ya esté registrado.';
            }
        });
    }
});