const API_BASE_URL = "http://127.0.0.1:8000";

// =========================================================
// TYPES
// =========================================================

export type SpendingItem = {
  category: string;
  amount: number;
};

export type FinancialData = {
  name: string;
  income: number;
  expenses: number;
  savings: number;
  savings_goal: number;
  savings_rate: number;
  financial_health_score: number;
  status: string;
  spending_breakdown: SpendingItem[];
  recommendations: string[];
};

export type FinancialAnalysisRequest = {
  name: string;
  income: number;
  expenses: number;
  savings_goal: number;
};

// =========================================================
// RESPONSE HANDLER
// =========================================================

async function handleResponse(
  response: Response
) {
  if (!response.ok) {
    let message =
      `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      if (errorData?.detail) {
        message =
          typeof errorData.detail === "string"
            ? errorData.detail
            : JSON.stringify(errorData.detail);
      }
    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(message);
  }

  return response.json();
}

// =========================================================
// GET DEFAULT FINANCIAL DATA
// =========================================================

export async function getFinancialData(): Promise<FinancialData> {

  const response = await fetch(
    `${API_BASE_URL}/financial/data`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return handleResponse(response);
}

// =========================================================
// ANALYZE FINANCIAL HEALTH
// =========================================================

export async function analyzeFinancialHealth(
  name: string,
  income: number,
  expenses: number,
  savingsGoal: number
): Promise<FinancialData> {

  const requestBody: FinancialAnalysisRequest = {
    name,
    income,
    expenses,
    savings_goal: savingsGoal,
  };

  console.log(
    "Sending financial analysis:",
    requestBody
  );

  const response = await fetch(
    `${API_BASE_URL}/financial/analyze`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestBody),
    }
  );

  const result =
    await handleResponse(response);

  console.log(
    "Financial analysis response:",
    result
  );

  return result;
}