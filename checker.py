

import os
from dotenv import load_dotenv
load_dotenv()
from mistralai import Mistral

api_key = os.environ["MISTRAL_API_KEY"]
model = "mistral-small-latest"

client = Mistral(api_key=api_key)

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "What's in this image?"
            },
            {
                "type": "image_url",
                "image_url": "https://docs.mistral.ai/img/eiffel-tower-paris.jpg"
            }
        ]
    }
]

chat_response = client.chat.complete(
    model=model,
    messages=messages
)
print(chat_response)