from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schemas.water_schema import WaterRequest, WaterPredictionResponse
from app.services.water_service import predict_water
from app.services.prediction_service import save_prediction, get_predictions

router = APIRouter(prefix="/water", tags=["Water Prediction"])


@router.post("/predict", response_model=WaterPredictionResponse)
def water_predict(data: WaterRequest, db: Session = Depends(get_db)):
    prediction = predict_water(data.rainfall_mm, data.current_level_percent, data.population)

    save_prediction(
        prediction_type="water",
        result=prediction["result"],
        confidence=prediction["confidence"],
        input_data=data.dict(),
        location=data.location,
        db=db,
    )

    return prediction


@router.get("/history")
def water_history(db: Session = Depends(get_db)):
    return get_predictions("water", db)