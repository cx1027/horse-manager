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
  MapPin,
} from 'lucide-react';
import HorseIcon from '@/components/ui/HorseIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditHorsePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = {
    name: 'Thunder',
    gender: 'male',
    birthDate: '2020-03-15',
    breed: 'Thoroughbred',
    color: 'Brown',
    microchip: '985141001234567',
    registrationNo: 'TH20200001',
    status: 'active',
    stableLocation: 'Zone A - Stall 1',
    description: 'An excellent thoroughbred racehorse.',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    router.push('/horses/1');
  };

  return (
    <MicrographicsLayout variant="light" fullWidth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/horses/1">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-gray-100" style={{ background: '#F5F5F5' }}>
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-black tracking-tight">Edit Horse</h1>
            <p className="text-gray-500 mt-1">Update horse information</p>
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
                    <HorseIcon className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-black">Basic Information</h2>
                    <p className="text-sm text-gray-500">Horse profile details</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Horse Name *" name="name" value={formData.name} required />
                  <Select label="Gender *" name="gender" value={formData.gender} options={[{ value: 'male', label: 'Stallion' }, { value: 'female', label: 'Mare' }, { value: 'gelding', label: 'Gelding' }]} />
                  <DatePicker label="Birth Date" name="birthDate" value={formData.birthDate} />
                  <Input label="Breed" name="breed" value={formData.breed} placeholder="e.g. Thoroughbred, Arabian" />
                  <Input label="Color" name="color" value={formData.color} placeholder="e.g. Brown, Black, White" />
                  <Input label="Microchip" name="microchip" value={formData.microchip} placeholder="15-digit chip number" />
                  <Input label="Registration No." name="registrationNo" value={formData.registrationNo} placeholder="Certificate number" />
                  <Select label="Status" name="status" value={formData.status} options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'sold', label: 'Sold' }, { value: 'deceased', label: 'Deceased' }]} />
                </div>

                <div className="mt-5">
                  <Textarea label="Notes" name="description" value={formData.description} placeholder="Additional information..." rows={4} />
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
                <Input label="Stable Location" name="stableLocation" value={formData.stableLocation} placeholder="e.g. Zone A - Stall 1" />
              </div>

              {/* Photos */}
              <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-black">Photo Management</h2>
                    <p className="text-sm text-gray-500">Upload or replace photos</p>
                  </div>
                </div>
                <div className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all hover:border-pink-500 hover:bg-pink-50/30" style={{ borderColor: '#E5E5E5' }}>
                  <input type="file" id="photos" multiple accept="image/*" className="hidden" />
                  <label htmlFor="photos" className="cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.1), rgba(168, 85, 247, 0.1))' }}>
                      <Camera className="w-8 h-8 text-pink-500" />
                    </div>
                    <p className="text-black font-semibold mb-1">Drag & drop or click to upload</p>
                    <p className="text-sm text-gray-500">JPG, PNG supported</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Actions */}
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #E12E6D, #A855F7)', boxShadow: '0 8px 30px rgba(225, 46, 109, 0.3)' }}>
                <h3 className="text-lg font-bold text-white mb-5">Actions</h3>
                <div className="space-y-3">
                  <Button type="submit" className="w-full bg-white text-pink-600 hover:bg-white/90 shadow-lg" isLoading={isSubmitting}>
                    <Save className="w-4 h-4" /> Save Changes
                  </Button>
                  <Button type="button" variant="secondary" className="w-full border-white/30 text-white hover:bg-white/10" onClick={() => router.back()}>
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
