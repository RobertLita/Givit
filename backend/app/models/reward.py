from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.db.base import Base


class Reward(Base):
    __tablename__ = "reward"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    requiredDonations = Column(Integer, nullable=False)
