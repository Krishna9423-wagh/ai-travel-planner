export interface DayItinerary {
  day: number;
  date: string;
  title: string;
  description: string;
  activities: Activity[];
  meals: Meal[];
  tips: string[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: string;
  type: 'attraction' | 'experience' | 'shopping' | 'nature' | 'culture' | 'adventure';
  address: string;
  lat?: number;
  lng?: number;
  estimatedCost: string;
  rating?: number;
  imageUrl?: string;
}

export interface Meal {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  description: string;
  address: string;
  lat?: number;
  lng?: number;
  rating?: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface TravelInfo {
  bestTimeToVisit: string;
  currency: string;
  language: string;
  timezone: string;
  weatherSummary: string;
  transportationTips: string[];
  packingEssentials: string[];
}

export interface BudgetBreakdown {
  accommodation: string;
  food: string;
  activities: string;
  transportation: string;
  miscellaneous: string;
  total: string;
}

export interface Trip {
  id: string;
  destination: string;
  country: string;
  description: string;
  budget: number;
  budgetType: 'budget' | 'mid-range' | 'luxury';
  duration: number;
  startDate: string;
  travelers: number;
  travelStyle: string;
  coverImage?: string;
  lat?: number;
  lng?: number;
  itinerary: DayItinerary[];
  travelInfo: TravelInfo;
  budgetBreakdown: BudgetBreakdown;
  highlights: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TripFormData {
  destination: string;
  country: string;
  lat: number;
  lng: number;
  budget: number;
  budgetType: 'budget' | 'mid-range' | 'luxury';
  duration: number;
  startDate: string;
  travelers: number;
  travelStyle: string;
  interests: string[];
}
