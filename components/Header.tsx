import React from 'react';
import { ShieldAlert, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-cyber-700 bg-cyber-800/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyber-500/10 rounded-lg border border-cyber-500/20">
          <ShieldAlert className="w-6 h-6 text-cyber-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide font-mono">
            VULN<span className="text-cyber-400">SCOUT</span>
          </h1>
          <p className="text-xs text-slate-400">Siber Tehdit Analizcisi</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500">
        <Terminal className="w-4 h-4" />
        <span>MOTOR_AKTİF</span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      </div>
    </header>
  );
};