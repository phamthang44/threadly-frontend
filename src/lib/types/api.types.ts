/**
 * API Response Types
 * Matches the backend ApiResult structure
 */

/**
 * API Response Meta Information
 */
export interface ApiMeta {
  serverTime?: number;
  apiVersion?: string;
  traceId?: string;
  message?: string;
  nextCursor?: string;
  hasNextPage?: boolean;
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  sort?: string;
  filter?: Record<string, unknown>;
}

/**
 * API Error Detail
 */
export interface ApiErrorDetail {
  code: string;
  message: string;
  traceId?: string;
  details?: unknown;
}

/**
 * Standard API Response Wrapper
 * Matches the backend ApiResult<T> structure
 */
export interface ApiResult<T = unknown> {
  data?: T;
  meta?: ApiMeta;
  error?: ApiErrorDetail;
}

/**
 * Axios Response with ApiResult
 */
export interface ApiResponse<T = unknown> {
  data: ApiResult<T>;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
