from sqlalchemy.orm import Session
from app.models import models
from passlib.context import CryptContext
from sqlalchemy.orm import Session, joinedload

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_current_plan(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if user and user.plan_id:
        return db.query(models.Plan).filter(models.Plan.id == user.plan_id).first()
    return None

def update_user_plan(db: Session, user_id: int, plan_id: int):
    user = get_user_by_id(db, user_id)
    if user:
        plan = db.query(models.Plan).filter(models.Plan.id == plan_id).first()
        if plan:
            user.plan_id = plan_id
            db.commit()
            db.refresh(user)
            return user
    return None

def get_user(db: Session, username: str):
    try:
        user = db.query(models.User).filter(models.User.username == username).first()
        return user
    finally:
        db.close()