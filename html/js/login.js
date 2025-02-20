// login.js
document.addEventListener('DOMContentLoaded', function() {

    const categoryBoxes = document.querySelectorAll('.category-box');
    const loginForm = document.getElementById('loginForm');

    // Category Box Click Handlers
    categoryBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Remove 'active' class from all boxes
            categoryBoxes.forEach(b => b.classList.remove('active'));
            // Add 'active' class to the clicked box
            this.classList.add('active');
        });
    });

    // Login Form Submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission (page reload)

        const loginId = document.getElementById('loginId').value;
        const password = document.getElementById('password').value;
        const selectedCategory = document.querySelector('.category-box.active').dataset.category; //Get the selected category

    
        if (loginId.trim() === '' || password.trim() === '') {
            alert('Please enter your Login ID and Password.');
            return;
        }

        // Placeholder for login logic (replace with your actual login process)
        console.log("Logging in:", { category: selectedCategory, loginId: loginId, password: password });

    });

    // "Forgot Password" Link (Placeholder)
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        alert('Forgot Password functionality not yet implemented.'); 
    });

    // "Sign Up" Link (Placeholder)
    const signUpLink = document.querySelector('.sign-up');
    signUpLink.addEventListener('click', function(event) {
        window.open("https://forms.gle/uo7H9cZUVVn2ReWw9", "_blank")
    });
});