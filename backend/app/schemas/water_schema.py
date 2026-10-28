from pydantic import BaseModel
from typing import Optional


class WaterRequest(BaseModel):
    rainfall_mm: float
    current_level_percent: float
    population: Optional[int] = None
    location: Optional[str] = None


class WaterPredictionResponse(BaseModel):
    projected_level: float
    risk: str
    note: str
    confidence: float
    result: str