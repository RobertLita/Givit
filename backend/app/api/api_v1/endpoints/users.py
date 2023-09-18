from fastapi import APIRouter, Depends, HTTPException, Body, Response, UploadFile
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_users
from app.schemas.user import UserCreate, User, UserInDB
from app.schemas.reward import Reward
from app.models.user import User as UserModel
from pydantic.networks import EmailStr
from fastapi.encoders import jsonable_encoder
from app.s3.file_operations import s3_download, s3_upload
import magic
from uuid import uuid4

SUPPORTED_FILE_TYPES = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
}

router = APIRouter()


@router.get("/", response_model=list[User])
async def read_users(
        skip: int = 0,
        limit: int = 10,
        db: Session = Depends(deps.get_db),
        current_user: UserModel = Depends(deps.get_current_active_superuser),
):
    users = crud_users.get_users(db, skip, limit)
    return users


@router.post("/", response_model=User)
async def create_user(
        user: UserCreate,
        db: Session = Depends(deps.get_db),
):
    db_user = crud_users.get_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_users.create_user(db, user)


@router.get("/me", response_model=User)
async def read_user_me(
        db: Session = Depends(deps.get_db),
        current_user: UserModel = Depends(deps.get_current_active_user),
):
    return current_user


@router.get("/profilepicture")
async def download_picture(
        current_user: UserModel = Depends(deps.get_current_active_user),
):
    url = current_user.profile_url
    try:
        file = url.split("/")[1]
        content = await s3_download(key=file, bucket_name="gusers")
        return content
    except Exception as e:
        print(e)


@router.get("/{user_id}/profilepicture")
async def download_picture(
        user_id: int,
        db: Session = Depends(deps.get_db)
):
    url = crud_users.get_user(db, user_id).profile_url
    try:
        file = url.split("/")[1]
        content = await s3_download(key=file, bucket_name="gusers")
        return content
    except Exception as e:
        print(e)


@router.post("/profilepicture")
async def upload_picture(
        current_user: UserModel = Depends(deps.get_current_active_user),
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
    await s3_upload(contents=content, key=file_name, bucket_name="gusers")
    crud_users.add_profile_picture(db, current_user.id, f"gusers/{file_name}")

    return {'file_name': file_name}


@router.get("/{user_id}", response_model=User)
async def read_user(user_id: int, db: Session = Depends(deps.get_db)):
    db_user = crud_users.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User was not found")
    return db_user


@router.delete("/{user_id}", response_model=User)
async def delete_user(
        user_id: int,
        db: Session = Depends(deps.get_db),
        current_user: User = Depends(deps.get_current_active_superuser),
):
    db_user = crud_users.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user = crud_users.delete_user(db, user_id)
    return db_user


@router.get("/{user_id}/rewards", response_model=list[Reward])
async def get_user_rewards(user_id: int, db: Session = Depends(deps.get_db)):
    db_user = crud_users.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user.rewards


@router.patch("/{user_id}", response_model=User)
async def update_user(
        user_id: int,
        user: User,
        db: Session = Depends(deps.get_db),
        current_user: UserModel = Depends(deps.get_current_active_superuser),
):
    db_user = crud_users.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud_users.update_user(db, existing_user=db_user, object_user=user)


@router.put("/me", response_model=User)
async def update_user_me(
        db: Session = Depends(deps.get_db),
        username: str = Body(None),
        email: EmailStr = Body(None),
        current_user: UserModel = Depends(deps.get_current_active_user),
):
    current_user_data = jsonable_encoder(current_user)
    user_in = UserInDB(**current_user_data)
    if username is not None:
        user_in.username = username
    if email is not None:
        user_in.email = email
    user = crud_users.update_user(db, existing_user=current_user, object_user=user_in)
    return user
