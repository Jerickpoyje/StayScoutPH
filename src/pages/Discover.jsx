import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Search, Filter, Layers, MapPin, Loader2 } from 'lucide-react';
import useFetchPlaces from '../hooks/useFetchPlaces.js';
import PropertyCard from '../components/PropertyCard.jsx';

const categories = ['Beachfront', 'City Stay', 'Adventure', 'Luxury'];
const LUZON_CENTER = [16.5, 121.0];
const DEFAULT_ZOOM = 6;

function getPlaceCategory(place) {
  if (place.category) return place.category;
  if (!place.type) return 'City Stay';
  if (place.type === 'resort') return 'Luxury';
  if (place.type === 'hostel') return 'Adventure';
  return 'City Stay';
}

export default function Discover() {
  const { places, loading } = useFetchPlaces();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredPlaces = useMemo(() => {
    return places
      .map((place) => ({
        ...place,
        lat: place.lat ?? place.latitude,
        lng: place.lng ?? place.longitude,
        category: getPlaceCategory(place)
      }))
      .filter((place) => place.lat != null && place.lng != null)
      .filter((place) => activeCategory === 'All' || place.category === activeCategory);
  }, [activeCategory, places]);

  const nearbyPlaces = useMemo(() => {
    if (!selectedPlace) {
      return filteredPlaces.slice(0, 3);
    }
    return filteredPlaces.filter((place) => place.id !== selectedPlace.id).slice(0, 3);
  }, [selectedPlace, filteredPlaces]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Grid */}
      <div className="grid gap-4 xl:grid-cols-[420px_1fr] min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-30 overflow-y-auto rounded-r-3xl border-r border-slate-200 bg-white p-6 shadow-xl lg:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Discover</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 lg:text-3xl">Search stays across Luzon</h2>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, linear: true }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-blue-50 text-blue-700"
            >
              <Layers size={20} />
            </motion.div>
          </div>

          <div className="mt-8 space-y-5">
            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="flex items-center gap-3 text-slate-600">
                <Search size={18} className="text-blue-600" />
                <input
                  type="search"
                  placeholder="Search locations, amenities..."
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Categories</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeCategory === 'All'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  onClick={() => setActiveCategory('All')}
                >
                  All
                </motion.button>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Smart Filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300"
            >
              <div className="flex items-center gap-3 text-slate-700">
                <Filter size={18} className="text-blue-600" />
                <p className="text-sm font-semibold">Smart filters</p>
              </div>
              <div className="mt-4 grid gap-2 text-xs text-slate-600">
                <span className="rounded-xl bg-white px-3 py-2 transition hover:bg-blue-50 cursor-pointer">
                  Budget friendly
                </span>
                <span className="rounded-xl bg-white px-3 py-2 transition hover:bg-blue-50 cursor-pointer">
                  Map enabled
                </span>
                <span className="rounded-xl bg-white px-3 py-2 transition hover:bg-blue-50 cursor-pointer">
                  Curated stays
                </span>
                <span className="rounded-xl bg-white px-3 py-2 transition hover:bg-blue-50 cursor-pointer">
                  Popular regions
                </span>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-2xl border border-blue-200 bg-blue-50 p-4"
            >
              <p className="text-sm font-semibold text-blue-900">
                {loading ? (
                  <span className="text-sm text-slate-700">Loading accommodations…</span>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-blue-600">{filteredPlaces.length}</span>
                    <span className="ml-2">
                      properties found {activeCategory !== 'All' && `in ${activeCategory}`}
                    </span>
                  </>
                )}
              </p>
            </motion.div>
          </div>
        </motion.aside>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col gap-4 p-4 min-h-screen overflow-visible lg:p-6"
        >
          {/* Map Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg lg:p-6 flex-shrink-0"
          >
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-600 font-bold">Interactive Map</p>
                <h3 className="mt-1 text-xl font-bold text-slate-950 lg:text-2xl">Explore Luzon Stays</h3>
              </div>
              <p className="max-w-xl text-xs text-slate-600 lg:text-sm">
                Tap markers to preview properties • Scroll to zoom • {filteredPlaces.length} stays available
              </p>
            </div>
          </motion.div>

          {/* Map Container - WITH FIXED HEIGHT */}
          <div className="relative flex-1 min-h-[400px] overflow-hidden rounded-2xl border border-slate-200 shadow-2xl">
            {/* Loading State */}
            {isMapLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, linear: true }}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 shadow-lg"
                >
                  <Loader2 size={20} className="text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Loading map...</span>
                </motion.div>
              </motion.div>
            )}

            {/* Leaflet Map */}
            <MapContainer
              center={LUZON_CENTER}
              zoom={DEFAULT_ZOOM}
              scrollWheelZoom={true}
              className="h-full w-full !z-0"
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
            >
              <ZoomControl position="bottomright" />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                onLoad={() => setIsMapLoading(false)}
              />

              {/* Place Markers */}
              {filteredPlaces.map((place) => (
                <CircleMarker
                  key={place.id}
                  center={[place.lat, place.lng]}
                  radius={10}
                  pathOptions={{
                    color: selectedPlace?.id === place.id ? '#dc2626' : '#2563EB',
                    fillColor: selectedPlace?.id === place.id ? '#dc2626' : '#2563EB',
                    fillOpacity: 0.85,
                    weight: 2,
                    opacity: 1
                  }}
                  eventHandlers={{
                    click: () => setSelectedPlace(place)
                  }}
                >
                    <Popup className="custom-popup">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-2 text-sm"
                      >
                        <p className="font-bold text-slate-950">{place.name}</p>
                        <p className="text-slate-600">{place.location}</p>
                        <p className="text-blue-600 font-semibold">{place.price}</p>
                        <p className="text-xs text-slate-500">{place.category}</p>
                      </motion.div>
                    </Popup>
                  </CircleMarker>
              ))}
            </MapContainer>

            {/* Map Info Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute bottom-4 left-4 z-20 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm lg:bottom-6 lg:left-6"
            >
              <div className="flex items-center gap-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-950">Luzon, Philippines</p>
                  <p className="text-xs text-slate-600">{filteredPlaces.length} listings</p>
                </div>
              </div>
            </motion.div>
          </div>

          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 rounded-[2rem] bg-white shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="relative h-80 overflow-hidden bg-slate-900">
                <img
                  src={selectedPlace.image || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'}
                  alt={selectedPlace.name || 'Selected property'}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
                <div className="absolute left-6 bottom-6 right-6 text-white">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-200">{selectedPlace.category || 'Stay'}</p>
                  <h3 className="mt-3 text-3xl font-bold leading-tight">{selectedPlace.name || 'Selected Property'}</h3>
                </div>
              </div>
              <div className="space-y-5 p-6 lg:p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{selectedPlace.location || 'Luzon, Philippines'}</p>
                    <p className="mt-3 text-lg font-semibold text-slate-950">{selectedPlace.description || 'A cozy stay with essential comforts and local charm.'}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{selectedPlace.price || 'Price unavailable'}</span>
                    <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">{selectedPlace.rating?.toFixed ? selectedPlace.rating.toFixed(1) : selectedPlace.rating} ★</span>
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{selectedPlace.available || 1} rooms</span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Type</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{selectedPlace.type || 'Hotel'}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Location</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{selectedPlace.location || 'Luzon, Philippines'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Properties Grid Below Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden xl:block"
          >
            <h4 className="mb-4 text-lg font-bold text-slate-950">
              {selectedPlace ? 'Also nearby' : 'Featured Properties'}
            </h4>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              {nearbyPlaces.map((place) => (
                <PropertyCard key={place.id} property={place} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Properties List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="xl:hidden bg-white p-4 lg:hidden"
      >
        <h3 className="mb-4 text-lg font-bold text-slate-950">Available Properties</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPlaces.map((place) => (
            <PropertyCard key={place.id} property={place} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
