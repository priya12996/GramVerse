from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class InfrastructureBase(BaseModel):
    village_id: int

    type: str
    name: str

    latitude: float
    longitude: float

    status: Optional[str] = None
    risk_score: Optional[float] = None
    description: Optional[str] = None


class InfrastructureCreate(InfrastructureBase):
    pass


class InfrastructureResponse(InfrastructureBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True