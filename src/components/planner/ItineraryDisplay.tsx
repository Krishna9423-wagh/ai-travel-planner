'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, DollarSign, Star, ChevronDown, ChevronUp,
  Coffee, UtensilsCrossed, Moon, Camera, Mountain, ShoppingBag, Landmark, Waves
} from 'lucide-react';
import { DayItinerary, Activity } from '@/types/trip';

const activityIcons: Record<string, React.ElementType> = {
  attraction: Landmark,
  experience: Camera,
  shopping: ShoppingBag,
  nature: Mountain,
  culture: Landmark,
  adventure: Waves,
};

const mealIcons: Record<string, React.ElementType> = {
  breakfast: Coffee,
  lunch: UtensilsCrossed,
  dinner: Moon,
  snack: Coffee,
};

function ActivityCard({ activity }: { activity: Activity }) {
  const Icon = activityIcons[activity.type] || Camera;
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl p-4 border border-white/5 hover:border-gold-500/20 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
          <Icon size={16} className="text-gold-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-white text-sm">{activity.name}</h4>
            {activity.rating && (
              <div className="flex items-center gap-1 text-gold-400 text-xs flex-shrink-0">
                <Star size={11} className="fill-gold-400" />
                {activity.rating}
              </div>
            )}
          </div>
          <p className="text-white/50 text-xs mt-1 leading-relaxed line-clamp-2">{activity.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <Clock size={11} />
              {activity.duration}
            </span>
            <span className="flex items-center gap-1 text-gold-400/70 text-xs">
              <DollarSign size={11} />
              {activity.estimatedCost}
            </span>
            {activity.address && (
              <span className="flex items-center gap-1 text-white/30 text-xs truncate">
                <MapPin size={11} />
                <span className="truncate">{activity.address.split(',')[0]}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DayCard({ day, index }: { day: DayItinerary; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/10 transition-all"
    >
      {/* Day Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/2 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0">
            <span className="font-display font-black text-obsidian-950 text-sm">D{day.day}</span>
          </div>
          <div className="text-left">
            <div className="font-display font-bold text-white">{day.title}</div>
            <div className="text-white/40 text-xs mt-0.5">{day.date}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-xs hidden sm:block">
            {day.activities.length} activities • {day.meals.length} meals
          </span>
          {expanded ? (
            <ChevronUp size={18} className="text-white/40" />
          ) : (
            <ChevronDown size={18} className="text-white/40" />
          )}
        </div>
      </button>

      {/* Day Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {/* Day description */}
              <p className="text-white/50 text-sm leading-relaxed border-l-2 border-gold-500/30 pl-3">
                {day.description}
              </p>

              {/* Activities */}
              {day.activities.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Camera size={12} className="text-gold-400" />
                    Activities
                  </div>
                  <div className="space-y-2">
                    {day.activities.map((act) => (
                      <ActivityCard key={act.id} activity={act} />
                    ))}
                  </div>
                </div>
              )}

              {/* Meals */}
              {day.meals.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <UtensilsCrossed size={12} className="text-gold-400" />
                    Dining
                  </div>
                  <div className="space-y-2">
                    {day.meals.map((meal) => {
                      const MealIcon = mealIcons[meal.type] || UtensilsCrossed;
                      return (
                        <div key={meal.id} className="glass rounded-xl p-4 border border-white/5 flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                            <MealIcon size={16} className="text-white/50" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white text-sm">{meal.name}</span>
                              {meal.rating && (
                                <span className="flex items-center gap-1 text-gold-400 text-xs">
                                  <Star size={11} className="fill-gold-400" />
                                  {meal.rating}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-white/40 text-xs capitalize">{meal.type}</span>
                              <span className="text-white/20">•</span>
                              <span className="text-white/40 text-xs">{meal.cuisine}</span>
                              <span className="text-white/20">•</span>
                              <span className="text-gold-400/70 text-xs">{meal.priceRange}</span>
                            </div>
                            {meal.description && (
                              <p className="text-white/40 text-xs mt-1">{meal.description}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tips */}
              {day.tips && day.tips.length > 0 && (
                <div className="glass-gold rounded-xl p-4">
                  <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">
                    💡 Pro Tips
                  </div>
                  <ul className="space-y-1">
                    {(Array.isArray(day.tips) ? day.tips : [day.tips]).map((tip, i) => (
                      <li key={i} className="text-white/60 text-xs leading-relaxed flex items-start gap-2">
                        <span className="text-gold-500 mt-0.5">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface Props {
  itinerary: DayItinerary[];
}

export default function ItineraryDisplay({ itinerary }: Props) {
  return (
    <div className="space-y-4">
      {itinerary.map((day, i) => (
        <DayCard key={day.day} day={day} index={i} />
      ))}
    </div>
  );
}
