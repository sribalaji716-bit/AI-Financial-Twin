from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="AI Financial Twin API",
    description="AI-powered personal financial analysis system",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# REQUEST MODEL
# =========================================================

class FinancialAnalyzeRequest(BaseModel):
    name: str
    income: float
    expenses: float
    savings_goal: float


# =========================================================
# STORE LAST ANALYSIS
# =========================================================

last_analysis = {
    "name": "Bala",
    "income": 50000,
    "expenses": 40000,
    "savings": 10000,
    "savings_goal": 10000,
}


# =========================================================
# FINANCIAL ANALYSIS FUNCTION
# =========================================================

def calculate_financial_analysis(
    name: str,
    income: float,
    expenses: float,
    savings_goal: float
):

    # -----------------------------------------------------
    # SAVINGS
    # -----------------------------------------------------

    savings = income - expenses

    # -----------------------------------------------------
    # SAVINGS RATE
    # -----------------------------------------------------

    if income > 0:
        savings_rate = (savings / income) * 100
    else:
        savings_rate = 0


    # -----------------------------------------------------
    # FINANCIAL HEALTH SCORE
    # -----------------------------------------------------

    if savings_rate >= 40:
        score = 95
        status = "Excellent"

    elif savings_rate >= 30:
        score = 90
        status = "Excellent"

    elif savings_rate >= 20:
        score = 80
        status = "Good"

    elif savings_rate >= 10:
        score = 65
        status = "Average"

    else:
        score = 40
        status = "Needs Improvement"


    # -----------------------------------------------------
    # EXTRA EXPENSE CHECK
    # -----------------------------------------------------

    if expenses > income:
        score = 25
        status = "Critical"


    # -----------------------------------------------------
    # SPENDING BREAKDOWN
    # -----------------------------------------------------

    if expenses > 0:

        spending_breakdown = [
            {
                "category": "Rent",
                "amount": round(expenses * 0.35)
            },
            {
                "category": "Food",
                "amount": round(expenses * 0.20)
            },
            {
                "category": "Transport",
                "amount": round(expenses * 0.15)
            },
            {
                "category": "Entertainment",
                "amount": round(expenses * 0.10)
            },
            {
                "category": "Others",
                "amount": round(expenses * 0.20)
            }
        ]

    else:

        spending_breakdown = []


    # -----------------------------------------------------
    # RECOMMENDATIONS
    # -----------------------------------------------------

    recommendations = []


    # Expense recommendation

    if expenses > income:

        recommendations.append(
            "Your expenses are higher than your income. "
            "Reduce unnecessary spending immediately."
        )

    elif expenses == income:

        recommendations.append(
            "You are spending your entire income. "
            "Try creating a monthly savings buffer."
        )

    elif savings_rate < 10:

        recommendations.append(
            "Your savings rate is low. "
            "Try saving at least 10% to 20% of your monthly income."
        )

    elif savings_rate < 20:

        recommendations.append(
            "Your financial situation is improving. "
            "Try increasing your monthly savings rate."
        )

    elif savings_rate < 30:

        recommendations.append(
            "Your savings habit is healthy. "
            "Consider increasing your emergency fund."
        )

    else:

        recommendations.append(
            "Excellent savings behaviour. "
            "Consider long-term investments and wealth building."
        )


    # Savings goal recommendation

    if savings < savings_goal:

        recommendations.append(
            f"You are currently saving ₹{savings:,.0f} per month, "
            f"which is below your savings goal of "
            f"₹{savings_goal:,.0f}. "
            f"Try reducing unnecessary expenses."
        )

    else:

        recommendations.append(
            f"Great job! You are meeting your monthly "
            f"savings goal of ₹{savings_goal:,.0f}."
        )


    # Emergency fund recommendation

    if savings_rate >= 20:

        recommendations.append(
            "Consider building an emergency fund covering "
            "at least 3 to 6 months of essential expenses."
        )


    # -----------------------------------------------------
    # RESULT
    # -----------------------------------------------------

    result = {

        "name": name,

        "income": round(income, 2),

        "expenses": round(expenses, 2),

        "savings": round(savings, 2),

        "savings_goal": round(savings_goal, 2),

        "savings_rate": round(savings_rate, 2),

        "financial_health_score": score,

        "status": status,

        "spending_breakdown": spending_breakdown,

        "recommendations": recommendations
    }


    return result


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "AI Financial Twin Backend Running Successfully"
    }


# =========================================================
# DEFAULT FINANCIAL DATA
# =========================================================

@app.get("/financial/data")
def get_financial_data():

    result = calculate_financial_analysis(
        name="Bala",
        income=50000,
        expenses=40000,
        savings_goal=10000
    )

    return result


# =========================================================
# ANALYZE FINANCIAL HEALTH
# =========================================================

@app.post("/financial/analyze")
def analyze_financial_health(
    request: FinancialAnalyzeRequest
):

    global last_analysis

    # -----------------------------------------------------
    # SAVE CURRENT USER DATA
    # -----------------------------------------------------

    last_analysis = {
        "name": request.name,
        "income": request.income,
        "expenses": request.expenses,
        "savings": request.income - request.expenses,
        "savings_goal": request.savings_goal,
    }


    # -----------------------------------------------------
    # CALCULATE ANALYSIS
    # -----------------------------------------------------

    result = calculate_financial_analysis(
        name=request.name,
        income=request.income,
        expenses=request.expenses,
        savings_goal=request.savings_goal
    )


    return result


# =========================================================
# AI RECOMMENDATIONS
# =========================================================

@app.get("/financial/recommendations")
def get_recommendations():

    result = calculate_financial_analysis(
        name=last_analysis["name"],
        income=last_analysis["income"],
        expenses=last_analysis["expenses"],
        savings_goal=last_analysis["savings_goal"]
    )

    return {
        "recommendations": result["recommendations"]
    }