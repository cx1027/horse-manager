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
import { ArrowLeft, Save, Stethoscope } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export default function NewMedicalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedHorseId = searchParams?.get('horseId') || '';
  const [horses, setHorses] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    horseId: preselectedHorseId,
    recordDate: new Date().toISOString().slice(0, 10),
    recordType: 'vaccination',
    description: '',
    veterinarian: '',
    nextAppointment: '',
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
        recordType: formData.recordType,
        description: formData.description,
        veterinarian: formData.veterinarian,
      };
      if (formData.nextAppointment) body.nextAppointment = formData.nextAppointment;
      if (formData.horseId) body.horse = formData.horseId;

      await fetch(`${API_URL}/medical-records`, {
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
    if (formData.horseId) router.push(`/horses/${formData.horseId}/medical`);
    else router.push('/horses');
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
          <h1 className="heading-2">新增医疗记录</h1>
          <p className="text-text-secondary">记录一次医疗事件</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h2 className="heading-4">医疗记录详情</h2>
                  <p className="text-sm text-text-secondary">填写诊疗信息</p>
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
                <Select
                  label="记录类型 *"
                  name="recordType"
                  value={formData.recordType}
                  onChange={handleChange}
                  required
                  options={[
                    { value: 'vaccination', label: '疫苗接种' },
                    { value: 'checkup', label: '体检' },
                    { value: 'illness', label: '疾病' },
                    { value: 'deworming', label: '驱虫' },
                    { value: 'dental', label: '牙科' },
                    { value: 'surgery', label: '手术' },
                  ]}
                />
                <Input
                  label="兽医姓名"
                  name="veterinarian"
                  value={formData.veterinarian}
                  onChange={handleChange}
                  placeholder="如：张医生"
                />
                <div className="md:col-span-2">
                  <Input
                    label="下次预约时间"
                    name="nextAppointment"
                    type="datetime-local"
                    value={formData.nextAppointment}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-4">
                <Textarea
                  label="详细描述"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="详细描述本次诊疗情况、用药、用量等..."
                  rows={5}
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