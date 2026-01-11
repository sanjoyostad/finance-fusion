from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TransactionBase(BaseModel):
    amount: float
    description: str
    category: str = "Uncategorized"
    source_type: str = "CASH"
    is_expense: bool = True
    # --- NEW: Add this line so the backend accepts the date ---
    date: Optional[datetime] = None 

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    user_id: int
    # Ensure date is always present in the response
    date: datetime 

    class Config:
        from_attributes = True