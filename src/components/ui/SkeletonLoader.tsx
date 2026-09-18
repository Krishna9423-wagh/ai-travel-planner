'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface Props {
  rows?: number;
  className?: string;
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass rounded-2xl overflow-hidden border border-white/5 ${className}`}>
      <div className="h-40 shimmer-bg" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 rounded-lg shimmer-bg" />
        <div className="h-3 w-1/3 rounded shimmer-bg" />
        <div className="h-3 w-full rounded shimmer-bg" />
        <div className="h-3 w-4/5 rounded shimmer-bg" />
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-xl shimmer-bg" />
          ))}
        </div>
        <div className="h-10 rounded-xl shimmer-bg mt-2" />
      </div>
    </div>
  );
}

export function SkeletonItinerary({ rows = 3 }: Props) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl shimmer-bg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 rounded shimmer-bg" />
              <div className="h-3 w-1/3 rounded shimmer-bg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GeneratingLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative w-16 h-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-2 border-gold-500/20 border-t-gold-500"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={20} className="text-gold-400 animate-spin" style={{ animationDuration: '1s' }} />
        </div>
      </div>
      <div className="text-center">
        <div className="text-white font-semibold mb-1">Generating your itinerary...</div>
        <div className="text-white/40 text-sm">This takes about 20–30 seconds</div>
      </div>
    </div>
  );
}
