from fastapi import APIRouter, Depends
from app.api import deps
from sqlalchemy.orm import Session
from app.schemas.requirement import RequirementCreate
from app.models.requirement import Requirement

router = APIRouter()


@router.get("/")
async def read_requirement(
        goalId: int,
        skip: int = 0,
        limit: int = 10,
        db: Session = Depends(deps.get_db)
):
    requirements = db.query(Requirement).filter(Requirement.goalId == goalId).offset(skip).limit(limit).all()
    return requirements


@router.post("/")
async def create_requirement(
        requirement: RequirementCreate,
        db: Session = Depends(deps.get_db),
):
    db_requirement = Requirement(
        name=requirement.name,
        description=requirement.description,
        goalId=requirement.goalId
    )
    db.add(db_requirement)
    db.commit()
    db.refresh(db_requirement)
    return db_requirement

