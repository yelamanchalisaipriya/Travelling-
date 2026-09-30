import React, { useState } from 'react';
import { ArrowRight, Calendar, Compass, DollarSign, MapPin, Send } from 'lucide-react';
import heroImg from '../assets/images/hero_travel_horizon_1790759059263.jpg';

interface HeroProps {
  onQuickStart: (params: { from: string; destination: string; budget: number }) => void;
  onScrollToPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickStart, onScrollToPlanner }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [budgetVal, setBudgetVal] = useState('3200');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickStart({
      from: fromCity || 'San Francisco',
      destination: toCity || 'Kyoto, Japan',
      budget: Number(budgetVal) || 3200,
    });
    onScrollToPlanner();
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Traveler taking in sunrise over mountain lake"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/80 via-[#0b0f17]/60 to-[#0b0f17]" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0b0f17]/40 to-[#0b0f17]/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Subtle claim kicker - zero pill discipline */}
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400">
            <span>Autonomous n8n Travel Agent</span>
            <span aria-hidden="true">·</span>
            <span>Workflow 55518f9f</span>
            <span aria-hidden="true">·</span>
            <span>Intelligent Trip Orchestration</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white text-balance leading-[1.12]">
            Where wanderlust meets autonomous intelligence.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Directly integrated with the Travelling Agent workflow on n8n Cloud. Provide your departure city, dream destination, and budget to trigger autonomous route scanning, boutique lodging picks, and bespoke daily itineraries.
          </p>

          {/* Quick Search Strip */}
          <form
            onSubmit={handleHeroSubmit}
            className="mt-9 rounded-2xl border border-white/15 bg-[#0e1422]/90 p-3 sm:p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Departure */}
              <div className="flex flex-col text-left px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-amber-400" />
                  Departure City
                </label>
                <input
                  type="text"
                  placeholder="e.g. New York, London"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="mt-1 bg-transparent text-sm font-medium text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* Destination */}
              <div className="flex flex-col text-left px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                  <Compass className="h-3 w-3 text-emerald-400" />
                  Dream Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g. Positano, Kyoto, Alps"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="mt-1 bg-transparent text-sm font-medium text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* Budget */}
              <div className="flex flex-col text-left px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="h-3 w-3 text-sky-400" />
                  Target Budget (USD)
                </label>
                <input
                  type="number"
                  placeholder="3200"
                  value={budgetVal}
                  onChange={(e) => setBudgetVal(e.target.value)}
                  className="mt-1 bg-transparent text-sm font-medium text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Next step: pick exact departure & return dates in the planner</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-2.5 text-xs font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-300 transition-all shadow-md shadow-amber-500/20 cursor-pointer whitespace-nowrap"
              >
                <span>Initialize Itinerary Engine</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* Adjacent Social Proof & Technical Integrity */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Real n8n Cloud Webhook Integration</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <Send className="h-3 w-3 text-amber-400" />
              <span>Direct Itinerary Dispatch to Email</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <div>
              <span>Curated Route Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
