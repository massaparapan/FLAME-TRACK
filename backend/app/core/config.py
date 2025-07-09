from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str

settings = Settings(
    DATABASE_URL="postgresql://admin:admin@localhost:5432/flame_db",
    SECRET_KEY="admin"
)