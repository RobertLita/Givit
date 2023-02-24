from sqlalchemy.orm import Session
from app.schemas.user import UserCreate
from app.models.user import User


def get_user(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> User:
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> [User]:
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate) -> User:
    # TODO big todo: handle security or use a third party
    dummyPassword = user.password + "notreallyhashed"
    db_user = User(username=user.username, email=user.email, hashed_password=dummyPassword, type=user.type, rating=user.rating, donationCount=user.donationCount)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int) -> User:
    db_user = db.query(User).filter(User.id == user_id).first()
    db.delete(db_user)
    db.commit()
    return db_user


def update_user(db: Session, existing_user: User, object_user: User) -> User:
    update_data = object_user.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(existing_user, key, value)
    db.commit()
    return existing_user
