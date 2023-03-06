from fastapi import APIRouter, Depends, HTTPException, Body
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_users
from app.schemas.user import UserCreate, User, UserInDB
from app.schemas.reward import Reward
from app.models.user import User as UserModel
from pydantic.networks import EmailStr
from fastapi.encoders import jsonable_encoder

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
