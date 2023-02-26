from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_users
from app.schemas.user import UserCreate, User
from app.schemas.reward import Reward

router = APIRouter()


@router.get("/", response_model=list[User])
async def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)):
    users = crud_users.get_users(db, skip, limit)
    return users


@router.post("/", response_model=User)
async def create_user(user: UserCreate, db: Session = Depends(deps.get_db)):
    db_user = crud_users.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_users.create_user(db, user)


@router.get("/{user_id}", response_model=User)
async def read_user(user_id: int, db: Session = Depends(deps.get_db)):
    db_user = crud_users.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User was not found")
    return db_user


@router.delete("/{user_id}", response_model=User)
async def delete_user(user_id: int, db: Session = Depends(deps.get_db)):
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
async def update_user(user_id: int, user: User, db: Session = Depends(deps.get_db)):
    db_user = crud_users.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud_users.update_user(db, existing_user=db_user, object_user=user)
