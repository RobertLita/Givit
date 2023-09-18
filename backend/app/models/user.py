from sqlalchemy import Column, Integer, String, Enum, Float, Boolean
from sqlalchemy.orm import relationship
from app.schemas.enums.user_type import UserType
from app.db.base_class import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, index=True, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    type = Column(Enum(UserType), nullable=False, default=UserType.donor)
    rating = Column(Float, default=0.0)
    reviewCount = Column(Integer, default=0)
    donationCount = Column(Integer, default=0)
    rewardCount = Column(Integer, default=0)
    profile_url = Column(String, default="gusers/default.jpg")
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)

    donor_donations = relationship(
        "Object", back_populates="donor", foreign_keys="[Object.donorId]"
    )
    organization_donations = relationship(
        "Object", back_populates="organization", foreign_keys="[Object.organizationId]"
    )
    reviews = relationship(
        "Review", back_populates="reviewed", foreign_keys="[Review.reviewedId]"
    )
    rewards = relationship("RewardAllocation", back_populates="user")
