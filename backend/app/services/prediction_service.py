import json
from sqlalchemy.orm import Session
from app.models.prediction import Prediction


def save_prediction(prediction_type: str, result: str, confidence, input_data: dict, location, db: Session):
    prediction = Prediction(
        prediction_type=prediction_type,
        result=result,
        confidence=confidence,
        input_data=json.dumps(input_data) if input_data else None,
        location=location,
    )
    db.add(prediction)
    db.commit()
    db.refresh(prediction)
    return prediction


def get_predictions(prediction_type: str, db: Session):
    query = db.query(Prediction)
    if prediction_type:
        query = query.filter(Prediction.prediction_type == prediction_type)
    return query.order_by(Prediction.created_at.desc()).all()