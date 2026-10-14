import json

from agents.financial_health_agent import financial_agent
from agents.recommendation_agent import recommendation_agent


# Load user data
with open("agents/sample_user.json", "r") as f:
    user_data = json.load(f)


# Load transactions
with open("agents/sample_transactions.csv", "r") as f:
    transactions = f.read()


financial_data = {
    "user": user_data,
    "transactions": transactions
}


# First Agent
financial_analysis = financial_agent(financial_data)


print("\n===== FINANCIAL HEALTH ANALYSIS =====\n")
print(financial_analysis)


# Second Agent
recommendations = recommendation_agent(
    financial_data,
    financial_analysis
)


print("\n===== PERSONALIZED RECOMMENDATIONS =====\n")
print(recommendations)