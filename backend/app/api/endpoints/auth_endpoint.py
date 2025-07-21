from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from requests import Session
from app.db.session import get_db
from app.crud import auth_crud, user_crud
from app.models import models
from app.schemas import auth_schema

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(req: auth_schema.Register, db: Session = Depends(get_db)):
    
    if user_crud.get_user_by_username(db, req.username): 
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El usuario ya existe"
        )
    
    user = auth_crud.create_user(db, req)  

    token = auth_crud.create_access_token(
        data={"sub": user.username}
    )
    
    return {"access_token": token}

@router.post("/login")
async def login(user_credentials: auth_schema.Login, db: Session = Depends(get_db)):
    user = auth_crud.authenticate_user(db, user_credentials.username, user_credentials.password)
   
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Bearer"},
        )
   
    token = auth_crud.create_access_token(
        data={"sub": user.username}
    )
   
    return {"access_token": token}