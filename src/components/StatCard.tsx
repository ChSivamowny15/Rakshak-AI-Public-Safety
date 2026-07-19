import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  trend?: string;
  up?: boolean;
  color: string; // tailwind gradient
  delay?: number;
}

export function useCountUp(target: number, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

export function StatCard({ label, value, suffix = '', icon, trend, up, color, delay = 0 }: StatCardProps) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[icon] || Icons.Activity;
  const animated = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="glass-strong group relative overflow-hidden rounded-2xl p-5"
    >
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`} />
      <div className="flex items-start justify-between">
        <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${color} bg-opacity-20 shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        {trend && (
          <span className={`chip ${up ? 'text-emerald-300' : 'text-rose-300'}`}>{trend}</span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
        {animated.toLocaleString('en-IN', { maximumFractionDigits: 1 })}
        <span className="ml-1 text-lg text-slate-400">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}
