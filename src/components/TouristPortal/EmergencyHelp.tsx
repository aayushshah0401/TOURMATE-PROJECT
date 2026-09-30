import React, { useState } from 'react';
import { EMERGENCY_CONTACTS } from '../../data/mockData';
import { ShieldAlert, PhoneCall, AlertTriangle, Hospital, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyHelp: React.FC = () => {
  const { showNotification } = useApp();
  const [sosTriggered, setSosTriggered] = useState(false);

  const handleTriggerSOS = () => {
    setSosTriggered(true);
    showNotification('🚨 SOS Emergency Alert Sent to Local Tourism Police & Emergency Response!');
    setTimeout(() => {
      setSosTriggered(false);
    }, 8000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Panic Banner */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-red-800/80">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <ShieldAlert className="w-4 h-4 text-red-400" /> State Tourism Security Desk
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Verified Tourist Emergency Helpline</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
            24/7 verified government helpline contacts, trauma ambulance centers, and instant SOS police dispatch.
          </p>
        </div>

        {/* SOS Button */}
        <button
          onClick={handleTriggerSOS}
          disabled={sosTriggered}
          className={`px-8 py-5 rounded-2xl font-black text-sm tracking-wide transition shadow-2xl flex items-center gap-3 cursor-pointer ${
            sosTriggered
              ? 'bg-emerald-600 text-white animate-pulse'
              : 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/50 active:scale-95'
          }`}
        >
          <AlertTriangle className="w-6 h-6 text-yellow-300" />
          <span>{sosTriggered ? 'SOS DISPATCHED (POLICE NOTIFIED)' : 'PRESS FOR INSTANT POLICE SOS'}</span>
        </button>
      </div>

      {/* Verified Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EMERGENCY_CONTACTS.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-red-300 transition space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>

              <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.description}</p>

              {item.address && (
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {item.address}
                </p>
              )}
            </div>

            <a
              href={`tel:${item.phone}`}
              className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-extrabold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call {item.phone}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Safety Guidelines */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Tourist Safety Protocol
        </h3>
        <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside font-medium">
          <li>Keep your digital TourMate itinerary synced to your mobile device via QR code.</li>
          <li>In case of loss of internet or network, use any Smart Tourist Kiosk at the nearest railway station or airport.</li>
          <li>For medical assistance, government EMRI 108 ambulance is free of charge state-wide.</li>
        </ul>
      </div>
    </div>
  );
};
