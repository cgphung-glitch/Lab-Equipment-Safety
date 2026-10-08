import React from 'react';
import { EquipmentItem, HazardLevel } from '../types/equipment';
import { EquipmentPhoto } from './EquipmentPhoto';
import { Bookmark, ShieldAlert, ArrowRight } from 'lucide-react';
import { GHSIcon } from './GHSIcon';

interface EquipmentCardProps {
  item: EquipmentItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (item: EquipmentItem) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  item,
  isBookmarked,
  onToggleBookmark,
  onSelect
}) => {
  // Severity text and indicator
  const getHazardMeta = (level: HazardLevel) => {
    switch (level) {
      case 'critical':
        return {
          label: 'Critical Hazard',
          textColor: 'text-rose-600 dark:text-rose-400',
          indicator: 'bg-rose-600'
        };
      case 'high':
        return {
          label: 'High Hazard',
          textColor: 'text-amber-600 dark:text-amber-400',
          indicator: 'bg-amber-500'
        };
      case 'moderate':
        return {
          label: 'Moderate Hazard',
          textColor: 'text-yellow-600 dark:text-yellow-400',
          indicator: 'bg-yellow-500'
        };
      case 'low':
        return {
          label: 'Low Hazard',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          indicator: 'bg-emerald-500'
        };
    }
  };

  const hazard = getHazardMeta(item.safety.hazardLevel);

  return (
    <div
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-500/60 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* Top Image / Schematic Slot */}
      <div className="relative w-full overflow-hidden">
        <EquipmentPhoto
          imageUrl={item.imageUrl}
          name={item.name}
          schematicIcon={item.schematicIcon}
          aspectRatio="4/3"
          highResBanner={!!item.imageUrl}
        />

        {/* Floating Bookmark Button */}
        <button
          type="button"
          onClick={(e) => onToggleBookmark(item.id, e)}
          className={`absolute top-2.5 left-2.5 min-w-[36px] min-h-[36px] rounded-lg flex items-center justify-center backdrop-blur-md transition-colors ${
            isBookmarked
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/10'
          }`}
          aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* GHS Icons Bar on bottom edge of image */}
        {item.safety.ghsPictograms.length > 0 && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
            {item.safety.ghsPictograms.slice(0, 3).map((pic) => (
              <GHSIcon key={pic} type={pic} size="sm" />
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="font-medium text-blue-600 dark:text-blue-400">{item.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[160px]">{item.specs.material.split('/')[0]}</span>
          </div>

          {/* Primary Apparatus Title */}
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {item.name}
          </h3>

          {/* Brief Description */}
          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer Area: Hazard status and tap affordance */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full shrink-0 ${hazard.indicator}`} />
            <span className={`text-xs font-semibold ${hazard.textColor}`}>
              {hazard.label}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <span>Safety SOP</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
