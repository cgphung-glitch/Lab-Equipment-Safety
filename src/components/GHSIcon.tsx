import React from 'react';
import { GHSPictogram } from '../types/equipment';
import { Flame, Skull, AlertTriangle, Radiation, ShieldAlert, Wind, Zap } from 'lucide-react';

interface GHSIconProps {
  type: GHSPictogram;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const GHSIcon: React.FC<GHSIconProps> = ({ type, size = 'md', showLabel = false }) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-[9px]',
    md: 'w-9 h-9 text-[10px]',
    lg: 'w-12 h-12 text-xs'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6'
  };

  const renderSymbol = () => {
    switch (type) {
      case 'flammable':
        return <Flame className={`${iconSizes[size]} text-amber-500`} />;
      case 'corrosive':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${iconSizes[size]} text-rose-600`}>
            <path d="M4 6h4v6H4zM16 6h4v6h-4z" />
            <path d="M7 12l2 4M17 12l-2 4M2 20h20" />
          </svg>
        );
      case 'toxic':
        return <Skull className={`${iconSizes[size]} text-rose-600`} />;
      case 'health_hazard':
        return <ShieldAlert className={`${iconSizes[size]} text-indigo-500`} />;
      case 'explosive':
        return <Zap className={`${iconSizes[size]} text-red-600`} />;
      case 'compressed_gas':
        return <Wind className={`${iconSizes[size]} text-cyan-600`} />;
      case 'oxidizer':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${iconSizes[size]} text-amber-500`}>
            <circle cx="12" cy="14" r="6" />
            <path d="M12 2c2 3 2 5 0 8" />
          </svg>
        );
      case 'irritant':
        return <AlertTriangle className={`${iconSizes[size]} text-amber-500`} />;
      case 'environmental':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${iconSizes[size]} text-emerald-600`}>
            <path d="M12 3v18M8 8l4-4 4 4M7 14l5-5 5 5" />
          </svg>
        );
      default:
        return <AlertTriangle className={`${iconSizes[size]} text-amber-500`} />;
    }
  };

  const labelMap: Record<GHSPictogram, string> = {
    flammable: 'Flammable',
    corrosive: 'Corrosive',
    toxic: 'Acute Toxicity',
    compressed_gas: 'Gas Under Pressure',
    explosive: 'Explosive Risk',
    health_hazard: 'Target Organ / Chronic',
    irritant: 'Skin / Eye Irritant',
    oxidizer: 'Oxidizing Agent',
    environmental: 'Aquatic Hazard'
  };

  return (
    <div className="flex items-center gap-1.5" title={`GHS Hazard: ${labelMap[type]}`}>
      {/* GHS Red Diamond */}
      <div className={`relative flex items-center justify-center bg-white dark:bg-slate-900 border-2 border-red-600 shadow-sm rotate-45 shrink-0 ${sizeMap[size]}`}>
        <div className="-rotate-45 flex items-center justify-center">
          {renderSymbol()}
        </div>
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {labelMap[type]}
        </span>
      )}
    </div>
  );
};
