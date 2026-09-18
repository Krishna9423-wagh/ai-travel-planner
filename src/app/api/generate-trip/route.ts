import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildTripPrompt } from '@/lib/openai';
import { TripFormData } from '@/types/trip';
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const form: TripFormData = await req.json();

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      // Return mock data for demo
      const mockTrip = getMockTrip(form);
      return NextResponse.json(mockTrip);
    }

    const prompt = buildTripPrompt(form);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert travel planner. Always respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 8000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content from OpenAI');

    // Strip markdown code blocks if present
    const cleaned = content
      .replace(/^```json\n?/, '')
      .replace(/\n?```$/, '')
      .trim();

    const tripData = JSON.parse(cleaned);

    const trip = {
      id: uuidv4(),
      ...tripData,
      budget: form.budget,
      budgetType: form.budgetType,
      duration: form.duration,
      startDate: form.startDate,
      travelers: form.travelers,
      travelStyle: form.travelStyle,
      lat: form.lat,
      lng: form.lng,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Trip generation error:', error);
    return NextResponse.json({ error: 'Failed to generate trip' }, { status: 500 });
  }
}

function getMockTrip(form: TripFormData) {
  return {
    id: uuidv4(),
    destination: form.destination || 'Paris',
    country: form.country || 'France',
    description:
      'Paris, the City of Light, captivates visitors with its iconic landmarks, world-class cuisine, and romantic atmosphere. From the majestic Eiffel Tower to the artistic Montmartre district, every corner tells a story of history and culture.',
    highlights: [
      'Eiffel Tower at sunset',
      'Louvre Museum masterpieces',
      'Seine River cruise',
      'Charming Montmartre streets',
      'World-class French cuisine',
    ],
    budget: form.budget,
    budgetType: form.budgetType,
    duration: form.duration,
    startDate: form.startDate,
    travelers: form.travelers,
    travelStyle: form.travelStyle,
    lat: form.lat || 48.8566,
    lng: form.lng || 2.3522,
    travelInfo: {
      bestTimeToVisit: 'April–June and September–October',
      currency: 'Euro (€)',
      language: 'French',
      timezone: 'CET (UTC+1)',
      weatherSummary: 'Mild and pleasant with occasional rain; bring a light jacket',
      transportationTips: [
        'Buy a Paris Visite metro pass for unlimited travel',
        'Walking is the best way to explore central neighborhoods',
        'Taxis and Uber available but pricier than metro',
      ],
      packingEssentials: [
        'Comfortable walking shoes',
        'Light rain jacket',
        'Power adapter (Type E)',
        'Camera',
      ],
    },
    budgetBreakdown: {
      accommodation: `$${Math.round(form.budget * 0.35)} total`,
      food: `$${Math.round(form.budget * 0.25)} total`,
      activities: `$${Math.round(form.budget * 0.2)} total`,
      transportation: `$${Math.round(form.budget * 0.12)} total`,
      miscellaneous: `$${Math.round(form.budget * 0.08)} total`,
      total: `$${form.budget}`,
    },
    itinerary: Array.from({ length: Math.min(form.duration, 3) }, (_, i) => ({
      day: i + 1,
      date: new Date(new Date(form.startDate).getTime() + i * 86400000).toLocaleDateString(
        'en-US',
        { weekday: 'long', month: 'long', day: 'numeric' }
      ),
      title: ['Arrival & Iconic Landmarks', 'Art, Culture & Hidden Gems', 'Local Life & Farewell'][i],
      description: [
        'Begin your Parisian adventure with the most iconic sights. Get oriented and soak in the magic.',
        'Dive deeper into Paris art scene, visit world-famous museums and discover charming local neighborhoods.',
        'Experience Paris like a local — morning markets, café culture, and last-minute shopping.',
      ][i],
      activities: [
        {
          id: `act-${i + 1}-1`,
          name: ['Eiffel Tower', 'Louvre Museum', 'Sacré-Cœur Basilica'][i],
          description: [
            'The iconic iron lattice tower offering breathtaking panoramic views of Paris.',
            'The world\'s largest art museum, home to the Mona Lisa and Venus de Milo.',
            'Stunning white-domed basilica atop Montmartre with sweeping city views.',
          ][i],
          duration: '2-3 hours',
          type: 'attraction',
          address: [
            'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
            'Rue de Rivoli, 75001 Paris',
            '35 Rue du Chevalier de la Barre, 75018 Paris',
          ][i],
          lat: [48.8584, 48.8606, 48.8867][i],
          lng: [2.2945, 2.3376, 2.3431][i],
          estimatedCost: ['$28', '$22', 'Free'][i],
          rating: [4.9, 4.8, 4.7][i],
        },
      ],
      meals: [
        {
          id: `meal-${i + 1}-1`,
          name: ['Café de Flore', 'Le Comptoir du Relais', 'Du Pain et des Idées'][i],
          cuisine: 'French',
          priceRange: '$$',
          description: 'Classic Parisian café experience with excellent coffee and pastries.',
          address: [
            '172 Boulevard Saint-Germain, 75006 Paris',
            '9 Carrefour de l\'Odéon, 75006 Paris',
            '34 Rue Yves Toudic, 75010 Paris',
          ][i],
          lat: [48.854, 48.8503, 48.8673][i],
          lng: [2.3327, 2.3397, 2.363][i],
          rating: [4.4, 4.6, 4.8][i],
          type: 'breakfast',
        },
      ],
      tips: [
        'Book Eiffel Tower tickets online in advance to skip the long queues.',
        'The Louvre is free on the first Sunday of each month.',
        'Visit morning markets early for the best selection and atmosphere.',
      ][i],
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
