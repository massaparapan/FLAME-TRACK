from pydantic import BaseModel
from typing import Optional, Any

class PlanBase(BaseModel):
    name: str
    description: str
    price: str
    features: Any

class Plan(PlanBase):
    id: int
   
    model_config = {
        "from_attributes": True
    }

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str
    plan_id: int

class User(UserBase):
    id: int
    plan_id: Optional[int] = None
    
    model_config = {
        "from_attributes": True
    }

class UserWithPlan(User):
    plan: Optional[Plan] = None
    
    model_config = {
        "from_attributes": True
    }