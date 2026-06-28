import { motion } from 'framer-motion';

export default function PropertyCard({ property }) {
  const image = property.image || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80';
  const location = property.location || 'Luzon, Philippines';
  const price = property.price || 'Price unavailable';
  const description = property.description || 'A cozy stay with essential comforts and local charm.';
  const rating = property.rating || 4.5;
  const available = property.available || 1;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-soft"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={property.name || 'StayScout property'}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-100/75">{property.category || 'Stay'}</p>
          <h3 className="mt-1 text-xl font-semibold">{property.name || 'StayScout Listing'}</h3>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
          <span>{location}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-800">{price}</span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
        <div className="flex items-center justify-between text-sm text-slate-700">
          <span className="font-semibold text-slate-950">{rating} ★</span>
          <span>{available} rooms</span>
        </div>
      </div>
    </motion.article>
  );
}
