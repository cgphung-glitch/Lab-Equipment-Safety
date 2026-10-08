import React from 'react';

interface SchematicIconProps {
  type: string;
  className?: string;
}

export const SchematicIcon: React.FC<SchematicIconProps> = ({ type, className = 'w-12 h-12 text-blue-600 dark:text-blue-400' }) => {
  switch (type) {
    case 'burette':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Burette tube */}
          <rect x="44" y="8" width="12" height="66" rx="2" className="stroke-current" />
          {/* Calibration ticks */}
          <line x1="48" y1="18" x2="52" y2="18" />
          <line x1="46" y1="26" x2="54" y2="26" strokeWidth="3" />
          <line x1="48" y1="34" x2="52" y2="34" />
          <line x1="46" y1="42" x2="54" y2="42" strokeWidth="3" />
          <line x1="48" y1="50" x2="52" y2="50" />
          <line x1="46" y1="58" x2="54" y2="58" strokeWidth="3" />
          {/* Stopcock */}
          <rect x="36" y="74" width="28" height="6" rx="3" className="fill-current/30 stroke-current" />
          <circle cx="50" cy="77" r="4" className="fill-current" />
          {/* Tip jet */}
          <path d="M47 80 L49 92 L51 92 L53 80 Z" className="fill-current/20 stroke-current" />
          {/* Liquid droplet */}
          <circle cx="50" cy="96" r="1.5" className="fill-current" />
        </svg>
      );

    case 'rotovap':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Diagonal condenser coil body */}
          <rect x="25" y="15" width="22" height="42" rx="4" transform="rotate(-30 36 36)" className="stroke-current fill-current/10" />
          {/* Inner cooling coil */}
          <path d="M44 14 Q38 24 46 34 Q38 44 46 54" strokeWidth="2" strokeDasharray="3 2" />
          {/* Rotating flask */}
          <circle cx="70" cy="62" r="14" className="stroke-current fill-blue-500/20" />
          <line x1="56" y1="48" x2="62" y2="54" strokeWidth="3" />
          {/* Heated bath base */}
          <path d="M54 74 C54 74 60 84 72 84 C84 84 88 74 88 74" strokeWidth="3" className="stroke-amber-500" />
          <line x1="52" y1="84" x2="90" y2="84" strokeWidth="2" className="stroke-amber-600" />
          {/* Receiving flask */}
          <circle cx="20" cy="66" r="10" className="stroke-current fill-current/15" />
          <line x1="26" y1="56" x2="20" y2="60" strokeWidth="2" />
        </svg>
      );

    case 'hotplate':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Ceramic top plate */}
          <rect x="18" y="44" width="64" height="10" rx="3" className="fill-current/10 stroke-current" />
          {/* Housing chassis */}
          <rect x="18" y="54" width="64" height="26" rx="4" className="stroke-current fill-current/5" />
          {/* Control knobs & digital readout */}
          <rect x="26" y="60" width="20" height="12" rx="2" className="fill-current/20 stroke-current" />
          <circle cx="60" cy="66" r="5" className="fill-current/40 stroke-current" />
          <circle cx="74" cy="66" r="5" className="fill-current/40 stroke-current" />
          {/* Erlenmeyer flask on top */}
          <path d="M42 44 L32 44 L44 22 L44 14 L56 14 L56 22 L68 44 Z" className="stroke-current fill-blue-500/20" />
          {/* Stir bar inside */}
          <rect x="44" y="40" width="12" height="3" rx="1.5" className="fill-current stroke-current" />
        </svg>
      );

    case 'balance':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Base scale unit */}
          <rect x="20" y="66" width="60" height="18" rx="3" className="stroke-current fill-current/10" />
          {/* Digital display */}
          <rect x="36" y="71" width="28" height="8" rx="2" className="fill-emerald-500/20 stroke-emerald-600" />
          {/* Glass draft chamber */}
          <rect x="26" y="18" width="48" height="48" rx="2" className="stroke-current stroke-dasharray-[2 2] fill-current/5" />
          {/* Weighing pan */}
          <rect x="38" y="56" width="24" height="4" rx="1" className="fill-current stroke-current" />
          <line x1="50" y1="60" x2="50" y2="66" strokeWidth="3" />
        </svg>
      );

    case 'fumehood':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Outer enclosure */}
          <rect x="18" y="12" width="64" height="74" rx="4" className="stroke-current" />
          {/* Exhaust canopy header */}
          <rect x="18" y="12" width="64" height="16" rx="2" className="fill-current/20 stroke-current" />
          {/* Sliding sash glass pane */}
          <rect x="24" y="28" width="52" height="34" rx="2" className="stroke-current stroke-dashed fill-cyan-500/10" />
          {/* Airflow arrows */}
          <path d="M38 72 L38 52 M38 52 L34 56 M38 52 L42 56" strokeWidth="2" className="stroke-cyan-500" />
          <path d="M50 72 L50 48 M50 48 L46 52 M50 48 L54 52" strokeWidth="2" className="stroke-cyan-500" />
          <path d="M62 72 L62 52 M62 52 L58 56 M62 52 L66 56" strokeWidth="2" className="stroke-cyan-500" />
          {/* Work surface lip */}
          <line x1="20" y1="76" x2="80" y2="76" strokeWidth="4" />
        </svg>
      );

    case 'volumetric_flask':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Neck */}
          <path d="M46 14 L46 44 L30 76 C27 82 32 88 40 88 L60 88 C68 88 73 82 70 76 L54 44 L54 14 Z" className="stroke-current fill-blue-500/15" />
          {/* Etched graduation ring */}
          <line x1="44" y1="32" x2="56" y2="32" strokeWidth="2.5" className="stroke-amber-500" />
          {/* Stopper */}
          <rect x="43" y="6" width="14" height="8" rx="2" className="fill-current stroke-current" />
        </svg>
      );

    case 'erlenmeyer':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Conical body */}
          <path d="M44 14 L44 26 L22 78 C20 84 24 88 30 88 L70 88 C76 88 80 84 78 78 L56 26 L56 14 Z" className="stroke-current fill-blue-500/15" />
          {/* Rim */}
          <ellipse cx="50" cy="14" rx="7" ry="2" className="fill-current/20 stroke-current" />
          {/* Liquid level */}
          <path d="M29 74 Q50 78 71 74" strokeWidth="2" className="stroke-blue-500/80" />
        </svg>
      );

    case 'buchner':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Heavy flask body */}
          <path d="M42 42 L42 46 L24 82 C22 86 26 88 32 88 L68 88 C74 88 78 86 76 82 L58 46 L58 42 Z" className="stroke-current fill-current/10" strokeWidth="3" />
          {/* Sidearm vacuum tubulation */}
          <path d="M58 46 L76 46 L76 52" strokeWidth="3" className="stroke-cyan-500" />
          {/* Porcelain funnel */}
          <path d="M30 14 L70 14 L60 36 L40 36 Z" className="fill-current/25 stroke-current" strokeWidth="2.5" />
          <rect x="46" y="36" width="8" height="12" className="fill-current stroke-current" />
          {/* Perforated plate dots */}
          <circle cx="44" cy="30" r="1.5" className="fill-current" />
          <circle cx="50" cy="30" r="1.5" className="fill-current" />
          <circle cx="56" cy="30" r="1.5" className="fill-current" />
        </svg>
      );

    case 'separatory_funnel':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Pear-shaped body */}
          <path d="M44 14 L44 20 C32 24 24 38 24 50 C24 64 44 76 46 80 L46 88 L54 88 L54 80 C56 76 76 64 76 50 C76 38 68 24 56 20 L56 14 Z" className="stroke-current fill-current/10" />
          {/* Stopcock */}
          <rect x="38" y="80" width="24" height="4" rx="2" className="fill-current stroke-current" />
          {/* Stopper */}
          <rect x="44" y="6" width="12" height="8" rx="2" className="fill-current stroke-current" />
        </svg>
      );

    case 'bunsen_burner':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Heavy base */}
          <rect x="26" y="80" width="48" height="10" rx="3" className="fill-current/20 stroke-current" />
          {/* Central barrel */}
          <rect x="44" y="38" width="12" height="42" rx="1" className="stroke-current" />
          {/* Gas hose barb */}
          <line x1="44" y1="72" x2="22" y2="72" strokeWidth="3" className="stroke-current" />
          {/* Air collar */}
          <rect x="42" y="62" width="16" height="8" rx="2" className="fill-current/30 stroke-current" />
          {/* Flame */}
          <path d="M50 8 C42 22 42 34 50 38 C58 34 58 22 50 8 Z" className="stroke-amber-500 fill-amber-400/40" />
          <path d="M50 20 C46 27 46 33 50 36 C54 33 54 27 50 20 Z" className="stroke-cyan-400 fill-cyan-300" />
        </svg>
      );

    case 'ph_meter':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Meter console */}
          <rect x="18" y="40" width="50" height="44" rx="5" className="stroke-current fill-current/10" />
          {/* Large digital readout */}
          <rect x="24" y="48" width="38" height="16" rx="2" className="stroke-emerald-500 fill-emerald-500/20" />
          {/* Electrode stand arm & probe */}
          <path d="M68 62 L82 30 L82 72" strokeWidth="3" className="stroke-current" />
          <rect x="80" y="58" width="5" height="26" rx="2.5" className="fill-cyan-500/40 stroke-cyan-500" />
          <circle cx="82.5" cy="85" r="2.5" className="fill-cyan-400" />
        </svg>
      );

    case 'heating_mantle':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Spherical mantle bowl */}
          <path d="M22 44 C22 74 78 74 78 44 Z" className="stroke-current fill-amber-500/15" strokeWidth="3" />
          {/* Woven fabric texture lines */}
          <path d="M30 46 C34 66 66 66 70 46" strokeDasharray="3 3" />
          {/* Flask neck protruding */}
          <path d="M44 44 L44 18 L56 18 L56 44" strokeWidth="2.5" className="stroke-blue-400" />
          {/* Base support ring */}
          <rect x="28" y="74" width="44" height="8" rx="3" className="stroke-current fill-current/20" />
        </svg>
      );

    case 'spectrophotometer':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Main instrument chassis */}
          <rect x="16" y="32" width="68" height="48" rx="5" className="stroke-current fill-current/10" />
          {/* Sample compartment lid */}
          <rect x="22" y="38" width="24" height="20" rx="3" className="stroke-current fill-current/20" />
          {/* Display & keypad */}
          <rect x="52" y="38" width="26" height="14" rx="2" className="stroke-cyan-500 fill-cyan-500/20" />
          {/* Cuvette symbol */}
          <rect x="30" y="44" width="8" height="10" rx="1" className="stroke-cyan-400 fill-white/20" />
        </svg>
      );

    case 'centrifuge':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Domed enclosure */}
          <path d="M20 54 C20 34 33 22 50 22 C67 22 80 34 80 54 L80 76 L20 76 Z" className="stroke-current fill-current/10" />
          {/* Circular viewport */}
          <circle cx="50" cy="44" r="14" className="stroke-current fill-current/15" />
          <circle cx="50" cy="44" r="3" className="fill-current" />
          {/* Balanced rotor arms */}
          <line x1="40" y1="44" x2="60" y2="44" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="50" y1="34" x2="50" y2="54" strokeWidth="2" strokeDasharray="2 2" />
          {/* Status buttons */}
          <rect x="34" y="66" width="32" height="6" rx="2" className="fill-current/30 stroke-current" />
        </svg>
      );

    case 'condenser':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Outer water jacket */}
          <rect x="36" y="24" width="28" height="52" rx="4" className="stroke-cyan-500 fill-cyan-500/10" />
          {/* Inner vapor tube */}
          <rect x="44" y="8" width="12" height="84" rx="2" className="stroke-current fill-transparent" />
          {/* Water inlet hose barb (bottom) */}
          <path d="M36 64 L22 64 L22 70" strokeWidth="2.5" className="stroke-cyan-500" />
          {/* Water outlet hose barb (top) */}
          <path d="M64 34 L78 34 L78 28" strokeWidth="2.5" className="stroke-cyan-500" />
        </svg>
      );

    case 'desiccator':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Heavy glass bell lid */}
          <path d="M50 14 C48 10 52 10 50 14 M30 36 C30 22 40 18 50 18 C60 18 70 22 70 36" className="stroke-current" />
          <circle cx="50" cy="14" r="4" className="fill-current stroke-current" />
          {/* Lower bowl */}
          <path d="M26 38 L26 70 C26 78 36 84 50 84 C64 84 74 78 74 70 L74 38 Z" className="stroke-current fill-current/10" />
          {/* Flange rim line */}
          <line x1="22" y1="37" x2="78" y2="37" strokeWidth="3.5" className="stroke-current" />
          {/* Porcelain plate */}
          <line x1="30" y1="58" x2="70" y2="58" strokeWidth="2.5" strokeDasharray="3 3" />
        </svg>
      );

    case 'safety_shower':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Shower head bell */}
          <path d="M34 26 L66 26 L58 14 L42 14 Z" className="fill-emerald-500/20 stroke-emerald-600" />
          {/* Supply pipe */}
          <line x1="50" y1="6" x2="50" y2="14" strokeWidth="3" className="stroke-emerald-600" />
          {/* Pull triangle rod */}
          <line x1="64" y1="26" x2="64" y2="52" strokeWidth="2" className="stroke-amber-500" />
          <polygon points="64,52 60,60 68,60" className="fill-amber-500 stroke-amber-500" />
          {/* Deluge water spray lines */}
          <path d="M38 32 L30 68 M44 32 L40 68 M50 32 L50 68 M56 32 L60 68 M62 32 L70 68" strokeWidth="2" strokeDasharray="2 3" className="stroke-cyan-400" />
          {/* Eyewash bowl */}
          <path d="M32 76 C32 86 68 86 68 76 Z" className="fill-emerald-500/30 stroke-emerald-600" />
          <circle cx="44" cy="74" r="2" className="fill-cyan-400" />
          <circle cx="56" cy="74" r="2" className="fill-cyan-400" />
        </svg>
      );

    case 'crucible':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Porcelain crucible cup */}
          <path d="M32 28 L38 68 C39 74 44 78 50 78 C56 78 61 74 62 68 L68 28 Z" className="stroke-current fill-current/15" />
          {/* Lid with handle */}
          <path d="M28 26 L72 26" strokeWidth="3" className="stroke-current" />
          <circle cx="50" cy="20" r="3" className="fill-current stroke-current" />
          {/* Pipestem triangle support */}
          <polygon points="50,66 22,88 78,88" strokeWidth="1.5" strokeDasharray="3 2" className="stroke-amber-600" />
        </svg>
      );

    case 'spill_kit':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Heavy safety pail */}
          <path d="M28 32 L34 82 C35 86 42 88 50 88 C58 88 65 86 66 82 L72 32 Z" className="fill-amber-500/20 stroke-amber-500" strokeWidth="3" />
          {/* Pail lid rim */}
          <rect x="24" y="24" width="52" height="8" rx="2" className="fill-amber-500 stroke-amber-500" />
          {/* Cross / First Aid symbol */}
          <rect x="46" y="44" width="8" height="24" rx="2" className="fill-rose-500 stroke-rose-500" />
          <rect x="38" y="52" width="24" height="8" rx="2" className="fill-rose-500 stroke-rose-500" />
        </svg>
      );

    case 'column':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Glass column cylinder */}
          <rect x="40" y="10" width="20" height="66" rx="2" className="stroke-current fill-current/10" />
          {/* Silica packing bed */}
          <rect x="42" y="24" width="16" height="42" className="fill-amber-500/20 stroke-none" />
          {/* Separated colored chromatographic bands */}
          <line x1="42" y1="36" x2="58" y2="36" strokeWidth="3" className="stroke-rose-500" />
          <line x1="42" y1="48" x2="58" y2="48" strokeWidth="3" className="stroke-amber-500" />
          <line x1="42" y1="58" x2="58" y2="58" strokeWidth="3" className="stroke-blue-500" />
          {/* Fritted glass disc */}
          <rect x="42" y="66" width="16" height="4" className="fill-current stroke-current" />
          {/* Stopcock & tip */}
          <rect x="36" y="74" width="28" height="4" rx="2" className="fill-current stroke-current" />
          <path d="M48 78 L50 90 L52 78 Z" className="fill-current stroke-current" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
          <path d="M44 14 L44 26 L22 78 C20 84 24 88 30 88 L70 88 C76 88 80 84 78 78 L56 26 L56 14 Z" className="stroke-current fill-current/10" />
          <circle cx="50" cy="56" r="6" className="fill-current/30" />
        </svg>
      );
  }
};
