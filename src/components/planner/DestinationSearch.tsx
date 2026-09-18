'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Loader2 } from 'lucide-react';

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface Props {
  value: string;
  onSelect: (place: { name: string; country: string; lat: number; lng: number }) => void;
}

export default function DestinationSearch({ value, onSelect }: Props) {
  const [query, setQuery] = useState(value || '');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!query || query.length < 2) {
      setPredictions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/places?input=${encodeURIComponent(query)}`);
        const data = await res.json();
        setPredictions(data.predictions || []);
        setOpen(true);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }, 350);
  }, [query]);

  const handleSelect = async (pred: Prediction) => {
    const name = pred.structured_formatting?.main_text || pred.description.split(',')[0];
    const country = pred.description.split(',').pop()?.trim() || '';
    setQuery(pred.description);
    setOpen(false);

    // Try to geocode for lat/lng
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (apiKey && apiKey !== 'your_google_maps_api_key_here') {
      try {
        const geocodeRes = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?place_id=${pred.place_id}&key=${apiKey}`
        );
        const geocodeData = await geocodeRes.json();
        const loc = geocodeData.results?.[0]?.geometry?.location;
        onSelect({ name, country, lat: loc?.lat || 0, lng: loc?.lng || 0 });
        return;
      } catch {
        // fall through
      }
    }

    // Fallback with no coords
    onSelect({ name, country, lat: 48.8566, lng: 2.3522 });
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white/60 mb-2">Destination</label>
      <div className="relative">
        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 z-10" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => predictions.length > 0 && setOpen(true)}
          placeholder="Search cities worldwide..."
          className="w-full pl-11 pr-11 py-4 glass rounded-2xl border border-white/10 text-white placeholder-white/30 text-sm transition-all"
        />
        {loading ? (
          <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-400 animate-spin" />
        ) : query ? (
          <button
            onClick={() => { setQuery(''); setPredictions([]); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
          >
            <X size={16} />
          </button>
        ) : (
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
        )}
      </div>

      <AnimatePresence>
        {open && predictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full mt-2 w-full glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          >
            {predictions.map((pred) => (
              <button
                key={pred.place_id}
                onClick={() => handleSelect(pred)}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors text-left"
              >
                <MapPin size={15} className="text-gold-400 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-medium">
                    {pred.structured_formatting?.main_text || pred.description}
                  </div>
                  {pred.structured_formatting?.secondary_text && (
                    <div className="text-white/40 text-xs mt-0.5">
                      {pred.structured_formatting.secondary_text}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
