import { MapPin, Heart, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-lg font-semibold text-slate-950">
            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-soft">
              <MapPin size={20} />
            </div>
            StayScout PH
          </div>
          <p className="max-w-md text-sm text-slate-600">
            Modern accommodation discovery for Luzon, built with clean UI, fast navigation, and map-based search.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</p>
            <Link to="/" className="block text-sm text-slate-600 hover:text-slate-950">Home</Link>
            <Link to="/discover" className="block text-sm text-slate-600 hover:text-slate-950">Discover</Link>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Resources</p>
            <a href="https://overpass-api.de" target="_blank" rel="noreferrer" className="block text-sm text-slate-600 hover:text-slate-950">Overpass API</a>
            <a href="https://openstreetmap.org" target="_blank" rel="noreferrer" className="block text-sm text-slate-600 hover:text-slate-950">OpenStreetMap</a>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">About</p>
            <p className="flex items-center gap-2 text-sm text-slate-600">
              <Heart size={14} /> Built for travel discovery
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-600">
              <Compass size={14} /> Focused on Luzon, Philippines
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
