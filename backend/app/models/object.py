from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.schemas.enums.object_status import ObjectStatus
from app.schemas.enums.object_category import ObjectCategory
from app.db.base import Base


class Object(Base):
    __tablename__ = "object"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    condition = Column(String, index=True, nullable=False)
    category = Column(Enum(ObjectCategory), index=True, nullable=False)
    status = Column(Enum(ObjectStatus), index=True, nullable=False, default=ObjectStatus.available)
    donorId = Column(Integer, ForeignKey("user.id"), index=True, nullable=False)
    donatedTo = Column(Integer, ForeignKey("user.id"), index=True)
    # TODO images

    # TODO relationship between object and its donor (maybe to organization also)
    # donor = relationship("User", back_populates="object")
    # donor = relationship("User", back_populates="object")
