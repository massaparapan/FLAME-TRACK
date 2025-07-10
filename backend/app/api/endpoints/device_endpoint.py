from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas import device_schema, user_schema
from app.crud import device_crud, auth_crud

router = APIRouter()

@router.post("/", response_model=device_schema.Device, status_code=status.HTTP_201_CREATED)
def create_device(deviceCreate: device_schema.DeviceCreate, current_user: user_schema.User = Depends(auth_crud.get_current_user), db: Session = Depends(get_db)):

    if not current_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    try:
        device = device_crud.create_device(db, deviceCreate)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al crear el dispositivo"
        )

    success = device_crud.associate_device_to_user(db, device.id, current_user.id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo asociar el dispositivo (dispositivo no encontrado o asociación ya existe)"
        )
    
    return device

@router.delete("/{device_id}", response_model=device_schema.DeviceResponse)
def delete_device(device_id: int, db: Session = Depends(get_db)):
    success = device_crud.delete_device(db=db, device_id=device_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dispositivo no encontrado"
        )
    
    return device_schema.DeviceResponse(
        success=True,
        message="Dispositivo eliminado exitosamente"
    )