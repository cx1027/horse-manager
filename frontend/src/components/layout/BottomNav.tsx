'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Activity, User, LogOut, TrendingUp } from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import { cn } from '@/lib/utils';

interface User {
  role?: string;
}

interface BottomNavProps {
  userRole?: 'admin' | 'staff' | 'user' | 'investor';
  variant?: 'default' | 'micrographics';
}

const navConfig = {
  user: [
    { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
    { id: 'search', label: 'Horses', icon: HorseIcon, href: '/horses' },
    { id: 'health', label: 'Health', icon: Activity, href: '/health' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  ],
  investor: [
    { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
    { id: 'search', label: 'My Horses', icon: HorseIcon, href: '/horses' },
    { id: 'reports', label: 'Reports', icon: TrendingUp, href: '/reports' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  ],
  staff: [
    { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
    { id: 'horses', label: 'Horses', icon: HorseIcon, href: '/horses' },
    { id: 'medical', label: 'Medical', icon: Activity, href: '/medical' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  ],
};

const BottomNav: React.FC<BottomNavProps> = ({ userRole: propRole, variant = 'default' }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isMicrographics = variant === 'micrographics';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userRole = user?.role as keyof typeof navConfig || 'user';
  const navItems = navConfig[userRole] || navConfig.user;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const handleLogout = async () => {
    setIsLoggingOut(true);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    await new Promise(resolve => setTimeout(resolve, 300));
    router.push('/login');
  };

  if (isMicrographics) {
    // Micrographics: Ultra-light, minimal bottom nav
    return (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div
          className="flex items-center justify-around h-14"
          style={{
            background: 'transparent',
            backdropFilter: 'none',
            borderTop: '1px solid var(--mg-border-subtle)',
          }}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-all relative"
              >
                <item.icon
                  className="w-4 h-4 transition-all"
                  style={{ 
                    color: active ? 'var(--mg-nav-text-active)' : 'var(--mg-nav-text-muted)',
                    strokeWidth: active ? 2 : 1.5
                  }}
                />
                <span
                  className="text-[10px] transition-all"
                  style={{ 
                    fontFamily: 'var(--mg-font-sans)',
                    fontWeight: active ? 400 : 300,
                    color: active ? 'var(--mg-nav-text-active)' : 'var(--mg-nav-text-muted)',
                  }}
                >
                  {item.label}
                </span>
                {/* Active indicator dot */}
                {active && (
                  <span 
                    className="absolute top-1 w-1 h-1 rounded-full"
                    style={{ background: 'var(--mg-nav-indicator)' }}
                  />
                )}
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-all relative"
          >
            <LogOut
              className="w-4 h-4 transition-all"
              style={{ color: 'var(--mg-text-muted)', strokeWidth: 1.5 }}
            />
            <span
              className="text-[10px] transition-all"
              style={{ 
                fontFamily: 'var(--mg-font-sans)',
                fontWeight: 300,
                color: 'var(--mg-text-muted)',
              }}
            >
              {isLoggingOut ? '...' : 'Logout'}
            </span>
          </button>
        </div>
      </nav>
    );
  }

  // Default dark theme
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bottom-nav">
      <div
        className="flex items-center justify-around h-[80px] px-2"
        style={{
          background: 'rgba(15, 15, 15, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '28px 28px 0 0',
          paddingBottom: 'env(safe-area-inset-bottom)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px] py-2 transition-colors"
            >
              <item.icon
                className="w-6 h-6 transition-colors"
                style={{ color: active ? '#E12E6D' : '#6B6B6B' }}
              />
              <span
                className="text-xs font-medium font-42dot-sans transition-colors"
                style={{ color: active ? '#E12E6D' : '#6B6B6B' }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex flex-col items-center justify-center gap-1 min-w-[60px] py-2 transition-colors"
        >
          <LogOut
            className={cn('w-6 h-6 transition-colors', isLoggingOut && 'animate-pulse')}
            style={{ color: '#EF4444' }}
          />
          <span
            className="text-xs font-medium font-42dot-sans transition-colors"
            style={{ color: '#EF4444' }}
          >
            {isLoggingOut ? '...' : 'Logout'}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
