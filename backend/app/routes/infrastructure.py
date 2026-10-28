from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.infrastructure_schema import (
    InfrastructureCreate,
    InfrastructureResponse,
)

from app.services.infrastructure_service import (
    create_infrastructure,
    get_infrastructures,
    get_infrastructure,
    get_village_infrastructures,
    update_infrastructure,
    delete_infrastructure,
)


router = APIRouter(
    prefix="/infrastructure",
    tags=["Infrastructure"]
)


# ==================================================
# CREATE INFRASTRUCTURE
# ==================================================

@router.post(
    "/",
    response_model=InfrastructureResponse
)
def add_infrastructure(
    data: InfrastructureCreate,
    db: Session = Depends(get_db)
):
    return create_infrastructure(data, db)


# ==================================================
# GET ALL INFRASTRUCTURE
# ==================================================

@router.get(
    "/",
    response_model=list[InfrastructureResponse]
)
def list_infrastructure(
    db: Session = Depends(get_db)
):
    return get_infrastructures(db)


# ==================================================
# GET INFRASTRUCTURE BY VILLAGE
# ==================================================

@router.get(
    "/village/{village_id}",
    response_model=list[InfrastructureResponse]
)
def list_village_infrastructure(
    village_id: int,
    db: Session = Depends(get_db)
):
    return get_village_infrastructures(
        village_id,
        db
    )


# ==================================================
# GET SINGLE INFRASTRUCTURE
# ==================================================

@router.get(
    "/{infrastructure_id}",
    response_model=InfrastructureResponse
)
def retrieve_infrastructure(
    infrastructure_id: int,
    db: Session = Depends(get_db)
):
    infrastructure = get_infrastructure(
        infrastructure_id,
        db
    )

    if not infrastructure:
        raise HTTPException(
            status_code=404,
            detail="Infrastructure not found"
        )

    return infrastructure


# ==================================================
# UPDATE INFRASTRUCTURE
# ==================================================

@router.put(
    "/{infrastructure_id}",
    response_model=InfrastructureResponse
)
def edit_infrastructure(
    infrastructure_id: int,
    data: InfrastructureCreate,
    db: Session = Depends(get_db)
):
    infrastructure = update_infrastructure(
        infrastructure_id,
        data,
        db
    )

    if not infrastructure:
        raise HTTPException(
            status_code=404,
            detail="Infrastructure not found"
        )

    return infrastructure


# ==================================================
# DELETE INFRASTRUCTURE
# ==================================================

@router.delete("/{infrastructure_id}")
def remove_infrastructure(
    infrastructure_id: int,
    db: Session = Depends(get_db)
):
    infrastructure = delete_infrastructure(
        infrastructure_id,
        db
    )

    if not infrastructure:
        raise HTTPException(
            status_code=404,
            detail="Infrastructure not found"
        )

    return {
        "status": "success",
        "message": "Infrastructure deleted"
    }