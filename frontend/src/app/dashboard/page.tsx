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
      <Layout user={user}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#E12E6D' }} />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout user={user}>
      <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
        {/* Status Bar Spacer - Mobile only */}
        <div className="h-11 lg:hidden" />

        {/* Header */}
        <header className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between" style={{ background: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative w-10 h-8">
              <Image
                src="/images/background.webp"
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="font-semibold" style={{ color: '#FFFFFF' }}>HorseInfo</span>
          </div>

          {/* User Avatar */}
          <Link href="/profile" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)', color: '#FFFFFF' }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          </Link>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-24">
          {/* Greeting */}
          <div className="py-6">
            <h1 className="text-2xl font-semibold" style={{ color: '#FFFFFF' }}>
              {getGreeting()}, {displayName}
            </h1>
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* My Barn Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>My Barn</h2>
            <Link href="/horses" className="text-sm font-medium" style={{ color: '#E12E6D' }}>
              See all
            </Link>
          </div>

          {/* Horse Cards Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            {horses.slice(0, 6).map((horse) => (
              <Link key={horse.id} href={`/horses/${horse.documentId || horse.id}`}>
                <Card
                  padding="sm"
                  className="h-full"
                  style={{ background: '#1A1A1A' }}
                >
                  {/* Horse Image/Icon */}
                  <div
                    className="w-full aspect-square rounded-lg mb-3 flex items-center justify-center"
                    style={{ background: 'rgba(225, 46, 109, 0.1)' }}
                  >
                    <HorseIcon className="w-10 h-10" style={{ color: 'rgba(225, 46, 109, 0.6)' }} />
                  </div>

                  {/* Horse Info */}
                  <div>
                    <h3 className="font-medium text-sm truncate" style={{ color: '#FFFFFF' }}>
                      {horse.name}
                    </h3>
                    <p className="text-xs truncate mt-0.5" style={{ color: '#6B7280' }}>
                      {horse.breed || 'Unknown breed'}
                    </p>
                    <Badge
                      variant={horse.status === 'active' ? 'success' : 'secondary'}
                      className="mt-2 text-xs"
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
                padding="sm"
                className="h-full min-h-[200px] flex flex-col items-center justify-center"
                style={{ background: 'transparent', border: '1px dashed #374151' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ background: 'rgba(225, 46, 109, 0.1)' }}
                >
                  <Plus className="w-6 h-6" style={{ color: '#E12E6D' }} />
                </div>
                <span className="text-sm" style={{ color: '#6B7280' }}>Add Horse</span>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
}
