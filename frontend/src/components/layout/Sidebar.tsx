'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Stethoscope,
  Activity,
  Utensils,
  ShoppingBag,
  Shield,
  Settings,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface User {
  id?: number;
  role?: string;
}

const menuConfig = {
  user: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'horses', label: 'Horses', icon: HorseIcon, href: '/horses' },
    { id: 'health', label: 'Health', icon: Activity, href: '/health' },
  ],
  investor: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'horses', label: 'My Horses', icon: HorseIcon, href: '/horses' },
    { id: 'health', label: 'Health', icon: Activity, href: '/health' },
    { id: 'reports', label: 'Reports', icon: FileText, href: '/reports' },
  ],
  staff: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'horses', label: 'Horses', icon: HorseIcon, href: '/horses' },
    { id: 'medical', label: 'Medical', icon: Stethoscope, href: '/medical' },
    { id: 'health', label: 'Health', icon: Activity, href: '/health' },
    { id: 'feeding', label: 'Feeding', icon: Utensils, href: '/feeding' },
    { id: 'activities', label: 'Activities', icon: ShoppingBag, href: '/activities' },
    { id: 'insurance', label: 'Insurance', icon: Shield, href: '/insurance' },
    { id: 'reports', label: 'Reports', icon: FileText, href: '/reports' },
    { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
  ],
};

const roleLabels = {
  user: 'User',
  investor: 'Investor',
  staff: 'Staff',
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle, className = "" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userRole = user?.role as keyof typeof menuConfig || 'user';
  const menuItems = menuConfig[userRole] || menuConfig.user;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    await new Promise(resolve => setTimeout(resolve, 300));
    router.push('/login');
  };

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-0 h-screen transition-all duration-300 z-50',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
      style={{
        background: '#1A1A1A',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        {!isCollapsed ? (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                boxShadow: '0 4px 16px rgba(225, 46, 109, 0.3)'
              }}
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 5 6 8c0 2 1 3 2 4l-1 8h10l-1-8c1-1 2-2 2-4 0-3-2.5-6-6-6zm0 2c2.5 0 4 2 4 4s-1.5 3-4 3-4-1-4-3 1.5-4 4-4z"/>
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold" style={{ color: '#FFFFFF' }}>HorseInfo</span>
              {user?.role && (
                <span
                  className="ml-2 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(225, 46, 109, 0.15)',
                    color: '#E12E6D'
                  }}
                >
                  {roleLabels[userRole] || 'User'}
                </span>
              )}
            </div>
          </Link>
        ) : (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)' }}
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.5 2 6 5 6 8c0 2 1 3 2 4l-1 8h10l-1-8c1-1 2-2 2-4 0-3-2.5-6-6-6zm0 2c2.5 0 4 2 4 4s-1.5 3-4 3-4-1-4-3 1.5-4 4-4z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p
          className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: '#6B6B6B' }}
        >
          {!isCollapsed && 'Menu'}
        </p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                isActive
                  ? 'text-white'
                  : 'text-[#A0A0A0] hover:text-white hover:bg-[#2A2A2A]'
              )}
              style={isActive ? {
                background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                boxShadow: '0 2px 8px rgba(225, 46, 109, 0.3)'
              } : undefined}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t space-y-1" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        {/* Settings - visible to all */}
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
            pathname === '/settings'
              ? 'text-white'
              : 'text-[#A0A0A0] hover:text-white hover:bg-[#2A2A2A]'
          )}
          style={pathname === '/settings' ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#A0A0A0] hover:text-white hover:bg-[#2A2A2A] transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>

        {/* Logout Button - Always visible */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
            isLoggingOut
              ? 'text-[#A0A0A0] cursor-not-allowed'
              : 'text-[#EF4444] hover:text-white hover:bg-[rgba(239,68,68,0.15)]'
          )}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className={cn('w-5 h-5 flex-shrink-0', isLoggingOut && 'animate-pulse')} />
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
