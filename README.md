# Project - 6

**Health Tracker Application**

--------------------------------------------------------------------

**Application Goals and Deliverables:**

Target Audience:
  Residents of Qatar, including both citizens and expatriates.
  Focus on inclusivity, making the app accessible to users of different age groups and backgrounds.

Health Tracking:
    Enable users to monitor and track their health metrics, such as calories consumed, water consumption, sleep and fitness activities.

Wellness Resources:
    Provide educational content, articles, and tips for maintaining a healthy lifestyle.

  Requirements:
    Categorization for easy navigation.
    User feedback and engagement features.

User Engagement and Feedback:
    User feedback forms for continuous improvement.

Accessibility and Multilingual Support:
    Ensure the app is accessible to users with different abilities.
    Provide language optio to accommodate the diverse population.

Testing and Quality Assurance:
    Rigorous testing for functionality, security, and usability.

--------------------------------------------------------------------

**Prototype:**
https://www.figma.com/file/2P4BGbKmYZUhMJLef0gCVK/Untitled?type=design&node-id=0%3A1&mode=design&t=VoCPSGxn5Apo2kFB-1

**Health Tracker Application**

**Description**
The Health Tracker Web App is a comprehensive solution designed to assist users in monitoring and managing their health metrics. The application allows users to track their calorie intake, water consumption, sleep duration, and fitness activities, offering a holistic view of their health and wellness journey.

**Technology Stack*

- Backend: Node.js
- Frontend: Handlebars.js for templating
- Database: MongoDB
- Styling: CSS with separate stylesheets for different views

**Prerequisites**
- Node.js 
- npm 
- MongoDB 

**Installation**

1. Clone the backend repository to your local machine:
```
    git clone https://github.com/Maha784/Project-6.git
    cd Project-6
```
2. Install the required Node.js packages
```
    npm install
    npm install -g nodemon
```
3. Start the server/application:

```
    nodemon web.js
```
**Unit Tests**

The tests are located in __test__ directory. These tests cover critical functionalities, including user authentication processes, health metrics tracking, and feedback submission.
Tests are organized into separate files corresponding to the application's main components:

    business.test.js for testing business logic and operations.
    persistence.test.js for testing database interactions.
    web.test.js for testing HTTP request handling and response generation.
    
**Development Dependencies for Testing**

To run unit tests, the application utilizes Jest as the testing framework and Supertest for HTTP assertions. These are included as development dependencies in the package.json file and should be installed during the initial npm install step. If you encounter any issues running tests, ensure that you have the latest versions of these libraries by running:

```
    npm install --save-dev jest supertest
```

**Running Unit Tests**

With all dependencies installed, you can execute the unit tests to verify the application's functionalities. To run the tests, use the following command:

```
    npm test
```

**Note: The tests use mocking to simulate interactions with the database and external services, ensuring that the tests can run independently of the actual database state or network conditions.**


**Usage**

After starting the server, navigate to http://127.0.0.1:3000 in your web browser to view the Health Tracker application.


**Features**

    User Authentication (Login/Register/Logout)
    
    Tracking and viewing personal health metrics
    
    Wellness resources recommendations
    
    Submitting and viewing user feedback
    

--------------------------------------------------------------------

**Project Structure**

    HEALTH/
    |-- images/
    |   |-- banner.jpg
    |   `-- log.png
    |-- node_modules/
    |-- styles/
    |   |-- login.css
    |   |-- main.css
    |   `-- register.css
    |-- templates/
    |   |-- layouts/
    |   |   `-- main.handlebars
    |   |-- all-feedback.handlebars
    |   |-- dashboard.handlebars
    |   |-- feedback.handlebars
    |   |-- home.handlebars
    |   |-- login.handlebars
    |   |-- my-health-metrics-form.handlebars
    |   `-- register.handlebars
    |-- .gitignore
    |-- business.js
    |-- package-lock.json
    |-- package.json
    |-- persistence.js
    `-- web.js

The Health Tracker Web App is organized into several directories and files, each serving a specific purpose in the functionality of the application:

    images/: Contains graphical content used across the application for a more engaging user interface.

    node_modules/: Stores the packages and modules required by the application, as installed via npm.

    styles/: Holds the CSS files that style the application, ensuring a consistent and responsive design.

    templates/: Includes Handlebars templates that define the HTML structure of the pages served to the client.

    business.js: Implements the business logic of the application, encapsulating data processing and decision-making code.

    persistence.js: Manages data persistence, including database operations leveraging MongoDB.

    web.js: Configures the Express server, defining routes and middleware necessary for handling HTTP requests.



**Development Journey**

*Initial Concept and Prototyping*

The project began with a vision to create an intuitive mobile application designed to track and
enhance individual health metrics but due to limitation we proceeded in making a web application for the time being. We are aiming to offer a tool that could help users monitor and improve their diet, sleep, and exercise habits.
  
*Technology Stack Evaluation*

Initially, we laid the foundation using Python with the Flask framework for its simplicity and rapid development capabilities. Prototypes were developed to validate the application's core functionality.

*Reassessing the Technology Stack*

As our requirements evolved, we recognized the need for a more scalable and event-driven environment to handle real-time data processing and user interactions. A decision was made to migrate from Python to a Node.js backend.

*Transitioning to Node.js*

The transition to Node.js involved restructuring our codebase, and adapting our existing Python logic to JavaScript. 

*Building the Core with Node.js*

We re-implemented the core features in Node.js, utilizing Express.js to set up the server and routes, and integrating MongoDB for data persistence. This provided us with a more robust and flexible architecture.\

*Feature Development and Enhancement*

With Node.js, we were able to build a real-time dashboard, implement efficient health metrics tracking, and introduce a dynamic feedback system. We also took advantage of the extensive npm ecosystem to integrate additional functionalities.

*Refinement and User Experience*

Throughout the development process, we placed a strong emphasis on user experience. Migrating to Node.js allowed us to refine the application's responsiveness and interactivity, delivering a seamless experience to our users.

*Testing, Deployment, and Iteration*

Extensive testing ensured that our application met all functional requirements. After deploying our Node.js application, we continued to iterate, constantly improving the features.




