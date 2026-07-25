import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputBarProps {
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  return (
    <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl flex items-end space-x-2 focus-within:border-cyan-500/50 transition-colors">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Aegis Copilot about threats, PACS logs, MITRE mappings, or playbooks... (Press Enter to send)"
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-transparent border-0 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none min-h-[40px]"
        />

        <Button
          type="submit"
          variant="cyan-accent"
          size="sm"
          disabled={!text.trim() || isLoading}
          className="h-9 px-4 rounded-xl shrink-0 text-xs"
        >
          <span>Send</span>
          <Send className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex items-center justify-between px-3 pt-1 text-[10px] font-mono text-slate-500">
        <span>Aegis Guardian AI • Quaid-e-Azam Int. Hospital Operational Telemetry</span>
        <span className="flex items-center gap-1">
          <CornerDownLeft className="h-3 w-3" /> Shift + Enter for new line
        </span>
      </div>
    </form>
  );
};
