
from datetime import datetime, timedelta, timezone
import secrets

from sqlalchemy.orm import Session

from app.models.user import User
from app.services.security import hash_password, verify_password
from app.services.email_service import send_otp_email


def generate_otp():
    return f"{secrets.randbelow(1000000):06d}"


async def register_user(data, db: Session):
    # Check whether email already exists
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        return {
            "status": "error",
            "message": "Email already registered"
        }

    # Generate 6-digit OTP
    otp = generate_otp()

    # OTP valid for 10 minutes
    otp_expiry = datetime.now(timezone.utc) + timedelta(minutes=10)

    # Create new user
    new_user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role=data.role,
        is_active=True,
        otp=otp,
        otp_expiry=otp_expiry.isoformat(),
        is_verified=False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send OTP email
    try:
        await send_otp_email(
            recipient_email=new_user.email,
            otp=otp
        )
    except Exception as e:
        # Remove user if email could not be sent
        db.delete(new_user)
        db.commit()

        return {
            "status": "error",
            "message": "Registration failed because OTP email could not be sent"
        }

    return {
        "status": "success",
        "message": "Registration successful. OTP sent to your email.",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role,
            "is_verified": new_user.is_verified
        }
    }


def login_user(data, db: Session):
    # Find user by email
    user = db.query(User).filter(User.email == data.email).first()

    # Check user and hashed password
    if not user or not verify_password(data.password, user.password):
        return {
            "status": "error",
            "message": "Invalid email or password"
        }

    # New users must verify their email first
    if not user.is_verified:
        return {
            "status": "error",
            "message": "Please verify your email using OTP before logging in"
        }

    return {
        "status": "success",
        "message": "Login Successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }


def verify_user_otp(email: str, otp: str, db: Session):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {
            "status": "error",
            "message": "User not found"
        }

    if user.is_verified:
        return {
            "status": "success",
            "message": "Email already verified"
        }

    if not user.otp or not user.otp_expiry:
        return {
            "status": "error",
            "message": "No OTP found. Please request a new OTP."
        }

    # Convert stored expiry back to datetime
    otp_expiry = datetime.fromisoformat(user.otp_expiry)

    # Check OTP expiry
    if datetime.now(timezone.utc) > otp_expiry:
        return {
            "status": "error",
            "message": "OTP has expired. Please request a new OTP."
        }

    # Check OTP
    if otp != user.otp:
        return {
            "status": "error",
            "message": "Invalid OTP"
        }

    # Verify user
    user.is_verified = True
    user.otp = None
    user.otp_expiry = None

    db.commit()
    db.refresh(user)

    return {
        "status": "success",
        "message": "Email verified successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_verified": user.is_verified
        }
    }
