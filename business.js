//business.js:

const persistence = require("./persistence.js");
const crypto = require("crypto");

async function checkLogin(email, password) {
    console.log("Received email:", email);
    console.log("Received password:", password);
    try {
        console.log("Checking login for email:", email);
        let userData = await persistence.getUserDetails(email);
        console.log("Retrieved user data:", userData);
        if (userData != null && userData.password === password) {
            return userData;
        } else {
            console.log("Login failed for email:", email);
            return undefined;
        }
    } catch (error) {
        console.error("Error during login:", error);
        return undefined;
    }
}

async function startSession(data) {
    let sessionId = crypto.randomUUID();
    let sessionData = {
        SessionKey: sessionId,
        Expiry: new Date(Date.now() + 1000 * 60 * 20),
        Data: data
    };
    await persistence.saveSession(sessionData);
    return sessionId;
}

async function getSessionData(key) {
    return await persistence.getSessionData(key);
}

async function deleteSession(key) {
    await persistence.deleteSession(key);
}

async function trackHealthMetrics(username, metricData) {
    // Logic to save health metrics data to the database
    return await persistence.trackHealthMetrics(username, metricData);
}

async function getHealthMetrics(username) {
    // Logic to retrieve health metrics data from the database
    return await persistence.getHealthMetrics(username);
}

async function addWellnessResource(resourceData) {
    return await persistence.addWellnessResource(resourceData);
}

async function getAllWellnessResources() {
    return await persistence.getAllWellnessResources();
}

async function registerUser(name, email, password) {
    await persistence.registerUser({ name, email, password, createdAt: new Date() });
}

async function updateUserProfile(email, newPassword, newName) {
    await persistence.updateUserProfile(email, { password: newPassword, name: newName });
}

async function submitUserFeedback(username, feedbackData) {
    return await persistence.submitUserFeedback({ name: username, feedback: feedbackData });
}

async function getAllUserFeedback() {
    return await persistence.getAllUserFeedback();
}

module.exports = {
    checkLogin,
    startSession,
    getSessionData,
    deleteSession,
    trackHealthMetrics,
    getHealthMetrics,
    addWellnessResource,
    getAllWellnessResources,
    getOneRandomWellnessResource: persistence.getOneRandomWellnessResource,
    submitUserFeedback,
    getAllUserFeedback,
    registerUser,
    updateUserProfile
};
