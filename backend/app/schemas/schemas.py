from pydantic import BaseModel, EmailStr, Field
from typing import Any, List, Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr

class PlanBase(BaseModel):
    name: str
    description: str
    price: str
    features: Any

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    model_config = {
        "from_attributes": True
    }

class Plan(PlanBase):
    id: int
    
    model_config = {
        "from_attributes": True
    }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None