import { useQuery, useQueryClient } from '@tanstack/react-query';
import { uploadApi } from '../lib/api';
import { buildApiUrl } from '../lib/apiConfig';

// Query keys
export const mediaKeys = {
  all: ['media'] as const,
  lists: () => [...mediaKeys.all, 'list'] as const,
};

// Media item interface
export interface MediaItem {
  url: string;
  filename: string;
  size: number;
  uploadedAt: string;
  modifiedAt: string;
  fullUrl: string; // Full URL with base path
}

// Convert server media item to client format
const formatMediaItem = (item: any): MediaItem => ({
  ...item,
  fullUrl: buildApiUrl(item.url),
});

// Hook to get all media items
export const useMediaLibrary = () => {
  return useQuery({
    queryKey: mediaKeys.lists(),
    queryFn: async () => {
      const response = await uploadApi.getMediaList();
      if (response.success && response.data) {
        return response.data.map(formatMediaItem);
      }
      throw new Error(response.message || 'Failed to fetch media library');
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to invalidate media library cache (call after upload)
export const useInvalidateMediaLibrary = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
  };
};

