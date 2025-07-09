from fastapi import APIRouter
from app.api.endpoints import plan, user

api_router = APIRouter()

api_router.include_router(user.router, prefix="/users", tags=["user"])
api_router.include_router(plan.router, prefix="/plans", tags=["plan"])