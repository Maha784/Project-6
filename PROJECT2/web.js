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
app.use(express.static(__dirname + '/static'));

// Home Page
app.get('/', async (req, res) => {
    res.render('home');
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login', { message: req.query.message });
});

app.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // Perform login authentication
    let user = await business.checkLogin(email, password);

    if (user) {
        let username = user.name; // Assuming the username is stored in the user object
        // Create a session and set a cookie for the user
        let sessionKey = await business.startSession({ "Username": username });
        let session = await business.getSessionData(sessionKey);
        res.cookie('sessionKey', session.SessionKey, { expires: session.Expiry });

        // Redirect the user to a dashboard page
        res.redirect(`/dashboard?Username=${encodeURIComponent(username)}`);
    } else {
        // Render the login page with an error message
        res.render('login', { layout: undefined, message: "Wrong Username or Password, TRY AGAIN!" });
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
    const wellnessResources = await business.getAllWellnessResources();

    res.render('dashboard', { Username: username, healthMetrics, wellnessResources });
});

// Route to render the page containing the form
app.get('/my-health-metrics-form', (req, res) => {
    res.render('my-health-metrics-form'); // Corrected to render 'my-health-metrics-form'
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

// health metrics
app.get('/health-metrics', async (req, res) => {
    const session = req.cookies.sessionKey;
    if (!session) {
        res.redirect('/login?message=Session expired. Please login again.');
        return;
    }
    let sessionData = await business.getSessionData(session);
    if (!sessionData || !sessionData.Data || !sessionData.Data.Username) {
        res.redirect('/login?message=Session expired. Please login again.');
        return;
    } else {
        res.render('health-metrics-form', { username: sessionData.Data.Username });
    }
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


// Handle 404
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Handle 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Health Tracker app listening on port 3000!');
});
