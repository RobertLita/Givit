from pydantic import BaseModel, validator
from .enums.object_status import ObjectStatus
from .enums.object_category import ObjectCategory
from .enums.object_condition import ObjectCondition


class ObjectBase(BaseModel):
    name: str
    description: str
    condition: ObjectCondition
    category: ObjectCategory
    status: ObjectStatus = ObjectStatus.available
    donorId: int
    organizationId: int | None = None

    @validator("description")
    def check_description(cls, description):
        if len(description) > 150:
            raise ValueError("Description must be 150 characters or less")
        return description

    @validator("name")
    def check_name(cls, name):
        if len(name) > 30:
            raise ValueError("Name must be 30 characters or less")
        return name


class ObjectCreate(ObjectBase):
    pass


class Object(ObjectBase):
    id: int

    class Config:
        orm_mode = True
