import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// ===== ENV =====
const API_KEY = process.env.GEMINI_API_KEY || 'REPLACE_WITH_YOUR_GEMINI_KEY';
const CLIENT_KEY = process.env.CLIENT_API_KEY || 'test-client-key-123';

const app = express();
const PORT = process.env.PORT || 3000;

if (!API_KEY || API_KEY === 'REPLACE_WITH_YOUR_GEMINI_KEY') {
  console.error('❌ GEMINI_API_KEY missing or not set');
  process.exit(1);
}

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ===== GEMINI INIT =====
const genAI = new GoogleGenerativeAI(API_KEY);

// ===== SCHEMA =====
const travelItinerarySchema = {
  type: 'object',
  properties: {
    destination: { type: 'string' },
    totalDays: { type: 'number' },
    itinerary: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          day: { type: 'number' },
          title: { type: 'string' },
          activities: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                time: { type: 'string' },
                activity: { type: 'string' },
                location: { type: 'string' },
                description: { type: 'string' }
              },
              required: ['time', 'activity', 'location']
            }
          }
        },
        required: ['day', 'title', 'activities']
      }
    },
    estimatedBudget: {
      type: 'object',
      properties: {
        currency: { type: 'string' },
        amount: { type: 'number' }
      }
    },
    travelTips: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: ['destination', 'totalDays', 'itinerary']
};

// ===== HELPERS =====
function cleanBase64(base64) {
  if (!base64) return null;
  return base64
    .replace(/^data:image\/[a-zA-Z+]+;base64,/, '')
    .replace(/\s/g, '');
}

function detectMimeType(base64) {
  if (base64.startsWith('/9j/')) return 'image/jpeg';
  if (base64.startsWith('iVBORw0KGgo')) return 'image/png';
  if (base64.startsWith('R0lGODlh')) return 'image/gif';
  if (base64.startsWith('UklGR')) return 'image/webp';
  return 'image/png';
}

function saveItinerary(itinerary) {
  // mock DB save
  return { status: "saved", id: "trip_123" };
}


// 🔥 STRIP MARKDOWN FENCES
function stripJsonMarkdown(text) {
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
}

// ===== AUTH =====
function authMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== CLIENT_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }
  next();
}

// ===== ROUTE =====
app.post('/process-travel', authMiddleware, async (req, res) => {
  try {
    const { prompt, image } = req.body;

    if (!prompt || !image) {
      return res.status(400).json({ error: 'Missing prompt or image' });
    }

    const cleanedBase64 = cleanBase64(image);
    if (!cleanedBase64) {
      return res.status(400).json({ error: 'Invalid Base64 image' });
    }

    const mimeType = detectMimeType(cleanedBase64);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      config: {
        responseMimeType: 'application/json',
        responseSchema: travelItinerarySchema
      }
    });

    const promptText = `
You are a travel planning expert.
Generate a STRICT 4-day travel itinerary.
Return ONLY valid JSON. No markdown. No explanation.
`;

    const result = await model.generateContent([
      promptText,
      {
        inlineData: {
          mimeType,
          data: cleanedBase64
        }
      }
    ]);

    const response = result.response;
    const candidate = response.candidates?.[0];
    if (!candidate) throw new Error('No candidates returned');

    const part = candidate.content?.parts?.[0];
    if (!part?.text) throw new Error('No text returned');

    // 🔥 FIX HERE
    const cleanedText = stripJsonMarkdown(part.text);
    const itinerary = JSON.parse(cleanedText);

    return res.json({
      success: true,
      itinerary
    });

  } catch (error) {
    console.error('❌ Processing failed:', error.message);
    return res.status(500).json({
      error: 'AI processing failed',
      details: error.message
    });
  }
});

// ===== HEALTH =====
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ===== START =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);});