import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './theme';
import { ParticleBackground } from './components/ParticleBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';
import { Topbar, LoginModal } from './components/Topbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { HomePage } from './pages/HomePage';
import { ScamDetectionPage } from './pages/ScamDetectionPage';
import { DeepfakePage } from './pages/DeepfakePage';
import { CounterfeitPage } from './pages/CounterfeitPage';
import { NetworkPage } from './pages/NetworkPage';
import { GeospatialPage } from './pages/GeospatialPage';
import { ShieldPage } from './pages/ShieldPage';
import { ReportPage } from './pages/ReportPage';
import { PoliceDashboard } from './pages/PoliceDashboard';
import { BankDashboard } from './pages/BankDashboard';
import { TelecomDashboard } from './pages/TelecomDashboard';
import { EvidencePage } from './pages/EvidencePage';

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const navigate = (id: string) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'scam': return <ScamDetectionPage />;
      case 'deepfake': return <DeepfakePage />;
      case 'counterfeit': return <CounterfeitPage />;
      case 'network': return <NetworkPage />;
      case 'geospatial': return <GeospatialPage />;
      case 'shield': return <ShieldPage />;
      case 'report': return <ReportPage />;
      case 'police': return <PoliceDashboard />;
      case 'bank': return <BankDashboard />;
      case 'telecom': return <TelecomDashboard />;
      case 'evidence': return <EvidencePage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <ParticleBackground />
      <div className="lg:pl-64">
        <Sidebar current={page} onNavigate={navigate} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Topbar onMenu={() => setSidebarOpen(true)} onSearch={() => {}} onLogin={() => setLoginOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <AnimatePresence mode="wait">
            <PageTransition id={page} key={page}>
              {renderPage()}
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </ThemeProvider>
  );
}

export default App;
