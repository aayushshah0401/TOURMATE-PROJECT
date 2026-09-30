import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  LanguageCode,
  UserProfile,
  Destination,
  TripPlan,
  ChatMessage
} from '../types';
import {
  INITIAL_DESTINATIONS,
  SAMPLE_FALLBACK_TRIP
} from '../data/mockData';

export type MainTab =
  | 'home'
  | 'destinations'
  | 'planner'
  | 'map'
  | 'hotels'
  | 'restaurants'
  | 'emergency'
  | 'kiosk'
  | 'business'
  | 'admin';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  user: UserProfile;
  updateUser: (fields: Partial<UserProfile>) => void;
  destinations: Destination[];
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  activeTrip: TripPlan | null;
  setActiveTrip: (trip: TripPlan | null) => void;
  savedTrips: TripPlan[];
  saveTrip: (trip: TripPlan) => void;
  deleteTrip: (id: string) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const defaultUser: UserProfile = {
  id: 'usr-101',
  name: 'Aayush Shah',
  email: 'aayush.shah2201@gmail.com',
  role: 'tourist',
  language: 'en',
  interests: ['History', 'Food', 'Culture', 'Nature']
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('tourist');
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [activeTab, setActiveTabState] = useState<MainTab>('home');
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [destinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(INITIAL_DESTINATIONS[0]);
  const [activeTrip, setActiveTrip] = useState<TripPlan | null>(SAMPLE_FALLBACK_TRIP);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>(() => {
    const local = localStorage.getItem('tourmate_saved_trips');
    if (local) {
      try { return JSON.parse(local); } catch (e) { /* ignore */ }
    }
    return [SAMPLE_FALLBACK_TRIP];
  });
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Namaste! I am your TourMate AI Tourism Assistant. Ask me about heritage places, local street food, direction guides, or emergency safety.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'kiosk') {
      setActiveTabState('kiosk');
    } else if (newRole === 'business') {
      setActiveTabState('business');
    } else if (newRole === 'admin') {
      setActiveTabState('admin');
    } else {
      if (activeTab === 'kiosk' || activeTab === 'business' || activeTab === 'admin') {
        setActiveTabState('home');
      }
    }
    showNotification(`Switched role to ${newRole.toUpperCase()}`);
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    setUser(prev => ({ ...prev, language: lang }));
  };

  const setActiveTab = (tab: MainTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const saveTrip = (trip: TripPlan) => {
    const exists = savedTrips.some(t => t.id === trip.id);
    let updated: TripPlan[];
    if (exists) {
      updated = savedTrips.map(t => (t.id === trip.id ? trip : t));
    } else {
      updated = [trip, ...savedTrips];
    }
    setSavedTrips(updated);
    localStorage.setItem('tourmate_saved_trips', JSON.stringify(updated));
    showNotification('Trip itinerary saved successfully!');
  };

  const deleteTrip = (id: string) => {
    const updated = savedTrips.filter(t => t.id !== id);
    setSavedTrips(updated);
    localStorage.setItem('tourmate_saved_trips', JSON.stringify(updated));
    if (activeTrip?.id === id) {
      setActiveTrip(updated[0] || null);
    }
    showNotification('Trip itinerary deleted.');
  };

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg]);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        user,
        updateUser,
        destinations,
        selectedDestination,
        setSelectedDestination,
        activeTrip,
        setActiveTrip,
        savedTrips,
        saveTrip,
        deleteTrip,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        chatMessages,
        addChatMessage,
        searchQuery,
        setSearchQuery,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
