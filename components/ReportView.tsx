import React from 'react';
import { VulnerabilityReport, AppState } from '../types';
import { SourceList } from './SourceList';
import { FileText, Activity, AlertOctagon, ShieldAlert, Terminal } from 'lucide-react';
import { parse } from 'marked';

interface ReportViewProps {
  report: VulnerabilityReport | null;
  appState: AppState;
  error: string | null;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, appState, error }) => {
  
  // Use marked to parse markdown content safely
  const getMarkdownHtml = (markdown: string) => {
    try {
      // parse returns a Promise or string depending on options, assume string sync here or handle async if strictly needed
      // Since we are using basic CDN version usually sync:
      return { __html: parse(markdown) as string };
    } catch (e) {
      console.error("Markdown parsing failed", e);
      return { __html: markdown }; // Fallback to raw text
    }
  };

  if (appState === AppState.ERROR) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 border border-red-900/50 bg-red-900/10 rounded-xl backdrop-blur-sm animate-in fade-in mt-8">
        <div className="flex items-center gap-3 mb-2">
          <AlertOctagon className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-red-400">TARAMA HATASI</h2>
        </div>
        <p className="text-red-200/80 font-mono text-sm">{error || "Sistem bağlantısı kurulamadı."}</p>
      </div>
    );
  }

  if (appState === AppState.SEARCHING || appState === AppState.ANALYZING) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-cyber-900"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-cyber-400 animate-spin"></div>
          <div className="absolute inset-4 rounded-full border-t-2 border-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="w-8 h-8 text-cyber-400 animate-pulse" />
          </div>
        </div>
        <h2 className="text-xl font-mono font-bold text-white mb-2 animate-pulse">
          {appState === AppState.SEARCHING ? 'HEDEF TARANIYOR...' : 'ZAFİYETLER ANALİZ EDİLİYOR...'}
        </h2>
        <p className="text-slate-500 font-mono text-xs max-w-md mx-auto">
          {appState === AppState.SEARCHING 
            ? "Google Search motoru kullanılarak OSINT verileri toplanıyor ve sistem parmak izi çıkarılıyor." 
            : "Elde edilen veriler CVE veritabanı ile eşleştiriliyor ve simülasyon raporu hazırlanıyor."}
        </p>
      </div>
    );
  }

  if (appState === AppState.COMPLETE && report) {
    return (
      <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 mb-20 mt-8">
        <div className="bg-cyber-900/80 border border-cyber-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-900 via-cyber-500 to-cyber-900 opacity-70"></div>
          
          <div className="flex items-start justify-between mb-8 border-b border-cyber-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono tracking-wider">
                   RAPOR OLUŞTURULDU
                 </div>
                 <span className="text-slate-600 text-[10px] font-mono">
                   T-CODE: {report.timestamp}
                 </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3 break-all">
                {report.target}
              </h2>
            </div>
            <div className="hidden md:block p-3 bg-cyber-800 rounded-xl border border-cyber-700">
               <FileText className="w-6 h-6 text-cyber-400" />
            </div>
          </div>

          {/* Render Markdown properly using marked */}
          <div 
            className="markdown-body font-sans text-slate-300 text-sm"
            dangerouslySetInnerHTML={getMarkdownHtml(report.rawText)}
          />

          <SourceList sources={report.sources} />
          
          <div className="mt-8 p-4 border border-cyber-700/50 rounded-lg bg-cyber-900/50 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-slate-500" />
            <p className="text-xs text-slate-500 font-mono">
              DİKKAT: Bu rapor tamamen otomatik OSINT verilerine dayanmaktadır. Payload'lar simülasyon amaçlıdır.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mt-20 opacity-40 pointer-events-none select-none">
      <div className="inline-block p-6 rounded-full bg-cyber-800/50 mb-4 border border-cyber-800">
        <ShieldAlert className="w-16 h-16 text-slate-600" />
      </div>
      <p className="text-slate-500 font-mono text-sm">SİSTEM HAZIR. HEDEF BELİRTİN.</p>
    </div>
  );
};