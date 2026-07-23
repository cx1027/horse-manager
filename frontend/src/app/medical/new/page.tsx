'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import { ArrowLeft, Save, Stethoscope, Loader2, Calendar, User } from 'lucide-react';
import Link from 'next/link';

function NewMedicalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedHorseId = searchParams?.get('horseId') || '';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData] = useState({
    horseId: preselectedHorseId,
    recordDate: new Date().toISOString().slice(0, 10),
    recordType: 'vaccination',
    description: '',
    veterinarian: '',
    nextAppointment: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsSubmitting(false);
    if (formData.horseId) router.push(`/horses/${formData.horseId}/medical`);
    else router.push('/horses');
  };

  return (
    <MicrographicsLayout variant="light" fullWidth>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/horses">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-gray-100" style={{ background: '#F5F5F5' }}>
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-black tracking-tight">Add Medical Record</h1>
            <p className="text-gray-500 mt-1">Record a medical event</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Medical Details */}
            <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.1))' }}>
                  <Stethoscope className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Medical Details</h2>
                  <p className="text-sm text-gray-500">Treatment information</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Select label="Horse *" name="horseId" value={formData.horseId} options={[{ value: '', label: 'Select horse...' }]} required />
                <div className="relative">
                  <Calendar className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <DatePicker label="Date *" name="recordDate" value={formData.recordDate} required />
                </div>
                <Select 
                  label="Record Type *" 
                  name="recordType" 
                  value={formData.recordType} 
                  options={[
                    { value: 'vaccination', label: 'Vaccination' },
                    { value: 'checkup', label: 'Checkup' },
                    { value: 'illness', label: 'Illness' },
                    { value: 'deworming', label: 'Deworming' },
                    { value: 'dental', label: 'Dental' },
                    { value: 'surgery', label: 'Surgery' },
                  ]} 
                  required 
                />
                <div className="relative">
                  <User className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Veterinarian" name="veterinarian" placeholder="e.g. Dr. Smith" className="pl-10" />
                </div>
                <div className="md:col-span-2">
                  <Input label="Next Appointment" name="nextAppointment" type="datetime-local" value={formData.nextAppointment} />
                </div>
              </div>

              <div className="mt-5">
                <Textarea label="Description" name="description" placeholder="Detailed description of treatment, medication, dosage..." rows={5} />
              </div>
            </div>

            {/* Quick Info */}
            <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.05))', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <h3 className="text-lg font-bold text-black mb-4">Record Types Guide</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { type: 'Vaccination', desc: 'Preventive shots' },
                  { type: 'Checkup', desc: 'Routine examination' },
                  { type: 'Illness', desc: 'Treatment for sickness' },
                  { type: 'Deworming', desc: 'Parasite treatment' },
                  { type: 'Dental', desc: 'Teeth care' },
                  { type: 'Surgery', desc: 'Surgical procedures' },
                ].map((item) => (
                  <div key={item.type} className="p-3 rounded-xl" style={{ background: '#FFFFFF' }}>
                    <p className="text-sm font-semibold text-black">{item.type}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
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
                <Save className="w-4 h-4" /> Save Record
              </Button>
            </div>
          </div>
        </form>
      </div>
    </MicrographicsLayout>
  );
}

export default function NewMedicalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    }>
      <NewMedicalContent />
    </Suspense>
  );
}
