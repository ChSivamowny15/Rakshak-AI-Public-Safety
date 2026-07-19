// Centralized mock data for the Rakshak AI prototype.

export type NodeType = 'phone' | 'bank' | 'upi' | 'device' | 'cluster';
export type RiskLevel = 'high' | 'med' | 'low';

export const liveStats = [
  { id: 'fraud', label: 'Fraud Alerts', value: 48213, suffix: '', icon: 'ShieldAlert', trend: '+12.4%', up: true, color: 'from-rose-500 to-red-500' },
  { id: 'scam', label: 'Scam Calls', value: 129487, suffix: '', icon: 'PhoneOff', trend: '+8.1%', up: true, color: 'from-amber-500 to-orange-500' },
  { id: 'counterfeit', label: 'Counterfeit Reports', value: 7634, suffix: '', icon: 'Banknote', trend: '+3.2%', up: true, color: 'from-violet-500 to-purple-500' },
  { id: 'saved', label: 'Money Saved', value: 42.6, suffix: 'Cr', icon: 'IndianRupee', trend: '+18.9%', up: true, color: 'from-emerald-500 to-teal-500' },
];

export const indiaHotspots = [
  { city: 'Delhi', x: 42, y: 18, intensity: 95, cases: 8420 },
  { city: 'Mumbai', x: 32, y: 55, intensity: 88, cases: 7210 },
  { city: 'Bengaluru', x: 38, y: 78, intensity: 82, cases: 6540 },
  { city: 'Hyderabad', x: 44, y: 68, intensity: 76, cases: 5130 },
  { city: 'Kolkata', x: 66, y: 34, intensity: 79, cases: 4870 },
  { city: 'Chennai', x: 50, y: 82, intensity: 71, cases: 4320 },
  { city: 'Jaipur', x: 34, y: 28, intensity: 64, cases: 3110 },
  { city: 'Patna', x: 58, y: 24, intensity: 58, cases: 2740 },
  { city: 'Ahmedabad', x: 24, y: 44, intensity: 55, cases: 2480 },
  { city: 'Lucknow', x: 48, y: 22, intensity: 61, cases: 2960 },
];

export const featureList = [
  { icon: 'ShieldAlert', title: 'Digital Arrest Scam Detection', desc: 'AI analyzes calls, SMS and numbers to flag digital-arrest fraud in real time.', color: 'from-rose-500/20 to-red-500/10', accent: 'text-rose-300' },
  { icon: 'AudioLines', title: 'Voice Deepfake Detection', desc: 'Waveform forensics separate genuine human speech from AI-synthesized clones.', color: 'from-cyan-500/20 to-blue-500/10', accent: 'text-cyan-300' },
  { icon: 'Banknote', title: 'Counterfeit Currency Detection', desc: 'Computer vision inspects watermarks, threads, microprint and UV features.', color: 'from-violet-500/20 to-purple-500/10', accent: 'text-violet-300' },
  { icon: 'Network', title: 'Fraud Network Intelligence', desc: 'Link phones, banks, UPI IDs and devices to expose fraud clusters.', color: 'from-blue-500/20 to-indigo-500/10', accent: 'text-blue-300' },
  { icon: 'MapPin', title: 'Geospatial Crime Intelligence', desc: 'Heatmaps, live markers and patrol priorities across India.', color: 'from-emerald-500/20 to-teal-500/10', accent: 'text-emerald-300' },
  { icon: 'Bot', title: 'Citizen Fraud Shield', desc: 'Multilingual AI assistant for fraud assessment and complaint filing.', color: 'from-amber-500/20 to-orange-500/10', accent: 'text-amber-300' },
];

export const scamAnalysis = {
  riskScore: 87,
  confidence: 94,
  verdict: 'High-Risk Digital Arrest Scam',
  explanation:
    'The transcript exhibits classic digital-arrest indicators: impersonation of a government agency (TRAI/Police), threats of imminent arrest, pressure to stay on the call, and instructions to transfer funds for "verification". Voice stress markers and urgency cues are consistent with 1,200+ verified scam samples.',
  indicators: [
    { label: 'Authority impersonation', weight: 0.92 },
    { label: 'Threat of arrest', weight: 0.88 },
    { label: 'Urgency / time pressure', weight: 0.85 },
    { label: 'Fund transfer request', weight: 0.79 },
    { label: 'Isolation tactic (do not hang up)', weight: 0.73 },
  ],
  actions: [
    'Do not transfer any money or share OTPs.',
    'Disconnect the call immediately and dial 1930 (Cyber Crime Helpline).',
    'Report the number on the National Cyber Crime Portal.',
    'Block the caller and inform your bank about potential fraud.',
  ],
  timeline: [
    { t: '00:00', event: 'Call connected — caller claims TRAI official', type: 'flag' },
    { t: '00:42', event: 'Threat of arrest issued', type: 'critical' },
    { t: '01:18', event: 'Request to keep line active (isolation)', type: 'flag' },
    { t: '02:05', event: 'Demand for fund transfer to "verify"', type: 'critical' },
    { t: '02:30', event: 'AI flags scam — recommendation to disconnect', type: 'action' },
  ],
};

export const deepfakeAnalysis = {
  prediction: 'AI-Synthesized',
  confidence: 91,
  humanProb: 9,
  aiProb: 91,
  features: [
    { name: 'Spectral coherence', value: 0.34, status: 'anomalous' },
    { name: 'Pitch jitter', value: 0.12, status: 'anomalous' },
    { name: 'Formant consistency', value: 0.28, status: 'anomalous' },
    { name: 'Breath pattern', value: 0.08, status: 'anomalous' },
    { name: 'Phase continuity', value: 0.41, status: 'suspicious' },
    { name: 'Micro-tremor', value: 0.15, status: 'anomalous' },
  ],
};

export const counterfeitResult = {
  prediction: 'Counterfeit Detected',
  confidence: 89,
  checks: [
    { id: 'watermark', label: 'Mahatma Gandhi Watermark', status: 'fail', detail: 'Watermark absent in transmitted light — expected 3D shadow portrait not detected.' },
    { id: 'thread', label: 'Security Thread', status: 'fail', detail: 'Embedded thread discontinuous; windowed segments show no color shift.' },
    { id: 'microprint', label: 'Microprinting', status: 'fail', detail: 'Micro-lettering at base of portrait is blurred — likely photomechanical reproduction.' },
    { id: 'serial', label: 'Serial Number', status: 'warn', detail: 'Serial font weight deviates by 0.3pt from RBI specification.' },
    { id: 'latent', label: 'Latent Image', status: 'fail', detail: 'Hidden denomination image not visible at 45° viewing angle.' },
    { id: 'uv', label: 'UV Fluorescence', status: 'fail', detail: 'No UV-reactive fibers detected under 365nm inspection.' },
  ],
};

export const networkNodes: { id: string; label: string; type: NodeType; risk: RiskLevel }[] = [
  { id: 'n1', label: '+91 98xxx xx120', type: 'phone', risk: 'high' },
  { id: 'n2', label: '+91 70xxx xx891', type: 'phone', risk: 'high' },
  { id: 'n3', label: '+91 63xxx xx447', type: 'phone', risk: 'med' },
  { id: 'n4', label: 'HDFC ••4821', type: 'bank', risk: 'high' },
  { id: 'n5', label: 'SBI ••0932', type: 'bank', risk: 'med' },
  { id: 'n6', label: 'fraudster@upi', type: 'upi', risk: 'high' },
  { id: 'n7', label: 'shopeasy@okaxis', type: 'upi', risk: 'med' },
  { id: 'n8', label: 'Device IMEI ••7781', type: 'device', risk: 'high' },
  { id: 'n9', label: 'Device IMEI ••2240', type: 'device', risk: 'med' },
  { id: 'n10', label: 'Cluster-A (12 nodes)', type: 'cluster', risk: 'high' },
];

export const networkEdges = [
  { id: 'e1', source: 'n1', target: 'n4' },
  { id: 'e2', source: 'n1', target: 'n6' },
  { id: 'e3', source: 'n2', target: 'n4' },
  { id: 'e4', source: 'n2', target: 'n8' },
  { id: 'e5', source: 'n3', target: 'n5' },
  { id: 'e6', source: 'n3', target: 'n7' },
  { id: 'e7', source: 'n6', target: 'n10' },
  { id: 'e8', source: 'n7', target: 'n10' },
  { id: 'e9', source: 'n8', target: 'n9' },
  { id: 'e10', source: 'n10', target: 'n4' },
];

export const fraudTrend = [
  { month: 'Jan', fraud: 3200, scam: 8100, counterfeit: 540 },
  { month: 'Feb', fraud: 3450, scam: 8900, counterfeit: 610 },
  { month: 'Mar', fraud: 3890, scam: 9400, counterfeit: 580 },
  { month: 'Apr', fraud: 4100, scam: 10100, counterfeit: 690 },
  { month: 'May', fraud: 4520, scam: 11200, counterfeit: 720 },
  { month: 'Jun', fraud: 4980, scam: 12400, counterfeit: 760 },
  { month: 'Jul', fraud: 5410, scam: 12900, counterfeit: 810 },
];

export const fraudTypeBreakdown = [
  { name: 'Digital Arrest', value: 32, color: '#f43f5e' },
  { name: 'UPI Fraud', value: 24, color: '#3b82f6' },
  { name: 'Fake Loan', value: 18, color: '#a855f7' },
  { name: 'Counterfeit', value: 12, color: '#22d3ee' },
  { name: 'Deepfake', value: 9, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#64748b' },
];

export const stateHeatmap = [
  { state: 'Maharashtra', cases: 8420, risk: 'critical' },
  { state: 'Delhi', cases: 7210, risk: 'critical' },
  { state: 'Karnataka', cases: 6540, risk: 'high' },
  { state: 'Telangana', cases: 5130, risk: 'high' },
  { state: 'West Bengal', cases: 4870, risk: 'high' },
  { state: 'Tamil Nadu', cases: 4320, risk: 'medium' },
  { state: 'Uttar Pradesh', cases: 3960, risk: 'medium' },
  { state: 'Rajasthan', cases: 3110, risk: 'medium' },
  { state: 'Gujarat', cases: 2480, risk: 'low' },
  { state: 'Bihar', cases: 2740, risk: 'low' },
];

export const patrolZones = [
  { id: 'PZ-01', area: 'Connaught Place, Delhi', priority: 'critical', eta: '4 min', cases: 18 },
  { id: 'PZ-02', area: 'Whitefield, Bengaluru', priority: 'high', eta: '9 min', cases: 12 },
  { id: 'PZ-03', area: 'Salt Lake, Kolkata', priority: 'high', eta: '11 min', cases: 9 },
  { id: 'PZ-04', area: 'Banjara Hills, Hyderabad', priority: 'medium', eta: '18 min', cases: 6 },
  { id: 'PZ-05', area: 'Anna Nagar, Chennai', priority: 'medium', eta: '22 min', cases: 5 },
];

export const investigationQueue = [
  { id: 'INV-4821', title: 'Digital arrest — ₹4.2L loss', status: 'active', priority: 'P1', officer: 'Insp. R. Verma', age: '2h' },
  { id: 'INV-4820', title: 'UPI chargeback fraud ring', status: 'active', priority: 'P1', officer: 'SI A. Khan', age: '5h' },
  { id: 'INV-4818', title: 'Fake currency batch — ₹2000', status: 'review', priority: 'P2', officer: 'HC S. Nair', age: '1d' },
  { id: 'INV-4815', title: 'Deepfake voice extortion', status: 'pending', priority: 'P2', officer: 'Unassigned', age: '2d' },
  { id: 'INV-4812', title: 'SIM-swap account takeover', status: 'pending', priority: 'P3', officer: 'Unassigned', age: '3d' },
];

export const bankAlerts = [
  { id: 'TXN-99201', account: 'HDFC ••4821', amount: '₹4,20,000', type: 'Rapid transfer', risk: 'critical', time: '2 min ago' },
  { id: 'TXN-99198', account: 'ICICI ••7732', amount: '₹1,85,000', type: 'Mule deposit', risk: 'high', time: '14 min ago' },
  { id: 'TXN-99187', account: 'SBI ••0932', amount: '₹95,000', type: 'Structuring pattern', risk: 'high', time: '38 min ago' },
  { id: 'TXN-99176', account: 'AXIS ••2210', amount: '₹62,500', type: 'Off-hours withdrawal', risk: 'medium', time: '1h ago' },
];

export const bankFakeCurrency = [
  { id: 'FC-301', branch: 'Mumbai Fort', denom: '₹2000', count: 14, status: 'confirmed' },
  { id: 'FC-302', branch: 'Delhi CP', denom: '₹500', count: 31, status: 'confirmed' },
  { id: 'FC-303', branch: 'Bengaluru MG', denom: '₹2000', count: 8, status: 'suspected' },
  { id: 'FC-304', branch: 'Kolkata Park', denom: '₹500', count: 22, status: 'suspected' },
];

export const telecomAlerts = [
  { id: 'SC-501', number: '+91 98xxx xx120', type: 'Scam call surge', count: '1,240 calls/hr', risk: 'critical' },
  { id: 'SC-502', number: '+91 70xxx xx891', type: 'Spoofed CLI', count: '680 calls/hr', risk: 'high' },
  { id: 'SC-503', number: '+91 63xxx xx447', type: 'AI voice clone', count: '320 calls/hr', risk: 'high' },
  { id: 'SC-504', number: '+91 88xxx xx023', type: 'SIM swap abuse', count: '14 events', risk: 'medium' },
];

export const evidenceTimeline = [
  { time: '14:02:11', title: 'Inbound scam call connected', detail: 'Duration 4m 18s • caller +91 98xxx xx120', tag: 'call' },
  { time: '14:02:53', title: 'AI scam detection triggered', detail: 'Risk score 87 • confidence 94%', tag: 'ai' },
  { time: '14:03:30', title: 'Fund transfer attempted', detail: '₹4,20,000 to fraudster@upi via HDFC ••4821', tag: 'transaction' },
  { time: '14:04:10', title: 'Bank freeze requested', detail: '1930 helpline • ticket #CFC-2025-8841', tag: 'action' },
  { time: '14:05:02', title: 'Evidence package sealed', detail: 'Hash 0x8af2...c19d • chain-of-custody initiated', tag: 'evidence' },
];

export const notifications = [
  { id: 1, title: 'Critical: Digital arrest scam spike', detail: 'Delhi NCR — 240% increase in last hour', time: '2m', type: 'critical', unread: true },
  { id: 2, title: 'New counterfeit cluster', detail: '₹2000 notes detected in Mumbai Fort branch', time: '18m', type: 'warning', unread: true },
  { id: 3, title: 'Deepfake voice alert', detail: 'AI-clone call targeting senior citizens', time: '44m', type: 'warning', unread: true },
  { id: 4, title: 'Patrol dispatch updated', detail: 'PZ-01 priority raised to critical', time: '1h', type: 'info', unread: false },
  { id: 5, title: 'Investigation INV-4821 assigned', detail: 'Now owned by Insp. R. Verma', time: '2h', type: 'info', unread: false },
];

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
];

export const chatSeed: { from: 'bot' | 'user'; text: string; time: string }[] = [
  { from: 'bot', text: 'Namaste! I am Rakshak, your Citizen Fraud Shield. How can I help you today? You can describe a suspicious call, message, or transaction.', time: 'now' },
];

export const chatSuggestions = [
  'I got a call saying my SIM will be deactivated',
  'Is this UPI ID safe: fraudster@upi?',
  'How do I report a digital arrest scam?',
  'Someone is threatening me with arrest',
];

export const botReplies: Record<string, string> = {
  sim: 'A "SIM deactivation" call is a common scam. Real telecom operators never ask for OTPs or money to keep your SIM active. Do not share any OTP. Call your operator directly from their official number to verify.',
  upi: 'The UPI ID "fraudster@upi" has been flagged in 14 fraud reports across 3 states. Do NOT transfer any money. Block the contact and report at cybercrime.gov.in or call 1930.',
  arrest: 'Digital arrest scams impersonate police/TRAI officials and threaten arrest to extract money. No real agency arrests you over a phone call or demands money to "verify". Disconnect, dial 1930, and file a complaint on the National Cyber Crime Portal.',
  default: 'I understand. Please share the phone number, message content, or any transaction details. I can assess the risk, guide you on next steps, and generate a complaint draft for submission to 1930 / cybercrime.gov.in.',
};

export function getBotReply(input: string): string {
  const t = input.toLowerCase();
  if (t.includes('sim') || t.includes('deactiv')) return botReplies.sim;
  if (t.includes('upi') || t.includes('fraudster')) return botReplies.upi;
  if (t.includes('arrest') || t.includes('threat')) return botReplies.arrest;
  return botReplies.default;
}

export const emergencyContacts = [
  { label: 'Cyber Crime Helpline', number: '1930', icon: 'ShieldAlert' },
  { label: 'Emergency Police', number: '112', icon: 'Siren' },
  { label: 'Women Helpline', number: '1091', icon: 'HeartPulse' },
  { label: 'Anti-Fraud Bank Line', number: '1444', icon: 'Building2' },
];

export const roles = [
  { id: 'citizen', label: 'Citizen', icon: 'User', desc: 'Report fraud, get AI guidance' },
  { id: 'police', label: 'Police Officer', icon: 'Shield', desc: 'Investigations & analytics' },
  { id: 'bank', label: 'Bank Analyst', icon: 'Building2', desc: 'Transaction risk monitoring' },
  { id: 'telecom', label: 'Telecom Analyst', icon: 'Radio', desc: 'Network abuse monitoring' },
];
