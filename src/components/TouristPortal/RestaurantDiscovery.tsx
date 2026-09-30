import React, { useState } from 'react';
import { INITIAL_RESTAURANTS } from '../../data/mockData';
import { Utensils, Star, MapPin, Clock, Phone, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RestaurantDiscovery: React.FC = () => {
  const { showNotification } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRestaurants = INITIAL_RESTAURANTS.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-amber-600" />
            Local Food & Restaurant Guide
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Discover iconic street food markets, traditional thali venues, and local culinary hotspots recommended by AI.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by restaurant name, cuisine (Thali, Street Food), or dish..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-emerald-600"
          />
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-900 font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                  {r.priceRange}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{r.name}</h3>
                  <span className="text-amber-500 font-bold text-xs flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {r.rating}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {r.cuisine.map((c, idx) => (
                    <span key={idx} className="bg-amber-50 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-200">
                      {c}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {r.address}
                </p>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Signature Dishes</p>
                  <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                    {r.signatureDishes.join(' • ')}
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {r.openingHours}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => showNotification(`Contacting ${r.name} at ${r.contactPhone}`)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" /> Contact / Call Restaurant
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
