document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('techperu-form');
    const dniField = document.getElementById('idPersona');

    // Filtro en tiempo real para el DNI peruano (Solo números y longitud exacta)
    if (dniField) {
        dniField.addEventListener('input', (e) => {
            // Borra cualquier letra ingresada accidentalmente
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); 

            // Feedback visual dinámico integrado con los colores del sitio
            if (e.target.value.length === 8) {
                dniField.style.borderColor = "#2ecc71"; // Verde éxito si está completo
                dniField.style.boxShadow = "0 0 5px rgba(46, 204, 113, 0.3)";
            } else if (e.target.value.length > 0) {
                dniField.style.borderColor = "#e74c3c"; // Rojo alerta si falta algún número
                dniField.style.boxShadow = "0 0 5px rgba(231, 76, 60, 0.2)";
            } else {
                dniField.style.borderColor = "#cbd5e1"; // Color original si queda vacío
                dniField.style.boxShadow = "none";
            }
        });
    }

    // Gestión de alertas al enviar la información
    if (form) {
        form.addEventListener('submit', (event) => {
            const triggerButton = document.activeElement;

            // Si se envía de manera estándar, validar que el DNI no esté incompleto
            if (triggerButton && !triggerButton.hasAttribute('formnovalidate')) {
                if (dniField.value.length > 0 && dniField.value.length !== 8) {
                    event.preventDefault(); // Cancela la acción por error
                    alert('⚠️ Atención: El DNI ingresado no es válido. Debe contener exactamente 8 dígitos.');
                    dniField.focus();
                    return;
                }
                alert('🚀 ¡Éxito! Tu formulario se ha enviado correctamente a los servidores de TechPeru.');
            } else if (triggerButton && triggerButton.hasAttribute('formnovalidate')) {
                alert('📝 Modo rápido activado: Enviando datos sin validación del sistema.');
            }
        });

        // Limpiar los estilos dinámicos al presionar restablecer
        form.addEventListener('reset', () => {
            if (dniField) {
                dniField.style.borderColor = "#cbd5e1";
                dniField.style.boxShadow = "none";
            }
        });
    }
});