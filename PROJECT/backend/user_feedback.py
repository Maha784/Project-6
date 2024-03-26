class UserFeedback:
    def __init__(self):
        self.feedback = []

    def submit_feedback(self, user_id, feedback_text):
        self.feedback.append({"user_id": user_id, "feedback": feedback_text})
