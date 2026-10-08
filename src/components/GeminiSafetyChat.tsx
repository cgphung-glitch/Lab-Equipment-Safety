import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Search, 
  ExternalLink, 
  RotateCcw, 
  ShieldAlert, 
  Beaker, 
  Zap, 
  User, 
  Info, 
  AlertCircle,
  Clock,
  ChevronDown
} from 'lucide-react';

export type ChatRoleModel = 'gemini-3.1-pro-preview' | 'gemini-3.5-flash' | 'gemini-3.1-flash-lite';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  modelUsed?: string;
  groundingChunks?: Array<{
    web?: {
      uri: string;
      title: string;
    };
  }>;
  timestamp: string;
}

const ROLE_PRESETS: Record<ChatRoleModel, {
  name: string;
  model: ChatRoleModel;
  speed: string;
  badge: string;
  description: string;
  systemInstruction: string;
  icon: typeof ShieldAlert;
}> = {
  'gemini-3.1-pro-preview': {
    name: 'Chemical Safety Officer (Deep STEM Reasoning)',
    model: 'gemini-3.1-pro-preview',
    speed: 'High-Precision',
    badge: 'Complex Tasks',
    description: 'Specialized in rigorous thermodynamic reaction kinetics, dangerous incompatibility auditing, and formal SOP authoring.',
    systemInstruction: 'You are an authoritative Senior Chemical Safety Officer and Certified Lab Safety Specialist (CHO). You excel at deep STEM reasoning, thermodynamics of chemical reactions, identifying subtle dangerous incompatibilities, exothermic runaway risks, toxic decomposition pathways, and drafting rigorous Standard Operating Procedures (SOPs). Format your advice clearly with headings, bullet points, and specific PPE levels.',
    icon: ShieldAlert,
  },
  'gemini-3.5-flash': {
    name: 'General Lab Assistant (Balanced & Search-Grounded)',
    model: 'gemini-3.5-flash',
    speed: 'Balanced',
    badge: 'General Tasks',
    description: 'Expert guidance on laboratory apparatus operation, glassware calibration, reagent prep, and technique.',
    systemInstruction: 'You are an experienced and helpful Chemistry Laboratory Assistant. You provide practical, clear, step-by-step guidance on setting up glassware, using apparatus (burettes, hotplates, rotary evaporators, spectrophotometers, centrifuges), preparing standard solutions, and troubleshooting common experimental hurdles.',
    icon: Beaker,
  },
  'gemini-3.1-flash-lite': {
    name: 'Rapid Safety Triage (Ultra Fast)',
    model: 'gemini-3.1-flash-lite',
    speed: 'Ultra Fast',
    badge: 'Fast Tasks',
    description: 'Instant answers for quick constant lookups, physical properties, boiling points, and immediate first-aid summaries.',
    systemInstruction: 'You are a rapid-response laboratory safety reference engine. Provide concise, immediate answers for chemical properties (molecular weights, boiling points, densities), quick hazard ratings, and emergency first-aid summaries without unnecessary filler words.',
    icon: Zap,
  },
};

const STARTER_PROMPTS = [
  'Is it safe to concentrate diethyl ether on a rotary evaporator without peroxide testing?',
  'What is the mandatory face velocity for chemical fume hoods per OSHA 1910.1450?',
  'How do I properly neutralize and clean up a 500 mL nitric acid spill?',
  'Why should you never heat a completely closed glassware apparatus?',
  'What is the breakthrough time of disposable nitrile gloves against dichloromethane?',
];

export const GeminiSafetyChat: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ChatRoleModel>('gemini-3.5-flash');
  const [enableSearchGrounding, setEnableSearchGrounding] = useState<boolean>(true);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am your AI Chemistry Lab Safety Assistant powered by Gemini.

You can ask me about:
• Equipment operation protocols & SOP inspection steps
• Chemical incompatibilities and runaway reaction hazards
• Real-time OSHA/ACS regulatory guidelines and SDS lookup (via Google Search Grounding)
• Emergency response and first-aid decontamination

Select a specialized model role above, or choose one of the prompt suggestions below to get started.`,
      modelUsed: 'gemini-3.5-flash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || loading) return;

    setErrorMsg(null);
    const userMsgId = `user-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: query.trim(),
      timestamp,
    };

    // Update conversation thread
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInputQuery('');
    setLoading(true);

    try {
      // Prepare conversation history payload (excluding initial greeting if needed)
      const apiHistory = updatedMessages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          content: m.content,
        }));

      const activePreset = ROLE_PRESETS[selectedModel];

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiHistory,
          model: selectedModel,
          systemInstruction: activePreset.systemInstruction,
          enableSearch: enableSearchGrounding,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error (${res.status})`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'No response returned from the model.',
        modelUsed: data.modelUsed || selectedModel,
        groundingChunks: data.groundingChunks || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      let msg = err.message || 'Failed to communicate with Gemini API';
      if (msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
        msg = 'Quota exceeded on current key. For high-volume reasoning, Veo, and Search Grounding, ensure a billing-enabled key is selected in the Settings > Secrets panel.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Conversation reset. Ready for your chemical apparatus or safety inquiries using ${ROLE_PRESETS[selectedModel].name}.`,
        modelUsed: selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMsg(null);
  };

  const activePreset = ROLE_PRESETS[selectedModel];
  const IconComponent = activePreset.icon;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px] max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      
      {/* Top Console Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <Bot className="w-4 h-4" />
              <span>Multi-Turn Gemini Intelligence Console</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              AI Chemical Safety Officer & Assistant
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select model role, enable Google Search Grounding for live regulations, and maintain persistent chat history.
            </p>
          </div>

          {/* Model Role Selector & Options */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Model Role Selector Pill Buttons */}
            <div className="flex items-center bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              {(Object.keys(ROLE_PRESETS) as ChatRoleModel[]).map((key) => {
                const preset = ROLE_PRESETS[key];
                const isSelected = selectedModel === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedModel(key)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={preset.description}
                  >
                    <span>{preset.badge}</span>
                  </button>
                );
              })}
            </div>

            {/* Google Search Grounding Toggle */}
            <button
              type="button"
              onClick={() => setEnableSearchGrounding(!enableSearchGrounding)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                enableSearchGrounding
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800'
              }`}
              title="Google Search Grounding (gemini-3.5-flash with live web search citations)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Google Search</span>
              <span className={`w-2 h-2 rounded-full ${enableSearchGrounding ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
            </button>

            {/* Clear History Button */}
            <button
              type="button"
              onClick={handleResetChat}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Active Role Meta Sub-banner */}
        <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <IconComponent className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">{activePreset.name}</span>
            <span className="hidden sm:inline font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
              {activePreset.model}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Speed: {activePreset.speed}
          </span>
        </div>
      </div>

      {/* Scrollable Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 dark:bg-slate-700 text-cyan-400 border border-slate-700'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1.5 max-w-[85%] sm:max-w-[78%]">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                  {/* Grounding Source Links if present */}
                  {!isUser && msg.groundingChunks && msg.groundingChunks.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                        <Search className="w-3.5 h-3.5" />
                        <span>Google Search Grounding Citations:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.groundingChunks.map((chunk, cIdx) => {
                          if (!chunk.web?.uri) return null;
                          return (
                            <a
                              key={cIdx}
                              href={chunk.web.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors truncate max-w-xs"
                              title={chunk.web.title}
                            >
                              <span className="truncate">{chunk.web.title || chunk.web.uri}</span>
                              <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Timestamp & Model Footer */}
                <div className={`flex items-center gap-2 text-[10px] text-slate-400 font-mono px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.modelUsed && (
                    <>
                      <span>•</span>
                      <span>{msg.modelUsed}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-3 max-w-xl mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {enableSearchGrounding ? 'Consulting Google Search & analyzing laboratory safety protocols...' : 'Generating multi-turn response...'}
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-48 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-progress" />
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Error communicating with Gemini:</strong> {errorMsg}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Prompts Carousel */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
            Suggested Laboratory Queries:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Input Form */}
      <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask ${activePreset.name.split(' (')[0]} about laboratory safety, SDS, equipment...`}
              disabled={loading}
              className="w-full pl-4 pr-10 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
