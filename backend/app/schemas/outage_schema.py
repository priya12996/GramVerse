from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class OutageBase(BaseModel):
    area: str
    description: Optional[str] = None


class OutageCreate(OutageBase):
    reported_by: Optional[int] = None


class OutageResponse(OutageBase):
    id: int
    status: str
    reported_by: Optional[int] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class OutageStatusUpdate(BaseModel):
    status: str