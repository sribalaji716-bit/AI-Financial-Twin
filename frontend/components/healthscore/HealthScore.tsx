"use client";

type HealthScoreProps = {
  score: number;
  status: string;
};

export default function HealthScore({
  score,
  status,
}: HealthScoreProps) {
  const safeScore = Math.max(0, Math.min(score, 100));

  const getScoreColor = () => {
    if (safeScore >= 80) return "text-emerald-400";
    if (safeScore >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getBorderColor = () => {
    if (safeScore >= 80) return "border-emerald-400";
    if (safeScore >= 60) return "border-yellow-400";
    return "border-red-400";
  };

  const getStatusStyle = () => {
    if (safeScore >= 80) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }

    if (safeScore >= 60) {
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }

    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            Financial Health
          </p>

          <h2 className="text-2xl font-bold text-white mt-1">
            Your Score
          </h2>
        </div>

        <div className="text-2xl">
          {safeScore >= 80
            ? "🟢"
            : safeScore >= 60
            ? "🟡"
            : "🔴"}
        </div>

      </div>

      <div className="flex justify-center mt-8">

        <div
          className={`w-44 h-44 rounded-full border-[14px] ${getBorderColor()} flex flex-col items-center justify-center`}
        >

          <span
            className={`text-5xl font-bold ${getScoreColor()}`}
          >
            {safeScore}
          </span>

          <span className="text-slate-500 text-sm mt-1">
            / 100
          </span>

        </div>

      </div>

      <div className="text-center mt-7">

        <span
          className={`inline-flex px-5 py-2 rounded-full border text-sm font-semibold ${getStatusStyle()}`}
        >
          {status}
        </span>

      </div>

      <div className="mt-6">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-slate-400">
            Financial stability
          </span>

          <span className={getScoreColor()}>
            {safeScore}%
          </span>

        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

          <div
            className={`h-full rounded-full transition-all duration-700 ${
              safeScore >= 80
                ? "bg-emerald-400"
                : safeScore >= 60
                ? "bg-yellow-400"
                : "bg-red-400"
            }`}
            style={{
              width: `${safeScore}%`,
            }}
          />

        </div>

      </div>

      <p className="text-slate-500 text-sm text-center mt-5">
        Based on your income, expenses and savings.
      </p>

    </div>
  );
}