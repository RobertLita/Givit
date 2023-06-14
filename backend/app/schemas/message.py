import datetime

from pydantic import BaseModel


class MessageBase(BaseModel):
    senderId: str
    recipientId: str
    content: str


class MessageCreate(MessageBase):
    pass


class Message(MessageBase):
    id: int
    timestamp: datetime.datetime

    class Config:
        orm_mode = True
