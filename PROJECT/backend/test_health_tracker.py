import unittest
import datetime  # Add this import
from health_track import HealthTracker
from wellness_resource import WellnessResources
from user_feedback import UserFeedback
from appointment import PushNotification

class TestHealthTracker(unittest.TestCase):
    def test_track_calories(self):
        health_tracker = HealthTracker()
        health_tracker.track_calories(100)
        self.assertEqual(health_tracker.calories_consumed, 100)

    def test_track_water_intake(self):
        health_tracker = HealthTracker()
        health_tracker.track_water_intake(2)
        self.assertEqual(health_tracker.water_intake, 2)

    # Add similar tests for other methods in HealthTracker class

class TestWellnessResources(unittest.TestCase):
    def test_add_article(self):
        wellness_resources = WellnessResources()
        wellness_resources.add_article("Title", "Content")
        self.assertEqual(len(wellness_resources.articles), 1)

    # Add similar tests for other methods in WellnessResources class

class TestUserFeedback(unittest.TestCase):
    def test_submit_feedback(self):
        user_feedback = UserFeedback()
        user_feedback.submit_feedback("user123", "Test feedback")
        self.assertEqual(len(user_feedback.feedback), 1)

    # Add similar tests for other methods in UserFeedback class

class TestPushNotification(unittest.TestCase):
    def test_send_reminder_notification(self):
        # Assuming you have a user ID and appointment datetime
        user_id = "user123"
        appointment_datetime = datetime.datetime.now() + datetime.timedelta(hours=2)
        PushNotification.send_reminder_notification(user_id, appointment_datetime)
        # You can't directly assert anything here because the method prints, 
        # but you can ensure it runs without raising any exceptions.

    # Add similar tests for other methods in PushNotification class

if __name__ == '__main__':
    unittest.main()
