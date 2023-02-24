from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_reviews
from app.schemas.review import Review, ReviewCreate

router = APIRouter()


@router.get("/", response_model=list[Review])
async def read_reviews(skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)):
    reviews = crud_reviews.get_reviews(db, skip, limit)
    return reviews


@router.post("/", response_model=Review)
async def create_review(review: ReviewCreate, db: Session = Depends(deps.get_db)):
    return crud_reviews.create_review(db, review)


@router.get("/{review_id}", response_model=Review)
async def read_review(review_id: int, db: Session = Depends(deps.get_db)):
    db_review = crud_reviews.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail=f"Review was not found")
    return db_review


@router.delete("/{review_id}", response_model=Review)
async def delete_review(review_id: int, db: Session = Depends(deps.get_db)):
    db_review = crud_reviews.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail=f"Review was not found")
    db_review = crud_reviews.delete_review(db, review_id)
    return db_review


@router.patch("/{review_id}", response_model=Review)
async def update_object(review_id: int, review: Review, db: Session = Depends(deps.get_db)):
    db_review = crud_reviews.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail=f"Review was not found")
    return crud_reviews.update_review(db, existing_review=db_review, review_body=review)
