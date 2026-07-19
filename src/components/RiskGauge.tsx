import { motion } from 'framer-motion';

interface RiskGaugeProps {
  value: number; // 0-100
  label?: string;
  size?: number;
}

export function RiskGauge({ value, label = 'Risk Score', size = 180 }: RiskGaugeProps) {
  const radius = size / 2 - 14;
  const circ = Math.PI * radius; // semicircle
  const offset = circ - (value / 100) * circ;
  const color = value > 75 ? '#f43f5e' : value > 50 ? '#f59e0b' : '#22d3ee';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 24} viewBox={`0 0 ${size} ${size / 2 + 24}`}>
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        <path
          d={`M 14 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 14} ${size / 2}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <motion.path
          d={`M 14 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 14} ${size / 2}`}
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        <text x={size / 2} y={size / 2 - 6} textAnchor="middle" fontSize={size / 4.5} fontWeight="700" fill={color}>
          {value}
        </text>
        <text x={size / 2} y={size / 2 + 10} textAnchor="middle" fontSize="10" fill="#94a3b8">
          / 100
        </text>
      </svg>
      <p className="-mt-1 text-xs font-medium uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
}

export function ConfidenceMeter({ value, label = 'Confidence' }: { value: number; label?: string }) {
  const color = value > 80 ? '#22d3ee' : value > 60 ? '#3b82f6' : '#94a3b8';
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono font-semibold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, #22d3ee, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
