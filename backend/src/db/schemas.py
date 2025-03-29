from pydantic import BaseModel, Json
from datetime import datetime
from utils.helpers import UserStatusStep

class UserCreate(BaseModel):
    userId : int
    sessionId : int
    isModerator : bool
    userName : str
    userPassword: str



class User(BaseModel):
    
    userLoginTime : datetime
    testAnswers : Json
    profile : int
    userStatusCurrent: UserStatusStep
    userStatusNext: UserStatusStep
    userStatusHistory: Json

    class Config:
        arbitrary_types_allowed = True


class SessionCreate(BaseModel):

    sessionId : int
    sessionPassword: str
    sessionName: str
    sessionIsActive: bool
    
    
class Session(BaseModel):
    
    sessionStatus : str
    sessionStartTime : datetime
    sessionEndTime : datetime
    userCount : int
    promptList : Json
    answerList : Json
    retrievalList : Json
    retrievalList : Json
    profileDistribution : Json
    users: list[User] = []

    class Config:
        arbitrary_types_allowed = True


