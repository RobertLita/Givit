from datetime import datetime

from sqlalchemy import Column, Integer, String,DateTime
from app.db.base_class import Base


class Message(Base):
    __tablename__ = "message"
    id = Column(Integer, primary_key=True, index=True)
    senderId = Column(Integer)
    recipientId = Column(Integer)
    content = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
