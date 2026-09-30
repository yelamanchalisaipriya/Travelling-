import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Layers,
  MailCheck,
  Send,
  Workflow
} from 'lucide-react';

interface WorkflowExplainerProps {
  onOpenModal: () => void;
  isConnected: boolean;
}

export const WorkflowExplainer: React.FC<WorkflowExplainerProps> = ({
  onOpenModal,
  isConnected,
}) => {
  return (
    <section id="automation" className="py-20 bg-[#0e1422] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Workflow className="h-3.5 w-3.5" />
              <span>n8n Cloud Automation Architecture</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-white">
              How the Travelling Agent pipeline executes
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Every trip submission interacts directly with the production n8n workflow at{' '}
              <span className="font-mono text-slate-300">
                yelamanchalisaipriya.app.n8n.cloud
              </span>
              . Here is how your travel request transforms into an actionable expedition plan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Inspect Webhook & Form Endpoint</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 3-Step Process Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="rounded-2xl border border-white/10 bg-[#121a2a] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif-display text-2xl font-bold text-amber-400">
                  01.
                </span>
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Send className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Parameter Ingestion
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                The web interface collects and validates the 7 mandatory parameters mapped directly to the n8n form schema:
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-300 bg-black/30 p-3 rounded-xl border border-white/5">
                <div>• field-0: Traveler Name</div>
                <div>• field-1: Departure City (From)</div>
                <div>• field-2: Destination</div>
                <div>• field-3 & 4: Start & End Dates</div>
                <div>• field-5: Total Budget Target</div>
                <div>• field-6: Delivery Email</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-500">
              Trigger: POST /form/55518f9f-408d-4aca-9194-4d81a6963c09
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-white/10 bg-[#121a2a] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif-display text-2xl font-bold text-amber-400">
                  02.
                </span>
                <div className="h-9 w-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Cpu className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Autonomous Agent Execution
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Inside n8n Cloud, the Travelling Agent workflow activates. It queries destination knowledge bases, balances pace against trip duration, and synthesizes balanced logistics.
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Route duration & transit calibration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Budget tier allocation (Stays vs Gastronomy)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Boutique neighborhoods & hidden gem picks</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-500">
              Workflow Engine: Multi-Node Autonomous Pipeline
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-white/10 bg-[#121a2a] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif-display text-2xl font-bold text-amber-400">
                  03.
                </span>
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MailCheck className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Direct Dossier Dispatch
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                The traveler receives an immediate on-screen interactive itinerary preview while the n8n agent dispatches the comprehensive travel package to their registered inbox.
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Full day-by-day morning/afternoon/night guide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Concierge packing & weather notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Direct updates if schedule adjustments occur</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-500">
              Delivery: Automated SMTP / Mailer node to user email
            </div>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#121a2a] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${
                isConnected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
              }`}
            />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Live n8n Cloud Instance:</span>{' '}
              <span className="font-mono text-slate-400">
                https://yelamanchalisaipriya.app.n8n.cloud/form/55518f9f-408d-4aca-9194-4d81a6963c09
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://yelamanchalisaipriya.app.n8n.cloud/form/55518f9f-408d-4aca-9194-4d81a6963c09"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
            >
              <span>Open Raw n8n Form</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
