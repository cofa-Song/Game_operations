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
