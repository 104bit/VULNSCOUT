import React, { useState } from 'react';
import { Search, AlertTriangle, Cpu } from 'lucide-react';
import { AppState } from '../types';

interface SearchInputProps {
  onSearch: (query: string) => void;
  appState: AppState;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, appState }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && appState !== AppState.SEARCHING && appState !== AppState.ANALYZING) {
      onSearch(query);
    }
  };

  const isLoading = appState === AppState.SEARCHING || appState === AppState.ANALYZING;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 relative z-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-cyber-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-1000 group-hover:duration-200 ${isLoading ? 'animate-pulse' : ''}`}></div>
        <div className="relative flex items-center bg-cyber-900 border border-cyber-700 rounded-xl overflow-hidden shadow-2xl">
          <div className="pl-4 text-slate-500">
            {isLoading ? (
              <Cpu className="w-5 h-5 animate-spin text-cyber-400" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hedef tanımla (örn: 'example.com', 'Apache 2.4.49', 'Jira Server')"
            className="w-full bg-transparent text-white px-4 py-4 outline-none placeholder-slate-600 font-mono text-sm md:text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="mx-2 px-6 py-2 bg-cyber-700 hover:bg-cyber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors border border-cyber-600 whitespace-nowrap"
          >
            {isLoading ? 'TARANIYOR...' : 'ANALİZ ET'}
          </button>
        </div>
      </form>
      
      <div className="mt-3 flex items-start gap-2 px-2">
         <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
         <p className="text-xs text-slate-500 leading-relaxed">
           AI, <span className="text-cyber-400">Canlı Web Araması</span> ile hedef hakkında topladığı bilgileri analiz eder ve olası saldırı senaryolarını simüle eder.
         </p>
      </div>
    </div>
  );
};