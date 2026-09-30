import React from 'react';
import { Compass, ShieldCheck, MapPin, Monitor, Phone, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setRole } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-emerald-500 text-slate-900 p-2 rounded-xl font-bold">
                <Compass className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Tour<span className="text-emerald-400">Mate</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              SIH26221 Solution — Unified AI-powered tourism ecosystem connecting tourists with personalized trip itineraries, real-time service discovery, and smart physical kiosks.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" /> Verified Tourism Board Partner
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Ecosystem Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('planner')} className="hover:text-emerald-400 transition">
                  AI Trip Planner (Personalized)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('destinations')} className="hover:text-emerald-400 transition">
                  Destination Discovery & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-emerald-400 transition">
                  Interactive GIS Tourism Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('hotels')} className="hover:text-emerald-400 transition">
                  Verified Hotels & Stay Discovery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('restaurants')} className="hover:text-emerald-400 transition">
                  Local Food & Restaurant Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Smart Kiosk Network */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Smart Kiosk Fleet</h4>
            <p className="text-xs text-slate-400 mb-3">
              Deployable at airports, railway stations, and heritage sites for instant app-less tourist guidance.
            </p>
            <button
              onClick={() => setRole('kiosk')}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-3 py-2 rounded-lg text-xs font-bold transition"
            >
              <Monitor className="w-4 h-4" /> Launch Kiosk Interface Mode
            </button>
          </div>

          {/* Emergency & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Emergency & Helpline</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>Police / National Emergency: <strong className="text-white">112 / 100</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Tourist Multi-lingual Helpline: <strong className="text-white">1363</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>GVK Ambulance Service: <strong className="text-white">108</strong></span>
              </div>
              <button
                onClick={() => setActiveTab('emergency')}
                className="mt-2 text-xs text-red-400 underline font-semibold hover:text-red-300"
              >
                View Full Emergency Help Desk →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TourMate Ecosystem • SIH Tourism Tech Innovation</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with AI & Raspberry Pi Kiosk Integration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
