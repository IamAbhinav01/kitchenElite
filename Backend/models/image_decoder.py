


if __name__ == "__main__":
    analyzer = FoodNutritionVisionLLM()
    result = analyzer.analyze_food_image("./meal.jpg")

    print("\n--- FINAL PARSED RESULT ---")
    print(json.dumps(result, indent=2))
