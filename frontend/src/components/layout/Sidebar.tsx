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
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'horses', label: '马匹管理', icon: HorseIcon, href: '/horses' },
    { id: 'medical', label: '医疗记录', icon: Stethoscope, href: '/medical' },
    { id: 'health', label: '健康数据', icon: Activity, href: '/health' },
    { id: 'feeding', label: '喂养记录', icon: Utensils, href: '/feeding' },
    { id: 'activities', label: '商业活动', icon: ShoppingBag, href: '/activities' },
    { id: 'insurance', label: '保险信息', icon: Shield, href: '/insurance' },
  ];

  const bottomItems = [
    { id: 'users', label: '用户管理', icon: Users, href: '/admin/users', adminOnly: true },
    { id: 'reports', label: '报表中心', icon: FileText, href: '/reports' },
    { id: 'settings', label: '系统设置', icon: Settings, href: '/settings' },
  ];

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-background-card border-r border-border transition-all duration-300 z-50',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border px-4">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 5 6 8c0 2 1 3 2 4l-1 8h10l-1-8c1-1 2-2 2-4 0-3-2.5-6-6-6zm0 2c2.5 0 4 2 4 4s-1.5 3-4 3-4-1-4-3 1.5-4 4-4z"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-text-primary">HorseInfo</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
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
                'flex items-center gap-3 px-3 py-2.5 rounded-button transition-colors',
                isActive
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-border space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-button transition-colors',
                isActive
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
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
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">收起</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
