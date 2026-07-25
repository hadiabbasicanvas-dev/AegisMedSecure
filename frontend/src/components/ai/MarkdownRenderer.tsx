import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Simple clean markdown parser format
  const renderParagraphs = () => {
    const lines = content.split('\n');
    let codeBlockActive = false;
    let codeBuffer: string[] = [];
    let codeIndex = 0;

    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (codeBlockActive) {
          // Close block
          const codeString = codeBuffer.join('\n');
          const currentIdx = codeIndex++;
          elements.push(
            <div key={`code-${idx}`} className="my-3 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs shadow-lg">
              <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[11px] text-slate-400">
                <span>Code Block</span>
                <button
                  onClick={() => handleCopy(codeString, currentIdx)}
                  className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {copiedIndex === currentIdx ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-cyan-300 overflow-x-auto">
                <code>{codeString}</code>
              </pre>
            </div>
          );
          codeBuffer = [];
          codeBlockActive = false;
        } else {
          codeBlockActive = true;
        }
        return;
      }

      if (codeBlockActive) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-base font-extrabold text-slate-50 mt-4 mb-2 border-b border-slate-800 pb-1">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-sm font-bold text-cyan-400 mt-3 mb-1 font-mono">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={idx} className="ml-4 text-xs text-slate-300 leading-relaxed list-disc my-0.5">
            {line.substring(2)}
          </li>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={idx} className="h-2" />);
      } else {
        elements.push(
          <p key={idx} className="text-xs text-slate-200 leading-relaxed my-1">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return <div className="space-y-1 text-xs leading-relaxed">{renderParagraphs()}</div>;
};
