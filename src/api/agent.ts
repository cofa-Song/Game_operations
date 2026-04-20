import { ApiResponse, PaginatedResponse } from '@/types'
import { Agent, AgentSearchParams, UpdateAgentParams, CreateAgentParams } from '@/types/agent'
import { mockAgents } from '@/mocks/agent'

const SIMULATE_DELAY = 500
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const agentApi = {
  async getAgents(params: AgentSearchParams): Promise<ApiResponse<PaginatedResponse<Agent>>> {
    await delay(SIMULATE_DELAY)

    let filtered = [...mockAgents]

    if (params.q) {
      const q = params.q.toLowerCase()
      switch (params.search_type) {
        case 'uid':
          filtered = filtered.filter(a => a.uid.toLowerCase().includes(q))
          break
        case 'username':
          filtered = filtered.filter(a => a.username.toLowerCase().includes(q))
          break
        case 'promo_code':
          filtered = filtered.filter(a => a.promo_code.toLowerCase().includes(q))
          break
      }
    }

    if (params.identity) {
      filtered = filtered.filter(a => a.identity === params.identity)
    }

    if (params.status) {
      filtered = filtered.filter(a => a.status === params.status)
    }

    if (params.start_time) {
      const start = new Date(params.start_time).getTime()
      filtered = filtered.filter(a => new Date(a.created_at).getTime() >= start)
    }

    if (params.end_time) {
      const end = new Date(params.end_time).getTime()
      filtered = filtered.filter(a => new Date(a.created_at).getTime() <= end)
    }

    const total = filtered.length
    const startIdx = (params.page - 1) * params.page_size
    const endIdx = startIdx + params.page_size
    const items = filtered.slice(startIdx, endIdx)

    return {
      code: 0,
      msg: 'success',
      data: {
        items,
        total,
        page: params.page,
        pageSize: params.page_size
      }
    }
  },

  async createAgent(params: CreateAgentParams): Promise<ApiResponse<Agent>> {
    await delay(SIMULATE_DELAY)
    const newAgent: Agent = {
        ...params,
        id: (mockAgents.length + 1).toString(),
        uid: (10000 + mockAgents.length + 1).toString(),
        path: `平台 > ${params.username}`,
        commission_wallet: 0,
        promo_wallet: 0,
        sub_agent_count: 0,
        direct_player_count: 0,
        created_at: new Date().toISOString()
    }
    mockAgents.unshift(newAgent)
    return { code: 0, msg: 'success', data: newAgent }
  },

  async updateAgent(params: UpdateAgentParams): Promise<ApiResponse<void>> {
    await delay(SIMULATE_DELAY)
    const index = mockAgents.findIndex(a => a.id === params.id)
    if (index === -1) return { code: 404, msg: 'Agent not found' }

    console.log(`[Audit] Update Agent ${params.id}:`, params, `Reason: ${params.change_reason}`)
    mockAgents[index] = { ...mockAgents[index], ...params }
    return { code: 0, msg: 'success' }
  },

  async toggleStatus(id: string, status: string): Promise<ApiResponse<void>> {
    await delay(SIMULATE_DELAY)
    const agent = mockAgents.find(a => a.id === id)
    if (!agent) return { code: 404, msg: 'Agent not found' }

    agent.status = status as any
    console.log(`[Audit] Toggle Status ${id} -> ${status}`)
    return { code: 0, msg: 'success' }
  },

  async adjustPromoWallet(id: string, amount: number, reason: string): Promise<ApiResponse<void>> {
    await delay(SIMULATE_DELAY)
    const agent = mockAgents.find(a => a.id === id)
    if (!agent) return { code: 404, msg: 'Agent not found' }

    agent.promo_wallet += amount
    console.log(`[Audit] Adjust Promo Wallet ${id}: ${amount}. Reason: ${reason}`)
    return { code: 0, msg: 'success' }
  }
}
