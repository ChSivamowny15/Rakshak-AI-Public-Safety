import { motion } from 'framer-motion';
import {
  Shield,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { GlassCard, SectionHeading, StatusDot } from '../components/GlassCard';
import { PageHeader } from '../components/PageTransition';
import { StatCard } from '../components/StatCard';
import { NetworkGraph } from '../components/NetworkGraph';
import { LeafletMap, type MapPoint } from '../components/LeafletMap';
import { fraudTrend, fraudTypeBreakdown, investigationQueue, networkNodes, networkEdges, evidenceTimeline } from '../data/mock';

const kpis = [
  { id: 'cases', label: 'Active Cases', value: 4821, icon: 'Shield', trend: '+12.4%', up: true, color: 'from-rose-500 to-red-500' },
  { id: 'resolved', label: 'Resolved (30d)', value: 1287, icon: 'CheckCircle2', trend: '+8.1%', up: true, color: 'from-emerald-500 to-teal-500' },
  { id: 'officers', label: 'Officers Online', value: 142, icon: 'Users', trend: '+4', up: true, color: 'from-cyan-500 to-blue-500' },
  { id: 'avg', label: 'Avg Response', value: 18, suffix: 'min', icon: 'Clock', trend: '-6.2%', up: false, color: 'from-violet-500 to-purple-500' },
];

const mapPoints: MapPoint[] = [
  { lat: 28.6139, lng: 77.209, label: 'Delhi', detail: '8,420 cases', intensity: 95 },
  { lat: 19.076, lng: 72.8777, label: 'Mumbai', detail: '7,210 cases', intensity: 88 },
  { lat: 12.9716, lng: 77.5946, label: 'Bengaluru', detail: '6,540 cases', intensity: 82 },
  { lat: 17.385, lng: 78.4867, label: 'Hyderabad', detail: '5,130 cases', intensity: 76 },
  { lat: 22.5726, lng: 88.3639, label: 'Kolkata', detail: '4,870 cases', intensity: 79 },
  { lat: 13.0827, lng: 80.2707, label: 'Chennai', detail: '4,320 cases', intensity: 71 },
];

const statusColor: Record<string, string> = { active: 'text-rose-300', review: 'text-amber-300', pending: 'text-slate-400' };
const priorityColor: Record<string, string> = { P1: 'text-rose-300', P2: 'text-amber-300', P3: 'text-cyan-300' };

export function PoliceDashboard() {
  return (
    <div>
      <PageHeader
        title="Police Dashboard"
        subtitle="Unified command center for fraud analytics, crime trends, network intelligence, heatmaps and the investigation queue."
        icon={<Shield className="h-6 w-6 text-cyan-300" />}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => <StatCard key={k.id} {...k} delay={i * 0.08} />)}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <SectionHeading label="Analytics" title="Fraud Analytics — 7 Month Trend" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fraudTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="fraud" stroke="#f43f5e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="scam" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="counterfeit" stroke="#22d3ee" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading label="Breakdown" title="Fraud Types" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={fraudTypeBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {fraudTypeBreakdown.map((e) => <Cell key={e.name} fill={e.color} stroke="none" />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Crime trends bar */}
      <GlassCard className="mt-6 p-6">
        <SectionHeading label="Trends" title="Crime Volume by Month" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fraudTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="scam" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="fraud" fill="#f43f5e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Network + heatmap */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <SectionHeading label="Intelligence" title="Fraud Network Graph" />
          <NetworkGraph nodes={networkNodes} edges={networkEdges} height={360} />
        </GlassCard>
        <GlassCard className="p-6">
          <SectionHeading label="Geospatial" title="Crime Heatmap" />
          <LeafletMap points={mapPoints} heatmap height={360} />
        </GlassCard>
      </div>

      {/* Evidence timeline + queue */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <SectionHeading label="Forensics" title="Evidence Timeline" />
          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-400/40 to-transparent" />
            <div className="space-y-3">
              {evidenceTimeline.map((e, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative flex gap-3">
                  <div className="z-10 mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400 ring-2 ring-ink-900" />
                  <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-200">{e.title}</p>
                      <span className="font-mono text-xs text-cyan-300">{e.time}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{e.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading label="Queue" title="Investigation Queue" />
          <div className="space-y-2">
            {investigationQueue.map((q, i) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <StatusDot status={q.status === 'active' ? 'fail' : q.status === 'review' ? 'warn' : 'info'} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-200">{q.title}</p>
                  <p className="font-mono text-xs text-slate-500">{q.id} · {q.officer} · {q.age} ago</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`chip text-[10px] ${priorityColor[q.priority]}`}>{q.priority}</span>
                  <span className={`text-[10px] capitalize ${statusColor[q.status]}`}>{q.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
