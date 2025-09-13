// Function to show/hide content sections based on sidebar clicks
function showContent(sectionId) {
    // Pehle saare content sections ko chhupa do
    const contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        box.style.display = 'none';
    });

    // Ab sirf uss section ko dikhao jis par click hua hai
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Yeh ensure karta hai ki page poora load hone ke baad hi code chale
document.addEventListener('DOMContentLoaded', () => {
    // Default roop se, 'Personal Info' wala section dikhao
    showContent('personalInfo'); 
});