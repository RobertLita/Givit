from pydantic import BaseModel


class RequirementBase(BaseModel):
    name: str
    description: str
    goalId: int

class RequirementCreate(RequirementBase):
    pass


class Requirement(RequirementBase):
    id: int
    objectId: int
    class Config:
        orm_mode = True
