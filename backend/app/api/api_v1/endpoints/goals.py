from fastapi import APIRouter, Depends, HTTPException, Body, Response, UploadFile
from sqlalchemy import and_

from app.api import deps
from sqlalchemy.orm import Session

from app.models import Requirement
from app.schemas.goal import GoalCreate
from app.models.goal import Goal

router = APIRouter()


@router.get("/")
async def read_goals(
        skip: int = 0,
        limit: int = 10,
        db: Session = Depends(deps.get_db)
):
    goals = db.query(Goal).offset(skip).limit(limit).all()
    return goals


@router.post("/")
async def create_goal(
        goal: GoalCreate,
        db: Session = Depends(deps.get_db),
):
    db_goal = Goal(
        name=goal.name,
        description=goal.description
    )
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal


@router.get("/status/{goal_id}")
async def get_status(
        goal_id: int,
        db: Session = Depends(deps.get_db)
):
    if db.query(Requirement).filter(Requirement.goalId == goal_id).first() is None:
        return False
    goals = db.query(Requirement).filter(and_(Requirement.goalId == goal_id, Requirement.objectId == None)).first()
    if goals is None:
        return True
    return False
