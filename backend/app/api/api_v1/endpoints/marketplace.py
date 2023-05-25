from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_objects
from app.schemas.object import Object
from app.schemas.enums.object_category import ObjectCategory

router = APIRouter()


@router.get("/", response_model=list[Object])
async def read_marketplace(
        skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)
):
    objects = crud_objects.get_marketplace(db, skip, limit)
    return objects


@router.get("/filtered", response_model=list[Object])
async def read_filtered_marketplace(
        category: str, skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)
):
    try:
        category_enum = ObjectCategory(category)
        objects = crud_objects.get_marketplace_filtered(db, category_enum, skip, limit)
    except ValueError:
        raise HTTPException(status_code=400, detail="Filtering category not found")
    return objects
