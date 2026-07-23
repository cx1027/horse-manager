'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Activity, Camera, FileText, ChevronRight } from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#121212' }}>
      {/* Decorative circles */}
      <div 
        className="fixed top-0 right-0 w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #E12E6D 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }}
      />
      <div 
        className="fixed bottom-40 left-0 w-[200px] h-[200px] rounded-full opacity-10 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)',
          transform: 'translate(-50%, 50%)'
        }}
      />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                boxShadow: '0 8px 32px rgba(225, 46, 109, 0.4)'
              }}
            >
              <HorseIcon className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            专业的马匹信息
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #E12E6D, #F472B6)' }}
            >
              管理分享平台
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12" style={{ color: '#A0A0A0' }}>
            无论是马匹爱好者、投资者还是专业管理者，HorseInfo 都能为您提供完整的
            马匹信息管理解决方案
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/login">
              <button 
                className="px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 transition-transform hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                  boxShadow: '0 8px 32px rgba(225, 46, 109, 0.4)'
                }}
              >
                登录
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/auth/register">
              <button 
                className="px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ 
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white'
                }}
              >
                注册账号
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">核心功能</h2>
              <p style={{ color: '#6B6B6B' }}>探索 HorseInfo 的强大功能</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-medium" style={{ color: '#E12E6D' }}>
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center cursor-pointer" style={{ background: '#1E1E1E' }}>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(225, 46, 109, 0.15)' }}
              >
                <FileText className="w-7 h-7" style={{ color: '#E12E6D' }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                马匹档案
              </h3>
              <p className="text-sm" style={{ color: '#6B6B6B' }}>
                完整的马匹基本信息和详细档案管理
              </p>
            </Card>

            <Card className="text-center cursor-pointer" style={{ background: '#1E1E1E' }}>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(16, 185, 129, 0.15)' }}
              >
                <Activity className="w-7 h-7" style={{ color: '#10B981' }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                健康追踪
              </h3>
              <p className="text-sm" style={{ color: '#6B6B6B' }}>
                体重、健康数据可视化图表
              </p>
            </Card>

            <Card className="text-center cursor-pointer" style={{ background: '#1E1E1E' }}>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(245, 158, 11, 0.15)' }}
              >
                <Camera className="w-7 h-7" style={{ color: '#F59E0B' }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                照片管理
              </h3>
              <p className="text-sm" style={{ color: '#6B6B6B' }}>
                云端存储，随时随地查看马匹照片
              </p>
            </Card>

            <Card className="text-center cursor-pointer" style={{ background: '#1E1E1E' }}>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(239, 68, 68, 0.15)' }}
              >
                <Shield className="w-7 h-7" style={{ color: '#EF4444' }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                保险管理
              </h3>
              <p className="text-sm" style={{ color: '#6B6B6B' }}>
                保险信息记录和续保提醒
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: '#6B6B6B' }} className="text-sm">
            HorseInfo - 让马匹信息管理更简单
          </p>
          <p className="text-xs mt-2" style={{ color: '#4B5563' }}>
            2024 HorseInfo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
