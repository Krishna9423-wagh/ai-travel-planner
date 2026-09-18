import { TripFormData } from '@/types/trip';

export function buildTripPrompt(form: TripFormData): string {
  return `You are a world-class travel planner with expertise in creating detailed, personalized itineraries.

Create a comprehensive ${form.duration}-day travel itinerary for the following trip:

**Destination:** ${form.destination}, ${form.country}
**Duration:** ${form.duration} days
**Budget:** $${form.budget} USD total (${form.budgetType} category)
**Travelers:** ${form.travelers} person(s)
**Travel Style:** ${form.travelStyle}
**Interests:** ${form.interests.join(', ')}
**Start Date:** ${form.startDate}

Generate a COMPLETE, DETAILED travel plan in the following JSON format. Be specific with real place names, real addresses, and accurate information:

{
  "destination": "${form.destination}",
  "country": "${form.country}",
  "description": "A captivating 2-3 sentence description of this destination",
  "highlights": ["highlight1", "highlight2", "highlight3", "highlight4", "highlight5"],
  "travelInfo": {
    "bestTimeToVisit": "...",
    "currency": "...",
    "language": "...",
    "timezone": "...",
    "weatherSummary": "...",
    "transportationTips": ["tip1", "tip2", "tip3"],
    "packingEssentials": ["item1", "item2", "item3", "item4"]
  },
  "budgetBreakdown": {
    "accommodation": "$X per night",
    "food": "$X per day",
    "activities": "$X total",
    "transportation": "$X total",
    "miscellaneous": "$X",
    "total": "$${form.budget}"
  },
  "itinerary": [
    {
      "day": 1,
      "date": "Day 1 date based on ${form.startDate}",
      "title": "Arrival & First Impressions",
      "description": "Overview of day 1",
      "activities": [
        {
          "id": "act-1-1",
          "name": "Real Place Name",
          "description": "Detailed description",
          "duration": "2 hours",
          "type": "attraction",
          "address": "Real address",
          "lat": 0.0,
          "lng": 0.0,
          "estimatedCost": "$X",
          "rating": 4.8
        }
      ],
      "meals": [
        {
          "id": "meal-1-1",
          "name": "Real Restaurant Name",
          "cuisine": "Cuisine Type",
          "priceRange": "$$",
          "description": "Description",
          "address": "Real address",
          "lat": 0.0,
          "lng": 0.0,
          "rating": 4.5,
          "type": "breakfast"
        }
      ],
      "tips": ["Practical tip for the day"]
    }
  ]
}

Create exactly ${form.duration} days in the itinerary array. Each day should have 3-5 activities and 2-3 meals. Use REAL coordinates (lat/lng) for all locations. Make it vivid, specific, and genuinely useful.

Return ONLY valid JSON, no markdown, no explanation.`;
}
