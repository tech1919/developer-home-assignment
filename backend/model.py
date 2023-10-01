class Task:
    def __init__(self, title, description, completed):
        self.title = title
        self.description = description
        self.completed = completed

    def as_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "completed": self.completed
        }
