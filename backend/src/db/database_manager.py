import json
import bcrypt
from db.database import engine
from db import crud, database_models, schemas
from utils.exception import *
from utils.variables import profile_informations


database_models.Base.metadata.create_all(bind=engine)

def crypt_password(password):

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(), salt)

    return hashed_password

def password_check(password, hashed_password):

    if bcrypt.checkpw(password.encode(), hashed_password.encode()):
        return True
    else:
        return False

def list_sessions(db_session, active):
    
    try:
        sessions = crud.get_sessions_by_active_parameter(db_session, active)
    except Exception as e:
            raise UnexpectedError(error=f'Error in retrieving session list: {str(e)}')

    return [{"id": s.sessionId, "name":s.sessionName, "createDate": s.sessionStartTime.isoformat() + "+00:00", "active":s.sessionIsActive} for s in sessions]

def create_session(db_session, request_body):
    try:
        active_sessions = crud.get_sessions_by_active_parameter(db_session, active=True)
        if len(active_sessions) == 3:
            raise BadRequestException(error="The maximum number of active sessions has been reached. You cannot create a new session!!!")
        

        session_id = crud.get_all_sessions_count(db_session) + 101
        user_id = crud.get_all_users_count(db_session) + 1001

        moderator_password_hashed = crypt_password(request_body["moderatorPassword"])
        session_password_hashed = crypt_password(request_body["sessionPassword"])

        session = schemas.SessionCreate(sessionId=session_id, sessionName=request_body["name"], 
                                            sessionPassword=session_password_hashed, sessionIsActive=True)
        moderator_user = schemas.UserCreate(userId=user_id, sessionId=session_id, isModerator=True,
                                            userName="MODERATOR", userPassword=moderator_password_hashed)
        crud.create_session(db_session, session)
        crud.create_user(db_session, moderator_user)

        return {"sessionId": session_id, "userId": user_id}
    
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in create session function: {str(e)}')


def join(db_session, request_body):

    try:
        
        session = crud.get_session(db_session, request_body["sessionId"])
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")
        
        if request_body["userType"] == "MODERATOR":
            user = crud.get_moderator_of_session(db_session, request_body["sessionId"])
            if password_check(request_body["password"], user.userPassword):
                return {"sessionId": user.sessionId, "userId": user.userId, "userName": user.userName}
            else:
                raise UnauthorizedException(error="Password is incorrect!!!")

        elif request_body["userType"] == "EXISTING_USER":
            user = crud.get_any_user_of_session(db_session, request_body["sessionId"], request_body["userName"].strip())
            if not user:
                raise BadRequestException(error="The user couldn't be found in this session!!!")
            if password_check(request_body["password"], user.userPassword):
                return {"sessionId": user.sessionId, "userId": user.userId, "userName": user.userName}
            else:
                raise UnauthorizedException(error="Password is incorrect!!!")
            
        elif request_body["userType"] == "NEW_USER":
            if not all(field in request_body for field in ["sessionPassword"]):
                raise BadRequestException(error="Session password is required for new user!!!")
            if not password_check(request_body["sessionPassword"], session.sessionPassword):
                raise UnauthorizedException(error="Session password is incorrect!!!")
            
            user_count_of_session = crud.get_user_count_of_session(db_session, request_body["sessionId"])
            user_name = "User" + str(user_count_of_session)
            user_id = crud.get_all_users_count(db_session) + 1001
            user = schemas.UserCreate(userId=user_id, sessionId=request_body["sessionId"], isModerator=False,
                                                userName=user_name, userPassword=crypt_password(request_body["password"]))
            crud.create_user(db_session, user)
            crud.update_user_count(db_session, session.sessionId, session.userCount + 1)
            return {"sessionId": request_body["sessionId"], "userId": user_id, "userName": user_name}

        else:
            raise BadRequestException(error="userType is incorrect!!!")

    except BadRequestException as bad_request:
        raise bad_request
    except UnauthorizedException as unauthorized:
        raise unauthorized        
    except Exception as e:
        raise UnexpectedError(error=f'Error in join session function: {str(e)}')

def save_user_answer(db_session, answer, session_id, user_id):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")
        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")            
        else:
            crud.save_user_answer(db_session, user_id, answer)
            return {"Info": "The answer is saved"}
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in save user answer function: {str(e)}')
    
def save_profile(db_session, profile, session_id, user_id):

    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")
        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")
        else:
            crud.save_user_profile(db_session, user_id, profile)
            return {"Info": "The profile is saved"}
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in save profile function: {str(e)}')

def end_test(db_session, session_id, user_id, language, force_finish=False):

    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")
        
        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")
        elif not user.isModerator:
            raise UnauthorizedException("You are not authorized to end the test phase. Only moderators are permitted!!!")        
        elif session.sessionStatus == 'prompting':
            raise BadRequestException(error="Test phase has already finished. You cannot end test again!!!")
        else:
            user_count = session.userCount

            session_users = crud.get_users_by_session(db_session, session_id)
            answer_count = sum(1 for d in session_users if d.testAnswers not in [None, ""])

            if force_finish:
                profile_distribution = dict()
                for profile in profile_informations.keys():
                    count=0
                    for user in session_users:
                        if user.profile == profile:
                            count+=1
                    
                    rate= (count/answer_count) * 100
                    profile_distribution[profile] = rate
                crud.update_session_status(db_session, session_id, 'prompting')
                crud.update_profile_distribution(db_session, session_id, profile_distribution)
                return {"Info": "Test session ended"}
            else:
                return {"sessionUserCount": user_count, "sessionFinishedTestCount": answer_count}
    except UnauthorizedException as unauthorized:
        raise unauthorized
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in end test function: {str(e)}')

def get_profile_distribution(db_session, session_id):
    try:
        session = crud.get_session(db_session, session_id)
        return session.profileDistribution
    except Exception as e:
        raise UnexpectedError(error=f'Error in get profile distribution function: {str(e)}')
    

def save_prompt(db_session, prompt, session_id, user_id):

    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")

        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")
        elif not user.isModerator:
            raise UnauthorizedException("You are not authorized in prompt section. Only moderators are permitted!!!")        
        elif session.sessionStatus == 'started':
            raise BadRequestException(error = "Test phase has not finished yet. Moderator should end the test phase first!!!")
        else:
            if session.promptList is None:
                crud.update_prompt(db_session, session_id, [prompt])
            else:
                lst = list(session.promptList)
                lst.append(prompt)
                crud.update_prompt(db_session, session_id, lst)
            return {"Info": "Prompt saved"}
    except UnauthorizedException as unauthorized:
        raise unauthorized
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in save user prompt function: {str(e)}')


def get_all_prompts(db_session, session_id):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        return session.promptList
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in get all prompts function: {str(e)}')
    
def save_gpt_answer(db_session, answer, session_id, user_id):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")

        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")
        elif not user.isModerator:
            raise UnauthorizedException("You are not authorized in prompt section. Only moderators are permitted!!!")        
        elif session.sessionStatus == 'started':
            raise BadRequestException(error = "Test phase has not finished yet. Moderator should end the test phase first!!!")
        else:
            if session.answerList is None:
                crud.update_gpt_answer(db_session, session_id, [answer])
            else:
                lst = list(session.answerList)
                lst.append(answer)
                crud.update_gpt_answer(db_session, session_id, lst)
            return {"Info": "answer saved"}
    except UnauthorizedException as unauthorized:
        raise unauthorized
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in save gpt answer function: {str(e)}')


def get_gpt_answers(db_session, session_id):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        return session.answerList
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in get gpt answer function: {str(e)}')
    

def save_retrieval_list(db_session, retrieval_list, session_id, user_id):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")

        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")
        elif not user.isModerator:
            raise UnauthorizedException("You are not authorized in prompt section. Only moderators are permitted!!!")        
        elif session.sessionStatus == 'started':
            raise BadRequestException(error = "Test phase has not finished yet. Moderator should end the test phase first!!!")
        else:
            if session.retrievalList is None:
                crud.update_retrieval(db_session, session_id, [retrieval_list])
            else:
                lst = list(session.retrievalList)
                lst.append(retrieval_list)
                crud.update_retrieval(db_session, session_id, lst)
            return {"Info": "Retrieval list saved"}
    except UnauthorizedException as unauthorized:
        raise unauthorized
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in save retrieval list function: {str(e)}')


def get_retrieval_lists(db_session, session_id):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        return session.retrievalList
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in get retrieval list function: {str(e)}')
    

def end_session(db_session, session_id, user_id):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")

        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")
        elif not user.isModerator:
            raise UnauthorizedException("You are not authorized to end session. Only moderators are permitted!!!")        
        elif session.sessionStatus == 'started':
            raise BadRequestException(error = "Test phase has not finished yet. Moderator should end the test phase first!!!")
        else:
            crud.update_session_end_time(db_session, session_id)
            crud.update_session_status(db_session, session_id, 'completed')
            crud.update_session_is_active(db_session, session_id, is_active=False)
            return {"Info": "Session completed"}
    except UnauthorizedException as unauthorized:
        raise unauthorized
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in end session function: {str(e)}')


def get_user_status(db_session, session_id, user_id):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")

        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")

        return {"current": user.userStatusCurrent, "next": user.userStatusNext, "history": user.userStatusHistory}
    
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in get user status function: {str(e)}')

def post_user_status(db_session, session_id, user_id, status_information):
    try:
        session = crud.get_session(db_session, session_id)
        if not session:
            raise BadRequestException(error="There is no session with this session ID!!!")
        elif not session.sessionIsActive:
            raise BadRequestException(error="This is not an active session!!!")

        user = crud.get_user(db_session, user_id)
        if not user:
            raise BadRequestException(error="The user is not a valid user!!!")
        elif user.sessionId != session_id:
            raise BadRequestException(error="The user is not a valid user for the session!!!")
        
        crud.save_user_status(db_session, user_id, status_information)
        return status_information
    
    except BadRequestException as bad_request:
        raise bad_request
    except Exception as e:
        raise UnexpectedError(error=f'Error in post user status function: {str(e)}')

