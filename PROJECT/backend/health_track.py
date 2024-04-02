# backend/health_tracker.py
import datetime

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

    def track_steps(self, date, steps):
        if not isinstance(date, datetime.date):
            return "Date must be a valid datetime.date object"
        
        if not isinstance(steps, int):
            return "Steps must be an integer"
        
        self.steps_data[date] = steps

    def get_total_steps_per_week(self, week_start_date):
        if not isinstance(week_start_date, datetime.date):
            return "Week start date must be a valid datetime.date object"
        
        week_end_date = week_start_date + datetime.timedelta(days=6)  # Calculate week end date
        total_steps = 0
        for date, steps in self.steps_data.items():
            if week_start_date <= date <= week_end_date:
                total_steps += steps
        return total_steps
