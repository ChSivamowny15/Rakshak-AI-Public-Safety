import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ChevronRight } from 'lucide-react';
import { navItems, navGroups } from '../nav';
import type { NavItem } from '../nav';

export function Sidebar({
  current,
  onNavigate,
  open,
  onClose,
}: {
  current: string;
  onNavigate: (id: string) => void;
  open: boolean;
  onClose: () => void;
}) {
  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = current === item.id;
    return (
      <button
        key={item.id}
        onClick={() => {
          onNavigate(item.id);
          onClose();
        }}
        className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {active && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 to-violet-500/10"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <Icon className={`relative z-10 h-4 w-4 shrink-0 ${active ? 'text-cyan-300' : ''}`} />
        <span className="relative z-10">{item.label}</span>
        {active && <ChevronRight className="relative z-10 ml-auto h-4 w-4 text-cyan-300" />}
      </button>
    );
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform border-r border-white/10 bg-ink-900/80 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-cyan-400/30">
              <ShieldCheck className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="font-display text-sm font-bold leading-none text-white">Rakshak AI</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-500">Public Safety</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="h-[calc(100%-4rem)] overflow-y-auto px-3 pb-6">
          {navGroups.map((group) => (
            <div key={group} className="mb-4">
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">{group}</p>
              {navItems.filter((i) => i.group === group).map(renderItem)}
            </div>
          ))}
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs text-slate-400">System Status</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">All systems operational</span>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
