import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertOctagon, Info, X, ShieldAlert } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ToastContextType {
  toast: (options: { title: string; description?: string; type?: ToastMessage['type'] }) => void;
  showSuccess: (title: string, description?: string) => void;
  showError: (title: string, description?: string) => void;
  showInfo: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, type = 'info' }: { title: string; description?: string; type?: ToastMessage['type'] }) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast]
  );

  const showSuccess = useCallback((title: string, description?: string) => toast({ title, description, type: 'success' }), [toast]);
  const showError = useCallback((title: string, description?: string) => toast({ title, description, type: 'error' }), [toast]);
  const showInfo = useCallback((title: string, description?: string) => toast({ title, description, type: 'info' }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, showSuccess, showError, showInfo }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col space-y-2 max-w-md w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`pointer-events-auto p-4 bg-[#1B1B1B] border shadow-2xl flex items-start space-x-3 text-xs ${
                t.type === 'success'
                  ? 'border-[#00C853] text-[#F5F5F5] shadow-[0_0_20px_rgba(0,200,83,0.15)]'
                  : t.type === 'error'
                  ? 'border-[#FF1744] text-[#F5F5F5] shadow-[0_0_20px_rgba(255,23,68,0.2)]'
                  : t.type === 'warning'
                  ? 'border-[#FFB300] text-[#F5F5F5] shadow-[0_0_20px_rgba(255,179,0,0.15)]'
                  : 'border-[#D90429] text-[#F5F5F5] shadow-[0_0_20px_rgba(217,4,41,0.2)]'
              }`}
            >
              {t.type === 'success' && <CheckCircle2 className="h-5 w-5 text-[#00C853] shrink-0 mt-0.5" />}
              {t.type === 'error' && <AlertOctagon className="h-5 w-5 text-[#FF1744] shrink-0 mt-0.5" />}
              {t.type === 'info' && <Info className="h-5 w-5 text-[#D90429] shrink-0 mt-0.5" />}
              {t.type === 'warning' && <ShieldAlert className="h-5 w-5 text-[#FFB300] shrink-0 mt-0.5" />}

              <div className="flex-1 space-y-1">
                <p className="font-heading font-bold text-xs uppercase tracking-wide text-[#F5F5F5]">{t.title}</p>
                {t.description && <p className="text-[11px] text-[#A0A0A0] font-sans font-light leading-relaxed">{t.description}</p>}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="text-[#707070] hover:text-[#D90429] p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
