import json
import csv

from agents.financial_health_agent import financial_agent

with open("agents/sample_user.json", "r") as file:
    user_data = json.load(file)

transactions = []

with open("agents/sample_transactions.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        transactions.append(row)

financial_data = {
    "user": user_data,
    "transactions": transactions
}

result = financial_agent(financial_data)

print("\n===== AI FINANCIAL HEALTH ANALYSIS =====\n")
print(result)