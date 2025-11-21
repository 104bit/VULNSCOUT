import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchInput } from './components/SearchInput';
import { ReportView } from './components/ReportView';
import { analyzeTargetVulnerabilities } from './services/geminiService';
import { AppState, VulnerabilityReport } from './types';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [report, setReport] = useState<VulnerabilityReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (target: string) => {
    setAppState(AppState.SEARCHING);
    setError(null);
    
    try {
      // Slight artificial delay to show searching state (UX)
      setTimeout(() => setAppState(AppState.ANALYZING), 2000);

      const result = await analyzeTargetVulnerabilities(target);
      
      setReport(result);
      setAppState(AppState.COMPLETE);
    } catch (err: any) {
      console.error("Scan failed", err);
      setError(err.message || "Bağlantı hatası. Analiz tamamlanamadı.");
      setAppState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative selection:bg-cyber-500/30 selection:text-white">
      {/* Background ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 relative z-10 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Zafiyet İstihbarat Motoru
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Yapay zeka destekli pasif tarama. Hedef sistemin mimarisini çıkarır, CVE veritabanı ile eşleştirir ve exploit senaryoları üretir.
          </p>
        </div>

        <SearchInput onSearch={handleSearch} appState={appState} />
        
        <ReportView report={report} appState={appState} error={error} />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center bg-cyber-900/80 backdrop-blur-md border-t border-cyber-800/50 text-slate-600 text-xs z-20">
        <p>VULNSCOUT AI © {new Date().getFullYear()} // SADECE YASAL GÜVENLİK ARAŞTIRMALARI İÇİNDİR</p>
      </footer>
    </div>
  );
}