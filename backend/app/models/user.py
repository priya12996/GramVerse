
from sqlalchemy import Column, Integer, String, Boolean
from app.config.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), default="citizen")
    is_active = Column(Boolean, default=True)

    # OTP fields
    otp = Column(String(6), nullable=True)
    otp_expiry = Column(String(50), nullable=True)
    is_verified = Column(Boolean, default=False)

