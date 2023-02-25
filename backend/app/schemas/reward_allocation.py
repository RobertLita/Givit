from pydantic import BaseModel
from datetime import date
from app.schemas.reward import Reward


class RewardAllocationBase(BaseModel):
    userId: int
    rewardId: int


class RewardAllocationCreate(RewardAllocationBase):
    pass


class RewardAllocation(RewardAllocationBase):
    id: int
    acquireDate: date
    reward: Reward

    class Config:
        orm_mode = True
