from sqlmodel import SQLModel, Field
from typing import Optional

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    email: str
    avatar_url: str

class UserCreate(SQLModel):
    nombre: str
    email: str
    avatar_url: str

class UserRead(SQLModel):
    id: int
    nombre: str
    email: str
    avatar_url: str

class UserUpdate(SQLModel):
    nombre: Optional[str] = None
    email: Optional[str] = None
    avatar_url: Optional[str] = None