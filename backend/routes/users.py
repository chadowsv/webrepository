from fastapi import APIRouter, HTTPException
from sqlmodel import select
from backend.db import SessionDep
from backend.models.usuario import User, UserCreate, UserRead, UserUpdate
users = APIRouter(prefix="/users", tags=["users"])

@users.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: SessionDep):
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user
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
@users.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, datos: UserUpdate, session: SessionDep):
    user = session.get(User, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="No encontrado")

    update_data = datos.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(user, key, value)

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