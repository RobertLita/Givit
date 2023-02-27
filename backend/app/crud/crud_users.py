from sqlalchemy.orm import Session
from app.schemas.user import UserCreate
from app.models.user import User
from app.core.security import get_password_hash, verify_password


def get_user(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()


def get_by_email(db: Session, email: str) -> User:
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> [User]:
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate) -> User:
    db_user = User(username=user.username, email=user.email, hashed_password=get_password_hash(user.password), type=user.type, is_superuser=user.is_superuser)
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


def increment_donation(db: Session, user_id: int) -> User:
    db_user = get_user(db, user_id)
    setattr(db_user, "donationCount", db_user.donationCount + 1)
    db.commit()
    return db_user


def add_review_to_user(db: Session, user_id: int, rating_amount: int) -> User:
    db_user = get_user(db, user_id)
    new_rating = round((db_user.rating * db_user.reviewCount + rating_amount) / (db_user.reviewCount + 1), 2)
    setattr(db_user, "reviewCount", db_user.reviewCount + 1)
    setattr(db_user, "rating", new_rating)
    db.commit()
    return db_user


def authenticate(db: Session, email: str, password: str) -> User | None:
    user = get_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def is_active(user: User) -> bool:
    return user.is_active


def is_superuser(user: User) -> bool:
    return user.is_superuser
