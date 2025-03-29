from datetime import datetime, timedelta, timezone
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from db.database import SessionLocal
from db.crud import get_sessions_by_active_parameter, auto_complete_session
from utils.variables import SQLALCHEMY_DATABASE_URL, AUTO_SESSION_COMPLETE_HOURS, DATABASE_SCHEMA_NAME
from sqlalchemy import MetaData

# Define the custom schema for SQLAlchemy
metadata = MetaData(schema=DATABASE_SCHEMA_NAME)

scheduler = AsyncIOScheduler(
    jobstores={
        'default': SQLAlchemyJobStore(url=SQLALCHEMY_DATABASE_URL, metadata=metadata)
    }
)

async def update_session_status():
    db = SessionLocal()
    try:
        active_sessions = get_sessions_by_active_parameter(db, active=True)
        current_time = datetime.now().astimezone(timezone.utc)
        if active_sessions:
            for active_session in active_sessions:
                if active_session.sessionStartTime.tzinfo is None:
                    active_session.sessionStartTime = active_session.sessionStartTime.replace(tzinfo=current_time.tzinfo)
                if active_session.sessionStartTime < (current_time - timedelta(hours=AUTO_SESSION_COMPLETE_HOURS)):
                    auto_complete_session(db, active_session.sessionId)
    finally:
        db.close()