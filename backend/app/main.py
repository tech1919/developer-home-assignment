from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.tasks import router as tasks_router
from app.database.database import *


app = FastAPI()


init_db()
insert_trash_details_to_db()

# origins list - mean who allowed to send calls 
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

# the permissions
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# for Fast API
app.include_router(
    tasks_router,
    prefix="/tasks",
    tags=["admin"],
    responses={404: {"description": "Not Found"}},
)
