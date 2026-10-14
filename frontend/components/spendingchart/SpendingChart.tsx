"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type SpendingItem = {
  category: string;
  amount: number;
};

type Props = {
  data: SpendingItem[];
};

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#a855f7",
];

export default function SpendingChart({ data }: Props) {
  console.log("CHART RECEIVED DATA:", data);

  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[450px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-300">
            No spending data available
          </p>

          <p className="text-sm text-slate-500 mt-2">
            Analyze your financial details to see spending distribution.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[450px]">
      {/* HEADER */}

      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">
          Spending Distribution
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Breakdown of your monthly expenses by category
        </p>
      </div>

      {/* CHART */}

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="45%"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((item, index) => (
              <Cell
                key={`${item.category}-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString()}`
            }
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "#ffffff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="text-slate-300 text-sm">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}