import React, { useState } from 'react';
import { EquipmentItem, HazardLevel } from '../types/equipment';
import { EquipmentPhoto } from './EquipmentPhoto';
import { GHSIcon } from './GHSIcon';
import { PPEBadge } from './PPEBadge';
import { EquipmentHazardRadar } from './EquipmentHazardRadar';
import { 
  X, 
  Bookmark, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Maximize2, 
  Minimize2, 
  Printer, 
  Copy, 
  Check, 
  Thermometer, 
  Layers, 
  Gauge, 
  Award,
  Sparkles,
  Bot,
  Film
} from 'lucide-react';

interface EquipmentDetailModalProps {
  item: EquipmentItem;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  checkedPreInspections: Record<string, boolean>;
  onTogglePreInspection: (itemId: string, index: number) => void;
  onOpenChat?: (query: string) => void;
  onOpenVideo?: (item: EquipmentItem) => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  checkedPreInspections,
  onTogglePreInspection,
  onOpenChat,
  onOpenVideo
}) => {
  const [activeTab, setActiveTab] = useState<'safety' | 'sop' | 'specs' | 'incompatibilities'>('safety');
  const [imageZoom, setImageZoom] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Calculate pre-inspection completion
  const totalChecks = item.safety.sop.preInspection.length;
  const completedChecks = item.safety.sop.preInspection.filter((_, idx) => 
    checkedPreInspections[`${item.id}-${idx}`]
  ).length;
  const isAllCleared = completedChecks === totalChecks && totalChecks > 0;

  const handleCopySOP = () => {
    const text = `CHEMISTRY LAB SAFETY & SOP SUMMARY: ${item.name}
Hazard Level: ${item.safety.hazardLevel.toUpperCase()}
Material: ${item.specs.material}

PRIMARY HAZARDS:
${item.safety.primaryHazards.map(h => `• ${h}`).join('\n')}

REQUIRED PPE:
${item.safety.requiredPPE.map(p => `• ${p.replace('_', ' ').toUpperCase()}`).join('\n')}

PRE-USE INSPECTION:
${item.safety.sop.preInspection.map((s, i) => `${i + 1}. ${s}`).join('\n')}

SAFE OPERATION:
${item.safety.sop.safeOperation.map((s, i) => `${i + 1}. ${s}`).join('\n')}

EMERGENCY PROTOCOL:
${item.safety.sop.emergencyProtocol.map(e => `! ${e}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getHazardMeta = (level: HazardLevel) => {
    switch (level) {
      case 'critical':
        return {
          label: 'Critical Hazard Level',
          bg: 'bg-rose-50 dark:bg-rose-950/40',
          border: 'border-rose-200 dark:border-rose-900/60',
          text: 'text-rose-700 dark:text-rose-300',
          badge: 'bg-rose-600 text-white'
        };
      case 'high':
        return {
          label: 'High Hazard Level',
          bg: 'bg-amber-50 dark:bg-amber-950/40',
          border: 'border-amber-200 dark:border-amber-900/60',
          text: 'text-amber-700 dark:text-amber-300',
          badge: 'bg-amber-600 text-white'
        };
      case 'moderate':
        return {
          label: 'Moderate Hazard Level',
          bg: 'bg-yellow-50 dark:bg-yellow-950/40',
          border: 'border-yellow-200 dark:border-yellow-900/60',
          text: 'text-yellow-700 dark:text-yellow-300',
          badge: 'bg-yellow-600 text-white'
        };
      case 'low':
        return {
          label: 'Low Hazard Level',
          bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          border: 'border-emerald-200 dark:border-emerald-900/60',
          text: 'text-emerald-700 dark:text-emerald-300',
          badge: 'bg-emerald-600 text-white'
        };
    }
  };

  const hazard = getHazardMeta(item.safety.hazardLevel);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal / Sheet Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
        
        {/* Mobile Drag Handle */}
        <div className="sm:hidden w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Modal Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
              {item.categoryLabel}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate font-mono">
              {item.specs.material.split('/')[0]}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Copy SOP Button */}
            <button
              onClick={handleCopySOP}
              className="min-h-[38px] px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 transition-colors"
              title="Copy Safety SOP to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy SOP'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="min-h-[38px] px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:flex items-center gap-1 transition-colors"
              title="Print documentation sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={(e) => onToggleBookmark(item.id, e)}
              className={`min-h-[38px] min-w-[38px] rounded-lg border flex items-center justify-center transition-colors ${
                isBookmarked
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              aria-label="Bookmark equipment"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Visual Area & Core Title */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200 dark:border-slate-800">
            {/* Visual Media Column */}
            <div className={`md:col-span-5 bg-slate-950 relative overflow-hidden flex items-center justify-center ${imageZoom ? 'md:col-span-12' : ''}`}>
              <div className="w-full relative">
                <EquipmentPhoto
                  imageUrl={item.imageUrl}
                  name={item.name}
                  schematicIcon={item.schematicIcon}
                  aspectRatio={imageZoom ? '16/9' : '4/3'}
                  highResBanner={!!item.imageUrl}
                  className="w-full max-h-[360px]"
                />

                {/* Image Zoom Toggle */}
                <button
                  type="button"
                  onClick={() => setImageZoom(!imageZoom)}
                  className="absolute bottom-3 right-3 min-w-[36px] min-h-[36px] rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/10 transition-colors"
                  title={imageZoom ? 'Standard View' : 'Expanded View'}
                >
                  {imageZoom ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Summary Column */}
            {!imageZoom && (
              <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${hazard.badge}`}>
                      {hazard.label}
                    </span>
                    {item.aliases.length > 0 && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                        aka &ldquo;{item.aliases[0]}&rdquo;
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h1>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bench Warning Banner */}
                  <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
                      <strong className="font-semibold">Bench Warning:</strong> {item.safety.benchWarning}
                    </p>
                  </div>

                  {/* AI Quick Launch Row */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {onOpenChat && (
                      <button
                        type="button"
                        onClick={() => {
                          onOpenChat(`What are the critical safety considerations, chemical incompatibilities, and SOP procedures for ${item.name}?`);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 transition-colors"
                      >
                        <Bot className="w-3.5 h-3.5 text-blue-500" />
                        <span>Ask AI Safety Officer</span>
                      </button>
                    )}

                    {onOpenVideo && (
                      <button
                        type="button"
                        onClick={() => {
                          onOpenVideo(item);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 transition-colors"
                      >
                        <Film className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Animate in Veo Video Lab</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary Applications */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Primary Experimental Uses
                  </span>
                  <ul className="mt-1.5 space-y-1">
                    {item.primaryApplications.map((app, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation Controls (Interactive Filter Segment) */}
          <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2 flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'safety'
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Safety & Hazards</span>
            </button>

            <button
              onClick={() => setActiveTab('sop')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 relative ${
                activeTab === 'sop'
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Standard Operating Procedure (SOP)</span>
              {isAllCleared && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('incompatibilities')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'incompatibilities'
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Chemical Incompatibilities ({item.safety.incompatibilities.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'specs'
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span>Technical Specs</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-5 sm:p-6 space-y-6">

            {/* TAB 1: SAFETY & HAZARDS */}
            {activeTab === 'safety' && (
              <div className="space-y-6">
                {/* 4-Vector Radar Hazard Profile */}
                <EquipmentHazardRadar item={item} />

                {/* GHS Hazard Pictograms Section */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    GHS Hazard Classifications
                  </h3>
                  {item.safety.ghsPictograms.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {item.safety.ghsPictograms.map((pictogram) => (
                        <div
                          key={pictogram}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800"
                        >
                          <GHSIcon type={pictogram} size="md" />
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                              {pictogram.replace('_', ' ')}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              Active GHS Diamond
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300">
                      Non-hazardous under routine passive containment.
                    </div>
                  )}
                </div>

                {/* Primary Hazards Callout */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Specific Failure Modes & Bench Hazards
                  </h3>
                  <div className="space-y-2">
                    {item.safety.primaryHazards.map((hazardText, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 text-xs text-rose-950 dark:text-rose-200"
                      >
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{hazardText}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required PPE Gear Checklist */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Mandatory Personal Protective Equipment (PPE)
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {item.safety.requiredPPE.length} items required
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.safety.requiredPPE.map((ppe) => (
                      <PPEBadge key={ppe} item={ppe} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: STANDARD OPERATING PROCEDURE (SOP) & INTERACTIVE CHECKLIST */}
            {activeTab === 'sop' && (
              <div className="space-y-6">
                
                {/* Interactive Bench Clearance Verification Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-5 h-5 ${isAllCleared ? 'text-emerald-500' : 'text-blue-600'}`} />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Pre-Use Inspection Clearance Checklist
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
                      {completedChecks} / {totalChecks} Cleared
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                    Verify each physical safety condition before applying heat, vacuum, or introducing reagents:
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isAllCleared ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${totalChecks > 0 ? (completedChecks / totalChecks) * 100 : 0}%` }}
                    />
                  </div>

                  {/* Interactive checkboxes */}
                  <div className="space-y-2">
                    {item.safety.sop.preInspection.map((checkText, idx) => {
                      const isChecked = !!checkedPreInspections[`${item.id}-${idx}`];
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => onTogglePreInspection(item.id, idx)}
                          className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                            isChecked
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs leading-relaxed font-medium">
                            {checkText}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {isAllCleared && (
                    <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span>Bench Clearance Complete: All pre-inspection requirements verified. Proceed with experiment.</span>
                    </div>
                  )}
                </div>

                {/* Safe Operation Steps */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Safe Operational Procedure (Step-by-Step)
                  </h3>
                  <div className="space-y-2.5">
                    {item.safety.sop.safeOperation.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs"
                      >
                        <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-mono font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cleaning & Storage Protocol */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Post-Use Decontamination & Storage Protocol
                  </h3>
                  <div className="space-y-2">
                    {item.safety.sop.cleaningAndStorage.map((cleanStep, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/30"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{cleanStep}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Breakage / Spill Response */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-3">
                    Emergency Incident & Spill Response Protocol
                  </h3>
                  <div className="space-y-2">
                    {item.safety.sop.emergencyProtocol.map((emergStep, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/25 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200"
                      >
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{emergStep}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: CHEMICAL INCOMPATIBILITIES */}
            {activeTab === 'incompatibilities' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    The following reagents react adversely with this apparatus material or operating mechanism. Consult this list before charging reaction flasks.
                  </span>
                </div>

                <div className="space-y-3">
                  {item.safety.incompatibilities.map((incomp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">
                          {incomp.reagent}
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                          Incompatible Reagent
                        </span>
                      </div>

                      <div className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                        <strong className="text-rose-700 dark:text-rose-300">Hazard:</strong> {incomp.risk}
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        <strong className="text-blue-600 dark:text-blue-400">Guidance:</strong> {incomp.guidance}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: TECHNICAL SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                        <td className="p-3 font-semibold text-slate-600 dark:text-slate-400 w-1/3">Construction Material</td>
                        <td className="p-3 text-slate-900 dark:text-white font-medium">{item.specs.material}</td>
                      </tr>
                      {item.specs.capacity && (
                        <tr>
                          <td className="p-3 font-semibold text-slate-600 dark:text-slate-400">Standard Capacity</td>
                          <td className="p-3 text-slate-900 dark:text-white font-mono tabular-nums">{item.specs.capacity}</td>
                        </tr>
                      )}
                      {item.specs.temperatureRange && (
                        <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                          <td className="p-3 font-semibold text-slate-600 dark:text-slate-400">Temperature Limits</td>
                          <td className="p-3 text-slate-900 dark:text-white font-mono tabular-nums">{item.specs.temperatureRange}</td>
                        </tr>
                      )}
                      {item.specs.pressureRating && (
                        <tr>
                          <td className="p-3 font-semibold text-slate-600 dark:text-slate-400">Pressure / Vacuum Rating</td>
                          <td className="p-3 text-slate-900 dark:text-white font-mono tabular-nums">{item.specs.pressureRating}</td>
                        </tr>
                      )}
                      {item.specs.tolerance && (
                        <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                          <td className="p-3 font-semibold text-slate-600 dark:text-slate-400">Measurement Tolerance</td>
                          <td className="p-3 text-slate-900 dark:text-white font-mono tabular-nums">{item.specs.tolerance}</td>
                        </tr>
                      )}
                      {item.specs.standards && (
                        <tr>
                          <td className="p-3 font-semibold text-slate-600 dark:text-slate-400">Regulatory Standards</td>
                          <td className="p-3 text-slate-900 dark:text-white font-mono">{item.specs.standards}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>Laboratory Grade Calibration Note</span>
                  </div>
                  <p className="leading-relaxed">
                    All volumetric and analytical specifications are calibrated against standard reference benchmarks (ASTM, ISO, DIN). Variations in ambient temperature beyond 20°C may introduce volumetric expansion errors.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {isAllCleared ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Bench Inspection Cleared
              </span>
            ) : (
              <span>Pre-Use Inspection: {completedChecks}/{totalChecks} checks done</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors min-h-[44px]"
            >
              Done Reviewing
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
