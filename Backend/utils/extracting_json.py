import json
def extract_json(text):
    """
    Extract first JSON object found in text.
    Prevents JSONDecodeError when model adds extra text.
    """
    start = text.find("{")
    end = text.rfind("}") + 1

    if start == -1 or end == -1:
        raise ValueError("No JSON found in model output")

    return json.loads(text[start:end])