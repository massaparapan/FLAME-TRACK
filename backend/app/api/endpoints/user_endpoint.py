from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas import user_schema
from app.crud import user_crud, auth_crud, device_crud
from app.schemas import device_schema

router = APIRouter()

@router.get("/me", response_model=user_schema.User)
def get_user(current_user: user_schema.User = Depends(auth_crud.get_current_user)):

    if not current_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return current_user

@router.get("/me/plan", response_model=user_schema.Plan)
def get_user_plan(current_user: user_schema.User = Depends(auth_crud.get_current_user), db: Session = Depends(get_db)):

    if not current_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    plan = user_crud.get_user_current_plan(db, current_user.id)

    if not plan:
        raise HTTPException(status_code=404, detail="El usuario no tiene un plan asignado")
    
    return plan

@router.put("/me/plan", response_model=user_schema.User)
def update_user_plan(plan_id: int, current_user: user_schema.User = Depends(auth_crud.get_current_user), db: Session = Depends(get_db)):

    user = user_crud.update_user_plan(db, current_user.id, plan_id)

    if not user:
        raise HTTPException(status_code=404, detail="Usuario o plan no encontrado")
    return user

@router.get("/me/devices", response_model=List[device_schema.Device])
def get_my_devices(current_user: user_schema.User = Depends(auth_crud.get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    devices = device_crud.get_user_devices(db=db, user_id=current_user.id)
    return devices