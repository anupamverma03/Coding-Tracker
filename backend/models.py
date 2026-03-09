from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base
from sqlalchemy import DateTime
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True)
    password = Column(String(255))

class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    platform = Column(String(50))
    difficulty = Column(String(20))
    tags = Column(String(200))
    user_id = Column(Integer, ForeignKey("users.id"))
    date_solved = Column(DateTime, default=datetime.utcnow)