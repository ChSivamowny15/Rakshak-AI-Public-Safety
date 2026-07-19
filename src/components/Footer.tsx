import { ShieldCheck, Phone, HeartPulse, Building2, ShieldAlert, Globe } from 'lucide-react';
import { emergencyContacts } from '../data/mock';

const iconMap: Record<string, typeof Phone> = {
  ShieldAlert,
  Siren: Phone,
  HeartPulse,
  Building2,
};

export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-ink-900/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-cyan-400/30">
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-white">Rakshak AI</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Digital Public Safety Intelligence</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-slate-400">
              An AI-powered platform uniting citizens, police, banks and telecom to predict, prevent and
              protect against digital fraud across India.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Globe className="h-4 w-4" />
              <span>Prototype for demonstration • Made in India</span>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Emergency Contacts</p>
            <ul className="space-y-2.5">
              {emergencyContacts.map((c) => {
                const Icon = iconMap[c.icon] || Phone;
                return (
                  <li key={c.label} className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500/10 ring-1 ring-rose-400/20">
                      <Icon className="h-4 w-4 text-rose-300" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-200">{c.label}</p>
                      <p className="font-mono text-xs font-semibold text-cyan-300">{c.number}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Quick Links</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-300">National Cyber Crime Portal</a></li>
              <li><a href="#" className="hover:text-cyan-300">Report at cybercrime.gov.in</a></li>
              <li><a href="#" className="hover:text-cyan-300">RBI Fake Note Guidance</a></li>
              <li><a href="#" className="hover:text-cyan-300">TRAI Spam Reporting</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2025 Rakshak AI — Hackathon Prototype. All data shown is synthetic.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Intelligence grid online
          </p>
        </div>
      </div>
    </footer>
  );
}
