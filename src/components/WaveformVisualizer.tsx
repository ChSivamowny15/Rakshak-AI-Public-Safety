import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function WaveformVisualizer({ animate = true, bars = 64 }: { animate?: boolean; bars?: number }) {
  const heights = useRef<number[]>(Array.from({ length: bars }, () => Math.random() * 0.6 + 0.1));

  useEffect(() => {
    if (!animate) return;
    const id = setInterval(() => {
      heights.current = heights.current.map((h) => {
        const target = Math.random() * 0.9 + 0.1;
        return h + (target - h) * 0.3;
      });
    }, 120);
    return () => clearInterval(id);
  }, [animate]);

  return (
    <div className="flex h-32 items-end justify-center gap-[3px]">
      {heights.current.map((h, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-cyan-500 via-blue-500 to-violet-400"
          animate={{ height: `${h * 100}%` }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  );
}
