import React, { useState } from 'react';
import { useUpdateAdminSettings } from '@/services/adminService';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Key, Save } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const AIConfigPage: React.FC = () => {
  const { user } = useAuthStore();
  const updateSettings = useUpdateAdminSettings();

  const [modelName, setModelName] = useState('gpt-4o');
  const [temperature, setTemperature] = useState('0.3');
  const [maxTokens, setMaxTokens] = useState('1000');
  const [apiKeyMasked, setApiKeyMasked] = useState('sk-proj-qih-********************-8823');

  const isSuperAdmin = user?.role === 'SUPER_ADMINISTRATOR';

  const handleSave = () => {
    if (!isSuperAdmin) {
      alert('Only Super Administrators can update AI Neural configuration.');
      return;
    }

    updateSettings.mutate(
      {
        ai_model_name: modelName,
        ai_temperature: temperature,
        ai_max_tokens: maxTokens,
      },
      {
        onSuccess: () => {
          alert('AI Copilot neural model settings updated successfully.');
        },
      }
    );
  };

  return (
    <PageContainer
      title="GPT-4o NEURAL MODEL & RAG CONFIGURATION"
      description="Select LLM model parameters, temperature sampling, and token generation caps"
      actions={
        <Button
          variant="cyan-accent"
          size="sm"
          disabled={!isSuperAdmin || updateSettings.isPending}
          onClick={handleSave}
        >
          <Save className="mr-1.5 h-4 w-4 text-[#D90429]" /> SAVE AI PARAMETERS
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-[#D90429]" />
              <CardTitle>LLM ENGINE & MODEL SELECTION</CardTitle>
            </div>
            <CardDescription>Configure primary AI Copilot inference backend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">TARGET MODEL FAMILY</label>
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full h-10 bg-[#0A0A0A] border border-[#2A2A2A] px-3 text-xs text-[#F5F5F5] focus:border-[#D90429] focus:outline-none"
              >
                <option value="gpt-4o">OpenAI GPT-4o Enterprise (Recommended)</option>
                <option value="gpt-4-turbo">OpenAI GPT-4 Turbo</option>
                <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet (Fallback)</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] text-[#F5F5F5]">
                <span>SAMPLING TEMPERATURE INDEX</span>
                <span className="text-[#D90429] font-bold">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full h-1.5 bg-[#0A0A0A] appearance-none cursor-pointer accent-[#D90429]"
              />
              <p className="text-[10px] text-[#707070] font-sans font-light">Lower temperature (0.1–0.3) produces consistent SOC mitigation outputs.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">MAX TOKEN OUTPUT LIMIT</label>
              <Input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4 text-[#D90429]" />
              <CardTitle>API KEY & RAG KNOWLEDGE VAULT</CardTitle>
            </div>
            <CardDescription>Masked secret key storage & QIH vector store configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider">OPENAI API KEY (ENCRYPTED SECRET)</label>
              <Input
                type="password"
                value={apiKeyMasked}
                onChange={(e) => setApiKeyMasked(e.target.value)}
              />
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#2A2A2A] space-y-1.5 text-[#A0A0A0]">
              <div className="flex items-center justify-between text-xs font-bold text-[#F5F5F5]">
                <span>QIH VECTOR KNOWLEDGE BASE</span>
                <Badge variant="success" className="text-[8px]">100% INDEXED</Badge>
              </div>
              <p className="text-[11px] font-sans font-light">400 beds, PACS/RIS subnets, EMR database schemas & HIPAA compliance rules embedded into local RAG context.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};
