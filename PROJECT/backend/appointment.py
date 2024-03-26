import datetime

class PushNotification:
    @staticmethod
    def send_reminder_notification(user_id, appointment_datetime):
        current_datetime = datetime.datetime.now()
        notification_time = appointment_datetime - datetime.timedelta(hours=1)
        if current_datetime >= notification_time:
            print(f"Sending appointment reminder to user {user_id} for {appointment_datetime}")