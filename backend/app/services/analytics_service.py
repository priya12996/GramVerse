from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.complaint import Complaint
from app.models.village import Village
from app.models.prediction import Prediction
from app.models.outage import Outage


def get_summary(db: Session):
    total_villages = db.query(Village).count()
    total_complaints = db.query(Complaint).count()

    complaints_by_status = dict(
        db.query(Complaint.status, func.count(Complaint.id))
        .group_by(Complaint.status)
        .all()
    )

    complaints_by_category = dict(
        db.query(Complaint.category, func.count(Complaint.id))
        .group_by(Complaint.category)
        .all()
    )

    total_predictions = db.query(Prediction).count()
    predictions_by_type = dict(
        db.query(Prediction.prediction_type, func.count(Prediction.id))
        .group_by(Prediction.prediction_type)
        .all()
    )

    active_outages = db.query(Outage).filter(Outage.status != "resolved").count()

    return {
        "total_villages": total_villages,
        "total_complaints": total_complaints,
        "complaints_by_status": complaints_by_status,
        "complaints_by_category": complaints_by_category,
        "total_predictions": total_predictions,
        "predictions_by_type": predictions_by_type,
        "active_outages": active_outages,
    }