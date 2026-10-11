# Agentic Travel Planner

A multimodal travel-planning prototype that accepts a natural-language request and an inspiration image, then asks Google's Gemini model to generate a structured four-day itinerary.

## Features

- Text prompt plus image input
- Gemini multimodal processing using `gemini-2.5-flash`
- Structured JSON itinerary with day-wise activities, times, locations, budget metadata, and travel tips
- Simple browser UI built with HTML, CSS, and vanilla JavaScript
- A mocked itinerary-save action to demonstrate a downstream agent workflow

> The save action is currently mocked; this project does not persist trips to a production database.

## Architecture

```text
Browser UI
  └─ POST /process-travel (prompt + Base64 image, x-api-key)
       └─ Express backend
            └─ Gemini multimodal generation
                 └─ Structured itinerary JSON
```

## Stack

- Backend: Node.js, Express, CORS, dotenv
- AI: Google Generative AI SDK, Gemini 2.5 Flash
- Frontend: HTML, CSS, vanilla JavaScript

## Requirements

- Node.js 18 or newer
- A Google Gemini API key

## Setup

```bash
git clone https://github.com/Warrior1012/Agentic-Travel-Planner.git
cd Agentic-Travel-Planner/backend
npm install
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
CLIENT_API_KEY=replace_with_a_long_random_secret
PORT=3000
```

Start the backend:

```bash
npm start
```

Open `frontend/index.html` using a local static server such as VS Code Live Server. Ensure the frontend request URL and `x-api-key` header match your local backend configuration. Do not use a public, predictable client key for a deployed service.

## API

### `POST /process-travel`

Requires the configured `x-api-key` header and JSON body containing `prompt` and `image`. The image is sent as Base64 data. The backend returns the generated itinerary as JSON. See `backend/index.js` for the exact response shape and validation.

## Limitations

- The backend enforces a four-day itinerary in its prompt.
- The save function returns a mock identifier and does not store data.
- CORS and large request limits should be tightened for deployment.
- AI-generated locations, schedules, and budget estimates may be inaccurate; verify travel details independently.

## License

No license is specified in this repository.