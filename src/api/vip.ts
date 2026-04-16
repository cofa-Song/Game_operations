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
        rebate_rate: 0
    },
    {
        rank: 1,
        name: '銅牌',
        promotion_desc: '1. 儲值1,000\n2. 流水1,000,000金幣',
        retention_desc: '-',
        promo_deposit: 1000,
        promo_turnover: 1000000,
        is_perpetual: true,
        retain_deposit: 0,
        retain_turnover: 0,
        retain_active_days: 0,
        gift_fee_rate: 0,
        rebate_rate: 0.1
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
        rebate_rate: 0.2
    },
    {
        rank: 3,
        name: '金牌',
        promotion_desc: '1. 儲值5,000\n2. 流水5,000,000金幣',
        retention_desc: '1. 儲值2,500\n2. 流水2,500,000金幣\n3. 每月活躍天數8天',
        promo_deposit: 5000,
        promo_turnover: 5000000,
        is_perpetual: false,
        retain_deposit: 2500,
        retain_turnover: 2500000,
        retain_active_days: 8,
        gift_fee_rate: 1.8,
        rebate_rate: 0.3
    },
    {
        rank: 4,
        name: '白金',
        promotion_desc: '1. 儲值10,000\n2. 流水10,000,000金幣',
        retention_desc: '1. 儲值5,000\n2. 流水5,000,000金幣\n3. 每月活躍天數12天',
        promo_deposit: 10000,
        promo_turnover: 10000000,
        is_perpetual: false,
        retain_deposit: 5000,
        retain_turnover: 5000000,
        retain_active_days: 12,
        gift_fee_rate: 1.6,
        rebate_rate: 0.4
    },
    {
        rank: 5,
        name: '琥珀',
        promotion_desc: '1. 儲值20,000\n2. 流水20,000,000金幣',
        retention_desc: '1. 儲值10,000\n2. 流水10,000,000金幣\n3. 每月活躍天數16天',
        promo_deposit: 20000,
        promo_turnover: 20000000,
        is_perpetual: false,
        retain_deposit: 10000,
        retain_turnover: 10000000,
        retain_active_days: 16,
        gift_fee_rate: 1.3,
        rebate_rate: 0.4
    },
    {
        rank: 6,
        name: '翡翠',
        promotion_desc: '1. 儲值35,000\n2. 流水35,000,000金幣',
        retention_desc: '1. 儲值18,000\n2. 流水18,000,000金幣\n3. 每月活躍天數16天',
        promo_deposit: 35000,
        promo_turnover: 35000000,
        is_perpetual: false,
        retain_deposit: 18000,
        retain_turnover: 18000000,
        retain_active_days: 16,
        gift_fee_rate: 1,
        rebate_rate: 0.5
    },
    {
        rank: 7,
        name: '藍寶石',
        promotion_desc: '1. 儲值55,000\n2. 流水55,000,000金幣',
        retention_desc: '1. 儲值28,000\n2. 流水28,500,000金幣\n3. 每月活躍天數20天',
        promo_deposit: 55000,
        promo_turnover: 55000000,
        is_perpetual: false,
        retain_deposit: 28000,
        retain_turnover: 28500000,
        retain_active_days: 20,
        gift_fee_rate: 0.8,
        rebate_rate: 0.6
    },
    {
        rank: 8,
        name: '紅寶石',
        promotion_desc: '1. 儲值80,000\n2. 流水80,000,000金幣',
        retention_desc: '1. 儲值40,000\n2. 流水40,000,000金幣\n3. 每月活躍天數20天',
        promo_deposit: 80000,
        promo_turnover: 80000000,
        is_perpetual: false,
        retain_deposit: 40000,
        retain_turnover: 40000000,
        retain_active_days: 20,
        gift_fee_rate: 0.6,
        rebate_rate: 0.7
    },
    {
        rank: 9,
        name: '鑽石',
        promotion_desc: '1. 儲值100,000\n2. 流水100,000,000金幣',
        retention_desc: '1. 儲值50,000\n2. 流水50,000,000金幣\n3. 每月活躍天數24天',
        promo_deposit: 100000,
        promo_turnover: 100000000,
        is_perpetual: false,
        retain_deposit: 50000,
        retain_turnover: 50000000,
        retain_active_days: 24,
        gift_fee_rate: 0.3,
        rebate_rate: 0.7
    },
    {
        rank: 10,
        name: '黑耀',
        promotion_desc: '1. 儲值100,000\n2. 流水200,000,000金幣',
        retention_desc: '1. 儲值50,000\n2. 流水100,000,000金幣\n3. 每月活躍天數24天',
        promo_deposit: 100000,
        promo_turnover: 200000000,
        is_perpetual: false,
        retain_deposit: 50000,
        retain_turnover: 100000000,
        retain_active_days: 24,
        gift_fee_rate: 0,
        rebate_rate: 0.8
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
