// students.js
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


    function loadStudentData() {
        const studentXLSX = 'js/data/Students.xlsx'; // Path to your XLSX file
        const loginId = localStorage.getItem('loginId'); // Retrieve loginId from localStorage

        if (!loginId) {
            alert('No login ID found. Please log in first.');
            return;
        }

        fetch(studentXLSX)
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Find the student with the matching loginId
                const student = jsonData.find(student => String(student.loginId) === loginId);
                console.log("Student Data",student)

                if (student) {
                    // Populate the HTML elements with the student's data
                    document.getElementById('studentName').textContent = student.Name || 'N/A';
                    document.getElementById('studentClass').textContent = student.Class || 'N/A';
                    document.getElementById('rollNumber').textContent = student['Roll No.'] || 'N/A';
                    document.getElementById('schoolName').textContent = student['School Name'] || 'N/A';
                    document.getElementById('fatherName').textContent = student['Father\'s Name'] || 'N/A';
                    document.getElementById('motherName').textContent = student['Mother\'s Name'] || 'N/A';
                    document.getElementById('contactDetails').innerHTML = `Phone: ${student['Phone No.'] || 'N/A'}<br>Email: ${student['Email Id'] || 'N/A'}`;
                } else {
                    alert('Student data not found for login ID: ' + loginId);
                }
            })
            .catch(error => {
                console.error('Error reading XLSX file:', error);
                alert('Error reading student data. Check console.');
            });

        localStorage.removeItem("loginId")
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