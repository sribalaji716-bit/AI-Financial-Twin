def report_prompt(financial_analysis, recommendations):

    return f"""
You are an AI Financial Report Generator.

Financial Analysis:

{financial_analysis}

Recommendations:

{recommendations}

Generate:

1. Financial Summary
2. Spending Analysis
3. Saving Analysis
4. Recommendations
5. Future Goals
6. Conclusion

Generate a professional report.
"""