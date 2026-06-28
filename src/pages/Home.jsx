import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Search, Sparkles, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    name: 'Baguio',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    description: 'Cool mountain haven'
  },
  {
    name: 'Tagaytay',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    description: 'Ridge-top views'
  },
  {
    name: 'Batangas',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    description: 'Coastal paradise'
  },
  {
    name: 'La Union',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    description: 'Surf and sand'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function Home() {
  const handleExploreMap = () => {
    window.location.href = '/discover';
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
      >
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop)',
            backgroundBlendMode: 'overlay'
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />

        {/* Animated Background Shapes */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute -left-20 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles size={16} className="text-cyan-300" />
            <span className="text-sm text-white">Discover Luzon's Hidden Gems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Discover Your Perfect Stay Across Luzon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl"
          >
            Explore hotels, resorts, and accommodations using an interactive map
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="mt-12 w-full max-w-2xl"
          >
            <div className="flex gap-3">
              <div className="flex-1 rounded-full bg-white/95 px-6 py-4 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Search size={20} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search destinations, hotels..."
                    className="w-full bg-transparent text-slate-700 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-2xl transition hover:bg-blue-700"
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreMap}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-semibold text-white shadow-2xl transition hover:shadow-cyan-500/50"
          >
            <Navigation size={18} />
            Explore Map
            <ArrowRight size={18} />
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex h-8 w-5 items-center justify-center rounded-full border-2 border-white/40">
            <div className="h-2 w-1 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Destinations Section */}
      <section className="relative z-20 -mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-slate-950 sm:text-5xl">Featured Destinations</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Explore our most popular destinations across Luzon
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="relative -mt-20 flex h-20 flex-col justify-end bg-white p-4">
                  <h3 className="text-lg font-bold text-slate-950">{destination.name}</h3>
                  <p className="text-sm text-slate-600">{destination.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-20 sm:px-6 lg:px-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, linear: true }}
          className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-bold text-white sm:text-5xl"
          >
            Ready to Explore Luzon?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8 text-lg text-blue-100"
          >
            Start your journey with StayScout PH and discover your next favorite destination
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreMap}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-blue-600 shadow-2xl transition hover:bg-blue-50"
          >
            Explore Map Now
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
