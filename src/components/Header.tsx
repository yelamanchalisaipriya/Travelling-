import React from 'react';
import { Compass, Sparkles, Workflow } from 'lucide-react';

interface HeaderProps {
  onOpenN8nModal: () => void;
  onScrollToPlanner: () => void;
  isConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenN8nModal,
  onScrollToPlanner,
  isConnected,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b0f17]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform">
            <Compass className="h-4 w-4" />
          </div>
          <span className="font-serif-display text-xl tracking-normal text-white">
            Travelling Agent
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#destinations"
            className="hover:text-white transition-colors duration-150"
          >
            Destinations
          </a>
          <a
            href="#planner"
            className="hover:text-white transition-colors duration-150"
          >
            Trip Architect
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors duration-150"
          >
            How It Works
          </a>
          <a
            href="#automation"
            className="hover:text-white transition-colors duration-150"
          >
            Automation Engine
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenN8nModal}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-all whitespace-nowrap cursor-pointer"
            title="Inspect n8n Cloud Connection"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <Workflow className="h-3.5 w-3.5 text-slate-400" />
            <span>n8n Cloud Sync</span>
          </button>

          <button
            onClick={onScrollToPlanner}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm shadow-amber-500/20 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Plan Your Journey</span>
          </button>
        </div>
      </div>
    </header>
  );
};
