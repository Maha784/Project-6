// web.js
const Handlebars = require('handlebars');

// Define the helper
Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const business = require('./business.js');

const app = express();
const handlebars = require('express-handlebars');
const { getSessionData } = require('./persistence.js');

app.set('views', __dirname + "/templates");
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/images', express.static(__dirname + '/images'));

// Home Page
app.get('/', async (req, res) => {
    res.render('home');
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login', { message: req.query.message });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await business.checkLogin(email, password);

        if (user) {
            const sessionKey = await business.startSession({ "Username": user.name });
            res.cookie('sessionKey', sessionKey, { expires: new Date(Date.now() + 1000 * 60 * 20) });

            res.redirect(`/dashboard?Username=${encodeURIComponent(user.name)}`);
        } else {
            res.status(401).render('login', { message: "Wrong Username or Password, TRY AGAIN!" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});


// Dashboard Page
app.get('/dashboard', async (req, res) => {
    const sessionKey = req.cookies.sessionKey;
    const sessionData = await business.getSessionData(sessionKey);

    if (!sessionKey || !sessionData) {
        res.redirect('/login?message=Session expired. Please login again.');
        return;
    }

    const username = sessionData.Data.Username;
    const healthMetrics = await business.getHealthMetrics(username);
    const wellnessResource = await business.getOneRandomWellnessResource(); 

    const resource = wellnessResource[0] || {}; 

    res.render('dashboard', {
        Username: username,
        healthMetrics,
        wellnessResource: resource 
    });
});


// Middleware to check if user has an active session
const checkSession = async (req, res, next) => {
    const sessionKey = req.cookies.sessionKey;
    const sessionData = await business.getSessionData(sessionKey);
    
    // Check if session exists and contains user data
    if (!sessionKey || !sessionData || !sessionData.Data || !sessionData.Data.Username) {
        res.redirect('/login?message=Session expired. Please login again.');
    } else {
        // Session is valid, proceed to next middleware or route handler
        next();
    }
};

// Route to render the page containing the form
app.get('/my-health-metrics-form', checkSession, (req, res) => {
    res.render('my-health-metrics-form');
});
// Route to handle submission of health metrics form
app.post('/my-health-metrics', async (req, res) => { // Corrected route from '/health-metrics' to '/my-health-metrics'
    const session = req.cookies.sessionKey;
    let sessionData = await business.getSessionData(session);
    if (!session || sessionData == null || !sessionData.Data || !sessionData.Data.Username) {
        res.redirect('/?message=please login again, Session expired');
    } else {
        const username = sessionData.Data.Username;
        const metricData = req.body; // Assuming form fields correspond to health metrics
        await business.trackHealthMetrics(username, metricData);
        res.redirect('/my-health-metrics'); // Changed redirection route to '/my-health-metrics'
    }
});

// Route to display user's health metrics
app.get('/my-health-metrics', async (req, res) => {
    const sessionKey = req.cookies.sessionKey;
    
    if (!sessionKey) {
        res.redirect('/login?message=Session expired. Please login again.');
        return;
    }

    try {
        // Retrieve session data
        const sessionData = await business.getSessionData(sessionKey);
        
        if (!sessionData || !sessionData.Data || !sessionData.Data.Username) {
            res.redirect('/login?message=Session expired. Please login again.');
            return;
        }

        // Get username from session data
        const username = sessionData.Data.Username;

        // Retrieve health metrics for the user
        const healthMetrics = await business.getHealthMetrics(username);

        // Debug log to check health metrics data
        console.log("Health Metrics:", healthMetrics);

        if (!healthMetrics) {
            // Render page with message indicating no health metrics data
            res.render('my-health-metrics', { message: "No health metrics data available." });
            return;
        }

        // Render the page with health metrics data
        res.render('my-health-metrics', { healthMetrics });
    } catch (error) {
        console.error("Error fetching health metrics:", error);
        res.status(500).send("Error fetching health metrics. Please try again later.");
    }
});



// Logout Endpoint
app.get('/logout', async (req, res) => {
    const sessionKey = req.cookies.sessionKey;
    if (sessionKey) {
        await business.deleteSession(sessionKey);
        res.clearCookie('sessionKey');
    }
    res.redirect('/login');
});

// Register Page
app.get('/register', (req, res) => {
    res.render('register');
});

// Register Endpoint
app.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    await business.registerUser(name, email, password);

    res.redirect('/login?message=Registration successful. You can now log in.');
});


// Route to handle form submission
app.post('/submit-health-metrics', async (req, res) => {
    const sessionKey = req.cookies.sessionKey;
    const sessionData = await business.getSessionData(sessionKey);

    if (!sessionKey || !sessionData) {
        res.redirect('/login?message=Session expired. Please login again.');
        return;
    }

    const username = sessionData.Data.Username;
    const metricData = req.body; // Assuming form fields correspond to health metrics
    await business.trackHealthMetrics(username, metricData);

    // Redirect to My Health Metrics page
    res.redirect('/my-health-metrics');
});

// FEEDBACK
app.get('/feedback', (req, res) => {
    // Check if the user is logged in
    const sessionKey = req.cookies.sessionKey;
    if (!sessionKey) {
        // If not logged in, redirect to login page
        res.redirect('/login?message=Please log in to provide feedback.');
    } else {
        // If logged in, render the feedback form
        res.render('feedback');
    }
});

app.post('/submit-feedback', async (req, res) => {
    const sessionKey = req.cookies.sessionKey;
    const sessionData = await business.getSessionData(sessionKey);
    
    if (!sessionData || !sessionData.Data || !sessionData.Data.Username) {
        res.status(401).send("Unauthorized. Please log in.");
        return;
    }
    
    const username = sessionData.Data.Username;
    const feedbackData = req.body.feedback;
    
    await business.submitUserFeedback(username, feedbackData); // Pass username here
    res.redirect('/feedback?message=Feedback submitted successfully.');
});

// Route to display all user feedback
app.get('/all-feedback', async (req, res) => {
    try {
        const allFeedback = await business.getAllUserFeedback();
        console.log("All Feedback:", allFeedback); // Add this line for debugging
        res.render('all-feedback', { feedbackList: allFeedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).send("Error fetching feedback. Please try again later.");
    }
});


// Handle 404
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Handle 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Health Tracker app listening on port 3000!');
    });
}

module.exports = app;
