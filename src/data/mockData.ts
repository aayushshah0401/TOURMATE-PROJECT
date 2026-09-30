import {
  Destination,
  Attraction,
  Hotel,
  Restaurant,
  KioskDevice,
  EmergencyContact,
  TripPlan
} from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    tagline: 'India\'s First UNESCO World Heritage City',
    description: 'A vibrant metropolis blending rich ancient heritage with modern innovation. Famous for Gandhi Ashram, intricate pols, Sabarmati Riverfront, and savory street food.',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 23.0225,
    lng: 72.5714,
    bestTimeToVisit: 'October to March',
    avgBudgetPerDay: 2500,
    category: 'Heritage & Food',
    attractionsCount: 18,
    hotelsCount: 32,
    restaurantsCount: 64
  },
  {
    id: 'kevadia',
    name: 'Statue of Unity (Kevadia)',
    state: 'Gujarat',
    tagline: 'World\'s Tallest Statue & Eco-Tourism Hub',
    description: 'Home to the colossal 182-meter Statue of Unity overlooking the Narmada River. Features Valley of Flowers, Glow Garden, Jungle Safari, and Sardar Sarovar Dam.',
    heroImage: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 21.838,
    lng: 73.7191,
    bestTimeToVisit: 'October to February',
    avgBudgetPerDay: 3500,
    category: 'Monuments & Nature',
    attractionsCount: 12,
    hotelsCount: 15,
    restaurantsCount: 22
  },
  {
    id: 'vadodara',
    name: 'Vadodara',
    state: 'Gujarat',
    tagline: 'Cultural Capital of Gujarat',
    description: 'Renowned for the opulent Laxmi Vilas Palace, serene Sayaji Baug garden, rich art heritage, and extravagant Navratri celebrations.',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 22.3072,
    lng: 73.1812,
    bestTimeToVisit: 'October to March',
    avgBudgetPerDay: 2200,
    category: 'Culture & Palaces',
    attractionsCount: 14,
    hotelsCount: 24,
    restaurantsCount: 45
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of Forts & Royal Palaces',
    description: 'Majestic hill forts, regal palaces, bustling handicraft bazaars, and legendary Rajasthani hospitality in the heart of Rajasthan.',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 26.9124,
    lng: 75.7873,
    bestTimeToVisit: 'November to February',
    avgBudgetPerDay: 3000,
    category: 'Forts & Heritage',
    attractionsCount: 25,
    hotelsCount: 50,
    restaurantsCount: 90
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun-kissed Beaches & Portuguese Heritage',
    description: 'Golden sandy beaches, vibrant night markets, Portuguese cathedrals, spice plantations, and relaxed coastal living.',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 15.2993,
    lng: 74.124,
    bestTimeToVisit: 'November to March',
    avgBudgetPerDay: 4000,
    category: 'Beaches & Relaxation',
    attractionsCount: 30,
    hotelsCount: 80,
    restaurantsCount: 120
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The Spiritual Heart of Ancient India',
    description: 'One of the oldest continuously inhabited cities in the world. Famous for sacred Ganga Ghats, evening Aarti, and spiritual aura.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 25.3176,
    lng: 82.9739,
    bestTimeToVisit: 'October to March',
    avgBudgetPerDay: 2000,
    category: 'Spiritual & Ancient',
    attractionsCount: 20,
    hotelsCount: 35,
    restaurantsCount: 50
  }
];

export const INITIAL_ATTRACTIONS: Attraction[] = [
  {
    id: 'sabarmati-ashram',
    name: 'Sabarmati Ashram',
    destinationId: 'ahmedabad',
    category: 'History',
    description: 'The historic residence of Mahatma Gandhi located on the banks of the Sabarmati River.',
    longDescription: 'Sabarmati Ashram was the epicenter of India’s freedom movement. Gandhi lived here for twelve years with Kasturba Gandhi. It houses Hridaya Kunj, a museum detailing Gandhi\'s life, manuscripts, and spinning wheels.',
    lat: 23.0602,
    lng: 72.5806,
    image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 14200,
    entryFee: 'Free',
    recommendedDuration: '1.5 - 2 Hours',
    openingHours: '08:30 AM - 06:30 PM',
    address: 'Ashram Road, Ahmedabad, Gujarat 380027',
    qrCode: 'QR-SABARMATI-001',
    historicalFacts: [
      'Base from where Mahatma Gandhi launched the historic Dandi Salt March in 1930.',
      'Houses original personal artifacts, letters, and the famous Charkha (spinning wheel).',
      'Quiet riverside atmosphere ideal for peaceful meditation and learning India’s history.'
    ]
  },
  {
    id: 'adalaj-stepwell',
    name: 'Adalaj Stepwell (Adalaj ni Vav)',
    destinationId: 'ahmedabad',
    category: 'History',
    description: 'An exquisite 5-story deep Indo-Islamic architectural marvel built in 1498.',
    longDescription: 'Built by Queen Rudadevi in memory of her husband Rana Veer Singh, this intricate stepwell served both as a water reservoir and a social gathering spot.',
    lat: 23.1667,
    lng: 72.5802,
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 8900,
    entryFee: 'Free',
    recommendedDuration: '1 Hour',
    openingHours: '08:00 AM - 06:00 PM',
    address: 'Adalaj, Gandhinagar Highway, Ahmedabad, Gujarat',
    qrCode: 'QR-ADALAJ-002',
    historicalFacts: [
      'The stepwell temperature stays 5 degrees cooler than the outside ambient air.',
      'Features unique fusion of Solanki Hindu carvings and Islamic floral motif geometric patterns.'
    ]
  },
  {
    id: 'kankaria-lake',
    name: 'Kankaria Lake & Entertainment Hub',
    destinationId: 'ahmedabad',
    category: 'Nature',
    description: 'The second largest lake in Ahmedabad featuring a zoo, toy train, balloon rides, and night stalls.',
    lat: 23.0064,
    lng: 72.6025,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewsCount: 11000,
    entryFee: '₹25',
    recommendedDuration: '2 - 3 Hours',
    openingHours: '09:00 AM - 10:00 PM',
    address: 'Maninagar, Ahmedabad, Gujarat 380008',
    qrCode: 'QR-KANKARIA-003',
    historicalFacts: [
      'Constructed in 1451 by Sultan Naghi-ud-Din Ahmad Shah II.',
      'Houses Nagina Wadi, a summer palace island in the middle of the lake.'
    ]
  },
  {
    id: 'statue-of-unity-main',
    name: 'Statue of Unity & Viewing Gallery',
    destinationId: 'kevadia',
    category: 'History',
    description: 'The colossal 182-meter tribute to Sardar Vallabhbhai Patel with high-speed elevators.',
    lat: 21.838,
    lng: 73.7191,
    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 28000,
    entryFee: '₹150 - ₹380',
    recommendedDuration: '3 - 4 Hours',
    openingHours: '08:00 AM - 06:00 PM (Closed Mondays)',
    address: 'Sardar Sarovar Dam, Kevadia, Gujarat 393151',
    qrCode: 'QR-SOU-004',
    historicalFacts: [
      'Stands at 182 meters, almost twice the height of the Statue of Liberty.',
      'The viewing gallery at 153 meters offers panoramic views of the Vindhyachal and Satpura ranges.'
    ]
  },
  {
    id: 'laxmi-vilas-palace',
    name: 'Laxmi Vilas Palace',
    destinationId: 'vadodara',
    category: 'Culture',
    description: 'Four times the size of Buckingham Palace, constructed by Maharaja Sayajirao Gaekwad III.',
    lat: 22.2937,
    lng: 73.1914,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 16500,
    entryFee: '₹250 (Includes Audio Guide)',
    recommendedDuration: '2 Hours',
    openingHours: '09:30 AM - 05:00 PM',
    address: 'J N Marg, Moti Baug, Vadodara, Gujarat 390001',
    qrCode: 'QR-LAXMI-005',
    historicalFacts: [
      'Built in 1890 in Indo-Saracenic architectural style with European stained glass windows.',
      'Features an incredible collection of armor, sculptures, and Raja Ravi Varma oil paintings.'
    ]
  },
  {
    id: 'amber-fort',
    name: 'Amber Fort (Amer Fort)',
    destinationId: 'jaipur',
    category: 'History',
    description: 'Majestic hilltop fort featuring Sheesh Mahal (Mirror Palace) and cobblestone pathways.',
    lat: 26.9855,
    lng: 75.8513,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 35000,
    entryFee: '₹100',
    recommendedDuration: '2.5 Hours',
    openingHours: '08:00 AM - 05:30 PM',
    address: 'Devisinghpura, Amer, Jaipur, Rajasthan 302001',
    qrCode: 'QR-AMBER-006',
    historicalFacts: [
      'Constructed in red sandstone and marble by Raja Man Singh I in 1592.',
      'Famous for the Sheesh Mahal where a single candle flame reflects in thousands of ceiling mirror tiles.'
    ]
  }
];

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'hotel-house-of-mg',
    name: 'The House of MG Heritage Hotel',
    destinationId: 'ahmedabad',
    rating: 4.7,
    reviewsCount: 1850,
    pricePerNight: 5500,
    lat: 23.0264,
    lng: 72.5815,
    address: 'Opp. Sidi Saiyyed Mosque, Lal Darwaja, Ahmedabad',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    facilities: ['Free WiFi', 'Heritage Pool', 'Traditional Agashiye Dining', 'Spa', 'Airport Shuttle'],
    contactPhone: '+91 79 2550 6941',
    availableRooms: 6
  },
  {
    id: 'hotel-hyatt-regency-amd',
    name: 'Hyatt Regency Ahmedabad',
    destinationId: 'ahmedabad',
    rating: 4.8,
    reviewsCount: 3200,
    pricePerNight: 7200,
    lat: 23.0415,
    lng: 72.5710,
    address: '17/A, Ashram Rd, Usmapura, Ahmedabad',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    facilities: ['Riverview Suites', 'Swimming Pool', 'Fitness Center', '24h Room Service', 'Valet Parking'],
    contactPhone: '+91 79 4017 1234',
    availableRooms: 12
  },
  {
    id: 'hotel-tent-city-sou',
    name: 'Tent City Narmada - Statue of Unity',
    destinationId: 'kevadia',
    rating: 4.6,
    reviewsCount: 980,
    pricePerNight: 8500,
    lat: 21.8450,
    lng: 73.7250,
    address: 'Dy. Collector Office Road, Kevadia, Gujarat',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    facilities: ['Luxury AC Tents', 'Buffet Meals', 'Cultural Shows', 'Buggy Service', 'Dam View'],
    contactPhone: '+91 1800 233 9003',
    availableRooms: 8
  },
  {
    id: 'hotel-welcomheritage-baroda',
    name: 'Sayaji Hotel Vadodara',
    destinationId: 'vadodara',
    rating: 4.5,
    reviewsCount: 2100,
    pricePerNight: 4200,
    lat: 22.3100,
    lng: 73.1850,
    address: 'Near Kala Ghoda Circle, Sayajiganj, Vadodara',
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=800&q=80',
    facilities: ['Multi-Cuisine Buffet', 'Business Center', 'Gym', 'Free High-Speed WiFi'],
    contactPhone: '+91 265 236 3030',
    availableRooms: 15
  }
];

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-agashiye',
    name: 'Agashiye Terrace Restaurant',
    destinationId: 'ahmedabad',
    cuisine: ['Gujarati Thali', 'Traditional Heritage', 'Vegetarian'],
    rating: 4.9,
    reviewsCount: 4200,
    priceRange: '₹₹₹',
    lat: 23.0264,
    lng: 72.5815,
    address: 'The House of MG, Opp Sidi Saiyyed Mosque, Ahmedabad',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    signatureDishes: ['Authentic Gujarati Thali', 'Kesar Shrikhand', 'Khadam Dhokla', 'Rotlo with White Butter'],
    openingHours: '12:00 PM - 03:30 PM, 07:00 PM - 10:30 PM',
    contactPhone: '+91 79 2550 6941'
  },
  {
    id: 'rest-manek-chowk',
    name: 'Manek Chowk Street Food Market',
    destinationId: 'ahmedabad',
    cuisine: ['Street Food', 'Fast Food', 'Desserts'],
    rating: 4.6,
    reviewsCount: 8900,
    priceRange: '₹',
    lat: 23.0248,
    lng: 72.5880,
    address: 'Old City, Khadia, Ahmedabad, Gujarat',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    signatureDishes: ['Gwalior Dosa', 'Chocolate Sandwich', 'Pav Bhaji', 'Kulfi Falooda'],
    openingHours: '08:00 PM - 02:00 AM (Night Market)',
    contactPhone: 'N/A (Street Food Hub)'
  },
  {
    id: 'rest-vishalla',
    name: 'Vishalla Village Restaurant & Utensil Museum',
    destinationId: 'ahmedabad',
    cuisine: ['Rural Gujarati', 'North Indian', 'Organic'],
    rating: 4.6,
    reviewsCount: 3100,
    priceRange: '₹₹',
    lat: 22.9980,
    lng: 72.5410,
    address: 'Opp. APMC Market, Vasna, Ahmedabad',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    signatureDishes: ['Baingan Bharta on Chulha', 'Bajra no Rotlo', 'Farsan Platter'],
    openingHours: '01:00 PM - 03:30 PM, 07:30 PM - 11:00 PM',
    contactPhone: '+91 79 2660 2422'
  }
];

export const INITIAL_KIOSKS: KioskDevice[] = [
  {
    id: 'kiosk-amd-airport',
    name: 'Kiosk #1 - SVPIA Airport Arrival',
    locationName: 'Sardar Vallabhbhai Patel International Airport T2 Arrival Hall',
    city: 'Ahmedabad',
    lat: 23.0772,
    lng: 72.6347,
    status: 'online',
    lastActive: 'Just now',
    usageCount: 1420,
    installedHardware: ['Touchscreen 24"', 'QR Barcode Scanner', 'Thermal Ticket Printer', 'Raspberry Pi 5']
  },
  {
    id: 'kiosk-amd-kalupur',
    name: 'Kiosk #2 - Kalupur Railway Station',
    locationName: 'Ahmedabad Junction Station Platform 1 Main Entrance',
    city: 'Ahmedabad',
    lat: 23.0305,
    lng: 72.6012,
    status: 'online',
    lastActive: '2 mins ago',
    usageCount: 2890,
    installedHardware: ['Touchscreen 32"', 'QR Scanner', 'Audio Speaker/Mic', 'Wi-Fi Hotspot']
  },
  {
    id: 'kiosk-sou-visitor',
    name: 'Kiosk #3 - Statue of Unity Ticket Plaza',
    locationName: 'Main Visitor Center, Kevadia',
    city: 'Kevadia',
    lat: 21.8375,
    lng: 73.7180,
    status: 'online',
    lastActive: '1 min ago',
    usageCount: 3120,
    installedHardware: ['Touchscreen 27"', 'Multilingual Voice Mic', 'QR Scanner', 'GPS Tracker']
  },
  {
    id: 'kiosk-baroda-palace',
    name: 'Kiosk #4 - Laxmi Vilas Palace Gate',
    locationName: 'Palace Ticket Counter & Heritage Corridor',
    city: 'Vadodara',
    lat: 22.2930,
    lng: 73.1905,
    status: 'online',
    lastActive: '5 mins ago',
    usageCount: 940,
    installedHardware: ['Touchscreen 24"', 'QR Scanner', 'NFC Payment Reader']
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'emerg-police',
    title: 'Police & Emergency Response Control',
    phone: '112 / 100',
    category: 'police',
    description: 'National Emergency Helpline for immediate police assistance.',
    address: 'City Police Headquarters'
  },
  {
    id: 'emerg-tourist-helpline',
    title: 'Ministry of Tourism 24x7 Multi-lingual Helpline',
    phone: '1363 / 1800-11-1363',
    category: 'tourist',
    description: 'Toll-free tourist safety, guidance, and assistance in 12 languages.',
    address: 'Incredible India Tourist Support'
  },
  {
    id: 'emerg-ambulance',
    title: 'Medical Ambulance Emergency Service',
    phone: '108 / 102',
    category: 'medical',
    description: 'Free 24/7 GVK EMRI Emergency Ambulance & Trauma Care.',
    address: 'Statewide Ambulance Dispatch Network'
  },
  {
    id: 'emerg-women',
    title: 'Women Safety & Helpline',
    phone: '1091',
    category: 'women',
    description: 'Dedicated women protection and emergency police escort team.',
    address: 'City Women Protection Cell'
  },
  {
    id: 'emerg-civil-hosp',
    title: 'Ahmedabad Civil Hospital Trauma Center',
    phone: '+91 79 2268 3721',
    category: 'medical',
    description: 'Major multispecialty government hospital with 24/7 ER.',
    lat: 23.0528,
    lng: 72.5934,
    address: 'Asarwa, Ahmedabad, Gujarat 380016'
  }
];

export const SAMPLE_FALLBACK_TRIP: TripPlan = {
  id: 'trip-sample-amd-3d',
  destination: 'Ahmedabad',
  destinationId: 'ahmedabad',
  durationDays: 3,
  budgetInINR: 6000,
  travelersCount: 2,
  interests: ['History', 'Food', 'Culture'],
  travelStyle: 'balanced',
  totalEstimatedCost: 5200,
  createdAt: new Date().toISOString(),
  aiNotes: 'Optimized budget plan balancing heritage pol tours, Sabarmati serene morning walk, and iconic street food experiences.',
  days: [
    {
      dayNumber: 1,
      dateLabel: 'Day 1 — Gandhi Heritage & Sabarmati Riverfront',
      dayEstimatedCost: 1600,
      daySummary: 'Explore the epicenter of India’s freedom movement and evening breeze at Sabarmati Riverfront.',
      activities: [
        {
          id: 'act-1',
          timeSlot: '09:00 AM - 11:30 AM',
          title: 'Sabarmati Ashram & Museum Walk',
          description: 'Visit Hridaya Kunj where Mahatma Gandhi lived, spin a yarn at the charkha museum, and stroll by the river.',
          type: 'attraction',
          locationName: 'Sabarmati Ashram',
          lat: 23.0602,
          lng: 72.5806,
          estimatedCost: 0,
          durationMinutes: 150,
          tips: 'Photography allowed. Visit early morning for tranquil atmosphere.'
        },
        {
          id: 'act-2',
          timeSlot: '12:30 PM - 02:30 PM',
          title: 'Authentic Gujarati Thali Lunch at Agashiye',
          description: 'Feast on unlimited farsan, rotlis, seasonal subzis, and Kesar Shrikhand served on bronze thalis.',
          type: 'meal',
          locationName: 'Agashiye, Lal Darwaja',
          lat: 23.0264,
          lng: 72.5815,
          estimatedCost: 1100,
          durationMinutes: 120,
          tips: 'Prior reservation recommended for rooftop seating.'
        },
        {
          id: 'act-3',
          timeSlot: '04:00 PM - 06:00 PM',
          title: 'Adalaj Stepwell Architectural Wonders',
          description: 'Marvel at 5-story subterranean carved stepwell pillars and cool microclimate.',
          type: 'attraction',
          locationName: 'Adalaj Stepwell',
          lat: 23.1667,
          lng: 72.5802,
          estimatedCost: 0,
          durationMinutes: 120
        },
        {
          id: 'act-4',
          timeSlot: '07:00 PM - 09:00 PM',
          title: 'Sabarmati Riverfront Sunset Promenade',
          description: 'Enjoy evening speed boat rides or bicycle rental along the manicured riverfront park.',
          type: 'attraction',
          locationName: 'Sabarmati Riverfront Park',
          lat: 23.0300,
          lng: 72.5700,
          estimatedCost: 100,
          durationMinutes: 120
        }
      ]
    },
    {
      dayNumber: 2,
      dateLabel: 'Day 2 — Heritage Pol Heritage Trail & Night Street Food',
      dayEstimatedCost: 1800,
      daySummary: 'Immerse in UNESCO heritage pols, Sidi Saiyyed Jali, and late night Manek Chowk delicacies.',
      activities: [
        {
          id: 'act-5',
          timeSlot: '08:00 AM - 10:30 AM',
          title: 'Heritage Pol Walking Tour (Kalupur to Jama Masjid)',
          description: 'Navigate wooden chabutras, secret underground escape passages, and traditional bird feeders.',
          type: 'attraction',
          locationName: 'Swaminarayan Mandir Kalupur',
          lat: 23.0290,
          lng: 72.5930,
          estimatedCost: 300,
          durationMinutes: 150
        },
        {
          id: 'act-6',
          timeSlot: '11:00 AM - 12:30 PM',
          title: 'Sidi Saiyyed Mosque & Tree of Life Stone Lattice',
          description: 'Admire the world-famous carved stone jali windows depicting intricately woven palm trees.',
          type: 'attraction',
          locationName: 'Sidi Saiyyed Mosque',
          lat: 23.0268,
          lng: 72.5810,
          estimatedCost: 0,
          durationMinutes: 90
        },
        {
          id: 'act-7',
          timeSlot: '08:30 PM - 11:00 PM',
          title: 'Midnight Street Feast at Manek Chowk',
          description: 'Try famous Gwalior Butter Dosa, Pineapple Chocolate Sandwich, and Kesar Kulfi.',
          type: 'meal',
          locationName: 'Manek Chowk',
          lat: 23.0248,
          lng: 72.5880,
          estimatedCost: 450,
          durationMinutes: 150
        }
      ]
    },
    {
      dayNumber: 3,
      dateLabel: 'Day 3 — Textiles, Science City & Souvenir Shopping',
      dayEstimatedCost: 1800,
      daySummary: 'Calico Museum textile masterpieces, Science City robotics gallery, and Law Garden shopping.',
      activities: [
        {
          id: 'act-8',
          timeSlot: '10:00 AM - 01:00 PM',
          title: 'Gujarat Science City & Robotics Gallery',
          description: 'Interactive AI robots, aquatic gallery with sharks, and space simulator rides.',
          type: 'attraction',
          locationName: 'Science City, Sola',
          lat: 23.0780,
          lng: 72.5020,
          estimatedCost: 400,
          durationMinutes: 180
        },
        {
          id: 'act-9',
          timeSlot: '05:00 PM - 08:00 PM',
          title: 'Law Garden Night Bazaar Handicraft Shopping',
          description: 'Shop for authentic Kutchi embroidered Chaniya Cholis, Bandhani dupattas, and mirrorwork wall hangings.',
          type: 'attraction',
          locationName: 'Law Garden Market',
          lat: 23.0240,
          lng: 72.5580,
          estimatedCost: 1000,
          durationMinutes: 180
        }
      ]
    }
  ]
};
