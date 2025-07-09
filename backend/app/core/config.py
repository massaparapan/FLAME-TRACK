from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://admin:admin@localhost:5432/flame_db"
    SECRET_KEY: str = "admin"

settings = Settings()