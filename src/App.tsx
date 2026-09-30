import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSearch } from './components/TouristPortal/HeroSearch';
import { DestinationCard } from './components/TouristPortal/DestinationCard';
import { DestinationDetail } from './components/TouristPortal/DestinationDetail';
import { AITripPlanner } from './components/TouristPortal/AITripPlanner';
import { TourismMap } from './components/TouristPortal/TourismMap';
import { HotelDiscovery } from './components/TouristPortal/HotelDiscovery';
import { RestaurantDiscovery } from './components/TouristPortal/RestaurantDiscovery';
import { EmergencyHelp } from './components/TouristPortal/EmergencyHelp';
import { AIAssistantDrawer } from './components/AIAssistant/AIAssistantDrawer';
import { KioskInterface } from './components/SmartKiosk/KioskInterface';
import { BusinessDashboard } from './components/BusinessDashboard/BusinessDashboard';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { Destination } from './types';
import { Compass, Sparkles, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Bot, Heart, Star } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    role,
    activeTab,
    setActiveTab,
    destinations,
    selectedDestination,
    setSelectedDestination,
    searchQuery,
    notification
  } = useApp();

  const [activeDetailDest, setActiveDetailDest] = useState<Destination | null>(null);

  // Kiosk Full Screen Mode
  if (role === 'kiosk') {
    return <KioskInterface />;
  }

  // Filter destinations by search
  const filteredDestinations = destinations.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Role Specific Views */}
        {role === 'business' ? (
          <BusinessDashboard />
        ) : role === 'admin' ? (
          <AdminDashboard />
        ) : (
          /* Tourist Views */
          <div>
            {activeTab === 'home' && (
              <div className="space-y-12">
                <HeroSearch />

                {/* Featured Destinations Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
                        <MapPin className="w-3.5 h-3.5" /> Iconic Tourist Regions
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                        Explore Popular Destinations
                      </h2>
                    </div>

                    <button
                      onClick={() => setActiveTab('destinations')}
                      className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 group"
                    >
                      View All Destinations <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations.map((dest) => (
                      <DestinationCard
                        key={dest.id}
                        destination={dest}
                        onSelect={(d) => setActiveDetailDest(d)}
                      />
                    ))}
                  </div>
                </section>

                {/* TourMate Ecosystem Highlights */}
                <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3">
                      <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-2xl w-fit">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">AI Itinerary Planner</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Input your budget, trip days, and travel interests. Gemini AI constructs a day-by-day timetable with cost estimations and interactive maps.
                      </p>
                      <button
                        onClick={() => setActiveTab('planner')}
                        className="text-xs text-amber-300 font-bold hover:underline inline-flex items-center gap-1 pt-2"
                      >
                        Create Custom Plan →
                      </button>
                    </div>

                    <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3">
                      <div className="bg-amber-500/20 text-amber-400 p-3 rounded-2xl w-fit">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Smart Kiosk Integration</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Deployable at airports, railway stations, and monuments. Tourists can scan monument QR codes or touch the screen without installing any mobile app.
                      </p>
                      <button
                        onClick={() => setActiveTab('kiosk')}
                        className="text-xs text-amber-300 font-bold hover:underline inline-flex items-center gap-1 pt-2"
                      >
                        Try Kiosk Demo →
                      </button>
                    </div>

                    <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3">
                      <div className="bg-indigo-500/20 text-indigo-400 p-3 rounded-2xl w-fit">
                        <Bot className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Multilingual AI Assistant</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Voice narration & text chat supporting English, Hindi, Gujarati, and Marathi to answer local food, direction, and heritage questions.
                      </p>
                      <button
                        onClick={() => setActiveTab('map')}
                        className="text-xs text-amber-300 font-bold hover:underline inline-flex items-center gap-1 pt-2"
                      >
                        Explore Interactive Map →
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'destinations' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h1 className="text-2xl font-black text-slate-900">Destination Directory</h1>
                  <p className="text-xs text-slate-500 font-medium">Explore heritage cities, UNESCO monuments, and natural eco-reserves.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onSelect={(d) => setActiveDetailDest(d)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'planner' && <AITripPlanner />}
            {activeTab === 'map' && <TourismMap />}
            {activeTab === 'hotels' && <HotelDiscovery />}
            {activeTab === 'restaurants' && <RestaurantDiscovery />}
            {activeTab === 'emergency' && <EmergencyHelp />}
          </div>
        )}
      </main>

      {/* Destination Detail Modal */}
      {activeDetailDest && (
        <DestinationDetail
          destination={activeDetailDest}
          onClose={() => setActiveDetailDest(null)}
        />
      )}

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
