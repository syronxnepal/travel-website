// Import global API configuration
import { API_BASE_URL, getApiBaseUrl } from './apiConfig';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  cached?: boolean;
}

// API error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base fetch function
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  // Get API base URL dynamically (in case window wasn't available at module load)
  const baseUrl = typeof window !== 'undefined' ? getApiBaseUrl() : API_BASE_URL;
  const fullUrl = `${baseUrl}${endpoint}`;
  
  // Debug logging in development
  if (import.meta.env.DEV) {
    console.log(`[API] ${options.method || 'GET'} ${fullUrl}`, { baseUrl, endpoint });
  }
  
  // Build headers conditionally - don't include Content-Type for FormData
  const headers: HeadersInit = {
    ...(!(options.body instanceof FormData) && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      message: `HTTP error! status: ${response.status}` 
    }));
    throw new ApiError(
      error.message || `HTTP error! status: ${response.status}`,
      response.status,
      error
    );
  }

  return response.json();
}

// Trek API functions
export const trekApi = {
  getAll: () => apiFetch<any[]>('/treks'),
  
  getById: (id: string | number) => apiFetch<any>(`/treks/${id}`),
  
  create: (data: any) => apiFetch<any>('/treks', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string | number, data: any) => apiFetch<any>(`/treks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: string | number) => apiFetch<{ message: string }>(`/treks/${id}`, {
    method: 'DELETE',
  }),
};

// Upload API functions
export const uploadApi = {
  uploadImage: (file: File) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('image', file);

    return fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Upload failed' }));
        throw new ApiError(error.message || 'Upload failed', response.status);
      }
      return response.json();
    });
  },

  uploadImages: (files: File[]) => {
    const token = getAuthToken();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    return fetch(`${API_BASE_URL}/upload/images`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Upload failed' }));
        throw new ApiError(error.message || 'Upload failed', response.status);
      }
      return response.json();
    });
  },

  getMediaList: () => {
    return apiFetch<Array<{
      url: string;
      filename: string;
      size: number;
      uploadedAt: string;
      modifiedAt: string;
    }>>('/upload/list');
  },
};

