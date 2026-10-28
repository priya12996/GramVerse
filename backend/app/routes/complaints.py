from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.complaint_schema import (
    ComplaintCreate,
    ComplaintResponse
)

from app.models.complaint import Complaint

from app.services.complaint_ai import analyze_complaint


router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)


# ==========================================
# CREATE COMPLAINT
# ==========================================

@router.post("/", response_model=ComplaintResponse)
def create_complaint(
    data: ComplaintCreate,
    db: Session = Depends(get_db)
):

    # ==========================================
    # AI COMPLAINT ANALYSIS
    # ==========================================

    ai_result = analyze_complaint(
        title=data.title,
        description=data.description,
        category=data.category
    )

    # ==========================================
    # CREATE COMPLAINT
    # ==========================================

    complaint = Complaint(
        title=data.title,
        description=data.description,
        category=data.category,
        location=data.location,
        user_id=data.user_id,

        # AI fields
        priority=ai_result["priority"],
        severity=ai_result["severity"],
        suggested_action=ai_result["suggested_action"],
        ai_reason=ai_result["ai_reason"]
    )

    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    return complaint


# ==========================================
# GET ALL COMPLAINTS
# ==========================================

@router.get("/", response_model=list[ComplaintResponse])
def get_complaints(
    db: Session = Depends(get_db)
):

    complaints = db.query(Complaint).all()

    return complaints


# ==========================================
# ANALYZE OLD COMPLAINTS
# ==========================================

@router.post("/analyze-existing")
def analyze_existing_complaints(
    db: Session = Depends(get_db)
):

    # Find complaints that don't have AI analysis yet
    complaints = db.query(Complaint).filter(
        Complaint.priority.is_(None)
    ).all()

    updated_complaints = []

    for complaint in complaints:

        # Run AI analysis
        ai_result = analyze_complaint(
            title=complaint.title,
            description=complaint.description,
            category=complaint.category
        )

        # Update AI fields
        complaint.priority = ai_result["priority"]
        complaint.severity = ai_result["severity"]
        complaint.suggested_action = ai_result["suggested_action"]
        complaint.ai_reason = ai_result["ai_reason"]

        updated_complaints.append({
            "id": complaint.id,
            "title": complaint.title,
            "priority": complaint.priority,
            "severity": complaint.severity,
            "suggested_action": complaint.suggested_action,
            "ai_reason": complaint.ai_reason
        })

    # Save all changes
    db.commit()

    return {
        "message": "Existing complaints analyzed successfully",
        "updated_count": len(updated_complaints),
        "complaints": updated_complaints
    }
