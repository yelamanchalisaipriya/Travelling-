import React, { useState } from 'react';
import {
  ChevronDown,
  Clock,
  Compass,
  Cpu,
  Globe,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the Travelling Agent n8n automation process my request?',
      a: 'When you submit the form on this website, your travel parameters (Name, Origin, Destination, Dates, Budget, and Email) are sent directly to the Travelling Agent webhook on n8n Cloud. The workflow executes an autonomous agent that searches travel logistics, calculates realistic budgets, and dispatches the completed itinerary package to your email.',
    },
    {
      q: 'Is there any fee or payment required to use Travelling Agent?',
      a: 'No. The Travelling Agent is a complimentary autonomous planner. The budget you provide is solely used by the agent to tailor hotel recommendations, dining spots, and flight tiers to your desired comfort level.',
    },
    {
      q: 'Can I request custom pace, dietary preferences, or group sizes?',
      a: 'Yes! The trip architect form includes preferences for travel pace (Relaxed vs Intensive), party composition (Solo, Couple, Family, Friends), and focus (Gastronomy, Culture, Adventure, Luxury).',
    },
    {
      q: 'How quickly will I receive the final itinerary in my inbox?',
      a: 'You get an immediate visual preview on-screen right after clicking submit! Simultaneously, the n8n Cloud workflow processes the detailed dossier and delivers the travel summary to your email address typically within 1–3 minutes.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0b0f17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Autonomous Intelligence</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-white">
            Engineered for genuine discovery
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Unlike generic travel search engines that prioritize sponsored ads, Travelling Agent optimizes exclusively for your schedule, budget, and travel taste.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="rounded-2xl border border-white/10 bg-[#101726] p-6 hover:border-amber-500/30 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Route Feasibility
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates realistic transit buffers between districts, eliminating the stress of rushing between opposite sides of town.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101726] p-6 hover:border-amber-500/30 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              n8n Autonomous Node
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every inquiry is processed through an active cloud workflow that can branch into flight tracking, lodging lookup, and weather forecasts.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101726] p-6 hover:border-amber-500/30 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Budget Calibration
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintains strict discipline over accommodation, dining, and transit spend with built-in contingency buffers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101726] p-6 hover:border-amber-500/30 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Curated Terroir
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Recommends neighborhood bistros, artisan studios, and scenic walks favored by residents rather than tourist traps.
            </p>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#0e1422] p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/5 bg-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-medium text-white hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
