import React from 'react';
import { X, AlertOctagon, Phone, ShieldAlert, Flame, Eye, Droplet, UserX } from 'lucide-react';

interface EmergencyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyDrawer: React.FC<EmergencyDrawerProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 border-2 border-rose-600 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Urgent Bar */}
        <div className="px-5 py-4 bg-rose-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
            <div>
              <h2 className="text-base font-bold tracking-tight">
                Immediate Laboratory Emergency Protocols
              </h2>
              <p className="text-xs text-rose-100">
                Action Steps for Lab Spills, Chemical Splashes & Injury
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-rose-100 hover:text-white hover:bg-rose-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Protocol Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Protocol 1: Chemical in Eyes */}
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-700 dark:text-rose-400 mb-1.5">
              <Eye className="w-4 h-4" />
              <span>1. Chemical Splash into Eyes (Eyewash Station)</span>
            </div>
            <ul className="space-y-1 text-rose-950 dark:text-rose-200 list-disc list-inside leading-relaxed font-medium">
              <li>Proceed immediately to the nearest eyewash unit (within 10 seconds).</li>
              <li>Push handle paddle firmly to start water flow.</li>
              <li>Hold both eyelids wide open with clean fingers and roll eyeballs in all directions.</li>
              <li><strong>Flush continuously for a FULL 15 MINUTES.</strong> Do not stop early.</li>
              <li>Have a colleague call campus emergency response immediately.</li>
            </ul>
          </div>

          {/* Protocol 2: Chemical on Body / Clothing */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-400 mb-1.5">
              <Droplet className="w-4 h-4" />
              <span>2. Large Body Chemical Splash (Emergency Deluge Shower)</span>
            </div>
            <ul className="space-y-1 text-amber-950 dark:text-amber-200 list-disc list-inside leading-relaxed font-medium">
              <li>Pull overhead shower triangle handle immediately.</li>
              <li><strong>Strip off all contaminated clothing, shoes, and jewelry</strong> while under water.</li>
              <li>Disregard modesty—seconds make the difference between a mild burn and permanent disfigurement.</li>
              <li>Remain under water stream for at least 15 continuous minutes.</li>
            </ul>
          </div>

          {/* Protocol 3: Thermal & Cryogenic Burns */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
            <div className="flex items-center gap-2 font-bold text-sm text-blue-800 dark:text-blue-400 mb-1.5">
              <Flame className="w-4 h-4" />
              <span>3. Thermal & Contact Burns</span>
            </div>
            <ul className="space-y-1 text-blue-950 dark:text-blue-200 list-disc list-inside leading-relaxed font-medium">
              <li>Immerse or flush affected burn under cold tap water for at least 20 minutes.</li>
              <li><strong>Do NOT apply ice directly</strong> (causes frostbite necrosis).</li>
              <li>Do NOT pop blisters or apply butter, petroleum jelly, or creams.</li>
              <li>Cover loosely with a clean, dry, sterile lint-free gauze.</li>
            </ul>
          </div>

          {/* Protocol 4: Glass Cuts & Punctures */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-1.5">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              <span>4. Glassware Lacerations & Broken Glass</span>
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
              <li>If wound is bleeding: apply firm direct pressure with sterile pad.</li>
              <li>If chemical contamination is suspected: flush wound gently with water for 5 minutes.</li>
              <li>Never pick up broken glass fragments with bare hands; use brush and dustpan.</li>
              <li>Discard all contaminated glass shards into the yellow &ldquo;Broken Glass Only&rdquo; box.</li>
            </ul>
          </div>

          {/* Emergency Contacts Box */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-600 text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm">Emergency Dispatch</div>
                <div className="text-[11px] text-slate-400">Campus Police / EMS: 911 or Extension 5555</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 block">Poison Control</span>
              <span className="text-xs font-mono font-bold">1-800-222-1222</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
