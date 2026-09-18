import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'AI Travel Planner — Plan Your Dream Trip with AI',
  description:
    'Generate personalized AI-powered travel itineraries with day-by-day plans, restaurant recommendations, and interactive maps. Plan your perfect trip in seconds.',
  keywords: 'AI travel planner, itinerary generator, travel planning, trip planner, GPT travel',
  openGraph: {
    title: 'AI Travel Planner',
    description: 'Plan your dream trip with AI',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-obsidian-950 text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}
