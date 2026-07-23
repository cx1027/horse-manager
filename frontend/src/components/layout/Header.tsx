'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, Menu, X, ChevronDown, LogOut, User, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

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
}

const navConfig = {
  user: [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'horses', label: 'Horses', href: '/horses' },
    { id: 'health', label: 'Health', href: '/health' },
  ],
  investor: [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'horses', label: 'My Horses', href: '/horses' },
    { id: 'health', label: 'Health', href: '/health' },
    { id: 'reports', label: 'Reports', href: '/reports' },
  ],
  staff: [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'horses', label: 'Horses', href: '/horses' },
    { id: 'medical', label: 'Medical', href: '/medical' },
    { id: 'health', label: 'Health', href: '/health' },
    { id: 'activities', label: 'Activities', href: '/activities' },
  ],
};

const roleConfig = {
  user: { label: 'User', color: '#2A82EB', bg: 'rgba(42, 130, 235, 0.15)' },
  investor: { label: 'Investor', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
  staff: { label: 'Staff', color: '#A855F7', bg: 'rgba(168, 85, 247, 0.15)' },
};

const Header: React.FC<HeaderProps> = ({ user: propUser, onMenuClick, isMenuOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(propUser || null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const userRole = user?.role as keyof typeof navConfig || 'user';
  const navItems = navConfig[userRole] || navConfig.user;
  const roleStyle = roleConfig[userRole] || roleConfig.user;

  const displayName = user?.name || user?.username || user?.email?.split('@')[0] || 'User';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    await new Promise(resolve => setTimeout(resolve, 300));
    router.push('/login');
  };

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{ background: 'rgba(15, 15, 15, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
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
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xl font-bold" style={{ color: '#FFFFFF' }}>HorseInfo</span>
                {user?.role && (
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: roleStyle.bg, color: roleStyle.color }}
                  >
                    {roleStyle.label}
                  </span>
                )}
              </div>
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
                      : 'text-[#A0A0A0] hover:text-white'
                  )}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #E12E6D, #A855F7)',
                    boxShadow: '0 2px 8px rgba(225, 46, 109, 0.3)'
                  } : {
                    background: 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
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
                    className="w-full px-4 py-2 rounded-xl text-sm outline-none"
                    style={{
                      background: '#1A1A1A',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF'
                    }}
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  className="p-2 rounded-lg transition-colors hover:bg-[#2A2A2A]"
                  style={{ color: '#A0A0A0' }}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg transition-colors hover:bg-[#2A2A2A]">
              <Bell className="w-5 h-5" style={{ color: '#A0A0A0' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#E12E6D' }} />
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-[#2A2A2A]">
                  <Avatar src={user.avatar} fallback={displayName} size="sm" />
                  <span className="hidden sm:block text-sm font-medium" style={{ color: '#FFFFFF' }}>
                    {displayName}
                  </span>
                  <ChevronDown className="w-4 h-4" style={{ color: '#A0A0A0' }} />
                </button>

                {/* Dropdown Menu */}
                <div
                  className="absolute right-0 top-full mt-2 w-56 py-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  style={{
                    background: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <p className="font-medium" style={{ color: '#FFFFFF' }}>{displayName}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>{user.email}</p>
                    <span
                      className="inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium"
                      style={{ background: roleStyle.bg, color: roleStyle.color }}
                    >
                      {roleStyle.label}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-[#2A2A2A]"
                      style={{ color: '#A0A0A0' }}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    {userRole === 'investor' && (
                      <Link
                        href="/reports"
                        className="flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-[#2A2A2A]"
                        style={{ color: '#A0A0A0' }}
                      >
                        <TrendingUp className="w-4 h-4" />
                        My Reports
                      </Link>
                    )}
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-[#2A2A2A]"
                      style={{ color: '#A0A0A0' }}
                    >
                      Settings
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t pt-1 mt-1" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200',
                        isLoggingOut
                          ? 'cursor-not-allowed opacity-50'
                          : 'hover:bg-[rgba(239,68,68,0.15)]'
                      )}
                      style={{ color: '#EF4444' }}
                    >
                      <LogOut className={cn('w-4 h-4', isLoggingOut && 'animate-pulse')} />
                      {isLoggingOut ? 'Logging out...' : 'Logout'}
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
