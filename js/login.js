document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const userInput = document.getElementById('user');
    const passInput = document.getElementById('pass');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        errorMessage.textContent = ''; 

        const userValue = userInput.value.trim();
        const passValue = passInput.value.trim();

        if (userValue.length < 4) {
            errorMessage.textContent = 'El usuario o correo debe tener al menos 4 caracteres.';
            return;
        }

        if (passValue.length < 6) {
            errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            return;
        }

        alert(`Intentando iniciar sesión con el usuario: ${userValue}`);
    });
});
