from sqlalchemy.orm import Session
from sqlalchemy import func
from utils.variables import session_phases
from db import database_models, schemas


def create_session(db: Session, session_schema: schemas.SessionCreate):
    db_session = database_models.Session(sessionId=session_schema.sessionId, sessionName=session_schema.sessionName, 
                                         sessionStatus=session_phases[0], sessionPassword=session_schema.sessionPassword, 
                                         sessionIsActive=session_schema.sessionIsActive, userCount=1)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

def get_open_session(db: Session):
    active_session = db.query(database_models.Session).filter(database_models.Session.sessionStatus != session_phases[2]).first()
    return active_session

def get_sessions_by_active_parameter(db: Session, active):
    if active is None:
        sessions = db.query(database_models.Session).all()
    else:
        sessions = db.query(database_models.Session).filter(database_models.Session.sessionIsActive == active).all()
    return sessions

def get_session(db: Session, sessionId: int):
    return db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()


def get_all_sessions(db: Session):
    return db.query(database_models.Session).all()

def get_all_sessions_count(db: Session):
    return db.query(database_models.Session).count()

def update_user_count(db: Session, sessionId: int, user_count: int):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.userCount = user_count
    db.commit()

def update_session_status(db: Session, sessionId: int, new_status: str):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.sessionStatus = new_status
    db.commit()

def update_session_is_active(db: Session, sessionId: int, is_active: bool):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.sessionIsActive = is_active
    db.commit()

def update_profile_distribution(db: Session, sessionId: int, profile_distribution):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.profileDistribution = profile_distribution
    db.commit()

def update_prompt(db: Session, sessionId: int, prompt):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.promptList = prompt
    db.commit()

def update_gpt_answer(db: Session, sessionId: int, answer):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.answerList = answer
    db.commit()

def update_retrieval(db: Session, sessionId: int, retrieval):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.retrievalList = retrieval
    db.commit()

def update_session_end_time(db: Session, sessionId: int):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.sessionEndTime = func.now()
    db.commit()

def auto_complete_session(db: Session, sessionId: int):
    session_by_id = db.query(database_models.Session).filter(database_models.Session.sessionId == sessionId).first()
    session_by_id.sessionEndTime = func.now()
    session_by_id.sessionStatus = session_phases[-1]
    session_by_id.sessionIsActive = False
    db.commit()


def create_user(db: Session, user_schema: schemas.UserCreate):
    db_user = database_models.User(userId = user_schema.userId, sessionId = user_schema.sessionId, isModerator = user_schema.isModerator,
                                   userName=user_schema.userName, userPassword=user_schema.userPassword)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users_by_session(db: Session, session_id):
    return db.query(database_models.User).filter(database_models.User.sessionId == session_id).all()

def get_user_count_of_session(db: Session, session_id):
    return db.query(database_models.User).filter(database_models.User.sessionId == session_id).count()


def get_moderator_of_session(db: Session, session_id):
    return db.query(database_models.User).filter(database_models.User.sessionId == session_id).filter(database_models.User.isModerator == True).first()

def get_any_user_of_session(db: Session, session_id, user_name):
    return db.query(database_models.User).filter(database_models.User.sessionId == session_id).filter(database_models.User.userName == user_name).first()

def get_user(db: Session, user_id: int):
    return db.query(database_models.User).filter(database_models.User.userId == user_id).first()

def get_all_users(db: Session):
    return db.query(database_models.User).all()

def get_all_users_count(db: Session):
    return db.query(database_models.User).count()


def save_user_answer(db: Session, user_id: int, answer):
    user = db.query(database_models.User).filter(database_models.User.userId == user_id).first()
    user.testAnswers = answer
    db.commit()

def save_user_profile(db: Session, user_id: int, profile):
    user = db.query(database_models.User).filter(database_models.User.userId == user_id).first()
    user.profile = profile
    db.commit()

def save_user_status(db: Session, user_id: int, status_information):
    user = db.query(database_models.User).filter(database_models.User.userId == user_id).first()
    if "current" in status_information:
        user.userStatusCurrent = status_information["current"]
    if "next" in status_information:
        user.userStatusNext = status_information["next"]
    if "history" in status_information:
        user.userStatusHistory = status_information["history"]
    db.commit()