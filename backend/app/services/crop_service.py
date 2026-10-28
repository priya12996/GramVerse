# Simple rule-based crop advisory engine.
# Keeps the feature fully offline and dependency-free; swap this out
# for a trained ML model later without touching the route layer.

CROP_RULES = {
    ("loamy", "kharif"): (["Rice", "Maize", "Soybean"], "low"),
    ("loamy", "rabi"): (["Wheat", "Mustard", "Gram"], "low"),
    ("sandy", "kharif"): (["Bajra", "Groundnut"], "medium"),
    ("sandy", "rabi"): (["Barley", "Mustard"], "medium"),
    ("clay", "kharif"): (["Rice", "Jute"], "low"),
    ("clay", "rabi"): (["Wheat", "Peas"], "medium"),
    ("black", "kharif"): (["Cotton", "Soybean"], "low"),
    ("black", "rabi"): (["Wheat", "Gram", "Sunflower"], "low"),
}


def predict_crop(soil_type: str, season: str, rainfall_mm: float):
    key = (soil_type.strip().lower(), season.strip().lower())
    crops, risk = CROP_RULES.get(key, (["Millets", "Pulses"], "medium"))

    if rainfall_mm < 50:
        risk = "high"
        note = "Low rainfall detected — consider drought-resistant crops and irrigation planning."
    elif rainfall_mm > 300:
        risk = "high"
        note = "Excess rainfall risk — ensure proper drainage to avoid waterlogging."
    else:
        note = "Rainfall levels look suitable for the recommended crops."

    confidence = 0.7 if key in CROP_RULES else 0.4
    result = f"Recommended crops: {', '.join(crops)} (Risk: {risk})"

    return {
        "crops": crops,
        "risk": risk,
        "note": note,
        "confidence": confidence,
        "result": result,
    }