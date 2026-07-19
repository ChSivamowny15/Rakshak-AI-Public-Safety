import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Upload,
  Phone,
  MessageSquare,
  Play,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Activity,
  Loader2,
} from 'lucide-react';
import { GlassCard, SectionHeading, StatusDot } from '../components/GlassCard';
import { PageHeader } from '../components/PageTransition';
import { RiskGauge, ConfidenceMeter } from '../components/RiskGauge';
import { analyzeScam, type ScamResult } from '../utils/scamAnalysis';

type Tab = 'call' | 'text' | 'phone';

export function ScamDetectionPage() {
  const [tab, setTab] = useState<Tab>('call');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ScamResult | null>(null);
  const [text, setText] = useState('');
  const [phone, setPhone] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const runAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const input = tab === 'phone' ? phone : text || 'sample call recording transcript';
      const res = analyzeScam(input, tab);
      setResult(res);
      setAnalyzing(false);
    }, 1800);
  };

  const tabs: { id: Tab; label: string; icon: typeof Upload }[] = [
    { id: 'call', label: 'Call Recording', icon: Upload },
    { id: 'text', label: 'SMS / Chat / Email', icon: MessageSquare },
    { id: 'phone', label: 'Phone Number', icon: Phone },
  ];

  const verdictColor = result
    ? result.riskScore >= 75
      ? 'border-rose-400/20 bg-rose-500/10 text-rose-300'
      : result.riskScore >= 45
        ? 'border-amber-400/20 bg-amber-500/10 text-amber-300'
        : result.riskScore >= 25
          ? 'border-cyan-400/20 bg-cyan-500/10 text-cyan-300'
          : 'border-emerald-400/20 bg-emerald-500/10 text-emerald-300'
    : '';

  return (
    <div>
      <PageHeader
        title="AI Digital Arrest Scam Detection"
        subtitle="Upload a call recording, paste a suspicious message, or enter a phone number. Rakshak AI analyzes indicators of digital-arrest fraud and returns a dynamic risk score with recommended actions."
        icon={<ShieldAlert className="h-6 w-6 text-cyan-300" />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <GlassCard className="p-6">
          <SectionHeading label="Input" title="Submit Evidence" />
          <div className="mb-5 flex gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                  tab === t.id ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <t.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              {tab === 'call' && (
                <div>
                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center transition-all hover:border-cyan-400/40 hover:bg-cyan-500/5">
                    <Upload className="mb-3 h-8 w-8 text-slate-400 group-hover:text-cyan-300" />
                    <p className="text-sm font-medium text-slate-200">Drop call recording here</p>
                    <p className="mt-1 text-xs text-slate-500">MP3, WAV, M4A — up to 25MB</p>
                    <input type="file" accept="audio/*" className="hidden" onChange={() => setUploaded(true)} />
                  </label>
                  {uploaded && (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500/15">
                        <Play className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-200">sample_call.m4a</p>
                        <p className="text-xs text-slate-500">4m 18s • 1.2MB</p>
                      </div>
                      <div className="h-6 w-24 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                      </div>
                    </div>
                  )}
                  <p className="mt-3 text-xs text-slate-500">
                    Tip: for demo, the AI analyzes a simulated transcript if no audio is transcribed.
                  </p>
                </div>
              )}
              {tab === 'text' && (
                <div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={8}
                    placeholder="Paste the suspicious SMS, chat or email content here… e.g. 'This is TRAI. Your number will be deactivated due to illegal activity. Press 1 to speak to officer. Do not disconnect.'"
                    className="input-field resize-none font-mono text-xs leading-relaxed"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Try pasting a real suspicious message — the risk score updates based on detected scam patterns.
                  </p>
                </div>
              )}
              {tab === 'phone' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs text-slate-400">Phone Number</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98xxx xx120"
                      className="input-field font-mono"
                    />
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-slate-400">
                    <p className="mb-2 font-medium text-slate-300">Lookup includes:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Telecom operator &amp; region</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Spam reports in Rakshak registry</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Linked fraud network cluster</li>
                    </ul>
                  </div>
                  <p className="text-xs text-slate-500">
                    Try flagged numbers: <span className="font-mono text-rose-300">+919812345120</span>, <span className="font-mono text-rose-300">+917012345891</span> — or a clean number like <span className="font-mono text-emerald-300">+919012345678</span> to see the score change.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <button onClick={runAnalysis} disabled={analyzing} className="btn-primary mt-5 w-full">
            {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
            {analyzing ? 'Analyzing…' : 'Run AI Analysis'}
          </button>
        </GlassCard>

        {/* Result */}
        <GlassCard className="p-6">
          <SectionHeading label="AI Analysis" title="Detection Result" />
          {!result && !analyzing && (
            <div className="grid h-64 place-items-center text-center">
              <div>
                <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-slate-600" />
                <p className="text-sm text-slate-500">Submit evidence and run analysis to see results.</p>
              </div>
            </div>
          )}
          {analyzing && (
            <div className="grid h-64 place-items-center">
              <div className="text-center">
                <Loader2 className="mx-auto mb-3 h-10 w-10 animate-spin text-cyan-300" />
                <p className="text-sm text-slate-400">Running NLP + voice forensics…</p>
              </div>
            </div>
          )}
          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                <RiskGauge value={result.riskScore} />
                <div className="flex-1 space-y-3">
                  <div className={`rounded-xl border p-3 ${verdictColor}`}>
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      {result.riskScore >= 45 ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      {result.verdict}
                    </p>
                  </div>
                  <ConfidenceMeter value={result.confidence} />
                </div>
              </div>

              {result.indicators.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Scam Indicators</p>
                  <div className="space-y-2">
                    {result.indicators.map((ind) => (
                      <div key={ind.label}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-slate-300">{ind.label}</span>
                          <span className="font-mono text-slate-400">{Math.round(ind.weight * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${ind.weight * 100}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Explanation</p>
                <p className="text-sm leading-relaxed text-slate-300">{result.explanation}</p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-300" /> Recommended Actions
                </p>
                <ul className="space-y-2">
                  {result.actions.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>

      {/* Timeline */}
      {result && (
        <GlassCard className="mt-6 p-6">
          <SectionHeading label="Forensics" title="Call Timeline Analysis" />
          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-400/40 via-violet-400/30 to-transparent" />
            <div className="space-y-4">
              {result.timeline.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="relative flex gap-4"
                >
                  <div className={`z-10 mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full ring-2 ring-ink-900 ${
                    e.type === 'critical' ? 'bg-rose-500' : e.type === 'flag' ? 'bg-amber-400' : 'bg-cyan-400'
                  }`}>
                    <StatusDot status={e.type === 'critical' ? 'fail' : e.type === 'flag' ? 'warn' : 'info'} />
                  </div>
                  <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-200">{e.event}</p>
                      <span className="font-mono text-xs text-slate-500">{e.t}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
