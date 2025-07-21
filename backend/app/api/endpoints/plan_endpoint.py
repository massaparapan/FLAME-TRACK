from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas import plan_schema
from app.crud import plan_crud

router = APIRouter()

@router.get("/", response_model=list[plan_schema.Plan], status_code=status.HTTP_200_OK)
def get_plans(db: Session = Depends(get_db)):
    db_plans = plan_crud.get_plans(db)
    if db_plans is None or len(db_plans) == 0:
        raise HTTPException(status_code=404, detail="No se encontraron planes.")
    return db_plans