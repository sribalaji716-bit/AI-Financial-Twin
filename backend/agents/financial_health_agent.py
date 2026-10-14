import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from prompts.financial_prompt import financial_prompt

load_dotenv()

print("API KEY LOADED:", bool(os.getenv("GEMINI_API_KEY")))

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash"
)


def financial_agent(user_data):

    prompt = financial_prompt(user_data)

    response = llm.invoke(prompt)

    if isinstance(response.content, list):
        return "\n".join(
            item["text"]
            for item in response.content
            if isinstance(item, dict) and item.get("type") == "text"
        )

    return response.content