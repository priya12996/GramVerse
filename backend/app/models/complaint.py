from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.config.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)

    category = Column(String(100), nullable=False)
    status = Column(String(50), default="pending")

    location = Column(String(255), nullable=True)

    user_id = Column(Integer, nullable=True)

    # ==========================================
    # AI ANALYSIS FIELDS
    # ==========================================

    priority = Column(String(20), nullable=True)

    severity = Column(Integer, nullable=True)

    suggested_action = Column(Text, nullable=True)

    ai_reason = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )