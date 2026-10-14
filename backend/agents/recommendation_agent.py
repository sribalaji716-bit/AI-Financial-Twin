from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.4,
    google_api_key=os.getenv("GEMINI_API_KEY")
)


def recommendation_agent(user_data: dict, financial_data: dict):

    income = financial_data.get("income", 0)
    expenses = financial_data.get("expenses", 0)
    savings = financial_data.get("savings", 0)
    score = financial_data.get("financial_health_score", 0)
    status = financial_data.get("status", "Unknown")

    savings_rate = 0

    if income > 0:
        savings_rate = round((savings / income) * 100, 2)

    prompt = f"""
You are an AI Financial Advisor.

Analyze the following user's financial information and provide
a short, practical financial recommendation.

User Information:
Name: {user_data.get("name", "User")}
Age: {user_data.get("age", "Unknown")}

Financial Data:
Monthly Income: ₹{income}
Monthly Expenses: ₹{expenses}
Monthly Savings: ₹{savings}
Savings Rate: {savings_rate}%
Financial Health Score: {score}/100
Financial Status: {status}

Provide your response in this exact format:

SUMMARY:
<short financial summary>

RECOMMENDATION:
<practical advice>

SAVINGS TIP:
<one useful savings tip>

WARNING:
<financial risk or concern if any>

Keep the response concise, clear and useful.
Do not use markdown tables.
"""

    response = llm.invoke(prompt)

    return {
        "ai_recommendation": response.content,
        "savings_rate": savings_rate,
        "financial_health_score": score,
        "status": status
    }