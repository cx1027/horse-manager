'use client';

import React from 'react';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Heart, Thermometer, Scale, Activity } from 'lucide-react';
import { formatDate } from '@/lib/utils';

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
  const user = { name: 'John Doe', email: 'john@example.com', avatar: null };

  const latestStats = {
    weight: 522,
    weightChange: 2.4,
    heartRate: 38,
    heartRateChange: -5,
    temperature: 37.8,
  };

  return (
    <MicrographicsLayout variant="dark" fullWidth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Health Data</h1>
          <p className="text-xl text-gray-400">Thunder · Last 6 months health trends</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Weight Card */}
          <div className="rounded-2xl p-6 transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.15), rgba(168, 85, 247, 0.1))', border: '1px solid rgba(225, 46, 109, 0.3)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(225, 46, 109, 0.2)' }}>
                  <Scale className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Latest Weight</p>
                  <p className="text-3xl font-bold text-white">{latestStats.weight} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">+{latestStats.weightChange}%</span>
              </div>
            </div>
          </div>

          {/* Heart Rate Card */}
          <div className="rounded-2xl p-6 transition-all hover:scale-[1.02]" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Resting Heart Rate</p>
                  <p className="text-3xl font-bold text-white">{latestStats.heartRate} bpm</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm font-medium">{latestStats.heartRateChange}%</span>
              </div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="rounded-2xl p-6 transition-all hover:scale-[1.02]" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
                  <Thermometer className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Temperature</p>
                  <p className="text-3xl font-bold text-white">{latestStats.temperature}°C</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
                Normal
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Weight Trend */}
          <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <Scale className="w-5 h-5 text-pink-500" />
              Weight Trend
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightData}>
                  <defs>
                    <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E12E6D" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E12E6D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} />
                  <YAxis domain={[500, 530]} stroke="#666" fontSize={12} tickLine={false} tickFormatter={(v) => `${v}kg`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} labelStyle={{ color: '#FFFFFF' }} formatter={(value) => [`${value} kg`, 'Weight']} />
                  <Area type="monotone" dataKey="weight" stroke="#E12E6D" strokeWidth={2} fill="url(#weightGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Heart Rate Trend */}
          <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <Heart className="w-5 h-5 text-red-500" />
              Heart Rate Trend
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} />
                  <YAxis domain={[30, 50]} stroke="#666" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} labelStyle={{ color: '#FFFFFF' }} formatter={(value) => [`${value} bpm`, 'Heart Rate']} />
                  <Line type="monotone" dataKey="heartRate" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: '#EF4444' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Records Table */}
        <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Activity className="w-5 h-5 text-emerald-500" />
            Recent Records
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Weight (kg)</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Heart Rate (bpm)</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Temp (°C)</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Notes</th>
                </tr>
              </thead>
              <tbody>
                {weightData.slice(-5).reverse().map((item, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <td className="py-4 px-4 text-white">{item.date}</td>
                    <td className="py-4 px-4 text-white font-mono">{item.weight}</td>
                    <td className="py-4 px-4 text-white font-mono">{heartRateData[heartRateData.length - 5 + index].heartRate}</td>
                    <td className="py-4 px-4 text-white font-mono">37.{5 + index}</td>
                    <td className="py-4 px-4 text-gray-500">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MicrographicsLayout>
  );
}
