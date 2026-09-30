import React from 'react';
import { ArrowUpRight, Calendar, DollarSign, Sparkles } from 'lucide-react';
import { CURATED_DESTINATIONS } from '../utils/travelData';
import { CuratedDestination } from '../types/travel';

interface DestinationsShowcaseProps {
  onSelectDestination: (dest: CuratedDestination) => void;
}

export const DestinationsShowcase: React.FC<DestinationsShowcaseProps> = ({
  onSelectDestination,
}) => {
  return (
    <section id="destinations" className="py-20 border-t border-white/5 bg-[#0e1420]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Curated Expeditions
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-white">
              Signature journeys crafted by our autonomous agent
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400">
            Select any premier expedition below to auto-populate the Travelling Agent parameters, or specify your own custom destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CURATED_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121927] transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 shadow-lg hover:shadow-amber-500/5"
            >
              {/* Image Frame with Aspect Ratio 4:3 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
                <img
                  src={dest.image}
                  alt={dest.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121927] via-transparent to-black/20" />
                
                {/* Quiet unboxed metadata */}
                <div className="absolute top-3 left-3 text-xs font-medium text-white/90 drop-shadow-md">
                  {dest.country}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                {/* Unboxed tags */}
                <div className="mb-2 flex items-center gap-2 text-xs text-amber-400/90 font-medium">
                  {dest.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {idx < dest.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {dest.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {dest.tagline}
                </p>

                {/* Key Metrics - Tabular Numerals */}
                <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-mono tabular-nums">{dest.recommendedDays} Days</span>
                    <span className="text-slate-500">ideal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                    <span>From</span>
                    <span className="font-mono tabular-nums font-semibold text-white">
                      ${dest.suggestedBudget.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="mt-4 space-y-1.5">
                  {dest.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-400">
                      <span className="text-amber-400/70 font-mono mt-0.5">•</span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-2">
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-medium text-white hover:bg-amber-500 hover:border-amber-400 hover:text-slate-950 transition-all cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-400 group-hover:text-slate-950" />
                    <span>Plan {dest.title.split('&')[0].trim()}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 ml-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
