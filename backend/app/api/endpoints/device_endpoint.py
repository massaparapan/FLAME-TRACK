from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas import device_schema
from app.crud import device_crud

router = APIRouter()

@router.post("/", response_model=device_schema.Device, status_code=status.HTTP_201_CREATED)
def create_device(device: device_schema.DeviceCreate, db: Session = Depends(get_db)):
    
    try:
        return device_crud.create_device(db=db, device=device)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al crear el dispositivo"
        )

@router.get("/{device_id}", response_model=device_schema.Device)
def get_device(device_id: int, db: Session = Depends(get_db)):

    device = device_crud.get_device(db=db, device_id=device_id)
    if device is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dispositivo no encontrado"
        )
    return device

@router.get("/user/{user_id}", response_model=List[device_schema.Device])
def get_user_devices(user_id: int, db: Session = Depends(get_db)):

    devices = device_crud.get_user_devices(db=db, user_id=user_id)
    return devices

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

@router.post("/associate", response_model=device_schema.AssociationResponse)
def associate_device_to_user(association: device_schema.DeviceUserAssociation, db: Session = Depends(get_db)):

    success = device_crud.associate_device_to_user(
        db=db,
        device_id=association.device_id,
        user_id=association.user_id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo asociar el dispositivo (dispositivo o usuario no encontrado, o asociación ya existe)"
        )
    
    return device_schema.AssociationResponse(
        success=True,
        message="Dispositivo asociado exitosamente al usuario"
    )