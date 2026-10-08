import React, { useState } from 'react';
import { GHS_PICTOGRAMS, PPE_GUIDE, INCOMPATIBLE_COMBINATIONS, GHSPictogramInfo } from '../data/safetyGuideData';
import { GHSIcon } from './GHSIcon';
import { PPEItem } from '../types/equipment';
import { PPEBadge } from './PPEBadge';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Glasses, 
  Zap, 
  Flame, 
  BookOpen, 
  Info,
  CheckCircle2,
  FileCheck2,
  PhoneCall,
  Bot,
  Film,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { HazardRadarSection } from './HazardRadarSection';

interface SafetyHubViewProps {
  onOpenChat?: () => void;
  onOpenVideo?: () => void;
}

export const SafetyHubView: React.FC<SafetyHubViewProps> = ({ onOpenChat, onOpenVideo }) => {
  const [selectedGHS, setSelectedGHS] = useState<GHSPictogramInfo | null>(GHS_PICTOGRAMS['flammable']);
  const [incompatibilitySearch, setIncompatibilitySearch] = useState('');

  const filteredIncompatibilities = INCOMPATIBLE_COMBINATIONS.filter(item => 
    item.groupA.toLowerCase().includes(incompatibilitySearch.toLowerCase()) ||
    item.groupB.toLowerCase().includes(incompatibilitySearch.toLowerCase()) ||
    item.hazard.toLowerCase().includes(incompatibilitySearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white border border-blue-800/40 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Chemical Safety & Compliance Standard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Laboratory Safety Documentation & GHS Matrix
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Standard Operating Procedures (SOPs), multi-vector hazard profiling radar charts, Globally Harmonized System (GHS) chemical pictograms, PPE ratings, and chemical incompatibility reference guides.
          </p>
        </div>

        {/* Background accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-cyan-400 to-transparent pointer-events-none" />
      </div>

      {/* AI Features Quick Access Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gemini Chatbot Feature Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shadow-2xs hover:border-blue-400 transition-colors">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
              <Bot className="w-4 h-4" />
              <span>GEMINI SAFETY CONSULT</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Safety Officer &amp; Live Search Grounding
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Multi-turn STEM advice using Gemini 3.1 Pro (complex reasoning), 3.5 Flash (Google Search grounding), and 3.1 Flash-Lite (rapid triage).
            </p>
            {onOpenChat && (
              <button
                type="button"
                onClick={onOpenChat}
                className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Launch AI Safety Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Veo Video Lab Feature Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shadow-2xs hover:border-indigo-400 transition-colors">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              <Film className="w-4 h-4" />
              <span>VEO 3 VIDEO STUDIO</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Animate Apparatus Photos &amp; Text Simulations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload glassware photos or describe procedures to generate 16:9 or 9:16 videos with Google&apos;s veo-3.1-fast-generate-preview.
            </p>
            {onOpenVideo && (
              <button
                type="button"
                onClick={onOpenVideo}
                className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Open Veo Video Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: EQUIPMENT HAZARD RADAR MATRIX */}
      <HazardRadarSection />

      {/* SECTION 2: GHS PICTOGRAM DIRECTORY */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>GHS Chemical Hazard Pictograms</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select any internationally recognized hazard diamond to view OSHA/ACS safety rules and real chemical examples:
            </p>
          </div>
        </div>

        {/* Pictogram Diamond Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5 mb-6">
          {Object.values(GHS_PICTOGRAMS).map((item) => {
            const isSelected = selectedGHS?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedGHS(item)}
                className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-2 border-blue-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="my-1">
                  <GHSIcon type={item.id as any} size="sm" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[80px] text-center mt-1">
                  {item.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-mono text-slate-400">{item.code}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pictogram Card Details */}
        {selectedGHS && (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <GHSIcon type={selectedGHS.id as any} size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {selectedGHS.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
                      {selectedGHS.code}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {selectedGHS.hazardClass}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Risk Profile:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedGHS.description}
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Standard Precautions:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedGHS.precautions}
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Common Lab Examples:</span>
                <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
                  {selectedGHS.examples}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3: LABORATORY PPE HIERARCHY */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Glasses className="w-5 h-5 text-blue-600" />
            <span>Personal Protective Equipment (PPE) Ratings & Standards</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Engineering standards and chemical resistance breakthrough times for certified laboratory protective gear:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PPE_GUIDE.map((ppe) => (
            <div
              key={ppe.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <PPEBadge item={ppe.id as PPEItem} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900 font-semibold">
                    {ppe.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  {ppe.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-300">Mandatory Context:</strong> {ppe.applicability}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CHEMICAL INCOMPATIBILITY QUICK MATRIX */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>Chemical Incompatibility Dangerous Pairs Matrix</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Reagent pairings that result in violent explosions, toxic gas generation, or uncontrolled runaway reactions:
            </p>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={incompatibilitySearch}
              onChange={(e) => setIncompatibilitySearch(e.target.value)}
              placeholder="Search chemical pair (e.g. Nitric, Water)..."
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredIncompatibilities.map((combo, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/20"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold font-mono text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                  {combo.groupA}
                </span>
                <span className="text-xs font-bold text-slate-400">DO NOT MIX WITH</span>
                <span className="text-xs font-bold font-mono text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                  {combo.groupB}
                </span>
              </div>

              <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium mb-1.5">
                <strong className="text-rose-700 dark:text-rose-300">Reaction Hazard:</strong> {combo.hazard}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <strong className="text-blue-600 dark:text-blue-400">Safe Storage Protocol:</strong> {combo.protocol}
              </div>
            </div>
          ))}

          {filteredIncompatibilities.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
              No matching chemical incompatibility records found for &ldquo;{incompatibilitySearch}&rdquo;.
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: CARDINAL BENCH SAFETY RULES */}
      <section className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xs">
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>Cardinal Chemistry Bench Safety Rules</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="font-bold text-cyan-300 block mb-1">1. AAA Rule (Acid to Water)</span>
            <p className="text-slate-300 leading-relaxed">
              Always Add Acid slowly to water with continuous stirring. Never pour water into concentrated acid; the extreme heat of hydration will flash-boil and project caustic acid.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="font-bold text-cyan-300 block mb-1">2. Zero Open Boiling</span>
            <p className="text-slate-300 leading-relaxed">
              Never heat a completely closed vessel. Expanding vapors create explosive internal pressures. Always ensure apparatus is vented to atmosphere or through a drying tube.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="font-bold text-cyan-300 block mb-1">3. Boiling Stones Timing</span>
            <p className="text-slate-300 leading-relaxed">
              Never drop boiling chips or magnetic stir bars into an already hot or superheated liquid. Doing so triggers instantaneous boiling eruption (bumping).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="font-bold text-cyan-300 block mb-1">4. Ether Peroxide Audit</span>
            <p className="text-slate-300 leading-relaxed">
              Never distill diethyl ether, THF, or dioxane to dryness. Test all opened ether cans with peroxide indicator strips before evaporation.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
