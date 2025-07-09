from sqlalchemy.orm import Session
from app.models import models

def get_plans(db: Session):
    return db.query(models.Plan).all()