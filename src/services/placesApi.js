import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://overpass-api.de/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function fetchPlaces(query) {
  // Example request builder for a future Overpass API integration.
  const overpassQuery = `?data=[out:json][timeout:25];area[name=\"Luzon\"];node["tourism"~"hotel|hostel|guest_house|apartment"](area);out body;`;
  const response = await apiClient.get(overpassQuery);
  return response.data;
}
