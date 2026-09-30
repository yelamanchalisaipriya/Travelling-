import React from 'react';
import { Compass, ExternalLink, Heart, Send } from 'lucide-react';

interface FooterProps {
  onOpenModal: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onScrollToTop }) => {
  return (
    <footer className="border-t border-white/10 bg-[#070a10] text-slate-400 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-serif-display text-xl tracking-tight font-semibold text-white">
                Travelling Agent
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-400 max-w-md leading-relaxed">
              An autonomous travel planning and itinerary synthesis platform. Integrated with n8n workflow automation to transform user travel criteria into bespoke, actionable itineraries delivered to your inbox.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
              <span>Workflow by Yelamanchali Sai Priya</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={onOpenModal}
                className="hover:text-amber-400 transition-colors cursor-pointer underline text-[11px]"
              >
                Inspect n8n Integration
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Explore
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Curated Destinations
                </a>
              </li>
              <li>
                <a href="#planner" className="hover:text-white transition-colors">
                  Trip Architect Form
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How The Agent Works
                </a>
              </li>
              <li>
                <a href="#automation" className="hover:text-white transition-colors">
                  n8n Cloud Automation
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Endpoints */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Integration & Source
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://yelamanchalisaipriya.app.n8n.cloud/form/55518f9f-408d-4aca-9194-4d81a6963c09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Direct n8n Form</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenModal}
                  className="hover:text-white transition-colors text-left"
                >
                  API Payload Schema
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToTop}
                  className="hover:text-white transition-colors text-left"
                >
                  Back to Top
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Travelling Agent. Built with n8n Cloud Automation.
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by n8n Webhook Architecture</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-emerald-400">Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
