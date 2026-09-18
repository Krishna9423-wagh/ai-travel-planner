'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Sparkles, Map, BookMarked, Zap, Shield, Globe2, ArrowRight, Star, Users, Clock } from 'lucide-react';

const GlobeScene = dynamic(() => import('@/components/3d/Globe'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false });

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Itineraries',
    description:
      'GPT-4o crafts personalized day-by-day plans tailored to your budget, interests, and travel style.',
  },
  {
    icon: Map,
    title: 'Interactive Maps',
    description:
      'Every restaurant, attraction, and hotel plotted on a live Google Map. Navigate with ease.',
  },
  {
    icon: Shield,
    title: 'Smart Budget Planning',
    description:
      'Get a detailed cost breakdown so you know exactly where your money goes before you leave.',
  },
  {
    icon: BookMarked,
    title: 'Save & Revisit',
    description:
      'Store all your dream trips and access them anytime. Your perfect itinerary is just a click away.',
  },
  {
    icon: Globe2,
    title: 'Any Destination',
    description:
      'From Tokyo to Tuscany, our AI has deep knowledge of destinations worldwide.',
  },
  {
    icon: Clock,
    title: 'Instant Generation',
    description:
      'Get a complete, detailed travel plan in under 30 seconds. More time planning fun, less time planning.',
  },
];

const stats = [
  { value: '10K+', label: 'Trips Generated' },
  { value: '180+', label: 'Countries Covered' },
  { value: '4.9★', label: 'User Rating' },
  { value: '< 30s', label: 'Generation Time' },
];

const destinations = [
  { name: 'Tokyo', country: 'Japan', emoji: '🇯🇵' },
  { name: 'Paris', country: 'France', emoji: '🇫🇷' },
  { name: 'Bali', country: 'Indonesia', emoji: '🇮🇩' },
  { name: 'New York', country: 'USA', emoji: '🇺🇸' },
  { name: 'Rome', country: 'Italy', emoji: '🇮🇹' },
  { name: 'Dubai', country: 'UAE', emoji: '🇦🇪' },
  { name: 'Kyoto', country: 'Japan', emoji: '🇯🇵' },
  { name: 'Barcelona', country: 'Spain', emoji: '🇪🇸' },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <ParticleField />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-gold-400 text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              Powered by GPT-4o & Google Maps
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Plan Your{' '}
              <span className="gold-text-shimmer">Dream Trip</span>
              <br />
              with AI Magic
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/60 text-xl leading-relaxed mb-8 max-w-lg"
            >
              Pick a destination, set your budget, and watch AI generate a complete
              day-by-day itinerary with restaurants, attractions, and insider tips — in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/plan"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gold-gradient text-obsidian-950 font-bold text-lg hover:scale-105 active:scale-95 transition-transform glow-gold"
              >
                <Sparkles size={20} />
                Start Planning Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/trips"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white/80 hover:text-white hover:border-gold-500/30 transition-all"
              >
                <BookMarked size={18} />
                View My Trips
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-6 mt-10 pt-10 border-t border-white/10"
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-bold text-2xl gold-text">{value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Glow backdrop */}
            <div className="absolute inset-0 rounded-full bg-gold-500/5 blur-3xl scale-75" />
            <GlobeScene />

            {/* Floating info cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 -left-4 glass-gold rounded-2xl p-3 flex items-center gap-3"
            >
              <div className="text-2xl">🗼</div>
              <div>
                <div className="text-white text-sm font-semibold">Paris, France</div>
                <div className="text-gold-400 text-xs">5 days • $2,400</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-24 -right-4 glass-gold rounded-2xl p-3 flex items-center gap-3"
            >
              <div className="text-2xl">🏯</div>
              <div>
                <div className="text-white text-sm font-semibold">Tokyo, Japan</div>
                <div className="text-gold-400 text-xs">7 days • $3,800</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-8 glass rounded-2xl px-4 py-2 flex items-center gap-2 border border-gold-500/20"
            >
              <Star size={14} className="text-gold-400 fill-gold-400" />
              <span className="text-white/80 text-sm font-medium">AI Generated</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-gold-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Popular Destinations Ticker */}
      <section className="py-10 border-y border-white/5 overflow-hidden bg-obsidian-900/30">
        <div className="flex gap-6 animate-[scroll_30s_linear_infinite]" style={{ width: 'max-content' }}>
          {[...destinations, ...destinations].map((dest, i) => (
            <Link
              key={i}
              href={`/plan`}
              className="flex items-center gap-2 px-5 py-3 rounded-full glass border border-white/5 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all group whitespace-nowrap"
            >
              <span className="text-xl">{dest.emoji}</span>
              <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">
                {dest.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-gold-400 text-sm font-medium mb-5">
              <Zap size={14} />
              Everything You Need
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-5">
              Travel planning,{' '}
              <span className="gold-text">reimagined</span>
            </h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">
              From destination discovery to day-by-day scheduling, our AI handles it all.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="gradient-border p-6 glass rounded-2xl group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors">
                  <Icon size={22} className="text-gold-400" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-32 px-6 bg-obsidian-900/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-5">
              Three steps to your{' '}
              <span className="gold-text">perfect trip</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-10 left-1/2 w-px h-full -translate-x-1/2 bg-gradient-to-b from-gold-500/30 via-gold-500/10 to-transparent hidden lg:block" />

            {[
              {
                step: '01',
                title: 'Choose Your Destination',
                desc: 'Search any city worldwide using Google Places. Set your budget, trip duration, travel style, and number of travelers.',
                emoji: '🌍',
              },
              {
                step: '02',
                title: 'AI Builds Your Itinerary',
                desc: 'GPT-4o crafts a personalized day-by-day plan with real restaurants, attractions, and practical tips — in under 30 seconds.',
                emoji: '✨',
              },
              {
                step: '03',
                title: 'Save & Explore',
                desc: 'Browse your plan on an interactive map. Save the trip for later and access it anytime from any device.',
                emoji: '🗺️',
              },
            ].map(({ step, title, desc, emoji }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col`}
              >
                <div className="flex-1 glass rounded-2xl p-8 gradient-border">
                  <div className="font-display text-5xl font-black gold-text opacity-30 mb-3">{step}</div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-white/50 leading-relaxed">{desc}</p>
                </div>
                <div className="w-20 h-20 rounded-2xl glass-gold flex items-center justify-center text-4xl flex-shrink-0 lg:block hidden">
                  {emoji}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-900/10 via-gold-700/5 to-gold-900/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            Ready to explore{' '}
            <span className="gold-text">the world?</span>
          </h2>
          <p className="text-white/50 text-xl mb-10">
            Join thousands of travelers who plan smarter with AI. Your next adventure is one click away.
          </p>
          <Link
            href="/plan"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gold-gradient text-obsidian-950 font-bold text-xl hover:scale-105 active:scale-95 transition-transform glow-gold"
          >
            <Sparkles size={24} />
            Plan My Dream Trip
            <ArrowRight size={20} />
          </Link>
          <p className="mt-6 text-white/30 text-sm flex items-center justify-center gap-2">
            <Users size={14} />
            Free to use • No account required • 10,000+ trips generated
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold gold-text text-lg">TravelAI</span>
            <span className="text-white/30 text-sm">— AI-Powered Travel Planning</span>
          </div>
          <div className="text-white/30 text-sm">
            Built with Next.js, OpenAI & Google Maps
          </div>
        </div>
        {/* Developer Contact Row */}
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/20 text-xs">© 2024 TravelAI. All rights reserved.</div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-display font-semibold text-sm" style={{color: '#f59e0b'}}>👨‍💻 Krishna Wagh</span>
            <a href="tel:+917840946414" className="text-white/40 hover:text-yellow-400 transition-colors text-xs">📞 +91 7840946414</a>
            <a href="mailto:waghk833@gmail.com" className="text-white/40 hover:text-yellow-400 transition-colors text-xs">✉️ waghk833@gmail.com</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
