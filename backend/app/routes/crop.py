from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schemas.crop_schema import CropRequest, CropPredictionResponse
from app.services.crop_service import predict_crop
from app.services.prediction_service import save_prediction, get_predictions

router = APIRouter(prefix="/crop", tags=["Crop Health"])


@router.post("/predict", response_model=CropPredictionResponse)
def crop_predict(data: CropRequest, db: Session = Depends(get_db)):
    prediction = predict_crop(data.soil_type, data.season, data.rainfall_mm)

    save_prediction(
        prediction_type="crop",
        result=prediction["result"],
        confidence=prediction["confidence"],
        input_data=data.dict(),
        location=data.location,
        db=db,
    )

    return prediction


@router.get("/history")
def crop_history(db: Session = Depends(get_db)):
    return get_predictions("crop", db)