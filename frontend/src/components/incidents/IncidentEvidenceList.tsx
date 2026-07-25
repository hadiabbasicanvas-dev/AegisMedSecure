import React, { useState } from 'react';
import { IncidentEvidenceItem, useAddIncidentEvidence } from '@/services/incidentService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCode, FileText, Image, Network, Download, Plus, HardDrive } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface IncidentEvidenceListProps {
  incidentId: string;
  evidenceItems: IncidentEvidenceItem[];
}

export const IncidentEvidenceList: React.FC<IncidentEvidenceListProps> = ({ incidentId, evidenceItems }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('NETWORK_CAPTURE');
  const [description, setDescription] = useState('');

  const addEvidence = useAddIncidentEvidence();

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;
    addEvidence.mutate(
      {
        id: incidentId,
        fileName: fileName.trim(),
        fileType,
        fileSize: '3.6 MB',
        description: description.trim() || 'Simulated forensic evidence artifact',
      },
      {
        onSuccess: () => {
          setFileName('');
          setDescription('');
          setShowAddForm(false);
        },
      }
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'NETWORK_CAPTURE':
        return <Network className="h-4 w-4 text-cyan-400" />;
      case 'LOG_FILE':
        return <FileCode className="h-4 w-4 text-amber-400" />;
      case 'SCREENSHOT':
      case 'IMAGE':
        return <Image className="h-4 w-4 text-emerald-400" />;
      default:
        return <FileText className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <HardDrive className="h-4 w-4 text-cyan-400" />
            <CardTitle>Forensic Evidence Vault</CardTitle>
          </div>
          <CardDescription>PCAP captures, host logs & audit screenshots</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs"
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Log Evidence
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        {showAddForm && (
          <form onSubmit={handleAddEvidence} className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="File Name (e.g. pacs_dump.pcap)"
                className="bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200"
              />
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200"
              >
                <option value="NETWORK_CAPTURE">NETWORK CAPTURE (.pcap)</option>
                <option value="LOG_FILE">LOG FILE (.log)</option>
                <option value="SCREENSHOT">SCREENSHOT (.png)</option>
                <option value="PDF_DOCUMENT">PDF DOCUMENT (.pdf)</option>
              </select>
            </div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Forensic Description"
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)} className="text-xs h-7">
                Cancel
              </Button>
              <Button variant="cyan-accent" size="sm" type="submit" disabled={!fileName.trim()} className="text-xs h-7">
                Save Evidence
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {evidenceItems.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 text-center py-4">No evidence files logged yet.</p>
          ) : (
            evidenceItems.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-mono font-bold text-slate-200">
                    {getFileIcon(item.fileType)}
                    <span className="truncate max-w-[180px]">{item.fileName}</span>
                  </div>
                  <Badge variant="info" className="text-[9px] font-mono">
                    {item.fileSize}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400">{item.description}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                  <span>Uploaded by: <strong className="text-slate-300">{item.uploadedBy}</strong></span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
