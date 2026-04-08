from fastapi import APIRouter, HTTPException
from sqlmodel import select
from backend.db import SessionDep
from backend.models.product import Product  

products = APIRouter(prefix="/products", tags=["products"])

@products.post("/")
def create_product(product: Product, session: SessionDep):
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

@products.get("/")
def list_products(session: SessionDep):
    products_list = session.exec(select(Product)).all()
    return products_list

@products.get("/{product_id}")
def get_product(product_id: int, session: SessionDep):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product no encontrado")
    return product

@products.put("/{product_id}")
def update_product(product_id: int, product: Product, session: SessionDep):
    db_product = session.get(Product, product_id)

    if not db_product:
        raise HTTPException(status_code=404, detail="Product no encontrado")

    update_data = product.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_product, key, value)

    session.commit()
    session.refresh(db_product)

    return db_product

@products.delete("/{product_id}")
def delete_product(product_id: int, session: SessionDep):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product no encontrado")
    session.delete(product)
    session.commit()
    return {"ok": True}