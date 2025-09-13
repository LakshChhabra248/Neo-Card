document.addEventListener('DOMContentLoaded', function() {
    // Page se zaroori elements ko select karo
    const categoryBoxes = document.querySelectorAll('.category-box');
    const hiddenCategoryInput = document.getElementById('category');

    // Check karo ki yeh elements page par maujood hain ya nahi (safety check)
    if (categoryBoxes.length > 0 && hiddenCategoryInput) {
        
        // Jaise hi page load ho, hidden input ki default value 'student' set kar do
        hiddenCategoryInput.value = 'student';

        // Har category box par ek click event listener lagao
        categoryBoxes.forEach(box => {
            box.addEventListener('click', function() {
                
                // 1. Pehle sabhi boxes se 'active' class hata do
                categoryBoxes.forEach(b => {
                    b.classList.remove('active');
                });

                // 2. Sirf jis box par click hua hai, us par 'active' class lagao
                this.classList.add('active');

                // 3. Us box ka 'data-category' attribute (e.g., "student", "teacher") haasil karo
                const selectedCategory = this.dataset.category;

                // 4. Hidden input field ki value ko nayi selected category se update kar do
                //    Taki jab form submit ho, to backend ko pata chale ki kaunsi category select hui thi
                hiddenCategoryInput.value = selectedCategory;
                
                console.log('Selected Category:', selectedCategory); // Testing ke liye, aap isko baad mein hata sakte ho
            });
        });
    }

    // Optional: Agar aap "Forgot Password" ke liye kuch karna chahte hain
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Forgot Password functionality will be added later.');
        });
    }
});