import base64

def image_bytes_to_data_url(image_bytes):
    encoded = base64.b64encode(image_bytes).decode("utf-8")
    return f"data:image/jpeg;base64,{encoded}"
