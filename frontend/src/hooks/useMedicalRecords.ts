'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { MedicalRecord, MedicalRecordFormData } from '@/types';

export function useMedicalRecords(horseId: string) {
  return useQuery({
    queryKey: ['medical-records', horseId],
    queryFn: () => api.getMedicalRecords(horseId),
    enabled: !!horseId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateMedicalRecord() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: MedicalRecordFormData & { horse: string }) => 
      api.createMedicalRecord(data),
    onSuccess: (_, { horse }) => {
      queryClient.invalidateQueries({ queryKey: ['medical-records', horse] });
    },
  });
}

export function useUpdateMedicalRecord() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MedicalRecord> }) => 
      api.updateMedicalRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-records'] });
    },
  });
}

export function useDeleteMedicalRecord() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => api.deleteMedicalRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-records'] });
    },
  });
}
