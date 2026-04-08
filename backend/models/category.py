from sqlmodel import SQLModel, Field
from typing import Optional

class Category(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None