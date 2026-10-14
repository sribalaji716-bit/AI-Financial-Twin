from pathlib import Path
import pandas as pd


CSV_PATH = (
    Path(__file__).resolve().parent.parent.parent
    / "agents"
    / "sample_transactions.csv"
)


def load_financial_data():

    df = pd.read_csv(CSV_PATH)

    df["type"] = df["type"].str.lower().str.strip()

    total_income = df.loc[
        df["type"] == "income",
        "amount"
    ].sum()

    total_expenses = df.loc[
        df["type"] == "expense",
        "amount"
    ].sum()

    total_savings = total_income - total_expenses

    category_breakdown = (
        df[df["type"] == "expense"]
        .groupby("category")["amount"]
        .sum()
        .to_dict()
    )

    return {
        "income": float(total_income),
        "expenses": float(total_expenses),
        "savings": float(total_savings),
        "category_breakdown": category_breakdown,
        "transactions": df.to_dict(orient="records")
    }