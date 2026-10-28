from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schemas.outage_schema import OutageCreate, OutageResponse, OutageStatusUpdate
from app.services.electricity_service import report_outage, get_outages, update_outage_status

router = APIRouter(prefix="/electricity", tags=["Electricity"])


@router.post("/outages", response_model=OutageResponse)
def create_outage(data: OutageCreate, db: Session = Depends(get_db)):
    return report_outage(data, db)


@router.get("/outages", response_model=list[OutageResponse])
def list_outages(db: Session = Depends(get_db)):
    return get_outages(db)


@router.patch("/outages/{outage_id}", response_model=OutageResponse)
def change_status(outage_id: int, data: OutageStatusUpdate, db: Session = Depends(get_db)):
    outage = update_outage_status(outage_id, data.status, db)
    if not outage:
        raise HTTPException(status_code=404, detail="Outage not found")
    return outage