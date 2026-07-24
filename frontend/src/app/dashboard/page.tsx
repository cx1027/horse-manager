'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';
import Link from 'next/link';
import {
  Home,
  Users,
  Stethoscope,
  BarChart3,
  User,
  Loader2,
  Plus
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

interface UserType {
  id: number;
  username: string;
  email: string;
  role?: string;
}

interface Horse {
  id: string;
  documentId?: string;
  name: string;
  breed?: string;
  status?: string;
  coverImage?: string | null;
}

const navItems = [
  { icon: Home, label: 'Home', href: '/dashboard', active: true },
  { icon: Users, label: 'Horses', href: '/horses', active: false },
  { icon: Stethoscope, label: 'Medical', href: '/medical', active: false },
  { icon: BarChart3, label: 'Reports', href: '/reports', active: false },
  { icon: User, label: 'Profile', href: '/profile', active: false },
];

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);

        if (token) {
          try {
            const response = await fetch(`${API_URL}/horses?populate=*`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
              setHorses(data.data || []);
            }
          } catch (error) {
            console.error('Failed to fetch horses:', error);
          }
        }
      }
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = user?.username || user?.email?.split('@')[0] || 'User';

  if (isLoading) {
    return (
      <Layout user={user} variant="micrographics">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--mg-text-muted)' }} />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout user={user} variant="micrographics">
      {/* Layer #23 Background Container */}
      <div className="min-h-screen relative" style={{ background: '#FFFFFF' }}>
        {/* Paper Background - Layer #23 style */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Paper texture with 58% opacity as per Figma */}
          <Image
            src="/images/layer23-paper.webp"
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.58 }}
            unoptimized
          />
        </div>

        {/* Main Content - Above the background */}
        <div className="relative" style={{ zIndex: 1 }}>
          {/* Status Bar Spacer - Mobile only */}
          <div className="h-14 lg:hidden" />

          {/* Page Content */}
          <main className="px-4 pb-20 lg:pb-8 lg:pl-0">
            {/* Greeting - Same style as date label */}
            <div className="pt-6 pb-8">
              <h1 
                className="mg-label"
                style={{ fontSize: '1.25rem', textTransform: 'none', letterSpacing: 'var(--mg-tracking-tight)', color: 'var(--mg-text-primary)' }}
              >
                {getGreeting()}, {displayName}
              </h1>
              <p 
                className="mg-label mt-3"
              >
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* My Barn Section */}
            <div className="flex items-center justify-between mb-4">
              <h2 
                className="mg-title"
              >
                My Barn
              </h2>
              <Link 
                href="/horses" 
                className="mg-helper"
              >
                See all
              </Link>
            </div>

            {/* Horse Cards Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              {horses.slice(0, 6).map((horse) => (
                <Link key={horse.id} href={`/horses/${horse.documentId || horse.id}`}>
                  <Card
                    variant="micrographics"
                    padding="sm"
                    className="h-full"
                  >
                    {/* Horse Image/Icon */}
                    <div
                      className="w-full aspect-square rounded-lg mb-3 flex items-center justify-center"
                      style={{ background: 'var(--mg-bg-paper)' }}
                    >
                      <HorseIcon 
                        className="w-8 h-8" 
                        style={{ color: 'var(--mg-text-muted)' }} 
                      />
                    </div>

                    {/* Horse Info */}
                    <div>
                      <h3 
                        className="mg-body truncate"
                      >
                        {horse.name}
                      </h3>
                      <p 
                        className="mg-helper truncate mt-0.5"
                      >
                        {horse.breed || 'Unknown breed'}
                      </p>
                      <Badge
                        variant="micrographics"
                        className="mt-2"
                      >
                        {horse.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </Card>
                </Link>
              ))}

              {/* Add New Horse Card */}
              <Link href="/horses/new">
                <Card
                  variant="micrographics"
                  padding="sm"
                  borderStyle="dashed"
                  className="h-full min-h-[180px] flex flex-col items-center justify-center"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                    style={{ background: 'var(--mg-bg-paper)' }}
                  >
                    <Plus className="w-5 h-5" style={{ color: 'var(--mg-text-muted)' }} />
                  </div>
                  <span 
                    className="mg-helper"
                  >
                    Add Horse
                  </span>
                </Card>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
