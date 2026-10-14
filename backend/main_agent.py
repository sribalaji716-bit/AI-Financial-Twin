from agents.financial_health_agent import financial_agent
from agents.recommendation_agent import recommendation_agent
from agents.report_agent import report_agent


def run_financial_twin(financial_data):

    print("Running Financial Health Agent...")

    financial_analysis = financial_agent(financial_data)


    print("Running Recommendation Agent...")

    recommendations = recommendation_agent(financial_analysis)


    print("Running Report Agent...")

    report = report_agent(
        financial_analysis,
        recommendations
    )


    return {
        "financial_analysis": financial_analysis,
        "recommendations": recommendations,
        "final_report": report
    }