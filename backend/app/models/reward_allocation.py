from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class RewardAllocation(Base):
    __tablename__ = "reward_allocation"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(Integer, ForeignKey("user.id"), nullable=False)
    rewardId = Column(Integer, ForeignKey("reward.id"), nullable=False)

    user = relationship("User", back_populates="rewards", foreign_keys=[userId])
    reward = relationship("Reward", foreign_keys=[rewardId])
