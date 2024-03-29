from fastapi import APIRouter
from app.api.api_v1.endpoints import (
    objects,
    users,
    rewards,
    reviews,
    reward_allocation,
    login,
    marketplace,
    chat,
    goals,
    requirements
)

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(objects.router, prefix="/objects", tags=["objects"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(rewards.router, prefix="/rewards", tags=["rewards"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
api_router.include_router(
    reward_allocation.router, prefix="/allocation", tags=["reward_allocation"]
)
api_router.include_router(
    marketplace.router, prefix="/marketplace", tags=["marketplace"]
)
api_router.include_router(
    chat.router, prefix="/chat", tags=["chat"]
)
api_router.include_router(goals.router, prefix='/goals', tags=["goals"])
api_router.include_router(requirements.router, prefix='/requirements', tags=["requirements"])
