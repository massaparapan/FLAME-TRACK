from pydantic import BaseModel
from typing import Any

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