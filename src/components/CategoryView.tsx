import React from 'react';
import { CATEGORIES, EQUIPMENT_LIST } from '../data/equipmentData';
import { CategoryType, EquipmentItem } from '../types/equipment';
import { SchematicIcon } from './SchematicIcon';
import { ArrowRight, Layers, ShieldCheck, Flame, Scale, Filter } from 'lucide-react';

interface CategoryViewProps {
  onSelectCategory: (category: string) => void;
  onSelectEquipment: (item: EquipmentItem) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  onSelectCategory,
  onSelectEquipment
}) => {
  const categoryMeta: Record<string, { desc: string; icon: string; highlight: string }> = {
    glassware: {
      desc: 'Precision volumetric apparatus, reaction flasks, titrators, condensers, and separation glassware.',
      icon: 'burette',
      highlight: 'Calibrated Borosilicate 3.3 standards'
    },
    heating: {
      desc: 'Controlled thermal transfer, digital stirring hotplates, mantles, and direct high-temperature flame sources.',
      icon: 'hotplate',
      highlight: 'Thermal safety cutoff & runaway prevention'
    },
    analytical: {
      desc: 'High-precision gravimetric balances, potentiometric sensors, and optical spectrophotometric instruments.',
      icon: 'balance',
      highlight: 'Sub-milligram accuracy & calibration'
    },
    separation: {
      desc: 'Vacuum solvent strippers, Büchner filtration, flash chromatography columns, and high-speed centrifuges.',
      icon: 'rotovap',
      highlight: 'Vacuum implosion containment & phase separation'
    },
    safety: {
      desc: 'Chemical fume hoods, continuous emergency eyewash/deluge shower stations, and active spill kits.',
      icon: 'fumehood',
      highlight: 'Negative pressure & OSHA containment compliance'
    }
  };

  const categories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Category Overview Intro */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Layers className="w-6 h-6 text-blue-600" />
          <span>Apparatus Classification & Equipment Families</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Browse laboratory equipment by functional grouping, technical specifications, and containment tier.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat) => {
          const meta = categoryMeta[cat.id] || {
            desc: 'General laboratory instruments',
            icon: 'erlenmeyer',
            highlight: 'Standard laboratory bench gear'
          };
          const items = EQUIPMENT_LIST.filter(e => e.category === cat.id);

          return (
            <div
              key={cat.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-blue-500/60 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                    <SchematicIcon type={meta.icon} className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {cat.count} Apparatus Units
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {cat.label}
                </h2>

                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {meta.desc}
                </p>

                <div className="mt-3 text-[11px] font-mono text-blue-600 dark:text-blue-400">
                  {meta.highlight}
                </div>

                {/* Sub-item quick list */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 block">
                    Featured in this family:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.slice(0, 4).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelectEquipment(item)}
                        className="px-2.5 py-1 rounded-md text-xs bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                      >
                        {item.name.split(' (')[0]}
                      </button>
                    ))}
                    {items.length > 4 && (
                      <span className="px-2 py-1 text-xs text-slate-400">
                        +{items.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* View in Catalog Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200/60 dark:border-slate-700/60"
                >
                  <span>Filter Catalog by {cat.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
