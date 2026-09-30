import React from 'react';
import { Search, Sparkles, MapPin, Compass, ShieldCheck, Sun, DollarSign, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/translations';

export const HeroSearch: React.FC = () => {
  const { searchQuery, setSearchQuery, setActiveTab, setSelectedDestination, destinations, language } = useApp();

  const t = (key: string) => getTranslation(language, key);

  const popularTags = ['Ahmedabad', 'Statue of Unity', 'Vadodara', 'Jaipur', 'Goa', 'Varanasi'];

  const handleSelectTag = (name: string) => {
    const dest = destinations.find(d => d.name.toLowerCase().includes(name.toLowerCase()));
    if (dest) {
      setSelectedDestination(dest);
      setActiveTab('destinations');
    } else {
      setSearchQuery(name);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-teal-900 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Overlay Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Unified AI Tourism Engine & Smart Kiosk Network</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Discover India with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            Personalized AI Intelligence
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
          One platform for custom trip planning, instant hotel & food discovery, multilingual AI assistance, and physical Smart Kiosk guidance across heritage destinations.
        </p>

        {/* Hero Search Box */}
        <div className="max-w-2xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl shadow-2xl shadow-emerald-950/50 flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
          <div className="flex items-center gap-2.5 px-3 py-2 w-full text-slate-700">
            <Search className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('heroSearchPlaceholder')}
              className="w-full text-xs sm:text-sm font-medium outline-none placeholder:text-slate-400 text-slate-900"
            />
          </div>

          <button
            onClick={() => setActiveTab('planner')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/30 whitespace-nowrap transition active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Plan AI Trip</span>
          </button>
        </div>

        {/* Quick Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleSelectTag(tag)}
              className="bg-slate-800/80 hover:bg-emerald-800/60 text-slate-200 hover:text-emerald-200 px-3 py-1 rounded-lg border border-slate-700/70 transition font-medium text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Key Feature Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-left">
          <div className="bg-slate-800/60 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">AI Itinerary</p>
              <p className="text-[10px] text-slate-400">Budget & interest based</p>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <div className="bg-amber-500/20 text-amber-400 p-2 rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Smart Kiosks</p>
              <p className="text-[10px] text-slate-400">Touch & QR assistance</p>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <div className="bg-teal-500/20 text-teal-400 p-2 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Verified Services</p>
              <p className="text-[10px] text-slate-400">Hotels & Restaurants</p>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 flex items-center gap-3">
            <div className="bg-rose-500/20 text-rose-400 p-2 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Emergency Desk</p>
              <p className="text-[10px] text-slate-400">Verified helpline numbers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
