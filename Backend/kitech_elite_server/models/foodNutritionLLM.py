import os
import json
from dotenv import load_dotenv
load_dotenv()
from langchain_mistralai import ChatMistralAI
from utils.image_to_url import image_bytes_to_data_url
from utils.extracting_json import extract_json


class FoodNutritionVisionLLM:
    def __init__(self):
        self.llm = ChatMistralAI(api_key=os.environ["MISTRAL_API_KEY"])
        self.model = "pixtral-12b-2409"

    def analyze_food_image(self, image_bytes):

        image_data_url = image_bytes_to_data_url(image_bytes)

        prompt = """
Act as a Clinical Nutritionist and Vision Analysis Expert. Your task is to analyze the food in the provided image with high precision.

### CONSTRAINTS:
1. OUTPUT ONLY A RAW JSON OBJECT. 
2. DO NOT include markdown code blocks (e.g., no ```json).
3. DO NOT include introductory text, conversational filler, or closing remarks.
4. For all numerical values, provide the NUMBER ONLY. Do not include units like "g", "kcal", or "mg".
5. If an item is not detectable, use 0.

### SCHEMA:
{
  "food_name": "string",
  "estimated_portion_size": "string",
  "calories_kcal": number,
  "macronutrients": {
      "protein_g": number,
      "carbohydrates_g": number,
      "fat_g": number
  },
  "micronutrients": {
      "fiber_g": number,
      "sugars_g": number,
      "sodium_mg": number
  }
}

### EXAMPLE OUTPUT FORMAT:
{"food_name": "Grilled Salmon", "estimated_portion_size": "150g", "calories_kcal": 312, "macronutrients": {"protein_g": 30, "carbohydrates_g": 0, "fat_g": 21}, "micronutrients": {"fiber_g": 0, "sugars_g": 0, "sodium_mg": 75}}
"""

        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": image_data_url}
                ]
            }
        ]

        response = self.llm.invoke(
            messages
        )

        raw = response.content

        return extract_json(raw)
    
# food = FoodNutritionVisionLLM()
# with open("models/meal.jpg", "rb") as f:   # read in binary mode
#     image_bytes = f.read()
# result = food.analyze_food_image(image_bytes)
# print(result)