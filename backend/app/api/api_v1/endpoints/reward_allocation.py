from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_reward_allocation
from app.schemas.reward_allocation import RewardAllocation, RewardAllocationCreate


router = APIRouter()


@router.get("/", response_model=list[RewardAllocation])
async def read_allocations(skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)):
    allocations = crud_reward_allocation.get_allocations(db, skip, limit)
    return allocations


@router.post("/", response_model=RewardAllocation)
async def create_allocation(allocation: RewardAllocationCreate, db: Session = Depends(deps.get_db)):
    return crud_reward_allocation.create_allocation(db, allocation)


@router.get("/{allocation_id}", response_model=RewardAllocation)
async def read_allocation(allocation_id: int, db: Session = Depends(deps.get_db)):
    db_allocation = crud_reward_allocation.get_allocation(db, allocation_id)
    if db_allocation is None:
        raise HTTPException(status_code=404, detail="Reward allocation was not found")
    return db_allocation


@router.delete("/{allocation_id}", response_model=RewardAllocation)
async def delete_allocation(allocation_id: int, db: Session = Depends(deps.get_db)):
    db_allocation = crud_reward_allocation.get_allocation(db, allocation_id)
    if db_allocation is None:
        raise HTTPException(status_code=404, detail="Reward allocation was not found")
    db_allocation = crud_reward_allocation.delete_allocation(db, allocation_id)
    return db_allocation


@router.patch("/{allocation_id}", response_model=RewardAllocation)
async def update_allocation(allocation_id: int, allocation: RewardAllocation, db: Session = Depends(deps.get_db)):
    db_allocation = crud_reward_allocation.get_allocation(db, allocation_id)
    if db_allocation is None:
        raise HTTPException(status_code=404, detail="Reward allocation was not found")
    return crud_reward_allocation.update_allocation(db, existing_allocation=db_allocation, allocation_body=allocation)
