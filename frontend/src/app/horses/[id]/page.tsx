'use client';

import React, { useState } from 'react';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import Gallery from '@/components/horse/Gallery';
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
  ChevronRight,
  Scale,
  Heart,
  Thermometer,
  Images
} from 'lucide-react';
import Link from 'next/link';
import { formatDate, calculateAge, genderLabels, statusLabels } from '@/lib/utils';

const mockHorse = {
  id: '1',
  name: 'Thunder',
  gender: 'male' as const,
  breed: 'Thoroughbred',
  color: 'Brown',
  birthDate: '2020-03-15',
  status: 'active' as const,
  microchip: '985141001234567',
  registrationNo: 'TH20200001',
  stableLocation: 'Zone A - Stall 1',
  description: 'An excellent thoroughbred racehorse with outstanding speed and endurance. Placed third in the 2023 National Speed Racing Championship.',
  coverImage: null,
  owner: { id: '1', name: 'John Doe', email: 'john@example.com' },
  createdAt: '2024-01-15',
};

const mockMedicalRecords = [
  { id: '1', recordType: 'vaccination', recordDate: '2024-03-10', description: 'Rabies vaccination', veterinarian: 'Dr. Zhang' },
  { id: '2', recordType: 'checkup', recordDate: '2024-02-15', description: 'Quarterly checkup', veterinarian: 'Dr. Li' },
  { id: '3', recordType: 'dental', recordDate: '2024-01-20', description: 'Dental checkup and cleaning', veterinarian: 'Dr. Wang' },
];

const mockHealthData = [
  { id: '1', recordDate: '2024-03-15', weight: 520, heartRate: 38, temperature: 37.8 },
  { id: '2', recordDate: '2024-03-10', weight: 518, heartRate: 40, temperature: 37.5 },
  { id: '3', recordDate: '2024-03-05', weight: 515, heartRate: 36, temperature: 37.6 },
];

const mockFeedingRecords = [
  { id: '1', feedDate: '2024-03-15', feedType: 'Concentrate', quantity: 5, unit: 'kg', notes: 'Breakfast' },
  { id: '2', feedDate: '2024-03-15', feedType: 'Hay', quantity: 8, unit: 'kg', notes: 'Dinner' },
];

const mockCommercialActivities = [
  { id: '1', activityDate: '2024-02-20', activityType: 'race', title: 'National Speed Racing Championship', result: 'Third Place', prizeMoney: 50000 },
  { id: '2', activityDate: '2024-01-15', activityType: 'exhibition', title: 'International Equestrian Expo', result: 'Exhibition Participant' },
];

const mockInsurance = {
  id: '1',
  provider: 'China Pacific Insurance',
  policyNo: 'PI20240001',
  startDate: '2024-01-01',
  endDate: '2025-01-01',
  coverageAmount: 500000,
  premium: 15000,
  status: 'active' as const,
};

const mockPhotos: { id: string; url: string; caption?: string; category: 'full_body' | 'close_up' | 'action' | 'competition' | 'other'; isPublic?: boolean }[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400', caption: 'Full Body Shot', category: 'full_body' },
  { id: '2', url: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=400', caption: 'Headshot', category: 'close_up' },
  { id: '3', url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400', caption: 'Training Session', category: 'action' },
  { id: '4', url: 'https://images.unsplash.com/photo-1534773728080-33df55066a62?w=400', caption: 'Competition Day', category: 'competition' },
];

export default function HorseDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'photos', label: 'Photos', icon: <Images className="w-4 h-4" /> },
    { id: 'medical', label: 'Medical', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'health', label: 'Health', icon: <Activity className="w-4 h-4" /> },
    { id: 'feeding', label: 'Feeding', icon: <Utensils className="w-4 h-4" /> },
    { id: 'activities', label: 'Activities', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'insurance', label: 'Insurance', icon: <Shield className="w-4 h-4" /> },
  ];

  const medicalTypeLabels: Record<string, string> = {
    vaccination: 'Vaccination',
    checkup: 'Checkup',
    deworming: 'Deworming',
    dental: 'Dental',
    illness: 'Illness',
    surgery: 'Surgery',
  };

  const activityTypeLabels: Record<string, string> = {
    race: 'Race',
    exhibition: 'Exhibition',
    sale: 'Sale',
    breeding: 'Breeding',
    sponsorship: 'Sponsorship',
  };

  return (
    <MicrographicsLayout variant="dark" fullWidth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/horses">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-white tracking-tight">{mockHorse.name}</h1>
              <Badge variant={mockHorse.status === 'active' ? 'success' : 'secondary'}>
                {statusLabels[mockHorse.status]}
              </Badge>
            </div>
            <p className="text-gray-400 mt-1">
              {mockHorse.breed} · {genderLabels[mockHorse.gender]} · {calculateAge(mockHorse.birthDate)}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/horses/${mockHorse.id}/edit`}>
              <Button variant="secondary" className="border-white/20">
                <Edit className="w-4 h-4" /> Edit
              </Button>
            </Link>
            <Button variant="ghost" className="text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Photo Gallery */}
              <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-white">Photo Gallery</h2>
                  <Button variant="ghost" size="sm" className="text-pink-500" onClick={() => setActiveTab('photos')}>
                    <Camera className="w-4 h-4" /> View All ({mockPhotos.length})
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {mockPhotos.slice(0, 4).map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-all hover:scale-105"
                      onClick={() => setActiveTab('photos')}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Info */}
              <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h2 className="text-lg font-semibold text-white mb-5">Basic Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Breed', value: mockHorse.breed },
                    { label: 'Gender', value: genderLabels[mockHorse.gender] },
                    { label: 'Color', value: mockHorse.color },
                    { label: 'Age', value: calculateAge(mockHorse.birthDate) },
                    { label: 'Microchip', value: mockHorse.microchip, mono: true },
                    { label: 'Registration No.', value: mockHorse.registrationNo, mono: true },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className={`text-white font-medium ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                {mockHorse.description && (
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Notes</p>
                    <p className="text-gray-300">{mockHorse.description}</p>
                  </div>
                )}
              </div>

              {/* Location & Owner */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(225, 46, 109, 0.2)' }}>
                      <MapPin className="w-5 h-5 text-pink-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Location</h2>
                  </div>
                  <p className="text-white font-medium">{mockHorse.stableLocation}</p>
                </div>
                <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.2)' }}>
                      <User className="w-5 h-5 text-purple-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Owner</h2>
                  </div>
                  <p className="text-white font-medium">{mockHorse.owner.name}</p>
                  <p className="text-sm text-gray-400">{mockHorse.owner.email}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Stats */}
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.15), rgba(168, 85, 247, 0.1))', border: '1px solid rgba(225, 46, 109, 0.3)' }}>
                <h3 className="text-lg font-semibold text-white mb-5">Quick Stats</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Medical Records', value: mockMedicalRecords.length, color: '#10B981' },
                    { label: 'Health Data', value: mockHealthData.length, color: '#F59E0B' },
                    { label: 'Activities', value: mockCommercialActivities.length, color: '#A855F7' },
                    { label: 'Photos', value: mockPhotos.length, color: '#E12E6D' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-gray-300">{stat.label}</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: `${stat.color}20`, color: stat.color }}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance */}
              <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-lg font-semibold text-white">Insurance</h3>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="text-sm text-gray-400 mb-1">{mockInsurance.provider}</p>
                <p className="text-white font-mono font-medium">{mockInsurance.policyNo}</p>
                <p className="text-sm text-gray-400 mt-3">
                  Valid until {formatDate(mockInsurance.endDate)}
                </p>
              </div>

              {/* Recent Medical */}
              <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent Medical</h3>
                  <Link href={`/horses/${mockHorse.id}/medical`}>
                    <Button variant="ghost" size="sm" className="text-pink-500">
                      View all <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {mockMedicalRecords.slice(0, 2).map((record) => (
                    <div key={record.id} className="p-4 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                      <p className="text-sm text-white font-medium">{record.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(record.recordDate)} · {record.veterinarian}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Vitals */}
              <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h3 className="text-lg font-semibold text-white mb-5">Latest Vitals</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(225, 46, 109, 0.15)' }}>
                      <Scale className="w-6 h-6 text-pink-500" />
                    </div>
                    <p className="text-2xl font-bold text-white">{mockHealthData[0].weight}</p>
                    <p className="text-xs text-gray-500">kg</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-2xl font-bold text-white">{mockHealthData[0].heartRate}</p>
                    <p className="text-xs text-gray-500">bpm</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
                      <Thermometer className="w-6 h-6 text-amber-500" />
                    </div>
                    <p className="text-2xl font-bold text-white">{mockHealthData[0].temperature}</p>
                    <p className="text-xs text-gray-500">°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="rounded-2xl p-6" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Images className="w-6 h-6 text-pink-500" />
                Photo Gallery
              </h2>
              <Button variant="gradient">
                <Camera className="w-4 h-4" /> Upload Photos
              </Button>
            </div>
            <Gallery
              photos={mockPhotos}
              horseId={mockHorse.id}
              readOnly={false}
            />
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="rounded-2xl p-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Medical Records</h2>
              <Button className="shadow-lg">
                <Stethoscope className="w-4 h-4" /> Add Record
              </Button>
            </div>
            <div className="space-y-4">
              {mockMedicalRecords.map((record) => (
                <div key={record.id} className="flex items-start gap-4 p-5 rounded-xl transition-all hover:bg-white/5" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                    <Stethoscope className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="success">{medicalTypeLabels[record.recordType]}</Badge>
                      <span className="text-sm text-gray-400">{formatDate(record.recordDate)}</span>
                    </div>
                    <p className="text-white font-medium mb-1">{record.description}</p>
                    <p className="text-sm text-gray-400">Vet: {record.veterinarian}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="rounded-2xl p-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Health Data</h2>
              <Button className="shadow-lg">
                <Activity className="w-4 h-4" /> Add Data
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Date</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Weight (kg)</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Heart Rate (bpm)</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Temp (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHealthData.map((data) => (
                    <tr key={data.id} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <td className="py-4 px-4 text-white">{formatDate(data.recordDate)}</td>
                      <td className="py-4 px-4 text-white font-mono">{data.weight}</td>
                      <td className="py-4 px-4 text-white font-mono">{data.heartRate}</td>
                      <td className="py-4 px-4 text-white font-mono">{data.temperature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'feeding' && (
          <div className="rounded-2xl p-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Feeding Records</h2>
              <Button className="shadow-lg">
                <Utensils className="w-4 h-4" /> Add Record
              </Button>
            </div>
            <div className="space-y-4">
              {mockFeedingRecords.map((record) => (
                <div key={record.id} className="flex items-center gap-4 p-5 rounded-xl" style={{ background: 'rgba(225, 46, 109, 0.1)', border: '1px solid rgba(225, 46, 109, 0.2)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(225, 46, 109, 0.2)' }}>
                    <Utensils className="w-6 h-6 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{record.feedType}</p>
                    <p className="text-sm text-gray-400">{record.quantity} {record.unit} · {record.notes}</p>
                  </div>
                  <span className="text-sm text-gray-400">{formatDate(record.feedDate)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="rounded-2xl p-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Commercial Activities</h2>
              <Button className="shadow-lg">
                <ShoppingBag className="w-4 h-4" /> Add Activity
              </Button>
            </div>
            <div className="space-y-4">
              {mockCommercialActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
                    <ShoppingBag className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="warning">{activityTypeLabels[activity.activityType]}</Badge>
                      <span className="text-sm text-gray-400">{formatDate(activity.activityDate)}</span>
                    </div>
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-400 mt-1">{activity.result}</p>
                    {activity.prizeMoney && (
                      <p className="text-sm font-medium mt-2" style={{ color: '#10B981' }}>
                        Prize: ${activity.prizeMoney.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Insurance Information</h2>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Provider', value: mockInsurance.provider },
                  { label: 'Policy No.', value: mockInsurance.policyNo, mono: true },
                  { label: 'Start Date', value: formatDate(mockInsurance.startDate) },
                  { label: 'End Date', value: formatDate(mockInsurance.endDate) },
                  { label: 'Coverage Amount', value: `$${mockInsurance.coverageAmount.toLocaleString()}` },
                  { label: 'Premium', value: `$${mockInsurance.premium.toLocaleString()}` },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className={`text-white font-medium ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Button variant="secondary" className="w-full">Update Insurance</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MicrographicsLayout>
  );
}
