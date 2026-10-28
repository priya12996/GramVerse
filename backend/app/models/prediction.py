from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from app.config.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    prediction_type = Column(String(100), nullable=False)

    result = Column(String(255), nullable=False)

    confidence = Column(Float, nullable=True)

    input_data = Column(Text, nullable=True)

    location = Column(String(255), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )