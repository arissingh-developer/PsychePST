import React from 'react';
import { FactorScoreResult } from '../types/psychology';

interface RadarChartProps {
  results: FactorScoreResult[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ results }) => {
  // Sort factors in standard order for a clean circle
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;
  const count = results.length;

  if (count === 0) return null;

  // Calculate points
  const points = results.map((result, index) => {
    const angle = (Math.PI * 2 / count) * index - Math.PI / 2;
    // Normalized 0 to 100
    const value = Math.max(10, Math.min(100, result.healthIndex));
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, result, r };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  // Grid circles
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Circles */}
        {gridLevels.map((level, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="currentColor"
            strokeDasharray={level < 1 ? "3 3" : undefined}
            className="text-slate-200 dark:text-slate-800"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {points.map((p, i) => {
          const outerX = center + radius * Math.cos(p.angle);
          const outerY = center + radius * Math.sin(p.angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outerX}
              y2={outerY}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Data Polygon */}
        <polygon
          points={polygonPath}
          className="fill-indigo-500/25 stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => {
          const isNeed = p.result.needsAttention;
          return (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                className={isNeed ? "fill-rose-500 stroke-white dark:stroke-slate-900" : "fill-emerald-500 stroke-white dark:stroke-slate-900"}
                strokeWidth="2"
              />
            </g>
          );
        })}

        {/* Outer Labels */}
        {points.map((p, i) => {
          const labelDist = radius + 24;
          const lx = center + labelDist * Math.cos(p.angle);
          const ly = center + labelDist * Math.sin(p.angle);
          
          let textAnchor: "middle" | "start" | "end" = "middle";
          if (Math.abs(Math.cos(p.angle)) > 0.3) {
            textAnchor = Math.cos(p.angle) > 0 ? "start" : "end";
          }

          const shortLabel = p.result.title.split(' ')[0];

          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor={textAnchor}
              dominantBaseline="central"
              className="text-[11px] font-semibold fill-slate-700 dark:fill-slate-300 select-none"
            >
              {shortLabel}
              <tspan className="text-[10px] font-normal fill-slate-400">
                {` (${p.result.healthIndex}%)`}
              </tspan>
            </text>
          );
        })}
      </svg>

      <div className="flex items-center gap-5 mt-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">Optimal / Asset (&ge;65%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">Needs Attention (&lt;65%)</span>
        </div>
      </div>
    </div>
  );
};
