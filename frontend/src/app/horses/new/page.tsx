'use client';

import React, { useState } from 'react';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
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
  MapPin,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewHorsePage() {
  const router = useRouter();
  const [isSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    router.push('/horses');
  };

  return (
    <MicrographicsLayout variant="light" fullWidth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/horses">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-gray-100" style={{ background: '#F5F5F5' }}>
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-black tracking-tight">Add Horse</h1>
            <p className="text-gray-500 mt-1">Register a new horse to your stable</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-8 space-y-8">
              {/* Basic Information */}
              <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.15), rgba(168, 85, 247, 0.1))' }}>
                    <Plus className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-black">Basic Information</h2>
                    <p className="text-sm text-gray-500">Horse profile details</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Horse Name *" name="name" placeholder="Enter horse name" required />
                  <Select label="Gender *" name="gender" required options={[{ value: 'male', label: 'Stallion' }, { value: 'female', label: 'Mare' }, { value: 'gelding', label: 'Gelding' }]} />
                  <DatePicker label="Birth Date" name="birthDate" />
                  <Input label="Breed" name="breed" placeholder="e.g. Thoroughbred, Arabian" />
                  <Input label="Color" name="color" placeholder="e.g. Brown, Black, White" />
                  <Input label="Microchip" name="microchip" placeholder="15-digit chip number" />
                  <Input label="Registration No." name="registrationNo" placeholder="Certificate number" />
                  <Select label="Status" name="status" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
                </div>

                <div className="mt-5">
                  <Textarea label="Notes" name="description" placeholder="Additional information about the horse..." rows={4} />
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(225, 46, 109, 0.1)' }}>
                    <MapPin className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-black">Location</h2>
                    <p className="text-sm text-gray-500">Stable location</p>
                  </div>
                </div>
                <Input label="Stable Location" name="stableLocation" placeholder="e.g. Zone A - Stall 1" />
              </div>

              {/* Photos */}
              <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-black">Photos</h2>
                    <p className="text-sm text-gray-500">Upload horse photos</p>
                  </div>
                </div>
                <div className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all hover:border-pink-500 hover:bg-pink-50/30" style={{ borderColor: '#E5E5E5' }}>
                  <input type="file" id="photos" multiple accept="image/*" className="hidden" />
                  <label htmlFor="photos" className="cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.1), rgba(168, 85, 247, 0.1))' }}>
                      <Camera className="w-8 h-8 text-pink-500" />
                    </div>
                    <p className="text-black font-semibold mb-1">Drag & drop or click to upload</p>
                    <p className="text-sm text-gray-500">JPG, PNG, max 10 photos</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Add */}
              <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="text-lg font-bold text-black mb-5">Quick Add</h3>
                <div className="space-y-3">
                  {[
                    { href: '/medical/new', icon: Stethoscope, color: '#10B981', label: 'Medical Record' },
                    { href: '/health/new', icon: Activity, color: '#F59E0B', label: 'Health Data' },
                    { href: '/feeding/new', icon: Utensils, color: '#E12E6D', label: 'Feeding Record' },
                    { href: '/activities/new', icon: ShoppingBag, color: '#A855F7', label: 'Commercial Activity' },
                    { href: '/insurance/new', icon: Shield, color: '#EF4444', label: 'Insurance' },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className="flex items-center gap-3 p-4 rounded-xl transition-all hover:translate-x-1" style={{ background: '#F8F8F8', border: '1px solid transparent' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = item.color + '40'; (e.currentTarget as HTMLElement).style.background = item.color + '10'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; (e.currentTarget as HTMLElement).style.background = '#F8F8F8'; }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)', boxShadow: '0 8px 30px rgba(225, 46, 109, 0.3)' }}>
                <h3 className="text-lg font-bold text-white mb-5">Actions</h3>
                <div className="space-y-3">
                  <Button type="submit" className="w-full bg-white text-pink-600 hover:bg-white/90 shadow-lg" isLoading={isSubmitting}>
                    <Save className="w-4 h-4" /> Save Horse
                  </Button>
                  <Button type="button" variant="secondary" className="w-full border-white/30 text-white hover:bg-white/10" onClick={() => router.push('/horses')}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MicrographicsLayout>
  );
}
