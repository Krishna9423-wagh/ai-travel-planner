'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowLeft, MapPin, Calendar, DollarSign, Users, Globe2,
  Star, ChevronRight, Sparkles, BookMarked, Wallet, Info, Clock
} from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { Trip } from '@/types/trip';
import ItineraryDisplay from '@/components/planner/ItineraryDisplay';

const TripMap = dynamic(() => import('@/components/map/TripMap'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false });

type Tab = 'itinerary' | 'map' | 'info' | 'budget';

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getTripById } = useTripStore();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('itinerary');

  useEffect(() => {
    const found = getTripById(params.id as string);
    if (found) setTrip(found);
    else router.push('/trips');
  }, [params.id, getTripById, router]);

  if (!trip) return null;

  const tabs: Array<{ id: Tab; label: string; icon: React.ElementType }> = [
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'info', label: 'Travel Info', icon: Info },
    { id: 'budget', label: 'Budget', icon: Wallet },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6">
      <ParticleField />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to My Trips
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-gold-400/70 text-sm mb-2">
                <Globe2 size={14} />
                Saved Trip
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white">
                {trip.destination}
                <span className="text-white/40 font-normal text-3xl">, {trip.country}</span>
              </h1>
              <p className="text-white/50 mt-3 max-w-2xl leading-relaxed">{trip.description}</p>

              <div className="flex flex-wrap gap-3 mt-5">
                {[
                  { icon: Calendar, label: `${trip.duration} Days` },
                  { icon: DollarSign, label: `$${trip.budget.toLocaleString()} Budget` },
                  { icon: Users, label: `${trip.travelers} Traveler(s)` },
                  { icon: Clock, label: new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 px-4 py-2 glass rounded-full text-white/60 text-sm border border-white/5">
                    <Icon size={13} className="text-gold-400" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/plan"
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass-gold border border-gold-500/30 text-gold-400 font-medium hover:bg-gold-500/15 transition-all"
              >
                <Sparkles size={15} />
                Plan Similar
              </Link>
            </div>
          </div>

          {/* Highlights */}
          {trip.highlights && (
            <div className="flex flex-wrap gap-2 mt-5">
              {trip.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-white/50 text-xs border border-white/5">
                  <Star size={10} className="text-gold-400 fill-gold-400" />
                  {h}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 glass rounded-2xl p-1 mb-6 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-gold-gradient text-obsidian-950'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'itinerary' && <ItineraryDisplay itinerary={trip.itinerary} />}

        {activeTab === 'map' && (
          <div className="h-[600px] rounded-2xl overflow-hidden">
            <TripMap trip={trip} />
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: '🌤 Weather', items: [trip.travelInfo.weatherSummary] },
              { title: '🗣 Language & Currency', items: [`Language: ${trip.travelInfo.language}`, `Currency: ${trip.travelInfo.currency}`, `Timezone: ${trip.travelInfo.timezone}`] },
              { title: '📅 Best Time', items: [trip.travelInfo.bestTimeToVisit] },
              { title: '🚌 Transportation', items: trip.travelInfo.transportationTips },
              { title: '🎒 Packing List', items: trip.travelInfo.packingEssentials },
            ].map(({ title, items }) => (
              <div key={title} className="glass rounded-2xl p-5 gradient-border">
                <h3 className="font-display font-semibold text-white mb-3">{title}</h3>
                <ul className="space-y-1.5">
                  {items.map((item, i) => (
                    <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                      <ChevronRight size={13} className="text-gold-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="glass rounded-2xl p-6 gradient-border max-w-2xl">
            <h3 className="font-display font-bold text-xl text-white mb-6">Budget Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(trip.budgetBreakdown).map(([key, value]) => (
                <div key={key} className={`flex items-center justify-between py-3 ${key !== 'total' ? 'border-b border-white/5' : 'pt-4 border-t-2 border-gold-500/30'}`}>
                  <span className={`capitalize ${key === 'total' ? 'font-bold text-white text-lg' : 'text-white/60'}`}>
                    {key === 'total' ? '💰 Total Budget' : key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <span className={`font-semibold ${key === 'total' ? 'gold-text text-xl font-bold' : 'text-white'}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
