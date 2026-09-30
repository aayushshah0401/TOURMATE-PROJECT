import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey });
    console.log('✅ Gemini Gen AI SDK initialized successfully.');
  } catch (err) {
    console.warn('⚠️ Gemini initialization warning:', err);
  }
} else {
  console.log('ℹ️ GEMINI_API_KEY not provided or default. AI endpoints will use intelligent rule-based responses if API call is not available.');
}

// API Route: AI Trip Planner
app.post('/api/ai/plan-trip', async (req, res) => {
  try {
    const { destination, durationDays = 3, budgetInINR = 5000, travelersCount = 2, interests = ['History', 'Food'], language = 'en' } = req.body;

    const prompt = `You are TourMate, an expert travel planner for India tourism.
Generate a structured JSON travel itinerary for:
- Destination: ${destination}
- Duration: ${durationDays} days
- Total Budget: ₹${budgetInINR} INR
- Travelers: ${travelersCount}
- Interests: ${interests.join(', ')}
- Preferred Output Language: ${language}

Output MUST be strictly valid JSON with no markdown formatting or backticks around it if possible, matching this schema:
{
  "totalEstimatedCost": number,
  "aiNotes": string,
  "days": [
    {
      "dayNumber": number,
      "dateLabel": string,
      "dayEstimatedCost": number,
      "daySummary": string,
      "activities": [
        {
          "id": string,
          "timeSlot": string,
          "title": string,
          "description": string,
          "type": "attraction" | "meal" | "travel" | "stay" | "rest",
          "locationName": string,
          "lat": number,
          "lng": number,
          "estimatedCost": number,
          "durationMinutes": number,
          "tips": string
        }
      ]
    }
  ]
}

Provide realistic coordinates in or near ${destination} (e.g. around Ahmedabad lat 23.02, lng 72.57). Keep costs within budget.`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7
          }
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({ success: true, plan: parsed });
        }
      } catch (geminiError) {
        console.error('Gemini generateContent error in plan-trip:', geminiError);
      }
    }

    // Fallback if AI key missing or error
    return res.json({
      success: true,
      isFallback: true,
      plan: {
        totalEstimatedCost: Math.round(budgetInINR * 0.85),
        aiNotes: `Generated smart fallback itinerary for ${destination} focusing on ${interests.join(' & ')}.`,
        days: Array.from({ length: Math.min(durationDays, 5) }).map((_, idx) => ({
          dayNumber: idx + 1,
          dateLabel: `Day ${idx + 1} — ${interests[idx % interests.length] || 'Heritage'} Exploration`,
          dayEstimatedCost: Math.round(budgetInINR / durationDays),
          daySummary: `Explore iconic spots, local markets, and cultural landmarks of ${destination}.`,
          activities: [
            {
              id: `act-${idx}-1`,
              timeSlot: '09:00 AM - 11:30 AM',
              title: `Morning Sightseeing in ${destination}`,
              description: `Visit the top heritage landmark reflecting the rich culture of ${destination}.`,
              type: 'attraction',
              locationName: `${destination} Heritage Center`,
              lat: 23.0225 + (idx * 0.01),
              lng: 72.5714 + (idx * 0.01),
              estimatedCost: 150,
              durationMinutes: 150,
              tips: 'Carry water and camera.'
            },
            {
              id: `act-${idx}-2`,
              timeSlot: '01:00 PM - 02:30 PM',
              title: 'Authentic Local Lunch',
              description: `Taste signature traditional cuisine and local thalis in ${destination}.`,
              type: 'meal',
              locationName: `${destination} Famous Food Street`,
              lat: 23.0248 + (idx * 0.005),
              lng: 72.5880 + (idx * 0.005),
              estimatedCost: 350,
              durationMinutes: 90
            },
            {
              id: `act-${idx}-3`,
              timeSlot: '04:30 PM - 07:00 PM',
              title: 'Evening Sunset Promenade & Shopping',
              description: `Stroll through bustling local bazaars and craft centers.`,
              type: 'attraction',
              locationName: `${destination} Central Bazaar`,
              lat: 23.0200 + (idx * 0.008),
              lng: 72.5600 + (idx * 0.008),
              estimatedCost: 300,
              durationMinutes: 150
            }
          ]
        }))
      }
    });
  } catch (error: any) {
    console.error('Server error /api/ai/plan-trip:', error);
    res.status(500).json({ error: error.message || 'Failed to generate trip plan' });
  }
});

// API Route: AI Chatbot / Assistant
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, language = 'en', locationContext = 'Ahmedabad' } = req.body;

    const systemInstruction = `You are TourMate, an empathetic, highly knowledgeable AI Tourism Assistant for Indian destinations.
User Language: ${language}
Current Location Context: ${locationContext}
Answer concisely (2-4 sentences max unless detailed list requested).
If recommending places, include approximate budget (in ₹) and location name.`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemInstruction}\nUser message: ${message}`
        });

        const replyText = response.text || 'I am happy to assist your journey with TourMate!';
        return res.json({ success: true, reply: replyText });
      } catch (err) {
        console.error('Gemini chat error:', err);
      }
    }

    // Smart conversational fallback
    let fallbackReply = `Welcome to ${locationContext}! `;
    const msg = (message || '').toLowerCase();

    if (msg.includes('food') || msg.includes('thali') || msg.includes('eat') || msg.includes('lunch') || msg.includes('dinner')) {
      fallbackReply += `For authentic local meals in ${locationContext}, visit Agashiye for a traditional rooftop thali (~₹1,100) or head to Manek Chowk after 8 PM for night street food (₹150-₹300).`;
    } else if (msg.includes('3 hours') || msg.includes('near me') || msg.includes('visit') || msg.includes('place')) {
      fallbackReply += `In the next 3 hours, you can visit Sabarmati Ashram (Free entry, 1.5 hrs) and take a serene walk along Sabarmati Riverfront Park (~₹50 entry).`;
    } else if (msg.includes('emergency') || msg.includes('police') || msg.includes('help') || msg.includes('hospital')) {
      fallbackReply += `For emergency assistance, call Police at 112 / 100, Tourist Helpline at 1363, or Ambulance at 108. Civil Hospital is available 24/7.`;
    } else if (msg.includes('open') || msg.includes('time') || msg.includes('ticket')) {
      fallbackReply += `Most heritage monuments in ${locationContext} are open daily from 8:30 AM to 6:00 PM. Sabarmati Ashram is open 8:30 AM - 6:30 PM with free entry.`;
    } else {
      fallbackReply += `I can help you plan trips, discover nearby attractions, find verified hotels, taste local street food, or call emergency help. What would you like to explore?`;
    }

    return res.json({ success: true, reply: fallbackReply, isFallback: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// API Route: QR Information Explainer
app.post('/api/ai/qr-info', async (req, res) => {
  try {
    const { qrCode, codeName } = req.body;

    const prompt = `You are TourMate's Smart Tourist Kiosk AI Guide.
Explain the monument or tourist spot associated with QR code "${qrCode}" or name "${codeName}".
Return JSON with this schema:
{
  "title": string,
  "historySummary": string,
  "architecturalHighlights": string[],
  "ticketAndTimings": string,
  "audioGuideTranscript": string,
  "nearbyRecommendations": string[]
}`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });

        if (response.text) {
          return res.json({ success: true, data: JSON.parse(response.text) });
        }
      } catch (err) {
        console.error('Gemini QR info error:', err);
      }
    }

    return res.json({
      success: true,
      isFallback: true,
      data: {
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
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'TourMate AI Engine', hasApiKey: Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY') });
});

// Vite Server Integration for Dev vs Production
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 TourMate Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
