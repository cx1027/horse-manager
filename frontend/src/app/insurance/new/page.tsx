'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import { ArrowLeft, Save, Shield, Calendar, DollarSign, Bell } from 'lucide-react';
import Link from 'next/link';

export default function NewInsurancePage() {
  const router = useRouter();
  const [isSubmitting] = useState(false);
  const formData = { provider: '', policyNo: '', startDate: '', endDate: '', coverageAmount: '', premium: '', coverage: '', status: 'active', renewalReminder: true };

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
            <h1 className="text-4xl font-bold text-black tracking-tight">Add Insurance</h1>
            <p className="text-gray-500 mt-1">Register insurance for a horse</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Policy Details */}
            <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.1))' }}>
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Policy Details</h2>
                  <p className="text-sm text-gray-500">Insurance company and policy information</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Select label="Horse *" name="horseId" options={[{ value: '', label: 'Select horse...' }]} required />
                <Input label="Provider *" name="provider" placeholder="e.g. China Pacific Insurance" required />
                <Input label="Policy No. *" name="policyNo" placeholder="e.g. PI20240001" required />
                <Select label="Status" name="status" value={formData.status} options={[
                  { value: 'active', label: 'Active' },
                  { value: 'expired', label: 'Expired' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]} />
                <div className="relative">
                  <Calendar className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <DatePicker label="Start Date *" name="startDate" required />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <DatePicker label="End Date *" name="endDate" required />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Coverage Amount ($)" name="coverageAmount" type="number" step="0.01" placeholder="e.g. 500000" className="pl-10" />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
                  <Input label="Premium ($)" name="premium" type="number" step="0.01" placeholder="e.g. 15000" className="pl-10" />
                </div>
              </div>

              <div className="mt-5">
                <Textarea label="Coverage Scope" name="coverage" placeholder="Detailed coverage information..." rows={3} />
              </div>
            </div>

            {/* Reminder Settings */}
            <div className="rounded-2xl p-6" style={{ background: '#F8F8F8', border: '2px solid #E5E5E5' }}>
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-black">Reminder Settings</h3>
              </div>
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl transition-colors hover:bg-white" style={{ background: '#FFFFFF' }}>
                <input type="checkbox" name="renewalReminder" defaultChecked className="w-5 h-5 rounded" style={{ accentColor: '#E12E6D' }} />
                <div>
                  <span className="text-black font-medium">Enable renewal reminder</span>
                  <p className="text-sm text-gray-500 mt-0.5">Send email reminders 30/7/1 days before expiry</p>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Button type="button" variant="secondary" className="px-6" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="shadow-lg px-8" isLoading={isSubmitting}>
                <Save className="w-4 h-4" /> Save Insurance
              </Button>
            </div>
          </div>
        </form>
      </div>
    </MicrographicsLayout>
  );
}
