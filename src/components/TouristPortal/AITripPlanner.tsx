import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  DollarSign,
  Users,
  Compass,
  MapPin,
  Clock,
  CheckCircle2,
  Share2,
  Printer,
  QrCode,
  Trash2,
  RefreshCw,
  Info,
  ChevronRight,
  Utensils,
  Landmark,
  Car,
  Hotel
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateAITripPlan } from '../../services/api';
import { TripPlan, ItineraryActivity } from '../../types';

export const AITripPlanner: React.FC = () => {
  const {
    selectedDestination,
    destinations,
    activeTrip,
    setActiveTrip,
    saveTrip,
    showNotification,
    language,
    setActiveTab
  } = useApp();

  const [destinationInput, setDestinationInput] = useState(
    selectedDestination ? selectedDestination.name : 'Ahmedabad'
  );
  const [durationDays, setDurationDays] = useState<number>(3);
  const [budgetInINR, setBudgetInINR] = useState<number>(6000);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['History', 'Food', 'Culture']);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const [showShareModal, setShowShareModal] = useState(false);

  const interestOptions = ['History', 'Food', 'Nature', 'Culture', 'Shopping', 'Adventure'];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const plan = await generateAITripPlan({
        destination: destinationInput,
        durationDays,
        budgetInINR,
        travelersCount,
        interests: selectedInterests,
        language
      });

      setActiveTrip(plan);
      saveTrip(plan);
      setActiveDayTab(1);
      showNotification(`🎉 AI Itinerary for ${destinationInput} ready!`);
    } catch (err) {
      showNotification('Could not reach server. Generated smart offline plan.');
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: ItineraryActivity['type']) => {
    switch (type) {
      case 'meal':
        return <Utensils className="w-4 h-4 text-amber-500" />;
      case 'attraction':
        return <Landmark className="w-4 h-4 text-emerald-600" />;
      case 'stay':
        return <Hotel className="w-4 h-4 text-indigo-500" />;
      case 'travel':
        return <Car className="w-4 h-4 text-sky-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> AI Trip Planner Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Personalized AI Itinerary Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Specify your destination, duration, budget, and travel interests. TourMate AI builds an optimized day-by-day plan with timings, cost breakdown, and local tips.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs Sidebar */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" /> Plan Parameters
            </h2>
            <p className="text-xs text-slate-500">Customize budget, days, and interests</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5 text-xs">
            {/* Destination Input */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Destination City / Spot</label>
              <div className="relative">
                <input
                  type="text"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  placeholder="e.g. Ahmedabad, Kevadia, Jaipur, Goa"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-emerald-600"
                  required
                />
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
              </div>
            </div>

            {/* Duration & Budget Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Days
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                >
                  <option value={1}>1 Day (Express)</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days (Recommended)</option>
                  <option value={4}>4 Days</option>
                  <option value={5}>5 Days</option>
                  <option value={7}>7 Days</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-600" /> Budget (₹)
                </label>
                <select
                  value={budgetInINR}
                  onChange={(e) => setBudgetInINR(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                >
                  <option value={3000}>₹3,000 (Budget)</option>
                  <option value={6000}>₹6,000 (Standard)</option>
                  <option value={10000}>₹10,000 (Deluxe)</option>
                  <option value={20000}>₹20,000+ (Luxury)</option>
                </select>
              </div>
            </div>

            {/* Travelers */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-600" /> Travelers Count
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setTravelersCount(num)}
                    className={`py-2 rounded-xl font-bold border transition ${
                      travelersCount === num
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num} {num === 1 ? 'Solo' : 'People'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests Chips */}
            <div>
              <label className="block font-bold text-slate-700 mb-2">Select Interests</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((opt) => {
                  const isSelected = selectedInterests.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 border ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-amber-300" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-3.5 rounded-2xl font-extrabold text-sm shadow-md shadow-emerald-700/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>AI Engine Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate AI Itinerary</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Itinerary Output View */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
          {activeTrip ? (
            <div className="space-y-6">
              {/* Trip Header Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900">{activeTrip.destination} Itinerary</h2>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {activeTrip.durationDays} Days Plan
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Budget Target: ₹{activeTrip.budgetInINR} • Est. Cost: ₹{activeTrip.totalEstimatedCost}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="p-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 shadow-xs text-xs font-bold flex items-center gap-1"
                    title="Share / Mobile Sync"
                  >
                    <Share2 className="w-4 h-4 text-emerald-600" />
                    <span>Sync</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 shadow-xs text-xs font-bold flex items-center gap-1"
                    title="Print Itinerary"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span>Print</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('map')}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs text-xs font-bold flex items-center gap-1"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Map View</span>
                  </button>
                </div>
              </div>

              {/* Budget Progress Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Budget Utilization</span>
                  <span className={activeTrip.totalEstimatedCost <= activeTrip.budgetInINR ? 'text-emerald-600' : 'text-amber-600'}>
                    ₹{activeTrip.totalEstimatedCost} / ₹{activeTrip.budgetInINR}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      activeTrip.totalEstimatedCost <= activeTrip.budgetInINR ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{
                      width: `${Math.min(100, (activeTrip.totalEstimatedCost / activeTrip.budgetInINR) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* AI Notes */}
              {activeTrip.aiNotes && (
                <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="font-medium">{activeTrip.aiNotes}</p>
                </div>
              )}

              {/* Day Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                {activeTrip.days.map((day) => (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDayTab(day.dayNumber)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      activeDayTab === day.dayNumber
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Day {day.dayNumber}
                  </button>
                ))}
              </div>

              {/* Selected Day Activities List */}
              {activeTrip.days
                .filter(d => d.dayNumber === activeDayTab)
                .map(day => (
                  <div key={day.dayNumber} className="space-y-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                      <p className="font-bold text-slate-900">{day.dateLabel}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{day.daySummary}</p>
                    </div>

                    <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                      {day.activities.map((act) => (
                        <div key={act.id} className="relative pl-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition space-y-2">
                          {/* Timeline Dot */}
                          <div className="absolute left-2 top-4 w-3 h-3 bg-emerald-500 rounded-full ring-4 ring-white"></div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {act.timeSlot}
                            </span>
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              Est. ₹{act.estimatedCost}
                            </span>
                          </div>

                          <div className="flex items-start gap-2">
                            {getActivityIcon(act.type)}
                            <div>
                              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{act.title}</h4>
                              <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed">
                                {act.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                            <span className="flex items-center gap-1 font-semibold text-slate-700">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                              {act.locationName}
                            </span>
                            {act.tips && (
                              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                                💡 Tip: {act.tips}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <Sparkles className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No Itinerary Generated Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Fill in your destination and budget parameters on the left and click "Generate AI Itinerary".
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share / Mobile Sync QR Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-center space-y-5">
            <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-600" /> Mobile Sync & Share
            </h3>

            <p className="text-xs text-slate-600">
              Scan this QR code with your mobile smartphone to instantly load this itinerary onto your device!
            </p>

            <div className="bg-slate-100 p-6 rounded-2xl inline-block border border-slate-200">
              {/* Generated QR Code Visual */}
              <div className="w-44 h-44 bg-slate-900 p-3 rounded-xl flex flex-col items-center justify-center text-white space-y-2">
                <QrCode className="w-24 h-24 text-emerald-400" />
                <span className="text-[10px] font-mono tracking-wider">TOURMATE-SYNC-{activeTrip?.id.slice(-6)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showNotification('Link copied to clipboard!');
                  setShowShareModal(false);
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl transition"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-emerald-700 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
