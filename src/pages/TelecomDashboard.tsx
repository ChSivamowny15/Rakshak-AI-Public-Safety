import { motion } from 'framer-motion';
import { Radio, PhoneOff, Bot, CreditCard as SimCard, AlertTriangle } from 'lucide-react';
import {
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
import { telecomAlerts } from '../data/mock';

const kpis = [
  { id: 'scam', label: 'Scam Calls (24h)', value: 129487, icon: 'PhoneOff', trend: '+8.1%', up: true, color: 'from-rose-500 to-red-500' },
  { id: 'spoof', label: 'Spoofed Numbers', value: 2340, icon: 'Radio', trend: '+11.4%', up: true, color: 'from-amber-500 to-orange-500' },
  { id: 'ai', label: 'AI Voice Alerts', value: 612, icon: 'Bot', trend: '+22.7%', up: true, color: 'from-violet-500 to-purple-500' },
  { id: 'sim', label: 'SIM Abuse Events', value: 184, icon: 'CreditCard', trend: '+4.3%', up: true, color: 'from-cyan-500 to-blue-500' },
];

const callTrend = [
  { hour: '00', scam: 1200, normal: 8400 },
  { hour: '04', scam: 800, normal: 5200 },
  { hour: '08', scam: 3400, normal: 12000 },
  { hour: '12', scam: 5200, normal: 15000 },
  { hour: '16', scam: 6100, normal: 14200 },
  { hour: '20', scam: 4200, normal: 11000 },
];

const callTypePie = [
  { name: 'Digital Arrest', value: 38, color: '#f43f5e' },
  { name: 'OTP/Phishing', value: 27, color: '#3b82f6' },
  { name: 'AI Voice Clone', value: 18, color: '#a855f7' },
  { name: 'Spoofed CLI', value: 11, color: '#22d3ee' },
  { name: 'Other', value: 6, color: '#64748b' },
];

const riskColor: Record<string, string> = { critical: 'text-rose-300', high: 'text-amber-300', medium: 'text-cyan-300' };

export function TelecomDashboard() {
  return (
    <div>
      <PageHeader
        title="Telecom Dashboard"
        subtitle="Monitor scam call analytics, spoofed numbers, AI voice alerts and SIM abuse across the telecom network in real time."
        icon={<Radio className="h-6 w-6 text-cyan-300" />}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => <StatCard key={k.id} {...k} delay={i * 0.08} />)}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <SectionHeading label="Analytics" title="Scam vs Normal Calls (24h)" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={callTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="scam" stroke="#f43f5e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="normal" stroke="#22d3ee" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading label="Breakdown" title="Scam Call Types" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={callTypePie} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {callTypePie.map((e) => <Cell key={e.name} fill={e.color} stroke="none" />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <SectionHeading label="Live Alerts" title="Scam Call Surge Monitor" />
          <div className="space-y-2">
            {telecomAlerts.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <StatusDot status={a.risk === 'critical' ? 'fail' : a.risk === 'high' ? 'warn' : 'info'} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-200">{a.type}</p>
                  <p className="font-mono text-xs text-slate-500">{a.id} · {a.number}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold text-rose-300">{a.count}</p>
                  <span className={`chip text-[10px] ${riskColor[a.risk]}`}>{a.risk}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading label="Monitoring" title="SIM Abuse & AI Voice" />
          <div className="space-y-3">
            {[
              { icon: SimCard, title: 'SIM Swap — Mumbai', detail: '14 events · 3 carriers · last 1h', risk: 'medium' },
              { icon: Bot, title: 'AI Voice Clone Ring', detail: '320 calls/hr targeting seniors', risk: 'high' },
              { icon: PhoneOff, title: 'Spoofed CLI Cluster', detail: '680 calls/hr · 12 numbers', risk: 'high' },
              { icon: AlertTriangle, title: 'International Routing Spike', detail: 'via 3 grey routes · investigating', risk: 'critical' },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-500/15">
                  <m.icon className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">{m.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{m.detail}</p>
                </div>
                <span className={`chip text-[10px] ${riskColor[m.risk]}`}>{m.risk}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
