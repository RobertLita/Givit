from pydantic import BaseModel
from enums.user_type import UserType
from app.schemas.reward import Reward
from app.schemas.object import Object


class UserBase(BaseModel):
    username: str
    email: str
    type: UserType = UserType.donor
    rating: float = 0.0
    donationCount: int = 0
    rewards: list[Reward] = []
    donations: list[Object] = []


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True
