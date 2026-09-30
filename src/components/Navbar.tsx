import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  Hotel,
  Utensils,
  ShieldAlert,
  Globe,
  Bot,
  Monitor,
  Building2,
  UserCheck,
  Menu,
  X,
  BookmarkCheck,
  ChevronDown
} from 'lucide-react';
import { useApp, MainTab } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { UserRole, LanguageCode } from '../types';
import { AuthModal } from './Auth/AuthModal';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    activeTab,
    setActiveTab,
    user,
    setIsAiAssistantOpen,
    isAiAssistantOpen,
    savedTrips
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const t = (key: string) => getTranslation(language, key);

  const navItems: { id: MainTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Explore', icon: <Compass className="w-4 h-4" /> },
    { id: 'destinations', label: 'Destinations', icon: <MapPin className="w-4 h-4" /> },
    { id: 'planner', label: 'AI Planner', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'map', label: 'Interactive Map', icon: <MapPin className="w-4 h-4" /> },
    { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
    { id: 'restaurants', label: 'Restaurants', icon: <Utensils className="w-4 h-4" /> },
    { id: 'emergency', label: 'Emergency', icon: <ShieldAlert className="w-4 h-4 text-red-500" /> }
  ];

  if (role === 'kiosk') {
    return (
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-amber-500 to-emerald-500 p-2.5 rounded-xl shadow-lg">
            <Monitor className="w-6 h-6 text-slate-900 font-bold" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
              TourMate <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30 font-semibold">SMART KIOSK v2.6</span>
            </h1>
            <p className="text-xs text-slate-400">SVPIA Airport Terminal Kiosk #1 • Touch Screen Interface</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Globe className="w-4 h-4 text-emerald-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-sm font-medium outline-none cursor-pointer text-white"
            >
              <option value="en" className="bg-slate-900">English</option>
              <option value="hi" className="bg-slate-900">हिन्दी</option>
              <option value="gu" className="bg-slate-900">ગુજરાતી</option>
              <option value="mr" className="bg-slate-900">मराठी</option>
            </select>
          </div>

          <button
            onClick={() => setRole('tourist')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-700 transition"
          >
            Exit Kiosk Mode
          </button>
        </div>
      </header>
    );
  }

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 text-white p-2 rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Tour<span className="text-emerald-600">Mate</span></span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">AI</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Smart Tourism Ecosystem</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language Dropdown */}
            <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer"
              >
                <option value="en">EN</option>
                <option value="hi">हिन्दी</option>
                <option value="gu">ગુજરાતી</option>
                <option value="mr">मराठी</option>
              </select>
            </div>

            {/* Role Selector */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 border border-slate-200 transition"
              >
                {role === 'tourist' && <UserCheck className="w-3.5 h-3.5 text-emerald-600" />}
                {role === 'business' && <Building2 className="w-3.5 h-3.5 text-amber-600" />}
                {role === 'admin' && <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />}
                <span className="capitalize">{role}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {t('switchRole')}
                  </div>
                  <button
                    onClick={() => { setRole('tourist'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-emerald-50 ${role === 'tourist' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    {t('touristRole')}
                  </button>
                  <button
                    onClick={() => { setRole('business'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-amber-50 ${role === 'business' ? 'font-bold text-amber-700 bg-amber-50/50' : 'text-slate-700'}`}
                  >
                    <Building2 className="w-4 h-4 text-amber-600" />
                    {t('businessRole')}
                  </button>
                  <button
                    onClick={() => { setRole('admin'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-indigo-50 ${role === 'admin' ? 'font-bold text-indigo-700 bg-indigo-50/50' : 'text-slate-700'}`}
                  >
                    <ShieldAlert className="w-4 h-4 text-indigo-600" />
                    {t('adminRole')}
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => { setRole('kiosk'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-slate-900 bg-slate-900 hover:bg-slate-800 text-white font-medium"
                  >
                    <Monitor className="w-4 h-4 text-amber-400" />
                    {t('kioskRole')}
                  </button>
                </div>
              )}
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
              className="relative flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm shadow-emerald-600/30 hover:opacity-95 transition active:scale-95 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
              </span>
            </button>

            {/* Auth Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate max-w-[90px]">{user.name.split(' ')[0]}</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
              className="p-2 text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-slate-500">Role Mode:</span>
            <div className="flex gap-1">
              <button
                onClick={() => { setRole('tourist'); setMobileMenuOpen(false); }}
                className={`px-2.5 py-1 text-[11px] rounded-md font-bold ${role === 'tourist' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
              >
                Tourist
              </button>
              <button
                onClick={() => { setRole('business'); setMobileMenuOpen(false); }}
                className={`px-2.5 py-1 text-[11px] rounded-md font-bold ${role === 'business' ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'}`}
              >
                Business
              </button>
              <button
                onClick={() => { setRole('admin'); setMobileMenuOpen(false); }}
                className={`px-2.5 py-1 text-[11px] rounded-md font-bold ${role === 'admin' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}
              >
                Admin
              </button>
              <button
                onClick={() => { setRole('kiosk'); setMobileMenuOpen(false); }}
                className="px-2.5 py-1 text-[11px] rounded-md font-bold bg-slate-900 text-amber-400"
              >
                Kiosk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  );
};
