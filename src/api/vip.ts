import { VIPLevel } from '../types/vip'

const mockVIPLevels: VIPLevel[] = [
    {
        rank: 0,
        name: '鐵牌',
        promotion_desc: '新註冊',
        retention_desc: '-',
        promo_deposit: 0,
        promo_turnover: 0,
        is_perpetual: true,
        retain_deposit: 0,
        retain_turnover: 0,
        retain_active_days: 0,
        gift_fee_rate: 0,
        rebate_rate: 0.1
    },
    {
        rank: 1,
        name: '銅牌',
        promotion_desc: '1. 儲值1,000 2. 流水1,000,000金幣',
        retention_desc: '-',
        promo_deposit: 1000,
        promo_turnover: 1000000,
        is_perpetual: true,
        retain_deposit: 0,
        retain_turnover: 0,
        retain_active_days: 0,
        gift_fee_rate: 0,
        rebate_rate: 0.2
    },
    {
        rank: 2,
        name: '銀牌',
        promotion_desc: '綁定手機號碼',
        retention_desc: '-',
        promo_deposit: 0,
        promo_turnover: 0,
        promo_special: '綁定手機號碼',
        is_perpetual: true,
        retain_deposit: 0,
        retain_turnover: 0,
        retain_active_days: 0,
        gift_fee_rate: 2,
        rebate_rate: 0.3
    },
    {
        rank: 3,
        name: '金牌',
        promotion_desc: '1. 儲值5,000 2. 流水5,000,000金幣',
        retention_desc: '1. 儲值2,500 2. 流水2,500,000金幣 3. 每月活躍天數8天',
        promo_deposit: 5000,
        promo_turnover: 5000000,
        is_perpetual: false,
        retain_deposit: 2500,
        retain_turnover: 2500000,
        retain_active_days: 8,
        gift_fee_rate: 1.8,
        rebate_rate: 0.4
    },
    {
        rank: 4,
        name: '白金牌',
        promotion_desc: '1. 儲值10,000 2. 流水10,000,000金幣',
        retention_desc: '1. 儲值5,000 2. 流水5,000,000金幣 3. 每月活躍天數12天',
        promo_deposit: 10000,
        promo_turnover: 10000000,
        is_perpetual: false,
        retain_deposit: 5000,
        retain_turnover: 5000000,
        retain_active_days: 12,
        gift_fee_rate: 1.5,
        rebate_rate: 0.5
    },
    {
        rank: 5,
        name: '翡翠牌',
        promotion_desc: '1. 儲值10,000 2. 流水25,000,000金幣',
        retention_desc: '1. 儲值5,000 2. 流水12,500,000金幣 3. 每月活躍天數16天',
        promo_deposit: 10000,
        promo_turnover: 25000000,
        is_perpetual: false,
        retain_deposit: 5000,
        retain_turnover: 12500000,
        retain_active_days: 16,
        gift_fee_rate: 1,
        rebate_rate: 0.6
    },
    {
        rank: 6,
        name: '鑽石牌',
        promotion_desc: '1. 儲值10,000 2. 流水35,000,000金幣',
        retention_desc: '1. 儲值5,000 2. 流水17,500,000金幣 3. 每月活躍天數20天',
        promo_deposit: 10000,
        promo_turnover: 35000000,
        is_perpetual: false,
        retain_deposit: 5000,
        retain_turnover: 17500000,
        retain_active_days: 20,
        gift_fee_rate: 0.5,
        rebate_rate: 0.7
    }
]

export const vipApi = {
    getVIPLevels: async () => {
        return { code: 0, data: mockVIPLevels, msg: 'success' }
    },
    updateVIPLevel: async (level: VIPLevel) => {
        const index = mockVIPLevels.findIndex(l => l.rank === level.rank)
        if (index !== -1) {
            mockVIPLevels[index] = { ...level }
        }
        return { code: 0, msg: 'success' }
    }
}
