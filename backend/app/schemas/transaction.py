from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TransactionBase(BaseModel):
    amount: float
    description: str
    category: str = "Uncategorized"
    source_type: str = "CASH"
    is_expense: bool = True

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    date: datetime

    class Config:
        orm_mode = True