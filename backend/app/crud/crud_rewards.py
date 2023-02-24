from sqlalchemy.orm import Session
from app.schemas.reward import RewardCreate
from app.models.reward import Reward


def get_rewards(db: Session, skip: int = 0, limit: int = 100) -> [Reward]:
    return db.query(Reward).offset(skip).limit(limit).all()


def get_reward(db: Session, reward_id: int) -> Reward:
    return db.query(Reward).filter(Reward.id == reward_id).first()


def create_reward(db: Session, reward_body: RewardCreate) -> Reward:
    db_reward = Reward(name=reward_body.name, description=reward_body.description, requiredDonations=reward_body.requiredDonations)
    db.add(db_reward)
    db.commit()
    db.refresh(db_reward)
    return db_reward


def delete_reward(db: Session, reward_id: int) -> Reward:
    db_reward = db.query(Reward).filter(Reward.id == reward_id).first()
    db.delete(db_reward)
    db.commit()
    return db_reward


def update_reward(db: Session, existing_reward: Reward, reward_body: Reward) -> Reward:
    update_data = reward_body.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(existing_reward, key, value)
    db.commit()
    return existing_reward
    