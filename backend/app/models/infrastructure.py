from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime

from app.config.database import Base


class Infrastructure(Base):
    __tablename__ = "infrastructure"

    id = Column(Integer, primary_key=True, index=True)

    # Village to which this infrastructure belongs
    village_id = Column(
        Integer,
        ForeignKey("villages.id"),
        nullable=False
    )

    # Infrastructure type
    # house, school, hospital, water, electricity,
    # agriculture, panchayat, complaint, etc.
    type = Column(String(50), nullable=False)

    # Display name
    name = Column(String(150), nullable=False)

    # Geographic location
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    # General status
    status = Column(String(50), nullable=True)

    # AI risk percentage, if applicable
    risk_score = Column(Float, nullable=True)

    # Additional information
    description = Column(String(500), nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )