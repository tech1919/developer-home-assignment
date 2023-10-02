from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from app.models.db import db

class Task(db.Model):
    __tablename__ = "tasks"

    owner = Column(String(255), ForeignKey("users.email"), nullable=False)
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255))
    description = Column(String(255))
    completed = Column(Boolean)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=True) 
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}