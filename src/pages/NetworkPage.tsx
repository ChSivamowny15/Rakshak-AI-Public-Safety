import { motion } from 'framer-motion';
import { Network, Phone, Building2, AtSign, Smartphone, Hexagon, Search } from 'lucide-react';
import { GlassCard, SectionHeading, StatusDot } from '../components/GlassCard';
import { PageHeader } from '../components/PageTransition';
import { NetworkGraph } from '../components/NetworkGraph';
import { networkNodes, networkEdges } from '../data/mock';

const legend = [
  { icon: Phone, label: 'Phone', color: '#22d3ee' },
  { icon: Building2, label: 'Bank', color: '#3b82f6' },
  { icon: AtSign, label: 'UPI', color: '#a855f7' },
  { icon: Smartphone, label: 'Device', color: '#f59e0b' },
  { icon: Hexagon, label: 'Cluster', color: '#f43f5e' },
];

export function NetworkPage() {
  const summary = [
    { label: 'Connected entities', value: '10' },
    { label: 'Fraud clusters', value: '1' },
    { label: 'High-risk nodes', value: '6' },
    { label: 'Total loss (est.)', value: '₹38.4L' },
  ];

  return (
    <div>
      <PageHeader
        title="Fraud Network Intelligence"
        subtitle="Interactive graph linking phone numbers, bank accounts, UPI IDs, devices and fraud clusters. Drag nodes to explore connections and surface organized fraud rings."
        icon={<Network className="h-6 w-6 text-cyan-300" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <SectionHeading label="Graph" title="Connected Fraud Network" />
            <div className="flex flex-wrap gap-2">
              {legend.map((l) => (
                <span key={l.label} className="chip">
                  <l.icon className="h-3 w-3" style={{ color: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <NetworkGraph nodes={networkNodes} edges={networkEdges} height={480} />
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <SectionHeading label="Summary" title="Investigation Summary" />
            <div className="grid grid-cols-2 gap-3">
              {summary.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="font-display text-xl font-bold text-cyan-300">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeading label="Nodes" title="Entity Registry" />
            <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
              {networkNodes.map((n) => (
                <div key={n.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <StatusDot status={n.risk === 'high' ? 'fail' : n.risk === 'med' ? 'warn' : 'info'} />
                    <span className="font-mono text-xs text-slate-200">{n.label}</span>
                  </div>
                  <span className={`chip text-[10px] ${n.risk === 'high' ? 'text-rose-300' : n.risk === 'med' ? 'text-amber-300' : 'text-cyan-300'}`}>
                    {n.risk}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <GlassCard className="mt-6 p-6">
        <SectionHeading label="Analysis" title="Cluster Narrative" />
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-slate-300">
          <p>
            Cluster-A centers on two primary phone numbers (<span className="font-mono text-cyan-300">+91 98xxx xx120</span> and{' '}
            <span className="font-mono text-cyan-300">+91 70xxx xx891</span>) that funnel victims into a shared HDFC mule
            account (<span className="font-mono text-blue-300">••4821</span>) and a flagged UPI handle (<span className="font-mono text-violet-300">fraudster@upi</span>).
            Both numbers are operated from a single device (IMEI <span className="font-mono text-amber-300">••7781</span>),
            indicating a coordinated ring. Estimated loss across 47 linked cases: <span className="font-semibold text-rose-300">₹38.4L</span>.
            Recommend immediate account freeze and SIM block via 1930.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-xs text-cyan-200">
          <Search className="h-4 w-4" />
          Graph auto-updates as new reports are filed. Last refresh: 2 minutes ago.
        </div>
      </GlassCard>
    </div>
  );
}
