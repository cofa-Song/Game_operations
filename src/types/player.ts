import { BonusCard, RolloverContainer } from './bonus'

export type PlayerStatus = 'ACTIVE' | 'LOCKED' | 'FROZEN' | 'SUSPENDED'
export type WalletType = 'CASH' | 'BONUS' | 'GAME' | 'SAFE' // 金幣 | 銀幣 | 銅幣 | 保險箱
export type PlayerTagType = 'SYSTEM' | 'CUSTOM'

export interface MemberTag {
    id: number
    name: string
    type: PlayerTagType
    remark: string
    status: 'ACTIVE' | 'INACTIVE'
    member_count: number // Mock
    is_system_default?: boolean // helper to block delete/rename
}

// Deprecated union, switching to string for dynamic tags
export type PlayerTag = string


export interface Wallet {
    type: WalletType
    currency: 'GOLD' | 'SILVER' | 'BRONZE'
    balance: number
    is_locked?: boolean // For SAFE
}

export interface Player {
    id: string
    username: string // 帳號
    display_name: string // 顯示名稱
    phone: string
    status: PlayerStatus
    tags: PlayerTag[]
    vip_level: number
    referrer_id?: string // 推薦人
    agent_name?: string // 代理帳號 (所屬)
    invite_code?: string // 邀請碼
    rtp?: number // RPT (Return To Player)
    register_source: string // 註冊來源 (e.g., SEO, Admin_Manual)
    register_ip: string
    register_at: string
    last_login_at?: string
    last_login_ip?: string

    // Extended Profile
    gender?: 'MALE' | 'FEMALE' | 'UNKNOWN'
    birthday?: string
    email?: string
    is_retention_active?: boolean // 保級判定

    wallets: Wallet[]
    is_online: boolean

    // OPE-202 Bonus Engine
    bonus_queue?: BonusCard[]
    rollover_container?: RolloverContainer

    // Permissions
    is_muted: boolean // 禁言
    is_gift_disabled: boolean // 禁止贈禮

    // Computed/Helper fields for UI
    total_assets?: number // Sum of CASH + SAFE
}

export interface PlayerSearchParams {
    search_type?: 'id' | 'username' | 'phone'
    q?: string // ID / Phone / Username
    affiliation_type?: 'invite_code' | 'referrer_id'
    affiliation_query?: string
    status?: PlayerStatus
    tags?: PlayerTag[]
    register_date_start?: string
    register_date_end?: string
    referrer?: string
    register_ip?: string
    page: number
    page_size: number
}

export interface PlayerAuditLog {
    id: string
    player_id: string
    operator: string
    action: string // 'UPDATE_STATUS', 'UPDATE_INFO', 'ABANDON_BONUS'
    old_value?: any
    new_value?: any
    reason: string
    created_at: string
}

export interface CreatePlayerRequest {
    username: string
    display_name: string
    password?: string // Optional, system generated if empty? Spec says fillable.
    tags: PlayerTag[] // Usually ['TEST'] for admin created
}

export interface UpdatePlayerRequest {
    display_name?: string
    phone?: string
    password?: string
    tags?: PlayerTag[]
    vip_level?: number
    is_muted?: boolean
    is_gift_disabled?: boolean
    gender?: 'MALE' | 'FEMALE' | 'UNKNOWN'
    birthday?: string
    email?: string
    is_retention_active?: boolean
}
