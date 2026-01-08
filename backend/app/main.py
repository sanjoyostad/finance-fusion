from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database import engine, Base
from app.api.v1.endpoints import transactions

# Create Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# CORS (Allows Frontend to talk to Backend)
origins = [
    "http://localhost:5173", # Vite default port
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions.router, prefix="/transactions", tags=["transactions"])

@app.get("/")
def read_root():
    return {"message": "Finance Fusion API is Running"}