from fastapi import APIRouter, Depends
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_objects
from app.schemas.object import ObjectCreate

router = APIRouter()


@router.get("/")
async def read_objects(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)):
    objects = crud_objects.get_objects(db, skip, limit)
    return objects


# @router.post("/")
# async def create_object(object: ObjectCreate, db: Session = Depends(deps.get_db)):
#     db_object = crud_objects.get_object_by_id(db, objectId=object.id)
