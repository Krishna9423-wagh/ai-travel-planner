'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookMarked, Trash2, Eye, Sparkles, MapPin, Calendar, DollarSign,
  Users, Globe2, Search, SortAsc
} from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { Trip } from '@/types/trip';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false });

const destinationEmojis: Record<string, string> = {
  Paris: '🗼', Tokyo: '🏯', Bali: '🌴', 'New York': '🗽', Rome: '🏛️',
  Dubai: '🏙️', Barcelona: '🎸', London: '🎡', Sydney: '🦘', default: '🌍',
};

function TripCard({ trip, onDelete }: { trip: Trip; onDelete: (id: string) => void }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const emoji = destinationEmojis[trip.destination] || destinationEmojis.default;
  const daysLabel = `${trip.duration} day${trip.duration > 1 ? 's' : ''}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/20 transition-all group gradient-border"
    >
      {/* Card top banner */}
      <div className="relative h-40 bg-gradient-to-br from-obsidian-800 to-obsidian-900 flex items-center justify-center overflow-hidden">
        {/* Animated background rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-gold-500/10 animate-pulse" />
          <div className="absolute w-48 h-48 rounded-full border border-gold-500/5 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="text-7xl">{emoji}</div>

        {/* Budget badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass-gold text-gold-400 text-xs font-semibold capitalize">
          {trip.budgetType}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-xl text-white mb-0.5">
          {trip.destination}
        </h3>
        <p className="text-gold-400/80 text-sm">{trip.country}</p>

        <p className="text-white/40 text-xs mt-2 line-clamp-2">{trip.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { icon: Calendar, label: daysLabel },
            { icon: DollarSign, label: `$${trip.budget.toLocaleString()}` },
            { icon: Users, label: `${trip.travelers}p` },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-2 rounded-xl bg-white/3">
              <Icon size={13} className="text-gold-400" />
              <span className="text-white/60 text-xs">{label}</span>
            </div>
          ))}
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 mt-3 text-white/30 text-xs">
          <Calendar size={11} />
          Saved {new Date(trip.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/trips/${trip.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-semibold text-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <Eye size={14} />
            View
          </Link>
          <AnimatePresence>
            {showConfirm ? (
              <motion.button
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={() => { onDelete(trip.id); setShowConfirm(false); }}
                className="px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium"
              >
                Confirm
              </motion.button>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                className="px-3 py-2.5 rounded-xl glass border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/30 transition-all"
              >
                <Trash2 size={15} />
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function TripsPage() {
  const { savedTrips, deleteTrip } = useTripStore();
  const [search, setSearch] = useState('');

  const filtered = savedTrips.filter(
    (t) =>
      t.destination.toLowerCase().includes(search.toLowerCase()) ||
      t.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteTrip(id);
    toast.success('Trip removed');
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6">
      <ParticleField />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
              <BookMarked size={14} />
              Your Collection
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
              My Saved Trips
            </h1>
            {savedTrips.length > 0 && (
              <p className="text-white/40 mt-1">
                {savedTrips.length} trip{savedTrips.length > 1 ? 's' : ''} saved
              </p>
            )}
          </div>

          <Link
            href="/plan"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-obsidian-950 font-bold hover:scale-105 active:scale-95 transition-transform glow-gold-sm"
          >
            <Sparkles size={16} />
            Plan New Trip
          </Link>
        </motion.div>

        {savedTrips.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <div className="text-8xl mb-6">✈️</div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              No trips saved yet
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">
              Plan your first AI-powered trip and save it here to access it anytime.
            </p>
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-gradient text-obsidian-950 font-bold text-lg hover:scale-105 transition-transform glow-gold"
            >
              <Sparkles size={20} />
              Plan My First Trip
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Search */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative mb-8 max-w-sm"
            >
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search trips..."
                className="w-full pl-11 pr-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-white/30 text-sm"
              />
            </motion.div>

            {/* Grid */}
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence>
                {filtered.map((trip) => (
                  <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && search && (
              <div className="text-center py-20 text-white/40">
                No trips found for &quot;{search}&quot;
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
