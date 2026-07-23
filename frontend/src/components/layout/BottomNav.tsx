'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Activity, User, Plus, LogOut, TrendingUp } from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import { cn } from '@/lib/utils';

interface User {
  role?: string;
}

interface BottomNavProps {
  userRole?: 'admin' | 'staff' | 'user' | 'investor';
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

const BottomNav: React.FC<BottomNavProps> = ({ userRole: propRole }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bottom-nav">
      <div
        className="flex items-center justify-around h-[80px] px-2"
        style={{
          background: 'rgba(15, 15, 15, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '28px 28px 0 0',
          paddingBottom: 'env(safe-area-inset-bottom)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
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
                className="text-xs font-medium transition-colors"
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
            className="text-xs font-medium transition-colors"
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
