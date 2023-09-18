from sqlalchemy import Column, Integer, String
from app.db.base_class import Base


class Requirement(Base):
    __tablename__ = "requirement"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    goalId = Column(Integer)
    objectId = Column(Integer)
