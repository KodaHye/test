from fastapi import status
class StatusCode:
    CONTEST_NOT_EXIST_ERROR_CODE = status.HTTP_403_FORBIDDEN
    ALREADY_EXIST_PARTICIPATE_CODE = status.HTTP_403_FORBIDDEN

class Message:
    CONTEST_NOT_EXIST_ERROR_CODE = "해당 번호의 대회가 없습니다."
    ALREADY_EXIST_PARTICIPATE_CODE = "이미 대회 참가를 진행했습니다."