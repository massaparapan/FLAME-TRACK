from pydantic import BaseModel, Field
from typing import Optional, List


class DeviceBase(BaseModel):
    access_token: str

class DeviceCreate(DeviceBase):
    pass

class Device(DeviceBase):
    id: int
    
    class Config:
        from_attributes = True

class DeviceUserAssociation(BaseModel):
    device_id: int 
    user_id: int

class DeviceResponse(BaseModel):
    success: bool
    message: str
    device: Optional[Device] = None

class AssociationResponse(BaseModel):
    success: bool
    message: str