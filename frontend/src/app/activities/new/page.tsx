'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import { ArrowLeft, Save, ShoppingBag, Calendar, Trophy, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function NewActivityPage() {
  const router = useRouter();
  const [isSubmitting] = useState(false);
  const formData = { activityDate: new Date().toISOString().slice(0, 10), activityType: 'race', title: '', description: '', result: '', prizeMoney: '', buyer: '', seller: '', amount: '' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 500));
    router.push('/horses');
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
            <h1 className="text-4xl font-bold text-black tracking-tight">Add Activity</h1>
            <p className="text-gray-500 mt-1">Record races, exhibitions, sales, and more</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Activity Info */}
            <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(225, 46, 109, 0.1))' }}>
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Activity Information</h2>
                  <p className="text-sm text-gray-500">Basic activity details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Select label="Horse *" name="horseId" options={[{ value: '', label: 'Select horse...' }]} required />
                <div className="relative">
                  <Calendar className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <DatePicker label="Date *" name="activityDate" value={formData.activityDate} required />
                </div>
                <Select 
                  label="Type *" 
                  name="activityType" 
                  value={formData.activityType} 
                  options={[
                    { value: 'race', label: 'Race' },
                    { value: 'exhibition', label: 'Exhibition' },
                    { value: 'sale', label: 'Sale' },
                    { value: 'breeding', label: 'Breeding' },
                    { value: 'sponsorship', label: 'Sponsorship' },
                  ]} 
                  required 
                />
                <Input label="Title *" name="title" placeholder="e.g. National Championship" required />
                <div className="md:col-span-2">
                  <Textarea label="Description" name="description" placeholder="Activity details..." rows={3} />
                </div>
              </div>
            </div>

            {/* Result & Amount */}
            <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Result & Financials</h2>
                  <p className="text-sm text-gray-500">Performance and transaction details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="relative">
                  <Trophy className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Result" name="result" placeholder="e.g. 1st Place" className="pl-10" />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Prize ($)" name="prizeMoney" type="number" step="0.01" placeholder="e.g. 50000" className="pl-10" />
                </div>
                <Input label="Buyer" name="buyer" placeholder="For sales only" />
                <Input label="Seller" name="seller" placeholder="For sales only" />
                <div className="md:col-span-2 relative">
                  <DollarSign className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Transaction Amount ($)" name="amount" type="number" step="0.01" placeholder="For sales only" className="pl-10" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Button type="button" variant="secondary" className="px-6" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="shadow-lg px-8" isLoading={isSubmitting}>
                <Save className="w-4 h-4" /> Save Activity
              </Button>
            </div>
          </div>
        </form>
      </div>
    </MicrographicsLayout>
  );
}
