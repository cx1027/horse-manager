'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import { 
  ArrowLeft, 
  Save, 
  Camera,
  Stethoscope,
  Activity,
  Utensils,
  ShoppingBag,
  Shield,
  MapPin
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewHorsePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    router.push('/horses');
  };

  const user = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: null,
  };

  return (
    <Layout user={user}>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/horses">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            返回
          </Button>
        </Link>
        <div>
          <h1 className="heading-2">添加马匹</h1>
          <p className="text-text-secondary">录入新马匹的基本信息</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <HorseIcon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="heading-4">基本信息</h2>
                  <p className="text-sm text-text-secondary">马匹的基本档案信息</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="马匹名称 *"
                  name="name"
                  placeholder="输入马匹名称"
                  required
                />
                <Select
                  label="性别 *"
                  name="gender"
                  required
                  options={[
                    { value: 'male', label: '公马' },
                    { value: 'female', label: '母马' },
                    { value: 'gelding', label: '骟马' },
                  ]}
                />
                <DatePicker
                  label="出生日期"
                  name="birthDate"
                />
                <Input
                  label="品种"
                  name="breed"
                  placeholder="如：纯血马、阿拉伯马"
                />
                <Input
                  label="毛色"
                  name="color"
                  placeholder="如：棕色、黑色、白色"
                />
                <Input
                  label="芯片号"
                  name="microchip"
                  placeholder="15位芯片号"
                />
                <Input
                  label="血统证书号"
                  name="registrationNo"
                  placeholder="证书编号"
                />
                <Select
                  label="状态"
                  name="status"
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
                  placeholder="其他相关信息..."
                  rows={4}
                />
              </div>
            </Card>

            {/* Location */}
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="heading-4">位置信息</h2>
                  <p className="text-sm text-text-secondary">马匹所在马厩位置</p>
                </div>
              </div>

              <Input
                label="马厩位置"
                name="stableLocation"
                placeholder="如：A区 1号马厩"
              />
            </Card>

            {/* Photos */}
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="heading-4">照片</h2>
                  <p className="text-sm text-text-secondary">上传马匹照片</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-border rounded-card p-8 text-center hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer">
                <input type="file" id="photos" multiple accept="image/*" className="hidden" />
                <label htmlFor="photos" className="cursor-pointer">
                  <Camera className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-primary font-medium mb-1">
                    拖拽或点击上传
                  </p>
                  <p className="text-sm text-text-secondary">
                    支持 JPG, PNG 格式，最多 10 张
                  </p>
                </label>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <h3 className="heading-4 mb-4">快速添加</h3>
              <div className="space-y-3">
                <Link
                  href="/medical/new"
                  className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg hover:bg-success/10 transition-colors"
                >
                  <Stethoscope className="w-5 h-5 text-success" />
                  <span className="text-sm text-text-secondary">医疗记录</span>
                </Link>
                <Link
                  href="/health/new"
                  className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg hover:bg-warning/10 transition-colors"
                >
                  <Activity className="w-5 h-5 text-warning" />
                  <span className="text-sm text-text-secondary">健康数据</span>
                </Link>
                <Link
                  href="/feeding/new"
                  className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <Utensils className="w-5 h-5 text-accent" />
                  <span className="text-sm text-text-secondary">喂养记录</span>
                </Link>
                <Link
                  href="/activities/new"
                  className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg hover:bg-text-secondary/10 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm text-text-secondary">商业活动</span>
                </Link>
                <Link
                  href="/insurance/new"
                  className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg hover:bg-error/10 transition-colors"
                >
                  <Shield className="w-5 h-5 text-error" />
                  <span className="text-sm text-text-secondary">保险信息</span>
                </Link>
              </div>
            </Card>

            {/* Actions */}
            <Card>
              <h3 className="heading-4 mb-4">操作</h3>
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isSubmitting}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  保存马匹
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => router.push('/horses')}
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
