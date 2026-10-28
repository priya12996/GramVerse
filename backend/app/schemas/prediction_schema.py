from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PredictionBase(BaseModel):
    prediction_type: str
    result: str
    confidence: Optional[float] = None
    input_data: Optional[str] = None
    location: Optional[str] = None


class PredictionCreate(PredictionBase):
    pass


class PredictionResponse(PredictionBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True