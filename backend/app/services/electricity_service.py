from sqlalchemy.orm import Session
from app.models.outage import Outage


def report_outage(data, db: Session):
    outage = Outage(
        area=data.area,
        description=data.description,
        reported_by=data.reported_by,
    )
    db.add(outage)
    db.commit()
    db.refresh(outage)
    return outage


def get_outages(db: Session):
    return db.query(Outage).order_by(Outage.created_at.desc()).all()


def update_outage_status(outage_id: int, status: str, db: Session):
    outage = db.query(Outage).filter(Outage.id == outage_id).first()
    if outage:
        outage.status = status
        db.commit()
        db.refresh(outage)
    return outage