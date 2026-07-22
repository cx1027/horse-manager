'use client';

import React from 'react';
import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, name, size = 'md', className }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-xs', image: 32 },
    md: { container: 'w-10 h-10', text: 'text-sm', image: 40 },
    lg: { container: 'w-16 h-16', text: 'text-lg', image: 64 },
    xl: { container: 'w-24 h-24', text: 'text-2xl', image: 96 },
  };

  const { container, text, image } = sizes[size];

  return (
    <div
      className={cn(
        'rounded-full overflow-hidden bg-background-secondary',
        'flex items-center justify-center font-medium text-text-secondary',
        container,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          width={image}
          height={image}
          className="w-full h-full object-cover"
        />
      ) : name ? (
        <span className={text}>{getInitials(name)}</span>
      ) : (
        <svg
          className="w-1/2 h-1/2 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )}
    </div>
  );
};

export default Avatar;
