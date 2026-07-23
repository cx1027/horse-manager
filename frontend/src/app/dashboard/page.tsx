'use client';

import React, { useEffect, useState } from 'react';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';
import {
  Stethoscope,
  Calendar,
  TrendingUp,
  Activity,
  Plus,
  ArrowRight,
  Loader2
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

interface User {
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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
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

  if (isLoading) {
    return (
      <MicrographicsLayout variant="dark">
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#E12E6D' }} />
        </div>
      </MicrographicsLayout>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = user.username || user.email?.split('@')[0] || 'User';
  const stats = {
    totalHorses: horses.length,
    activeHorses: horses.filter(h => h.status === 'active').length,
    medicalRecords: 0,
    upcomingAppointments: 0,
  };

  return (
    <MicrographicsLayout variant="dark">
      <div className="min-h-screen p-6">
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-[60px] h-[48px]">
              <Image
                src="/images/background.webp"
                alt=""
                fill
                className="object-contain mix-blend-overlay"
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>HorseInfo</h1>
              <p className="text-sm" style={{ color: '#666666' }}>Dashboard</p>
            </div>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-2"
          >
            <span className="text-sm" style={{ color: '#A0A0A0' }}>{displayName}</span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)' }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          </Link>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Welcome back, {displayName}
          </h1>
          <p style={{ color: '#666666' }}>
            {formatDate(new Date().toISOString())} · {stats.totalHorses} horses
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Horses"
            value={stats.totalHorses}
            icon={<HorseIcon className="w-5 h-5" />}
            subtitle={`${stats.activeHorses} active`}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Medical Records"
            value={stats.medicalRecords}
            icon={<Stethoscope className="w-5 h-5" />}
            subtitle="0 new this month"
          />
          <StatCard
            title="Upcoming"
            value={stats.upcomingAppointments}
            icon={<Calendar className="w-5 h-5" />}
            subtitle="This week"
          />
          <StatCard
            title="Health Trend"
            value="Good"
            icon={<TrendingUp className="w-5 h-5" />}
            subtitle="Overall up"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Horses */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <h2 className="text-lg font-medium" style={{ color: '#FFFFFF' }}>Horse Overview</h2>
                <Link href="/horses" className="flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: '#E12E6D' }}>
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {horses.slice(0, 6).map((horse) => (
                  <Link
                    key={horse.id}
                    href={`/horses/${horse.documentId || horse.id}`}
                    className="group"
                  >
                    <div className="rounded-xl p-4 transition-colors" style={{ background: '#1A1A1A' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#242424'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A1A'; }}
                    >
                      <div className="w-full h-32 rounded-lg mb-3 flex items-center justify-center" style={{ background: 'rgba(225, 46, 109, 0.1)' }}>
                        <HorseIcon className="w-12 h-12" style={{ color: 'rgba(225, 46, 109, 0.4)' }} />
                      </div>
                      <h3 className="font-semibold group-hover:gradient-text transition-colors" style={{ color: '#FFFFFF' }}>
                        {horse.name}
                      </h3>
                      <p className="text-sm" style={{ color: '#666666' }}>{horse.breed || 'Unknown breed'}</p>
                      <Badge
                        variant={horse.status === 'active' ? 'success' : 'secondary'}
                        className="mt-2"
                      >
                        {horse.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </Link>
                ))}
                {/* Add New Horse */}
                <Link href="/horses/new" className="group">
                  <div
                    className="w-full min-h-[180px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = '#E12E6D';
                      el.style.background = 'rgba(225, 46, 109, 0.05)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(255,255,255,0.1)';
                      el.style.background = 'transparent';
                    }}
                  >
                    <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: '#666666' }} />
                    <span className="text-sm group-hover:transition-colors" style={{ color: '#666666' }}>
                      Add Horse
                    </span>
                  </div>
                </Link>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-lg font-medium mb-4" style={{ color: '#FFFFFF' }}>Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/horses/new" className="flex flex-col items-center gap-2 p-4 rounded-xl transition-colors" style={{ background: '#1A1A1A' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(225, 46, 109, 0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A1A'; }}
                >
                  <Plus className="w-6 h-6" style={{ color: '#E12E6D' }} />
                  <span className="text-sm" style={{ color: '#A0A0A0' }}>Add Horse</span>
                </Link>
                <Link href="/medical/new" className="flex flex-col items-center gap-2 p-4 rounded-xl transition-colors" style={{ background: '#1A1A1A' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(16, 185, 129, 0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A1A'; }}
                >
                  <Stethoscope className="w-6 h-6" style={{ color: '#10B981' }} />
                  <span className="text-sm" style={{ color: '#A0A0A0' }}>Medical</span>
                </Link>
                <Link href="/health/new" className="flex flex-col items-center gap-2 p-4 rounded-xl transition-colors" style={{ background: '#1A1A1A' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245, 158, 11, 0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A1A'; }}
                >
                  <Activity className="w-6 h-6" style={{ color: '#F59E0B' }} />
                  <span className="text-sm" style={{ color: '#A0A0A0' }}>Health</span>
                </Link>
                <Link href="/reports" className="flex flex-col items-center gap-2 p-4 rounded-xl transition-colors" style={{ background: '#1A1A1A' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(225, 46, 109, 0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A1A'; }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: '#E12E6D' }} />
                  <span className="text-sm" style={{ color: '#A0A0A0' }}>Reports</span>
                </Link>
              </div>
            </Card>

            {/* User Info */}
            <Card>
              <h2 className="text-lg font-medium mb-4" style={{ color: '#FFFFFF' }}>Account</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)' }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#FFFFFF' }}>{displayName}</p>
                    <p className="text-xs" style={{ color: '#666666' }}>{user.email}</p>
                  </div>
                </div>
                {user.role && (
                  <Badge variant="primary" className="mt-2">
                    {user.role === 'investor' ? 'Investor' : user.role === 'staff' ? 'Staff' : 'User'}
                  </Badge>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MicrographicsLayout>
  );
}
