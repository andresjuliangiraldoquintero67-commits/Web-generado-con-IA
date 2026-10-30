document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú de navegación móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cierra el menú al hacer clic en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Validación de Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el envío real del formulario

            // Limpia mensajes de error previos
            clearErrors();

            let isValid = true;

            // Validar Nombre
            if (nameInput.value.trim() === '') {
                showError('error-name', 'El nombre es obligatorio.');
                isValid = false;
            }

            // Validar Email
            if (emailInput.value.trim() === '') {
                showError('error-email', 'El correo electrónico es obligatorio.');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError('error-email', 'Por favor ingresa un correo válido.');
                isValid = false;
            }

            // Validar Mensaje
            if (messageInput.value.trim() === '') {
                showError('error-message', 'El mensaje no puede estar vacío.');
                isValid = false;
            }

            // Si pasa todas las validaciones
            if (isValid) {
                formFeedback.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito.';
                formFeedback.className = 'form-feedback success';
                contactForm.reset();

                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Funciones auxiliares de validación
    function showError(elementId, message) {
        const errorSpan = document.getElementById(elementId);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
        if (formFeedback) {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});