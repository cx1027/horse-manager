'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  user?: {
    name?: string;
    username?: string;
    email?: string;
    role?: string;
    avatar?: string | null;
  } | null;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
  variant?: 'default' | 'micrographics';
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'horses', label: 'Horses', href: '/horses' },
  { id: 'health', label: 'Health', href: '/health' },
];

const Header: React.FC<HeaderProps> = ({ user: propUser, onMenuClick, isMenuOpen, variant = 'default' }) => {
  const pathname = usePathname();
  const [user, setUser] = useState(propUser || null);
  
  const isMicrographics = variant === 'micrographics';
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const displayName = user?.name || user?.username || user?.email?.split('@')[0] || 'User';

  if (isMicrographics) {
    // Micrographics: Ultra-light, minimal, paper-like
    return (
      <header
        className="lg:hidden sticky top-0 z-40 transition-all duration-300"
        style={{
          background: 'transparent',
          borderBottom: 'none',
        }}
      >
        <div className="flex items-center justify-between h-14 px-4">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg transition-colors"
            style={{ color: 'var(--mg-text-secondary)' }}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo - Centered, subtle */}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2"
          >
            <span 
              className="text-sm font-light tracking-tight"
              style={{ 
                fontFamily: 'var(--mg-font-sans)',
                color: 'var(--mg-text-primary)'
              }}
            >
              HorseInfo
            </span>
          </Link>

          {/* Right Actions - Minimal */}
          <div className="flex items-center gap-1">
            <button 
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--mg-text-muted)' }}
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              className="relative p-2 rounded-lg transition-colors"
              style={{ color: 'var(--mg-text-muted)' }}
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Default dark theme
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{ 
        background: 'rgba(15, 15, 15, 0.85)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-[#2A2A2A]"
              style={{ color: '#A0A0A0' }}
              onClick={onMenuClick}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/dashboard" className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                  boxShadow: '0 4px 20px rgba(225, 46, 109, 0.4)'
                }}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.5 2 6 5 6 8c0 2 1 3 2 4l-1 8h10l-1-8c1-1 2-2 2-4 0-3-2.5-6-6-6zm0 2c2.5 0 4 2 4 4s-1.5 3-4 3-4-1-4-3 1.5-4 4-4z"/>
                </svg>
              </div>
              <span className="text-xl font-bold font-42dot-sans text-white">
                HorseInfo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-white'
                      : 'hover:text-white'
                  )}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                    boxShadow: '0 2px 8px rgba(225, 46, 109, 0.3)'
                  } : {
                    color: '#A0A0A0'
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button 
              className="relative p-2 rounded-lg transition-colors hover:bg-[#2A2A2A]"
              style={{ color: '#A0A0A0' }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E12E6D]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
