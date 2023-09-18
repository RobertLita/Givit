from sqlalchemy import and_
from sqlalchemy.orm import Session

from app.crud.crud_images import delete_image
from app.schemas.object import ObjectCreate
from app.models.object import Object
from app.schemas.enums.object_status import ObjectStatus
from app.schemas.enums.object_category import ObjectCategory


def get_marketplace(db: Session, skip: int = 0, limit: int = 25) -> [Object]:
    return db.query(Object).filter(and_(Object.status == ObjectStatus.available, Object.isGoal == False)).offset(skip).limit(limit).all()


def get_marketplace_filtered(db: Session, category: ObjectCategory, skip: int = 0, limit: int = 25) -> [Object]:
    return db.query(Object).filter(and_(Object.category == category, Object.status == ObjectStatus.available, Object.isGoal == False)).offset(skip).limit(limit).all()


def get_my_objects(db: Session, donor_id: int = None, organization_id: int = None, skip: int = 0, limit: int = 25):
    if donor_id:
        return db.query(Object).filter(Object.donorId == donor_id).offset(skip).limit(limit).all()
    elif organization_id:
        return db.query(Object).filter(Object.organizationId == organization_id).offset(skip).limit(limit).all()

def get_object(db: Session, object_id: int) -> Object:
    return db.query(Object).filter(Object.id == object_id).first()


def create_object(db: Session, object_body: ObjectCreate) -> Object:
    db_object = Object(
        name=object_body.name,
        description=object_body.description,
        condition=object_body.condition,
        category=object_body.category,
        date=object_body.date,
        isGoal=object_body.isGoal,
        proof=None,
        donorId=object_body.donorId,
    )
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


def delete_object(db: Session, object_id: int) -> Object:
    try:
        delete_image(db, object_id)
    except Exception as e:
        pass
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


def add_proof(db: Session, object_id: int, url: str) -> Object:
    db_object = get_object(db, object_id)
    setattr(db_object, "proof", url)
    db.commit()
    return db_object
