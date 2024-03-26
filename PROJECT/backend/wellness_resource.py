class WellnessResources:
    def __init__(self):
        self.articles = []

    def add_article(self, title, content):
        self.articles.append({"title": title, "content": content})