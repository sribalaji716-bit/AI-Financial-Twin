from agents.financial_health_agent import financial_agent
from agents.recommendation_agent import recommendation_agent
from agents.report_agent import report_agent

from memory.user_memory import add_user_record


def financial_workflow(financial_data):

    # Step 1 - Financial Analysis
    financial_analysis = financial_agent(financial_data)

    # Step 2 - Recommendations
    recommendations = recommendation_agent(financial_analysis)

    # Step 3 - Final Report
    report = report_agent(
        financial_analysis,
        recommendations
    )

    # Step 4 - Save User History
    add_user_record({
        "user": financial_data,
        "analysis": financial_analysis,
        "recommendations": recommendations
    })

    return {
        "analysis": financial_analysis,
        "recommendations": recommendations,
        "report": report
    }