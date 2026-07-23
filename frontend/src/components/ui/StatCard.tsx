'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Spinner from './Spinner';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  progress?: number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  isLoading,
  progress,
  className,
}) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          'min-h-[140px] rounded-xl bg-background-card border border-border',
          'flex items-center justify-center shadow-dropdown',
          className
        )}
      >
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'min-h-[140px] rounded-xl border border-border p-5',
        'bg-gradient-to-br from-background-card to-background-elevated',
        'shadow-dropdown',
        'transition-all duration-300 ease-out hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-text-muted mb-1">{title}</p>
          <p className="text-3xl font-bold text-text-primary">{value}</p>
        </div>
        {icon && (
          <div
            className="p-3 rounded-xl"
            style={{ background: 'rgba(225, 46, 109, 0.15)' }}
          >
            <div style={{ color: '#E12E6D' }}>{icon}</div>
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mb-2">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #E12E6D, #F472B6)',
              }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
        {trend && (
          <span
            className={cn(
              'text-sm font-medium',
              trend.isPositive ? 'text-success' : 'text-error'
            )}
          >
            {trend.isPositive ? '+' : ''}
            {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
