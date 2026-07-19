import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Cpu,
  Lock,
  Zap,
  ShieldAlert,
  Activity,
} from 'lucide-react';
import { GlassCard, SectionHeading } from '../components/GlassCard';
import { IndiaMap } from '../components/IndiaMap';
import { StatCard } from '../components/StatCard';
import { liveStats, featureList, fraudTrend } from '../data/mock';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function HomePage({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Digital Public Safety Intelligence
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              <span className="gradient-text">Predict</span>
              <span className="mx-2 text-slate-500">•</span>
              <span className="gradient-text">Prevent</span>
              <span className="mx-2 text-slate-500">•</span>
              <span className="gradient-text">Protect</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400 md:text-lg">
              Rakshak AI unifies citizens, police, banks and telecom operators with real-time fraud
              intelligence — detecting digital arrest scams, deepfakes, counterfeit currency and
              organized fraud networks across India.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => onNavigate('scam')} className="btn-primary">
                <ShieldAlert className="h-4 w-4" />
                Detect a Scam
              </button>
              <button onClick={() => onNavigate('report')} className="btn-ghost">
                <ShieldCheck className="h-4 w-4" />
                Report Fraud
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {liveStats.map((s, i) => (
            <StatCard key={s.id} {...s} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* India map + trend */}
      <section className="mx-auto mt-10 max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-5">
          <GlassCard className="p-6 lg:col-span-2">
            <SectionHeading label="Live Threat Map" title="Cyber Threat Hotspots" subtitle="Real-time fraud intensity across major Indian cities." />
            <IndiaMap />
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="chip"><span className="h-2 w-2 rounded-full bg-rose-500" /> Critical</span>
              <span className="chip"><span className="h-2 w-2 rounded-full bg-amber-400" /> High</span>
              <span className="chip"><span className="h-2 w-2 rounded-full bg-cyan-400" /> Moderate</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 lg:col-span-3">
            <SectionHeading label="7-Month Trend" title="Fraud & Scam Growth" subtitle="Rising trajectory across digital fraud categories." />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fraudTrend}>
                  <defs>
                    <linearGradient id="g-fraud" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g-scam" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="scam" stroke="#3b82f6" strokeWidth={2} fill="url(#g-scam)" />
                  <Area type="monotone" dataKey="fraud" stroke="#f43f5e" strokeWidth={2} fill="url(#g-fraud)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-6">
        <SectionHeading label="Capabilities" title="An AI Intelligence Suite for Public Safety" subtitle="Six detection and investigation modules working as one platform." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featureList.map((f, i) => {
            const Icon = (Icons as unknown as Record<string, LucideIcon>)[f.icon] || Icons.Activity;
            return (
              <GlassCard key={f.title} hover delay={i * 0.05} className="p-6">
                <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} ring-1 ring-white/10`}>
                  <Icon className={`h-6 w-6 ${f.accent}`} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
                <button
                  onClick={() => onNavigate(featureRoute(f.icon))}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Cpu, title: 'AI Models', desc: 'NLP, voice forensics and computer vision tuned on 2M+ Indian fraud samples.' },
            { icon: Lock, title: 'Secure by Design', desc: 'Role-based access, evidence-grade audit trails and chain-of-custody.' },
            { icon: Zap, title: 'Real-time Grid', desc: 'Live feeds from police, banks and telecom in a unified intelligence layer.' },
          ].map((p, i) => (
            <GlassCard key={p.title} delay={i * 0.08} className="flex items-start gap-4 p-6">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 ring-1 ring-cyan-400/20">
                <p.icon className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{p.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-6">
        <GlassCard className="relative overflow-hidden p-8 text-center md:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10" />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Join India's digital shield against fraud</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
              Report an incident, run an AI detection, or explore the intelligence dashboards built for
              every stakeholder in the public-safety ecosystem.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => onNavigate('shield')} className="btn-primary">
                <Activity className="h-4 w-4" />
                Talk to Citizen Shield
              </button>
              <button onClick={() => onNavigate('police')} className="btn-ghost">
                View Police Dashboard <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

function featureRoute(icon: string): string {
  const map: Record<string, string> = {
    ShieldAlert: 'scam',
    AudioLines: 'deepfake',
    Banknote: 'counterfeit',
    Network: 'network',
    MapPin: 'geospatial',
    Bot: 'shield',
  };
  return map[icon] || 'home';
}
