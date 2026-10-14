def financial_prompt(user_data):

    return f"""
You are an AI Financial Coach.

Analyze the following financial information:

{user_data}

Provide:

1. Financial Health Analysis
2. Income Analysis
3. Expense Analysis
4. Saving Analysis
5. Financial Risks

Give clear and simple advice.
"""