from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas import user
from app.crud import user

router = APIRouter()

@router.post("/", response_model=user.User, status_code=status.HTTP_201_CREATED)
def create_user(user: user.UserCreate, db: Session = Depends(get_db)):
    db_user = user.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Nombre de usuario ya existe.")
    return user.create_user(db=db, user=user)