import React from 'react';
import { Cpu } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 my-4">
      <div className="flex items-center justify-center h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
        <Cpu className="h-4 w-4 animate-pulse" />
      </div>
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-4 py-3 text-xs text-cyan-400 font-mono flex items-center space-x-2 backdrop-blur-md">
        <span>Aegis Copilot is evaluating QIH telemetry & RAG context</span>
        <div className="flex space-x-1">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
