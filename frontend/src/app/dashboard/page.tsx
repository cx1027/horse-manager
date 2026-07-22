'use client';

import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

// Mock data for demo
const mockStats = {
  totalHorses: 24,
  activeHorses: 18,
  medicalRecords: 156,
  upcomingAppointments: 5,
};

const mockRecentHorses = [
  { id: '1', name: '闪电', breed: '纯血马', status: 'active', coverImage: null },
  { id: '2', name: '黑旋风', breed: '阿拉伯马', status: 'active', coverImage: null },
  { id: '3', name: '小白', breed: '温血马', status: 'inactive', coverImage: null },
];

const mockUpcomingAppointments = [
  { id: '1', horseName: '闪电', type: 'vaccination', date: '2024-04-15', veterinarian: '张医生' },
  { id: '2', horseName: '黑旋风', type: 'checkup', date: '2024-04-16', veterinarian: '李医生' },
  { id: '3', horseName: '小白', type: 'dental', date: '2024-04-18', veterinarian: '王医生' },
];

const mockHealthAlerts = [
  { id: '1', horseName: '黑旋风', message: '体重低于标准值', severity: 'warning' },
  { id: '2', horseName: '小白', message: '疫苗即将到期', severity: 'info' },
];

export default function DashboardPage() {
  const user = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: null,
  };

  return (
    <Layout user={user}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="heading-2 mb-2">
          欢迎回来，{user.name}
        </h1>
        <p className="text-text-secondary">
          {formatDate(new Date().toISOString())} · 今天有 {mockUpcomingAppointments.length} 个待处理事项
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="马匹总数"
          value={mockStats.totalHorses}
          icon={<HorseIcon className="w-5 h-5" />}
          subtitle={`${mockStats.activeHorses} 匹活跃`}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="医疗记录"
          value={mockStats.medicalRecords}
          icon={<Stethoscope className="w-5 h-5" />}
          subtitle="本月新增 12 条"
        />
        <StatCard
          title="待处理预约"
          value={mockStats.upcomingAppointments}
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
              {mockRecentHorses.map((horse) => (
                <Link
                  key={horse.id}
                  href={`/horses/${horse.id}`}
                  className="group"
                >
                  <div className="bg-background-secondary rounded-xl p-4 hover:bg-background-primary transition-colors">
                    <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mb-3 flex items-center justify-center">
                      <HorseIcon className="w-12 h-12 text-accent/50" />
                    </div>
                    <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {horse.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{horse.breed}</p>
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
          {/* Upcoming Appointments */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="heading-4">待处理预约</h2>
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-3">
              {mockUpcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {appointment.horseName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {appointment.date} · {appointment.veterinarian}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Health Alerts */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="heading-4">健康提醒</h2>
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div className="space-y-3">
              {mockHealthAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 bg-background-secondary rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'warning' ? 'bg-warning' : 'bg-accent'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">
                      {alert.horseName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

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
        </div>
      </div>
    </Layout>
  );
}
