// student_page.js (Same as before)
document.addEventListener('DOMContentLoaded', function() {

    // Function to hide all slides
    function hideAllSlides() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
    }

    // Function to activate a slide
    function showSlide(slideId) {
        hideAllSlides();
        const slide = document.getElementById(slideId);
        if (slide) {
            slide.classList.add('active');
        }
    }

    // Function to update the active side menu link
    function updateActiveSideMenuLink(slideId) {
        const sideMenuLinks = document.querySelectorAll('.side-menu-link');
        sideMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + slideId) {
                link.classList.add('active');
            }
        });
    }

    // Side Menu Link Clicks (Smooth Scrolling and Slide Switching)
    const sideMenuLinks = document.querySelectorAll('.side-menu-link');

    sideMenuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const slideId = this.getAttribute('href').substring(1); // Get the ID without "#"
            showSlide(slideId);
            updateActiveSideMenuLink(slideId);
        });
    });

    // Initially show personal data section and highlight menu
    showSlide('personal-data');
    updateActiveSideMenuLink('personal-data');


    // Placeholder: Fetch and display student data
    // Replace this with actual API calls to your backend
    // and dynamic content population

    // Example (replace with your actual data retrieval)
    function loadStudentData() {
        //  Simulate fetching data from a backend
        setTimeout(() => { // Simulate a network request
            document.getElementById('studentName').textContent = "Alice Smith";
            document.getElementById('rollNumber').textContent = "67890";
            document.getElementById('studentClass').textContent = "10th";
            // ... update other fields with real data
        }, 1000); // Simulate 1 second delay
    }

    function loadAttendanceData() {
        // Simulate fetching data from a backend
        setTimeout(() => {
            const attendanceDisplay = document.getElementById('attendanceDisplay');
            attendanceDisplay.innerHTML = `
                <h3>Attendance Record</h3>
                <p>Total Days Present: 150</p>
                <p>Total Days Absent: 10</p>
                <!-- You can display a table, chart, or other visualization here -->
            `;
        }, 1500); //Simulate a 1.5 second delay
    }

    function loadMarksheetData() {
        // Simulate fetching data from a backend
        setTimeout(() => {
            const marksheetDisplay = document.getElementById('marksheetDisplay');
            marksheetDisplay.innerHTML = `
                <h3>Marksheet</h3>
                <p>View last class marks</p>
            `;
        }, 1500); //Simulate a 1.5 second delay
    }

    function loadFeesData() {
      // Simulate fetching data from a backend
      setTimeout(() => {
          const feesDisplay = document.getElementById('feesDisplay');
          feesDisplay.innerHTML = `
              <h3>Fees Records</h3>
              <p>School fee records display Here</p>
          `;
      }, 1500); //Simulate a 1.5 second delay
    }

    function loadTransactionData() {
        // Simulate fetching data from a backend
        setTimeout(() => {
            const transactionsDisplay = document.getElementById('transactionsDisplay');
            transactionsDisplay.innerHTML = `
                <h3>Transactions</h3>
                <p>Canteen transactions Here</p>
            `;
        }, 1500); //Simulate a 1.5 second delay
    }

    loadStudentData();
    loadAttendanceData();
    loadMarksheetData();
    loadFeesData();
    loadTransactionData();
});