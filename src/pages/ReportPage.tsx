import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, MapPin, CheckCircle2, Hash, Loader2, Phone, AlertTriangle } from 'lucide-react';
import { GlassCard, SectionHeading } from '../components/GlassCard';
import { PageHeader } from '../components/PageTransition';

const fraudTypes = ['Digital Arrest Scam', 'UPI Fraud', 'Counterfeit Currency', 'Voice Deepfake', 'Phishing SMS', 'Fake Loan App', 'Other'];

export function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complaintId] = useState(() => 'RAK-' + Math.floor(100000 + Math.random() * 900000));
  const [type, setType] = useState(fraudTypes[0]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1600);
  };

  return (
    <div>
      <PageHeader
        title="Report Fraud"
        subtitle="File a detailed fraud report with evidence uploads and GPS location. A unique complaint ID is auto-generated for tracking on the National Cyber Crime Portal."
        icon={<FileText className="h-6 w-6 text-cyan-300" />}
      />

      {submitted ? (
        <GlassCard className="p-10 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20">
            <CheckCircle2 className="h-8 w-8 text-emerald-300" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-white">Report Submitted</h2>
          <p className="mt-2 text-sm text-slate-400">Your complaint has been registered with Rakshak AI and forwarded to 1930.</p>
          <div className="mx-auto mt-5 max-w-xs rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
            <p className="text-xs text-slate-400">Your Complaint ID</p>
            <p className="mt-1 font-mono text-lg font-bold text-cyan-300">{complaintId}</p>
          </div>
          <p className="mt-4 text-xs text-slate-500">Save this ID to track status. You will receive SMS updates.</p>
          <button onClick={() => setSubmitted(false)} className="btn-ghost mt-6">
            File Another Report
          </button>
        </GlassCard>
      ) : (
        <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-6 lg:col-span-2">
            <SectionHeading label="Details" title="Incident Information" />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-slate-400">Full Name</label>
                <input className="input-field" placeholder="Your name" required />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-slate-400">Contact Number</label>
                <input className="input-field font-mono" placeholder="+91 …" required />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs text-slate-400">Fraud Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
                  {fraudTypes.map((t) => <option key={t} className="bg-ink-850">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-slate-400">Suspect Phone / UPI</label>
                <input className="input-field font-mono" placeholder="+91 98xxx xx120 or fraud@upi" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-slate-400">Amount Lost (₹)</label>
                <input className="input-field font-mono" type="number" placeholder="0" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs text-slate-400">Description</label>
                <textarea rows={4} className="input-field resize-none" placeholder="Describe what happened…" required />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-xs text-slate-400">Upload Evidence (screenshots, recordings)</label>
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-8 text-center transition-all hover:border-cyan-400/40 hover:bg-cyan-500/5">
                <Upload className="mb-2 h-7 w-7 text-slate-400 group-hover:text-cyan-300" />
                <p className="text-sm text-slate-200">Drag files or click to upload</p>
                <p className="mt-1 text-xs text-slate-500">Images, audio, PDF — up to 5 files</p>
                <input type="file" multiple className="hidden" />
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-5 w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
              {loading ? 'Submitting…' : 'Submit Report'}
            </button>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <SectionHeading label="Location" title="GPS Coordinates" />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-sm text-slate-200"><MapPin className="h-4 w-4 text-cyan-300" /> Auto-detected</div>
                <p className="mt-2 font-mono text-xs text-slate-400">Lat 28.6139, Lng 77.2090</p>
                <p className="mt-1 text-xs text-slate-500">Connaught Place, New Delhi</p>
              </div>
              <button type="button" className="btn-ghost mt-3 w-full text-xs">
                <MapPin className="h-3.5 w-3.5" /> Use Current Location
              </button>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
                <Hash className="h-4 w-4" /> Complaint ID
              </div>
              <p className="mt-2 font-mono text-lg font-bold text-white">{complaintId}</p>
              <p className="mt-1 text-xs text-slate-500">Auto-generated — reference this ID for tracking.</p>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-300">
                <AlertTriangle className="h-4 w-4" /> After Filing
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> Call 1930 to freeze funds if money was transferred.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> Preserve all evidence — do not delete messages.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> Track status with your Complaint ID.</li>
              </ul>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-rose-400/20 bg-rose-500/10 p-3 text-xs text-rose-200">
                <Phone className="h-3.5 w-3.5" /> Helpline: 1930
              </div>
            </GlassCard>
          </div>
        </form>
      )}
    </div>
  );
}
