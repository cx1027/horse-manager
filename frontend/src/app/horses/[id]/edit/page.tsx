'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import HorseIcon from '@/components/ui/HorseIcon';
import { ArrowLeft, Save, Camera, MapPin, Loader2 } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export default function EditHorsePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const horseId = params?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: '',
    breed: '',
    color: '',
    microchip: '',
    registrationNo: '',
    status: 'active',
    stableLocation: '',
    description: '',
  });

  useEffect(() => {
    const loadHorse = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const res = await fetch(`${API_URL}/horses/${horseId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const json = await res.json();
          const h = json.data || json;
          setFormData({
            name: h.name || '',
            gender: h.gender || 'male',
            birthDate: h.birthDate || '',
            breed: h.breed || '',
            color: h.color || '',
            microchip: h.microchip || '',
            registrationNo: h.registrationNo || '',
            status: h.status || 'active',
            stableLocation: h.stableLocation || '',
            description: h.description || '',
          });
        }
      } catch (e) {
        console.warn('Failed to load horse, using empty form', e);
      } finally {
        setIsLoading(false);
      }
    };
    if (horseId) loadHorse();
  }, [horseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`${API_URL}/horses/${horseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn('Update failed (offline / no API)', err);
    }
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    router.push(`/horses/${horseId}`);
  };

  const user = { name: '张三', email: 'zhangsan@example.com', avatar: null };

  if (isLoading) {
    return (
      <Layout user={user}>
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/horses/${horseId}`}>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>返回</Button>
        </Link>
        <div>
          <h1 className="heading-2">编辑马匹</h1>
          <p className="text-text-secondary">更新马匹 #{horseId} 的信息</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <HorseIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="heading-4">基本信息</h2>
                  <p className="text-sm text-text-secondary">马匹的基本档案</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input label="马匹名称 *" name="name" value={formData.name} onChange={handleChange} required />
                <Select
                  label="性别 *"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={[
                    { value: 'male', label: '公马' },
                    { value: 'female', label: '母马' },
                    { value: 'gelding', label: '骟马' },
                  ]}
                />
                <DatePicker label="出生日期" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                <Input label="品种" name="breed" value={formData.breed} onChange={handleChange} placeholder="如：纯血马" />
                <Input label="毛色" name="color" value={formData.color} onChange={handleChange} placeholder="如：棕色" />
                <Input label="芯片号" name="microchip" value={formData.microchip} onChange={handleChange} />
                <Input label="血统证书号" name="registrationNo" value={formData.registrationNo} onChange={handleChange} />
                <Select
                  label="状态"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={[
                    { value: 'active', label: '活跃' },
                    { value: 'inactive', label: '不活跃' },
                    { value: 'sold', label: '已出售' },
                    { value: 'deceased', label: '已故' },
                  ]}
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="备注"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="其他相关信息..."
                  rows={4}
                />
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="heading-4">位置信息</h2>
                  <p className="text-sm text-text-secondary">马厩位置</p>
                </div>
              </div>
              <Input
                label="马厩位置"
                name="stableLocation"
                value={formData.stableLocation}
                onChange={handleChange}
                placeholder="如：A区 1号马厩"
              />
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="heading-4">照片管理</h2>
                  <p className="text-sm text-text-secondary">上传或更换马匹照片</p>
                </div>
              </div>
              <div className="border-2 border-dashed border-border rounded-card p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                <input type="file" id="photos" multiple accept="image/*" className="hidden" />
                <label htmlFor="photos" className="cursor-pointer">
                  <Camera className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-primary font-medium mb-1">拖拽或点击上传</p>
                  <p className="text-sm text-text-secondary">支持 JPG, PNG 格式</p>
                </label>
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
                  保存修改
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => router.push(`/horses/${horseId}`)}
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