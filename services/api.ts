const API_URL = "http://127.0.0.1:8000";

export async function getFinancialData() {
  const response = await fetch(
    `${API_URL}/financial/data`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch financial data");
  }

  return response.json();
}