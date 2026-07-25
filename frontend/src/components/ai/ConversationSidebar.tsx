import React, { useState } from 'react';
import { ConversationItem, useDeleteConversation, useRenameConversation } from '@/services/aiService';
import { MessageSquare, Plus, Trash2, Edit2, Check, Search, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ConversationSidebarProps {
  conversations: ConversationItem[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  isLoading: boolean;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  isLoading,
}) => {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const deleteConv = useDeleteConversation();
  const renameConv = useRenameConversation();

  const filtered = conversations.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  const handleSaveRename = (id: string) => {
    if (editTitle.trim()) {
      renameConv.mutate({ id, title: editTitle.trim() });
    }
    setEditingId(null);
  };

  return (
    <div className="w-72 bg-slate-900/90 border-r border-slate-800 flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 space-y-3">
        <Button
          variant="cyan-accent"
          size="sm"
          onClick={onNewChat}
          className="w-full justify-start text-xs font-semibold"
        >
          <Plus className="mr-2 h-4 w-4" /> Start New Investigation
        </Button>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history..."
            className="pl-8 text-xs h-8 bg-slate-950 border-slate-800"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-2 block mb-1">
          Recent Investigations
        </span>

        {isLoading ? (
          <div className="py-8 text-center text-xs text-slate-500 font-mono">Loading history...</div>
        ) : filtered.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 font-mono">No history found</div>
        ) : (
          filtered.map((c) => {
            const isActive = c.id === activeConversationId;
            return (
              <div
                key={c.id}
                onClick={() => onSelectConversation(c.id)}
                className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2 truncate pr-2">
                  <MessageSquare className="h-3.5 w-3.5 shrink-0 text-slate-500 group-hover:text-cyan-400" />
                  {editingId === c.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(c.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-slate-950 border border-slate-700 text-xs px-1 py-0.5 rounded w-full text-slate-100"
                      autoFocus
                    />
                  ) : (
                    <span className="truncate font-medium">{c.title}</span>
                  )}
                </div>

                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {editingId === c.id ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveRename(c.id);
                      }}
                      className="p-1 text-emerald-400 hover:text-emerald-300"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(c.id);
                        setEditTitle(c.title);
                      }}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConv.mutate(c.id);
                    }}
                    className="p-1 text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
