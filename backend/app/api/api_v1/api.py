from fastapi import APIRouter
from app.api.api_v1.endpoints import objects, users

api_router = APIRouter()
api_router.include_router(objects.router, prefix="/objects", tags=["objects"])
api_router.include_router(users.router, prefix="/users", tags=["users"])