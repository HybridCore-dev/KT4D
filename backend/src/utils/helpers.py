from enum import Enum
from utils.variables import language_dict

def detect_language(request):

    language = request.headers.get("language", "en").lower()
    if language in language_dict:
        return language 
    else:
        return "en"

class UserStatusStep(str, Enum):
    QUIZ_INPROGRESS = "QUIZ_INPROGRESS"
    QUIZ_COMPLETED = "QUIZ_COMPLETED"
    WAITING_OTHER_USERS = "WAITING_OTHER_USERS"
    PLATFORM_STRUCTURE_INFO = "PLATFORM_STRUCTURE_INFO"
    DOCUMENT_TYPE_SELECTION = "DOCUMENT_TYPE_SELECTION"
    PROMPT  = "PROMPT"

class UserType(str, Enum):
    MODERATOR = "MODERATOR"
    NEW_USER = "NEW_USER"
    EXISTING_USER  = "EXISTING_USER "