import os

# Application settings
APP_NAME = "GramVerse"
APP_VERSION = "1.0.0"
DEBUG = True

# Database
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./gramverse.db"
)

# API settings
API_PREFIX = "/api"

# CORS settings
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]