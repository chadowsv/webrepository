from sqlmodel import SQLModel, Field
from typing import Optional

class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None

class CategoryCreate(SQLModel):
    name: str
    description: Optional[str] = None

class CategoryRead(SQLModel):
    id: int
    name: str
    description: Optional[str] = None

class CategoryUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None