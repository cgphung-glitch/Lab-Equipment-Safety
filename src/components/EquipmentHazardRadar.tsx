import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';
import { EquipmentItem, HazardRatings } from '../types/equipment';
import { 
  EQUIPMENT_HAZARD_RATINGS, 
  calculateCategoryHazardAverage, 
  CATEGORY_HAZARD_CONFIGS,
  HAZARD_DIMENSIONS 
} from '../data/hazardRadarData';
import { Compass, Flame, Zap, Beaker, ShieldAlert } from 'lucide-react';

interface EquipmentHazardRadarProps {
  item: EquipmentItem;
}

export const EquipmentHazardRadar: React.FC<EquipmentHazardRadarProps> = ({ item }) => {
  const equipRatings: HazardRatings = useMemo(() => {
    return EQUIPMENT_HAZARD_RATINGS[item.id] || {
      chemical: 5.0,
      electrical: 2.0,
      physical: 5.0,
      thermal: 3.0
    };
  }, [item.id]);

  const categoryAvg = useMemo(() => {
    return calculateCategoryHazardAverage(item.category);
  }, [item.category]);

  const catConfig = CATEGORY_HAZARD_CONFIGS[item.category] || CATEGORY_HAZARD_CONFIGS.all;

  const chartData = useMemo(() => {
    return [
      {
        dimension: 'Chemical',
        apparatus: equipRatings.chemical,
        categoryAvg: categoryAvg.chemical,
        fullMark: 10
      },
      {
        dimension: 'Electrical',
        apparatus: equipRatings.electrical,
        categoryAvg: categoryAvg.electrical,
        fullMark: 10
      },
      {
        dimension: 'Physical',
        apparatus: equipRatings.physical,
        categoryAvg: categoryAvg.physical,
        fullMark: 10
      },
      {
        dimension: 'Thermal',
        apparatus: equipRatings.thermal,
        categoryAvg: categoryAvg.thermal,
        fullMark: 10
      }
    ];
  }, [equipRatings, categoryAvg]);

  const getTier = (score: number) => {
    if (score >= 8.0) return { label: 'Severe', color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900' };
    if (score >= 6.0) return { label: 'High', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900' };
    if (score >= 3.0) return { label: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-900' };
    return { label: 'Low', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900' };
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-700/80">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Apparatus Hazard Fingerprint</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            4-Vector Hazard Radar Profile
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
          vs. {catConfig.shortLabel} Baseline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Radar SVG */}
        <div className="md:col-span-6 h-[220px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#94a3b8" strokeOpacity={0.25} />
              <PolarAngleAxis 
                dataKey="dimension" 
                tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 700 }}
                className="text-slate-700 dark:text-slate-300"
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 10]} 
                stroke="#94a3b8" 
                strokeOpacity={0.25} 
                tick={{ fontSize: 8, fill: '#94a3b8' }} 
              />
              <Tooltip 
                formatter={(val: any, name: any) => [
                  `${Number(val).toFixed(1)}/10`, 
                  name === 'apparatus' ? item.name : `${catConfig.shortLabel} Avg`
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: 'rgba(51, 65, 85, 0.8)',
                  borderRadius: '0.75rem',
                  fontSize: '11px',
                  color: '#fff'
                }}
              />
              <Radar
                name={`${catConfig.shortLabel} Avg`}
                dataKey="categoryAvg"
                stroke={catConfig.strokeColor}
                fill={catConfig.fillColor}
                fillOpacity={0.2}
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />
              <Radar
                name={item.name}
                dataKey="apparatus"
                stroke="#3b82f6"
                fill="#60a5fa"
                fillOpacity={0.4}
                strokeWidth={2}
              />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '10px', 
                  fontFamily: 'monospace',
                  paddingTop: '6px'
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 4 Vector Score Indicators */}
        <div className="md:col-span-6 grid grid-cols-2 gap-2 text-xs">
          {HAZARD_DIMENSIONS.map((dim) => {
            const score = equipRatings[dim.key];
            const avg = categoryAvg[dim.key];
            const tier = getTier(score);

            return (
              <div 
                key={dim.key}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                    {dim.key === 'chemical' && <Beaker className="w-3 h-3 text-amber-500" />}
                    {dim.key === 'electrical' && <Zap className="w-3 h-3 text-yellow-500" />}
                    {dim.key === 'physical' && <ShieldAlert className="w-3 h-3 text-blue-500" />}
                    {dim.key === 'thermal' && <Flame className="w-3 h-3 text-rose-500" />}
                    <span>{dim.label}</span>
                  </div>
                  <span className={`text-[9px] font-mono px-1 py-0.2 rounded border font-semibold ${tier.color}`}>
                    {tier.label}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">
                    {score.toFixed(1)}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    avg {avg.toFixed(1)}
                  </span>
                </div>

                {/* Progress mini bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div 
                    className="h-full rounded-full"
                    style={{
                      width: `${(score / 10) * 100}%`,
                      backgroundColor:
                        dim.key === 'thermal' ? '#ef4444' :
                        dim.key === 'chemical' ? '#f59e0b' :
                        dim.key === 'electrical' ? '#eab308' : '#3b82f6'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
