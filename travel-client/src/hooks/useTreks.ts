import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trekApi, uploadApi } from '../lib/api';
import { buildApiUrl } from '../lib/apiConfig';
import { useToast } from './useToast';
import { useNavigate } from 'react-router-dom';

// Query keys
export const trekKeys = {
  all: ['treks'] as const,
  lists: () => [...trekKeys.all, 'list'] as const,
  list: (filters: string) => [...trekKeys.lists(), { filters }] as const,
  details: () => [...trekKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...trekKeys.details(), id] as const,
};

// Trek interface
export interface Trek {
  id: number;
  image: string;
  title: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  duration: string;
  price: string;
  originalPrice?: string;
  rating: string;
  reviewCount: number;
  description: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    activities?: string[];
    meals?: string[];
    accommodation?: string;
    highlights?: string[];
  }>;
  tourInfo?: Array<{
    icon: string;
    title: string;
    value: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  featured: boolean;
  createdAt?: string;
}

// Convert server trek to client format
const formatTrek = (trek: any): Trek => ({
  id: trek.id,
  image: trek.image || '',
  title: trek.title || '',
  location: trek.location || '',
  difficulty: trek.difficulty || 'Moderate',
  duration: trek.duration || '',
  price: trek.price || '',
  originalPrice: trek.originalPrice,
  rating: trek.rating || '0',
  reviewCount: trek.reviewCount || 0,
  description: trek.description || '',
  highlights: trek.highlights || [],
  included: trek.included || [],
  excluded: trek.excluded || [],
  itinerary: trek.itinerary || [],
  tourInfo: trek.tourInfo || [],
  faqs: trek.faqs || [],
  featured: trek.featured || false,
  createdAt: trek.createdAt,
});

// Hook to get all treks
export const useTreks = () => {
  return useQuery({
    queryKey: trekKeys.lists(),
    queryFn: async () => {
      const response = await trekApi.getAll();
      if (response.success && response.data) {
        return response.data.map(formatTrek);
      }
      throw new Error(response.message || 'Failed to fetch treks');
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

// Hook to get single trek
export const useTrek = (id: string | number | undefined) => {
  return useQuery({
    queryKey: trekKeys.detail(id!),
    queryFn: async () => {
      if (!id) throw new Error('Trek ID is required');
      const response = await trekApi.getById(id);
      if (response.success && response.data) {
        return formatTrek(response.data);
      }
      throw new Error(response.message || 'Failed to fetch trek');
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook to create trek
export const useCreateTrek = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: Partial<Trek>) => {
      const response = await trekApi.create(data);
      if (response.success && response.data) {
        return formatTrek(response.data);
      }
      throw new Error(response.message || 'Failed to create trek');
    },
    onSuccess: (data) => {
      // Invalidate and refetch treks list
      queryClient.invalidateQueries({ queryKey: trekKeys.lists() });
      // Add new trek to cache
      queryClient.setQueryData(trekKeys.detail(data.id), data);
      showToast('Trek created successfully', 'success');
      navigate('/cms/treks/manage');
    },
    onError: (error: Error) => {
      showToast(error.message || 'Failed to create trek', 'error');
    },
  });
};

// Hook to update trek
export const useUpdateTrek = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: Partial<Trek> }) => {
      const response = await trekApi.update(id, data);
      if (response.success && response.data) {
        return formatTrek(response.data);
      }
      throw new Error(response.message || 'Failed to update trek');
    },
    onSuccess: (data, variables) => {
      // Update the specific trek in cache
      queryClient.setQueryData(trekKeys.detail(variables.id), data);
      // Invalidate and refetch treks list
      queryClient.invalidateQueries({ queryKey: trekKeys.lists() });
      showToast('Trek updated successfully', 'success');
      navigate('/cms/treks/manage');
    },
    onError: (error: Error) => {
      showToast(error.message || 'Failed to update trek', 'error');
    },
  });
};

// Hook to delete trek
export const useDeleteTrek = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await trekApi.delete(id);
      if (response.success) {
        return id;
      }
      throw new Error(response.message || 'Failed to delete trek');
    },
    onSuccess: (id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: trekKeys.detail(id) });
      // Invalidate and refetch treks list
      queryClient.invalidateQueries({ queryKey: trekKeys.lists() });
      showToast('Trek deleted successfully', 'success');
    },
    onError: (error: Error) => {
      showToast(error.message || 'Failed to delete trek', 'error');
    },
  });
};

// Hook to upload image
export const useUploadImage = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await uploadApi.uploadImage(file);
      if (response.success && response.data) {
        // If URL is already absolute, use it as-is
        if (response.data.url.startsWith('http')) {
          return response.data.url;
        }
        
        // Otherwise, construct the full URL using global API config
        return buildApiUrl(response.data.url);
      }
      throw new Error(response.message || 'Failed to upload image');
    },
    onSuccess: () => {
      // Invalidate media library cache to show newly uploaded image
      queryClient.invalidateQueries({ queryKey: ['media', 'list'] });
      showToast('Image uploaded successfully', 'success');
    },
    onError: (error: Error) => {
      showToast(error.message || 'Failed to upload image', 'error');
    },
  });
};

