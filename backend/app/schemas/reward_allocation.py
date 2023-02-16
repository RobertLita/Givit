from pydantic import BaseModel
from datetime import datetime


class RewardAllocationBase(BaseModel):
    userId: int
    rewardId: int
    acquireDate: datetime


class RewardAllocation(RewardAllocationBase):
    id: int

    class Config:
        orm_mode = True
