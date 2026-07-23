'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { ArrowLeft, Save, Utensils } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export default function NewFeedingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedHorseId = searchParams?.get('horseId') || '';
  const [horses, setHorses] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const now = new Date();
  const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  const [formData, setFormData] = useState({
    horseId: preselectedHorseId,
    feedDate: localIso,
    feedType: '',
    quantity: '',
    unit: 'kg',
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
        feedDate: formData.feedDate,
        feedType: formData.feedType,
        unit: formData.unit,
        notes: formData.notes,
      };
      if (formData.quantity) body.quantity = parseFloat(formData.quantity);
      if (formData.horseId) body.horse = formData.horseId;

      await fetch(`${API_URL}/feeding-records`, {
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
    router.push('/horses');
  };

  const user = { name: '张三', email: 'zhangsan@example.com', avatar: null };

  const horseOptions = [
    { value: '', label: '选择马匹...' },
    ...horses.map((h) => ({ value: String(h.id), label: h.name || `#${h.id}` })),
  ];

  return (
    <Layout user={user}>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/horses">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>返回</Button>
        </Link>
        <div>
          <h1 className="heading-2">新增喂养记录</h1>
          <p className="text-text-secondary">记录一次饲料投放</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="heading-4">喂养详情</h2>
                  <p className="text-sm text-text-secondary">饲料类型、用量等</p>
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
                <Input
                  label="喂养时间 *"
                  name="feedDate"
                  type="datetime-local"
                  value={formData.feedDate}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="饲料类型 *"
                  name="feedType"
                  value={formData.feedType}
                  onChange={handleChange}
                  placeholder="如：精饲料 / 干草"
                  required
                />
                <Input
                  label="数量"
                  name="quantity"
                  type="number"
                  step="0.1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="如：5"
                />
                <Select
                  label="单位"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  options={[
                    { value: 'kg', label: 'kg (千克)' },
                    { value: 'lb', label: 'lb (磅)' },
                    { value: 'g', label: 'g (克)' },
                  ]}
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="备注"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="如：早餐 / 晚餐 / 加餐..."
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
                  保存记录
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
          </div>
        </div>
      </form>
    </Layout>
  );
}