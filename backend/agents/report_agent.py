from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from prompts.report_prompt import report_prompt

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.2
)


def report_agent(financial_analysis, recommendations):

    prompt = report_prompt(
    financial_analysis,
    recommendations
)

    response = llm.invoke(prompt)

    return response.content