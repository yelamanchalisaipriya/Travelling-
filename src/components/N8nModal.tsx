import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Loader2,
  RefreshCw,
  Send,
  Workflow,
  X
} from 'lucide-react';

interface N8nModalProps {
  isOpen: boolean;
  onClose: () => void;
  n8nUrl: string;
}

export const N8nModal: React.FC<N8nModalProps> = ({ isOpen, onClose, n8nUrl }) => {
  const [copied, setCopied] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{
    status: number | string;
    ok: boolean;
    time: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(n8nUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePing = async () => {
    setIsPinging(true);
    try {
      const res = await fetch('/api/n8n/status');
      const data = await res.json();
      setPingResult({
        status: data.statusCode || (data.connected ? 200 : 'Unavailable'),
        ok: data.connected,
        time: new Date().toLocaleTimeString(),
      });
    } catch {
      setPingResult({
        status: 'Error',
        ok: false,
        time: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#101726] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Workflow className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Travelling Agent n8n Connection
            </h3>
            <p className="text-xs text-slate-400">
              Live workflow orchestration running on n8n Cloud
            </p>
          </div>
        </div>

        {/* URL Box */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#0b0f17] p-4">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2">
            Configured Production n8n Form Endpoint:
          </div>
          <div className="flex items-center justify-between gap-2 overflow-hidden">
            <span className="font-mono text-xs text-amber-300 break-all select-all">
              {n8nUrl}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Copy URL"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
              <a
                href={n8nUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Schema & Mappings */}
        <div className="mb-6 space-y-3">
          <div className="text-xs font-semibold text-slate-200">
            Field Name Mapping to Travelling Agent Workflow:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
              <div className="text-amber-400">field-0 / name</div>
              <div className="text-slate-400 text-[11px]">Traveler Name</div>
            </div>
            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
              <div className="text-amber-400">field-1 / from</div>
              <div className="text-slate-400 text-[11px]">Departure City</div>
            </div>
            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
              <div className="text-amber-400">field-2 / destination</div>
              <div className="text-slate-400 text-[11px]">Destination</div>
            </div>
            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
              <div className="text-amber-400">field-3 / startDate</div>
              <div className="text-slate-400 text-[11px]">Start date</div>
            </div>
            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
              <div className="text-amber-400">field-4 / endDate</div>
              <div className="text-slate-400 text-[11px]">End date</div>
            </div>
            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
              <div className="text-amber-400">field-6 / email</div>
              <div className="text-slate-400 text-[11px]">Delivery Email</div>
            </div>
          </div>
        </div>

        {/* Email Delivery Troubleshooting Guide */}
        <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-2">
            <span>Why might emails not arrive from n8n? (4 Quick Checks)</span>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <span className="font-mono text-amber-400 font-bold">1.</span>
              <div>
                <strong className="text-white">Is the workflow Active in n8n?</strong> In your n8n dashboard (<a href="https://yelamanchalisaipriya.app.n8n.cloud" target="_blank" rel="noreferrer" className="underline text-amber-400">yelamanchalisaipriya.app.n8n.cloud</a>), ensure the switch in the top right is set to <strong>"Active" (Green)</strong>. Inactive workflows accept submissions but do not run in production.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-amber-400 font-bold">2.</span>
              <div>
                <strong className="text-white">Check n8n "Executions" tab:</strong> Click <strong>Executions</strong> in n8n's left sidebar. If a run shows red ❌, click it to see the exact node error (e.g. Gmail authentication expired, invalid recipient, or LLM agent quota).
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-amber-400 font-bold">3.</span>
              <div>
                <strong className="text-white">Email Node Recipient Field:</strong> In your Gmail / Send Email node in n8n, make sure the <em>To</em> expression is mapped to <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">{'{{ $json["field-6"] }}'}</code> or <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">{'{{ $json.email }}'}</code>.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-amber-400 font-bold">4.</span>
              <div>
                <strong className="text-white">Check Spam / Junk Folder:</strong> Automated emails from fresh automation apps frequently get routed into the Gmail <strong>Spam</strong> or <strong>Promotions</strong> tab.
              </div>
            </div>
          </div>
        </div>

        {/* Live Ping Verification */}
        <div className="rounded-2xl border border-white/10 bg-[#0e1422] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-white">Endpoint Status & Ping</div>
            <div className="text-xs text-slate-400">
              {pingResult ? (
                <span className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      pingResult.ok ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                  />
                  <span>
                    Status: {pingResult.status} (Verified at {pingResult.time})
                  </span>
                </span>
              ) : (
                'Verify active availability of the n8n form trigger'
              )}
            </div>
          </div>

          <button
            onClick={handlePing}
            disabled={isPinging}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-xs font-medium text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPinging ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Pinging...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Ping Endpoint</span>
              </>
            )}
          </button>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href={n8nUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
          >
            <span>Open Original n8n Form</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
