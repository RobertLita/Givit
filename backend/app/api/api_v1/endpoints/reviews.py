from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_, and_

from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_reviews
from app.models.review import Review as ReviewModel
from app.schemas.review import Review, ReviewCreate
from app.crud.crud_users import add_review_to_user

router = APIRouter()


@router.get("/", response_model=list[Review])
async def read_reviews(
        skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)
):
    reviews = crud_reviews.get_reviews(db, skip, limit)
    return reviews


@router.post("/", response_model=Review)
async def create_review(review: ReviewCreate, db: Session = Depends(deps.get_db)):
    if review.reviewedId is None or review.reviewerId is None:
        raise HTTPException(
            status_code=400, detail="Review has one or more empty fields"
        )
    reviewed_users = crud_reviews.get_reviewed_users(db, review.reviewerId)
    if any(x[0] == review.reviewedId for x in reviewed_users):
        raise HTTPException(
            status_code=409, detail="This user has already been reviewed"
        )
    new_review = crud_reviews.create_review(db, review)
    add_review_to_user(db, review.reviewedId, review.amount)
    return new_review


@router.get("/{review_id}", response_model=Review)
async def read_review(review_id: int, db: Session = Depends(deps.get_db)):
    db_review = crud_reviews.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review was not found")
    return db_review


@router.delete("/{review_id}", response_model=Review)
async def delete_review(review_id: int, db: Session = Depends(deps.get_db)):
    db_review = crud_reviews.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail=f"Review was not found")
    db_review = crud_reviews.delete_review(db, review_id)
    return db_review


@router.patch("/{review_id}", response_model=Review)
async def update_object(
        review_id: int, review: Review, db: Session = Depends(deps.get_db)
):
    db_review = crud_reviews.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail=f"Review was not found")
    return crud_reviews.update_review(db, existing_review=db_review, review_body=review)


@router.get("/{reviewer_id}/{reviewed_id}")
async def check_review(reviewer_id: int, reviewed_id: int, db: Session = Depends(deps.get_db)):
    try:
        exists_query = db.query(ReviewModel).filter(and_(ReviewModel.reviewedId == reviewed_id, ReviewModel.reviewerId == reviewer_id)).first()
        if exists_query is not None:
            return True
        return False
    except Exception as e:
        print(e)
        return False
