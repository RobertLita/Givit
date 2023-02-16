from pydantic import BaseModel


class ReviewBase(BaseModel):
    reviewerId: int
    reviewedId: int
    amount: int
    message: str | None


class ReviewCreate(ReviewBase):
    pass


class Review(ReviewBase):
    id: int

    class Config:
        orm_mode = True
