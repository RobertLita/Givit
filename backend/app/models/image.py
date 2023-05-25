from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class Image(Base):
    __tablename__ = "image"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(String, default="gobjects/default.jpg")
    objectId = Column(Integer, ForeignKey("object.id"))

    object = relationship("Object", back_populates="images", foreign_keys=[objectId])
