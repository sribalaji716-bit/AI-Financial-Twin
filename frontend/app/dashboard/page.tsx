"use client";

import { useEffect, useState } from "react";

import {
  getFinancialData,
  analyzeFinancialHealth,
} from "../../services/api";

import FinancialForm from "../../components/financialform/FinancialForm";

import SpendingChart from "../../components/spendingchart/SpendingChart";

// =========================================================
// TYPES
// =========================================================

type SpendingItem = {
  category: string;
  amount: number;
};

type FinancialData = {
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

// =========================================================
// DASHBOARD
// =========================================================

export default function Dashboard() {

  // =======================================================
  // STATE
  // =======================================================

  const [data, setData] =
    useState<FinancialData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [analyzing, setAnalyzing] =
    useState(false);

  const [error, setError] =
    useState("");


  // =======================================================
  // LOAD DEFAULT DATA
  // =======================================================

  useEffect(() => {

    async function loadData() {

      try {

        setLoading(true);

        setError("");

        const result =
          await getFinancialData();

        console.log(
          "Default Financial Data:",
          result
        );

        setData(result);

      } catch (err) {

        console.error(
          "Financial data error:",
          err
        );

        setError(
          "Failed to load financial data."
        );

      } finally {

        setLoading(false);

      }

    }

    loadData();

  }, []);


  // =======================================================
  // HANDLE FINANCIAL ANALYSIS
  // =======================================================

  async function handleFinancialAnalysis(
    name: string,
    income: number,
    expenses: number,
    savingsGoal: number
  ) {

    try {

      setAnalyzing(true);

      setError("");

      const result =
        await analyzeFinancialHealth(
          name,
          income,
          expenses,
          savingsGoal
        );

      console.log(
        "AI Financial Analysis:",
        result
      );

      // Backend response contains:
      // income
      // expenses
      // savings
      // savings_goal
      // score
      // status
      // spending_breakdown
      // recommendations

      setData(result);

    } catch (err) {

      console.error(
        "Analysis error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to analyze financial data."
      );

    } finally {

      setAnalyzing(false);

    }

  }


  // =======================================================
  // LOADING SCREEN
  // =======================================================

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="text-center">

          <div className="text-5xl mb-5">
            🤖
          </div>

          <h1 className="text-2xl font-bold">
            Loading Financial Twin...
          </h1>

          <p className="text-slate-400 mt-2">
            Preparing your financial dashboard
          </p>

        </div>

      </main>

    );

  }


  // =======================================================
  // ERROR SCREEN
  // =======================================================

  if (error && !data) {

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center max-w-md">

          <div className="text-4xl mb-4">
            ⚠️
          </div>

          <h1 className="text-xl font-bold text-red-400">
            Dashboard Error
          </h1>

          <p className="text-slate-300 mt-3">
            {error}
          </p>

          <p className="text-slate-500 text-sm mt-4">
            Make sure your FastAPI backend is running on port 8000.
          </p>

        </div>

      </main>

    );

  }


  // =======================================================
  // SAFETY CHECK
  // =======================================================

  if (!data) {
    return null;
  }


  // =======================================================
  // CALCULATIONS
  // =======================================================

  const savingsRate =
    data.income > 0
      ? Math.round(
          (data.savings / data.income) * 100
        )
      : 0;


  const goalProgress =
    data.savings_goal > 0
      ? Math.min(
          Math.round(
            (data.savings /
              data.savings_goal) *
              100
          ),
          100
        )
      : 0;


  const remainingGoal =
    Math.max(
      data.savings_goal - data.savings,
      0
    );


  // =======================================================
  // STATUS STYLE
  // =======================================================

  let statusColor =
    "text-red-400";

  let statusBg =
    "bg-red-500/20";

  if (
    data.financial_health_score >= 80
  ) {

    statusColor =
      "text-green-400";

    statusBg =
      "bg-green-500/20";

  } else if (
    data.financial_health_score >= 60
  ) {

    statusColor =
      "text-yellow-400";

    statusBg =
      "bg-yellow-500/20";

  }


  // =======================================================
  // MAIN DASHBOARD
  // =======================================================

  return (

    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto">


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

          <div>

            <p className="text-blue-400 font-semibold text-sm tracking-wide">

              AI POWERED PERSONAL FINANCE

            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">

              Financial Twin Dashboard

            </h1>

            <p className="text-slate-400 mt-3">

              Welcome back,{" "}

              <span className="text-white font-semibold">

                {data.name}

              </span>

              {" "}👋

            </p>

            <p className="text-slate-500 text-sm mt-1">

              Your AI-powered personal financial analysis.

            </p>

          </div>


          {/* HEALTH STATUS */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-5">

            <p className="text-slate-400 text-sm">

              Financial Health

            </p>

            <div className="flex items-center gap-3 mt-2">

              <span
                className={`text-3xl font-bold ${statusColor}`}
              >

                {data.financial_health_score}/100

              </span>

              <span
                className={`${statusBg} ${statusColor} px-3 py-1 rounded-full text-sm font-semibold`}
              >

                {data.status}

              </span>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* FINANCIAL FORM */}
        {/* ================================================= */}

        <FinancialForm
          onSubmit={
            handleFinancialAnalysis
          }
        />


        {/* ================================================= */}
        {/* ANALYZING */}
        {/* ================================================= */}

        {analyzing && (

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 mb-8">

            <div className="flex items-center gap-3">

              <div className="animate-spin text-xl">
                ⚙️
              </div>

              <div>

                <p className="text-blue-400 font-semibold">

                  AI is analyzing your financial data...

                </p>

                <p className="text-slate-500 text-sm mt-1">

                  Calculating your financial health and personalized insights.

                </p>

              </div>

            </div>

          </div>

        )}


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (

          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 mb-8">

            <p className="text-red-400">

              ⚠️ {error}

            </p>

          </div>

        )}


        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">


          {/* INCOME */}

          <div className="bg-gradient-to-br from-emerald-500/20 to-slate-900 border border-emerald-500/20 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">

              Monthly Income

            </p>

            <h2 className="text-3xl font-bold text-emerald-400 mt-3">

              ₹{data.income.toLocaleString("en-IN")}

            </h2>

            <p className="text-slate-500 text-xs mt-3">

              Total monthly earnings

            </p>

          </div>


          {/* EXPENSES */}

          <div className="bg-gradient-to-br from-red-500/20 to-slate-900 border border-red-500/20 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">

              Monthly Expenses

            </p>

            <h2 className="text-3xl font-bold text-red-400 mt-3">

              ₹{data.expenses.toLocaleString("en-IN")}

            </h2>

            <p className="text-slate-500 text-xs mt-3">

              Current monthly spending

            </p>

          </div>


          {/* SAVINGS */}

          <div className="bg-gradient-to-br from-blue-500/20 to-slate-900 border border-blue-500/20 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">

              Monthly Savings

            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-3">

              ₹{data.savings.toLocaleString("en-IN")}

            </h2>

            <p className="text-slate-500 text-xs mt-3">

              {savingsRate}% of your income saved

            </p>

          </div>


          {/* SAVINGS GOAL */}

          <div className="bg-gradient-to-br from-purple-500/20 to-slate-900 border border-purple-500/20 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">

              Monthly Savings Goal

            </p>

            <h2 className="text-3xl font-bold text-purple-400 mt-3">

              ₹{data.savings_goal.toLocaleString("en-IN")}

            </h2>

            <p className="text-slate-500 text-xs mt-3">

              {goalProgress}% goal achieved

            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* HEALTH + SPENDING */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">


          {/* HEALTH SCORE */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-xl font-bold">

              Financial Health Score

            </h2>

            <p className="text-slate-400 text-sm mt-2">

              Your financial stability based on income,
              expenses and savings.

            </p>


            {/* SCORE CIRCLE */}

            <div className="flex justify-center mt-8">

              <div
                className={`w-44 h-44 rounded-full border-[12px] ${
                  data.financial_health_score >= 80
                    ? "border-green-500"
                    : data.financial_health_score >= 60
                    ? "border-yellow-500"
                    : "border-red-500"
                } flex flex-col items-center justify-center`}
              >

                <span className="text-4xl font-bold">

                  {data.financial_health_score}

                </span>

                <span className="text-slate-500 text-sm">

                  out of 100

                </span>

              </div>

            </div>


            {/* STATUS */}

            <div className="text-center mt-6">

              <span
                className={`${statusBg} ${statusColor} px-5 py-2 rounded-full text-sm font-semibold`}
              >

                {data.status}

              </span>

            </div>


            {/* SAVINGS RATE */}

            <div className="mt-7 bg-slate-800 rounded-xl p-4">

              <div className="flex justify-between">

                <span className="text-slate-400 text-sm">

                  Savings Rate

                </span>

                <span className="text-blue-400 font-semibold">

                  {savingsRate}%

                </span>

              </div>


              <div className="w-full bg-slate-700 h-2 rounded-full mt-3">

                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      savingsRate,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>


          {/* SPENDING CHART */}

          <div className="lg:col-span-2">

            <SpendingChart
              data={
                data.spending_breakdown || []
              }
            />

          </div>

        </div>


        {/* ================================================= */}
        {/* SAVINGS GOAL PROGRESS */}
        {/* ================================================= */}

        <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6 mt-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div>

              <p className="text-purple-400 text-sm font-semibold">

                SAVINGS TARGET

              </p>

              <h2 className="text-2xl font-bold mt-1">

                Monthly Savings Goal

              </h2>

            </div>


            <div className="text-left md:text-right">

              <p className="text-slate-400 text-sm">

                Current / Goal

              </p>

              <p className="font-bold">

                <span className="text-blue-400">

                  ₹{data.savings.toLocaleString("en-IN")}

                </span>

                {" / "}

                <span className="text-purple-400">

                  ₹{data.savings_goal.toLocaleString("en-IN")}

                </span>

              </p>

            </div>

          </div>


          {/* PROGRESS BAR */}

          <div className="mt-5">

            <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">

              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-700"
                style={{
                  width: `${goalProgress}%`,
                }}
              />

            </div>

            <div className="flex justify-between mt-2">

              <span className="text-slate-500 text-sm">

                {goalProgress}% completed

              </span>

              <span className="text-slate-400 text-sm">

                {remainingGoal > 0
                  ? `₹${remainingGoal.toLocaleString("en-IN")} remaining`
                  : "Goal achieved 🎉"}

              </span>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* EXPENSE BREAKDOWN */}
        {/* ================================================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">

          <div className="flex justify-between items-center mb-6">

            <div>

              <p className="text-blue-400 text-sm font-semibold">

                SPENDING ANALYSIS

              </p>

              <h2 className="text-2xl font-bold mt-1">

                Expense Breakdown

              </h2>

            </div>

            <div className="bg-slate-800 px-3 py-2 rounded-lg">

              <span className="text-slate-400 text-xs">

                Total

              </span>

              <span className="text-white font-semibold ml-2">

                ₹{data.expenses.toLocaleString("en-IN")}

              </span>

            </div>

          </div>


          <div className="space-y-5">

            {(data.spending_breakdown || []).map(
              (item) => {

                const percentage =
                  data.expenses > 0
                    ? (item.amount /
                        data.expenses) *
                      100
                    : 0;

                return (

                  <div
                    key={item.category}
                  >

                    <div className="flex justify-between mb-2">

                      <span className="font-medium">

                        {item.category}

                      </span>

                      <span className="text-slate-300">

                        ₹{item.amount.toLocaleString("en-IN")}

                      </span>

                    </div>


                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(
                            percentage,
                            100
                          )}%`,
                        }}
                      />

                    </div>


                    <p className="text-slate-500 text-xs mt-1">

                      {percentage.toFixed(1)}% of total expenses

                    </p>

                  </div>

                );

              }
            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* AI RECOMMENDATIONS */}
        {/* ================================================= */}

        {data.recommendations &&
          data.recommendations.length > 0 && (

          <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-7 mt-8">

            <p className="text-purple-400 text-sm font-semibold">

              AI POWERED

            </p>

            <h2 className="text-2xl font-bold mt-1">

              🤖 AI Personalized Recommendations

            </h2>

            <p className="text-slate-500 text-sm mt-2">

              Suggestions generated from your current financial profile.

            </p>


            <div className="mt-5 space-y-4">

              {data.recommendations.map(
                (recommendation, index) => (

                  <div
                    key={index}
                    className="bg-slate-800 border border-slate-700 p-4 rounded-xl"
                  >

                    <div className="flex gap-3">

                      <span className="text-yellow-400">

                        💡

                      </span>

                      <p className="text-slate-300">

                        {recommendation}

                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}


        {/* ================================================= */}
        {/* AI FINANCIAL INSIGHT */}
        {/* ================================================= */}

        <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-7">

          <p className="text-blue-400 text-sm font-semibold">

            AI INSIGHT

          </p>

          <h2 className="text-2xl font-bold mt-1">

            🤖 AI Financial Insight

          </h2>


          <p className="text-slate-300 mt-4 leading-7">

            Your current savings rate is{" "}

            <span className="text-blue-400 font-bold">

              {savingsRate}%

            </span>

            {" "}

            and you are currently spending{" "}

            <span className="text-red-400 font-bold">

              ₹{data.expenses.toLocaleString("en-IN")}

            </span>

            {" "}every month.


            {savingsRate >= 30 ? (

              <>

                {" "}Your savings performance is{" "}

                <span className="text-green-400 font-semibold">

                  excellent

                </span>

                . Continue building your emergency fund
                and consider long-term wealth creation.

              </>

            ) : savingsRate >= 20 ? (

              <>

                {" "}Your savings habit is{" "}

                <span className="text-green-400 font-semibold">

                  healthy

                </span>

                . Try to maintain this consistency and
                gradually increase your savings target.

              </>

            ) : savingsRate >= 10 ? (

              <>

                {" "}Your savings level is moderate.
                Consider reducing unnecessary expenses
                and increasing your monthly savings.

              </>

            ) : (

              <>

                {" "}Your current savings rate is low.
                Focus on controlling discretionary expenses
                and building a consistent savings habit.

              </>

            )}

          </p>

        </div>


        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="text-center py-8">

          <p className="text-slate-600 text-xs">

            AI Financial Twin • Personal Finance Intelligence

          </p>

        </div>

      </div>

    </main>

  );
}