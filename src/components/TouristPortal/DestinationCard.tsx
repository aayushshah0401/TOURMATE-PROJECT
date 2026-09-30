import React from 'react';
import { Destination } from '../../types';
import { MapPin, Calendar, Sparkles, Star, ArrowRight, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  destination: Destination;
  onSelect: (dest: Destination) => void;
}

export const DestinationCard: React.FC<Props> = ({ destination, onSelect }) => {
  const { setActiveTab, setSelectedDestination } = useApp();

  const handleQuickPlan = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDestination(destination);
    setActiveTab('planner');
  };

  return (
    <div
      onClick={() => onSelect(destination)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Card Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

          {/* Top Category Badge */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
            {destination.category}
          </span>

          <span className="absolute top-3 right-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> ₹{destination.avgBudgetPerDay}/day
          </span>

          {/* Bottom Title */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">{destination.state}</p>
            <h3 className="text-lg font-extrabold leading-snug">{destination.name}</h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">
            {destination.tagline}
          </p>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {destination.bestTimeToVisit}
            </span>
            <span className="text-slate-700 font-semibold">
              {destination.attractionsCount} Attractions
            </span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 pt-0 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(destination)}
          className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 rounded-xl transition"
        >
          Explore Details
        </button>

        <button
          onClick={handleQuickPlan}
          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>AI Plan</span>
        </button>
      </div>
    </div>
  );
};
