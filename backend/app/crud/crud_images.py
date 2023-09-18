from sqlalchemy.orm import Session
from app.models.image import Image


def get_images(db: Session, object_id: int) -> [Image]:
    return db.query(Image.url).filter(object_id == Image.objectId).all()


def create_image(db: Session, url: str, objectId: int) -> Image:
    db_image = Image(url=url, objectId=objectId)
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image


def delete_image(db: Session, object_id: int) -> Image:
    db_image = db.query(Image).filter(Image.objectId == object_id).all()
    for image in db_image:
        db.delete(image)
    db.commit()
