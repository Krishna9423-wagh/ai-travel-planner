'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plane, Map, BookMarked, Sparkles } from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/', label: 'Home', icon: Sparkles },
  { href: '/plan', label: 'Plan Trip', icon: Plane },
  { href: '/trips', label: 'My Trips', icon: BookMarked },
];

export default function Navbar() {
  const pathname = usePathname();
  const { savedTrips } = useTripStore();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
    >
      {/* Background blur */}
      <div className="absolute inset-0 glass border-b border-white/5" />

      {/* Logo */}
      <Link href="/" className="relative flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center glow-gold-sm group-hover:scale-110 transition-transform">
          <Map size={16} className="text-obsidian-950" />
        </div>
        <span className="font-display font-bold text-lg gold-text">
          TravelAI
        </span>
      </Link>

      {/* Nav links */}
      <div className="relative flex items-center gap-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                isActive
                  ? 'text-gold-400'
                  : 'text-white/60 hover:text-white/90'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 glass-gold rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={15} className="relative z-10" />
              <span className="relative z-10">{label}</span>
              {href === '/trips' && savedTrips.length > 0 && (
                <span className="relative z-10 w-4 h-4 rounded-full bg-gold-500 text-obsidian-950 text-[10px] font-bold flex items-center justify-center">
                  {savedTrips.length}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* CTA Button */}
      <Link
        href="/plan"
        className="relative hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-obsidian-950 bg-gold-gradient hover:scale-105 active:scale-95 transition-transform glow-gold-sm"
      >
        <Sparkles size={14} />
        Plan My Trip
      </Link>
    </motion.nav>
  );
}
