from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas import user_schema
from app.crud import user_crud

router = APIRouter()

@router.post("/", response_model=user_schema.User, status_code=status.HTTP_201_CREATED)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    db_user = user_crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Nombre de usuario ya existe.")
    
    return user_crud.create_user(db=db, user=user)

@router.get("/{user_id}", response_model=user_schema.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.get("/{user_id}/plan", response_model=user_schema.Plan)
def get_user_plan(user_id: int, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    plan = user_crud.get_user_current_plan(db, user_id)
    if not plan:
        raise HTTPException(status_code=404, detail="El usuario no tiene un plan asignado")
    
    return plan

@router.put("/{user_id}/plan", response_model=user_schema.User)
def update_user_plan(user_id: int, plan_id: int, db: Session = Depends(get_db)):
    user = user_crud.update_user_plan(db, user_id, plan_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario o plan no encontrado")
    return user