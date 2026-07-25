import React, { useState, useEffect, useRef } from 'react';
import { useConversations, useConversationDetail, useSendChatMessage } from '@/services/aiService';
import { ConversationSidebar } from './ConversationSidebar';
import { MessageBubble } from './MessageBubble';
import { SuggestedPrompts } from './SuggestedPrompts';
import { TypingIndicator } from './TypingIndicator';
import { ChatInputBar } from './ChatInputBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Cpu, RotateCcw } from 'lucide-react';

interface ChatWindowProps {
  initialThreatId?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ initialThreatId }) => {
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversations = [], isLoading: isLoadingList } = useConversations();
  const { data: activeConv, isLoading: isLoadingDetail } = useConversationDetail(activeId || '');

  const sendMessage = useSendChatMessage();

  useEffect(() => {
    if (conversations.length > 0 && !activeId) {
      setActiveId(conversations[0].id);
    }
  }, [conversations, activeId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, sendMessage.isPending]);

  const handleSendMessage = (text: string) => {
    sendMessage.mutate({
      prompt: text,
      conversationId: activeId,
      threatId: initialThreatId,
    });
  };

  const handleNewChat = () => {
    setActiveId(undefined);
  };

  const messages = activeConv?.messages || [];

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-[#1B1B1B] border border-[#2A2A2A] shadow-2xl overflow-hidden font-mono">
      {/* History Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeId}
        onSelectConversation={setActiveId}
        onNewChat={handleNewChat}
        isLoading={isLoadingList}
      />

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col h-full bg-[#0A0A0A]">
        {/* Header Bar */}
        <div className="h-14 px-6 border-b border-[#2A2A2A] flex items-center justify-between bg-[#171717]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#0A0A0A] border border-[#2A2A2A] text-[#D90429]">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-heading text-xs font-bold text-[#F5F5F5] flex items-center gap-2 uppercase">
                {activeConv?.title || 'NEW SECURITY INVESTIGATION'}
              </h2>
              <p className="text-[10px] text-[#A0A0A0]">
                Quaid-e-Azam Int. Hospital Neural Telemetry RAG Agent
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Badge variant="info" className="text-[9px]">
              <Sparkles className="h-3 w-3 mr-1 text-[#D90429]" /> GPT-4o RAG ENABLED
            </Badge>

            <Button variant="ghost" size="sm" onClick={handleNewChat}>
              <RotateCcw className="h-3.5 w-3.5 mr-1 text-[#D90429]" /> CLEAR SESSION
            </Button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="py-8">
              <div className="text-center max-w-md mx-auto space-y-2 mb-8">
                <Cpu className="h-12 w-12 text-[#D90429] mx-auto opacity-80" />
                <h3 className="font-heading text-lg font-bold text-[#F5F5F5] uppercase">WELCOME TO AEGIS SECURITY COPILOT</h3>
                <p className="text-xs text-[#A0A0A0] font-sans font-light">
                  Ask questions regarding live QIH telemetry anomalies, PACS image vault encryption vectors, or SOAR micro-segmentation playbooks.
                </p>
              </div>
              <SuggestedPrompts onSelectPrompt={handleSendMessage} />
            </div>
          ) : (
            messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
          )}

          {sendMessage.isPending && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#2A2A2A] bg-[#171717]">
          <ChatInputBar onSendMessage={handleSendMessage} isLoading={sendMessage.isPending} />
        </div>
      </div>
    </div>
  );
};
