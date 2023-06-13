from fastapi import APIRouter, Depends, HTTPException, UploadFile
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_objects, crud_images
from app.schemas.object import ObjectCreate, Object
from app.schemas.user import UserDetail
from app.crud.crud_users import increment_donation
from app.s3.file_operations import s3_download, s3_upload
import magic
from uuid import uuid4

SUPPORTED_FILE_TYPES = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
}

router = APIRouter()


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


@router.post("/{object_id}/image")
async def upload_picture(
        object_id: int,
        db: Session = Depends(deps.get_db),
        file: UploadFile | None = None,
):
    if not file:
        raise HTTPException(status_code=400, detail="No file found")
    content = await file.read()
    size = len(content)

    if not 0 < size <= 1 * (1024 * 1024):
        raise HTTPException(
            status_code=400,
            detail='Supported file size < 1MB'
        )
    file_type = magic.from_buffer(buffer=content, mime=True)
    if file_type not in SUPPORTED_FILE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f'Unsupported file type: {file_type}. Supported types are {SUPPORTED_FILE_TYPES}'
        )
    file_name = f'{uuid4()}.{SUPPORTED_FILE_TYPES[file_type]}'
    await s3_upload(contents=content, key=file_name, bucket_name="gobjects")
    crud_images.create_image(db, f"gobjects/{file_name}", object_id)

    return {'file_name': file_name}


@router.get("/{object_id}/images")
async def download_picture(
        object_id: int,
        db: Session = Depends(deps.get_db),

):
    urls = crud_images.get_images(db, object_id)
    links = []
    for url in urls:
        try:
            file = url[0].split("/")[1]
            content = await s3_download(key=file, bucket_name="gobjects")
            links.append(content)
        except Exception as e:
            print(e)
    return links


@router.get("/{object_id}")
async def read_object(object_id: int, db: Session = Depends(deps.get_db)):
    db_object = crud_objects.get_object(db, object_id)
    if db_object is None:
        raise HTTPException(
            status_code=404, detail=f"Object with id = {object_id} was not found"
        )
    complete_object = db_object.__dict__
    images = crud_images.get_images(db, object_id)
    urls = []
    for image in images:
        url = await s3_download(key=image[0].split('/')[1], bucket_name="gobjects")
        urls.append(url)
    complete_object["images"] = urls
    return complete_object


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
