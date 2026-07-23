'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import { ArrowLeft, Save, Activity, Loader2, Heart, Thermometer, Scale } from 'lucide-react';
import Link from 'next/link';

function NewHealthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedHorseId = searchParams?.get('horseId') || '';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData] = useState({
    horseId: preselectedHorseId,
    recordDate: new Date().toISOString().slice(0, 10),
    weight: '',
    heartRate: '',
    bloodPressure: '',
    temperature: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsSubmitting(false);
    router.push('/health');
  };

  return (
    <MicrographicsLayout variant="light" fullWidth>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/health">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-gray-100" style={{ background: '#F5F5F5' }}>
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-black tracking-tight">Add Health Data</h1>
            <p className="text-gray-500 mt-1">Record a health measurement</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Health Data Form */}
            <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.1))' }}>
                  <Activity className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Health Measurements</h2>
                  <p className="text-sm text-gray-500">Weight, heart rate, temperature, etc.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Select label="Horse *" name="horseId" value={formData.horseId} options={[{ value: '', label: 'Select horse...' }]} required />
                <DatePicker label="Date *" name="recordDate" value={formData.recordDate} required />
                <div className="relative">
                  <Scale className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Weight (kg)" name="weight" type="number" step="0.1" placeholder="e.g. 520" className="pl-10" />
                </div>
                <div className="relative">
                  <Heart className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Heart Rate (bpm)" name="heartRate" type="number" min={0} max={300} placeholder="e.g. 38" className="pl-10" />
                </div>
                <Input label="Blood Pressure" name="bloodPressure" placeholder="e.g. 120/80" />
                <div className="relative">
                  <Thermometer className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Temperature (°C)" name="temperature" type="number" step="0.1" placeholder="e.g. 37.8" className="pl-10" />
                </div>
              </div>

              <div className="mt-5">
                <Textarea label="Notes" name="notes" placeholder="Additional notes about the horse's health..." rows={4} />
              </div>
            </div>

            {/* Reference Ranges */}
            <div className="rounded-2xl p-6" style={{ background: '#F8F8F8', border: '2px solid #E5E5E5' }}>
              <h3 className="text-lg font-bold text-black mb-4">Reference Ranges</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Weight', value: '400-700 kg', icon: Scale, color: '#E12E6D' },
                  { label: 'Heart Rate', value: '28-40 bpm', icon: Heart, color: '#EF4444' },
                  { label: 'Temperature', value: '37.5-38.5 °C', icon: Thermometer, color: '#F59E0B' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#FFFFFF' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-sm font-semibold text-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Button type="button" variant="secondary" className="px-6" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="shadow-lg px-8" isLoading={isSubmitting}>
                <Save className="w-4 h-4" /> Save Data
              </Button>
            </div>
          </div>
        </form>
      </div>
    </MicrographicsLayout>
  );
}

export default function NewHealthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    }>
      <NewHealthContent />
    </Suspense>
  );
}
