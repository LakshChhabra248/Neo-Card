/**
 * Yeh function page ke alag-alag content sections ko show aur hide karta hai.
 * @param {string} sectionId - Us section ki ID jise dikhana hai (e.g., 'dashboard', 'attendance').
 */
function showSection(sectionId) {
    // 1. Pehle saare content sections ko dhoondo aur unse 'active' class hata do.
    // 'active' class hi CSS mein section ko dikhati hai.
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // 2. Ab sirf uss section ko select karo jiski ID function mein aayi hai.
    const activeSection = document.getElementById(sectionId);

    // 3. Agar woh section milta hai, to us par 'active' class laga do.
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // --- Extra UI Improvement ---
    // 4. Sidebar mein bhi 'active' class ko update karo taaki user ko pata chale ki woh kis section mein hai.
    const allLinks = document.querySelectorAll('.sidebar ul li');
    allLinks.forEach(link => {
        // Pehle sabse 'active' class hatao.
        link.classList.remove('active');
        
        // Ab check karo ki kya is link ka 'onclick' attribute hamare sectionId se match karta hai.
        if (link.getAttribute('onclick') === `showSection('${sectionId}')`) {
            // Agar match karta hai, to is par 'active' class laga do.
            link.classList.add('active');
        }
    });
}

/**
 * Yeh event listener ensure karta hai ki neeche likha hua code
 * tabhi chale jab poora HTML page browser mein load ho chuka ho.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Jaise hi page load ho, default roop se 'dashboard' wala section dikha do.
    showSection('dashboard');
});