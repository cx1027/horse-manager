'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
}) => {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-card',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-background-secondary',
        variants[variant],
        className
      )}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
