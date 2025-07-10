from fastapi import APIRouter
from app.api.endpoints import plan_endpoint, user_endpoint, device_endpoint

api_router = APIRouter()

api_router.include_router(user_endpoint.router, prefix="/users", tags=["user"])
api_router.include_router(plan_endpoint.router, prefix="/plans", tags=["plan"])
api_router.include_router(device_endpoint.router, prefix="/devices", tags=["devices"])