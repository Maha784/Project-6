# Project - 6

Health Tracker App

--------------------------------------------------------------------

App Technology:
    Python

App Overview:
  The Health Tracker App is a mobile application designed to help individuals monitor and manage their health and wellness. It enables users to track daily health metrics such as calorie intake, water consumption, physical activities, and sleep patterns. This project is aligned with promoting a healthier lifestyle and preventive healthcare.

Target Audience:
  Residents of Qatar, including both citizens and expatriates.
  Focus on inclusivity, making the app accessible to users of different age groups and backgrounds.

Health Tracking:
  Description:
    Enable users to monitor and track their health metrics, such as calories consumed, water consumption, sleep and fitness activities.

Wellness Resources:
  Description:
    Provide educational content, articles, and tips for maintaining a healthy lifestyle.

  Requirements:
    Categorization for easy navigation.
    User feedback and engagement features.

User Engagement and Feedback:
  Features:
    Push notifications for appointment reminders.
    User feedback forms for continuous improvement.

Accessibility and Multilingual Support:
  Requirements:
    Ensure the app is accessible to users with different abilities.
    Provide language options to accommodate the diverse population.

Testing and Quality Assurance:
  Requirements:
    Rigorous testing for functionality, security, and usability.
    Beta testing with a diverse group of users.

--------------------------------------------------------------------

Prototype:
https://www.figma.com/file/2P4BGbKmYZUhMJLef0gCVK/Untitled?type=design&node-id=0%3A1&mode=design&t=VoCPSGxn5Apo2kFB-1

Health Tracker App Backend

Description
The Health Tracker App is a comprehensive application designed to help users monitor and manage various health-related metrics. The app allows tracking of calorie intake, water consumption, sleep duration, and physical activity to promote a healthier lifestyle aligned with the Quality of Life goal of Qatar's National Development Strategy.

Technology Stack
- **Backend**: Flask (Python)
- **Frontend**: TBA

Backend Setup

Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment

Installation
1. Clone the backend repository to your local machine:
git clone https://github.com/<your-github-username>/health-tracker-backend.git
cd health-tracker-backend

2. Set up a Python virtual environment and activate it:

python -m venv venv
.\venv\Scripts\activate # Windows

3. Install the required Python packages from the requirements.txt file:

pip install -r requirements.txt

4. Run the Flask application:

python app.py

5. Unit Tests

To ensure the application's functionalities work as expected, we have included unit tests. Execute the following command to run these tests:

python -m unittest discover -v

--------------------------------------------------------------------

Project Structure

The project is organized as follows:

    app.py: The main Flask application file.
    /backend: Directory containing the core functionality.
        health_track.py: Contains the HealthTracker class for managing health metrics.
        user_feedback.py: Contains the UserFeedback class for handling user feedback.
        wellness_resource.py: Contains the WellnessResources class for managing wellness articles.
        appointment.py: Contains the PushNotification class for sending reminder notifications.
    /tests: Directory containing the test cases for the application.
        test_health_tracker.py: Unit tests for the HealthTracker class.

API Endpoints

The application provides the following API endpoints:

    /track_health_metrics: For tracking health-related metrics.
    /add_wellness_article: For adding wellness articles.
    /submit_feedback: For submitting user feedback.
    /send_reminder_notification: For sending reminder notifications for appointments.
