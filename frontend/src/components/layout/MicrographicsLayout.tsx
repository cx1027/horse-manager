'use client';

import React from 'react';
import Image from 'next/image';
import { ReactNode } from 'react';

interface MicrographicsLayoutProps {
  children: ReactNode;
  variant?: 'dark' | 'light';
  fullWidth?: boolean;
  showDecorations?: boolean;
}

export default function MicrographicsLayout({ 
  children, 
  variant = 'light',
  fullWidth = false,
  showDecorations = true
}: MicrographicsLayoutProps) {
  const bgColor = variant === 'dark' ? '#000000' : '#FFFFFF';
  const textColor = variant === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: bgColor }}
    >
      {/* Paper Texture Background */}
      {variant === 'light' && (
        <div className="absolute inset-0 left-[-63px] w-[1280px] h-[1920px] opacity-[0.58]">
          <Image
            src="/images/paper-white.webp"
            alt=""
            fill
            className="object-cover pointer-events-none"
            unoptimized
          />
        </div>
      )}

      {/* Lines Grid */}
      <div className="absolute inset-0 w-[1080px] left-0 h-full">
        <Image
          src="/images/lines-grid.svg"
          alt=""
          fill
          className="object-cover pointer-events-none"
          unoptimized
        />
      </div>

      {/* Technical Decorations */}
      {showDecorations && (
        <>
          {/* Top Left Technical Info */}
          <div
            className="absolute font-42dot-sans-light text-[12.55px] tracking-[-0.5px] mix-blend-overlay pointer-events-none"
            style={{ top: '696px', left: '400px', color: textColor }}
          >
            <p className="mb-0 whitespace-pre text-right">
              DIGITAL_DESIGN_ARTIFACTS<br />
              KINETIC_SYSTEMS<br />
              PIXELS_FORM
            </p>
          </div>

          {/* Top Left Labels */}
          <div
            className="absolute font-42dot-sans-light text-[12.55px] tracking-[-0.5px] mix-blend-overlay pointer-events-none"
            style={{ top: '696px', left: '37px', color: textColor }}
          >
            <p className="mb-0 whitespace-pre text-left">
              01<br />
              TYPE<br />
              VECTOR
            </p>
          </div>

          {/* Top Left Roman */}
          <p
            className="absolute font-instrument-serif text-[23.19px] tracking-[-0.93px] not-italic mix-blend-overlay pointer-events-none"
            style={{ top: '716px', left: '108.85px', color: textColor }}
          >
            XIV
          </p>

          {/* Top Left Decorative */}
          <div
            className="absolute w-[60px] h-[60px] pointer-events-none"
            style={{ top: '698.66px', left: '365.22px' }}
          >
            <Image src="/images/group4.svg" alt="" fill className="object-contain" unoptimized />
          </div>

          {/* Right Side Micrographics */}
          <div
            className="absolute w-[30px] h-[30px] pointer-events-none"
            style={{ top: '718.97px', left: '756.26px' }}
          >
            <Image src="/images/group29.svg" alt="" fill className="object-contain" unoptimized />
          </div>

          {/* Bottom Left Technical Info */}
          <div
            className="absolute font-42dot-sans-light text-[10.04px] tracking-[2.51px] mix-blend-overlay pointer-events-none"
            style={{ bottom: '100px', left: '820px', color: textColor }}
          >
            <p className="mb-0 whitespace-pre text-right">
              ©2026
            </p>
          </div>

          <div
            className="absolute font-42dot-sans-light text-[15.98px] tracking-[1.44px] mix-blend-overlay pointer-events-none"
            style={{ top: '1303px', left: '831.51px', color: textColor }}
          >
            <p className="mb-0 whitespace-pre">
              OPTICAL / 20
            </p>
            <p className="mb-0 whitespace-pre">
              26 / ARCHITECT
            </p>
          </div>

          <div
            className="absolute font-42dot-sans-light text-[10.04px] tracking-[2.51px] mix-blend-overlay pointer-events-none"
            style={{ bottom: '60px', left: '828px', color: textColor }}
          >
            <p className="mb-0 whitespace-pre">
              ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Bottom Decorative */}
          <div
            className="absolute w-[80px] h-[80px] pointer-events-none"
            style={{ top: '1350px', left: '900px' }}
          >
            <Image src="/images/group31.svg" alt="" fill className="object-contain" unoptimized />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className={`relative z-10 ${fullWidth ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        {children}
      </div>
    </div>
  );
}
