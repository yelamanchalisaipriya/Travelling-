import React, { useState } from 'react';
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  DollarSign,
  Download,
  Mail,
  MapPin,
  Plane,
  Share2,
  Sparkles,
  Utensils,
  Workflow
} from 'lucide-react';
import { GeneratedItinerary } from '../types/travel';

interface ItineraryDossierProps {
  itinerary: GeneratedItinerary;
  onReset: () => void;
  onOpenN8nModal: () => void;
}

export const ItineraryDossier: React.FC<ItineraryDossierProps> = ({
  itinerary,
  onReset,
  onOpenN8nModal,
}) => {
  const [activeDay, setActiveDay] = useState(1);
  const [copied, setCopied] = useState(false);

  const { tripData, durationDays, dailyPlans, budgetBreakdown, packingTips, localInsights } =
    itinerary;

  const handleCopySummary = () => {
    const text = `Travelling Agent Expedition Dossier:
Destination: ${tripData.destination}
From: ${tripData.from}
Duration: ${durationDays} Days (${tripData.startDate} to ${tripData.endDate})
Budget: ${tripData.currency} ${tripData.budget.toLocaleString()}
Traveler: ${tripData.name} (${tripData.email})
Status: Sent to Travelling Agent n8n Automation Engine.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDayPlan = dailyPlans.find((p) => p.day === activeDay) || dailyPlans[0];

  return (
    <section id="dossier" className="py-16 bg-[#080c14] border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Status Confirmation Banner */}
        <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white">
                    Workflow Dispatched to Travelling Agent
                  </h3>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded">
                    HTTP 200 OK
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Trip parameters have been posted to n8n Cloud (form <span className="font-mono text-emerald-300">55518f9f</span>). Full dossier & live travel updates are routed to <span className="text-white font-medium">{tripData.email}</span>.
                </p>
                <p className="text-[11px] text-amber-300/80 mt-1 flex items-center gap-1.5">
                  <span>💡 Note: If email does not arrive within 2 minutes, check your <strong>Spam / Promotions</strong> folder, or check the 4-step checklist in the modal.</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenN8nModal}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-900/30 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-800/40 transition-colors cursor-pointer"
              >
                <Workflow className="h-3.5 w-3.5" />
                <span>Verify Payload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dossier Header Card */}
        <div className="rounded-3xl border border-white/10 bg-[#0f1624] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400 mb-2">
                <span>Personalized Itinerary Dossier</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{itinerary.id}</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-white">
                {tripData.destination}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-sky-400" />
                  Origin: <strong className="text-slate-200 ml-1">{tripData.from}</strong>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-purple-400" />
                  <span>{tripData.startDate} — {tripData.endDate}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span className="font-mono tabular-nums">{durationDays} Days</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Brief'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Dossier</span>
              </button>

              <button
                onClick={onReset}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Plan Another Trip</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip - Tabular Numerals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10">
            <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Total Budget
              </span>
              <span className="text-xl font-bold font-mono text-white tabular-nums mt-1 block">
                {tripData.currency} {tripData.budget.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">Target spend ceiling</span>
            </div>

            <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Travel Style
              </span>
              <span className="text-xl font-bold text-amber-400 capitalize mt-1 block truncate">
                {tripData.travelStyle}
              </span>
              <span className="text-[10px] text-slate-400">Pace: {tripData.pace}</span>
            </div>

            <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Party
              </span>
              <span className="text-xl font-bold text-white capitalize mt-1 block">
                {tripData.companions}
              </span>
              <span className="text-[10px] text-slate-400">Traveler: {tripData.name.split(' ')[0]}</span>
            </div>

            <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Autonomous Status
              </span>
              <span className="text-xl font-bold text-emerald-400 mt-1 block flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active</span>
              </span>
              <span className="text-[10px] text-slate-400">n8n Execution queued</span>
            </div>
          </div>

          {/* Interactive Day Tabs */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Day-by-Day Curated Schedule
              </h3>
              <span className="text-xs text-slate-400">
                Displaying first {dailyPlans.length} days preview
              </span>
            </div>

            {/* Day Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
              {dailyPlans.map((plan) => (
                <button
                  key={plan.day}
                  onClick={() => setActiveDay(plan.day)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeDay === plan.day
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Day {plan.day}: {plan.theme.split('&')[0].trim()}
                </button>
              ))}
            </div>

            {/* Active Day Detail Card */}
            {currentDayPlan && (
              <div className="rounded-2xl border border-white/10 bg-[#121a2a] p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 font-semibold uppercase">
                      Day {currentDayPlan.day} Focus
                    </span>
                    <h4 className="text-xl font-semibold text-white mt-1">
                      {currentDayPlan.title}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400">
                    Theme: <span className="text-slate-200">{currentDayPlan.theme}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Morning */}
                  <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Morning 08:30 — 12:00</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentDayPlan.morning}
                    </p>
                  </div>

                  {/* Afternoon */}
                  <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">
                      <Compass className="h-3.5 w-3.5" />
                      <span>Afternoon 13:30 — 17:30</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentDayPlan.afternoon}
                    </p>
                  </div>

                  {/* Evening & Dining */}
                  <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                      <Utensils className="h-3.5 w-3.5" />
                      <span>Evening & Dining</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentDayPlan.evening}
                    </p>
                    <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-amber-300/90 font-medium">
                      🍽 Chef pick: {currentDayPlan.diningPick}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Budget Breakdown & Packing List Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
            {/* Estimated Budget Allocation */}
            <div className="rounded-2xl border border-white/10 bg-[#121a2a] p-6">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <span>Autonomous Budget Allocation</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Calculated to balance comfortable boutique lodging with authentic experiences.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Airfare & Regional Transit', amount: budgetBreakdown.transportation, pct: 32 },
                  { label: 'Boutique Lodging & Stays', amount: budgetBreakdown.lodging, pct: 36 },
                  { label: 'Gastronomy & Wine Tastings', amount: budgetBreakdown.dining, pct: 18 },
                  { label: 'Curated Experiences & Entries', amount: budgetBreakdown.experiences, pct: 10 },
                  { label: 'Contingency & Local Logistics', amount: budgetBreakdown.buffer, pct: 4 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="font-mono text-white tabular-nums font-medium">
                        ${item.amount.toLocaleString()} ({item.pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Climate & Packing Checklist */}
            <div className="rounded-2xl border border-white/10 bg-[#121a2a] p-6">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <Plane className="h-4 w-4 text-sky-400" />
                <span>Concierge Packing Checklist</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Tailored for {tripData.destination} seasonal conditions.
              </p>

              <div className="space-y-2.5">
                {packingTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="h-4 w-4 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="text-xs font-medium text-slate-400 mb-2">Key Local Insights:</div>
                <div className="space-y-2">
                  {localInsights.slice(0, 2).map((insight, idx) => (
                    <p key={idx} className="text-[11px] text-slate-400 leading-relaxed">
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
