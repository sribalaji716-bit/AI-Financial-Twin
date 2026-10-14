import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

print("API KEY LOADED:", bool(api_key))

client = genai.Client(api_key=api_key)

models = client.models.list()

for model in models:
    if "generateContent" in str(model.supported_actions):
        print(model.name)