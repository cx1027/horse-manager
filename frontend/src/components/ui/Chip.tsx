'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  variant = 'default',
  className,
}) => {
  const variants = {
    default: 'bg-background-secondary text-text-secondary',
    primary: 'bg-accent/20 text-accent',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm',
        variants[variant],
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-white/10 rounded-full p-0.5"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default Chip;
