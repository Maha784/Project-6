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
```
    git clone https://github.com/Maha784/Project-6.git
    cd Project-6
```
2. Set up a Python virtual environment and activate it:
```
    python -m venv venv
    .\venv\Scripts\activate
```
3. Install the required Python packages from the requirements.txt file:
```
    pip install -r requirements.txt
```
4. Run the Flask application:

```
    python app.py
```

5. Unit Tests

    To ensure the application's functionalities work as expected, we have included unit tests. Execute the following command to run these tests:
```
    python -m unittest test_health_tracker.py
```
--------------------------------------------------------------------

Project Structure

The repository contains the following structure for the backend application:

- app.py: The Flask application entry point, defining routes for the API endpoints.
- appointment.py: Module for handling appointment notifications.
- health_track.py: Module for tracking health metrics.
- user_feedback.py: Module for collecting user feedback.
- wellness_resource.py: Module for managing wellness resources.
- test_health_tracker.py: Unit tests for the HealthTracker functionality.

API Endpoints

The backend facilitates various health-related actions through these endpoints:

- /track_health_metrics (POST)
  Tracks health metrics like calories, water intake, sleep, and exercise.

- /add_wellness_article (POST)
  Enables adding new wellness articles.

- /submit_feedback (POST)
  Submits user feedback for the app.

- /send_reminder_notification (POST)
  Intended to send a reminder notification to users for their upcoming appointments.


