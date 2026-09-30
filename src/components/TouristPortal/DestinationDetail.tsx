import React from 'react';
import { Destination } from '../../types';
import {
  X,
  MapPin,
  Calendar,
  Sparkles,
  DollarSign,
  Hotel,
  Utensils,
  Clock,
  Star,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { INITIAL_ATTRACTIONS, INITIAL_HOTELS, INITIAL_RESTAURANTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

interface Props {
  destination: Destination;
  onClose: () => void;
}

export const DestinationDetail: React.FC<Props> = ({ destination, onClose }) => {
  const { setActiveTab, setSelectedDestination } = useApp();

  const attractions = INITIAL_ATTRACTIONS.filter(
    a => a.destinationId === destination.id || destination.id === 'ahmedabad'
  );

  const hotels = INITIAL_HOTELS.filter(
    h => h.destinationId === destination.id || destination.id === 'ahmedabad'
  );

  const restaurants = INITIAL_RESTAURANTS.filter(
    r => r.destinationId === destination.id || destination.id === 'ahmedabad'
  );

  const handleStartPlan = () => {
    setSelectedDestination(destination);
    setActiveTab('planner');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-slate-200">
        {/* Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <MapPin className="w-4 h-4" /> {destination.state}, India
            </div>
            <h2 className="text-2xl sm:text-4xl font-black">{destination.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">{destination.tagline}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-slate-800">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">Best Season</p>
              <p className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {destination.bestTimeToVisit}
              </p>
            </div>

            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">Avg Daily Cost</p>
              <p className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                ₹{destination.avgBudgetPerDay} / person
              </p>
            </div>

            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">Top Category</p>
              <p className="font-bold text-slate-900 mt-0.5">{destination.category}</p>
            </div>

            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">Total Places</p>
              <p className="font-bold text-slate-900 mt-0.5">{destination.attractionsCount}+ Heritage Sites</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">About {destination.name}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {destination.description}
            </p>
          </div>

          {/* Key Attractions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">Featured Attractions & Heritage Sites</h3>
              <span className="text-xs text-emerald-700 font-semibold">{attractions.length} Places Found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attractions.map(attr => (
                <div key={attr.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex gap-3">
                  <img src={attr.image} alt={attr.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-slate-900 leading-snug">{attr.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{attr.description}</p>
                    <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-600 font-medium">
                      <span className="text-amber-600 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500" /> {attr.rating}
                      </span>
                      <span>Entry: {attr.entryFee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotels & Stay */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Hotel className="w-4 h-4 text-emerald-600" /> Top Stay Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {hotels.map(h => (
                <div key={h.id} className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{h.name}</p>
                    <p className="text-[11px] text-slate-500">{h.facilities.slice(0, 2).join(' • ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-emerald-700">₹{h.pricePerNight}</p>
                    <p className="text-[10px] text-slate-400">per night</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2"
          >
            Close
          </button>

          <button
            onClick={handleStartPlan}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Customized Itinerary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
