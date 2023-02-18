from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_users
from app.schemas.user import UserCreate

router = APIRouter()


@router.get("/")
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)):
    users = crud_users.get_users(db, skip, limit)
    return users


@router.post("/")
async def create_user(user: UserCreate, db: Session = Depends(deps.get_db)):
    db_user = crud_users.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_users.create_user(db=db, user=user)
