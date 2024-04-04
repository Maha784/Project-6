//persistence.js:

const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');

let client = undefined;
let db = undefined;
let users = undefined;
let healthMetrics = undefined;
let wellnessResources = undefined;
let userFeedback = undefined;

async function connectDatabase() {
    if (!client) {
        client = new mongodb.MongoClient('mongodb+srv://meera:12class34@cluster0.f34xz2a.mongodb.net/');
        await client.connect();
        db = client.db('health_tracker_db');
        users = db.collection('users');
        healthMetrics = db.collection('health_metrics');
        wellnessResources = db.collection('wellness_resources');
        userFeedback = db.collection('feedback');
        sessions = db.collection('sessions'); // Initialize sessions collection
    }
}

async function registerUser(userData) {
    await connectDatabase();
    return await users.insertOne(userData);
}

async function loginUser(username, password) {
    await connectDatabase();
    return await users.findOne({ username: username, password: password });
}

async function getUserDetails(email) {
    try {
        await connectDatabase();
        return await users.findOne({ email: email });
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

async function updateUserProfile(username, updatedData) {
    await connectDatabase();
    return await users.updateOne({ username: username }, { $set: updatedData });
}

async function deleteUserProfile(username) {
    await connectDatabase();
    return await users.deleteOne({ username: username });
}

async function trackHealthMetrics(username, metricData) {
    await connectDatabase();
    return await healthMetrics.insertOne({ username: username, metrics: metricData });
}

async function getHealthMetrics(username) {
    await connectDatabase();
    return await healthMetrics.findOne({ username: username });
}

async function addWellnessResource(resourceData) {
    await connectDatabase();
    return await wellnessResources.insertOne(resourceData);
}

async function getAllWellnessResources() {
    await connectDatabase();
    return await wellnessResources.find().toArray();
}

async function submitUserFeedback(feedbackData) {
    await connectDatabase();
    return await userFeedback.insertOne(feedbackData);
}

async function getAllUserFeedback() {
    await connectDatabase();
    return await userFeedback.find().toArray();
}
async function getSessionData(key) {
    await connectDatabase();
    return await sessions.findOne({ SessionKey: key });
}
async function saveSession(sessionData) {
    await connectDatabase();
    return await sessions.insertOne(sessionData);
}
async function deleteSession(key) {
    await connectDatabase();
    return await sessions.deleteOne({ SessionKey: key });
}


module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    deleteUserProfile,
    trackHealthMetrics,
    getHealthMetrics,
    addWellnessResource,
    getAllWellnessResources,
    submitUserFeedback,
    getAllUserFeedback,
    getSessionData,
    getUserDetails,
    saveSession,
    deleteSession
};
