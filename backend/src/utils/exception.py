class UnauthorizedException(Exception):
    def __init__(self, error: str):
        self.error = error

class BadRequestException(Exception):
    def __init__(self, error: str):
        self.error = error

class UnexpectedError(Exception):
    def __init__(self, error: str):
        self.error = error