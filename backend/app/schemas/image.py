from pydantic import BaseModel


class ImageBase(BaseModel):
    url: str
    objectId: int


class Image(ImageBase):
    id: int

    class Config:
        orm_mode = True
