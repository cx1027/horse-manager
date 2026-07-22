'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'secondary';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className, ...props }) => {
  const variants: Record<BadgeVariant, string> = {
    primary: 'bg-accent/20 text-accent',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
    secondary: 'bg-text-muted/20 text-text-secondary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
