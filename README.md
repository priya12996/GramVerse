# GramVerse — Rural Development Dashboard

GramVerse is a React + Vite frontend with a FastAPI + SQLAlchemy backend for village services, complaints, water prediction, crop health, electricity, infrastructure, and analytics.

## What's been added
- **Community Hub** (`/community`): a dedicated community landing page with quick links to existing modules.
- **Village updates**: sample health, agriculture, and community notices (clearly labelled as sample content).
- **Community task board**: add tasks, choose a category, filter open/completed tasks, and mark tasks done. Tasks are saved in the current browser's local storage on that device; they are not synced between users.
- **Dashboard integration**: the Community Hub is linked from the dashboard navigation and module cards.
- **Setup improvements**: backend dependencies and a safe `.env.example` template are included.

## Requirements
- Node.js 20.19+ or 22.12+ recommended for the current Vite version
- Python 3.10+
- A terminal (PowerShell on Windows is fine)

## Run on Windows

### 1. Start the backend
Open PowerShell:

```powershell
cd gramverse\backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
python -m uvicorn app.main:app --reload
```

Backend health check: http://127.0.0.1:8000/health  
Interactive API docs: http://127.0.0.1:8000/docs

**Email OTP:** registration uses SMTP to send verification codes. Put your own valid SMTP settings in `backend/.env`. If SMTP is not configured, email verification may fail; do not use someone else's credentials.

### 2. Start the frontend
Open a second PowerShell window:

```powershell
cd gramverse\frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

### 3. Build the frontend for production

```powershell
cd gramverse\frontend
npm install
npm run build
npm run preview
```

## Important notes
- This project uses a local SQLite database by default. On first backend start, SQLAlchemy creates tables automatically. A previous local database was intentionally not bundled to avoid sharing private/demo records; create a fresh database by starting the backend.
- `.env` secrets and `node_modules` are not included in this ZIP. Install dependencies with `npm install` and configure your own `.env`.
- The new community task board is browser-local demo functionality, not a cloud-synced or multi-user task system.
- Sample announcements are demonstration content. Verify dates and details before using them for a real village.
- Before public deployment, review authentication/session handling, authorization, input validation, CORS, database migrations, and secret management.

## Main modules
- Dashboard and profile
- Complaints
- Village map
- Water prediction
- Crop health
- Electricity monitoring
- Analytics
- Infrastructure management
- Community Hub (new)
