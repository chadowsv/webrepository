from fastapi import APIRouter, HTTPException
from sqlmodel import select
from backend.db import SessionDep
from backend.models.usuario import User
users = APIRouter(prefix="/users", tags=["users"])

@users.post("/")
def create_user(user: User, session: SessionDep):
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
@users.get("/")
def list_users(session: SessionDep):
    users = session.exec(select(User)).all()
    return users
@users.get("/{user_id}")
def get_user(user_id: int, session: SessionDep):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404,detail="User not found")
    return user
@users.put("/{user_id}")
def update_user(user_id: int, datos: User, session: SessionDep):
    user = session.get(User, user_id)

    if not user:
        return {"error": "No encontrado"}

    user.nombre = datos.nombre
    user.email = datos.email

    session.commit()
    session.refresh(user)

    return user
@users.delete("/{user_id}")
def delete_user(user_id: int, session: SessionDep):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    session.delete(user)
    session.commit()
    return{"ok":True}