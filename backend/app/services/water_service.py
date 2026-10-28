# Simple rule-based water-shortage projection.
# Combines rainfall input with a rough per-capita demand factor.

def predict_water(rainfall_mm: float, current_level_percent: float, population: int = None):
    demand_factor = (population / 1000) if population else 1
    projected_level = current_level_percent + (rainfall_mm / 50) - (demand_factor * 2)
    projected_level = max(0, min(100, projected_level))

    if projected_level < 30:
        risk = "high"
        note = "Water shortage risk in the coming weeks. Consider rationing and alternate sources."
    elif projected_level < 60:
        risk = "medium"
        note = "Water levels are moderate. Monitor closely."
    else:
        risk = "low"
        note = "Water levels look healthy."

    confidence = 0.65
    result = f"Projected water level: {round(projected_level, 1)}% (Risk: {risk})"

    return {
        "projected_level": round(projected_level, 1),
        "risk": risk,
        "note": note,
        "confidence": confidence,
        "result": result,
    }