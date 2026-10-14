"use client";

import { useState } from "react";

type Props = {
  onSubmit: (
    name: string,
    income: number,
    expenses: number,
    savingsGoal: number
  ) => Promise<void>;
};

export default function FinancialForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    const trimmedName = name.trim();

    const incomeValue = Number(income);
    const expensesValue = Number(expenses);
    const savingsGoalValue = Number(savingsGoal);

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (!income || incomeValue <= 0) {
      setError("Monthly income must be greater than 0.");
      return;
    }

    if (expenses === "" || expensesValue < 0) {
      setError("Monthly expenses cannot be negative.");
      return;
    }

    if (expensesValue > incomeValue) {
      setError("Expenses cannot be greater than income.");
      return;
    }

    if (savingsGoal === "" || savingsGoalValue < 0) {
      setError("Savings goal cannot be negative.");
      return;
    }

    if (savingsGoalValue > incomeValue) {
      setError("Savings goal cannot be greater than income.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit(
        trimmedName,
        incomeValue,
        expensesValue,
        savingsGoalValue
      );
    } catch (err) {
      console.error("Financial form error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to analyze financial data."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8">

      {/* HEADER */}

      <div className="mb-6">
        <p className="text-blue-400 font-semibold text-sm mb-2">
          PERSONAL FINANCIAL ANALYSIS
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Enter Your Financial Details
        </h2>

        <p className="text-slate-400 mt-2">
          Let your AI Financial Twin analyze your
          income, expenses and savings.
        </p>
      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NAME */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={loading}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

          {/* INCOME */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Monthly Income (₹)
            </label>

            <input
              type="number"
              min="0"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Example: 50000"
              disabled={loading}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

          {/* EXPENSES */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Monthly Expenses (₹)
            </label>

            <input
              type="number"
              min="0"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="Example: 30000"
              disabled={loading}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

          {/* SAVINGS GOAL */}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Monthly Savings Goal (₹)
            </label>

            <input
              type="number"
              min="0"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              placeholder="Example: 15000"
              disabled={loading}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all"
        >
          {loading
            ? "🤖 AI is Analyzing..."
            : "🤖 Analyze My Financial Health"}
        </button>

      </form>
    </div>
  );
}