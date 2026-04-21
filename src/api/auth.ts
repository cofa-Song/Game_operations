import apiClient from './client'
import { delay } from '@/mocks/admin'
import type { UserInfo } from '@/types'

// Mock 用戶資料
const mockUsers: Record<string, { password: string; user: UserInfo }> = {
  // ── 新角色帳號 ───────────────────────────────────────────
  boss: {
    password: '123456',
    user: { user_id: 'u-boss', name: '張老闆', role: 'BOSS', permissions: ['*'], email: 'boss@example.com' }
  },
  pm: {
    password: '123456',
    user: { user_id: 'u-pm', name: '林小明', role: 'PM', permissions: ['*'], email: 'pm@example.com' }
  },
  operator: {
    password: '123456',
    user: { user_id: 'u-op', name: '陳小萱', role: 'OPERATOR', permissions: [], email: 'operator@example.com' }
  },
  devops: {
    password: '123456',
    user: { user_id: 'u-devops', name: '李志明', role: 'DEVOPS', permissions: [], email: 'devops@example.com' }
  },
  finance: {
    password: '123456',
    user: { user_id: 'u-fin', name: '王大財', role: 'FINANCE', permissions: [], email: 'finance@example.com' }
  },
  cs: {
    password: '123456',
    user: { user_id: 'u-cs', name: '劉小美', role: 'CS', permissions: [], email: 'cs@example.com' }
  },
  tech: {
    password: '123456',
    user: { user_id: 'u-tech', name: '吳建宏', role: 'TECH', permissions: [], email: 'tech@example.com' }
  },
  // ── 舊帳號（保留相容）────────────────────────────────────
  dev_admin: {
    password: 'dev123456',
    user: { user_id: 'admin-001', name: '技術開發', role: 'DEVELOPER', permissions: ['*'], email: 'dev@example.com' }
  },
  manager_admin: {
    password: 'manager123456',
    user: { user_id: 'admin-002', name: '營運主管', role: 'MANAGER', permissions: [], email: 'manager@example.com' }
  },
  service_user1: {
    password: 'user123456',
    user: { user_id: 'admin-003', name: '李小美', role: 'USER', permissions: [], groups: ['group-001'], email: 'lee@example.com' }
  }
}

export const authApi = {
  async login(username: string, password: string) {
    // 模擬 API 延遲
    await delay(500)

    const userCredentials = mockUsers[username]

    if (!userCredentials || userCredentials.password !== password) {
      throw new Error('Invalid credentials')
    }

    // 生成 mock token
    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      token,
      user: userCredentials.user
    }
  },

  logout() {
    return apiClient.post('/v2/auth/logout')
  },

  refreshToken() {
    return apiClient.post<{ token: string }>('/v2/auth/refresh-token')
  }
}

