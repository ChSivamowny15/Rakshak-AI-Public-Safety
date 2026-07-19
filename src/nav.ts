import {
  LayoutDashboard,
  ShieldAlert,
  AudioLines,
  Banknote,
  Network,
  MapPin,
  Bot,
  FileText,
  Shield,
  Building2,
  Radio,
  FileCheck2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  group: string;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: LayoutDashboard, group: 'Overview' },
  { id: 'scam', label: 'Digital Arrest Scam', icon: ShieldAlert, group: 'AI Detection' },
  { id: 'deepfake', label: 'Voice Deepfake', icon: AudioLines, group: 'AI Detection' },
  { id: 'counterfeit', label: 'Counterfeit Currency', icon: Banknote, group: 'AI Detection' },
  { id: 'network', label: 'Fraud Network', icon: Network, group: 'Intelligence' },
  { id: 'geospatial', label: 'Geospatial Crime', icon: MapPin, group: 'Intelligence' },
  { id: 'shield', label: 'Citizen Fraud Shield', icon: Bot, group: 'Citizen' },
  { id: 'report', label: 'Report Fraud', icon: FileText, group: 'Citizen' },
  { id: 'police', label: 'Police Dashboard', icon: Shield, group: 'Dashboards' },
  { id: 'bank', label: 'Bank Dashboard', icon: Building2, group: 'Dashboards' },
  { id: 'telecom', label: 'Telecom Dashboard', icon: Radio, group: 'Dashboards' },
  { id: 'evidence', label: 'Evidence Generator', icon: FileCheck2, group: 'Forensics' },
];

export const navGroups = ['Overview', 'AI Detection', 'Intelligence', 'Citizen', 'Dashboards', 'Forensics'];
