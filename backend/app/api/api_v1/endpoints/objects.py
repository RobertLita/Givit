from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_objects
from app.schemas.object import ObjectCreate, Object
from app.schemas.user import UserDetail
from app.crud.crud_users import increment_donation

router = APIRouter()


@router.get("/", response_model=list[Object])
async def read_objects(
    skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)
):
    objects = crud_objects.get_objects(db, skip, limit)
    return objects


@router.post("/", response_model=Object)
async def create_object(object: ObjectCreate, db: Session = Depends(deps.get_db)):
    if (
        object.description is None
        or object.name is None
        or object.condition is None
        or object.category is None
        or object.status is None
    ):
        raise HTTPException(
            status_code=400, detail="Object has one or more empty fields"
        )
    if object.donorId is None:
        raise HTTPException(status_code=400, detail="Object must have a donor")
    new_object = crud_objects.create_object(db, object)
    increment_donation(db, object.donorId)
    return new_object


@router.get("/{object_id}", response_model=Object)
async def read_object(object_id: int, db: Session = Depends(deps.get_db)):
    db_object = crud_objects.get_object(db, object_id)
    if db_object is None:
        raise HTTPException(
            status_code=404, detail=f"Object with id = {object_id} was not found"
        )
    return db_object


@router.delete("/{object_id}", response_model=Object)
async def delete_object(object_id: int, db: Session = Depends(deps.get_db)):
    db_object = crud_objects.get_object(db, object_id)
    if db_object is None:
        raise HTTPException(
            status_code=404, detail=f"Object with id = {object_id} was not found"
        )
    db_object = crud_objects.delete_object(db, object_id)
    return db_object


@router.get("/{object_id}/donor", response_model=UserDetail)
async def get_donor(object_id: int, db: Session = Depends(deps.get_db)):
    db_object = crud_objects.get_object(db, object_id)
    if db_object is None:
        raise HTTPException(
            status_code=404, detail=f"Object with id = {object_id} was not found"
        )
    return {"username": db_object.donor.username, "rating": db_object.donor.rating}


@router.get("/{object_id}/org", response_model=UserDetail)
async def get_organization(object_id: int, db: Session = Depends(deps.get_db)):
    db_object = crud_objects.get_object(db, object_id)
    if db_object is None:
        raise HTTPException(
            status_code=404, detail=f"Object with id = {object_id} was not found"
        )
    if db_object.organization is None:
        raise HTTPException(status_code=404, detail=f"This object has no organization")
    return {
        "username": db_object.organization.username,
        "rating": db_object.organization.rating,
    }


@router.patch("/{object_id}", response_model=Object)
async def update_object(
    object_id: int, object: Object, db: Session = Depends(deps.get_db)
):
    db_object = crud_objects.get_object(db, object_id)
    if db_object is None:
        raise HTTPException(
            status_code=404, detail=f"Object with id = {object_id} was not found"
        )
    return crud_objects.update_object(db, existing_object=db_object, object_body=object)
