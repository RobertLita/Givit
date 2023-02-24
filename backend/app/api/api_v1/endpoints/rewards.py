from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from sqlalchemy.orm import Session
from ....crud import crud_rewards
from app.schemas.reward import RewardCreate, Reward

router = APIRouter()


@router.get("/", response_model=list[Reward])
async def read_rewards(skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)):
    rewards = crud_rewards.get_rewards(db, skip, limit)
    return rewards


@router.post("/", response_model=Reward)
async def create_reward(reward: RewardCreate, db: Session = Depends(deps.get_db)):
    return crud_rewards.create_reward(db, reward)


@router.get("/{reward_id}", response_model=Reward)
async def get_reward(reward_id: int, db: Session = Depends(deps.get_db)):
    db_reward = crud_rewards.get_reward(db, reward_id)
    if db_reward is None:
        raise HTTPException(status_code=404, detail=f'Reward was not found')
    return db_reward


@router.delete("/{reward_id}", response_model=Reward)
async def delete_reward(reward_id: int, db: Session = Depends(deps.get_db)):
    db_reward = crud_rewards.get_reward(db, reward_id)
    if db_reward is None:
        raise HTTPException(status_code=404, detail=f'Reward was not found')
    db_reward = crud_rewards.delete_reward(db, reward_id)
    return db_reward


@router.patch("/{reward_id}", response_model=Reward)
async def update_reward(reward_id: int, reward: Reward, db: Session = Depends(deps.get_db)):
    db_reward = crud_rewards.get_reward(db, reward_id)
    if db_reward is None:
        raise HTTPException(status_code=404, detail=f'Reward was not found')
    return crud_rewards.update_reward(db, existing_reward=db_reward, reward_body=reward)
