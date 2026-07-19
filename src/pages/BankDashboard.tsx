import { motion } from 'framer-motion';
import { Building2, Banknote } from 'lucide-react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
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
import { bankAlerts, bankFakeCurrency } from '../data/mock';

const kpis = [
  { id: 'suspicious', label: 'Suspicious Transactions', value: 1284, icon: 'AlertTriangle', trend: '+14.2%', up: true, color: 'from-rose-500 to-red-500' },
  { id: 'frozen', label: 'Accounts Frozen', value: 96, icon: 'ShieldOff', trend: '+6', up: true, color: 'from-amber-500 to-orange-500' },
  { id: 'fake', label: 'Fake Notes Detected', value: 75, icon: 'Banknote', trend: '+3.1%', up: true, color: 'from-violet-500 to-purple-500' },
  { id: 'saved', label: 'Funds Saved', value: 12.4, suffix: 'Cr', icon: 'TrendingUp', trend: '+18.9%', up: true, color: 'from-emerald-500 to-teal-500' },
];

const txnTrend = [
  { day: 'Mon', suspicious: 180, blocked: 42 },
  { day: 'Tue', suspicious: 210, blocked: 51 },
  { day: 'Wed', suspicious: 195, blocked: 38 },
  { day: 'Thu', suspicious: 240, blocked: 67 },
  { day: 'Fri', suspicious: 280, blocked: 74 },
  { day: 'Sat', suspicious: 190, blocked: 45 },
  { day: 'Sun', suspicious: 150, blocked: 30 },
];

const riskColor: Record<string, string> = { critical: 'text-rose-300', high: 'text-amber-300', medium: 'text-cyan-300' };

export function BankDashboard() {
  return (
    <div>
      <PageHeader
        title="Bank Dashboard"
        subtitle="Monitor suspicious transactions, fake currency reports, risky accounts and real-time alerts across branch networks."
        icon={<Building2 className="h-6 w-6 text-cyan-300" />}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => <StatCard key={k.id} {...k} delay={i * 0.08} />)}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <SectionHeading label="Analytics" title="Suspicious vs Blocked Transactions" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={txnTrend}>
                <defs>
                  <linearGradient id="bk-susp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f43f5e" stopOpacity={0.5} /><stop offset="100%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient>
                  <linearGradient id="bk-block" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} /><stop offset="100%" stopColor="#22d3ee" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="suspicious" stroke="#f43f5e" strokeWidth={2} fill="url(#bk-susp)" />
                <Area type="monotone" dataKey="blocked" stroke="#22d3ee" strokeWidth={2} fill="url(#bk-block)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading label="Volume" title="Weekly Transaction Risk" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={txnTrend} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="day" type="category" stroke="#64748b" fontSize={12} width={40} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="suspicious" fill="#f43f5e" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <SectionHeading label="Alerts" title="Suspicious Transactions" />
          <div className="space-y-2">
            {bankAlerts.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <StatusDot status={a.risk === 'critical' ? 'fail' : a.risk === 'high' ? 'warn' : 'info'} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-200">{a.type}</p>
                  <p className="font-mono text-xs text-slate-500">{a.id} · {a.account}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold text-rose-300">{a.amount}</p>
                  <p className="text-[10px] text-slate-500">{a.time}</p>
                </div>
                <span className={`chip text-[10px] ${riskColor[a.risk]}`}>{a.risk}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading label="Currency" title="Fake Currency Reports" />
          <div className="space-y-2">
            {bankFakeCurrency.map((f, i) => (
              <motion.div key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet-500/15">
                  <Banknote className="h-4 w-4 text-violet-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-200">{f.branch}</p>
                  <p className="font-mono text-xs text-slate-500">{f.id} · {f.denom} × {f.count}</p>
                </div>
                <span className={`chip text-[10px] ${f.status === 'confirmed' ? 'text-rose-300' : 'text-amber-300'}`}>{f.status}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-6 p-6">
        <SectionHeading label="Risky Accounts" title="High-Risk Account Registry" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs text-slate-500">
                <th className="pb-2 font-medium">Account</th>
                <th className="pb-2 font-medium">Branch</th>
                <th className="pb-2 font-medium">Risk Score</th>
                <th className="pb-2 font-medium">Flagged</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                { acc: 'HDFC ••4821', branch: 'Mumbai Fort', risk: 94, flagged: '12 times', status: 'Frozen' },
                { acc: 'ICICI ••7732', branch: 'Delhi CP', risk: 88, flagged: '8 times', status: 'Under Review' },
                { acc: 'SBI ••0932', branch: 'Kolkata Park', risk: 76, flagged: '5 times', status: 'Monitored' },
                { acc: 'AXIS ••2210', branch: 'Bengaluru MG', risk: 62, flagged: '3 times', status: 'Monitored' },
              ].map((r) => (
                <tr key={r.acc} className="border-b border-white/5">
                  <td className="py-3 font-mono text-cyan-300">{r.acc}</td>
                  <td className="py-3 text-slate-400">{r.branch}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500" style={{ width: `${r.risk}%` }} />
                      </div>
                      <span className="font-mono text-xs text-slate-400">{r.risk}</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-400">{r.flagged}</td>
                  <td className="py-3"><span className={`chip text-[10px] ${r.status === 'Frozen' ? 'text-rose-300' : r.status === 'Under Review' ? 'text-amber-300' : 'text-cyan-300'}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
