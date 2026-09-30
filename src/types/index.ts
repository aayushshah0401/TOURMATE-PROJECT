export type UserRole = 'tourist' | 'business' | 'admin' | 'kiosk';

export type LanguageCode = 'en' | 'hi' | 'gu' | 'mr';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  language: LanguageCode;
  interests: string[];
  avatar?: string;
}

export interface Attraction {
  id: string;
  name: string;
  destinationId: string;
  category: 'History' | 'Nature' | 'Food' | 'Culture' | 'Shopping' | 'Adventure' | 'Religious';
  description: string;
  longDescription?: string;
  lat: number;
  lng: number;
  image: string;
  rating: number;
  reviewsCount: number;
  entryFee: string;
  recommendedDuration: string;
  openingHours: string;
  address: string;
  qrCode?: string;
  historicalFacts?: string[];
}

export interface Hotel {
  id: string;
  name: string;
  destinationId: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  lat: number;
  lng: number;
  address: string;
  image: string;
  facilities: string[];
  contactPhone: string;
  contactEmail?: string;
  availableRooms: number;
  businessOwnerId?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  destinationId: string;
  cuisine: string[];
  rating: number;
  reviewsCount: number;
  priceRange: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  lat: number;
  lng: number;
  address: string;
  image: string;
  signatureDishes: string[];
  openingHours: string;
  contactPhone: string;
  businessOwnerId?: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  lat: number;
  lng: number;
  bestTimeToVisit: string;
  avgBudgetPerDay: number;
  category: string;
  attractionsCount: number;
  hotelsCount: number;
  restaurantsCount: number;
}

export interface ItineraryActivity {
  id: string;
  timeSlot: string; // e.g. "09:00 AM - 11:30 AM"
  title: string;
  description: string;
  type: 'attraction' | 'meal' | 'travel' | 'stay' | 'rest';
  locationName: string;
  lat?: number;
  lng?: number;
  estimatedCost: number;
  durationMinutes: number;
  tips?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dateLabel: string; // e.g. "Day 1 - Heritage & Flavors"
  activities: ItineraryActivity[];
  dayEstimatedCost: number;
  daySummary: string;
}

export interface TripPlan {
  id: string;
  destination: string;
  destinationId?: string;
  durationDays: number;
  budgetInINR: number;
  travelersCount: number;
  interests: string[];
  travelStyle: 'relaxed' | 'balanced' | 'fast-paced';
  days: ItineraryDay[];
  totalEstimatedCost: number;
  createdAt: string;
  aiNotes?: string;
}

export interface KioskDevice {
  id: string;
  name: string;
  locationName: string;
  city: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'maintenance';
  lastActive: string;
  usageCount: number;
  installedHardware: string[];
}

export interface EmergencyContact {
  id: string;
  title: string;
  phone: string;
  category: 'police' | 'medical' | 'tourist' | 'disaster' | 'women';
  description: string;
  lat?: number;
  lng?: number;
  address?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  language?: LanguageCode;
  locations?: { name: string; lat: number; lng: number }[];
  quickActions?: { label: string; action: string }[];
}

export interface BusinessListing {
  id: string;
  businessName: string;
  category: 'hotel' | 'restaurant' | 'guide';
  ownerEmail: string;
  phone: string;
  address: string;
  city: string;
  description: string;
  pricing: string;
  status: 'active' | 'pending';
  viewsCount: number;
  clicksCount: number;
}
