import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { ChatWindow } from '@/components/ai/ChatWindow';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const threatId = searchParams.get('threatId') || undefined;

  return (
    <PageContainer
      title="AI SECURITY ASSISTANT & SOAR COPILOT"
      description="OpenAI GPT-4o neural threat analysis & automated playbook generator for Quaid-e-Azam Int. Hospital"
      actions={
        <div className="flex items-center space-x-2 font-mono">
          {threatId && (
            <Badge variant="warning" className="text-[9px]">
              Active Context: Threat {threatId}
            </Badge>
          )}
          <Badge variant="info" className="text-[9px]">
            <Sparkles className="mr-1 h-3 w-3 text-[#D90429]" /> SIMULATED DEMO RAG
          </Badge>
        </div>
      }
    >
      <ChatWindow initialThreatId={threatId} />
    </PageContainer>
  );
};
