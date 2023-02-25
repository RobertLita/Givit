from pydantic import BaseModel
from datetime import datetime


class RewardAllocationBase(BaseModel):
    userId: int
    rewardId: int


class RewardAllocationCreate(RewardAllocationBase):
    pass


class RewardAllocation(RewardAllocationBase):
    id: int
    acquireDate: datetime

    class Config:
        orm_mode = True
