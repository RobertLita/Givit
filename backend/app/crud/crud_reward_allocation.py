from sqlalchemy.orm import Session
from app.schemas.reward_allocation import RewardAllocationCreate
from app.models.reward_allocation import RewardAllocation


def get_allocation(db: Session, allocation_id: int) -> RewardAllocation:
    return (
        db.query(RewardAllocation).filter(RewardAllocation.id == allocation_id).first()
    )


def get_allocations(db: Session, skip: int = 0, limit: int = 100) -> [RewardAllocation]:
    return db.query(RewardAllocation).offset(skip).limit(limit).all()


def create_allocation(
    db: Session, allocation: RewardAllocationCreate
) -> RewardAllocation:
    db_allocation = RewardAllocation(
        userId=allocation.userId, rewardId=allocation.rewardId
    )
    db.add(db_allocation)
    db.commit()
    db.refresh(db_allocation)
    return db_allocation


def delete_allocation(db: Session, allocation_id: int) -> RewardAllocation:
    db_allocation = (
        db.query(RewardAllocation).filter(RewardAllocation.id == allocation_id).first()
    )
    db.delete(db_allocation)
    db.commit()
    return db_allocation


def update_allocation(
    db: Session,
    existing_allocation: RewardAllocation,
    allocation_body: RewardAllocation,
) -> RewardAllocation:
    update_data = allocation_body.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(existing_allocation, key, value)
    db.commit()
    return existing_allocation
