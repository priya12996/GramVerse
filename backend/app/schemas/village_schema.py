
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class VillageBase(BaseModel):
    name: str
    district: str
    state: str

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    population: Optional[int] = None
    area: Optional[float] = None


class VillageCreate(VillageBase):
    pass


class VillageResponse(VillageBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

