import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Finance Fusion"
    # Using SQLite for simplicity in local dev, easy to switch to Postgres later
    DATABASE_URL: str = "sqlite:///./finance.db"
    API_V1_STR: str = "/api/v1"

    class Config:
        case_sensitive = True

settings = Settings()