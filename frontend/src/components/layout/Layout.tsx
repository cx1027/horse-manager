'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
  user?: {
    name?: string;
    username?: string;
    email?: string;
    avatar?: string | null;
  } | null;
  variant?: 'default' | 'micrographics';
}

const Layout: React.FC<LayoutProps> = ({ children, user, variant = 'default' }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isMicrographics = variant === 'micrographics';

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <Header
        user={user}
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
        variant={variant}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        variant={variant}
      />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className={cn(
              'fixed inset-0 z-40 lg:hidden transition-all duration-300 backdrop-blur-sm'
            )}
            style={{ background: isMicrographics ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.6)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <Sidebar
            isCollapsed={false}
            className="fixed left-0 top-0 h-full z-50 lg:hidden"
            variant={variant}
          />
        </>
      )}

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          isMicrographics ? '' : 'pt-16 pb-20 lg:pt-0 lg:pb-0',
          isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-56'
        )}
      >
        <div className={cn("page-container", isMicrographics ? 'py-0' : 'py-6')}>{children}</div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav variant={variant} />
    </div>
  );
};

export default Layout;
