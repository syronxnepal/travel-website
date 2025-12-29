/**
 * Global API Configuration
 * 
 * Provides centralized API URL configuration that can be imported and used
 * across all modules in the application.
 * 
 * Usage:
 *   import { getApiBaseUrl, getApiBaseUrlWithoutPath } from '@/lib/apiConfig';
 *   const apiUrl = getApiBaseUrl(); // Returns: 'http://72.61.151.220/api' or '/api'
 */

/**
 * Determines if the application is running in local development mode
 */
export const isLocalDevelopment = (): boolean => {
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === ''
  );
};

/**
 * Gets the API base URL with the '/api' path included
 * 
 * @returns API base URL (e.g., 'http://72.61.151.220/api' or '/api')
 * 
 * @example
 * ```typescript
 * const apiUrl = getApiBaseUrl();
 * // Local dev: 'http://72.61.151.220/api'
 * // Production: '/api'
 * ```
 */
export const getApiBaseUrl = (): string => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // In local development, use VPS URL
  if (isLocalDevelopment()) {
    return 'http://72.61.151.220/api';
  }

  // In production (hosted on VPS), use relative path
  return '/api';
};

/**
 * Gets the API base URL without the '/api' path
 * Useful for constructing image URLs or other resources
 * 
 * @returns API base URL without path (e.g., 'http://72.61.151.220' or '')
 * 
 * @example
 * ```typescript
 * const baseUrl = getApiBaseUrlWithoutPath();
 * const imageUrl = `${baseUrl}/uploads/image.jpg`;
 * // Local dev: 'http://72.61.151.220/uploads/image.jpg'
 * // Production: '/uploads/image.jpg'
 * ```
 */
export const getApiBaseUrlWithoutPath = (): string => {
  const fullUrl = getApiBaseUrl();
  
  // Remove '/api' suffix if present
  if (fullUrl.endsWith('/api')) {
    return fullUrl.replace('/api', '');
  }
  
  // If it's a relative path, return empty string
  if (fullUrl.startsWith('/')) {
    return '';
  }
  
  return fullUrl;
};

/**
 * Constructs a full URL for a given path
 * Handles both absolute and relative paths
 * 
 * @param path - The path to append (e.g., '/uploads/image.jpg' or '/treks')
 * @returns Full URL
 * 
 * @example
 * ```typescript
 * const imageUrl = buildApiUrl('/uploads/image.jpg');
 * // Local dev: 'http://72.61.151.220/uploads/image.jpg'
 * // Production: '/uploads/image.jpg'
 * ```
 */
export const buildApiUrl = (path: string): string => {
  // If path is already a full URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const baseUrl = getApiBaseUrlWithoutPath();
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
};

// Export the current API base URL as a constant for convenience
// These are evaluated lazily to ensure window is available
export const API_BASE_URL = typeof window !== 'undefined' ? getApiBaseUrl() : '/api';
export const API_BASE_URL_WITHOUT_PATH = typeof window !== 'undefined' ? getApiBaseUrlWithoutPath() : '';

