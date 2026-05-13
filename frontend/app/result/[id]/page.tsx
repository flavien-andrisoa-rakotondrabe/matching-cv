"use client";
import { useMemo } from "react";

export default function HomePage() {
  const score = 74
  const size = 250;
  const stroke = 10;
  const radius = (size - stroke) / 2;

  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const offset = useMemo(() => {
    return circumference - (score / 100) * circumference;
  }, [score, circumference]);
  const color =
    score < 40
      ? "stroke-red-500"
      : score < 70
      ? "stroke-yellow-500"
      : "stroke-green-500";

  return (
    <div className="min-h-screen bg-background text-foreground font-serif">
      {/* Header */}
      <header className="px-10 py-5 border-b border-slate-200 flex items-center">
        <div className="flex items-center gap-2.5">
          <span className="text-lg font-bold tracking-tight">MatchingCV</span>
        </div>
      </header>
      <main className="max-w-xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center gap-2 mb-5">
          {/* Cercle */}
          <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="-rotate-90">
              {/* background */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-muted"
                strokeWidth={stroke}
                fill="transparent"
              />

              {/* progress */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className={`${color} transition-all duration-700`}
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>

            {/* centre */}
            <div className="absolute text-3xl font-bold">{score}%</div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-around items-center gap-2.5 pt-1 mt-5">
          <button
            className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200
                         rounded-md cursor-pointer hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            className="px-5 py-2 text-sm font-semibold text-white bg-slate-900
                         rounded-md cursor-pointer hover:bg-slate-700 transition-colors"
          >
            Soumettre
          </button>
        </div>
      </main>
    </div>
  );
} 
