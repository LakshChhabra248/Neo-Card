function showContent(sectionId) {
    // Hide all content boxes
    let contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        box.classList.remove('active');
    });

    // Show the selected content
    let selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}
function showContent(contentId) {
    const contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        if (box.id === contentId) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
}

// Initially show the personal info section
document.addEventListener('DOMContentLoaded', () => {
    showContent('personalInfo');
});
