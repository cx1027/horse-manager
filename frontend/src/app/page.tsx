'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-[1080px] left-1/2 -translate-x-1/2 bottom-[-41px]">
        <Image
          src="/images/background.webp"
          alt=""
          fill
          className="object-cover pointer-events-none"
          priority
          unoptimized
        />
      </div>

      {/* Logo Layer - mix-blend-overlay */}
      <div className="absolute w-[405px] h-[319px] left-[337px] top-[686px] overflow-clip mix-blend-overlay">
        <div className="absolute" style={{ inset: '40.83% 22.18% 22.21% 60.8%' }}>
          <Image src="/images/vector1.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute" style={{ inset: '22.21% 60.68% 40.83% 22.18%' }}>
          <Image src="/images/vector2.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute" style={{ inset: '40.83% 35.21% 22.21% 47.77%' }}>
          <Image src="/images/vector3.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute" style={{ inset: '22.21% 48% 40.83% 35.21%' }}>
          <Image src="/images/vector4.svg" alt="" fill className="object-contain" unoptimized />
        </div>
      </div>

      {/* Logo Layer - mix-blend-multiply */}
      <div className="absolute w-[405px] h-[319px] left-[337px] top-[686px] overflow-clip mix-blend-multiply">
        <div className="absolute" style={{ inset: '40.83% 22.18% 22.21% 60.8%' }}>
          <Image src="/images/vector1.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute" style={{ inset: '22.21% 60.68% 40.83% 22.18%' }}>
          <Image src="/images/vector2.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute" style={{ inset: '40.83% 35.21% 22.21% 47.77%' }}>
          <Image src="/images/vector3.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute" style={{ inset: '22.21% 48% 40.83% 35.21%' }}>
          <Image src="/images/vector4.svg" alt="" fill className="object-contain" unoptimized />
        </div>
      </div>

      {/* Center Content - Micrographics */}
      <div className="absolute left-[232px] top-[1005px] mix-blend-overlay">
        {/* Top Labels */}
        <p className="absolute font-42dot-sans text-[24px] tracking-[1.2px] text-white whitespace-nowrap left-[calc(50%-191px)] top-[0px]">
          ASSET_ID 2026_MG_990X
        </p>
        <p className="absolute font-42dot-sans-light text-[24px] tracking-[1.2px] text-white whitespace-nowrap left-[calc(50%-192px)] top-[37px]">
          /PROCESS/V01
        </p>
        <p className="absolute font-42dot-sans-light text-[24px] tracking-[6.24px] text-white whitespace-nowrap left-[calc(50%-192px)] top-[74px]">
          ©2026
        </p>
        <p className="absolute font-42dot-sans text-[24px] tracking-[1.2px] text-white whitespace-nowrap left-[calc(50%-18px)] top-[128px]">
          DIGITAL DESIGN LABS
        </p>

        {/* Main Quote */}
        <p className="absolute font-42dot-sans text-[24px] text-white w-[438px] left-[calc(50%-192px)] top-[213px]">
          INTENTION OVER TIME LEADS<br />TO MASTERY OF CRAFT
        </p>

        {/* Decorative Vectors */}
        <div className="absolute aspect-[78.74/63.6] w-[78.74px] left-[21.48%] -translate-y-1/2 top-[calc(50%+202.5px)]">
          <Image src="/images/vector5.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute aspect-[45.78/70.75] w-[45.78px] left-[32.22%] -translate-y-1/2 top-[calc(50%+203px)]">
          <Image src="/images/vector6.svg" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute w-[122px] h-[122px] left-[40.28%] -translate-y-1/2 top-[calc(50%+201.5px)] flex items-center justify-center">
          <div className="w-[122px] h-[122px] -scale-x-100">
            <Image src="/images/vector7.svg" alt="" fill className="object-contain" unoptimized />
          </div>
        </div>

        {/* Coordinates */}
        <p className="absolute font-instrument-serif text-[24px] text-center tracking-[2.4px] text-white not-italic -translate-x-1/2 left-[calc(50%+196px)] top-[157px]">
          122.6841° W
        </p>
        <p className="absolute font-instrument-serif text-[24px] text-center tracking-[2.4px] text-white not-italic -translate-x-1/2 left-[calc(50%+37.5px)] top-[157px]">
          45.5248° N
        </p>

        {/* Roman Numerals */}
        <p className="absolute font-instrument-serif text-[30.27px] text-white tracking-[-1.211px] not-italic left-[348px] top-[287px]">
          XIV
        </p>
      </div>

      {/* Technical Info Panel - Top Left */}
      <div className="absolute font-42dot-sans-light text-[21.67px] tracking-[-0.8667px] text-[#fffaee] mix-blend-overlay"
        style={{ top: '8.65%', left: '32.59%' }}>
        <p className="mb-0 whitespace-pre">EDITABLE MICROGRAPHICS</p>
        <p className="mb-0 whitespace-pre">TEMPLATES ALL BUILT N FIGMA</p>
        <p className="mb-0 whitespace-pre">USING GOOGLE FONTS</p>
        <p className="mb-0 whitespace-pre">LUMINANCE: 0.88 Y</p>
        <p className="mb-0 whitespace-pre">CONTRAST_RATIO: 21:1 [PASS_AAA]</p>
        <p className="mb-0 whitespace-pre">&nbsp;</p>
        <p className="mb-0 whitespace-pre">PRIMARY_FACE: ANTIQUE_OLIVE_NORD [OTF]</p>
        <p className="mb-0 whitespace-pre">POINT_SIZE: 12.0pt / 120.0pt</p>
        <p className="mb-0 whitespace-pre">LEADING: 14.5pt [120%]</p>
        <p className="mb-0 whitespace-pre">TRACKING: -20 / 1000 em</p>
        <p className="mb-0 whitespace-pre">CAP_HEIGHT: 8.4mm</p>
        <p className="mb-0 whitespace-pre">X_HEIGHT: 5.2mm</p>
        <p className="mb-0 whitespace-pre">GLYPH_COUNT: 428 [EXTENDED_LATIN]</p>
        <p className="mb-0 whitespace-pre">&nbsp;</p>
        <p className="mb-0 whitespace-pre">FILE_FORMAT: .PDF/X-4:2010</p>
        <p className="mb-0 whitespace-pre">RESOLUTION: 2400 DPI [IMAGE_PULL: 300 PPI]</p>
        <p className="mb-0 whitespace-pre">COLOR_SPACE: CMYK [FOGRA39]</p>
        <p className="mb-0 whitespace-pre">BLEED_LIMIT: 3.175mm [0.125in]</p>
        <p className="mb-0 whitespace-pre">BIT_DEPTH: 16-BIT_CHANNEL</p>
        <p className="whitespace-pre">RENDER_INTENT: RELATIVE_COLORIMETRIC</p>
      </div>

      {/* Technical Info Panel - Bottom Left */}
      <div className="absolute font-42dot-sans-light text-[21.67px] tracking-[-0.8667px] text-[#fffaee] mix-blend-overlay"
        style={{ bottom: '2.19%', left: '32.59%' }}>
        <p className="mb-0 whitespace-pre">EDITABLE MICROGRAPHICS</p>
        <p className="mb-0 whitespace-pre">TEMPLATES ALL BUILT N FIGMA</p>
        <p className="mb-0 whitespace-pre">USING GOOGLE FONTS</p>
        <p className="mb-0 whitespace-pre">LUMINANCE: 0.88 Y</p>
        <p className="mb-0 whitespace-pre">CONTRAST_RATIO: 21:1 [PASS_AAA]</p>
        <p className="mb-0 whitespace-pre">&nbsp;</p>
        <p className="mb-0 whitespace-pre">PRIMARY_FACE: ANTIQUE_OLIVE_NORD [OTF]</p>
        <p className="mb-0 whitespace-pre">POINT_SIZE: 12.0pt / 120.0pt</p>
        <p className="mb-0 whitespace-pre">LEADING: 14.5pt [120%]</p>
        <p className="mb-0 whitespace-pre">TRACKING: -20 / 1000 em</p>
        <p className="mb-0 whitespace-pre">CAP_HEIGHT: 8.4mm</p>
        <p className="mb-0 whitespace-pre">X_HEIGHT: 5.2mm</p>
        <p className="mb-0 whitespace-pre">GLYPH_COUNT: 428 [EXTENDED_LATIN]</p>
        <p className="mb-0 whitespace-pre">&nbsp;</p>
        <p className="mb-0 whitespace-pre">FILE_FORMAT: .PDF/X-4:2010</p>
        <p className="mb-0 whitespace-pre">RESOLUTION: 2400 DPI [IMAGE_PULL: 300 PPI]</p>
        <p className="mb-0 whitespace-pre">COLOR_SPACE: CMYK [FOGRA39]</p>
        <p className="mb-0 whitespace-pre">BLEED_LIMIT: 3.175mm [0.125in]</p>
        <p className="mb-0 whitespace-pre">BIT_DEPTH: 16-BIT_CHANNEL</p>
        <p className="whitespace-pre">RENDER_INTENT: RELATIVE_COLORIMETRIC</p>
      </div>

      {/* CTA Buttons - Bottom Right */}
      <div className="absolute bottom-12 right-12 flex items-center gap-6">
        <Link
          href="/auth/register"
          className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#FFFFFF',
          }}
        >
          Create Account
        </Link>
        <Link
          href="/auth/login"
          className="px-8 py-4 rounded-full font-semibold text-white flex items-center gap-2 transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
            boxShadow: '0 8px 32px rgba(225, 46, 109, 0.4)',
          }}
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
