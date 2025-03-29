from utils.variables import SQLALCHEMY_DATABASE_URL, DATABASE_SCHEMA_NAME
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

Base.metadata.schema = DATABASE_SCHEMA_NAME