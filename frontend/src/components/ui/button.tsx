import * as React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'cyan-accent' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-mono font-bold tracking-wider uppercase transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variants = {
      default:
        'bg-[#171717] hover:bg-[#1B1B1B] text-[#F5F5F5] border border-[#2A2A2A] hover:border-[#D90429] hover:text-[#D90429]',
      outline:
        'bg-transparent border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#D90429] hover:bg-[#171717] hover:text-[#D90429]',
      ghost:
        'bg-transparent text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#171717]',
      destructive:
        'bg-[#FF1744]/15 border border-[#FF1744] text-[#FF1744] hover:bg-[#FF1744] hover:text-[#0A0A0A] shadow-[0_0_15px_rgba(255,23,68,0.2)]',
      'cyan-accent':
        'bg-[#0A0A0A] text-[#F5F5F5] border border-[#D90429] shadow-[0_0_15px_rgba(217,4,41,0.25)] hover:shadow-[0_0_25px_rgba(217,4,41,0.5)] hover:scale-[1.02]',
      success:
        'bg-[#00C853]/15 border border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-[#0A0A0A] shadow-[0_0_15px_rgba(0,200,83,0.2)]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-xs',
      lg: 'px-6 py-3 text-sm',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#D90429] border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
