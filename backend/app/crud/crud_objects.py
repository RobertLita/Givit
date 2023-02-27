from sqlalchemy.orm import Session
from app.schemas.object import ObjectCreate
from app.models.object import Object


def get_objects(db: Session, skip: int = 0, limit: int = 100) -> [Object]:
    return db.query(Object).offset(skip).limit(limit).all()


def get_object(db: Session, object_id: int) -> Object:
    return db.query(Object).filter(Object.id == object_id).first()


def create_object(db: Session, object_body: ObjectCreate) -> Object:
    db_object = Object(
        name=object_body.name,
        description=object_body.description,
        condition=object_body.condition,
        category=object_body.category,
        donorId=object_body.donorId,
    )
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


def delete_object(db: Session, object_id: int) -> Object:
    db_object = db.query(Object).filter(Object.id == object_id).first()
    db.delete(db_object)
    db.commit()
    return db_object


def update_object(db: Session, existing_object: Object, object_body: Object) -> Object:
    update_data = object_body.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(existing_object, key, value)
    db.commit()
    return existing_object
