import React, { useState, useMemo } from 'react';
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
import { 
  HAZARD_DIMENSIONS, 
  CATEGORY_HAZARD_CONFIGS, 
  calculateCategoryHazardAverage, 
  buildRadarChartData,
  EQUIPMENT_HAZARD_RATINGS
} from '../data/hazardRadarData';
import { EQUIPMENT_LIST } from '../data/equipmentData';
import { HazardRatings } from '../types/equipment';
import { 
  ShieldAlert, 
  Zap, 
  Flame, 
  Layers, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  Beaker,
  Compass,
  Sliders,
  Filter
} from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomRadarTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const getRiskTier = (val: number) => {
    if (val >= 8.0) return { label: 'Severe Hazard', color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900' };
    if (val >= 6.0) return { label: 'High Hazard', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900' };
    if (val >= 3.0) return { label: 'Moderate Hazard', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/60 border-yellow-200 dark:border-yellow-900' };
    return { label: 'Low / Controlled', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900' };
  };

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-xs text-xs pointer-events-none z-50">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200/80 dark:border-slate-800">
        <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
          {label} Vector
        </span>
        <span className="text-[10px] font-mono text-slate-400">Scale: 0 - 10</span>
      </div>

      <div className="space-y-2">
        {payload.map((entry, index) => {
          const val = Number(entry.value) || 0;
          const tier = getRiskTier(val);
          return (
            <div key={`tooltip-${index}`} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color || entry.stroke }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                  {entry.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {val.toFixed(1)}/10
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${tier.color}`}>
                  {tier.label.split(' ')[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const HazardRadarSection: React.FC = () => {
  // Primary selected category for deep dive
  const [primaryCategory, setPrimaryCategory] = useState<string>('all');
  
  // Multi-category comparison mode
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [comparisonCategories, setComparisonCategories] = useState<string[]>(['glassware', 'heating', 'separation']);

  // Specific apparatus overlay
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');

  // Available equipment for currently chosen category
  const filteredEquipment = useMemo(() => {
    if (primaryCategory === 'all') return EQUIPMENT_LIST;
    return EQUIPMENT_LIST.filter(item => item.category === primaryCategory);
  }, [primaryCategory]);

  // Categories to plot
  const activeCategoryKeys = useMemo(() => {
    if (compareMode) {
      return comparisonCategories.length > 0 ? comparisonCategories : ['all'];
    }
    return [primaryCategory];
  }, [compareMode, comparisonCategories, primaryCategory]);

  // Chart data formatted for Recharts
  const radarChartData = useMemo(() => {
    return buildRadarChartData(
      activeCategoryKeys, 
      selectedEquipmentId ? selectedEquipmentId : null
    );
  }, [activeCategoryKeys, selectedEquipmentId]);

  // Statistics for the primary active category
  const primaryStats = useMemo(() => {
    return calculateCategoryHazardAverage(primaryCategory);
  }, [primaryCategory]);

  const activeConfig = CATEGORY_HAZARD_CONFIGS[primaryCategory] || CATEGORY_HAZARD_CONFIGS.all;

  // Find the dominant hazard vector
  const dominantVector = useMemo(() => {
    const keys: (keyof HazardRatings)[] = ['chemical', 'electrical', 'physical', 'thermal'];
    let topKey = keys[0];
    let topVal = primaryStats[topKey];
    for (const k of keys) {
      if (primaryStats[k] > topVal) {
        topVal = primaryStats[k];
        topKey = k;
      }
    }
    return {
      key: topKey,
      value: topVal,
      info: HAZARD_DIMENSIONS.find(d => d.key === topKey)
    };
  }, [primaryStats]);

  // Find equipment with highest hazard in this category
  const highestRiskEquip = useMemo(() => {
    const pool = primaryCategory === 'all' 
      ? EQUIPMENT_LIST 
      : EQUIPMENT_LIST.filter(e => e.category === primaryCategory);
    
    let maxItem = pool[0];
    let maxScore = 0;

    pool.forEach(item => {
      const r = EQUIPMENT_HAZARD_RATINGS[item.id];
      if (r) {
        const sum = r.chemical + r.electrical + r.physical + r.thermal;
        if (sum > maxScore) {
          maxScore = sum;
          maxItem = item;
        }
      }
    });

    return { item: maxItem, ratings: EQUIPMENT_HAZARD_RATINGS[maxItem?.id] };
  }, [primaryCategory]);

  // Toggle category in comparison mode
  const toggleComparisonCategory = (catId: string) => {
    setComparisonCategories(prev => {
      if (prev.includes(catId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(c => c !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  const getHazardBadge = (score: number) => {
    if (score >= 8.0) return { label: 'Severe', bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900' };
    if (score >= 6.0) return { label: 'High', bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900' };
    if (score >= 3.0) return { label: 'Moderate', bg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900' };
    return { label: 'Low', bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900' };
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xs">
      
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Risk Profiling & Cross-Category Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            Laboratory Equipment Hazard Radar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Four-dimensional vector mapping of <strong>Chemical</strong>, <strong>Electrical</strong>, <strong>Physical</strong>, and <strong>Thermal</strong> risk indices. Compare apparatus classes or drill down into specific laboratory tools.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 self-start lg:self-center shrink-0 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => setCompareMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              !compareMode
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Category Deep Dive</span>
          </button>
          <button
            type="button"
            onClick={() => setCompareMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              compareMode
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Compare Overlay</span>
          </button>
        </div>
      </div>

      {/* Control Strip: Category Tabs & Selectors */}
      <div className="py-4 space-y-3">
        {!compareMode ? (
          /* Single Category Selection Pills */
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase mr-1">
              Select Category:
            </span>
            {Object.values(CATEGORY_HAZARD_CONFIGS).map(cat => {
              const isSelected = primaryCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setPrimaryCategory(cat.id);
                    setSelectedEquipmentId('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs ring-2 ring-blue-500/50'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.strokeColor }}
                  />
                  <span>{cat.shortLabel}</span>
                </button>
              );
            })}
          </div>
        ) : (
          /* Multi-Category Comparison Toggle Pills */
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                Active Categories to Compare (select 2 or more):
              </span>
              <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                {comparisonCategories.length} selected
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {Object.values(CATEGORY_HAZARD_CONFIGS).map(cat => {
                const isActive = comparisonCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleComparisonCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                      isActive
                        ? 'border-transparent shadow-xs text-white'
                        : 'bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                    style={isActive ? { backgroundColor: cat.strokeColor } : {}}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isActive ? '#ffffff' : cat.strokeColor }}
                    />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Individual Equipment Drilldown Filter (Only in Single Mode) */}
        {!compareMode && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Filter className="w-3.5 h-3.5 text-blue-500" />
              <span>Apparatus Drilldown:</span>
              <select
                value={selectedEquipmentId}
                onChange={(e) => setSelectedEquipmentId(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Category Average Benchmark</option>
                {filteredEquipment.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.safety.hazardLevel.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {selectedEquipmentId && (
              <button
                type="button"
                onClick={() => setSelectedEquipmentId('')}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-mono self-start sm:self-auto"
              >
                Reset to category average
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Grid: Radar Chart + Dimensional Breakdown Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2 items-center">
        
        {/* LEFT / CENTER: Recharts Radar Chart */}
        <div className="lg:col-span-6 xl:col-span-6 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>4-AXIS HAZARD MAPPING</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {compareMode 
                ? 'Overlay Comparison' 
                : (selectedEquipmentId 
                    ? EQUIPMENT_LIST.find(e => e.id === selectedEquipmentId)?.name 
                    : activeConfig.name)}
            </span>
          </div>

          <div className="w-full h-[320px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarChartData}>
                <PolarGrid stroke="#94a3b8" strokeOpacity={0.25} />
                <PolarAngleAxis 
                  dataKey="dimension" 
                  tick={{ 
                    fill: 'currentColor', 
                    fontSize: 12, 
                    fontWeight: 700 
                  }} 
                  className="text-slate-700 dark:text-slate-200"
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 10]} 
                  stroke="#94a3b8" 
                  strokeOpacity={0.3} 
                  tick={{ fontSize: 9, fill: '#94a3b8' }} 
                />
                <Tooltip content={<CustomRadarTooltip />} />

                {/* In comparison mode, render each selected category */}
                {compareMode ? (
                  comparisonCategories.map(catKey => {
                    const cfg = CATEGORY_HAZARD_CONFIGS[catKey] || CATEGORY_HAZARD_CONFIGS.all;
                    return (
                      <Radar
                        key={catKey}
                        name={cfg.shortLabel}
                        dataKey={catKey}
                        stroke={cfg.strokeColor}
                        fill={cfg.fillColor}
                        fillOpacity={cfg.fillOpacity}
                        strokeWidth={2}
                      />
                    );
                  })
                ) : (
                  /* Single category view with optional apparatus overlay */
                  <>
                    <Radar
                      name={`${activeConfig.shortLabel} Average`}
                      dataKey={primaryCategory}
                      stroke={activeConfig.strokeColor}
                      fill={activeConfig.fillColor}
                      fillOpacity={0.35}
                      strokeWidth={2.5}
                    />
                    {selectedEquipmentId && (
                      <Radar
                        name={EQUIPMENT_LIST.find(e => e.id === selectedEquipmentId)?.name || 'Equipment'}
                        dataKey="equipment"
                        stroke="#dc2626"
                        fill="#f87171"
                        fillOpacity={0.4}
                        strokeWidth={2.5}
                      />
                    )}
                  </>
                )}
                
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '12px', 
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 text-[11px] text-center text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>Scale represents empirical bench risk score from 0 (negligible) to 10 (extreme).</span>
          </div>
        </div>

        {/* RIGHT: Vector Metrics Breakdown & Safety Synthesis Cards */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-4">
          
          {/* Dominant Risk Driver Callout Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-900/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                    Primary Hazard Vector
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {dominantVector.info?.label}: {dominantVector.value.toFixed(1)}/10
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {activeConfig.name} Profile
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeConfig.safetySummary}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Vector Gauge Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HAZARD_DIMENSIONS.map((dim) => {
              // Score for active category
              const score = primaryStats[dim.key];
              const badge = getHazardBadge(score);

              // Specific equipment score if selected
              const equipScore = selectedEquipmentId && EQUIPMENT_HAZARD_RATINGS[selectedEquipmentId]
                ? EQUIPMENT_HAZARD_RATINGS[selectedEquipmentId][dim.key]
                : null;

              return (
                <div
                  key={dim.key}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {dim.key === 'chemical' && <Beaker className="w-4 h-4 text-amber-500" />}
                        {dim.key === 'electrical' && <Zap className="w-4 h-4 text-yellow-500" />}
                        {dim.key === 'physical' && <ShieldAlert className="w-4 h-4 text-blue-500" />}
                        {dim.key === 'thermal' && <Flame className="w-4 h-4 text-rose-500" />}
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {dim.label} Risk
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                          {equipScore !== null ? equipScore.toFixed(1) : score.toFixed(1)}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-bold ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </div>
                    </div>

                    {/* Progress Fill Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden my-2">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${((equipScore !== null ? equipScore : score) / 10) * 100}%`,
                          backgroundColor:
                            dim.key === 'thermal' ? '#ef4444' :
                            dim.key === 'chemical' ? '#f59e0b' :
                            dim.key === 'electrical' ? '#eab308' : '#3b82f6'
                        }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {dim.description}
                    </p>
                  </div>

                  {equipScore !== null && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Cat Avg: {score.toFixed(1)}</span>
                      <span className={equipScore > score ? 'text-rose-500 font-semibold' : 'text-emerald-500 font-semibold'}>
                        {equipScore > score ? `+${(equipScore - score).toFixed(1)} above avg` : `${(equipScore - score).toFixed(1)} below avg`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mitigation Directive & PPE Guidance Card */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Mandatory SOP Mitigation</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
                {activeConfig.ppeTier}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              {activeConfig.mitigationProtocol}
            </p>
            
            {highestRiskEquip.item && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">Peak Apparatus in Category:</span>
                <button
                  type="button"
                  onClick={() => setSelectedEquipmentId(highestRiskEquip.item.id)}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>{highestRiskEquip.item.name}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </section>
  );
};
