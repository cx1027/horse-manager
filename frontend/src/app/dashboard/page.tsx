'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { 
  Stethoscope, 
  Calendar, 
  TrendingUp,
  Activity,
  AlertCircle,
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = user.username || user.email?.split('@')[0] || '用户';
  const stats = {
    totalHorses: horses.length,
    activeHorses: horses.filter(h => h.status === 'active').length,
    medicalRecords: 0,
    upcomingAppointments: 0,
  };

  return (
    <Layout user={user}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="heading-2 mb-2">
          欢迎回来，{displayName}
        </h1>
        <p className="text-text-secondary">
          {formatDate(new Date().toISOString())} · {stats.totalHorses} 匹马匹
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="马匹总数"
          value={stats.totalHorses}
          icon={<HorseIcon className="w-5 h-5" />}
          subtitle={`${stats.activeHorses} 匹活跃`}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="医疗记录"
          value={stats.medicalRecords}
          icon={<Stethoscope className="w-5 h-5" />}
          subtitle="本月新增 0 条"
        />
        <StatCard
          title="待处理预约"
          value={stats.upcomingAppointments}
          icon={<Calendar className="w-5 h-5" />}
          subtitle="本周内"
        />
        <StatCard
          title="健康趋势"
          value="良好"
          icon={<TrendingUp className="w-5 h-5" />}
          subtitle="总体上升"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Horses */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="heading-4">马匹概览</h2>
              <Link href="/horses" className="text-accent hover:text-accent-hover flex items-center gap-1 text-sm">
                查看全部 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {horses.slice(0, 6).map((horse) => (
                <Link
                  key={horse.id}
                  href={`/horses/${horse.documentId || horse.id}`}
                  className="group"
                >
                  <div className="bg-background-secondary rounded-xl p-4 hover:bg-background-primary transition-colors">
                    <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mb-3 flex items-center justify-center">
                      <HorseIcon className="w-12 h-12 text-accent/50" />
                    </div>
                    <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {horse.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{horse.breed || '未知品种'}</p>
                    <Badge
                      variant={horse.status === 'active' ? 'success' : 'secondary'}
                      className="mt-2"
                    >
                      {horse.status === 'active' ? '活跃' : '不活跃'}
                    </Badge>
                  </div>
                </Link>
              ))}
              {/* Add New Horse */}
              <Link
                href="/horses/new"
                className="group"
              >
                <div className="w-full h-full min-h-[180px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-accent hover:bg-accent/5 transition-colors">
                  <Plus className="w-8 h-8 text-text-muted group-hover:text-accent transition-colors" />
                  <span className="text-sm text-text-secondary group-hover:text-accent transition-colors">
                    添加马匹
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
            <h2 className="heading-4 mb-4">快捷操作</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/horses/new"
                className="flex flex-col items-center gap-2 p-4 bg-background-secondary rounded-lg hover:bg-accent/10 transition-colors"
              >
                <Plus className="w-6 h-6 text-accent" />
                <span className="text-sm text-text-secondary">添加马匹</span>
              </Link>
              <Link
                href="/medical/new"
                className="flex flex-col items-center gap-2 p-4 bg-background-secondary rounded-lg hover:bg-success/10 transition-colors"
              >
                <Stethoscope className="w-6 h-6 text-success" />
                <span className="text-sm text-text-secondary">医疗记录</span>
              </Link>
              <Link
                href="/health/new"
                className="flex flex-col items-center gap-2 p-4 bg-background-secondary rounded-lg hover:bg-warning/10 transition-colors"
              >
                <Activity className="w-6 h-6 text-warning" />
                <span className="text-sm text-text-secondary">健康数据</span>
              </Link>
              <Link
                href="/reports"
                className="flex flex-col items-center gap-2 p-4 bg-background-secondary rounded-lg hover:bg-accent/10 transition-colors"
              >
                <TrendingUp className="w-6 h-6 text-accent" />
                <span className="text-sm text-text-secondary">查看报表</span>
              </Link>
            </div>
          </Card>

          {/* User Info */}
          <Card>
            <h2 className="heading-4 mb-4">账户信息</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-semibold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-text-primary">{displayName}</p>
                  <p className="text-xs text-text-secondary">{user.email}</p>
                </div>
              </div>
              {user.role && (
                <Badge variant="primary" className="mt-2">
                  {user.role === 'investor' ? '投资者' : user.role === 'staff' ? '员工' : '用户'}
                </Badge>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
