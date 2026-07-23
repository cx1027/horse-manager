'use client';

import React, { useState } from 'react';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
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
  MapPin,
  Loader2
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { genderLabels, statusLabels } from '@/lib/utils';

const mockHorses = [
  { id: '1', name: 'Thunder', gender: 'male', breed: 'Thoroughbred', color: 'Brown', status: 'active', birthDate: '2020-03-15', stableLocation: 'Zone A - Stall 1', coverImage: null },
  { id: '2', name: 'Shadow', gender: 'male', breed: 'Arabian', color: 'Black', status: 'active', birthDate: '2019-07-22', stableLocation: 'Zone B - Stall 3', coverImage: null },
  { id: '3', name: 'Snow', gender: 'female', breed: 'Warmblood', color: 'White', status: 'inactive', birthDate: '2021-01-10', stableLocation: 'Zone C - Stall 2', coverImage: null },
  { id: '4', name: 'Red Rush', gender: 'gelding', breed: 'Thoroughbred', color: 'Chestnut', status: 'active', birthDate: '2018-05-08', stableLocation: 'Zone A - Stall 4', coverImage: null },
  { id: '5', name: 'Golden Doe', gender: 'female', breed: 'Akhal-Teke', color: 'Gold', status: 'active', birthDate: '2022-02-28', stableLocation: 'Zone D - Stall 1', coverImage: null },
  { id: '6', name: 'Snow Leopard', gender: 'male', breed: 'Arabian', color: 'Gray', status: 'sold', birthDate: '2017-11-12', stableLocation: '-', coverImage: null },
];

export default function HorsesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
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
    return `${age} years old`;
  };

  return (
    <MicrographicsLayout variant="light" fullWidth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold text-black mb-3 tracking-tight">Horse Management</h1>
            <p className="text-lg text-gray-600">{filteredHorses.length} horses in stable</p>
          </div>
          <Link href="/horses/new">
            <Button variant="primary" className="shadow-lg">
              <Plus className="w-5 h-5" /> Add Horse
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search horses by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-pink-500 focus:bg-white outline-none transition-all"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="border-2"
            >
              <Filter className="w-4 h-4" /> Filters
              <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </Button>
            <div className="flex rounded-xl overflow-hidden border-2" style={{ borderColor: '#E5E5E5' }}>
              <button
                className={cn(
                  'p-3 transition-all',
                  viewMode === 'grid' ? 'text-white' : 'text-gray-400 hover:bg-gray-50'
                )}
                style={viewMode === 'grid' ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                className={cn(
                  'p-3 transition-all',
                  viewMode === 'list' ? 'text-white' : 'text-gray-400 hover:bg-gray-50'
                )}
                style={viewMode === 'list' ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
                onClick={() => setViewMode('list')}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 grid grid-cols-2 md:grid-cols-4 gap-4" style={{ borderTop: '2px solid #E5E5E5' }}>
              <Select
                label="Gender"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                options={[
                  { value: '', label: 'All' },
                  { value: 'male', label: 'Stallion' },
                  { value: 'female', label: 'Mare' },
                  { value: 'gelding', label: 'Gelding' },
                ]}
              />
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: '', label: 'All' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'sold', label: 'Sold' },
                  { value: 'deceased', label: 'Deceased' },
                ]}
              />
              <Select
                label="Breed"
                options={[
                  { value: '', label: 'All' },
                  { value: 'purebred', label: 'Thoroughbred' },
                  { value: 'arabian', label: 'Arabian' },
                  { value: 'warmblood', label: 'Warmblood' },
                ]}
              />
            </div>
          )}
        </div>

        {/* Horse List */}
        {filteredHorses.length === 0 ? (
          <EmptyState
            title="No horses found"
            description="Try adjusting your search or add a new horse"
            action={{
              label: 'Add Horse',
              onClick: () => window.location.href = '/horses/new',
            }}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHorses.map((horse) => (
              <Link key={horse.id} href={`/horses/${horse.id}`}>
                <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5' }}>
                  <div className="relative">
                    <div className="w-full h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.1), rgba(168, 85, 247, 0.05))' }}>
                      <HorseIcon className="w-16 h-16 transition-transform group-hover:scale-110" style={{ color: 'rgba(225, 46, 109, 0.4)' }} />
                    </div>
                    <Badge
                      variant={horse.status === 'active' ? 'success' : horse.status === 'sold' ? 'error' : 'secondary'}
                      className="absolute top-3 right-3 shadow-md"
                    >
                      {statusLabels[horse.status]}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-black mb-2">
                      {horse.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {horse.breed} · {horse.color}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{horse.stableLocation}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHorses.map((horse) => (
              <Link key={horse.id} href={`/horses/${horse.id}`}>
                <div className="flex items-center gap-6 p-5 rounded-2xl transition-all duration-200 hover:shadow-lg cursor-pointer group" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5' }}>
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.1), rgba(168, 85, 247, 0.05))' }}>
                    <HorseIcon className="w-10 h-10" style={{ color: 'rgba(225, 46, 109, 0.4)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-black">
                        {horse.name}
                      </h3>
                      <Badge
                        variant={horse.status === 'active' ? 'success' : horse.status === 'sold' ? 'error' : 'secondary'}
                      >
                        {statusLabels[horse.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {horse.breed} · {genderLabels[horse.gender]} · {calculateAge(horse.birthDate)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {horse.stableLocation}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)' }}>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MicrographicsLayout>
  );
}
