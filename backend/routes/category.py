from fastapi import APIRouter, HTTPException
from sqlmodel import select
from backend.db import SessionDep
from backend.models.category import Category
from backend.models.product import Product

categories = APIRouter(prefix="/categories", tags=["categories"])


@categories.post("/")
def create_category(category: Category, session: SessionDep):
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


@categories.get("/")
def list_categories(session: SessionDep):
    return session.exec(select(Category)).all()


@categories.get("/{category_id}")
def get_category(category_id: int, session: SessionDep):
    category = session.get(Category, category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category no encontrada")

    return category


@categories.put("/{category_id}")
def update_category(category_id: int, data: Category, session: SessionDep):
    category = session.get(Category, category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category no encontrada")

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(category, key, value)

    session.commit()
    session.refresh(category)

    return category


@categories.delete("/{category_id}")
def delete_category(category_id: int, session: SessionDep):
    category = session.get(Category, category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category no encontrada")

    session.delete(category)
    session.commit()

    return {"ok": True}

@categories.get("/{category_id}/products")
def get_products_by_category(category_id: int, session: SessionDep):
    # validar que la categoría exista
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category no encontrada")

    products = session.exec(
        select(Product).where(Product.category_id == category_id)
    ).all()

    return products