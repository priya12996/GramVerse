from pydantic import BaseModel
from typing import Optional, List


class CropRequest(BaseModel):
    soil_type: str
    season: str
    rainfall_mm: float
    location: Optional[str] = None


class CropPredictionResponse(BaseModel):
    crops: List[str]
    risk: str
    note: str
    confidence: float
    result: str