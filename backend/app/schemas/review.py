from pydantic import BaseModel, validator


class ReviewBase(BaseModel):
    reviewerId: int
    reviewedId: int
    amount: int
    message: str | None

    @validator("amount")
    def valid_amount(cls, amount):
        if amount < 1 or amount > 5:
            raise ValueError('Amount must be between 1 and 5')
        return amount


class ReviewCreate(ReviewBase):
    pass


class Review(ReviewBase):
    id: int

    class Config:
        orm_mode = True
