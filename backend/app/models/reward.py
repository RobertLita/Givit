from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class Reward(Base):
    __tablename__ = "reward"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    requiredDonations = Column(Integer, nullable=False)

    users = relationship("RewardAllocation", back_populates="reward")
