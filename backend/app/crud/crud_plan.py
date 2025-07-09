from sqlalchemy.orm import Session
from app.models import models
from app.schemas import schemas
from passlib.context import CryptContext

def get_plans(db: Session):
    return db.query(models.Plan).all()