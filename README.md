# Neo-Card: The Smart Campus Operating System - Coding Crusaders

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Django Version](https://img.shields.io/badge/django-4.0+-green.svg)](https://www.djangoproject.com/)
[![GitHub stars](https://img.shields.io/github/stars/LakshChhabra248/Neo-Card?style=social)](https://github.com/LakshChhabra248/Neo-Card/stargazers)

<p align="center">
  <img src="https://i.imgur.com/YOUR_IMAGE_HERE.png" alt="Neo-Card Logo" width="300"/>
</p>

**Neo-Card** by Coding Crusaders is a fully functional, all-in-one platform designed to transform traditional schools into smart, secure, and cashless campuses. We are replacing outdated ID cards with a powerful NFC-based ecosystem that handles everything from attendance and payments to parent-teacher communication.

**🏆 The Problem:** Manual attendance is inefficient, cash transactions are insecure, and parent communication is fragmented. Schools need a unified system that works without relying on student-owned smart devices.

**💡 Our Solution:** Neo-Card provides a robust and centralized platform powered by a **Django backend**, offering a smart NFC card to every student for seamless in-campus operations.

**🚀 Project Status: Functional Prototype**
This is no longer just an idea or an MVP. We have a **working end-to-end prototype** featuring:
*   A scalable **Django backend** to manage all data.
*   A **Python-based Demo App (using Streamlit)** that simulates a real-world payment terminal with a connected card reader.
*   Programmed **NFC cards and readers** to demonstrate the core functionality.

## Core Features (What's Working Now)

*   ✅ **Automated Attendance:** Students tap their Neo-Card on an NFC reader, and attendance is marked instantly in the central database.
*   💰 **Cashless Payments:** Our Streamlit demo app showcases how students can make payments at canteens or stationery shops using their card.
*   🔒 **Centralized & Secure Database:** All student information, attendance records, and transaction histories are securely managed by our robust Django backend.
*   👤 **Role-Based Web Portals (In-Progress):** Web interfaces for School Admins, Teachers, and Parents to access relevant information and analytics.

## Future Vision & Impact

Neo-Card is built to be the "Operating System" for the modern school:

*   🔒 **Secure Access Control:** Restrict access to labs, libraries, and staff rooms.
*   🚌 **School Bus Tracking:** Monitor student check-in/check-out from school buses for enhanced safety.
*   👪 **Comprehensive Parental Controls:** A dedicated mobile app for parents to top-up the card, set spending limits, and receive real-time alerts.
*   📊 **Data Analytics for Schools:** Provide valuable insights to the school management for better decision-making.

## Live Demo Showcase

We have built a simple yet powerful demo using **Streamlit** to showcase the payment functionality in action.

<p align="center">
  <!-- Yahan aap apne Streamlit App ka ek chota sa GIF ya Screenshot laga sakte hain -->
  <img src="https://i.imgur.com/YOUR_DEMO_GIF_HERE.gif" alt="Neo-Card Live Demo" width="600"/>
</p>

This app connects to a physical NFC card reader. When a registered Neo-Card is tapped, it fetches the student's details from our Django backend and processes the transaction.

## Tech Stack

*   **Backend:** Django, Django REST Framework
*   **Database:** MySQL / PostgreSQL
*   **Hardware:** NFC Cards (NTAG215), NFC Readers (PN532), Arduino/Raspberry Pi
*   **Demo App:** Streamlit (Python)
*   **Frontend (In-Progress):** React / Next.js

## Getting Started

To explore our project and run the demo:

### Prerequisites

*   Python (3.9+)
*   Django (4.0+)
*   Node.js (for future frontend)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/LakshChhabra248/Neo-Card.git
    cd Neo-Card
    ```

2.  **Setup the Django Backend:**
    ```bash
    # (Provide instructions for setting up your backend here)
    # e.g., python -m venv venv
    # source venv/bin/activate
    # pip install -r requirements.txt
    # python manage.py migrate
    # python manage.py runserver
    ```

3.  **Run the Streamlit Demo App:**
    ```bash
    # (Provide instructions for running your Streamlit app here)
    # e.g., cd streamlit_app
    # pip install -r requirements.txt
    # streamlit run app.py
    ```

---
Made with ❤️ and lots of code by **Coding Crusaders**.
