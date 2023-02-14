from pydantic import BaseModel


class RewardBase(BaseModel):
    name: str
    description: str
    requiredDonations: int


class Reward(RewardBase):
    id: int

    class Config:
        orm_mode = True
