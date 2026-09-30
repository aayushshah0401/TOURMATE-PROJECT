import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  INITIAL_ATTRACTIONS,
  INITIAL_HOTELS,
  INITIAL_RESTAURANTS,
  INITIAL_KIOSKS,
  EMERGENCY_CONTACTS
} from '../../data/mockData';
import { Landmark, Hotel, Utensils, Monitor, ShieldAlert, Filter, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TourismMap: React.FC = () => {
  const { selectedDestination } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [activeCategory, setActiveCategory] = useState<'all' | 'attraction' | 'hotel' | 'restaurant' | 'kiosk' | 'emergency'>('all');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const centerLat = selectedDestination?.lat || 23.0225;
    const centerLng = selectedDestination?.lng || 72.5714;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 13,
      zoomControl: true
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | TourMate GIS'
    }).addTo(map);

    // Helper for custom colored DivIcons
    const createCustomIcon = (color: string, symbol: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; items-center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">${symbol}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
    };

    // 1. Add Attractions
    if (activeCategory === 'all' || activeCategory === 'attraction') {
      INITIAL_ATTRACTIONS.forEach(attr => {
        const marker = L.marker([attr.lat, attr.lng], {
          icon: createCustomIcon('#10b981', '🏛️')
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
            <strong style="font-size: 13px; color: #0f172a;">${attr.name}</strong>
            <p style="font-size: 11px; color: #64748b; margin: 4px 0;">${attr.category} • ${attr.entryFee}</p>
            <p style="font-size: 11px; color: #334155;">${attr.description}</p>
          </div>
        `);
      });
    }

    // 2. Add Hotels
    if (activeCategory === 'all' || activeCategory === 'hotel') {
      INITIAL_HOTELS.forEach(h => {
        const marker = L.marker([h.lat, h.lng], {
          icon: createCustomIcon('#6366f1', '🏨')
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
            <strong style="font-size: 13px; color: #0f172a;">${h.name}</strong>
            <p style="font-size: 11px; color: #059669; font-weight: bold;">₹${h.pricePerNight} / night</p>
            <p style="font-size: 11px; color: #334155;">${h.facilities.slice(0, 2).join(', ')}</p>
          </div>
        `);
      });
    }

    // 3. Add Restaurants
    if (activeCategory === 'all' || activeCategory === 'restaurant') {
      INITIAL_RESTAURANTS.forEach(r => {
        const marker = L.marker([r.lat, r.lng], {
          icon: createCustomIcon('#f59e0b', '🍽️')
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
            <strong style="font-size: 13px; color: #0f172a;">${r.name}</strong>
            <p style="font-size: 11px; color: #d97706; font-weight: bold;">${r.cuisine.join(', ')}</p>
            <p style="font-size: 11px; color: #334155;">${r.address}</p>
          </div>
        `);
      });
    }

    // 4. Add Kiosks
    if (activeCategory === 'all' || activeCategory === 'kiosk') {
      INITIAL_KIOSKS.forEach(k => {
        const marker = L.marker([k.lat, k.lng], {
          icon: createCustomIcon('#0f172a', '🖥️')
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
            <span style="background: #10b981; color: white; font-size: 9px; padding: 2px 6px; rounded: 4px; font-weight: bold;">SMART KIOSK ONLINE</span>
            <br/><strong style="font-size: 13px; color: #0f172a;">${k.name}</strong>
            <p style="font-size: 11px; color: #475569; margin-top: 2px;">${k.locationName}</p>
          </div>
        `);
      });
    }

    // 5. Add Emergency Centers
    if (activeCategory === 'all' || activeCategory === 'emergency') {
      EMERGENCY_CONTACTS.filter(e => e.lat && e.lng).forEach(e => {
        const marker = L.marker([e.lat!, e.lng!], {
          icon: createCustomIcon('#ef4444', '🚑')
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
            <strong style="font-size: 13px; color: #dc2626;">${e.title}</strong>
            <p style="font-size: 11px; color: #0f172a; font-weight: bold;">Phone: ${e.phone}</p>
            <p style="font-size: 11px; color: #475569;">${e.address}</p>
          </div>
        `);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedDestination, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Filter Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-600" />
            Interactive Tourism GIS Map
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time map view of monuments, verified hotels, street food, emergency stations, and Smart Tourist Kiosks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeCategory === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            All Pins
          </button>
          <button
            onClick={() => setActiveCategory('attraction')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activeCategory === 'attraction' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🏛️ Heritage
          </button>
          <button
            onClick={() => setActiveCategory('hotel')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activeCategory === 'hotel' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🏨 Hotels
          </button>
          <button
            onClick={() => setActiveCategory('restaurant')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activeCategory === 'restaurant' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🍽️ Food
          </button>
          <button
            onClick={() => setActiveCategory('kiosk')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activeCategory === 'kiosk' ? 'bg-slate-900 text-amber-400 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🖥️ Kiosks
          </button>
          <button
            onClick={() => setActiveCategory('emergency')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activeCategory === 'emergency' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🚑 Emergency
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg h-[600px] w-full">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200 text-xs space-y-1.5 font-semibold text-slate-700">
          <p className="text-[10px] uppercase font-bold text-slate-400">Map Legend</p>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Heritage Sites</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span> Hotels & Resorts</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Food & Restaurants</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-900 inline-block"></span> Smart Kiosks</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Emergency Hospitals</div>
        </div>
      </div>
    </div>
  );
};
