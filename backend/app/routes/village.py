# python -c "import sqlite3; conn=sqlite3.connect('gramverse.db'); conn.execute('ALTER TABLE villages ADD COLUMN created_at DATETIME'); conn.execute('UPDATE villages SET created_at=CURRENT_TIMESTAMP WHERE created_at IS NULL'); conn.commit(); conn.close()"
from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.village_schema import VillageCreate, VillageResponse

from app.services.village_service import (
    create_village,
    get_villages,
    get_village,
    update_village,
    delete_village
)

router = APIRouter(prefix="/villages", tags=["Villages"])


@router.post("/", response_model=VillageResponse)
def add_village(
    data: VillageCreate,
    db: Session = Depends(get_db)
):
    return create_village(data, db)


@router.get("/", response_model=list[VillageResponse])
def list_villages(
    db: Session = Depends(get_db)
):
    return get_villages(db)


@router.get("/{village_id}", response_model=VillageResponse)
def retrieve_village(
    village_id: int,
    db: Session = Depends(get_db)
):
    village = get_village(village_id, db)

    if not village:
        raise HTTPException(
            status_code=404,
            
            detail="Village not found"
        )

    return village


@router.put("/{village_id}", response_model=VillageResponse)
def edit_village(
    village_id: int,
    data: VillageCreate,
    db: Session = Depends(get_db)
):
    village = update_village(village_id, data, db)

    if not village:
        raise HTTPException(
            status_code=404,
            detail="Village not found"
        )

    return village


@router.delete("/{village_id}")
def remove_village(
    village_id: int,
    db: Session = Depends(get_db)
):
    village = delete_village(village_id, db)

    if not village:
        raise HTTPException(
            status_code=404,
            detail="Village not found"
        )

    return {
        "status": "success",
        "message": "Village deleted"
    }

