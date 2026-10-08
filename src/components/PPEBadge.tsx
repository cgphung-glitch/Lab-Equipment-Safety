import React from 'react';
import { PPEItem } from '../types/equipment';
import { Glasses, Shield, Flame, Wind, Eye } from 'lucide-react';

interface PPEBadgeProps {
  item: PPEItem;
  checked?: boolean;
  onToggle?: () => void;
  interactive?: boolean;
}

export const PPEBadge: React.FC<PPEBadgeProps> = ({
  item,
  checked,
  onToggle,
  interactive = false
}) => {
  const meta: Record<PPEItem, { label: string; sub: string; icon: React.ReactNode }> = {
    safety_goggles: {
      label: 'Splash Goggles',
      sub: 'ANSI Z87.1 D3 seal',
      icon: <Glasses className="w-4 h-4 text-blue-500" />
    },
    face_shield: {
      label: 'Full Face Shield',
      sub: 'Polycarbonate crown',
      icon: <Eye className="w-4 h-4 text-cyan-500" />
    },
    nitrile_gloves: {
      label: 'Nitrile Gloves',
      sub: 'Chemical barrier',
      icon: <Shield className="w-4 h-4 text-emerald-500" />
    },
    thermal_gloves: {
      label: 'Thermal Gloves',
      sub: 'Rated up to 350°C',
      icon: <Flame className="w-4 h-4 text-amber-500" />
    },
    cryo_gloves: {
      label: 'Cryogenic Gloves',
      sub: 'Sub-zero insulated',
      icon: <Shield className="w-4 h-4 text-blue-400" />
    },
    flame_resistant_coat: {
      label: '100% Cotton Lab Coat',
      sub: 'NFPA 2112 buttoned',
      icon: <Shield className="w-4 h-4 text-indigo-500" />
    },
    fume_hood: {
      label: 'Chemical Fume Hood',
      sub: '80–120 FPM face velocity',
      icon: <Wind className="w-4 h-4 text-teal-500" />
    },
    respirator: {
      label: 'Particulate / Vapor Mask',
      sub: 'N95 / Half-face OV',
      icon: <Wind className="w-4 h-4 text-purple-500" />
    }
  };

  const current = meta[item] || {
    label: item.replace('_', ' '),
    sub: 'Required gear',
    icon: <Shield className="w-4 h-4 text-slate-500" />
  };

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center justify-between w-full p-2.5 rounded-lg border transition-all text-left ${
          checked
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            {current.icon}
          </div>
          <div>
            <div className="text-xs font-semibold">{current.label}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{current.sub}</div>
          </div>
        </div>
        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
          checked 
            ? 'bg-emerald-600 border-emerald-600 text-white' 
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
        }`}>
          {checked && (
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M2.5 7L5.5 10L11.5 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-xs">
      {current.icon}
      <span className="font-medium">{current.label}</span>
    </div>
  );
};
