from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database import engine, Base

# Import all your API routers (endpoints)
from app.api.v1.endpoints import transactions, auth, budgets

# Create Database Tables
# This command looks at all your models (User, Transaction, Budget)
# and creates the tables if they don't exist.
Base.metadata.create_all(bind=engine)

# Initialize the FastAPI Application
app = FastAPI(title=settings.PROJECT_NAME)

# --- CORS Configuration ---
# This allows your Frontend (running on port 5173) to talk to this Backend.
origins = [
    "http://localhost:5173", # Vite Frontend (Local Development)
    "http://localhost:3000", # Alternative React Port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"], # Allows all headers (Authorization, etc.)
)

# --- Register Routers (The URL Paths) ---

# 1. Authentication Router (Login & Signup)
# URL: http://127.0.0.1:8000/api/v1/auth
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])

# 2. Transactions Router (Add, View, Edit, Delete Expenses)
# URL: http://127.0.0.1:8000/transactions
app.include_router(transactions.router, prefix="/transactions", tags=["transactions"])

# 3. Budgets Router (Set and View Monthly Limits)
# URL: http://127.0.0.1:8000/budgets
app.include_router(budgets.router, prefix="/budgets", tags=["budgets"])

# --- Root Endpoint (Health Check) ---
@app.get("/")
def read_root():
    return {
        "message": "Finance Fusion API is Running", 
        "docs_url": "http://127.0.0.1:8000/docs"
    }