import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', hover = false, delay = 0, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4 } : undefined}
      onClick={onClick}
      className={`glass-strong rounded-2xl shadow-glass ${hover ? 'transition-shadow hover:shadow-glow' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      {label && <p className="section-label mb-2">{label}</p>}
      <h2 className="font-display text-2xl font-bold text-slate-100 md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
}

export function StatusDot({ status }: { status: 'ok' | 'warn' | 'fail' | 'info' }) {
  const map = {
    ok: 'bg-emerald-400',
    warn: 'bg-amber-400',
    fail: 'bg-rose-500',
    info: 'bg-cyan-400',
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${map[status]} shadow-[0_0_8px_currentColor]`} />;
}
