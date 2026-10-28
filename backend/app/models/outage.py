from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.config.database import Base


class Outage(Base):
    __tablename__ = "outages"

    id = Column(Integer, primary_key=True, index=True)

    area = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)

    # reported -> in_progress -> resolved
    status = Column(String(50), default="reported")

    reported_by = Column(Integer, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )