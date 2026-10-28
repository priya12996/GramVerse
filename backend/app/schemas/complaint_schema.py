from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ComplaintBase(BaseModel):
    title: str
    description: str
    category: str
    location: Optional[str] = None


class ComplaintCreate(ComplaintBase):
    user_id: Optional[int] = None


class ComplaintResponse(ComplaintBase):
    id: int
    status: str
    user_id: Optional[int] = None
    created_at: Optional[datetime] = None

    # ==========================================
    # AI ANALYSIS
    # ==========================================

    priority: Optional[str] = None

    severity: Optional[int] = None

    suggested_action: Optional[str] = None

    ai_reason: Optional[str] = None

    class Config:
        from_attributes = True