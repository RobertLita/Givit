from sqlalchemy.orm import Session
from app.schemas.review import ReviewCreate
from app.models.review import Review


def get_review(db: Session, review_id: int) -> Review:
    return db.query(Review).filter(Review.id == review_id).first()


def get_reviews(db: Session, skip: int = 0, limit: int = 100) -> [Review]:
    return db.query(Review).offset(skip).limit(limit).all()


def get_reviewed_users(db: Session, reviewer_id: int) -> [Review.reviewedId]:
    return db.query(Review.reviewedId).filter(Review.reviewerId == reviewer_id).all()


def create_review(db: Session, review: ReviewCreate) -> Review:
    db_review = Review(reviewerId=review.reviewerId, reviewedId=review.reviewedId, amount=review.amount, message=review.message)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


def delete_review(db: Session, review_id: int) -> Review:
    db_review = db.query(Review).filter(Review.id == review_id).first()
    db.delete(db_review)
    db.commit()
    return db_review


def update_review(db: Session, existing_review: Review, review_body: Review) -> Review:
    update_data = review_body.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(existing_review, key, value)
    db.commit()
    return existing_review
