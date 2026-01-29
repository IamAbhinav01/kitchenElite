from fastapi import FastAPI,UploadFile, File
from models.foodNutritionLLM import FoodNutritionVisionLLM
app =  FastAPI()



image_model = FoodNutritionVisionLLM()

@app.post('/')
def welcome():
    return "HI, Welcome to KitchenEliteAI"

@app.post('/analyse_image')
async def image_analyser(file: UploadFile = File(...)):
    
    # Read image bytes
    image_bytes = await file.read()

    # Pass image to your model
    result = image_model.analyze_food_image(image_bytes)

    return {
        "filename": file.filename,
        "analysis": result
    }
