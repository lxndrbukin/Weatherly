# Weatherly — AI-Powered Weather App

A **React weather application** with an **AI-generated natural language summary**. Get real-time current weather and a 5-day forecast for any city, alongside a friendly conversational summary powered by OpenAI.

🔗 **Live Demo**: [weatherly-rts.vercel.app](https://weatherly-rts.vercel.app)

---

## Features

- **Current Weather**: Real-time temperature, feels like, humidity, wind speed, and conditions
- **5-Day Forecast**: 3-hour interval forecast data across 5 days
- **AI Weather Summary**: Natural language summary generated from live weather data via OpenAI
- **Geolocation Support**: Detect your current location automatically via the HTML Geolocation API
- **City Search**: Search weather by city or town name
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Redux Toolkit
- SCSS

**Backend (Serverless)**
- Vercel Serverless Functions (Node.js)
- OpenAI API (`gpt-4o-mini`)

**APIs**
- OpenWeather API (current weather + forecast)
- OpenAI API (AI summary generation)

**Deployment**
- Vercel (frontend + serverless functions)

---

## Requirements

- Node.js 18+
- OpenWeather API key
- OpenAI API key

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/lxndrbukin/Weatherly.git
cd Weatherly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
OPENAI_API_KEY=your_openai_api_key
```

---

## Usage

### Start the development server

```bash
vercel dev
```

> **Note**: `vercel dev` is required (instead of `npm start`) to run the serverless functions locally.

The app will be available at `http://localhost:3000`.

---

## Project Structure

```
Weatherly/
│
├── api/
│   └── summary.ts              # Vercel serverless function → OpenAI summary
│
├── src/
│   ├── components/
│   │   ├── App/
│   │   │   └── App.tsx         # Root layout
│   │   ├── Header/
│   │   │   └── Header.tsx      # Search input + geolocation trigger
│   │   ├── CurrentWeather/
│   │   │   └── CurrentWeather.tsx  # Current conditions display
│   │   ├── Forecast/
│   │   │   └── Forecast.tsx    # 5-day forecast display
│   │   ├── Summary/
│   │   │   └── Summary.tsx     # AI-generated weather summary
│   │   └── Footer/
│   │       └── Footer.tsx
│   │
│   ├── store/
│   │   ├── slices/
│   │   │   ├── weatherSlice.ts # Redux slice + reducers
│   │   │   └── types.ts        # TypeScript types
│   │   └── thunks/
│   │       └── getWeather.ts   # Async thunks for weather + AI summary
│   │
│   ├── keys.ts                 # Environment variable exports
│   └── index.tsx               # App entry point
│
├── .env.local                  # API keys (never commit this)
├── .gitignore
└── README.md
```

---

## How the AI Summary Works

1. User searches for a city or uses geolocation
2. Two OpenWeather API calls are made — current weather and 5-day forecast
3. Relevant data is extracted and sent to the Vercel serverless function at `/api/summary`
4. The serverless function builds a prompt and calls OpenAI's `gpt-4o-mini` model
5. A friendly, conversational 2-3 sentence summary is returned and displayed

The serverless function keeps the OpenAI API key secure — it never reaches the browser.

**Example output:**
> *"Currently in London, it's a mild 12°C with a light breeze — perfect for a walk. Expect some light rain tomorrow afternoon, so keep an umbrella handy. Temperatures will gradually improve towards the weekend with highs of around 16°C."*

---

## API Keys

| Key | Where to get it | Used in |
|-----|----------------|---------|
| `REACT_APP_OPENWEATHER_API_KEY` | [openweathermap.org](https://openweathermap.org/api) | Frontend (weather data) |
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) | Serverless function (AI summary) |

---

## Deployment

The app is deployed on Vercel. To deploy your own instance:

```bash
vercel
```

Add both environment variables in your Vercel project dashboard under **Settings → Environment Variables**:

```
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
OPENAI_API_KEY=your_openai_api_key
```

---

## Future Improvements

- [ ] Hourly forecast view
- [ ] Temperature unit toggle (°C / °F)
- [ ] Weather condition animations
- [ ] Dark/light mode toggle
- [ ] Search history

---

## License

This project is open source and available for personal and educational use.
