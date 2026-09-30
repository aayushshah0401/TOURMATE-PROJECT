import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Hotel,
  Utensils,
  ShieldAlert,
  QrCode,
  Globe,
  ArrowRight,
  MapPin,
  Clock,
  PhoneCall,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/translations';
import { KioskQRScanner } from './KioskQRScanner';
import { INITIAL_ATTRACTIONS, INITIAL_HOTELS, INITIAL_RESTAURANTS, EMERGENCY_CONTACTS } from '../../data/mockData';

export const KioskInterface: React.FC = () => {
  const { language, setLanguage, setRole, showNotification } = useApp();
  const [activeKioskAction, setActiveKioskAction] = useState<'home' | 'nearby' | 'plan' | 'hotel' | 'food' | 'emergency'>('home');
  const [showQRScanner, setShowQRScanner] = useState(false);

  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10 font-sans select-none">
      {/* Kiosk Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-amber-500 to-emerald-500 p-3.5 rounded-2xl shadow-xl">
            <Compass className="w-8 h-8 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              TourMate <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/40 font-bold">SMART KIOSK #1</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Sardar Vallabhbhai Patel International Airport • Touch Screen Interface
            </p>
          </div>
        </div>

        {/* Language Selector Bar */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${language === 'en' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${language === 'hi' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => setLanguage('gu')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${language === 'gu' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            ગુજરાતી
          </button>
          <button
            onClick={() => setLanguage('mr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${language === 'mr' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            मराठी
          </button>
        </div>
      </div>

      {/* Main Kiosk Content Area */}
      <div className="my-8 max-w-6xl mx-auto w-full space-y-8">
        {activeKioskAction === 'home' && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black text-white">{t('kioskGreeting')}</h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-medium">
                {t('kioskSubGreeting')}
              </p>
            </div>

            {/* Giant Touch Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
              {/* Button 1: Explore Nearby */}
              <button
                onClick={() => setActiveKioskAction('nearby')}
                className="bg-gradient-to-br from-slate-900 to-slate-800 hover:from-emerald-900 hover:to-slate-900 border-2 border-slate-700 hover:border-emerald-500 p-8 rounded-3xl text-left transition duration-200 group shadow-2xl flex flex-col justify-between h-56 active:scale-95 cursor-pointer"
              >
                <div className="bg-emerald-500/20 text-emerald-400 p-4 rounded-2xl w-fit group-hover:scale-110 transition">
                  <Compass className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition">{t('exploreNearby')}</h3>
                  <p className="text-xs text-slate-400 mt-1">Sabarmati Ashram, Riverfront, Stepwells</p>
                </div>
              </button>

              {/* Button 2: Plan My Trip */}
              <button
                onClick={() => setActiveKioskAction('plan')}
                className="bg-gradient-to-br from-slate-900 to-slate-800 hover:from-teal-900 hover:to-slate-900 border-2 border-slate-700 hover:border-teal-500 p-8 rounded-3xl text-left transition duration-200 group shadow-2xl flex flex-col justify-between h-56 active:scale-95 cursor-pointer"
              >
                <div className="bg-teal-500/20 text-teal-400 p-4 rounded-2xl w-fit group-hover:scale-110 transition">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-teal-400 transition">{t('planMyTrip')}</h3>
                  <p className="text-xs text-slate-400 mt-1">Instant 1-Tap Budget & Interest Itinerary</p>
                </div>
              </button>

              {/* Button 3: Find Hotel */}
              <button
                onClick={() => setActiveKioskAction('hotel')}
                className="bg-gradient-to-br from-slate-900 to-slate-800 hover:from-indigo-900 hover:to-slate-900 border-2 border-slate-700 hover:border-indigo-500 p-8 rounded-3xl text-left transition duration-200 group shadow-2xl flex flex-col justify-between h-56 active:scale-95 cursor-pointer"
              >
                <div className="bg-indigo-500/20 text-indigo-400 p-4 rounded-2xl w-fit group-hover:scale-110 transition">
                  <Hotel className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-indigo-400 transition">{t('findHotel')}</h3>
                  <p className="text-xs text-slate-400 mt-1">Verified Stay & Reception Phone</p>
                </div>
              </button>

              {/* Button 4: Find Food */}
              <button
                onClick={() => setActiveKioskAction('food')}
                className="bg-gradient-to-br from-slate-900 to-slate-800 hover:from-amber-900 hover:to-slate-900 border-2 border-slate-700 hover:border-amber-500 p-8 rounded-3xl text-left transition duration-200 group shadow-2xl flex flex-col justify-between h-56 active:scale-95 cursor-pointer"
              >
                <div className="bg-amber-500/20 text-amber-400 p-4 rounded-2xl w-fit group-hover:scale-110 transition">
                  <Utensils className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition">{t('findFood')}</h3>
                  <p className="text-xs text-slate-400 mt-1">Gujarati Thalis & Night Street Food</p>
                </div>
              </button>

              {/* Button 5: Scan QR Code */}
              <button
                onClick={() => setShowQRScanner(true)}
                className="bg-gradient-to-br from-slate-900 to-slate-800 hover:from-sky-900 hover:to-slate-900 border-2 border-slate-700 hover:border-sky-500 p-8 rounded-3xl text-left transition duration-200 group shadow-2xl flex flex-col justify-between h-56 active:scale-95 cursor-pointer"
              >
                <div className="bg-sky-500/20 text-sky-400 p-4 rounded-2xl w-fit group-hover:scale-110 transition">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-sky-400 transition">{t('scanQR')}</h3>
                  <p className="text-xs text-slate-400 mt-1">Scan Monument Tag for Audio Guide</p>
                </div>
              </button>

              {/* Button 6: Emergency Help */}
              <button
                onClick={() => setActiveKioskAction('emergency')}
                className="bg-gradient-to-br from-slate-900 to-red-950/80 border-2 border-red-800/80 hover:border-red-500 p-8 rounded-3xl text-left transition duration-200 group shadow-2xl flex flex-col justify-between h-56 active:scale-95 cursor-pointer"
              >
                <div className="bg-red-500/20 text-red-400 p-4 rounded-2xl w-fit group-hover:scale-110 transition">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-red-400">{t('emergencyHelp')}</h3>
                  <p className="text-xs text-slate-400 mt-1">Police 112 • Ambulance 108</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Active Sub View Header */}
        {activeKioskAction !== 'home' && (
          <div className="space-y-6">
            <button
              onClick={() => setActiveKioskAction('home')}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-2"
            >
              ← Back to Kiosk Main Menu
            </button>

            {/* Nearby View */}
            {activeKioskAction === 'nearby' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-2xl font-black text-emerald-400 flex items-center gap-2">
                  <Compass className="w-6 h-6" /> Nearby Tourist Attractions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INITIAL_ATTRACTIONS.slice(0, 4).map(attr => (
                    <div key={attr.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex gap-4">
                      <img src={attr.image} alt={attr.name} className="w-24 h-24 rounded-xl object-cover" />
                      <div className="space-y-1 text-xs">
                        <h4 className="font-extrabold text-white text-sm">{attr.name}</h4>
                        <p className="text-slate-400">{attr.description}</p>
                        <p className="text-amber-400 font-bold pt-1">Entry: {attr.entryFee} • {attr.recommendedDuration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plan View */}
            {activeKioskAction === 'plan' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                <h3 className="text-2xl font-black text-teal-400 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" /> 1-Tap Kiosk AI Trip Generator
                </h3>
                <p className="text-slate-300">Generated 3-Day Plan for Ahmedabad (₹5,000 Budget):</p>
                <div className="bg-slate-800 p-4 rounded-2xl space-y-2 border border-slate-700">
                  <p className="font-bold text-emerald-400">Day 1: Sabarmati Ashram → Riverfront → Agashiye Thali</p>
                  <p className="font-bold text-emerald-400">Day 2: Adalaj Stepwell → Sidi Saiyyed Jali → Manek Chowk</p>
                  <p className="font-bold text-emerald-400">Day 3: Science City Robotics → Law Garden Shopping</p>
                </div>
                <button
                  onClick={() => showNotification('📱 Itinerary QR Sent to Kiosk Display for Smartphone Scan!')}
                  className="bg-teal-500 text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-teal-400 transition"
                >
                  Scan QR to Save to Phone
                </button>
              </div>
            )}

            {/* Emergency View */}
            {activeKioskAction === 'emergency' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-2xl font-black text-red-500 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6" /> Tourist Emergency Dispatch
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {EMERGENCY_CONTACTS.map(e => (
                    <div key={e.id} className="bg-red-950/40 p-4 rounded-2xl border border-red-900 space-y-1">
                      <p className="font-extrabold text-white">{e.title}</p>
                      <p className="text-red-400 font-black text-lg">{e.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Kiosk Footer Bar */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>TourMate Kiosk Firmware v2.6 • Powered by Raspberry Pi 5 & Gemini AI</p>
        <button
          onClick={() => setRole('tourist')}
          className="text-slate-400 hover:text-white underline font-semibold"
        >
          Exit Kiosk Mode
        </button>
      </div>

      {/* QR Scanner Overlay */}
      {showQRScanner && <KioskQRScanner onClose={() => setShowQRScanner(false)} />}
    </div>
  );
};
