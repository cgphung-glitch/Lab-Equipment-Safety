import React, { useState, useEffect, useRef } from 'react';
import { 
  Film, 
  Upload, 
  Sparkles, 
  Play, 
  Download, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Maximize, 
  Layers, 
  Beaker,
  Image as ImageIcon,
  Flame,
  FileVideo
} from 'lucide-react';
import { EQUIPMENT_LIST } from '../data/equipmentData';

interface GeneratedVideoRecord {
  id: string;
  operationName: string;
  prompt: string;
  mode: 'image-to-video' | 'text-to-video';
  aspectRatio: '16:9' | '9:16';
  thumbnailUrl?: string;
  createdAt: string;
}

const SAMPLE_TEXT_PROMPTS = [
  'Cinematic slow motion macro video of a magnetic stirrer spinning a crystal-clear vortex in an Erlenmeyer flask, with gentle amber backlighting.',
  'Precision demonstration of an analytical chemist opening a burette stopcock to deliver exact micro-drops into a conical flask.',
  'Rotary evaporator spinning an organic reaction mixture under deep vacuum with vapor condensing into cold coils.',
  'A chemical fume hood sash closing smoothly while turbulent colored mist is aerodynamically evacuated through rear baffles.',
  'Ceramic heating plate gently warming a round-bottom flask connected to a Liebig reflux condenser with steady solvent reflux boiling.',
];

const PRESET_APPARATUS_IMAGES = [
  {
    name: 'Rotary Evaporator (Vacuum Distillation)',
    url: '/src/assets/images/rotary_evaporator_lab_1791406969764.jpg',
    defaultPrompt: 'Smooth continuous rotation of the evaporating flask inside the heated water bath, with clear solvent droplets forming and cascading along the helical condenser coils.',
  },
  {
    name: 'Burette (Titration Station)',
    url: '/src/assets/images/glassware_buret_titration_1791406960839.jpg',
    defaultPrompt: 'Laboratory technician gently adjusting the PTFE stopcock, dispensing individual drops of standard acid solution into a swirling flask.',
  },
  {
    name: 'Hotplate Magnetic Stirrer',
    url: '/src/assets/images/magnetic_hotplate_stirrer_1791406979233.jpg',
    defaultPrompt: 'Vigorous swirling liquid vortex created by a white Teflon stir bar on a heated ceramic plate with soft amber digital LED readouts.',
  },
  {
    name: 'Analytical Balance (Precision Scale)',
    url: '/src/assets/images/analytical_balance_scale_1791406988684.jpg',
    defaultPrompt: 'Slowly sliding the glass draft shield closed, with digital 4-decimal analytical LED display stabilizing with microgram precision.',
  },
  {
    name: 'Fume Hood Safety Station',
    url: '/src/assets/images/fume_hood_safety_station_1791406999400.jpg',
    defaultPrompt: 'Aerodynamic laminar airflow moving steadily across the chemical bench beneath the sash, venting volatile vapors through exhaust ducting.',
  },
];

export const VeoVideoLab: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'image-to-video' | 'text-to-video'>('image-to-video');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  
  // Text prompt state
  const [promptText, setPromptText] = useState(
    'Cinematic slow motion macro video of a magnetic stirrer spinning a crystal-clear vortex in an Erlenmeyer flask, with gentle amber backlighting.'
  );

  // Image input state
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);

  // Video generation execution state
  const [generating, setGenerating] = useState(false);
  const [currentOperationName, setCurrentOperationName] = useState<string | null>(null);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active playing video
  const [readyVideoUrl, setReadyVideoUrl] = useState<string | null>(null);
  const [historyList, setHistoryList] = useState<GeneratedVideoRecord[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with the first preset image
  useEffect(() => {
    if (activeMode === 'image-to-video' && !uploadedImageBase64) {
      loadPresetImage(0);
    }
  }, [activeMode]);

  const loadPresetImage = async (index: number) => {
    try {
      setSelectedPresetIndex(index);
      const preset = PRESET_APPARATUS_IMAGES[index];
      setImagePreviewUrl(preset.url);
      setPromptText(preset.defaultPrompt);

      // Fetch the asset and convert to base64
      const response = await fetch(preset.url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.warn('Could not pre-load preset image:', e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadedImageBase64(result);
      setImagePreviewUrl(result);
      setSelectedPresetIndex(-1);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleStartGeneration = async () => {
    if (generating) return;

    setErrorMsg(null);
    setReadyVideoUrl(null);
    setGenerating(true);
    setElapsedSeconds(0);
    setProgressStatus('Initializing Veo 3 preview video pipeline...');

    // Start elapsed counter
    elapsedTimerRef.current = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);

    try {
      const payload: any = {
        prompt: promptText.trim(),
        aspectRatio,
      };

      if (activeMode === 'image-to-video') {
        if (!uploadedImageBase64) {
          throw new Error('Please select or upload a laboratory apparatus photo to animate.');
        }
        payload.imageBase64 = uploadedImageBase64;
        payload.mimeType = uploadedImageBase64.startsWith('data:image/jpeg') ? 'image/jpeg' : 'image/png';
      }

      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server failed to start video generation (${res.status})`);
      }

      const data = await res.json();
      const opName = data.operationName;
      setCurrentOperationName(opName);
      setProgressStatus('Veo 3 model is rendering frames. This usually takes 30-90 seconds...');

      // Start status polling
      startPolling(opName);
    } catch (err: any) {
      console.error('Generation launch error:', err);
      let msg = err.message || 'Failed to start Veo video generation';
      if (msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
        msg = 'Video generation quota exceeded. Veo 3 preview models require a billing-enabled key in the Settings > Secrets panel.';
      }
      setErrorMsg(msg);
      setGenerating(false);
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    }
  };

  const startPolling = (opName: string) => {
    const progressMessages = [
      'Simulating chemical apparatus motion & fluid dynamics...',
      'Synthesizing photorealistic glass reflections and optical refraction...',
      'Rendering temporal coherence across 720p video sequence...',
      'Assembling final MP4 stream with Veo 3 engine...',
      'Finalizing video render, preparing download stream...'
    ];

    let messageIdx = 0;

    pollTimerRef.current = setInterval(async () => {
      try {
        messageIdx = (messageIdx + 1) % progressMessages.length;
        setProgressStatus(progressMessages[messageIdx]);

        const statusRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName }),
        });

        if (!statusRes.ok) {
          throw new Error('Status polling request failed');
        }

        const statusData = await statusRes.json();

        if (statusData.error) {
          throw new Error(statusData.error.message || 'Video generation encountered an error');
        }

        if (statusData.done) {
          // Video is completed!
          if (pollTimerRef.current) clearInterval(pollTimerRef.current);
          if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);

          setProgressStatus('Video generation complete! Loading video stream...');
          
          // Video download endpoint URL
          const streamUrl = `/api/video-download?operationName=${encodeURIComponent(opName)}`;
          setReadyVideoUrl(streamUrl);
          setGenerating(false);

          // Add to local session history
          const newRecord: GeneratedVideoRecord = {
            id: `video-${Date.now()}`,
            operationName: opName,
            prompt: promptText,
            mode: activeMode,
            aspectRatio,
            thumbnailUrl: imagePreviewUrl || undefined,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setHistoryList(prev => [newRecord, ...prev]);
        }
      } catch (err: any) {
        console.error('Polling error:', err);
        setErrorMsg(err.message || 'Error occurred while waiting for video completion');
        setGenerating(false);
        if (pollTimerRef.current) clearInterval(pollTimerRef.current);
        if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
      }
    }, 5000); // Poll every 5 seconds
  };

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/40 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-2">
            <Film className="w-4 h-4" />
            <span>Veo 3 Video Laboratory Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Chemical Apparatus Video Generation
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Generate high-fidelity laboratory equipment simulations and animate certified apparatus photography using Google&apos;s <strong>veo-3.1-fast-generate-preview</strong> model with 16:9 or 9:16 aspect ratios.
          </p>
        </div>

        {/* Background visual element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 bg-radial from-indigo-500 to-transparent pointer-events-none" />
      </div>

      {/* Main Studio Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Panel: Configuration & Generation Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
          
          {/* Mode Tabs: Animate Image vs Text-to-Video */}
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Generation Pipeline:
            </span>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setActiveMode('image-to-video');
                  setErrorMsg(null);
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeMode === 'image-to-video'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Animate Photo into Video</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMode('text-to-video');
                  setErrorMsg(null);
                }}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeMode === 'text-to-video'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Text-to-Video Synthesis</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Image Selection & Upload Area */}
          {activeMode === 'image-to-video' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-blue-500" />
                  <span>Input Apparatus Image (Starting Frame)</span>
                </span>
                
                {/* Custom File Upload Trigger */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload custom photo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Pre-Loaded Chemical Apparatus Presets */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
                  Or select from certified lab apparatus photos:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRESET_APPARATUS_IMAGES.map((preset, idx) => {
                    const isSelected = selectedPresetIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => loadPresetImage(idx)}
                        className={`group p-1.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/40 dark:bg-blue-950/40'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300'
                        }`}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-1">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 line-clamp-1 block">
                          {preset.name.split(' (')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Image Preview Card */}
              {imagePreviewUrl && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300 dark:border-slate-600">
                    <img
                      src={imagePreviewUrl}
                      alt="Selected Frame"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                      {selectedPresetIndex >= 0 ? PRESET_APPARATUS_IMAGES[selectedPresetIndex].name : 'Custom Uploaded Photo'}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      Ready to animate into motion with Veo 3 video preview model.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Aspect Ratio Selector (16:9 Landscape vs 9:16 Portrait) */}
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Aspect Ratio Format:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  aspectRatio === '16:9'
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-5 border-2 border-current rounded-xs shrink-0 flex items-center justify-center text-[9px] font-bold font-mono">
                  16:9
                </div>
                <div>
                  <div className="text-xs font-bold">16:9 Landscape</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Desktop / Presentation widescreen</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  aspectRatio === '9:16'
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="w-5 h-8 border-2 border-current rounded-xs shrink-0 flex items-center justify-center text-[9px] font-bold font-mono">
                  9:16
                </div>
                <div>
                  <div className="text-xs font-bold">9:16 Portrait</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Mobile vertical / Story format</div>
                </div>
              </button>
            </div>
          </div>

          {/* Text Guidance Prompt Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="prompt-input" className="text-xs font-bold text-slate-900 dark:text-white">
                {activeMode === 'image-to-video' ? 'Animation Directives & Dynamics:' : 'Text Simulation Description:'}
              </label>
              <span className="text-[10px] font-mono text-slate-400">
                Model: veo-3.1-fast-generate-preview
              </span>
            </div>
            
            <textarea
              id="prompt-input"
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Describe motion dynamics, bubbling liquids, vapor condensation, rotating flasks, or heating elements..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />

            {/* Quick Prompt Ideas */}
            {activeMode === 'text-to-video' && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono text-slate-400 self-center">Try:</span>
                {SAMPLE_TEXT_PROMPTS.slice(0, 3).map((sp, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setPromptText(sp)}
                    className="text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors truncate max-w-xs"
                  >
                    {sp.slice(0, 45)}...
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          <div>
            <button
              type="button"
              disabled={generating || !promptText.trim() || (activeMode === 'image-to-video' && !uploadedImageBase64)}
              onClick={handleStartGeneration}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {generating 
                  ? 'Synthesizing with Veo 3 Video Engine...' 
                  : activeMode === 'image-to-video' 
                    ? 'Animate Photo into Video' 
                    : 'Generate Lab Video from Text'}
              </span>
            </button>
          </div>

          {/* Error Callout */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Veo Generation Error:</strong> {errorMsg}
              </div>
            </div>
          )}

        </div>

        {/* Right Panel: Video Screen & Player (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-xs flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
            
            {/* Header within screen */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 pb-3 border-b border-slate-800 mb-4">
              <span className="flex items-center gap-1.5">
                <FileVideo className="w-3.5 h-3.5 text-cyan-400" />
                <span>VEO 3 VIDEO OUTPUT</span>
              </span>
              <span>{aspectRatio}</span>
            </div>

            {/* STATE 1: GENERATING IN PROGRESS */}
            {generating && (
              <div className="w-full flex flex-col items-center justify-center text-center py-10 px-4 space-y-4 animate-in fade-in">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
                  <Film className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto" />
                </div>

                <div className="space-y-1 max-w-sm">
                  <h3 className="text-sm font-bold text-white">
                    Synthesizing Laboratory Video
                  </h3>
                  <p className="text-xs text-cyan-300 font-mono">
                    Elapsed: {elapsedSeconds}s
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-2">
                    {progressStatus}
                  </p>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden max-w-xs mt-2">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse w-full" />
                </div>

                <span className="text-[10px] text-slate-500">
                  Model: veo-3.1-fast-generate-preview
                </span>
              </div>
            )}

            {/* STATE 2: VIDEO READY FOR PLAYBACK */}
            {!generating && readyVideoUrl && (
              <div className="w-full flex flex-col items-center space-y-4 animate-in fade-in">
                <div className={`w-full rounded-xl overflow-hidden bg-black shadow-lg border border-slate-800 ${
                  aspectRatio === '9:16' ? 'max-w-[260px] aspect-[9/16]' : 'aspect-video'
                }`}>
                  <video
                    src={readyVideoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Actions */}
                <div className="w-full flex items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Generation Complete</span>
                  </span>

                  <a
                    href={readyVideoUrl}
                    download="chemical-apparatus-veo.mp4"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download MP4</span>
                  </a>
                </div>
              </div>
            )}

            {/* STATE 3: IDLE SCREEN */}
            {!generating && !readyVideoUrl && (
              <div className="flex flex-col items-center justify-center text-center py-12 px-6 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                  <Film className="w-7 h-7 text-cyan-400/80" />
                </div>
                <h3 className="text-sm font-bold text-slate-200">
                  Ready to Render
                </h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Upload an apparatus photo or describe a procedure prompt on the left, then click generate to render a high-speed video simulation.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-2">
                  <span>Fast Preview Mode</span>
                  <span>•</span>
                  <span>720p HD</span>
                </div>
              </div>
            )}

          </div>

          {/* Session History Carousel */}
          {historyList.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Recent Session Renders ({historyList.length})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {historyList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setReadyVideoUrl(`/api/video-download?operationName=${encodeURIComponent(item.operationName)}`);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50 dark:bg-slate-800/40 text-left flex items-center justify-between gap-2 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Play className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                          {item.prompt.slice(0, 40)}...
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.mode} • {item.aspectRatio} • {item.createdAt}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
