'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn('flex border-b border-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px',
            'transition-all duration-200',
            activeTab === tab.id
              ? 'text-accent border-accent'
              : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
