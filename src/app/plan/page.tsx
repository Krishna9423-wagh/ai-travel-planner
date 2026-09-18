'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  Sparkles, MapPin, DollarSign, Calendar, Globe2, ChevronRight,
  BookMarked, Share2, Printer, Star, Info, Wallet, Clock, Users
} from 'lucide-react';
import TripWizard from '@/components/planner/TripWizard';
import ItineraryDisplay from '@/components/planner/ItineraryDisplay';
import { Trip } from '@/types/trip';
import { useTripStore } from '@/store/tripStore';
import toast from 'react-hot-toast';

const TripMap = dynamic(() => import('@/components/map/TripMap'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false });

type Tab = 'itinerary' | 'map' | 'info' | 'budget';

export default function PlanPage() {
  const [generatedTrip, setGeneratedTrip] = useState<Trip | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('itinerary');
  const { saveTrip, isGenerating } = useTripStore();

  const handleTripComplete = (trip: Trip) => {
    setGeneratedTrip(trip);
  };

  const handleSave = () => {
    if (!generatedTrip) return;
    saveTrip(generatedTrip);
    toast.success('Trip saved! 🌍', { icon: '✈️' });
  };

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
        {!generatedTrip && !isGenerating ? (
          /* WIZARD */
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-gold-400 text-sm font-medium mb-5">
                <Sparkles size={14} />
                AI-Powered Planner
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Plan Your Perfect Trip
              </h1>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                Answer a few questions and our AI will craft a personalized itinerary in seconds.
              </p>
            </motion.div>

            <div className="glass rounded-3xl p-8 gradient-border max-w-2xl mx-auto">
              <TripWizard onComplete={handleTripComplete} />
            </div>
          </div>
        ) : isGenerating ? (
          /* LOADING STATE */
          <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 rounded-full border-2 border-gold-500/20 border-t-gold-500 mb-8"
            />
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Crafting Your Itinerary...
            </h2>
            <p className="text-white/50 text-center max-w-md">
              Our AI is researching the best attractions, restaurants, and hidden gems for your trip.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {['Analyzing destination', 'Selecting attractions', 'Finding restaurants', 'Building schedule'].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.5 }}
                  className="px-3 py-1.5 rounded-full glass-gold text-gold-400 text-xs font-medium"
                >
                  {step}
                </motion.div>
              ))}
            </div>
          </div>
        ) : generatedTrip ? (
          /* TRIP RESULT */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                  <Globe2 size={14} />
                  Generated Itinerary
                </div>
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
                  {generatedTrip.destination}
                  <span className="text-white/40 font-normal">, {generatedTrip.country}</span>
                </h1>
                <p className="text-white/50 mt-2 max-w-2xl">{generatedTrip.description}</p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { icon: Calendar, label: `${generatedTrip.duration} Days` },
                    { icon: DollarSign, label: `$${generatedTrip.budget.toLocaleString()}` },
                    { icon: Users, label: `${generatedTrip.travelers} Traveler(s)` },
                    { icon: Clock, label: `Starts ${new Date(generatedTrip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-white/60 text-sm">
                      <Icon size={13} className="text-gold-400" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass-gold border border-gold-500/30 text-gold-400 font-medium hover:bg-gold-500/15 transition-all"
                >
                  <BookMarked size={16} />
                  Save Trip
                </button>
                <button
                  onClick={() => setGeneratedTrip(null)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
                >
                  <Sparkles size={16} />
                  New Trip
                </button>
              </div>
            </div>

            {/* Highlights */}
            {generatedTrip.highlights && generatedTrip.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {generatedTrip.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-white/60 text-sm border border-white/5">
                    <Star size={11} className="text-gold-400 fill-gold-400" />
                    {h}
                  </div>
                ))}
              </div>
            )}

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

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'itinerary' && (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ItineraryDisplay itinerary={generatedTrip.itinerary} />
                </motion.div>
              )}

              {activeTab === 'map' && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="h-[600px] rounded-2xl overflow-hidden"
                >
                  <TripMap trip={generatedTrip} />
                </motion.div>
              )}

              {activeTab === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {[
                    { title: '🌤 Weather & Climate', items: [generatedTrip.travelInfo.weatherSummary] },
                    { title: '🗣 Language & Currency', items: [`Language: ${generatedTrip.travelInfo.language}`, `Currency: ${generatedTrip.travelInfo.currency}`, `Timezone: ${generatedTrip.travelInfo.timezone}`] },
                    { title: '📅 Best Time to Visit', items: [generatedTrip.travelInfo.bestTimeToVisit] },
                    { title: '🚌 Getting Around', items: generatedTrip.travelInfo.transportationTips },
                    { title: '🎒 Packing Essentials', items: generatedTrip.travelInfo.packingEssentials },
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
                </motion.div>
              )}

              {activeTab === 'budget' && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl p-6 gradient-border max-w-2xl"
                >
                  <h3 className="font-display font-bold text-xl text-white mb-6">Budget Breakdown</h3>
                  <div className="space-y-4">
                    {Object.entries(generatedTrip.budgetBreakdown).map(([key, value]) => (
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
