import json
import logging
from utils import helpers
from model import model_controller
from calculations import determine_group
from db import database_manager
from db.database import SessionLocal
from fastapi import FastAPI, Request, Depends
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from utils.exception import UnauthorizedException, BadRequestException, UnexpectedError
from sqlalchemy.orm import Session
from utils.scheduler import scheduler, update_session_status
from utils.variables import SCHEDULER_INTERVAL, profile_informations

# Session Create
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):

    scheduler.add_job(update_session_status, 'interval', minutes=SCHEDULER_INTERVAL, misfire_grace_time=30)
    scheduler.start()
    yield
    scheduler.shutdown()

app = FastAPI(lifespan=lifespan)
logging.getLogger('apscheduler').setLevel(logging.ERROR)


@app.exception_handler(UnauthorizedException)
async def unauthorized_exception_handler(request: Request, exc: UnauthorizedException):
    return JSONResponse(
        status_code=401,
        content={"status_code":401, 
                 "status":"ERROR", 
                 "message": "Unauthorized",
                 "error": exc.error},
    )

@app.exception_handler(BadRequestException)
async def bad_request_exception_handler(request: Request, exc: BadRequestException):
    return JSONResponse(
        status_code=400,
        content={"status_code":400, 
                 "status":"ERROR", 
                 "message": "Bad request",
                 "error": exc.error},
    )

@app.exception_handler(UnexpectedError)
async def relation_not_found_exception_handler(request: Request, exc: UnexpectedError):
    return JSONResponse(
        status_code=500,
        content={"status_code":500, 
                 "status":"ERROR", 
                 "message": "Unexpected error",
                 "error": exc.error},
    )


@app.get("/session/list")
async def session_list(active: bool = None, db: Session = Depends(get_db)):

    return database_manager.list_sessions(db, active)

@app.post("/session/create")
async def session_create(request: Request, db: Session = Depends(get_db)):

    try:
        request_body = await request.json()
    except json.decoder.JSONDecodeError:
        raise BadRequestException(error="Request body is not in json format!!!")

    if not all(field in request_body for field in ["name", "moderatorPassword", "sessionPassword"]):
            raise BadRequestException(error="name, moderatorPassword, and sessionPassword are required!")

    return database_manager.create_session(db, request_body)
   


@app.post("/session/join")
async def join_session(request: Request, db: Session = Depends(get_db)):

    try:
        request_body = await request.json()
    except json.decoder.JSONDecodeError:
        raise BadRequestException(error="Request body is not in json format!!!")

    if not all(field in request_body for field in ["sessionId", "userType", "password"]):
            raise BadRequestException(error="sessionId, userType, and password are required!")

    return database_manager.join(db, request_body)


@app.post("/save-test-results")
async def save_test_results(request: Request, db: Session = Depends(get_db)):
    
    try:
        request_body = await request.json()
    except json.decoder.JSONDecodeError:
        raise BadRequestException(error="Request body is not in json format!!!")

    language = helpers.detect_language(request)

    if not all(field in request_body for field in ["sessionId", "userId", "testResults"]):
        raise BadRequestException(error="sessionId, userType, and password are required!")    
    elif any(value is None for value in request_body["testResults"].values()):
        raise BadRequestException("There is a Null value in test results!!!")

    database_manager.save_user_answer(db, request_body["testResults"], request_body["sessionId"], request_body["userId"])

    try:
        profile_id = determine_group.determine_profile(request_body["testResults"], language)
    except BadRequestException:
        raise UnexpectedError(error="User profile couldn't created from given answers!!!")
    except:
        raise UnexpectedError(error="Error while determining profile!!!")

    database_manager.save_profile(db, profile_id, request_body["sessionId"], request_body["userId"])

    return {"sessionId": request_body["sessionId"], "userId": request_body["userId"], "groupType": profile_id}

@app.post('/finish-test-phase')
async def finish_test_phase(request: Request, db: Session = Depends(get_db)):

    try:
        request_body = await request.json()
    except json.decoder.JSONDecodeError:
        raise BadRequestException(error="Request body is not in json format!!!")
    
    language = helpers.detect_language(request)

    if not all(field in request_body for field in ["sessionId", "userId", "forceFinish"]):
        raise BadRequestException(error="sessionId, userId, and forceFinish are required!")
    
    if request_body["forceFinish"] == False:
        test_count_situration_report = database_manager.end_test(db, session_id=request_body["sessionId"], user_id=request_body["userId"], 
                                                                language=language, force_finish=request_body["forceFinish"])
        return test_count_situration_report
    else: 
        database_manager.end_test(db, session_id=request_body["sessionId"], user_id=request_body["userId"], 
                                    language=language, force_finish=request_body["forceFinish"])
        return "Success!!!"

@app.post('/ask-prompt')
async def ask_prompt(request: Request, db: Session = Depends(get_db)):

    try:
        request_body = await request.json()
    except json.decoder.JSONDecodeError:
        raise BadRequestException(error="Request body is not in json format!!!")
    
    language = helpers.detect_language(request)

    if not all(field in request_body for field in ["sessionId", "userId", "prompt", "documentTypes"]):
        raise BadRequestException(error="sessionId, userId, prompt and documentTypes are required!!!")

    database_manager.save_prompt(db, prompt=request_body["prompt"], session_id=request_body["sessionId"], user_id=request_body["userId"])

    gpt_answer = model_controller.gpt_model(db, request_body["sessionId"], request_body["userId"], 
                                            request_body["prompt"], request_body["documentTypes"], language)

    return {"answer": gpt_answer}
    
@app.post("/session/end")
async def end_session(request: Request,  db: Session = Depends(get_db)):

    try:
        request_body = await request.json()
    except json.decoder.JSONDecodeError:
        raise BadRequestException(error="Request body is not in json format!!!")
    
    database_manager.end_session(db, session_id=request_body["sessionId"], user_id=request_body["userId"])
    return "Success!!!"

@app.get("/user/{id}/session/{sessionId}/status")
async def get_user_status(id: int, sessionId: int, db: Session = Depends(get_db)):

    return database_manager.get_user_status(db, session_id=sessionId, user_id=id)

@app.post("/user/{id}/session/{sessionId}/status")
async def get_user_status(id: int, sessionId: int, request: Request, db: Session = Depends(get_db)):

    try:
        request_body = await request.json()
    except json.decoder.JSONDecodeError:
        raise BadRequestException(error="Request body is not in json format!!!")

    if any(field in request_body for field in ["current", "next", "history"]):
        return database_manager.post_user_status(db, session_id=sessionId, user_id=id, status_information=request_body)
    else:
        raise BadRequestException(error="Any of the current, next or history should be in the request!!!")