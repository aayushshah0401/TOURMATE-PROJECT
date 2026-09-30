import React, { useState } from 'react';
import { ShieldCheck, Users, Compass, Monitor, TrendingUp, BarChart3, PieChart, CheckCircle2, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { INITIAL_KIOSKS } from '../../data/mockData';
import { KioskDevice } from '../../types';
import { useApp } from '../../context/AppContext';
import { SecurityAuditPanel } from './SecurityAuditPanel';

export const AdminDashboard: React.FC = () => {
  const { showNotification } = useApp();
  const [kiosks, setKiosks] = useState<KioskDevice[]>(INITIAL_KIOSKS);

  const toggleKioskStatus = (id: string) => {
    setKiosks(prev =>
      prev.map(k => (k.id === id ? { ...k, status: k.status === 'online' ? 'offline' : 'online' } : k))
    );
    showNotification('Kiosk hardware status updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-indigo-400" /> State Tourism Board Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Tourism Intelligence & Admin Console</h1>
          <p className="text-xs text-slate-300">Monitor active tourist traffic, AI itinerary generation, and physical kiosk fleet status.</p>
        </div>

        <button
          onClick={() => showNotification('Exporting Tourism Analytics CSV report...')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export Analytics CSV
        </button>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-900">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <Users className="w-5 h-5" />
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">+14% this week</span>
          </div>
          <p className="text-xs font-bold text-slate-500">Active Monthly Tourists</p>
          <p className="text-2xl font-black text-slate-900">48,290</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-amber-600">
            <Compass className="w-5 h-5" />
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">+28% AI adoption</span>
          </div>
          <p className="text-xs font-bold text-slate-500">Generated AI Trips</p>
          <p className="text-2xl font-black text-slate-900">12,840</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-sky-600">
            <Monitor className="w-5 h-5" />
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">100% Uptime</span>
          </div>
          <p className="text-xs font-bold text-slate-500">Smart Kiosks Active</p>
          <p className="text-2xl font-black text-slate-900">{kiosks.filter(k => k.status === 'online').length} / {kiosks.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-indigo-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">4.8 / 5 Rating</span>
          </div>
          <p className="text-xs font-bold text-slate-500">Tourist Satisfaction</p>
          <p className="text-2xl font-black text-slate-900">96.4%</p>
        </div>
      </div>

      {/* Security Audit & Compliance Panel */}
      <SecurityAuditPanel />

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tourist Interests Analytics */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-600" /> Tourist Interest Breakdown
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>History & World Heritage</span>
                <span>38% (18,350 queries)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[38%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Local Food & Thali Culture</span>
                <span>28% (13,520 queries)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[28%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Nature & Eco-Tourism (Statue of Unity)</span>
                <span>18% (8,690 queries)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 w-[18%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Shopping & Handicrafts</span>
                <span>16% (7,730 queries)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[16%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Most Visited Destinations */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" /> Top Visited Destinations
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900">#1 Ahmedabad UNESCO World Heritage</span>
              <span className="font-black text-emerald-700">22,400 Visitors</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900">#2 Statue of Unity (Kevadia)</span>
              <span className="font-black text-emerald-700">18,100 Visitors</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900">#3 Vadodara Laxmi Vilas Palace</span>
              <span className="font-black text-emerald-700">12,600 Visitors</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-900">#4 Jaipur Pink City Forts</span>
              <span className="font-black text-emerald-700">9,800 Visitors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kiosk Fleet Management Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-amber-600" /> Physical Smart Kiosk Fleet Monitor
          </h3>
          <span className="text-xs text-slate-500">Raspberry Pi Telemetry Online</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="p-3">Kiosk Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Hardware Specs</th>
                <th className="p-3">Total Interactions</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {kiosks.map(k => (
                <tr key={k.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold">{k.name}</td>
                  <td className="p-3 text-slate-600">{k.locationName}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${k.status === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      ● {k.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-[11px] text-slate-500">{k.installedHardware.join(', ')}</td>
                  <td className="p-3 font-bold text-slate-900">{k.usageCount} users</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleKioskStatus(k.id)}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
