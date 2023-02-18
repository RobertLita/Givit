from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class Review(Base):
    __tablename__ = "review"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    reviewerId = Column(Integer, ForeignKey("user.id"), nullable=False)
    reviewedId = Column(Integer, ForeignKey("user.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    message = Column(String)

    reviewer = relationship("User", back_populates="reviews", foreign_keys=[reviewerId])
    reviewed = relationship("User", back_populates="reviews", foreign_keys=[reviewedId])
