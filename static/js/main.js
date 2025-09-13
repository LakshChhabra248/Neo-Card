document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordIcons = document.querySelectorAll('.toggle-password-icon');

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Icon ke paas wale input field ko dhoondo
            const passwordField = this.previousElementSibling;

            // Check karo ki input ka type 'password' hai ya 'text'
            if (passwordField.type === 'password') {
                // Agar password hai, to use text bana do
                passwordField.type = 'text';
                this.textContent = '🙈'; // Icon badal do
            } else {
                // Agar text hai, to use wapas password bana do
                passwordField.type = 'password';
                this.textContent = '👁️'; // Icon wapas badal do
            }
        });
    });
});