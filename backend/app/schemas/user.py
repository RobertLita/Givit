from pydantic import BaseModel, validator
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
    email: str
    type: UserType = UserType.donor
    is_superuser: bool = False

    @validator("email")
    def check_email(cls, email):
        if "@" not in email or "." not in email:
            raise ValueError("Email is not valid")
        return email


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    is_active: bool = True
    donationCount: int = 0
    reviewCount: int = 0
    rewards: list[RewardAllocation] = []
    donations: list[Object] = []
    reviews: list[Review] = []

    class Config:
        orm_mode = True


class UserInDB(User):
    hashed_password: str
