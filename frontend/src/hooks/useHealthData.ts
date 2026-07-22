'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { HealthData, HealthDataFormData } from '@/types';

export function useHealthData(horseId: string) {
  return useQuery({
    queryKey: ['health-data', horseId],
    queryFn: () => api.getHealthData(horseId),
    enabled: !!horseId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useHealthStats(horseId: string) {
  return useQuery({
    queryKey: ['health-stats', horseId],
    queryFn: () => api.getHealthStats(horseId),
    enabled: !!horseId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateHealthData() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: HealthDataFormData & { horse: string }) => 
      api.createHealthData(data),
    onSuccess: (_, { horse }) => {
      queryClient.invalidateQueries({ queryKey: ['health-data', horse] });
      queryClient.invalidateQueries({ queryKey: ['health-stats', horse] });
    },
  });
}
