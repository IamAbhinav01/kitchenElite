from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from io import BytesIO
from PIL import Image

from models.foodNutritionLLM import FoodNutritionVisionLLM

# Create model instance once
nutrition_model = FoodNutritionVisionLLM()
@csrf_exempt
def scan_food_image(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    if "image" not in request.FILES:
        return JsonResponse({"error": "No image uploaded"}, status=400)

    try:
        image_file = request.FILES["image"]

        img = Image.open(image_file)

        buffer = BytesIO()
        img.save(buffer, format="JPEG")
        image_bytes = buffer.getvalue()

        result = nutrition_model.analyze_food_image(image_bytes)

        return JsonResponse(result, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
