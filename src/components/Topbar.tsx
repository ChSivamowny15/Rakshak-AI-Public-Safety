import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  UserCircle2,
  X,
  ShieldAlert,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useTheme } from '../theme';
import { notifications as seedNotifications, roles } from '../data/mock';
import {
  Shield,
  Building2,
  Radio,
  UserCircle2 as UserCircleIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const roleIcons: Record<string, LucideIcon> = {
  citizen: UserCircleIcon,
  police: Shield,
  bank: Building2,
  telecom: Radio,
};

export function Topbar({
  onMenu,
  onSearch,
  onLogin,
}: {
  onMenu: () => void;
  onSearch: (q: string) => void;
  onLogin: () => void;
}) {
  const { theme, toggle } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(seedNotifications);
  const unread = items.filter((n) => n.unread).length;

  const typeIcon = (t: string) =>
    t === 'critical' ? ShieldAlert : t === 'warning' ? AlertTriangle : Info;
  const typeColor = (t: string) =>
    t === 'critical' ? 'text-rose-400' : t === 'warning' ? 'text-amber-400' : 'text-cyan-400';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/10 bg-ink-900/70 px-4 backdrop-blur-2xl md:px-6">
      <button onClick={onMenu} className="rounded-lg p-2 text-slate-300 hover:bg-white/5 lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search cases, numbers, UPI IDs, districts…"
          className="input-field pl-10"
          aria-label="Search"
        />
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={toggle}
          className="rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-white"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-white/10 bg-ink-850/95 shadow-glass backdrop-blur-2xl md:w-96"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <p className="text-sm font-semibold text-white">Notifications</p>
                    <button
                      onClick={() => setItems((s) => s.map((n) => ({ ...n, unread: false })))}
                      className="text-xs text-cyan-300 hover:text-cyan-200"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {items.map((n) => {
                      const Icon = typeIcon(n.type);
                      return (
                        <div
                          key={n.id}
                          className={`flex gap-3 border-b border-white/5 px-4 py-3 transition-colors hover:bg-white/[0.04] ${
                            n.unread ? 'bg-white/[0.02]' : ''
                          }`}
                        >
                          <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${typeColor(n.type)}`} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-200">{n.title}</p>
                            <p className="mt-0.5 text-xs text-slate-400">{n.detail}</p>
                          </div>
                          <span className="shrink-0 text-[10px] text-slate-500">{n.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onLogin}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-white/[0.08]"
        >
          <UserCircle2 className="h-4 w-4 text-cyan-300" />
          <span className="hidden sm:inline">Sign in</span>
        </button>
      </div>
    </header>
  );
}

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState('citizen');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-ink-850/95 shadow-glass backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <p className="font-display text-lg font-bold text-white">Role-based Sign In</p>
              <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">Select your role</p>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => {
                  const Icon = roleIcons[r.id] || UserCircle2;
                  const active = selected === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelected(r.id)}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        active
                          ? 'border-cyan-400/40 bg-cyan-500/10'
                          : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                      }`}
                    >
                      <Icon className={`mb-1.5 h-5 w-5 ${active ? 'text-cyan-300' : 'text-slate-400'}`} />
                      <p className="text-sm font-semibold text-slate-100">{r.label}</p>
                      <p className="text-[11px] text-slate-500">{r.desc}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 space-y-2.5">
                <input className="input-field" placeholder="Email or ID" type="email" />
                <input className="input-field" placeholder="Password" type="password" />
              </div>
              <button className="btn-primary mt-4 w-full" onClick={onClose}>
                Sign in as {roles.find((r) => r.id === selected)?.label}
              </button>
              <p className="mt-3 text-center text-xs text-slate-500">Demo prototype — no real authentication required.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
