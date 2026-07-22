'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Activity, User, Plus } from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  userRole?: 'admin' | 'staff' | 'user' | 'investor';
}

const BottomNav: React.FC<BottomNavProps> = ({ userRole = 'user' }) => {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: '首页', icon: Home, href: '/' },
    { id: 'search', label: '搜索', icon: Search, href: '/horses' },
    { id: 'add', label: '', icon: Plus, href: '/horses/new', isCenter: true },
    { id: 'activity', label: '活动', icon: Activity, href: '/health' },
    { id: 'profile', label: '我的', icon: User, href: '/profile' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      <div 
        className="flex items-center justify-around h-[80px] px-4"
        style={{
          background: 'rgba(30, 30, 30, 0.95)',
          borderRadius: '28px 28px 0 0',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-center -mt-6"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                    boxShadow: '0 4px 20px rgba(225, 46, 109, 0.4)',
                  }}
                >
                  <Plus className="w-8 h-8 text-white" />
                </div>
              </Link>
            );
          }

          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 min-w-[64px] py-2"
            >
              <item.icon 
                className="w-6 h-6 transition-colors" 
                style={{ color: active ? '#E12E6D' : '#6B6B6B' }}
              />
              <span 
                className="text-xs font-medium transition-colors"
                style={{ color: active ? '#E12E6D' : '#6B6B6B' }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
