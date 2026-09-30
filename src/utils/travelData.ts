import amalfiImg from '../assets/images/dest_amalfi_coast_1790759077907.jpg';
import kyotoImg from '../assets/images/dest_kyoto_path_1790759095676.jpg';
import swissImg from '../assets/images/dest_swiss_chalet_1790759112171.jpg';
import { CuratedDestination, GeneratedItinerary, TripFormData } from '../types/travel';

export const CURATED_DESTINATIONS: CuratedDestination[] = [
  {
    id: 'amalfi',
    title: 'Positano & Amalfi Coast',
    country: 'Italy',
    tagline: 'Pastel cliffside villas cascading into the azure Tyrrhenian Sea',
    image: amalfiImg,
    recommendedDays: 7,
    suggestedBudget: 3800,
    currency: 'USD',
    tags: ['Coastal', 'Boutique', 'Gastronomy'],
    highlights: ['Path of the Gods clifftop trek', 'Capri private wooden boat charter', 'Limoncello tasting in Ravello'],
  },
  {
    id: 'kyoto',
    title: 'Kyoto & Uji Heritage',
    country: 'Japan',
    tagline: 'Quiet stone paths, 1,000-year-old wooden shrines & meditative tea houses',
    image: kyotoImg,
    recommendedDays: 8,
    suggestedBudget: 3200,
    currency: 'USD',
    tags: ['Culture', 'Temples', 'Culinary'],
    highlights: ['Arashiyama bamboo grove at dawn', 'Traditional Kaiseki dinner in Gion', 'Matcha ceremony in Uji gardens'],
  },
  {
    id: 'swiss-alps',
    title: 'Zermatt & Swiss Alps',
    country: 'Switzerland',
    tagline: 'Majestic Matterhorn pinnacles, timber chalets & pristine glacier railways',
    image: swissImg,
    recommendedDays: 6,
    suggestedBudget: 4200,
    currency: 'USD',
    tags: ['Alpine', 'Scenic', 'Adventure'],
    highlights: ['Gornergrat panoramic cogwheel train', 'Matterhorn Glacier Paradise tram', 'Fondue evening in rustic chalet'],
  },
];

export function calculateTripDays(startStr: string, endStr: string): number {
  if (!startStr || !endStr) return 7;
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(diffDays + 1, 30));
}

export function synthesizeItinerary(data: TripFormData): GeneratedItinerary {
  const duration = calculateTripDays(data.startDate, data.endDate);
  const dest = data.destination.trim();
  const origin = data.from.trim();
  const b = Number(data.budget) || 2500;

  const transportation = Math.round(b * 0.32);
  const lodging = Math.round(b * 0.36);
  const dining = Math.round(b * 0.18);
  const experiences = Math.round(b * 0.10);
  const buffer = b - (transportation + lodging + dining + experiences);

  const daysToGenerate = Math.min(duration, 5);
  const dailyPlans = [];

  const genericActivities = [
    {
      title: `Arrival in ${dest} & Neighborhood Orientation`,
      theme: 'Settling In & First Impressions',
      morning: `Board flight from ${origin}. Settle into boutique accommodation in prime central district.`,
      afternoon: `Unwind with a stroll through the historic quarter, visiting artisanal cafes and scenic viewpoints.`,
      evening: `Welcome dinner featuring authentic regional specialties and curated local wine pairing.`,
      diningPick: 'Handpicked local bistro with terrace seating',
    },
    {
      title: `Iconic Highlights & Cultural Immersion`,
      theme: 'Architecture & Living History',
      morning: `Early access visit to ${dest}'s premier landmark before crowds arrive, accompanied by audio guide insights.`,
      afternoon: `Explore hidden courtyards, independent artisan boutiques, and scenic river/harbor overlooks.`,
      evening: `Sunset golden hour photography walk followed by casual tapas or family-run tavern dinner.`,
      diningPick: 'Hidden gem trattoria celebrated by local residents',
    },
    {
      title: `Scenic Excursion & Culinary Discoveries`,
      theme: 'Nature & Gastronomy',
      morning: `Scenic day excursion to nearby coastal cliffs, mountain trail, or panoramic viewpoint.`,
      afternoon: `Private regional cooking masterclass or tasting session of local delicacies and organic produce.`,
      evening: `Lakeside or rooftop cocktails under the stars with live acoustic regional melodies.`,
      diningPick: 'Chef-driven farm-to-table restaurant with panoramic vistas',
    },
    {
      title: `Artisans, Secret Gardens & Leisurely Pace`,
      theme: 'Off-The-Beaten-Path Treasures',
      morning: `Browse morning flea and flower markets. Discover quiet botanical gardens and historic galleries.`,
      afternoon: `Bespoke workshop visit with local craftsmen (ceramics, textiles, or watchmaking).`,
      evening: `Atmospheric candlelight dinner in a centuries-old cellar or seaside pavilion.`,
      diningPick: 'Historic estate dining room specializing in seasonal terroir',
    },
    {
      title: `Grand Finale & Fond Farewell`,
      theme: 'Reflections & Golden Memories',
      morning: `Leisurely breakfast, final souvenir hunting at specialty gourmet grocers.`,
      afternoon: `Relaxing thermal spa visit or private scenic boat/cable car ride.`,
      evening: `Celebratory farewell multi-course tasting dinner toast to an unforgettable expedition.`,
      diningPick: 'Michelin-guide recognized fine dining with sunset view',
    },
  ];

  for (let i = 0; i < daysToGenerate; i++) {
    dailyPlans.push({
      day: i + 1,
      ...genericActivities[i % genericActivities.length],
    });
  }

  const packingTips = [
    'Lightweight weather-appropriate layering pieces for varying altitudes/breezes',
    'Comfortable, broken-in walking shoes for cobblestones and historic stone paths',
    'Universal power adapter and compact high-capacity portable power bank',
    'Daypack with waterproof zip compartment for camera and essentials',
    'Offline saved copies of travel insurance, transit passes, and hotel confirmations',
  ];

  const localInsights = [
    `Currency & payments: Contactless cards are widely accepted across ${dest}, but keep small local currency bills for boutique vendors and taxis.`,
    `Peak time optimization: Visit top historical sites before 09:30 AM or after 16:30 PM for softer light and smaller crowds.`,
    `Local etiquette: Tipping customs and local greeting courtesies vary; our automated agent coordinates with local concierge updates.`,
    `Transit recommendation: High-speed rail or pre-scheduled private transfer provides the smoothest transit between ${origin} and ${dest}.`,
  ];

  return {
    id: `TRIP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    tripData: data,
    durationDays: duration,
    dailyPlans,
    budgetBreakdown: {
      transportation,
      lodging,
      dining,
      experiences,
      buffer,
    },
    packingTips,
    localInsights,
    weatherForecast: 'Seasonal mild temperatures with clear skies and occasional refreshing coastal/mountain breezes.',
    submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
