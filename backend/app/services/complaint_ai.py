import re


# High urgency indicators
HIGH_URGENCY_KEYWORDS = {
    "emergency",
    "dangerous",
    "accident",
    "fire",
    "collapse",
    "collapsed",
    "flood",
    "flooding",
    "electrocution",
    "electric shock",
    "no water",
    "no electricity",
    "contaminated water",
    "unsafe",
    "life threatening",
    "life-threatening",
    "hospital",
    "school children",
    "children",
    "severe",
    "huge pothole",
    "broken electric pole",
}

# Medium urgency indicators
MEDIUM_URGENCY_KEYWORDS = {
    "broken",
    "damaged",
    "damage",
    "leak",
    "leaking",
    "blocked",
    "shortage",
    "pothole",
    "crack",
    "cracked",
    "frequent",
    "overflow",
    "dirty",
    "problem",
    "failure",
    "not working",
}


def normalize_text(text: str) -> str:
    """
    Converts complaint text into a normalized format.
    """
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def find_matches(text: str, keywords: set[str]) -> list[str]:
    """
    Returns keywords found in the complaint text.
    """
    return [
        keyword
        for keyword in keywords
        if keyword in text
    ]


def calculate_severity(
    high_matches: list[str],
    medium_matches: list[str],
    category: str
) -> int:

    score = 1

    # High urgency indicators
    score += min(len(high_matches) * 3, 6)

    # Medium urgency indicators
    score += min(len(medium_matches) * 1, 3)

    # Category-based importance
    category = category.lower()

    if category == "electricity":
        score += 1

    elif category == "water":
        score += 1

    elif category == "road":
        score += 1

    return min(score, 10)


def get_priority(severity: int) -> str:

    if severity >= 7:
        return "HIGH"

    if severity >= 4:
        return "MEDIUM"

    return "LOW"


def get_suggested_action(
    category: str,
    priority: str,
    severity: int
) -> str:

    category = category.lower()

    if category == "road":
        if priority == "HIGH":
            return "Immediate road inspection and repair required."
        elif priority == "MEDIUM":
            return "Schedule road inspection and repair."
        return "Add the road issue to the routine maintenance list."

    if category == "water":
        if priority == "HIGH":
            return "Immediate water supply inspection and restoration required."
        elif priority == "MEDIUM":
            return "Inspect the water source and schedule corrective action."
        return "Monitor the water issue during routine maintenance."

    if category == "electricity":
        if priority == "HIGH":
            return "Immediate electrical safety inspection is required."
        elif priority == "MEDIUM":
            return "Schedule an electrical inspection and repair."
        return "Add the electrical issue to routine maintenance."

    if category == "sanitation":
        if priority == "HIGH":
            return "Immediate sanitation inspection and cleaning required."
        elif priority == "MEDIUM":
            return "Schedule sanitation inspection and corrective action."
        return "Add the sanitation issue to routine maintenance."

    if priority == "HIGH":
        return "Immediate field inspection and corrective action required."

    if priority == "MEDIUM":
        return "Schedule a field inspection and corrective action."

    return "Review the complaint during routine monitoring."


def generate_reason(
    high_matches: list[str],
    medium_matches: list[str],
    category: str,
    priority: str,
    severity: int
) -> str:

    indicators = high_matches + medium_matches

    if indicators:
        indicator_text = ", ".join(indicators[:3])
        return (
            f"The complaint was classified as {priority} priority "
            f"with severity {severity}/10 because it contains "
            f"risk indicators such as: {indicator_text}."
        )

    return (
        f"The complaint was classified as {priority} priority "
        f"with severity {severity}/10 based on its category "
        f"({category}) and reported issue."
    )


def analyze_complaint(
    title: str,
    description: str,
    category: str
) -> dict:

    title = normalize_text(title)
    description = normalize_text(description)
    category = normalize_text(category)

    combined_text = f"{title} {description}"

    high_matches = find_matches(
        combined_text,
        HIGH_URGENCY_KEYWORDS
    )

    medium_matches = find_matches(
        combined_text,
        MEDIUM_URGENCY_KEYWORDS
    )

    severity = calculate_severity(
        high_matches,
        medium_matches,
        category
    )

    priority = get_priority(severity)

    suggested_action = get_suggested_action(
        category,
        priority,
        severity
    )

    reason = generate_reason(
        high_matches,
        medium_matches,
        category,
        priority,
        severity
    )

    return {
        "priority": priority,
        "severity": severity,
        "suggested_action": suggested_action,
        "ai_reason": reason,
    }