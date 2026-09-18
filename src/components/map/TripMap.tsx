'use client';

import { useEffect, useRef, useState } from 'react';
import { Trip } from '@/types/trip';
import { MapPin } from 'lucide-react';

interface Props {
  trip: Trip;
}

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

export default function TripMap({ trip }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      // Show fallback for demo mode
      setError(true);
      return;
    }

    if (window.google?.maps) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    script.onerror = () => setError(true);
    document.head.appendChild(script);

    function initMap() {
      if (!mapRef.current || !window.google) return;

      const center = { lat: trip.lat || 48.8566, lng: trip.lng || 2.3522 };

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#0d0d0d' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#0d0d0d' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
          { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
          { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
          { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
          { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
          { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
          { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
          { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
          { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
          { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
          { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
          { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
          { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
        ],
      });

      // Add markers for all activities
      trip.itinerary.forEach((day, dayIndex) => {
        day.activities.forEach((act) => {
          if (!act.lat || !act.lng) return;

          const marker = new window.google.maps.Marker({
            position: { lat: act.lat, lng: act.lng },
            map,
            title: act.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#f59e0b',
              fillOpacity: 1,
              strokeColor: '#1a1a1a',
              strokeWeight: 2,
            },
            label: {
              text: `${dayIndex + 1}`,
              color: '#0d0d0d',
              fontSize: '10px',
              fontWeight: 'bold',
            },
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="background:#1a1a1a;color:white;padding:12px;border-radius:10px;min-width:160px;border:1px solid rgba(245,158,11,0.3);">
                <div style="font-weight:bold;font-size:13px;margin-bottom:4px;">${act.name}</div>
                <div style="color:#f59e0b;font-size:11px;">Day ${day.day} • ${act.duration}</div>
                <div style="color:#888;font-size:11px;margin-top:4px;">${act.estimatedCost}</div>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      });

      setLoaded(true);
    }

    return () => {};
  }, [trip]);

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 glass rounded-2xl">
        <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center">
          <MapPin size={28} className="text-gold-400" />
        </div>
        <div className="text-center">
          <div className="text-white font-semibold mb-1">
            {trip.destination} Map
          </div>
          <div className="text-white/40 text-sm">
            Add Google Maps API key to enable live map
          </div>
          <div className="mt-3 text-white/30 text-xs">
            📍 {trip.itinerary.reduce((acc, d) => acc + d.activities.length, 0)} locations planned
          </div>
        </div>

        {/* Mock location pins */}
        <div className="flex flex-wrap justify-center gap-2 px-6">
          {trip.itinerary.slice(0, 2).flatMap((d) =>
            d.activities.slice(0, 2).map((act) => (
              <div key={act.id} className="flex items-center gap-1.5 px-3 py-1.5 glass-gold rounded-full text-xs text-gold-400">
                <MapPin size={10} />
                {act.name}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full map-container">
      <div ref={mapRef} className="w-full h-full" />
      {!loaded && (
        <div className="absolute inset-0 glass flex items-center justify-center">
          <div className="flex items-center gap-2 text-white/50">
            <MapPin size={18} className="text-gold-400 animate-pulse" />
            Loading map...
          </div>
        </div>
      )}
    </div>
  );
}
