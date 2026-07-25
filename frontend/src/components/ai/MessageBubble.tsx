import React from 'react';
import { MessageItem } from '@/services/aiService';
import { MarkdownRenderer } from './MarkdownRenderer';
import { AIResponseCard } from './AIResponseCard';
import { UserAvatar } from '@/components/auth/UserAvatar';
import { useAuthStore } from '@/store/useAuthStore';
import { Cpu } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface MessageBubbleProps {
  message: MessageItem;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { user } = useAuthStore();
  const isUser = message.role === 'USER';

  return (
    <div className={`flex items-start space-x-3 my-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className="shrink-0 mt-1">
        {isUser ? (
          <UserAvatar firstName={user?.firstName || 'Analyst'} lastName={user?.lastName || 'A'} size="sm" />
        ) : (
          <div className="flex items-center justify-center h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-md shadow-cyan-500/10">
            <Cpu className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-2xl rounded-2xl p-4 shadow-xl space-y-2 ${
        isUser
          ? 'bg-cyan-500/10 border border-cyan-500/30 text-slate-100'
          : 'bg-slate-900/80 border border-slate-800 text-slate-200 backdrop-blur-md'
      }`}>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1 border-b border-slate-800/60">
          <span className="font-semibold text-slate-300">
            {isUser ? `${user?.firstName || 'Analyst'} (${user?.role || 'OPERATOR'})` : 'Aegis Copilot GPT-4o RAG'}
          </span>
          <span>{formatDate(message.createdAt)}</span>
        </div>

        {/* Content */}
        <MarkdownRenderer content={message.content} />

        {/* Optional Structured Card */}
        {message.structuredData && <AIResponseCard data={message.structuredData} />}
      </div>
    </div>
  );
};
