'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  gradient?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = true, padding = 'md', gradient = false, ...props }, ref) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[20px] border border-border',
          gradient 
            ? 'bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A]' 
            : 'bg-[#1E1E1E]',
          hover && 'transition-all duration-300 ease-out hover:border-[rgba(255,255,255,0.2)] hover:-translate-y-0.5',
          'shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
