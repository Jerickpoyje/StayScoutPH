import express from 'express';

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache = { timestamp: 0, data: null };

function buildOverpassQuery() {
  return `[out:json][timeout:60];
(
  node["tourism"~"hotel|hostel|guest_house|resort"](11.0,118.0,19.0,123.0);
  way["tourism"~"hotel|hostel|guest_house|resort"](11.0,118.0,19.0,123.0);
  relation["tourism"~"hotel|hostel|guest_house|resort"](11.0,118.0,19.0,123.0);
);
out center;`;
}

function getCategoryFromTourism(tourismType) {
  if (tourismType === 'resort') return 'Luxury';
  if (tourismType === 'hostel') return 'Adventure';
  if (tourismType === 'guest_house' || tourismType === 'guest house') return 'City Stay';
  if (tourismType === 'hotel') return 'City Stay';
  return 'City Stay';
}

function getLocationFromTags(tags) {
  if (!tags) return 'Luzon, Philippines';
  const city =
    tags['addr:city'] ||
    tags['addr:suburb'] ||
    tags['addr:state'] ||
    tags['addr:region'] ||
    tags['addr:county'];
  return city ? `${city}, Philippines` : 'Luzon, Philippines';
}

function getImageFromTags(tags) {
  if (!tags) return null;
  return tags.image || tags['image'] || tags['photo'] || tags['img'] || null;
}

function getRandomPrice(type) {
  if (type === 'resort') return '₱8,200 / night';
  if (type === 'hostel') return '₱1,200 / night';
  if (type === 'guest house') return '₱2,000 / night';
  return '₱3,500 / night';
}

function getRandomRating() {
  return (4 + Math.random() * 1).toFixed(1);
}

function getRandomAvailability() {
  return Math.floor(Math.random() * 12) + 1;
}

function normalizeElements(elements) {
  const seen = new Set();

  return elements
    .map((element) => {
      const tourismType = element.tags?.tourism || 'accommodation';
      const name = element.tags?.name || element.tags?.operator || tourismType;
      const latitude = element.lat ?? element.center?.lat;
      const longitude = element.lon ?? element.center?.lon;

      if (latitude == null || longitude == null) {
        return null;
      }

      const id = `${element.type}/${element.id}`;
      if (seen.has(id)) {
        return null;
      }
      seen.add(id);

      const type = tourismType === 'guest_house' ? 'guest house' : tourismType;
      const category = getCategoryFromTourism(tourismType);
      const location = getLocationFromTags(element.tags);
      const image = getImageFromTags(element.tags) ||
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80';

      return {
        id,
        name,
        latitude,
        longitude,
        lat: latitude,
        lng: longitude,
        type,
        category,
        location,
        price: element.tags?.price || getRandomPrice(type),
        rating: Number(element.tags?.stars) || Number(getRandomRating()),
        available: Math.max(1, Number(element.tags?.capacity) || getRandomAvailability()),
        description:
          element.tags?.description ||
          element.tags?.name ||
          `${type.charAt(0).toUpperCase() + type.slice(1)} stay in Luzon`,
        image
      };
    })
    .filter(Boolean);
}

export async function fetchAccommodations() {
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_TTL_MS) {
    return cache.data;
  }

  const overpassUrl = 'https://overpass-api.de/api/interpreter';
  const query = buildOverpassQuery();

  const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(query)}`, {
    headers: {
      'User-Agent': 'StayScoutPH/1.0',
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Overpass API responded with ${response.status}: ${body.slice(0, 300)}`);
  }

  const payload = await response.json();
  const accommodations = normalizeElements(payload.elements || []);
  cache = { timestamp: Date.now(), data: accommodations };
  return accommodations;
}

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/accommodations', async (req, res) => {
  try {
    const accommodations = await fetchAccommodations();
    res.json(accommodations);
  } catch (error) {
    console.error('Accommodation fetch error:', error);
    res.status(502).json({
      error: 'Failed to fetch accommodations from Overpass API',
      details: error.message
    });
  }
});

export default app;
