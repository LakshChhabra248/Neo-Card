# Neo-Card: Reimagine School IDs with NFC - by Coding Crusaders

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/downloads/)
[![Django Version](https://img.shields.io/badge/Django-4.x-green.svg)](https://www.djangoproject.com/)
[![GitHub issues](https://img.shields.io/github/issues/LakshChhabra248/Neo-Card)](https://github.com/LakshChhabra248/Neo-Card/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/LakshChhabra248/Neo-Card)](https://github.com/LakshChhabra248/Neo-Card/graphs/contributors)

<p align="center">
  <img src="https://i.imgur.com/YOUR_IMAGE_HERE.png" alt="Neo-Card Logo" width="300"/>
</p>

**Neo-Card** is an all-in-one smart campus solution that transforms the traditional school ID into a powerful NFC-enabled tool. Developed by **Coding Crusaders**, this project addresses the limitations of cash, smart devices, and UPI within school premises by creating a secure and seamless digital ecosystem.

---

### 🏆 The Problem

Schools today struggle with inefficient and outdated systems:
*   **Cash Dependency:** Managing cash in canteens and stationery shops is cumbersome and prone to leakage.
*   **Manual Attendance:** Teachers waste valuable class time on manual roll calls and report generation.
*   **Security Gaps:** Limited access control and a lack of real-time student tracking pose safety concerns.
*   **Lack of Transparency:** Parents have little to no visibility into their child's in-school activities and expenditures.

### 💡 Our Solution: The Neo-Card Ecosystem

Neo-Card replaces the traditional ID with a secure NFC card, connected to a powerful backend, creating a unified system for:
*   **Cashless Payments:** Secure tap-and-go payments at canteens, stationery, and fee counters.
*   **Automated Attendance:** Instant, error-free attendance marking at gates and classrooms.
*   **Secure Access Control:** Controlled access to libraries, labs, and other restricted areas.
*   **Real-time Parent Portal:** A dedicated portal for parents to monitor attendance, track spending, and top-up their child's account.

---

### ✨ Core Features (What's Ready!)

This repository contains a fully functional prototype showcasing the power of Neo-Card.

*   ✅ **Robust Django Backend:** The core of our system, built with Django, handles all data management, user authentication, and transaction logic securely.
*   💻 **Intuitive Web Portals:** Fully developed web interfaces for:
    *   **Admin Dashboard:** For school management to get a complete overview.
    *   **Parent Portal:** For parents to track their child's activities and manage their account.
    *   **Teacher's View:** For simplified class management.
*   🚀 **Live Hardware Demo with Streamlit:** An interactive Streamlit application that connects to a physical NFC card reader to demonstrate **real-time payment deduction** from a student's account. This shows our hardware-software integration capabilities.
*   🔒 **Secure & Scalable:** Designed from the ground up with security and scalability in mind, ready to be deployed in a real-world school environment.

---

### 🚀 Live Demo & Getting Started

Explore the power of Neo-Card by setting up our project and running the live hardware demo.

#### **Prerequisites**

*   Python (3.9+)
*   Django (4.x) & other dependencies from `requirements.txt`
*   Streamlit
*   A compatible NFC Card Reader (We're using PN532 RFID Reader)

#### **1. Backend Setup (Django)**

```bash
# Clone the repository
git clone https://github.com/LakshChhabra248/Neo-Card.git
cd Neo-Card

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start the development server
python manage.py runserver
