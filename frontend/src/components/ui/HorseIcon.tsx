'use client';

import React from 'react';

interface HorseIconProps extends React.SVGProps<SVGSVGElement> {}

const HorseIcon: React.FC<HorseIconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 3c-1 0-2.5 1.5-3 3l-2 6-4-1-4 1-2-6C2 4 1 3 2 3c.5 0 1 .5 1.5 1L5 6l-2 8h4l1-3 2 1 1-2 4 1 2-1 1 3h4l-2-8 1.5-2c.5-.5 1-1 1.5-1 1 0 2 1 1 2l-2 6-4-1-4 1-2-6C17 4 16.5 3 18 3z"/>
    <path d="M4 14l1-4"/>
    <path d="M20 14l-1-4"/>
    <circle cx="8" cy="10" r="0.5" fill="currentColor"/>
    <circle cx="16" cy="10" r="0.5" fill="currentColor"/>
  </svg>
);

export default HorseIcon;
