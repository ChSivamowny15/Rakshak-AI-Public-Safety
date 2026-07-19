import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Languages, Siren, FileText, User, Sparkles } from 'lucide-react';
import { GlassCard, SectionHeading } from '../components/GlassCard';
import { PageHeader } from '../components/PageTransition';
import { chatSeed, chatSuggestions, languages, getBotReply } from '../data/mock';

interface Msg {
  from: 'bot' | 'user';
  text: string;
  time: string;
}

export function ShieldPage() {
  const [messages, setMessages] = useState<Msg[]>(chatSeed);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('en');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { from: 'user', text, time: 'now' };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply: Msg = { from: 'bot', text: getBotReply(text), time: 'now' };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div>
      <PageHeader
        title="Citizen Fraud Shield"
        subtitle="A multilingual AI assistant that assesses fraud risk, guides you through emergencies, and drafts complaints for submission to 1930 or cybercrime.gov.in."
        icon={<Bot className="h-6 w-6 text-cyan-300" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat */}
        <GlassCard className="flex h-[560px] flex-col p-0 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-cyan-400/30">
                <Bot className="h-4 w-4 text-cyan-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Rakshak Assistant</p>
                <p className="flex items-center gap-1 text-[10px] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-slate-400" />
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-slate-200">
                {languages.map((l) => <option key={l.code} value={l.code} className="bg-ink-850">{l.label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2.5 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${m.from === 'bot' ? 'bg-cyan-500/15' : 'bg-violet-500/15'}`}>
                  {m.from === 'bot' ? <Bot className="h-4 w-4 text-cyan-300" /> : <User className="h-4 w-4 text-violet-300" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.from === 'bot' ? 'border border-white/10 bg-white/[0.04] text-slate-200' : 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white'}`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
            <AnimatePresence>
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500/15"><Bot className="h-4 w-4 text-cyan-300" /></div>
                  <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-cyan-300" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 px-5 pb-2">
            {chatSuggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="chip hover:border-cyan-400/30 hover:text-cyan-200">
                <Sparkles className="h-3 w-3" /> {s}
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder="Describe the suspicious activity…"
                className="input-field"
              />
              <button onClick={() => send(input)} className="btn-primary px-3 py-2.5">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Side panels */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <SectionHeading label="Emergency" title="Quick Guidance" />
            <div className="space-y-3">
              <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-rose-300"><Siren className="h-4 w-4" /> If in danger</div>
                <p className="mt-2 text-xs text-slate-300">Call 112 immediately. Do not transfer money or share OTPs. Disconnect the suspicious call.</p>
              </div>
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300"><FileText className="h-4 w-4" /> File a complaint</div>
                <p className="mt-2 text-xs text-slate-300">Call 1930 or visit cybercrime.gov.in. Rakshak can auto-generate a complaint draft for you.</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeading label="Assessment" title="Fraud Risk Assessment" />
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                <span className="text-slate-400">Reports filed (you)</span>
                <span className="font-mono text-cyan-300">0</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                <span className="text-slate-400">Numbers blocked</span>
                <span className="font-mono text-cyan-300">3</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                <span className="text-slate-400">Risk level</span>
                <span className="chip text-emerald-300">Low</span>
              </div>
            </div>
            <button className="btn-ghost mt-4 w-full">
              <FileText className="h-4 w-4" /> Generate Complaint Draft
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
