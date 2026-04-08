from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select
from contextlib import asynccontextmanager
from backend.db import create_all_tables, SessionDep
from backend.routes.users import users
from backend.routes.product import products
from backend.routes.category import categories
#Ejecucion de create_all_tables al iniciar la aplicacion
app = FastAPI(lifespan=create_all_tables)
app.include_router(users)
app.include_router(products)
app.include_router(categories)
origins = [
    "*",  # luego lo cambias por tu URL de S3
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"Hello": "World"}
@app.get("/check-db")
def checkdb(session: SessionDep):
    result = session.exec(select(1)).first()
    return {"Database Connection": result}