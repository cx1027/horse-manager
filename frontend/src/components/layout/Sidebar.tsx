'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle, className = "" }) => {
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'horses', label: 'Horses', icon: HorseIcon, href: '/horses' },
    { id: 'medical', label: 'Medical', icon: Stethoscope, href: '/medical' },
    { id: 'health', label: 'Health', icon: Activity, href: '/health' },
    { id: 'feeding', label: 'Feeding', icon: Utensils, href: '/feeding' },
    { id: 'activities', label: 'Activities', icon: ShoppingBag, href: '/activities' },
    { id: 'insurance', label: 'Insurance', icon: Shield, href: '/insurance' },
  ];

  const bottomItems = [
    { id: 'users', label: 'Users', icon: Users, href: '/admin/users', adminOnly: true },
    { id: 'reports', label: 'Reports', icon: FileText, href: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-0 h-screen border-r transition-all duration-300 z-50',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
      style={{ background: 'var(--color-background-card)', borderColor: 'var(--color-border)' }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b px-4" style={{ borderColor: 'var(--color-border)' }}>
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)', boxShadow: '0 4px 16px rgba(225, 46, 109, 0.3)' }}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 5 6 8c0 2 1 3 2 4l-1 8h10l-1-8c1-1 2-2 2-4 0-3-2.5-6-6-6zm0 2c2.5 0 4 2 4 4s-1.5 3-4 3-4-1-4-3 1.5-4 4-4z"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-text-primary">HorseInfo</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)' }}>
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.5 2 6 5 6 8c0 2 1 3 2 4l-1 8h10l-1-8c1-1 2-2 2-4 0-3-2.5-6-6-6zm0 2c2.5 0 4 2 4 4s-1.5 3-4 3-4-1-4-3 1.5-4 4-4z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
                isActive
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-elevated'
              )}
              style={isActive ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t space-y-1" style={{ borderColor: 'var(--color-border)' }}>
        {bottomItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
                isActive
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-elevated'
              )}
              style={isActive ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-background-elevated transition-colors"
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
      </div>
    </aside>
  );
};

export default Sidebar;
