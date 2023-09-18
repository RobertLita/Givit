from pydantic import BaseModel


class GoalBase(BaseModel):
    name: str
    description: str


class GoalCreate(GoalBase):
    pass


class Goal(GoalBase):
    id: int

    class Config:
        orm_mode = True
