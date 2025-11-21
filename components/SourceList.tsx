import React from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import { GroundingChunk } from '../types';

interface SourceListProps {
  sources: GroundingChunk[];
}

export const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  // Filter out duplicates based on URI
  const uniqueSources = sources.reduce((acc, current) => {
    const uri = current.web?.uri;
    if (uri && !acc.find(s => s.web?.uri === uri)) {
      acc.push(current);
    }
    return acc;
  }, [] as GroundingChunk[]);

  if (uniqueSources.length === 0) return null;

  return (
    <div className="mt-6 border-t border-cyber-700 pt-4">
      <h3 className="text-sm font-mono font-semibold text-cyber-400 mb-3 flex items-center gap-2">
        <Link2 className="w-4 h-4" />
        VERIFIED SOURCES
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {uniqueSources.map((source, index) => (
          <a
            key={index}
            href={source.web?.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded bg-cyber-800/50 border border-cyber-700 hover:border-cyber-500/50 hover:bg-cyber-700/50 transition-all group"
          >
            <div className="flex-1 min-w-0 mr-3">
              <div className="text-sm text-slate-300 font-medium truncate">
                {source.web?.title || 'Unknown Source'}
              </div>
              <div className="text-xs text-slate-500 truncate font-mono">
                {source.web?.uri}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyber-400 flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};