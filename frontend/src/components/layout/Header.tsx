'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface HeaderProps {
  user?: {
    name?: string;
    username?: string;
    email?: string;
    avatar?: string | null;
  } | null;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ user: propUser, onMenuClick, isMenuOpen }) => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(propUser || null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();

    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  const displayName = user?.name || user?.username || user?.email?.split('@')[0] || 'User';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)', boxShadow: '0 4px 20px rgba(225, 46, 109, 0.4)' }}>
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
                'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                pathname === '/dashboard'
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
              style={pathname === '/dashboard' ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
            >
              Dashboard
            </Link>
            <Link
              href="/horses"
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                pathname.startsWith('/horses')
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
              style={pathname.startsWith('/horses') ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
            >
              Horses
            </Link>
            <Link
              href="/medical"
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                pathname.startsWith('/medical')
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
              style={pathname.startsWith('/medical') ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
            >
              Medical
            </Link>
            <Link
              href="/activities"
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                pathname.startsWith('/activities')
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              )}
              style={pathname.startsWith('/activities') ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
            >
              Activities
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
                    placeholder="Search horses..."
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
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#E12E6D' }} />
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-background-secondary">
                  <Avatar src={user.avatar} fallback={displayName} size="sm" />
                  <span className="hidden sm:block text-sm font-medium text-text-primary">
                    {displayName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl bg-background-card border border-border shadow-dropdown opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-elevated"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-elevated"
                  >
                    Settings
                  </Link>
                  {user.email?.includes('admin') && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-background-elevated"
                    >
                      Admin
                    </Link>
                  )}
                  <div className="border-t mt-2 pt-2" style={{ borderColor: 'var(--color-border)' }}>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-background-elevated flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
