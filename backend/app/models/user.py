from sqlalchemy import Column, LargeBinary, String
from app.models.db import db

class User(db.Model):
    __tablename__ = "users"

    email = Column(String(255), primary_key=True)
    password = Column(LargeBinary)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

