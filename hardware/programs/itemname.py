import os
import openai
from dotenv import load_dotenv

import base64
import requests

# Load environment variables from .env file
load_dotenv()

# OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "path_to_your_image.jpg"

# Getting the base64 string
base64_image = encode_image("images/image.jpg")

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {openai.api_key}"
}

payload = {
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What trash is the person holding in this image and what bin should they put it in? 1 is compost, 2 is recycling, 3 is landfill. Return in JSON format with item name first and number (as int) second."
        },
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}",
            "detail": "low"
          }
        }
      ]
    }
  ],
  "max_tokens": 300
}

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

print(response.json())