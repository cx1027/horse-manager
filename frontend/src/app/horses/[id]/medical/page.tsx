'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ArrowLeft, Plus, Stethoscope, Calendar, User, Loader2, FileText } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

const recordTypeLabels: Record<string, string> = {
  vaccination: '疫苗接种',
  checkup: '体检',
  deworming: '驱虫',
  dental: '牙科',
  illness: '疾病',
  surgery: '手术',
};

const recordTypeVariants: Record<string, 'success' | 'default' | 'warning' | 'danger' | 'info'> = {
  vaccination: 'success',
  checkup: 'info',
  deworming: 'default',
  dental: 'warning',
  illness: 'danger',
  surgery: 'danger',
};

export default function HorseMedicalPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const horseId = params?.id;
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const res = await fetch(`${API_URL}/medical-records?filters[horse][id][$eq]=${horseId}&sort=recordDate:desc`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const json = await res.json();
          setRecords(Array.isArray(json.data) ? json.data : []);
        }
      } catch (e) {
        console.warn('Failed to load medical records', e);
        // Fallback mock data
        setRecords([
          { id: 1, recordDate: '2024-03-10', recordType: 'vaccination', description: '狂犬疫苗接种', veterinarian: '张医生' },
          { id: 2, recordDate: '2024-02-15', recordType: 'checkup', description: '季度体检', veterinarian: '李医生' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    if (horseId) load();
  }, [horseId]);

  const user = { name: '张三', email: 'zhangsan@example.com', avatar: null };

  return (
    <Layout user={user}>
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/horses/${horseId}`}>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>返回马匹详情</Button>
        </Link>
        <div className="flex-1">
          <h1 className="heading-2">医疗记录</h1>
          <p className="text-text-secondary">马匹 #{horseId} 的医疗历史</p>
        </div>
        <Link href={`/medical/new?horseId=${horseId}`}>
          <Button leftIcon={<Plus className="w-4 h-4" />}>新增医疗记录</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : records.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Stethoscope className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary mb-4">暂无医疗记录</p>
            <Link href={`/medical/new?horseId=${horseId}`}>
              <Button leftIcon={<Plus className="w-4 h-4" />}>添加第一条记录</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {records.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={recordTypeVariants[r.recordType] || 'default'}>
                      {recordTypeLabels[r.recordType] || r.recordType}
                    </Badge>
                    <span className="text-sm text-text-secondary flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {r.recordDate}
                    </span>
                  </div>
                  <p className="text-text-primary mb-2">{r.description}</p>
                  {r.veterinarian && (
                    <p className="text-sm text-text-secondary flex items-center gap-1">
                      <User className="w-3 h-3" /> {r.veterinarian}
                    </p>
                  )}
                </div>
                <FileText className="w-5 h-5 text-text-muted flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}