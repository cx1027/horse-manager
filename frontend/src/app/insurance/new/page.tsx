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
import { ArrowLeft, Save, Shield } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export default function NewInsurancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedHorseId = searchParams?.get('horseId') || '';
  const [horses, setHorses] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    horseId: preselectedHorseId,
    provider: '',
    policyNo: '',
    startDate: '',
    endDate: '',
    coverageAmount: '',
    premium: '',
    coverage: '',
    status: 'active',
    renewalReminder: true,
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
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('authToken');
      const body: any = {
        provider: formData.provider,
        policyNo: formData.policyNo,
        startDate: formData.startDate,
        endDate: formData.endDate,
        coverage: formData.coverage,
        status: formData.status,
        renewalReminder: formData.renewalReminder,
      };
      if (formData.coverageAmount) body.coverageAmount = parseFloat(formData.coverageAmount);
      if (formData.premium) body.premium = parseFloat(formData.premium);
      if (formData.horseId) body.horse = formData.horseId;

      await fetch(`${API_URL}/insurances`, {
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
          <h1 className="heading-2">新增保险</h1>
          <p className="text-text-secondary">为马匹登记保险信息</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-error" />
                </div>
                <div>
                  <h2 className="heading-4">保单信息</h2>
                  <p className="text-sm text-text-secondary">保险公司与保单详情</p>
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
                  label="保险公司 *"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  placeholder="如：中国人民保险"
                  required
                />
                <Input
                  label="保单号 *"
                  name="policyNo"
                  value={formData.policyNo}
                  onChange={handleChange}
                  placeholder="如：PI20240001"
                  required
                />
                <Select
                  label="状态"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={[
                    { value: 'active', label: '生效中' },
                    { value: 'expired', label: '已过期' },
                    { value: 'cancelled', label: '已取消' },
                  ]}
                />
                <DatePicker
                  label="生效日期 *"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
                <DatePicker
                  label="到期日期 *"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="保险金额 (¥)"
                  name="coverageAmount"
                  type="number"
                  step="0.01"
                  value={formData.coverageAmount}
                  onChange={handleChange}
                  placeholder="如：500000"
                />
                <Input
                  label="保费 (¥)"
                  name="premium"
                  type="number"
                  step="0.01"
                  value={formData.premium}
                  onChange={handleChange}
                  placeholder="如：15000"
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="保险覆盖范围"
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleChange}
                  placeholder="详细说明覆盖范围..."
                  rows={4}
                />
              </div>
            </Card>

            <Card>
              <h2 className="heading-4 mb-4">提醒设置</h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="renewalReminder"
                  checked={formData.renewalReminder}
                  onChange={handleChange}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#E12E6D' }}
                />
                <span className="text-text-primary">开启续保提醒</span>
              </label>
              <p className="text-sm text-text-secondary mt-2 ml-8">
                到期前 30/7/1 天发送邮件提醒
              </p>
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
                  保存保险
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