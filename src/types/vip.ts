export interface VIPLevel {
    rank: number // 0-10
    name: string
    promotion_desc: string // 文字說明
    retention_desc: string // 文字說明

    // Promotion Criteria
    promo_deposit: number // 晉升累計儲值
    promo_turnover: number // 晉升有效投注
    promo_special?: string // 特殊晉升條件 (e.g. 綁定手機號碼)
    bind_data?: 'none' | 'phone' | 'email' // 綁定資料

    // Retention Criteria
    is_perpetual: boolean // 無條件保級
    retain_deposit: number // 月累計儲值
    retain_turnover: number // 月累計流水
    retain_active_days: number // 每月活躍天數

    // Rewards
    gift_fee_rate: number // P2P贈禮手續費 %
    rebate_rate: number // 投注返水 %

    // Assets
    icon_url?: string
    avatar_frame_url?: string
}
