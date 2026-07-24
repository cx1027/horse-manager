'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Homepage - Layer #22 Static Composition
 * 
 * 背景图覆盖整个视口，Register/Login 按钮基于视口右下角对齐。
 */
export default function HomepagePage() {
  return (
    <div 
      className="relative w-full"
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
      }}
    >
      {/* Static Background - Figma Layer #22 覆盖整个页面 */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/homepage-layer22.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: '100% auto',
        }}
      />

      {/* Bottom Right Overlay Buttons - 基于视口右下角 */}
      <div 
        className="fixed flex items-center gap-3"
        style={{
          bottom: '48px',
          right: '48px',
          zIndex: 20,
        }}
      >
        {/* Register Button */}
        <Link
          href="http://localhost:3001/register"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 text-xs font-semibold rounded-xl transition-all hover:scale-[1.02]"
          style={{
            color: '#FFFFFF',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Register
        </Link>
        
        {/* Login Button */}
        <Link
          href="http://localhost:3001/login"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 text-xs font-semibold rounded-xl transition-all hover:scale-[1.02]"
          style={{
            color: '#FFFFFF',
            background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
            border: '1px solid transparent',
            boxShadow: '0 4px 20px rgba(225, 46, 109, 0.3)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
