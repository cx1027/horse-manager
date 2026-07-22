'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import EmptyState from '@/components/ui/EmptyState';
import { 
  Search, 
  Filter, 
  Plus, 
  Grid3X3, 
  List,
  ChevronDown,
  Calendar,
  MapPin
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { genderLabels, statusLabels } from '@/lib/utils';

// Mock data
const mockHorses = [
  { id: '1', name: '闪电', gender: 'male', breed: '纯血马', color: '棕色', status: 'active', birthDate: '2020-03-15', stableLocation: 'A区 1号马厩', coverImage: null },
  { id: '2', name: '黑旋风', gender: 'male', breed: '阿拉伯马', color: '黑色', status: 'active', birthDate: '2019-07-22', stableLocation: 'B区 3号马厩', coverImage: null },
  { id: '3', name: '小白', gender: 'female', breed: '温血马', color: '白色', status: 'inactive', birthDate: '2021-01-10', stableLocation: 'C区 2号马厩', coverImage: null },
  { id: '4', name: '红马', gender: 'gelding', breed: '纯血马', color: '栗色', status: 'active', birthDate: '2018-05-08', stableLocation: 'A区 4号马厩', coverImage: null },
  { id: '5', name: '金鹿', gender: 'female', breed: '汗血马', color: '金色', status: 'active', birthDate: '2022-02-28', stableLocation: 'D区 1号马厩', coverImage: null },
  { id: '6', name: '雪豹', gender: 'male', breed: '阿拉伯马', color: '灰色', status: 'sold', birthDate: '2017-11-12', stableLocation: '-', coverImage: null },
];

export default function HorsesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const user = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: null,
  };

  const filteredHorses = mockHorses.filter((horse) => {
    const matchesSearch = horse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      horse.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = !genderFilter || horse.gender === genderFilter;
    const matchesStatus = !statusFilter || horse.status === statusFilter;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age}岁`;
  };

  return (
    <Layout user={user}>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="heading-2 mb-2">马匹管理</h1>
          <p className="text-text-secondary">共 {filteredHorses.length} 匹马匹</p>
        </div>
        <Link href="/horses/new">
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            添加马匹
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="搜索马匹名称或品种..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <Button
            variant="secondary"
            leftIcon={<Filter className="w-4 h-4" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            筛选
            <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
          </Button>
          <div className="flex border border-border rounded-button overflow-hidden">
            <button
              className={cn(
                'p-3 transition-colors',
                viewMode === 'grid' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-background-secondary'
              )}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              className={cn(
                'p-3 transition-colors',
                viewMode === 'list' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-background-secondary'
              )}
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select
              label="性别"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              options={[
                { value: '', label: '全部' },
                { value: 'male', label: '公马' },
                { value: 'female', label: '母马' },
                { value: 'gelding', label: '骟马' },
              ]}
            />
            <Select
              label="状态"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: '', label: '全部' },
                { value: 'active', label: '活跃' },
                { value: 'inactive', label: '不活跃' },
                { value: 'sold', label: '已出售' },
                { value: 'deceased', label: '已故' },
              ]}
            />
            <Select
              label="品种"
              options={[
                { value: '', label: '全部' },
                { value: 'purebred', label: '纯血马' },
                { value: 'arabian', label: '阿拉伯马' },
                { value: 'warmblood', label: '温血马' },
              ]}
            />
            <div />
          </div>
        )}
      </Card>

      {/* Horse List */}
      {filteredHorses.length === 0 ? (
        <EmptyState
          title="没有找到马匹"
          description="尝试调整搜索条件或添加新的马匹"
          action={{
            label: '添加马匹',
            onClick: () => window.location.href = '/horses/new',
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHorses.map((horse) => (
            <Link key={horse.id} href={`/horses/${horse.id}`}>
              <Card className="h-full">
                <div className="relative mb-4">
                  <div className="w-full h-40 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center">
                    <HorseIcon className="w-16 h-16 text-accent/50" />
                  </div>
                  <Badge
                    variant={horse.status === 'active' ? 'success' : horse.status === 'sold' ? 'error' : 'secondary'}
                    className="absolute top-3 right-3"
                  >
                    {statusLabels[horse.status]}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {horse.name}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {horse.breed} · {horse.color} · {calculateAge(horse.birthDate)}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <MapPin className="w-3 h-3" />
                  <span>{horse.stableLocation}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHorses.map((horse) => (
            <Link key={horse.id} href={`/horses/${horse.id}`}>
              <Card hover padding="sm" className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <HorseIcon className="w-10 h-10 text-accent/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {horse.name}
                    </h3>
                    <Badge
                      variant={horse.status === 'active' ? 'success' : horse.status === 'sold' ? 'error' : 'secondary'}
                    >
                      {statusLabels[horse.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {horse.breed} · {genderLabels[horse.gender]} · {calculateAge(horse.birthDate)}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {horse.stableLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(horse.birthDate).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}
