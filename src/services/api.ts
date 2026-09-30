import { TripPlan, ChatMessage, LanguageCode, BusinessListing } from '../types';

export async function generateAITripPlan(params: {
  destination: string;
  durationDays: number;
  budgetInINR: number;
  travelersCount: number;
  interests: string[];
  language?: LanguageCode;
}): Promise<TripPlan> {
  try {
    const res = await fetch('/api/ai/plan-trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    if (data.success && data.plan) {
      return {
        id: `trip-${Date.now()}`,
        destination: params.destination,
        durationDays: params.durationDays,
        budgetInINR: params.budgetInINR,
        travelersCount: params.travelersCount,
        interests: params.interests,
        travelStyle: 'balanced',
        totalEstimatedCost: data.plan.totalEstimatedCost || params.budgetInINR * 0.85,
        days: data.plan.days || [],
        createdAt: new Date().toISOString(),
        aiNotes: data.plan.aiNotes
      };
    }
    throw new Error('Invalid plan format returned');
  } catch (err) {
    console.warn('Network call failed, returning smart client fallback plan:', err);
    return {
      id: `trip-fallback-${Date.now()}`,
      destination: params.destination,
      durationDays: params.durationDays,
      budgetInINR: params.budgetInINR,
      travelersCount: params.travelersCount,
      interests: params.interests,
      travelStyle: 'balanced',
      totalEstimatedCost: Math.round(params.budgetInINR * 0.8),
      createdAt: new Date().toISOString(),
      aiNotes: `Plan generated for ${params.destination} with focus on ${params.interests.join(', ')}.`,
      days: Array.from({ length: params.durationDays }).map((_, i) => ({
        dayNumber: i + 1,
        dateLabel: `Day ${i + 1} — ${params.interests[i % params.interests.length] || 'Heritage'} Tour`,
        dayEstimatedCost: Math.round(params.budgetInINR / params.durationDays),
        daySummary: `Explore iconic spots, local markets, and cultural landmarks of ${params.destination}.`,
        activities: [
          {
            id: `act-${i}-1`,
            timeSlot: '09:00 AM - 11:30 AM',
            title: `Morning Sightseeing in ${params.destination}`,
            description: `Visit the top heritage landmark reflecting the rich culture of ${params.destination}.`,
            type: 'attraction',
            locationName: `${params.destination} Heritage Center`,
            lat: 23.0225 + (i * 0.01),
            lng: 72.5714 + (i * 0.01),
            estimatedCost: 150,
            durationMinutes: 150,
            tips: 'Carry water and camera.'
          },
          {
            id: `act-${i}-2`,
            timeSlot: '01:00 PM - 02:30 PM',
            title: 'Authentic Local Lunch',
            description: `Taste signature traditional cuisine and local thalis in ${params.destination}.`,
            type: 'meal',
            locationName: `${params.destination} Famous Food Street`,
            lat: 23.0248 + (i * 0.005),
            lng: 72.5880 + (i * 0.005),
            estimatedCost: 350,
            durationMinutes: 90
          },
          {
            id: `act-${i}-3`,
            timeSlot: '04:30 PM - 07:00 PM',
            title: 'Evening Sunset Promenade & Shopping',
            description: `Stroll through bustling local bazaars and craft centers.`,
            type: 'attraction',
            locationName: `${params.destination} Central Bazaar`,
            lat: 23.0200 + (i * 0.008),
            lng: 72.5600 + (i * 0.008),
            estimatedCost: 300,
            durationMinutes: 150
          }
        ]
      }))
    };
  }
}

export async function askAIAssistant(
  message: string,
  language: LanguageCode = 'en',
  locationContext = 'Ahmedabad'
): Promise<string> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language, locationContext })
    });
    const data = await res.json();
    if (data.reply) return data.reply;
    return 'I am ready to help you explore!';
  } catch (err) {
    return `Welcome to ${locationContext}! You can visit Sabarmati Ashram, explore local food stalls at Manek Chowk, or ask me for emergency contacts.`;
  }
}

export async function fetchQRInfo(qrCode: string, codeName?: string) {
  try {
    const res = await fetch('/api/ai/qr-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qrCode, codeName })
    });
    const data = await res.json();
    if (data.data) return data.data;
  } catch (err) {
    console.warn('QR info API call failed, using local info.');
  }
  return {
    title: codeName || 'Historic Heritage Landmark',
    historySummary: 'This ancient UNESCO heritage monument represents the pinnacle of medieval Indo-Saracenic craftsmanship, built in the late 15th century as a refuge for weary travelers and pilgrims.',
    architecturalHighlights: [
      'Intricate hand-carved subterranean stone pillars',
      'Acoustically designed central courtyard stays 5°C cooler',
      'Symmetrical Solanki floral motifs and geometric window lattices'
    ],
    ticketAndTimings: 'Open Daily: 08:30 AM - 06:00 PM | Entry: Free / ₹25 for photography',
    audioGuideTranscript: 'Welcome traveler! As you step through these carved arches, notice how light filters through the upper domes onto the quiet water below...',
    nearbyRecommendations: ['Local Tea Stall & Fafda Shop (200m)', 'Riverfront Garden Promenade (1.2 km)', 'Crafts Heritage Museum (800m)']
  };
}

// Local Storage Business Listings Helper
const BUSINESS_STORAGE_KEY = 'tourmate_business_listings';

export function getLocalBusinessListings(): BusinessListing[] {
  const data = localStorage.getItem(BUSINESS_STORAGE_KEY);
  if (data) {
    try { return JSON.parse(data); } catch (e) { /* ignore */ }
  }
  return [
    {
      id: 'biz-1',
      businessName: 'Royal Heritage Hotel & Spa',
      category: 'hotel',
      ownerEmail: 'contact@royalheritage.com',
      phone: '+91 98765 43210',
      address: 'Lal Darwaja, Old City',
      city: 'Ahmedabad',
      description: 'Boutique heritage stay overlooking Sidi Saiyyed Mosque.',
      pricing: '₹4,500 / night',
      status: 'active',
      viewsCount: 342,
      clicksCount: 89
    },
    {
      id: 'biz-2',
      businessName: 'Grand Thali Restaurant',
      category: 'restaurant',
      ownerEmail: 'info@grandthali.com',
      phone: '+91 98765 12345',
      address: 'Ashram Road',
      city: 'Ahmedabad',
      description: 'Authentic 30-item Gujarati Royal Thali.',
      pricing: '₹450 / person',
      status: 'active',
      viewsCount: 521,
      clicksCount: 140
    }
  ];
}

export function saveLocalBusinessListing(listing: Omit<BusinessListing, 'id' | 'viewsCount' | 'clicksCount' | 'status'>): BusinessListing {
  const current = getLocalBusinessListings();
  const newListing: BusinessListing = {
    ...listing,
    id: `biz-${Date.now()}`,
    status: 'active',
    viewsCount: 1,
    clicksCount: 0
  };
  const updated = [newListing, ...current];
  localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(updated));
  return newListing;
}
