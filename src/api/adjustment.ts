import { ApiResponse } from '@/types'

export interface AdjustmentRequest {
    playerId: string
    type: 'DEPOSIT' | 'WITHDRAW'
    walletType: 'CASH' | 'BONUS'
    amount: number
    reason: string
    note: string
    evidence?: File | null // In real app this might be a URL string after upload, but for mock we just handle object or string
    isRollover?: boolean
    rolloverMultiplier?: number
}

// Mock reasons
export const ADJUSTMENT_REASONS = [
    { label: '活動獎勵 (Event Reward)', value: 'EVENT_REWARD' },
    { label: '系統補償 (System Compensation)', value: 'SYSTEM_COMPENSATION' },
    { label: '線下充值 (Offline Deposit)', value: 'OFFLINE_DEPOSIT' },
    { label: '錯誤扣回 (Correction/Rollback)', value: 'CORRECTION' },
    { label: '其他 (Other)', value: 'OTHER' }
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const adjustmentApi = {
    async createAdjustment(data: AdjustmentRequest): Promise<ApiResponse<void>> {
        await delay(800) // Simulate network latency

        // Basic validation simulation
        if (data.amount <= 0) {
            return { code: 400, msg: '金額必須大於 0' }
        }

        if (data.reason === 'OFFLINE_DEPOSIT' && !data.evidence) {
            return { code: 400, msg: '線下充值必須上傳憑證' }
        }

        console.log('[API] Create Adjustment:', data)
        return { code: 0, msg: 'success' }
    },

    async getReasons(): Promise<ApiResponse<{ label: string, value: string }[]>> {
        await delay(200)
        return { code: 0, msg: 'success', data: ADJUSTMENT_REASONS }
    }
}
