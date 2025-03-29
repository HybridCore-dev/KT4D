from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, func, JSON
from sqlalchemy import Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from utils.helpers import UserStatusStep
from utils.variables import DATABASE_SCHEMA_NAME
from db.database import Base


class Session(Base):
    __tablename__ = "session"

    sessionId = Column(Integer, primary_key=True)
    sessionName = Column(String, nullable=False)
    sessionPassword = Column(String, nullable=False)
    sessionStatus = Column(String, nullable=False)
    sessionIsActive = Column(Boolean, nullable=False)
    sessionStartTime =  Column(DateTime, server_default=func.now()) 
    sessionEndTime = Column(DateTime)
    userCount = Column(Integer, nullable=False)
    promptList = Column(JSON)
    answerList = Column(JSON)
    retrievalList = Column(JSON)
    retrievalList = Column(JSON)
    profileDistribution = Column(JSON)

    user = relationship("User", back_populates="session")


class User(Base):
    __tablename__ = "user"

    userId = Column(Integer, primary_key=True)
    sessionId = Column(Integer, ForeignKey("session.sessionId"))
    userName = Column(String, nullable=False)
    isModerator = Column(Boolean, nullable=False)
    userPassword = Column(String, nullable=False)
    userLoginTime = Column(DateTime, server_default=func.now())
    testAnswers = Column(JSON)
    profile = Column(Integer)
    userStatusCurrent = Column(SQLAlchemyEnum(UserStatusStep, schema=DATABASE_SCHEMA_NAME))
    userStatusNext = Column(SQLAlchemyEnum(UserStatusStep, schema=DATABASE_SCHEMA_NAME))
    userStatusHistory = Column(JSON)

    session = relationship("Session", back_populates="user")