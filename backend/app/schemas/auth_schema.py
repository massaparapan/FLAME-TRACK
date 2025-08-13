from pydantic import BaseModel

class Register(BaseModel):
    username: str
    email: str
    password: str
    plan_id: int

class Login(BaseModel):
    username:str
    password: str