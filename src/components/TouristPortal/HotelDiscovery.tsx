import React, { useState } from 'react';
import { INITIAL_HOTELS } from '../../data/mockData';
import { Hotel, Star, Phone, Check, MapPin, Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HotelDiscovery: React.FC = () => {
  const { showNotification } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<number>(10000);
  const [selectedHotelModal, setSelectedHotelModal] = useState<any>(null);

  const filteredHotels = INITIAL_HOTELS.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = h.pricePerNight <= priceFilter;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Filter Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Hotel className="w-6 h-6 text-emerald-600" />
            Verified Hotel & Stay Discovery
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Discover verified heritage stays, luxury hotels, and budget accommodations with direct contact details.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hotel name, address, or amenities..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-700">Max Price: ₹{priceFilter}</span>
            <input
              type="range"
              min={3000}
              max={12000}
              step={1000}
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((h) => (
          <div key={h.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-emerald-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
                  ₹{h.pricePerNight} / night
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{h.name}</h3>
                  <span className="text-amber-500 font-bold text-xs flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {h.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {h.address}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {h.facilities.map((fac, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setSelectedHotelModal(h)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" /> Contact Hotel / Booking Info
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Contact Modal */}
      {selectedHotelModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 text-slate-900">
            <h3 className="text-lg font-bold text-slate-900">{selectedHotelModal.name}</h3>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs space-y-2">
              <p className="font-bold text-emerald-900">Direct Helpline & Reception</p>
              <p className="text-base font-extrabold text-emerald-700">{selectedHotelModal.contactPhone}</p>
              <p className="text-[11px] text-slate-600">Available Rooms Right Now: <strong className="text-slate-900">{selectedHotelModal.availableRooms} rooms</strong></p>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-800">Facilities & Amenities</p>
              <ul className="grid grid-cols-2 gap-1.5 text-slate-600">
                {selectedHotelModal.facilities.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                showNotification(`Referral code sent to ${selectedHotelModal.contactPhone}!`);
                setSelectedHotelModal(null);
              }}
              className="w-full bg-slate-900 text-white text-xs font-bold py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Get Directions & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
