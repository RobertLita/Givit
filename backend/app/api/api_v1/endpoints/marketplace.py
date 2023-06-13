from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_objects, crud_images
from app.schemas.object import Object
from app.schemas.enums.object_category import ObjectCategory
from ....s3.file_operations import s3_download

router = APIRouter()


@router.get("/")
async def read_marketplace(
        skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)
):
    objects = crud_objects.get_marketplace(db, skip, limit)
    complete_objects = []
    for obj in objects:
        complete_object = obj.__dict__
        image = crud_images.get_images(db, complete_object['id'])[0][0].split('/')[1]
        complete_object["image"] = await s3_download(key=image, bucket_name="gobjects")
        complete_objects.append(complete_object)
    return complete_objects


@router.get("/filtered")
async def read_filtered_marketplace(
        category: str, skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)
):
    complete_objects = []
    try:
        category_enum = ObjectCategory(category)
        objects = crud_objects.get_marketplace_filtered(db, category_enum, skip, limit)

        for obj in objects:
            complete_object = obj.__dict__
            image = crud_images.get_images(db, complete_object['id'])[0][0].split('/')[1]
            print(image)
            complete_object["image"] = await s3_download(key=image, bucket_name="gobjects")
            complete_objects.append(complete_object)
        return complete_objects
    except ValueError:
        raise HTTPException(status_code=400, detail="Filtering category not found")
    return complete_objects


# @router.get("/{object_id}/images")
# async def download_picture(
#         object_id: int,
#         db: Session = Depends(deps.get_db),
#
# ):
#     urls = crud_images.get_images(db, object_id)
#     links = []
#     for url in urls:
#         try:
#             file = url[0].split("/")[1]
#             content = await s3_download(key=file, bucket_name="gobjects")
#             links.append(content)
#         except Exception as e:
#             print(e)
#     return links