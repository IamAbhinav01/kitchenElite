from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from io import BytesIO
from PIL import Image
import json
from models.foodNutritionLLM import FoodNutritionVisionLLM
from models.prepare_with_ai import generate_recipe,guide_chat,load_history,get_session_history,save_history
import uuid
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
@csrf_exempt
def prepare_ai(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        body = json.loads(request.body)

        food_text = body.get("food")
        session_id = body.get("session_id")
        if not food_text:
            return JsonResponse({"error": "Food name required"}, status=400)


        if not session_id:
            session_id = str(uuid.uuid4())

        recipe = generate_recipe(food_text)

        load_history(session_id)
        history = get_session_history(session_id)
        history.add_ai_message(f"Here is the recipe JSON:\n{json.dumps(recipe, indent=2)}")
        save_history(session_id)
        return JsonResponse({

            "session_id": session_id,
            "recipe": recipe
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@csrf_exempt
def guide_ai(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        body = json.loads(request.body)

        message = body.get("message")
        session_id = body.get("session_id")

        if not message:
            return JsonResponse({"error": "Message required"}, status=400)

        # create session automatically
        if not session_id:
            return JsonResponse({"error": "session_id required"}, status=400)

        load_history(session_id)
        reply = guide_chat(session_id, message)

        return JsonResponse({
            "session_id": session_id,
            "reply": reply
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
