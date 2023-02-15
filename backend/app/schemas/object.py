from pydantic import BaseModel
from enums.object_status import ObjectStatus
from enums.object_category import ObjectCategory


class ObjectBase(BaseModel):
    name: str
    description: str
    condition: str
    category: ObjectCategory
    status: ObjectStatus = ObjectStatus.available
    donorId: int
    donatedTo: int | None = None
    # TODO images


class ObjectCreate(ObjectBase):
    pass


class Object(ObjectBase):
    id: int

    class Config:
        orm_mode = True
