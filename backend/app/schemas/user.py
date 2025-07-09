from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str
    email: EmailStr

class User(UserBase):
    id: int

    model_config = {
        "from_attributes": True
    }

class UserCreate(UserBase):
    password: str