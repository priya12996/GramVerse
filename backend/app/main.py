from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import Base, engine

# Import models so SQLAlchemy knows about all tables

from app.models import (
    user,
    village,
    complaint,
    prediction,
    outage,
    infrastructure
)

from app.routes import (
    auth,
    complaints,
    village as village_routes,
    crop,
    water,
    electricity,
    analytics,
    infrastructure
)
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="GramVerse API",
    description="AI Powered Digital Twin for Rural Development",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(complaints.router)
app.include_router(village_routes.router)
app.include_router(crop.router)
app.include_router(water.router)
app.include_router(electricity.router)
app.include_router(analytics.router)
app.include_router(infrastructure.router)

@app.get("/")
def home():
    return {
        "message": "GramVerse Backend Running",
        "status": "success"
    }
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "GramVerse API"
    }