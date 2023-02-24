from pydantic import BaseModel
from .enums.user_type import UserType
from app.schemas.reward import Reward
from app.schemas.object import Object
from app.schemas.review import Review


class UserDetail(BaseModel):
    username: str
    rating: float = 0.0


class UserBase(UserDetail):
    email: str
    type: UserType = UserType.donor
    donationCount: int = 0


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    rewards: list[Reward] = []
    donations: list[Object] = []
    reviews: list[Review] = []

    class Config:
        orm_mode = True
