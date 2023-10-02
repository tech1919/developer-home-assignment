from sqlalchemy import Column, ForeignKey, Integer, String
from app.models.db import db

class Group(db.Model):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, autoincrement=True)
    owner = Column(String(255), ForeignKey("users.email"), nullable=False)
    title = Column(String(255))
    color = Column(String(255))

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
