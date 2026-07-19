import { motion } from 'framer-motion';
import { useState } from 'react';
import { indiaHotspots } from '../data/mock';

// Simplified India silhouette path (stylized, not survey-accurate).
const INDIA_PATH =
  'M 180 70 L 220 55 L 250 60 L 280 50 L 310 62 L 335 58 L 360 72 L 378 95 L 390 120 L 372 140 L 388 160 L 395 185 L 380 205 L 360 220 L 340 235 L 318 248 L 300 270 L 285 295 L 268 320 L 250 345 L 232 365 L 215 378 L 200 372 L 188 348 L 178 318 L 170 285 L 165 250 L 158 220 L 150 190 L 142 160 L 138 130 L 150 100 L 168 82 Z';

const VIEW_W = 500;
const VIEW_H = 420;

export function IndiaMap({ interactive = true }: { interactive?: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full" role="img" aria-label="India cyber threat hotspots">
        <defs>
          <linearGradient id="india-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.12)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.12)" />
          </linearGradient>
          <linearGradient id="india-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={INDIA_PATH}
          fill="url(#india-fill)"
          stroke="url(#india-stroke)"
          strokeWidth={1.5}
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />

        {/* grid dots inside */}
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 150 + (i % 10) * 24;
          const y = 80 + Math.floor(i / 10) * 34;
          return <circle key={i} cx={x} cy={y} r={0.8} fill="rgba(34,211,238,0.25)" />;
        })}

        {indiaHotspots.map((h, i) => {
          const cx = (h.x / 100) * VIEW_W;
          const cy = (h.y / 100) * VIEW_H;
          const color = h.intensity > 80 ? '#f43f5e' : h.intensity > 65 ? '#f59e0b' : '#22d3ee';
          return (
            <g key={h.city} onMouseEnter={() => interactive && setActive(i)} onMouseLeave={() => interactive && setActive(null)}>
              <motion.circle
                cx={cx}
                cy={cy}
                r={4 + h.intensity / 20}
                fill={color}
                opacity={0.9}
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.08, type: 'spring' }}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={4 + h.intensity / 20}
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
              />
              {active === i && (
                <g>
                  <rect x={cx + 8} y={cy - 22} width={120} height={34} rx={6} fill="rgba(10,14,26,0.92)" stroke="rgba(255,255,255,0.15)" />
                  <text x={cx + 16} y={cy - 8} fill="#e2e8f0" fontSize="11" fontWeight="600">{h.city}</text>
                  <text x={cx + 16} y={cy + 5} fill={color} fontSize="9">{h.cases.toLocaleString()} cases · {h.intensity}% intensity</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
