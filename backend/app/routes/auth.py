
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schemas.user_schema import UserCreate, UserLogin, OTPVerify

from app.services.auth_service import (
    login_user,
    register_user,
    verify_user_otp
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# Register
@router.post("/register")
async def register(
    data: UserCreate,
    db: Session = Depends(get_db)
):
    return await register_user(data, db)


# Login
@router.post("/login")
def login(
    data: UserLogin,
    db: Session = Depends(get_db)
):
    return login_user(data, db)


# Verify OTP
@router.post("/verify-otp")
def verify_otp(
    data: OTPVerify,
    db: Session = Depends(get_db)
):
    return verify_user_otp(data.email, data.otp, db)

