'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FileText, Download, Calendar, Activity, ShoppingBag, Shield, Stethoscope, Utensils, TrendingUp, Loader2 } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export default function ReportsPage() {
  const [stats, setStats] = useState({
    horses: 0,
    medical: 0,
    health: 0,
    feeding: 0,
    activities: 0,
    insurance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [horsesRes, medRes, healthRes, feedRes, actRes, insRes] = await Promise.all([
          fetch(`${API_URL}/horses?pagination[pageSize]=1`, { headers }),
          fetch(`${API_URL}/medical-records?pagination[pageSize]=1`, { headers }),
          fetch(`${API_URL}/health-records?pagination[pageSize]=1`, { headers }),
          fetch(`${API_URL}/feeding-records?pagination[pageSize]=1`, { headers }),
          fetch(`${API_URL}/commercial-activities?pagination[pageSize]=1`, { headers }),
          fetch(`${API_URL}/insurances?pagination[pageSize]=1`, { headers }),
        ]);
        const parse = async (r: Response) => {
          if (!r.ok) return 0;
          const j = await r.json();
          return j.meta?.pagination?.total ?? (Array.isArray(j.data) ? j.data.length : 0);
        };
        setStats({
          horses: await parse(horsesRes),
          medical: await parse(medRes),
          health: await parse(healthRes),
          feeding: await parse(feedRes),
          activities: await parse(actRes),
          insurance: await parse(insRes),
        });
      } catch (e) {
        console.warn('Failed to load stats', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const user = { name: '张三', email: 'zhangsan@example.com', avatar: null };

  const reports = [
    {
      id: 'horse-inventory',
      title: '马匹清单报告',
      description: '所有马匹的完整清单与基本资料',
      icon: FileText,
      color: 'text-primary bg-primary/10',
    },
    {
      id: 'medical-summary',
      title: '医疗记录汇总',
      description: '按时间段汇总医疗事件、就诊频率',
      icon: Stethoscope,
      color: 'text-success bg-success/10',
    },
    {
      id: 'health-trends',
      title: '健康趋势分析',
      description: '体重、心率、体温等关键指标趋势',
      icon: Activity,
      color: 'text-warning bg-warning/10',
    },
    {
      id: 'feeding-report',
      title: '喂养记录报表',
      description: '饲料用量、喂食频率统计',
      icon: Utensils,
      color: 'text-accent bg-accent/10',
    },
    {
      id: 'commercial-summary',
      title: '商业活动报告',
      description: '赛事、交易、配种等活动汇总',
      icon: ShoppingBag,
      color: 'text-text-secondary bg-text-secondary/10',
    },
    {
      id: 'insurance-status',
      title: '保险状态报告',
      description: '所有保单的状态、到期提醒',
      icon: Shield,
      color: 'text-error bg-error/10',
    },
  ];

  return (
    <Layout user={user}>
      <div className="mb-6">
        <h1 className="heading-2 mb-2">报告中心</h1>
        <p className="text-text-secondary">数据汇总与分析报告</p>
      </div>

      {/* Stats Overview */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[20vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card padding="sm">
            <div className="text-center">
              <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.horses}</p>
              <p className="text-xs text-text-secondary">马匹</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <Stethoscope className="w-6 h-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.medical}</p>
              <p className="text-xs text-text-secondary">医疗记录</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <Activity className="w-6 h-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.health}</p>
              <p className="text-xs text-text-secondary">健康数据</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <Utensils className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.feeding}</p>
              <p className="text-xs text-text-secondary">喂养记录</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <ShoppingBag className="w-6 h-6 text-text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.activities}</p>
              <p className="text-xs text-text-secondary">商业活动</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <Shield className="w-6 h-6 text-error mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">{stats.insurance}</p>
              <p className="text-xs text-text-secondary">保险</p>
            </div>
          </Card>
        </div>
      )}

      {/* Report List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <Card key={r.id}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${r.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="heading-4 mb-1">{r.title}</h3>
                  <p className="text-sm text-text-secondary mb-4">{r.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="primary" leftIcon={<TrendingUp className="w-3 h-3" />}>
                      查看
                    </Button>
                    <Button size="sm" variant="secondary" leftIcon={<Download className="w-3 h-3" />}>
                      导出
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <Card>
        <h3 className="heading-4 mb-4">快速操作</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <Link href="/horses">
            <Button variant="secondary" className="w-full">马匹管理</Button>
          </Link>
          <Link href="/health">
            <Button variant="secondary" className="w-full">健康数据</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" className="w-full">返回仪表盘</Button>
          </Link>
        </div>
      </Card>
    </Layout>
  );
}