import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Flame, Crosshair, Siren } from 'lucide-react';
import { GlassCard, SectionHeading } from '../components/GlassCard';
import { PageHeader } from '../components/PageTransition';
import { LeafletMap, type MapPoint } from '../components/LeafletMap';
import { stateHeatmap, patrolZones } from '../data/mock';

const mapPoints: MapPoint[] = [
  { lat: 28.6139, lng: 77.209, label: 'Delhi', detail: '8,420 cases', intensity: 95 },
  { lat: 19.076, lng: 72.8777, label: 'Mumbai', detail: '7,210 cases', intensity: 88 },
  { lat: 12.9716, lng: 77.5946, label: 'Bengaluru', detail: '6,540 cases', intensity: 82 },
  { lat: 17.385, lng: 78.4867, label: 'Hyderabad', detail: '5,130 cases', intensity: 76 },
  { lat: 22.5726, lng: 88.3639, label: 'Kolkata', detail: '4,870 cases', intensity: 79 },
  { lat: 13.0827, lng: 80.2707, label: 'Chennai', detail: '4,320 cases', intensity: 71 },
  { lat: 26.9124, lng: 75.7873, label: 'Jaipur', detail: '3,110 cases', intensity: 64 },
  { lat: 25.5941, lng: 85.1376, label: 'Patna', detail: '2,740 cases', intensity: 58 },
  { lat: 23.0225, lng: 72.5714, label: 'Ahmedabad', detail: '2,480 cases', intensity: 55 },
  { lat: 26.8467, lng: 80.9462, label: 'Lucknow', detail: '2,960 cases', intensity: 61 },
];

const states = ['All States', 'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'West Bengal', 'Tamil Nadu'];
const crimeTypes = ['All Crimes', 'Digital Arrest', 'UPI Fraud', 'Counterfeit', 'Deepfake', 'SIM Swap'];
const riskColor: Record<string, string> = {
  critical: 'text-rose-300',
  high: 'text-amber-300',
  medium: 'text-cyan-300',
  low: 'text-emerald-300',
};

export function GeospatialPage() {
  const [state, setState] = useState(states[0]);
  const [crime, setCrime] = useState(crimeTypes[0]);
  const [heatmap, setHeatmap] = useState(true);

  return (
    <div>
      <PageHeader
        title="Geospatial Crime Intelligence"
        subtitle="Interactive India map with heatmaps, live crime markers and patrol priority indicators. Filter by state, district, crime type and date range."
        icon={<MapPin className="h-6 w-6 text-cyan-300" />}
      />

      {/* Filters */}
      <GlassCard className="mb-6 p-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="h-4 w-4 text-cyan-300" /> Filters
          </div>
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-widest text-slate-500">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="input-field py-2 text-sm">
              {states.map((s) => <option key={s} className="bg-ink-850">{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-widest text-slate-500">Crime Type</label>
            <select value={crime} onChange={(e) => setCrime(e.target.value)} className="input-field py-2 text-sm">
              {crimeTypes.map((c) => <option key={c} className="bg-ink-850">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-widest text-slate-500">Date Range</label>
            <select className="input-field py-2 text-sm">
              <option className="bg-ink-850">Last 24 hours</option>
              <option className="bg-ink-850">Last 7 days</option>
              <option className="bg-ink-850">Last 30 days</option>
            </select>
          </div>
          <button
            onClick={() => setHeatmap((h) => !h)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${heatmap ? 'bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-200' : 'border border-white/10 bg-white/[0.03] text-slate-300'}`}
          >
            <Flame className="h-4 w-4" /> Heatmap {heatmap ? 'On' : 'Off'}
          </button>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <SectionHeading label="Live Map" title="Crime Markers & Heatmap" />
          <LeafletMap points={mapPoints} heatmap={heatmap} height={460} />
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <SectionHeading label="Ranking" title="State Risk Index" />
            <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
              {stateHeatmap.map((s, i) => (
                <motion.div
                  key={s.state}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">#{i + 1}</span>
                    <span className="text-sm text-slate-200">{s.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{s.cases.toLocaleString()}</span>
                    <span className={`chip text-[10px] ${riskColor[s.risk]}`}>{s.risk}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeading label="Dispatch" title="Patrol Priority Zones" />
            <div className="space-y-3">
              {patrolZones.map((z, i) => (
                <motion.div
                  key={z.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Siren className={`h-4 w-4 ${z.priority === 'critical' ? 'text-rose-400' : z.priority === 'high' ? 'text-amber-400' : 'text-cyan-400'}`} />
                      <span className="text-sm font-medium text-slate-200">{z.area}</span>
                    </div>
                    <span className={`chip text-[10px] ${riskColor[z.priority]}`}>{z.priority}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{z.cases} active cases</span>
                    <span className="flex items-center gap-1"><Crosshair className="h-3 w-3" /> ETA {z.eta}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
