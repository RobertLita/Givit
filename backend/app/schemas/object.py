from pydantic import BaseModel
from enum import Enum


class ObjectStatus(str, Enum):
    reserved = "RESERVED"
    donated = "DONATED"
    available = "AVAILABLE"


class ObjectBase(BaseModel):
    name: str
    description: str
    condition: str
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
