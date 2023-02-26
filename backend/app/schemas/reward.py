from pydantic import BaseModel, validator


class RewardBase(BaseModel):
    name: str
    description: str
    requiredDonations: int

    validator('description')

    def check_description(cls, description):
        if len(description) > 70:
            raise ValueError('Description must be 70 characters or less')
        return description

    @validator('name')
    def check_name(cls, name):
        if len(name) > 30:
            raise ValueError('Name must be 20 characters or less')
        return name

    @validator('requiredDonations')
    def check_donations(cls, reqDonations):
        if reqDonations <= 0:
            raise ValueError('Name must be 20 characters or less')
        return reqDonations


class RewardCreate(RewardBase):
    pass


class Reward(RewardBase):
    id: int

    class Config:
        orm_mode = True
