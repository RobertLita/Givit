from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.schemas.enums.object_status import ObjectStatus
from app.schemas.enums.object_category import ObjectCategory
from app.schemas.enums.object_condition import ObjectCondition
from app.db.base_class import Base


class Object(Base):
    __tablename__ = "object"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    condition = Column(Enum(ObjectCondition), nullable=False)
    category = Column(Enum(ObjectCategory), nullable=False)
    status = Column(Enum(ObjectStatus), nullable=False, default=ObjectStatus.available)
    donorId = Column(Integer, ForeignKey("user.id"), nullable=False)
    organizationId = Column(Integer, ForeignKey("user.id"))

    donor = relationship("User", foreign_keys=[donorId], back_populates="donations")
    organization = relationship("User", foreign_keys=[organizationId], back_populates="donations")
    # TODO images