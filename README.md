# StayScout PH

An interactive accommodation discovery platform for Luzon, Philippines. Browse hotels, resorts, hostels, and guest houses on a live map powered by OpenStreetMap and Overpass API.

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

## Installation

1. Navigate to the project directory:
```bash
cd c:\Users\Win11\StayScoutPH
```

2. Install dependencies:
```bash
npm install
```

## Running the System

### Option 1: Run Both Services (Recommended)

Open two separate terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run server
```
- Runs on `http://localhost:4000`
- Provides `/api/accommodations` endpoint
- Queries Overpass API for real hotel data

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```
- Runs on `http://localhost:4173`
- Open this URL in your browser

### Option 2: If PowerShell Blocks npm Scripts

Use Command Prompt instead:

**Terminal 1 - Backend:**
```bash
cmd /c "npm run server"
```

**Terminal 2 - Frontend:**
```bash
cmd /c "npm run dev"
```

## Services & Ports

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `http://localhost:4173` | React app with Vite dev server |
| Backend | `http://localhost:4000` | Express.js API server |

## API Endpoints

### GET `/api/accommodations`

Returns a list of accommodations across Luzon.

**Response:**
```json
[
  {
    "id": "node/25389049",
    "name": "Nichols Airport Hotel",
    "latitude": 14.5242875,
    "longitude": 120.9968211,
    "type": "hotel",
    "category": "City Stay",
    "location": "Makati, Philippines",
    "price": "₱3,500 / night",
    "rating": 4.5,
    "available": 5,
    "description": "Hotel in Luzon",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?..."
  }
]
```

## Features

- 🗺️ Interactive map showing 5000+ accommodations across Luzon
- 🔍 Filter by category (Beachfront, City Stay, Adventure, Luxury)
- 📍 Click markers to view detailed hotel information
- 🎨 Responsive design with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 📱 Mobile-friendly interface

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Leaflet (maps)
- Lucide React (icons)

**Backend:**
- Express.js
- Overpass API integration
- Response caching (5-minute TTL)
- CORS enabled

## Development

### Build for Production
```bash
npm run build
```
Output goes to `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## Data Source

The application uses:
- **Overpass API** (OpenStreetMap) for real accommodation data
- **OpenStreetMap tiles** for map rendering
- **Sample fallback data** if API is unavailable

## Troubleshooting

### Port Already in Use

If port 4000 or 4173 is already in use:

**Kill process on port 4000:**
```bash
taskkill /PID <PID> /F
```

Or change the port in:
- Backend: `server.js` (modify `PORT`)
- Frontend: `vite.config.js` (modify `server.port`)

### Build Errors

Clear cache and reinstall:
```bash
rm -r node_modules package-lock.json
npm install
npm run build
```

### Frontend Can't Reach Backend

Ensure:
1. Backend is running on `http://localhost:4000`
2. Frontend has API proxy configured in `vite.config.js`
3. Check browser console for CORS errors

## Project Structure

```
StayScoutPH/
├── server.js                 # Express backend
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Root component
│   ├── pages/
│   │   ├── Home.jsx        # Home page
│   │   └── Discover.jsx    # Map & search page
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PropertyCard.jsx
│   ├── hooks/
│   │   └── useFetchPlaces.js
│   ├── services/
│   │   └── placesApi.js
│   └── data/
│       └── places.js       # Sample fallback data
└── dist/                    # Production build (after npm run build)
```

## License

MIT

## Support

For issues or questions, check the browser console and terminal output for error messages.
