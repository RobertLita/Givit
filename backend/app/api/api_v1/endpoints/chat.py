from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from app.crud.crud_message import get_chatters
from app.crud.crud_users import get_username
from sqlalchemy.orm import Session


router = APIRouter()


@router.get("/chatters/{user_id}")
async def get_my_chatters(user_id: int, db: Session = Depends(deps.get_db)):
    chatters = []
    chatters_ids = get_chatters(db, user_id)
    for chatter in chatters_ids:
        name = get_username(db, chatter)
        chatters.append([chatter, name[0]])
    return chatters
