from pydantic import BaseModel, EmailStr
from typing import Optional

# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str

# Properties to return via API
class User(UserBase):
    id: int
    class Config:
        from_attributes = True

# Properties for Login
class Token(BaseModel):
    access_token: str
    token_type: str