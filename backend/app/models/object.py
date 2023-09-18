from sqlalchemy import Column, ForeignKey, Integer, String, Enum, Boolean
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
    date = Column(String)
    proof = Column(String)
    isGoal = Column(Boolean)
    donorId = Column(Integer, ForeignKey("user.id"), nullable=False)
    organizationId = Column(Integer, ForeignKey("user.id"))

    donor = relationship("User", foreign_keys=[donorId], back_populates="donor_donations")
    organization = relationship(
        "User", foreign_keys=[organizationId], back_populates="organization_donations"
    )
    images = relationship("Image", back_populates="object", foreign_keys="[Image.objectId]")
