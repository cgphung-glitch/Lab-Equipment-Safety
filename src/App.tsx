/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { EQUIPMENT_LIST, CATEGORIES } from './data/equipmentData';
import { EquipmentItem, HazardLevel } from './types/equipment';
import { Navbar, NavTab } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { EquipmentCard } from './components/EquipmentCard';
import { EquipmentDetailModal } from './components/EquipmentDetailModal';
import { SafetyHubView } from './components/SafetyHubView';
import { CategoryView } from './components/CategoryView';
import { EmergencyDrawer } from './components/EmergencyDrawer';
import { GeminiSafetyChat } from './components/GeminiSafetyChat';
import { VeoVideoLab } from './components/VeoVideoLab';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Bookmark, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  AlertTriangle,
  Beaker,
  Compass
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHazard, setSelectedHazard] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  // Local storage bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chemlab_bookmarks');
      return saved ? JSON.parse(saved) : ['burette', 'rotary-evaporator', 'fume-hood'];
    } catch {
      return ['burette', 'rotary-evaporator', 'fume-hood'];
    }
  });

  // Local storage pre-use inspection checks
  const [checkedPreInspections, setCheckedPreInspections] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('chemlab_preinspections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chemlab_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync theme to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('chemlab_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('chemlab_theme', 'light');
    }
  }, [darkMode]);

  // Sync bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('chemlab_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // storage error fallback
    }
  }, [bookmarks]);

  // Sync pre-inspections
  useEffect(() => {
    try {
      localStorage.setItem('chemlab_preinspections', JSON.stringify(checkedPreInspections));
    } catch {
      // storage error fallback
    }
  }, [checkedPreInspections]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const togglePreInspection = (itemId: string, index: number) => {
    const key = `${itemId}-${index}`;
    setCheckedPreInspections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filtered equipment list
  const filteredEquipment = useMemo(() => {
    return EQUIPMENT_LIST.filter(item => {
      // Bookmarks tab filter
      if (activeTab === 'bookmarks' && !bookmarks.includes(item.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Hazard filter
      if (selectedHazard !== 'all' && item.safety.hazardLevel !== selectedHazard) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(q);
        const matchesAliases = item.aliases.some(alias => alias.toLowerCase().includes(q));
        const matchesDescription = item.description.toLowerCase().includes(q);
        const matchesSpecs = item.specs.material.toLowerCase().includes(q);
        const matchesHazards = item.safety.primaryHazards.some(h => h.toLowerCase().includes(q));
        
        return matchesName || matchesCategory || matchesAliases || matchesDescription || matchesSpecs || matchesHazards;
      }

      return true;
    });
  }, [activeTab, bookmarks, selectedCategory, selectedHazard, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      
      {/* Top Bar Navigation (3-Zone Contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarks.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenEmergency={() => setEmergencyOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
        
        {/* VIEW 1: CATALOG & BOOKMARKS TAB */}
        {(activeTab === 'catalog' || activeTab === 'bookmarks') && (
          <div className="space-y-6">
            
            {/* Header / Hero context */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mb-1">
                  <Beaker className="w-4 h-4" />
                  <span>{activeTab === 'bookmarks' ? 'SAVED APPARATUS' : 'STANDARDIZED INDEX'}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {activeTab === 'bookmarks' ? 'Bookmarked Equipment' : 'Laboratory Equipment & Safety Index'}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {activeTab === 'bookmarks' 
                    ? `Quick-access collection of your ${bookmarks.length} saved laboratory apparatus items.`
                    : 'Search 24+ certified chemical apparatus with high-resolution imagery, GHS hazard profiles, and SOP protocols.'
                  }
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 self-start md:self-end">
                <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                  Showing {filteredEquipment.length} of {activeTab === 'bookmarks' ? bookmarks.length : EQUIPMENT_LIST.length}
                </span>
              </div>
            </div>

            {/* Interactive Search & Filter Console */}
            <div className="space-y-3">
              {/* Search Bar Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search apparatus (e.g. 'Büchner', 'Rotovap', 'Burette', 'vacuum', 'hotplate')..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Controls Row (Category Segmented Buttons + Hazard Filter) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                {/* Category Horizontal Filter Segment */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                        selectedCategory === cat.id
                          ? 'bg-blue-600 text-white font-semibold shadow-xs'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Hazard Level Dropdown Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline whitespace-nowrap">
                    Hazard:
                  </span>
                  <select
                    value={selectedHazard}
                    onChange={(e) => setSelectedHazard(e.target.value)}
                    className="w-full sm:w-auto px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 min-h-[36px]"
                  >
                    <option value="all">All Hazard Ratings</option>
                    <option value="critical">Critical Hazard</option>
                    <option value="high">High Hazard</option>
                    <option value="moderate">Moderate Hazard</option>
                    <option value="low">Low Hazard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Equipment Card Grid (Mobile-friendly 1-col on phone, 2-col on tablet, 3-col on desktop) */}
            {filteredEquipment.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEquipment.map((item) => (
                  <EquipmentCard
                    key={item.id}
                    item={item}
                    isBookmarked={bookmarks.includes(item.id)}
                    onToggleBookmark={toggleBookmark}
                    onSelect={(selected) => setSelectedEquipment(selected)}
                  />
                ))}
              </div>
            ) : (
              /* Zero Results Empty State */
              <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-3">
                <Compass className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No matching laboratory apparatus found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  No equipment matched your search &ldquo;{searchQuery}&rdquo; and active filters. Try resetting your search query or selecting &ldquo;All Equipment&rdquo;.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedHazard('all');
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <CategoryView
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setActiveTab('catalog');
            }}
            onSelectEquipment={(item) => setSelectedEquipment(item)}
          />
        )}

        {/* VIEW 3: SAFETY HUB TAB */}
        {activeTab === 'safety' && (
          <SafetyHubView
            onOpenChat={() => setActiveTab('chat')}
            onOpenVideo={() => setActiveTab('video')}
          />
        )}

        {/* VIEW 4: AI GEMINI SAFETY CHATBOT WITH SEARCH GROUNDING */}
        {activeTab === 'chat' && <GeminiSafetyChat />}

        {/* VIEW 5: VEO 3 VIDEO LABORATORY (IMAGE ANIMATION & TEXT-TO-VIDEO) */}
        {activeTab === 'video' && <VeoVideoLab />}

      </main>

      {/* Equipment Detail Modal & Clearance Sheet */}
      {selectedEquipment && (
        <EquipmentDetailModal
          item={selectedEquipment}
          isOpen={!!selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          isBookmarked={bookmarks.includes(selectedEquipment.id)}
          onToggleBookmark={toggleBookmark}
          checkedPreInspections={checkedPreInspections}
          onTogglePreInspection={togglePreInspection}
          onOpenChat={() => setActiveTab('chat')}
          onOpenVideo={() => setActiveTab('video')}
        />
      )}

      {/* Emergency First-Aid & Spill Quick Drawer */}
      <EmergencyDrawer
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />

      {/* Mobile Ergonomic Bottom Tab Bar (Visible on mobile screens) */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarks.length}
      />

      {/* Desktop Quiet Footer */}
      <footer className="hidden md:block border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ChemLab SafeLook &middot; Chemistry Laboratory Equipment &amp; Safety Reference</span>
          <span className="font-mono text-[11px]">ASTM E287 / OSHA 1910.1450 Compliance Standard</span>
        </div>
      </footer>

    </div>
  );
}
