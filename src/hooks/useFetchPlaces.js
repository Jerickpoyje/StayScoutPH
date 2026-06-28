import { useEffect, useState } from 'react';
import samplePlaces from '../data/places.js';

export default function useFetchPlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPlaces() {
      try {
        const response = await fetch('/api/accommodations', {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No accommodations returned from backend.');
        }

        setPlaces(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }
        console.warn('Failed to load accommodations, using sample data:', error.message);
        setPlaces(samplePlaces);
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
    return () => controller.abort();
  }, []);

  return { places, loading };
}
