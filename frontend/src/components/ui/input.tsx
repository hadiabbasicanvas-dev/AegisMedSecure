import * as React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full bg-[#0A0A0A] border border-[#2A2A2A] px-3 py-2 text-xs font-mono text-[#F5F5F5] placeholder:text-[#707070] focus:border-[#D90429] focus:outline-none focus:ring-1 focus:ring-[#D90429]/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
