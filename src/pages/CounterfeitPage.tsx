import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Banknote,
  Upload,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ScanLine,
} from 'lucide-react';
import { GlassCard, SectionHeading, StatusDot } from '../components/GlassCard';
import { PageHeader } from '../components/PageTransition';
import { ConfidenceMeter } from '../components/RiskGauge';
import { counterfeitResult } from '../data/mock';

export function CounterfeitPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);

  const run = () => {
    setAnalyzing(true);
    setResult(false);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2200);
  };

  const statusIcon = (s: string) =>
    s === 'fail' ? <XCircle className="h-4 w-4 text-rose-400" /> : s === 'warn' ? <AlertTriangle className="h-4 w-4 text-amber-400" /> : <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
  const statusColor = (s: string) => (s === 'fail' ? 'border-rose-400/20 bg-rose-500/5' : s === 'warn' ? 'border-amber-400/20 bg-amber-500/5' : 'border-emerald-400/20 bg-emerald-500/5');

  return (
    <div>
      <PageHeader
        title="Counterfeit Currency Detection"
        subtitle="Upload front and back images of a banknote. Rakshak AI inspects six RBI-mandated security features and returns a verdict with per-feature inspection cards."
        icon={<Banknote className="h-6 w-6 text-cyan-300" />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload */}
        <GlassCard className="p-6">
          <SectionHeading label="Input" title="Banknote Images" />
          <div className="grid grid-cols-2 gap-4">
            <label className="group cursor-pointer">
              <div className={`flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white/[0.02] p-4 text-center transition-all hover:border-cyan-400/40 hover:bg-cyan-500/5 ${front ? 'border-cyan-400/40' : 'border-white/15'}`}>
                {front ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <Banknote className="h-12 w-12 text-cyan-300" />
                    <p className="text-xs text-slate-300">Front uploaded</p>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-2 h-7 w-7 text-slate-400 group-hover:text-cyan-300" />
                    <p className="text-xs font-medium text-slate-200">Upload Front</p>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={() => setFront(true)} />
              </div>
            </label>
            <label className="group cursor-pointer">
              <div className={`flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white/[0.02] p-4 text-center transition-all hover:border-violet-400/40 hover:bg-violet-500/5 ${back ? 'border-violet-400/40' : 'border-white/15'}`}>
                {back ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <Banknote className="h-12 w-12 text-violet-300" />
                    <p className="text-xs text-slate-300">Back uploaded</p>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-2 h-7 w-7 text-slate-400 group-hover:text-violet-300" />
                    <p className="text-xs font-medium text-slate-200">Upload Back</p>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={() => setBack(true)} />
              </div>
            </label>
          </div>

          {front && back && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ScanLine className="h-4 w-4 text-cyan-300" />
                <span>Denomination detected: ₹2000 · Series 2019</span>
              </div>
            </div>
          )}

          <button onClick={run} disabled={analyzing} className="btn-primary mt-5 w-full">
            {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
            {analyzing ? 'Inspecting security features…' : 'Run AI Inspection'}
          </button>
        </GlassCard>

        {/* Preview + verdict */}
        <GlassCard className="p-6">
          <SectionHeading label="Preview" title="Currency Inspection" />
          {!result && !analyzing && (
            <div className="grid h-64 place-items-center text-center">
              <Banknote className="mx-auto mb-3 h-10 w-10 text-slate-600" />
              <p className="text-sm text-slate-500">Upload both sides and run inspection.</p>
            </div>
          )}
          {analyzing && (
            <div className="grid h-64 place-items-center">
              <Loader2 className="mx-auto mb-3 h-10 w-10 animate-spin text-cyan-300" />
              <p className="text-sm text-slate-400">Analyzing watermark, thread & microprint…</p>
            </div>
          )}
          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg font-bold text-rose-300">{counterfeitResult.prediction}</p>
                    <p className="mt-0.5 text-xs text-slate-400">5 of 6 security features failed inspection</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-rose-500/20">
                    <AlertTriangle className="h-6 w-6 text-rose-300" />
                  </div>
                </div>
                <div className="mt-4">
                  <ConfidenceMeter value={counterfeitResult.confidence} />
                </div>
              </div>
              <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-xs text-amber-200">
                Do not accept this note. Report to nearest bank or police station. Reference RBI/FEMA guidelines.
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>

      {/* Inspection cards */}
      {result && (
        <div className="mt-6">
          <SectionHeading label="Forensics" title="Security Feature Inspection" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {counterfeitResult.checks.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-5 ${statusColor(c.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <StatusDot status={c.status === 'fail' ? 'fail' : c.status === 'warn' ? 'warn' : 'ok'} />
                    <p className="text-sm font-semibold text-slate-100">{c.label}</p>
                  </div>
                  {statusIcon(c.status)}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">{c.detail}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`chip ${c.status === 'fail' ? 'text-rose-300' : c.status === 'warn' ? 'text-amber-300' : 'text-emerald-300'}`}>
                    {c.status === 'fail' ? 'Failed' : c.status === 'warn' ? 'Warning' : 'Passed'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
