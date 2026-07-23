'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import { ArrowLeft, Save, Activity } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export default function NewHealthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedHorseId = searchParams?.get('horseId') || '';
  const [horses, setHorses] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    horseId: preselectedHorseId,
    recordDate: new Date().toISOString().slice(0, 10),
    weight: '',
    heartRate: '',
    bloodPressure: '',
    temperature: '',
    notes: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const res = await fetch(`${API_URL}/horses?pagination[pageSize]=100`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const json = await res.json();
          setHorses(Array.isArray(json.data) ? json.data : []);
        }
      } catch (e) {
        console.warn('Failed to load horses', e);
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('authToken');
      const body: any = {
        recordDate: formData.recordDate,
        notes: formData.notes,
      };
      if (formData.weight) body.weight = parseFloat(formData.weight);
      if (formData.heartRate) body.heartRate = parseInt(formData.heartRate, 10);
      if (formData.bloodPressure) body.bloodPressure = formData.bloodPressure;
      if (formData.temperature) body.temperature = parseFloat(formData.temperature);
      if (formData.horseId) body.horse = formData.horseId;

      await fetch(`${API_URL}/health-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ data: body }),
      });
    } catch (err) {
      console.warn('Create failed', err);
    }
    await new Promise((r) => setTimeout(r, 500));
    setIsSubmitting(false);
    router.push('/health');
  };

  const user = { name: '张三', email: 'zhangsan@example.com', avatar: null };

  const horseOptions = [
    { value: '', label: '选择马匹...' },
    ...horses.map((h) => ({ value: String(h.id), label: h.name || `#${h.id}` })),
  ];

  return (
    <Layout user={user}>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/health">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>返回</Button>
        </Link>
        <div>
          <h1 className="heading-2">新增健康数据</h1>
          <p className="text-text-secondary">记录一次健康测量数据</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h2 className="heading-4">健康测量数据</h2>
                  <p className="text-sm text-text-secondary">体重、心率、体温等</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="关联马匹 *"
                  name="horseId"
                  value={formData.horseId}
                  onChange={handleChange}
                  required
                  options={horseOptions}
                />
                <DatePicker
                  label="日期 *"
                  name="recordDate"
                  value={formData.recordDate}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="体重 (kg)"
                  name="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="如：520"
                />
                <Input
                  label="心率 (bpm)"
                  name="heartRate"
                  type="number"
                  min={0}
                  max={300}
                  value={formData.heartRate}
                  onChange={handleChange}
                  placeholder="如：38"
                />
                <Input
                  label="血压"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  placeholder="如：120/80"
                />
                <Input
                  label="体温 (°C)"
                  name="temperature"
                  type="number"
                  step="0.1"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="如：37.8"
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="备注"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="补充说明..."
                  rows={4}
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="heading-4 mb-4">操作</h3>
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isSubmitting}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  保存数据
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => router.back()}
                >
                  取消
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="heading-4 mb-3">参考范围</h3>
              <div className="text-sm text-text-secondary space-y-2">
                <div>体重: 400-700 kg</div>
                <div>心率: 28-40 bpm</div>
                <div>体温: 37.5-38.5 °C</div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </Layout>
  );
}