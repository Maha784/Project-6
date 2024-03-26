from flask import Flask, request, jsonify,render_template
from health_track import HealthTracker
from wellness_resource import WellnessResources
from user_feedback import UserFeedback
from appointment import PushNotification

app = Flask(__name__)
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Instantiate classes for features
health_tracker = HealthTracker()
wellness_resources = WellnessResources()
user_feedback = UserFeedback()


# Health tracking route
@app.route('/track_health_metrics', methods=['POST'])
def track_health_metrics():
    data = request.json
    health_tracker.track_calories(data.get('calories'))
    health_tracker.track_water_intake(data.get('water'))
    health_tracker.track_sleep_duration(data.get('sleep_hours'))
    health_tracker.add_fitness_activity(data.get('fitness_activity'))
    return jsonify({'message': 'Health metrics tracked successfully'})

# Wellness resources route
@app.route('/add_wellness_article', methods=['POST'])
def add_wellness_article():
    data = request.json
    wellness_resources.add_article(data.get('title'), data.get('content'))
    return jsonify({'message': 'Wellness article added successfully'})

# User feedback route
@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    user_feedback.submit_feedback(data.get('user_id'), data.get('feedback_text'))
    return jsonify({'message': 'Feedback submitted successfully'})

# Push notification route (hypothetical example)
@app.route('/send_reminder_notification', methods=['POST'])
def send_reminder_notification():
    data = request.json
    user_id = data.get('user_id')
    appointment_datetime = data.get('appointment_datetime')
    PushNotification.send_reminder_notification(user_id, appointment_datetime)
    return jsonify({'message': 'Reminder notification sent successfully'})

if __name__ == '__main__':
    app.run(debug=True)

