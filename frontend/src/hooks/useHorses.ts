'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { Horse, HorseFilters, HorseFormData } from '@/types';

export function useHorses(filters?: HorseFilters) {
  return useQuery({
    queryKey: ['horses', filters],
    queryFn: () => api.getHorses(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useHorse(id: string) {
  return useQuery({
    queryKey: ['horse', id],
    queryFn: () => api.getHorse(id),
    enabled: !!id,
  });
}

export function useCreateHorse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Horse>) => api.createHorse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horses'] });
    },
  });
}

export function useUpdateHorse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Horse> }) => 
      api.updateHorse(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['horses'] });
      queryClient.invalidateQueries({ queryKey: ['horse', id] });
    },
  });
}

export function useDeleteHorse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => api.deleteHorse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['horses'] });
    },
  });
}
