import { ApiResponse } from '@/types'

export interface PlatformPricing {
    isEnabled: boolean
    price: number
    productId?: string // for iOS/Android
}

export interface Commodity {
    id: string // Internal System ID
    name: string
    imageUrl: string
    badgeId?: string | null
    type: 'REGULAR' | 'MONTHLY' | 'LIMITED' | 'FIRST_DEPOSIT'
    sortOrder: number

    // Content
    paidCoins: number
    freeCoins: number
    items?: { id: string, name: string, count: number }[]
    rolloverMultiplier: number

    // Platform & Pricing
    web: PlatformPricing
    ios: PlatformPricing
    android: PlatformPricing

    // Rules
    limitRule: 'NONE' | 'LIFETIME_ONCE' | 'DAILY_ONCE' | 'WEEKLY_ONCE' | 'YEARLY_ONCE'
    startTime?: string
    endTime?: string
    vipLevels: number[] // e.g. [0, 1, 2, 3]
}

const mockCommodities: Commodity[] = [
    {
        id: 'SKU_COIN_100',
        name: '100 金幣包',
        imageUrl: 'https://via.placeholder.com/512?text=Coin100',
        badgeId: '2', // HOT
        type: 'REGULAR',
        sortOrder: 100,
        paidCoins: 100,
        freeCoins: 5,
        rolloverMultiplier: 1,
        web: { isEnabled: true, price: 100 },
        ios: { isEnabled: true, price: 100, productId: 'com.game.coin100' },
        android: { isEnabled: true, price: 100, productId: 'com.game.coin100' },
        limitRule: 'NONE',
        vipLevels: [0, 1, 2, 3, 4, 5]
    },
    {
        id: 'SKU_FIRST_DEP_1',
        name: '首儲雙倍大禮包',
        imageUrl: 'https://via.placeholder.com/512?text=FirstDeposit',
        badgeId: '1', // NEW
        type: 'FIRST_DEPOSIT',
        sortOrder: 10,
        paidCoins: 500,
        freeCoins: 500,
        rolloverMultiplier: 1,
        web: { isEnabled: true, price: 490 },
        ios: { isEnabled: true, price: 590, productId: 'com.game.first500' },
        android: { isEnabled: true, price: 590, productId: 'com.game.first500' },
        limitRule: 'LIFETIME_ONCE',
        vipLevels: [0, 1, 2, 3, 4, 5]
    },
    {
        id: 'SKU_MONTH_CARD',
        name: '尊爵月卡',
        imageUrl: 'https://via.placeholder.com/512?text=MonthlyCard',
        badgeId: '3', // Recommended
        type: 'MONTHLY',
        sortOrder: 50,
        paidCoins: 300,
        freeCoins: 50,
        items: [{ id: 'ITEM_001', name: '每日領取 20 金幣', count: 30 }],
        rolloverMultiplier: 0,
        web: { isEnabled: true, price: 300 },
        ios: { isEnabled: true, price: 330, productId: 'com.game.monthly' },
        android: { isEnabled: true, price: 330, productId: 'com.game.monthly' },
        limitRule: 'NONE',
        vipLevels: [1, 2, 3, 4, 5]
    },
    {
        id: 'SKU_LIMITED_TIME_01',
        name: '春節限時特惠 (無效連結測試)',
        imageUrl: 'https://invalid-link-test.com/img.png', // Invalid link
        type: 'LIMITED',
        sortOrder: 20,
        paidCoins: 2000,
        freeCoins: 800,
        items: [{ id: 'ITEM_002', name: '紅包好禮', count: 5 }],
        rolloverMultiplier: 1.5,
        web: { isEnabled: true, price: 1500 },
        ios: { isEnabled: false, price: 0 },
        android: { isEnabled: true, price: 1690, productId: 'com.game.cny2000' },
        limitRule: 'DAILY_ONCE',
        startTime: '2026-02-01 00:00:00',
        endTime: '2026-02-15 23:59:59',
        vipLevels: [0, 1, 2, 3, 4, 5]
    },
    {
        id: 'SKU_COIN_10000',
        name: '10,000 超值金幣包',
        imageUrl: 'https://via.placeholder.com/512?text=Coin10k',
        type: 'REGULAR',
        sortOrder: 500,
        paidCoins: 10000,
        freeCoins: 1500,
        rolloverMultiplier: 1,
        web: { isEnabled: true, price: 9000 },
        ios: { isEnabled: true, price: 9900, productId: 'com.game.coin10000' },
        android: { isEnabled: true, price: 9900, productId: 'com.game.coin10000' },
        limitRule: 'NONE',
        vipLevels: [3, 4, 5]
    }
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const commodityApi = {
    async list(): Promise<ApiResponse<Commodity[]>> {
        await delay(400)
        return { code: 0, msg: 'success', data: [...mockCommodities] }
    },

    async create(data: Commodity): Promise<ApiResponse<void>> {
        await delay(600)
        if (mockCommodities.some(c => c.id === data.id)) {
            return { code: 400, msg: '商品 ID 已存在' }
        }
        mockCommodities.push(data)
        return { code: 0, msg: 'success' }
    },

    async update(id: string, data: Commodity): Promise<ApiResponse<void>> {
        await delay(600)
        const index = mockCommodities.findIndex(c => c.id === id)
        if (index > -1) {
            mockCommodities[index] = data
            return { code: 0, msg: 'success' }
        }
        return { code: 404, msg: 'Commodity not found' }
    },

    async delete(id: string): Promise<ApiResponse<void>> {
        await delay(400)
        const index = mockCommodities.findIndex(c => c.id === id)
        if (index > -1) {
            mockCommodities.splice(index, 1)
            return { code: 0, msg: 'success' }
        }
        return { code: 404, msg: 'Commodity not found' }
    }
}
