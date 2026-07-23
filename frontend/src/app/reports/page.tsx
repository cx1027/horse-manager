'use client';

import React, { useState, useEffect } from 'react';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { FileText, Download, Activity, ShoppingBag, Shield, Stethoscope, Utensils, TrendingUp, Loader2, BarChart3, PieChart } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export default function ReportsPage() {
  const [stats, setStats] = useState({ horses: 0, medical: 0, health: 0, feeding: 0, activities: 0, insurance: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
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
        // Use mock data for demo
        setStats({ horses: 6, medical: 12, health: 24, feeding: 48, activities: 8, insurance: 4 });
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const user = { name: 'John Doe', email: 'john@example.com', avatar: null };

  const reports = [
    { id: 'horse-inventory', title: 'Horse Inventory Report', description: 'Complete list of all horses with basic info', icon: FileText, color: '#E12E6D' },
    { id: 'medical-summary', title: 'Medical Summary', description: 'Medical events and visit frequency by period', icon: Stethoscope, color: '#10B981' },
    { id: 'health-trends', title: 'Health Trend Analysis', description: 'Weight, heart rate, temperature trends', icon: Activity, color: '#F59E0B' },
    { id: 'feeding-report', title: 'Feeding Report', description: 'Feed quantity and frequency statistics', icon: Utensils, color: '#E12E6D' },
    { id: 'commercial-summary', title: 'Commercial Summary', description: 'Races, sales, breeding activities', icon: ShoppingBag, color: '#A855F7' },
    { id: 'insurance-status', title: 'Insurance Status', description: 'Policy status and expiry reminders', icon: Shield, color: '#EF4444' },
  ];

  return (
    <MicrographicsLayout variant="dark" fullWidth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Reports Center</h1>
          <p className="text-xl text-gray-400">Data summary and analytics reports</p>
        </div>

        {/* Stats Overview */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[20vh]">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {[
              { label: 'Horses', value: stats.horses, icon: FileText, color: '#E12E6D', gradient: 'rgba(225, 46, 109, 0.15)' },
              { label: 'Medical', value: stats.medical, icon: Stethoscope, color: '#10B981', gradient: 'rgba(16, 185, 129, 0.15)' },
              { label: 'Health', value: stats.health, icon: Activity, color: '#F59E0B', gradient: 'rgba(245, 158, 11, 0.15)' },
              { label: 'Feeding', value: stats.feeding, icon: Utensils, color: '#E12E6D', gradient: 'rgba(225, 46, 109, 0.15)' },
              { label: 'Activities', value: stats.activities, icon: ShoppingBag, color: '#A855F7', gradient: 'rgba(168, 85, 247, 0.15)' },
              { label: 'Insurance', value: stats.insurance, icon: Shield, color: '#EF4444', gradient: 'rgba(239, 68, 68, 0.15)' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-5 text-center transition-all hover:scale-105" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: s.gradient }}>
                  <s.icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Reports Grid */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-pink-500" />
            Available Reports
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.id} className="rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-xl" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${r.color}20` }}>
                      <Icon className="w-7 h-7" style={{ color: r.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{r.title}</h3>
                      <p className="text-sm text-gray-400">{r.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1 shadow-lg">
                      <TrendingUp className="w-3 h-3 mr-1" /> View
                    </Button>
                    <Button size="sm" variant="secondary" className="border-white/20">
                      <Download className="w-3 h-3 mr-1" /> Export
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl p-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-3">
            <PieChart className="w-5 h-5 text-purple-500" />
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/horses">
              <Button variant="secondary" className="w-full justify-start border-white/10 hover:border-pink-500/50">
                <FileText className="w-4 h-4 mr-2" /> Horse Management
              </Button>
            </Link>
            <Link href="/health">
              <Button variant="secondary" className="w-full justify-start border-white/10 hover:border-pink-500/50">
                <Activity className="w-4 h-4 mr-2" /> Health Data
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" className="w-full justify-start border-white/10 hover:border-pink-500/50">
                <BarChart3 className="w-4 h-4 mr-2" /> Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MicrographicsLayout>
  );
}
