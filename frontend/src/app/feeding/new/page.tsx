'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { ArrowLeft, Save, Utensils, Clock, Package } from 'lucide-react';
import Link from 'next/link';

export default function NewFeedingPage() {
  const router = useRouter();
  const [isSubmitting] = useState(false);
  const formData = { feedDate: '', feedType: '', quantity: '', unit: 'kg', notes: '' };

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
            <h1 className="text-4xl font-bold text-black tracking-tight">Add Feeding Record</h1>
            <p className="text-gray-500 mt-1">Record a feeding event</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Feeding Details */}
            <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(225, 46, 109, 0.15), rgba(168, 85, 247, 0.1))' }}>
                  <Utensils className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Feeding Details</h2>
                  <p className="text-sm text-gray-500">Feed type, quantity, and timing</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Select label="Horse *" name="horseId" options={[{ value: '', label: 'Select horse...' }]} required />
                <div className="relative">
                  <Clock className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Feeding Time *" name="feedDate" type="datetime-local" value={formData.feedDate} required />
                </div>
                <div className="relative">
                  <Package className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Feed Type *" name="feedType" placeholder="e.g. Concentrate / Hay" required className="pl-10" />
                </div>
                <div className="relative">
                  <Utensils className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Quantity" name="quantity" type="number" step="0.1" placeholder="e.g. 5" className="pl-10" />
                </div>
                <Select label="Unit" name="unit" value={formData.unit} options={[{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }, { value: 'g', label: 'g' }]} />
              </div>

              <div className="mt-5">
                <Textarea label="Notes" name="notes" placeholder="e.g. Breakfast / Dinner / Snack..." rows={3} />
              </div>
            </div>

            {/* Quick Reference */}
            <div className="rounded-2xl p-6" style={{ background: '#F8F8F8', border: '2px solid #E5E5E5' }}>
              <h3 className="text-lg font-bold text-black mb-4">Daily Feeding Guide</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { meal: 'Breakfast', time: '6:00 AM', icon: '🌅' },
                  { meal: 'Lunch', time: '12:00 PM', icon: '☀️' },
                  { meal: 'Dinner', time: '6:00 PM', icon: '🌆' },
                  { meal: 'Snack', time: '9:00 PM', icon: '🌙' },
                ].map((item) => (
                  <div key={item.meal} className="p-4 rounded-xl text-center" style={{ background: '#FFFFFF' }}>
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="text-sm font-semibold text-black">{item.meal}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
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
