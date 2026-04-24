import type { ApiResponse } from '@/types'
import { useAuthStore } from '@/stores/useAuthStore'
import { createDiscreteApi } from 'naive-ui'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// ── Shared mock utilities ──────────────────────────────────────
/** Simulated network delay for mock API calls. */
export const delay = (ms = 400): Promise<void> => new Promise(r => setTimeout(r, ms))

/**
 * Determines post-approval status for time-limited items.
 * A real backend derives this from scheduled_start on the server side —
 * this helper is mock-only scaffolding and should be removed when
 * replacing mock API files with real HTTP calls.
 */
export const resolveApprovalStatus = (
  item: { is_limited: boolean; scheduled_start?: string }
): 'SCHEDULED' | 'ACTIVE' =>
  item.is_limited && !!item.scheduled_start && new Date(item.scheduled_start) > new Date()
    ? 'SCHEDULED'
    : 'ACTIVE'

// ── HTTP client (used when VITE_USE_MOCK=false) ────────────────
// Safe module-level message instance — does not require a component context.
const { message } = createDiscreteApi(['message'])

interface FetchOptions extends RequestInit {
  skipErrorHandling?: boolean
}

const apiClient = {
  async request<T = any>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const authStore = useAuthStore()
    const { skipErrorHandling = false, ...fetchOptions } = options

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string> || {})
    }

    if (authStore.token) {
      headers['Authorization'] = `Bearer ${authStore.token}`
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers: headers as HeadersInit
      })

      if (!response.ok) {
        if (response.status === 401) {
          authStore.logout()
          window.location.href = '/login'
          throw new Error('Unauthorized')
        }

        if (response.status === 403) {
          throw new Error('Forbidden')
        }

        throw new Error(`HTTP ${response.status}`)
      }

      const data: ApiResponse<T> = await response.json()

      if (data.code !== 0 && !skipErrorHandling) {
        message.error(data.msg)
        throw new Error(data.msg)
      }

      return data.data as T
    } catch (error) {
      if (!skipErrorHandling) {
        const errorMsg = error instanceof Error ? error.message : 'Request failed'
        message.error(errorMsg)
      }
      throw error
    }
  },

  get<T = any>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  },

  post<T = any>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined
    })
  },

  put<T = any>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined
    })
  },

  delete<T = any>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export default apiClient
