from pydantic import BaseModel
from typing import Optional, Any

class AuthBase(BaseModel):
    username: str
    email: str

class Register(AuthBase):
    password: str
    plan_id: int

class Login(BaseModel):
    username:str
    password: str