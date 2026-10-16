document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('techperu-form');
    const dniField = document.getElementById('idPersona');
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
        
        // Traducir textos y botones
        document.querySelectorAll('.lang-text').forEach(el => {
            if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'reset')) {
                el.value = el.getAttribute(`data-${idioma}`);
            } else {
                el.textContent = el.getAttribute(`data-${idioma}`);
            }
        });

        // Traducir Placeholders
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
        form.addEventListener('submit', (event) => {
            const triggerButton = document.activeElement;
            const currentLang = document.documentElement.lang;

            if (triggerButton && !triggerButton.hasAttribute('formnovalidate')) {
                if (dniField.value.length > 0 && dniField.value.length !== 8) {
                    event.preventDefault();
                    if (currentLang === 'en') {
                        alert('⚠️ Attention: The entered ID is invalid. It must contain exactly 8 digits.');
                    } else {
                        alert('⚠️ Atención: El DNI ingresado no es válido. Debe contener exactamente 8 dígitos.');
                    }
                    dniField.focus();
                    return;
                }
                
                if (currentLang === 'en') {
                    alert('🚀 Success! Your form has been sent correctly to TechPeru servers.');
                } else {
                    alert('🚀 ¡Éxito! Tu formulario se ha enviado correctamente a los servidores de TechPeru.');
                }
            } else if (triggerButton && triggerButton.hasAttribute('formnovalidate')) {
                if (currentLang === 'en') {
                    alert('📝 Fast mode active: Sending data without system validation.');
                } else {
                    alert('📝 Modo rápido activado: Enviando datos sin validación del sistema.');
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
