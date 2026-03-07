import { ApiResponse, PaginatedResponse } from '@/types'
import {
    ImageConfig,
    ImageType,
    PopupFrequency,
    CreateImageConfigData,
    UpdateImageConfigData,
    ImageConfigQueryParams
} from '@/types/imageConfig'

const SIMULATE_DELAY = 500
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Helpers to generate dates
const now = new Date()
const oneYearLater = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).toISOString()
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()

// Mock Data
export const mockImageConfigs: ImageConfig[] = [
    {
        id: '1',
        type: ImageType.BANNER,
        title: '新春活動主 Banner',
        imageUrl: 'https://via.placeholder.com/1920x450/FF0000/FFFFFF?text=CNY+Banner',
        jumpUrl: '/promotion/cny-2024',
        startTime: yesterday,
        endTime: oneYearLater,
        weight: 1,
        frequency: PopupFrequency.EVERY_LOGIN,
        statusTest: true,
        statusLive: true,
        lastModifiedAt: yesterday,
        lastModifiedBy: 'admin'
    },
    {
        id: '2',
        type: ImageType.POPUP,
        title: '每日簽到提醒',
        imageUrl: 'https://via.placeholder.com/600x600/0000FF/FFFFFF?text=Daily+Login',
        jumpUrl: '',
        startTime: yesterday,
        endTime: oneYearLater,
        weight: 10,
        frequency: PopupFrequency.DAILY_ONCE,
        statusTest: true,
        statusLive: false,
        lastModifiedAt: yesterday,
        lastModifiedBy: 'system'
    },
    {
        id: '3',
        type: ImageType.BANNER,
        title: 'VIP 專專屬優惠',
        imageUrl: 'https://via.placeholder.com/1920x450/FFD700/000000?text=VIP+Banner',
        jumpUrl: '/vip',
        startTime: tomorrow,
        endTime: oneYearLater,
        weight: 2,
        frequency: PopupFrequency.EVERY_LOGIN,
        statusTest: true,
        statusLive: true,
        lastModifiedAt: yesterday,
        lastModifiedBy: 'admin'
    }
]

export const imageConfigApi = {
    async getImageConfigs(params: ImageConfigQueryParams & { page: number, pageSize: number }): Promise<ApiResponse<PaginatedResponse<ImageConfig>>> {
        await delay(SIMULATE_DELAY)

        let filtered = [...mockImageConfigs]

        if (params.types && params.types.length > 0) {
            filtered = filtered.filter(item => params.types!.includes(item.type))
        }

        if (params.startTime) {
            const start = new Date(params.startTime).getTime()
            filtered = filtered.filter(item => new Date(item.startTime).getTime() >= start)
        }

        if (params.endTime) {
            const end = new Date(params.endTime).getTime()
            filtered = filtered.filter(item => new Date(item.endTime).getTime() <= end)
        }

        // Sort by weight (asc) then id (desc)
        filtered.sort((a, b) => {
            if (a.weight !== b.weight) return a.weight - b.weight
            return b.id.localeCompare(a.id)
        })

        const total = filtered.length
        const startIdx = (params.page - 1) * params.pageSize
        const endIdx = startIdx + params.pageSize
        const items = filtered.slice(startIdx, endIdx)

        return {
            code: 0,
            msg: 'success',
            data: {
                items,
                total,
                page: params.page,
                pageSize: params.pageSize
            }
        }
    },

    async createImageConfig(data: CreateImageConfigData): Promise<ApiResponse<ImageConfig>> {
        await delay(SIMULATE_DELAY)
        const newConfig: ImageConfig = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            statusTest: false,
            statusLive: false,
            lastModifiedAt: new Date().toISOString(),
            lastModifiedBy: 'admin'
        }
        mockImageConfigs.unshift(newConfig)
        return { code: 0, msg: 'success', data: newConfig }
    },

    async updateImageConfig(id: string, data: UpdateImageConfigData): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const index = mockImageConfigs.findIndex(item => item.id === id)
        if (index === -1) return { code: 404, msg: 'Not found' }

        mockImageConfigs[index] = {
            ...mockImageConfigs[index],
            ...data,
            lastModifiedAt: new Date().toISOString(),
            lastModifiedBy: 'admin'
        }
        return { code: 0, msg: 'success' }
    },

    async deleteImageConfig(id: string): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const index = mockImageConfigs.findIndex(item => item.id === id)
        if (index === -1) return { code: 404, msg: 'Not found' }

        mockImageConfigs.splice(index, 1)
        return { code: 0, msg: 'success' }
    },

    async toggleStatus(id: string, site: 'test' | 'live', status: boolean): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const index = mockImageConfigs.findIndex(item => item.id === id)
        if (index === -1) return { code: 404, msg: 'Not found' }

        if (site === 'test') {
            mockImageConfigs[index].statusTest = status
        } else {
            mockImageConfigs[index].statusLive = status
        }

        mockImageConfigs[index].lastModifiedAt = new Date().toISOString()
        mockImageConfigs[index].lastModifiedBy = 'admin'

        console.log(`[Cache] Updating ImageConfig_Cache_Key for ${id} on ${site} to ${status}`)
        return { code: 0, msg: 'success' }
    },

    // Mock Upload API
    async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
        await delay(1000) // Simulate upload time
        // In real app, this would upload to S3/OSS/MinIO
        // Here we just return a fake URL based on file name or a placeholder
        const fakeUrl = `https://via.placeholder.com/500x200?text=${encodeURIComponent(file.name)}`
        return {
            code: 0,
            msg: 'success',
            data: { url: fakeUrl }
        }
    }
}
