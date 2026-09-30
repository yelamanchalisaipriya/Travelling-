export interface TripFormData {
  name: string;
  from: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  email: string;
  pace: 'relaxed' | 'moderate' | 'intensive';
  travelStyle: 'cultural' | 'luxury' | 'adventure' | 'gastronomy' | 'nature';
  companions: 'solo' | 'couple' | 'family' | 'friends';
}

export interface CuratedDestination {
  id: string;
  title: string;
  country: string;
  tagline: string;
  image: string;
  recommendedDays: number;
  suggestedBudget: number;
  currency: string;
  tags: string[];
  highlights: string[];
}

export interface DayPlan {
  day: number;
  title: string;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  diningPick: string;
}

export interface GeneratedItinerary {
  id: string;
  tripData: TripFormData;
  durationDays: number;
  dailyPlans: DayPlan[];
  budgetBreakdown: {
    transportation: number;
    lodging: number;
    dining: number;
    experiences: number;
    buffer: number;
  };
  packingTips: string[];
  localInsights: string[];
  weatherForecast: string;
  submittedAt: string;
}
