from sqlalchemy.orm import Session
from app.schemas.object import ObjectCreate
from app.models.object import Object


def get_objects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Object).offset(skip).limit(limit).all()


def get_object_by_id(db: Session, objectId: int) -> Object | None:
    return db.query(Object).filter(Object.id == objectId).first()


def create_object(db: Session, objectBody: ObjectCreate):
    pass
