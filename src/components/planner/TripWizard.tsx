'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, DollarSign, Calendar, Users, Compass, Heart,
  ArrowRight, ArrowLeft, Sparkles, Loader2, Check
} from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { TripFormData } from '@/types/trip';
import { Trip } from '@/types/trip';
import DestinationSearch from './DestinationSearch';
import toast from 'react-hot-toast';

const travelStyles = [
  { value: 'cultural', label: 'Cultural', emoji: '🏛️' },
  { value: 'adventure', label: 'Adventure', emoji: '🧗' },
  { value: 'relaxation', label: 'Relaxation', emoji: '🏖️' },
  { value: 'foodie', label: 'Foodie', emoji: '🍜' },
  { value: 'romantic', label: 'Romantic', emoji: '💑' },
  { value: 'backpacker', label: 'Backpacker', emoji: '🎒' },
];

const interests = [
  'Museums', 'Street Food', 'Architecture', 'Nightlife', 'Nature',
  'Shopping', 'History', 'Art', 'Sports', 'Photography', 'Beaches', 'Mountains',
];

const budgetTypes: Array<{ value: TripFormData['budgetType']; label: string; range: string; color: string }> = [
  { value: 'budget', label: 'Budget', range: 'Under $1,500', color: 'green' },
  { value: 'mid-range', label: 'Mid-Range', range: '$1,500 – $5,000', color: 'gold' },
  { value: 'luxury', label: 'Luxury', range: '$5,000+', color: 'purple' },
];

interface Props {
  onComplete: (trip: Trip) => void;
}

export default function TripWizard({ onComplete }: Props) {
  const { wizardStep, setWizardStep, currentForm, setCurrentForm, isGenerating, setIsGenerating } = useTripStore();
  const [localInterests, setLocalInterests] = useState<string[]>([]);

  const step = wizardStep;

  const updateForm = (data: Partial<TripFormData>) => setCurrentForm(data);

  const handleGenerate = async () => {
    if (!currentForm.destination) {
      toast.error('Please select a destination first');
      return;
    }

    const form: TripFormData = {
      destination: currentForm.destination || 'Paris',
      country: currentForm.country || 'France',
      lat: currentForm.lat || 48.8566,
      lng: currentForm.lng || 2.3522,
      budget: currentForm.budget || 2000,
      budgetType: currentForm.budgetType || 'mid-range',
      duration: currentForm.duration || 5,
      startDate: currentForm.startDate || new Date().toISOString().split('T')[0],
      travelers: currentForm.travelers || 1,
      travelStyle: currentForm.travelStyle || 'cultural',
      interests: localInterests,
    };

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Generation failed');

      const trip: Trip = await response.json();
      onComplete(trip);
      toast.success('Your trip itinerary is ready! ✨');
    } catch {
      toast.error('Failed to generate trip. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    { title: 'Where to?', icon: MapPin },
    { title: 'Trip Details', icon: Calendar },
    { title: 'Your Style', icon: Heart },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {steps.map(({ title, icon: Icon }, i) => (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setWizardStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === step
                  ? 'bg-gold-gradient text-obsidian-950 glow-gold-sm'
                  : i < step
                  ? 'glass-gold text-gold-400 cursor-pointer'
                  : 'glass text-white/30 cursor-default'
              }`}
            >
              {i < step ? (
                <Check size={14} />
              ) : (
                <Icon size={14} />
              )}
              <span className="hidden sm:inline">{title}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`h-px w-6 ${i < step ? 'bg-gold-500/50' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🌍</div>
              <h2 className="font-display text-2xl font-bold text-white">Where do you want to go?</h2>
              <p className="text-white/50 mt-2">Search any city or destination worldwide</p>
            </div>

            <DestinationSearch
              value={currentForm.destination || ''}
              onSelect={({ name, country, lat, lng }) =>
                updateForm({ destination: name, country, lat, lng })
              }
            />

            {currentForm.destination && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-gold rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                  <MapPin size={18} className="text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">{currentForm.destination}</div>
                  <div className="text-gold-400 text-sm">{currentForm.country}</div>
                </div>
                <div className="ml-auto">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <Check size={12} className="text-gold-400" />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">📋</div>
              <h2 className="font-display text-2xl font-bold text-white">Trip Details</h2>
              <p className="text-white/50 mt-2">Tell us more about your trip preferences</p>
            </div>

            {/* Budget Type */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-3">Budget Range</label>
              <div className="grid grid-cols-3 gap-3">
                {budgetTypes.map(({ value, label, range }) => (
                  <button
                    key={value}
                    onClick={() => updateForm({ budgetType: value })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      currentForm.budgetType === value
                        ? 'border-gold-500/60 bg-gold-500/10 text-gold-400'
                        : 'border-white/10 glass text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-xs mt-0.5 opacity-70">{range}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Amount */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Total Budget: <span className="text-gold-400 font-bold">${(currentForm.budget || 2000).toLocaleString()}</span>
              </label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 z-10" />
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={100}
                  value={currentForm.budget || 2000}
                  onChange={(e) => updateForm({ budget: Number(e.target.value) })}
                  className="w-full h-2 rounded-full appearance-none bg-obsidian-700 cursor-pointer accent-gold-500"
                />
              </div>
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>$500</span>
                <span>$20,000</span>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Duration: <span className="text-gold-400 font-bold">{currentForm.duration || 5} days</span>
              </label>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={currentForm.duration || 5}
                onChange={(e) => updateForm({ duration: Number(e.target.value) })}
                className="w-full h-2 rounded-full appearance-none bg-obsidian-700 cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>1 day</span>
                <span>30 days</span>
              </div>
            </div>

            {/* Date & Travelers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  <Calendar size={14} className="inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={currentForm.startDate || ''}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => updateForm({ startDate: e.target.value })}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white text-sm bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  <Users size={14} className="inline mr-1" />
                  Travelers
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={currentForm.travelers || 1}
                  onChange={(e) => updateForm({ travelers: Number(e.target.value) })}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white text-sm bg-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">✨</div>
              <h2 className="font-display text-2xl font-bold text-white">Your Travel Style</h2>
              <p className="text-white/50 mt-2">Help AI personalize your perfect trip</p>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-3">
                <Compass size={14} className="inline mr-1" />
                Travel Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {travelStyles.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    onClick={() => updateForm({ travelStyle: value })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      currentForm.travelStyle === value
                        ? 'border-gold-500/60 bg-gold-500/10 text-white'
                        : 'border-white/10 glass text-white/60 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    <div className="text-xl mb-1">{emoji}</div>
                    <div className="text-xs font-medium">{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-3">
                <Heart size={14} className="inline mr-1" />
                Interests (pick any)
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() =>
                      setLocalInterests((prev) =>
                        prev.includes(interest)
                          ? prev.filter((i) => i !== interest)
                          : [...prev, interest]
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm border transition-all ${
                      localInterests.includes(interest)
                        ? 'border-gold-500/60 bg-gold-500/10 text-gold-400'
                        : 'border-white/10 glass text-white/50 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Card */}
            <div className="glass-gold rounded-2xl p-5 space-y-2">
              <div className="font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles size={15} className="text-gold-400" />
                Trip Summary
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-white/50">Destination</div>
                <div className="text-white font-medium">{currentForm.destination || '—'}</div>
                <div className="text-white/50">Duration</div>
                <div className="text-white font-medium">{currentForm.duration || 5} days</div>
                <div className="text-white/50">Budget</div>
                <div className="text-gold-400 font-medium">${(currentForm.budget || 2000).toLocaleString()}</div>
                <div className="text-white/50">Travelers</div>
                <div className="text-white font-medium">{currentForm.travelers || 1} person(s)</div>
                <div className="text-white/50">Style</div>
                <div className="text-white font-medium capitalize">{currentForm.travelStyle || 'cultural'}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setWizardStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setWizardStep(step + 1)}
            disabled={step === 0 && !currentForm.destination}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-obsidian-950 font-semibold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Continue
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !currentForm.destination}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 glow-gold"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate My Trip
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
