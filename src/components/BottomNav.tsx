import React from 'react';
import { Search, ShieldCheck, Bookmark, Bot, Film } from 'lucide-react';
import { NavTab } from './Navbar';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  bookmarkCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="grid grid-cols-5 items-center h-14">
        {/* Tab 1: Catalog */}
        <button
          onClick={() => setActiveTab('catalog')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'catalog'
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Search className="w-4 h-4" />
          <span className="text-[9px] tracking-tight mt-0.5">Catalog</span>
          {activeTab === 'catalog' && (
            <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 mt-0.5" />
          )}
        </button>

        {/* Tab 2: Safety Hub */}
        <button
          onClick={() => setActiveTab('safety')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'safety'
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[9px] tracking-tight mt-0.5">Safety Hub</span>
          {activeTab === 'safety' && (
            <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 mt-0.5" />
          )}
        </button>

        {/* Tab 3: AI Gemini Chatbot */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'chat'
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span className="text-[9px] tracking-tight mt-0.5">AI Chat</span>
          {activeTab === 'chat' && (
            <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 mt-0.5" />
          )}
        </button>

        {/* Tab 4: Veo Video Lab */}
        <button
          onClick={() => setActiveTab('video')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'video'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Film className="w-4 h-4" />
          <span className="text-[9px] tracking-tight mt-0.5">Veo Video</span>
          {activeTab === 'video' && (
            <span className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-0.5" />
          )}
        </button>

        {/* Tab 5: Bookmarks */}
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'bookmarks'
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[8px] font-mono font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-tight mt-0.5">Saved</span>
          {activeTab === 'bookmarks' && (
            <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
