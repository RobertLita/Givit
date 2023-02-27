from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.schemas.token import Token
from app.api import deps
from typing import Any
from app.crud import crud_users
from app.core.config import settings
from app.core import security
from datetime import timedelta
from app.schemas.user import User as UserSchema
from app.models.user import User as UserModel

router = APIRouter()


@router.post("/login/access-token", response_model=Token)
async def login_access_token(db: Session = Depends(deps.get_db),
                             form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = crud_users.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not crud_users.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/login/test-token", response_model=UserSchema)
def test_token(current_user: UserModel = Depends(deps.get_current_user)) -> Any:
    return current_user

# TODO reset password & recover password
