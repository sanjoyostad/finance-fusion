import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Finance Fusion"
    DATABASE_URL: str = "sqlite:///./finance.db"
    API_V1_STR: str = "/api/v1"
    
    # NEW: Security Config
    SECRET_KEY: str = "super-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 Days

    class Config:
        case_sensitive = True

settings = Settings()