import React from 'react';
import { cn } from '@/utils/cn';

interface UserAvatarProps {
  firstName?: string;
  lastName?: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  firstName = 'O',
  lastName = 'P',
  size = 'md',
  isOnline = true,
  className,
}) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const sizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold tracking-wider',
          sizes[size],
          className
        )}
      >
        {initials}
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
      )}
    </div>
  );
};
