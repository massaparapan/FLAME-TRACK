from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
import secrets
import string
from app.schemas import device_schema
from app.models import models

def create_device(db: Session, device: device_schema.DeviceCreate) -> models.Device:
    token_access = device.token_access
    
    db_device = models.Device(
        token_access=token_access
    )
    
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

def get_device(db: Session, device_id: int) -> Optional[models.Device]:
    return db.query(models.Device).filter(models.Device.id == device_id).first()

def get_user_devices(db: Session, user_id: int) -> List[models.Device]:
    return db.query(models.Device).join(models.user_devices).filter(
        models.user_devices.c.user_id == user_id
    ).all()

def delete_device(db: Session, device_id: int) -> bool:
    db_device = db.query(models.Device).filter(models.Device.id == device_id).first()
    
    if not db_device:
        return False
    
    db.delete(db_device)
    db.commit()
    return True

def associate_device_to_user(db: Session, device_id: int, user_id: int) -> bool:
    device = get_device(db, device_id)
    user = db.query(models.User).filter(models.User.id == user_id).first()
    
    if not device or not user:
        return False
    
    existing_association = db.query(models.user_devices).filter(
        and_(
            models.user_devices.c.device_id == device_id,
            models.user_devices.c.user_id == user_id
        )
    ).first()
    
    if existing_association:
        return False  
    
    device.users.append(user)
    db.commit()
    return True