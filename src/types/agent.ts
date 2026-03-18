export type AgentIdentity = 'ADMIN' | 'MASTER' | 'SUB' | 'ASSISTANT'
export type AgentStatus = 'NORMAL' | 'LOCKED' | 'FROZEN' | 'DISABLED'

export interface CPAMatrix {
  level: number // Level 1, 2, 3
  member_count: number // Number of members required for this level
  price: number // Price per member at this level
}

export interface Agent {
  id: string
  uid: string
  username: string
  identity: AgentIdentity
  promo_code: string
  path: string
  cpa_price_matrix: CPAMatrix[]
  deposit_commission_rate: number
  commission_wallet: number
  promo_wallet: number
  sub_agent_count: number
  direct_player_count: number
  created_at: string
  status: AgentStatus
  
  // Detail info
  name: string
  phone: string
  contact_info: string
  data_binding_threshold: {
    phone: boolean
  }
  deposit_threshold: number
  flow_threshold: number
  sensitive_data_permission: boolean
  remark: string
  two_fa_enabled: boolean
}

export interface AgentSearchParams {
  q?: string
  search_type: 'username' | 'uid' | 'promo_code'
  identity?: AgentIdentity
  status?: AgentStatus
  start_time?: string
  end_time?: string
  page: number
  page_size: number
}

export interface UpdateAgentParams extends Partial<Omit<Agent, 'id' | 'uid' | 'username' | 'promo_code' | 'path' | 'created_at'>> {
  id: string
  password?: string
  change_reason: string
}

export interface CreateAgentParams extends Omit<Agent, 'id' | 'uid' | 'path' | 'created_at' | 'sub_agent_count' | 'direct_player_count' | 'commission_wallet' | 'promo_wallet'> {
  password: string
}
