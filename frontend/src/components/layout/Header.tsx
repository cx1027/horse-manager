'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string | null;
  } | null;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick, isMenuOpen }) => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background-primary/80 backdrop-blur-lg border-b border-border">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
              onClick={onMenuClick}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.5 2 6 5 6 8c0 2 1 3 2 4l-1 8h10l-1-8c1-1 2-2 2-4 0-3-2.5-6-6-6zm0 2c2.5 0 4 2 4 4s-1.5 3-4 3-4-1-4-3 1.5-4 4-4z"/>
                </svg>
              </div>
              <span className="hidden sm:block text-xl font-bold text-text-primary">
                HorseInfo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/dashboard"
              className={cn(
                'px-4 py-2 rounded-button text-sm font-medium transition-colors',
                pathname === '/dashboard'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
            >
              仪表盘
            </Link>
            <Link
              href="/horses"
              className={cn(
                'px-4 py-2 rounded-button text-sm font-medium transition-colors',
                pathname.startsWith('/horses')
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
            >
              马匹
            </Link>
            <Link
              href="/medical"
              className={cn(
                'px-4 py-2 rounded-button text-sm font-medium transition-colors',
                pathname.startsWith('/medical')
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
            >
              医疗记录
            </Link>
            <Link
              href="/activities"
              className={cn(
                'px-4 py-2 rounded-button text-sm font-medium transition-colors',
                pathname.startsWith('/activities')
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
            >
              商业活动
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-80">
                  <input
                    type="text"
                    placeholder="搜索马匹..."
                    className="input pr-10"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  className="p-2 text-text-secondary hover:text-text-primary"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-text-secondary hover:text-text-primary">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-button hover:bg-background-secondary">
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <span className="hidden sm:block text-sm font-medium text-text-primary">
                    {user.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-background-card rounded-card border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-secondary"
                  >
                    个人资料
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-secondary"
                  >
                    设置
                  </Link>
                  {user.email.includes('admin') && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-secondary"
                    >
                      管理后台
                    </Link>
                  )}
                  <div className="border-t border-border mt-2 pt-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-error hover:bg-background-secondary">
                      退出登录
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button size="sm">登录</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
