import React from 'react';
import { cn } from '@/utils/cn';

interface PageContainerProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  actions,
  children,
  className,
}) => {
  return (
    <div className={cn('p-6 space-y-6 max-w-7xl mx-auto', className)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2A2A2A]">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-bold tracking-wider text-[#F5F5F5] uppercase">{title}</h1>
          {description && <p className="text-xs text-[#A0A0A0] font-mono">{description}</p>}
        </div>
        {actions && <div className="flex items-center space-x-3">{actions}</div>}
      </div>
      {children}
    </div>
  );
};
