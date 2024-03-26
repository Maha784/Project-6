# backend/health_tracker.py
class HealthTracker:
    def __init__(self):
        self.calories_consumed = 0
        self.water_intake = 0
        self.sleep_duration = 0
        self.fitness_activities = []

    def track_calories(self, calories):
        try:
            calories = float(calories)  # Convert calories to float
        except ValueError:
            return "Calories must be a valid number"

        self.calories_consumed += calories

    def track_water_intake(self, water):
        try:
            water = float(water)  # Convert water intake to float
        except ValueError:
            return "Water intake must be a valid number"

        self.water_intake += water

    def track_sleep_duration(self, hours):
        try:
            hours = float(hours)  # Convert sleep duration to float
        except ValueError:
            return "Sleep duration must be a valid number"

        self.sleep_duration += hours

    def add_fitness_activity(self, activity):
        if not isinstance(activity, str):
            return "Fitness activity must be a string"
        
        self.fitness_activities.append(activity)
