from pydantic import BaseModel, validator
from pydantic.networks import EmailStr
from .enums.user_type import UserType
from app.schemas.reward_allocation import RewardAllocation
from app.schemas.object import Object
from app.schemas.review import Review


class UserDetail(BaseModel):
    username: str
    rating: float = 0.0

    @validator("username")
    def check_username(cls, username):
        if len(username) > 15:
            raise ValueError("Username must be 15 characters or less")
        return username


class UserBase(UserDetail):
    email: EmailStr
    type: UserType = UserType.donor


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    is_active: bool = True
    is_superuser: bool = False
    donationCount: int = 0
    reviewCount: int = 0
    rewards: list[RewardAllocation] = []
    donations: list[Object] = []
    reviews: list[Review] = []

    class Config:
        orm_mode = True


class UserUpdate(UserBase):
    password: str


class UserInDB(User):
    hashed_password: str
