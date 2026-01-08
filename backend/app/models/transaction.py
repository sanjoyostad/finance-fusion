from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from datetime import datetime
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    description = Column(String, index=True)
    category = Column(String, default="Uncategorized")
    source_type = Column(String, default="CASH") # UPI, CASH, CARD
    date = Column(DateTime, default=datetime.utcnow)
    is_expense = Column(Boolean, default=True) # True = Expense, False = Income