from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://admin:admin@localhost:5432/flame_db"
    SECRET_KEY: str = "admin"

settings = Settings()

SECRET_KEY = os.getenv("SECRET_KEY", "KLKMAMAHUEVAZO") 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30000