'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MicrographicsLayout from '@/components/layout/MicrographicsLayout';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  ArrowLeft,
  Plus,
  Stethoscope,
  Calendar,
  User,
  Loader2,
  FileText,
  ChevronRight,
  X
} from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

const mockRecords = [
  { id: 1, recordDate: '2024-03-10', recordType: 'vaccination', description: 'Rabies vaccination - Annual rabies shot administered. Horse showed no adverse reactions.', veterinarian: 'Dr. Zhang', nextAppointment: '2025-03-10' },
  { id: 2, recordDate: '2024-02-15', recordType: 'checkup', description: 'Quarterly checkup - All vitals normal. Weight stable at 520kg.', veterinarian: 'Dr. Li', nextAppointment: '' },
  { id: 3, recordDate: '2024-01-20', recordType: 'dental', description: 'Dental checkup and cleaning - Teeth floated and cleaned. No issues found.', veterinarian: 'Dr. Wang', nextAppointment: '2024-07-20' },
  { id: 4, recordDate: '2023-12-05', recordType: 'deworming', description: 'Deworming treatment - Ivermectin administered.', veterinarian: 'Dr. Zhang', nextAppointment: '' },
];

const recordTypeLabels: Record<string, string> = {
  vaccination: 'Vaccination',
  checkup: 'Checkup',
  deworming: 'Deworming',
  dental: 'Dental',
  illness: 'Illness',
  surgery: 'Surgery',
};

const recordTypeColors: Record<string, { bg: string; text: string; border: string }> = {
  vaccination: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981', border: 'rgba(16, 185, 129, 0.3)' },
  checkup: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.3)' },
  deworming: { bg: 'rgba(168, 85, 247, 0.15)', text: '#A855F7', border: 'rgba(168, 85, 247, 0.3)' },
  dental: { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' },
  illness: { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' },
  surgery: { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' },
};

export default function HorseMedicalPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const horseId = params?.id;
  const [records, setRecords] = useState<any[]>(mockRecords);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const user = { name: 'John Doe', email: 'john@example.com', avatar: null };

  return (
    <MicrographicsLayout variant="dark" fullWidth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/horses/${horseId}`}>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white tracking-tight">Medical Records</h1>
            <p className="text-gray-400 mt-1">Horse #{horseId} medical history</p>
          </div>
          <Link href={`/medical/new?horseId=${horseId}`}>
            <Button className="shadow-lg">
              <Plus className="w-4 h-4" /> Add Record
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Records List */}
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-lg font-semibold text-white mb-4">All Records ({records.length})</h2>
            {records.map((record) => (
              <div
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className="cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="p-5 rounded-xl flex items-start gap-4" style={{ 
                  background: selectedRecord?.id === record.id ? 'rgba(225, 46, 109, 0.15)' : '#0A0A0A',
                  border: `1px solid ${selectedRecord?.id === record.id ? 'rgba(225, 46, 109, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`
                }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: recordTypeColors[record.recordType]?.bg || 'rgba(255, 255, 255, 0.1)' }}>
                    <Stethoscope className="w-6 h-6" style={{ color: recordTypeColors[record.recordType]?.text || '#888' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 rounded-lg text-xs font-medium" style={{ background: recordTypeColors[record.recordType]?.bg, color: recordTypeColors[record.recordType]?.text }}>
                        {recordTypeLabels[record.recordType] || record.recordType}
                      </span>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(record.recordDate)}
                      </span>
                    </div>
                    <p className="text-white font-medium truncate">{record.description}</p>
                    {record.veterinarian && (
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {record.veterinarian}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Record Detail */}
          <div className="lg:col-span-5">
            {selectedRecord ? (
              <div className="rounded-2xl p-6 sticky top-8" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Record Details</h2>
                  <button onClick={() => setSelectedRecord(null)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: recordTypeColors[selectedRecord.recordType]?.bg }}>
                    <Stethoscope className="w-8 h-8" style={{ color: recordTypeColors[selectedRecord.recordType]?.text }} />
                  </div>

                  <div className="text-center mb-6">
                    <span className="px-3 py-1 rounded-full text-sm font-medium inline-block" style={{ background: recordTypeColors[selectedRecord.recordType]?.bg, color: recordTypeColors[selectedRecord.recordType]?.text }}>
                      {recordTypeLabels[selectedRecord.recordType]}
                    </span>
                  </div>

                  {[
                    { label: 'Date', value: formatDate(selectedRecord.recordDate), icon: Calendar },
                    { label: 'Veterinarian', value: selectedRecord.veterinarian || 'N/A', icon: User },
                    ...(selectedRecord.nextAppointment ? [{ label: 'Next Appointment', value: formatDate(selectedRecord.nextAppointment), icon: Calendar }] : []),
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                      <item.icon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Description</p>
                    <p className="text-white">{selectedRecord.description}</p>
                  </div>

                  <div className="pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Button variant="secondary" className="w-full">Edit Record</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-8 text-center" style={{ background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select a record to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MicrographicsLayout>
  );
}
