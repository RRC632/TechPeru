document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('techperu-form');
    const dniField = document.getElementById('idPersona');
    const langBtn = document.getElementById('langBtn');
    const langPanel = document.getElementById('langPanel');

    // Inicialización de Supabase con tus credenciales proporcionadas
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
        
        document.querySelectorAll('.lang-text').forEach(el => {
            if (el.tagName === 'BUTTON' || (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'reset'))) {
                el.textContent = el.getAttribute(`data-${idioma}`);
            } else {
                el.textContent = el.getAttribute(`data-${idioma}`);
            }
        });

        document.querySelectorAll('input[data-placeholder-es], textarea[data-placeholder-es]').forEach(input => {
            const ph = input.getAttribute(`data-placeholder-${idioma}`);
            if (ph) input.placeholder = ph;
        });
    }

    // --- FILTRO Y VALIDACIÓN DEL DNI ---
    if (dniField) {
        dniField.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); 
            if (e.target.value.length === 8) {
                dniField.style.borderColor = "#2ecc71";
                dniField.style.boxShadow = "0 0 5px rgba(46, 204, 113, 0.3)";
            } else if (e.target.value.length > 0) {
                dniField.style.borderColor = "#e74c3c";
                dniField.style.boxShadow = "0 0 5px rgba(231, 76, 60, 0.2)";
            } else {
                dniField.style.borderColor = "#cbd5e1";
                dniField.style.boxShadow = "none";
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita que se recargue la página por defecto
            const currentLang = document.documentElement.lang || 'es';

            // Recolectar checkboxes de "¿Cómo nos conoces?" unidos por coma (ya que en Supabase la columna 'Conocer' es tipo varchar)
            const origenes = Array.from(form.querySelectorAll('input[name="origen"]:checked'))
                                  .map(cb => cb.value)
                                  .join(', ');

            // Mapeo exacto con los nombres de columnas de tu tabla "Contacto" en Supabase
            const rowData = {
                DNI:          dniField.value ? Number(dniField.value) : null,
                Nombre:       form.nombre.value,
                Apellido:     form.apellido.value,
                Email:        form.email.value,
                Edad:         form.edad.value ? Number(form.edad.value) : null,
                Genero:       (form.querySelector('input[name="genero"]:checked') || {}).value || null,
                Lugar:        form.departamento.value,
                Conocer:      origenes,
                Comentario:   form.comentario.value
            };

            // Inserción en la tabla 'Contacto' (respetando la C mayúscula tal como está en tu esquema)
            const { error } = await supabase.from('Contacto').insert([rowData]);

            if (error) {
                alert(currentLang === 'en' ? '⚠️ Error saving: ' + error.message
                                           : '⚠️ Error al guardar: ' + error.message);
                console.error("Supabase Error:", error);
            } else {
                alert(currentLang === 'en'
                  ? '🚀 Success! Your data has been saved to the database.'
                  : '🚀 ¡Éxito! Tus datos se guardaron en la base de datos.');
                form.reset();
                if (dniField) {
                    dniField.style.borderColor = "#cbd5e1";
                    dniField.style.boxShadow = "none";
                }
            }
        });   

        form.addEventListener('reset', () => {
            if (dniField) {
                dniField.style.borderColor = "#cbd5e1";
                dniField.style.boxShadow = "none";
            }
        });
    }
});