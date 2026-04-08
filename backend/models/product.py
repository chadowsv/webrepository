from sqlmodel import SQLModel, Field
from typing import Optional
class Product(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name:str
    description:Optional[str]
    price:float
    stock:int
    image_url:Optional[str]
    category:Optional[int] = Field(default=None, foreign_key="category.id")