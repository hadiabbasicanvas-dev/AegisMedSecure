import React, { useState } from 'react';
import { IncidentNoteItem, useAddIncidentNote } from '@/services/incidentService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface IncidentNotesPanelProps {
  incidentId: string;
  notes: IncidentNoteItem[];
}

export const IncidentNotesPanel: React.FC<IncidentNotesPanelProps> = ({ incidentId, notes }) => {
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const addNote = useAddIncidentNote();

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    addNote.mutate(
      { id: incidentId, content: content.trim(), isPinned },
      {
        onSuccess: () => {
          setContent('');
          setIsPinned(false);
        },
      }
    );
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-cyan-400" />
            <CardTitle>Investigation Notes & Analyst Collaboration</CardTitle>
          </div>
          <span className="text-[10px] font-mono text-slate-500">{notes.length} Notes</span>
        </div>
        <CardDescription>Collaborative investigation findings & shift handover log</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        {/* Note Form */}
        <form onSubmit={handleAddNote} className="space-y-2 bg-navy-950 p-3 rounded-xl border border-slate-800">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type investigation findings, packet dump observations, or team notes... (@mention supported)"
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-1.5 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="flex items-center gap-1 font-mono text-[11px]"><Pin className="h-3 w-3 text-cyan-400" /> Pin Note to Top</span>
            </label>
            <Button
              type="submit"
              variant="cyan-accent"
              size="sm"
              disabled={!content.trim() || addNote.isPending}
              className="text-xs h-8"
            >
              <span>Add Note</span>
              <Send className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </form>

        {/* Notes List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {notes.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 text-center py-4">No investigation notes recorded yet.</p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                  note.isPinned
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-800/60 pb-1">
                  <span className="font-bold text-cyan-400 flex items-center gap-1">
                    {note.isPinned && <Pin className="h-3 w-3 text-amber-400 fill-amber-400" />}
                    {note.authorName}
                  </span>
                  <span className="text-slate-500">{formatDate(note.createdAt)}</span>
                </div>
                <p className="leading-relaxed font-mono text-[11px]">{note.content}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
