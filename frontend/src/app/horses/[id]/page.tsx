'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Camera,
  Stethoscope,
  Activity,
  Utensils,
  ShoppingBag,
  Shield,
  Calendar,
  MapPin,
  User,
  FileText,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { formatDate, calculateAge, genderLabels, statusLabels } from '@/lib/utils';

// Mock data
const mockHorse = {
  id: '1',
  name: '闪电',
  gender: 'male' as const,
  breed: '纯血马',
  color: '棕色',
  birthDate: '2020-03-15',
  status: 'active' as const,
  microchip: '985141001234567',
  registrationNo: 'TH20200001',
  stableLocation: 'A区 1号马厩',
  description: '这是一匹优秀的纯血赛马，具有出色的速度和耐力。在2023年全国速度赛马大赛中获得第三名。',
  coverImage: null,
  owner: { id: '1', name: '张三', email: 'zhangsan@example.com' },
  createdAt: '2024-01-15',
};

const mockMedicalRecords = [
  { id: '1', recordType: 'vaccination', recordDate: '2024-03-10', description: '狂犬疫苗接种', veterinarian: '张医生' },
  { id: '2', recordType: 'checkup', recordDate: '2024-02-15', description: '季度体检', veterinarian: '李医生' },
  { id: '3', recordType: 'dental', recordDate: '2024-01-20', description: '牙科检查和清洗', veterinarian: '王医生' },
];

const mockHealthData = [
  { id: '1', recordDate: '2024-03-15', weight: 520, heartRate: 38, temperature: 37.8 },
  { id: '2', recordDate: '2024-03-10', weight: 518, heartRate: 40, temperature: 37.5 },
  { id: '3', recordDate: '2024-03-05', weight: 515, heartRate: 36, temperature: 37.6 },
];

const mockFeedingRecords = [
  { id: '1', feedDate: '2024-03-15', feedType: '精饲料', quantity: 5, unit: 'kg', notes: '早餐' },
  { id: '2', feedDate: '2024-03-15', feedType: '干草', quantity: 8, unit: 'kg', notes: '晚餐' },
];

const mockCommercialActivities = [
  { id: '1', activityDate: '2024-02-20', activityType: 'race', title: '全国速度赛马大赛', result: '第三名', prizeMoney: 50000 },
  { id: '2', activityDate: '2024-01-15', activityType: 'exhibition', title: '国际马术博览会', result: '参与展示' },
];

const mockInsurance = {
  id: '1',
  provider: '中国人民保险',
  policyNo: 'PI20240001',
  startDate: '2024-01-01',
  endDate: '2025-01-01',
  coverageAmount: 500000,
  premium: 15000,
  status: 'active' as const,
};

const mockPhotos = [
  { id: '1', category: 'full_body', caption: '全身照' },
  { id: '2', category: 'close_up', caption: '头部特写' },
  { id: '3', category: 'action', caption: '训练中' },
  { id: '4', category: 'competition', caption: '比赛现场' },
];

export default function HorseDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: null,
  };

  const tabs = [
    { id: 'overview', label: '概览' },
    { id: 'medical', label: '医疗记录', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'health', label: '健康数据', icon: <Activity className="w-4 h-4" /> },
    { id: 'feeding', label: '喂养记录', icon: <Utensils className="w-4 h-4" /> },
    { id: 'activities', label: '商业活动', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'insurance', label: '保险信息', icon: <Shield className="w-4 h-4" /> },
  ];

  const medicalTypeLabels: Record<string, string> = {
    vaccination: '疫苗接种',
    checkup: '体检',
    deworming: '驱虫',
    dental: '牙科',
    illness: '疾病',
    surgery: '手术',
  };

  const activityTypeLabels: Record<string, string> = {
    race: '赛事',
    exhibition: '展览',
    sale: '交易',
    breeding: '配种',
    sponsorship: '赞助',
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
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="heading-2">{mockHorse.name}</h1>
            <Badge variant={mockHorse.status === 'active' ? 'success' : 'secondary'}>
              {statusLabels[mockHorse.status]}
            </Badge>
          </div>
          <p className="text-text-secondary">
            {mockHorse.breed} · {genderLabels[mockHorse.gender]} · {calculateAge(mockHorse.birthDate)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/horses/${mockHorse.id}/edit`}>
            <Button variant="secondary" leftIcon={<Edit className="w-4 h-4" />}>
              编辑
            </Button>
          </Link>
          <Button variant="ghost" leftIcon={<Trash2 className="w-4 h-4" />} className="text-error hover:bg-error/10">
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="heading-4">照片集</h2>
                <Button variant="ghost" size="sm" leftIcon={<Camera className="w-4 h-4" />}>
                  上传照片
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {mockPhotos.map((photo) => (
                  <div key={photo.id} className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                    <Camera className="w-8 h-8 text-accent/50" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Basic Info Card */}
            <Card>
              <h2 className="heading-4 mb-4">基本信息</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-secondary">品种</p>
                  <p className="text-text-primary font-medium">{mockHorse.breed}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">性别</p>
                  <p className="text-text-primary font-medium">{genderLabels[mockHorse.gender]}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">毛色</p>
                  <p className="text-text-primary font-medium">{mockHorse.color}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">年龄</p>
                  <p className="text-text-primary font-medium">{calculateAge(mockHorse.birthDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">芯片号</p>
                  <p className="text-text-primary font-medium font-mono">{mockHorse.microchip}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">血统证书号</p>
                  <p className="text-text-primary font-medium font-mono">{mockHorse.registrationNo}</p>
                </div>
              </div>
              {mockHorse.description && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-text-secondary mb-2">备注</p>
                  <p className="text-text-primary">{mockHorse.description}</p>
                </div>
              )}
            </Card>

            {/* Location & Owner */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h2 className="heading-4">位置</h2>
                </div>
                <p className="text-text-primary font-medium">{mockHorse.stableLocation}</p>
              </Card>
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-accent" />
                  <h2 className="heading-4">马主</h2>
                </div>
                <p className="text-text-primary font-medium">{mockHorse.owner.name}</p>
                <p className="text-sm text-text-secondary">{mockHorse.owner.email}</p>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <h3 className="heading-4 mb-4">快速统计</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">医疗记录</span>
                  <Badge variant="primary">{mockMedicalRecords.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">健康数据</span>
                  <Badge variant="success">{mockHealthData.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">商业活动</span>
                  <Badge variant="warning">{mockCommercialActivities.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">照片</span>
                  <Badge variant="secondary">{mockPhotos.length}</Badge>
                </div>
              </div>
            </Card>

            {/* Insurance Summary */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <h3 className="heading-4">保险</h3>
                </div>
                <Badge variant="success">生效中</Badge>
              </div>
              <p className="text-sm text-text-secondary mb-1">{mockInsurance.provider}</p>
              <p className="text-text-primary font-medium font-mono">{mockInsurance.policyNo}</p>
              <p className="text-sm text-text-secondary mt-2">
                有效期至 {formatDate(mockInsurance.endDate)}
              </p>
            </Card>

            {/* Recent Medical */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="heading-4">最近医疗</h3>
                <Link href={`/horses/${mockHorse.id}/medical`}>
                  <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                    查看全部
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {mockMedicalRecords.slice(0, 2).map((record) => (
                  <div key={record.id} className="p-3 bg-background-secondary rounded-lg">
                    <p className="text-sm text-text-primary font-medium">{record.description}</p>
                    <p className="text-xs text-text-secondary mt-1">
                      {formatDate(record.recordDate)} · {record.veterinarian}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Health */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="heading-4">最新体重</h3>
                <span className="text-2xl font-bold text-accent">{mockHealthData[0].weight} kg</span>
              </div>
              <p className="text-sm text-text-secondary">
                {formatDate(mockHealthData[0].recordDate)} 记录
              </p>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'medical' && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-3">医疗记录</h2>
            <Button leftIcon={<Stethoscope className="w-4 h-4" />}>添加记录</Button>
          </div>
          <div className="space-y-4">
            {mockMedicalRecords.map((record) => (
              <div key={record.id} className="flex items-start gap-4 p-4 bg-background-secondary rounded-xl">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-5 h-5 text-success" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="primary">{medicalTypeLabels[record.recordType]}</Badge>
                    <span className="text-sm text-text-secondary">{formatDate(record.recordDate)}</span>
                  </div>
                  <p className="text-text-primary">{record.description}</p>
                  <p className="text-sm text-text-secondary mt-1">兽医: {record.veterinarian}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'health' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">健康数据</h2>
              <Button leftIcon={<Activity className="w-4 h-4" />}>添加数据</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">日期</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">体重 (kg)</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">心率 (bpm)</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">体温 (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHealthData.map((data) => (
                    <tr key={data.id} className="border-b border-border last:border-0 hover:bg-background-secondary/50">
                      <td className="py-3 px-4 text-text-primary">{formatDate(data.recordDate)}</td>
                      <td className="py-3 px-4 text-text-primary font-mono">{data.weight}</td>
                      <td className="py-3 px-4 text-text-primary font-mono">{data.heartRate}</td>
                      <td className="py-3 px-4 text-text-primary font-mono">{data.temperature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'feeding' && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-3">喂养记录</h2>
            <Button leftIcon={<Utensils className="w-4 h-4" />}>添加记录</Button>
          </div>
          <div className="space-y-4">
            {mockFeedingRecords.map((record) => (
              <div key={record.id} className="flex items-center gap-4 p-4 bg-background-secondary rounded-xl">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-text-primary font-medium">{record.feedType}</p>
                  <p className="text-sm text-text-secondary">{record.quantity} {record.unit}</p>
                </div>
                <span className="text-sm text-text-muted">{formatDate(record.feedDate)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'activities' && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-3">商业活动</h2>
            <Button leftIcon={<ShoppingBag className="w-4 h-4" />}>添加活动</Button>
          </div>
          <div className="space-y-4">
            {mockCommercialActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 bg-background-secondary rounded-xl">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-warning" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="warning">{activityTypeLabels[activity.activityType]}</Badge>
                    <span className="text-sm text-text-secondary">{formatDate(activity.activityDate)}</span>
                  </div>
                  <p className="text-text-primary font-medium">{activity.title}</p>
                  <p className="text-sm text-text-secondary mt-1">{activity.result}</p>
                  {activity.prizeMoney && (
                    <p className="text-sm text-success mt-1">奖金: ¥{activity.prizeMoney.toLocaleString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'insurance' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">保险信息</h2>
              <Badge variant="success">生效中</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary">保险公司</p>
                <p className="text-text-primary font-medium">{mockInsurance.provider}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">保单号</p>
                <p className="text-text-primary font-medium font-mono">{mockInsurance.policyNo}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-secondary">生效日期</p>
                  <p className="text-text-primary font-medium">{formatDate(mockInsurance.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">到期日期</p>
                  <p className="text-text-primary font-medium">{formatDate(mockInsurance.endDate)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-secondary">保额</p>
                  <p className="text-text-primary font-medium">¥{mockInsurance.coverageAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">保费</p>
                  <p className="text-text-primary font-medium">¥{mockInsurance.premium.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Button variant="secondary" className="w-full">更新保险信息</Button>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
}
