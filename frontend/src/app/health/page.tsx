'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Heart, Thermometer } from 'lucide-react';

// Mock data for weight chart
const weightData = [
  { date: '01/01', weight: 510 },
  { date: '01/08', weight: 512 },
  { date: '01/15', weight: 515 },
  { date: '01/22', weight: 513 },
  { date: '01/29', weight: 518 },
  { date: '02/05', weight: 520 },
  { date: '02/12', weight: 522 },
  { date: '02/19', weight: 518 },
  { date: '02/26', weight: 520 },
  { date: '03/05', weight: 515 },
  { date: '03/12', weight: 520 },
  { date: '03/19', weight: 522 },
];

// Mock data for heart rate
const heartRateData = [
  { date: '01/01', heartRate: 42 },
  { date: '01/08', heartRate: 40 },
  { date: '01/15', heartRate: 38 },
  { date: '01/22', heartRate: 41 },
  { date: '01/29', heartRate: 39 },
  { date: '02/05', heartRate: 38 },
  { date: '02/12', heartRate: 36 },
  { date: '02/19', heartRate: 40 },
  { date: '02/26', heartRate: 38 },
  { date: '03/05', heartRate: 36 },
  { date: '03/12', heartRate: 38 },
  { date: '03/19', heartRate: 38 },
];

export default function HealthDataPage() {
  const user = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: null,
  };

  const latestStats = {
    weight: 522,
    weightChange: 2.4,
    heartRate: 38,
    heartRateChange: -5,
    temperature: 37.8,
  };

  return (
    <Layout user={user}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="heading-2 mb-2">健康数据</h1>
        <p className="text-text-secondary">闪电 · 近6个月健康趋势</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">最新体重</p>
                <p className="text-2xl font-bold text-text-primary">{latestStats.weight} kg</p>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${latestStats.weightChange >= 0 ? 'text-success' : 'text-error'}`}>
              {latestStats.weightChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {latestStats.weightChange >= 0 ? '+' : ''}{latestStats.weightChange}%
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">静息心率</p>
                <p className="text-2xl font-bold text-text-primary">{latestStats.heartRate} bpm</p>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${latestStats.heartRateChange >= 0 ? 'text-success' : 'text-error'}`}>
              {latestStats.heartRateChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {latestStats.heartRateChange >= 0 ? '+' : ''}{latestStats.heartRateChange}%
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">体温</p>
                <p className="text-2xl font-bold text-text-primary">{latestStats.temperature}°C</p>
              </div>
            </div>
            <span className="badge badge-success">正常</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weight Chart */}
        <Card>
          <h2 className="heading-4 mb-6">体重趋势</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData}>
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#8B8B9E"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  domain={[500, 530]}
                  stroke="#8B8B9E"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `${value}kg`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16213e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                  labelStyle={{ color: '#FFFFFF' }}
                  formatter={(value: number) => [`${value} kg`, '体重']}
                />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#FF6B35"
                  strokeWidth={2}
                  fill="url(#weightGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Heart Rate Chart */}
        <Card>
          <h2 className="heading-4 mb-6">心率趋势</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#8B8B9E"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  domain={[30, 50]}
                  stroke="#8B8B9E"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16213e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                  labelStyle={{ color: '#FFFFFF' }}
                  formatter={(value: number) => [`${value} bpm`, '心率']}
                />
                <Line
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#00D9A5"
                  strokeWidth={2}
                  dot={{ fill: '#00D9A5', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#00D9A5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Records */}
      <Card>
        <h2 className="heading-4 mb-6">最近记录</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">日期</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">体重 (kg)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">心率 (bpm)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">体温 (°C)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">备注</th>
              </tr>
            </thead>
            <tbody>
              {weightData.slice(-5).reverse().map((item, index) => (
                <tr key={index} className="border-b border-border last:border-0 hover:bg-background-secondary/50">
                  <td className="py-3 px-4 text-text-primary">{item.date}</td>
                  <td className="py-3 px-4 text-text-primary font-mono">{item.weight}</td>
                  <td className="py-3 px-4 text-text-primary font-mono">{heartRateData[heartRateData.length - 5 + index].heartRate}</td>
                  <td className="py-3 px-4 text-text-primary font-mono">37.{5 + index}</td>
                  <td className="py-3 px-4 text-text-secondary">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
}
