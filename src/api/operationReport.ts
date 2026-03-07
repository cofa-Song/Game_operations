import { ApiResponse } from '@/types'
import {
    OperationReportQuery,
    GGRReportRecord,
    DepositReportRecord,
    PlayerActivityRecord,
    ActivityBonusRecord,
    Granularity
} from '@/types/operationReport'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const SIMULATE_DELAY = 600

// Generate mock dates based on range
const getMockDates = (start: number, end: number, granularity: Granularity) => {
    const dates = [];
    const startD = new Date(start)
    const endD = new Date(end)

    if (granularity === 'hour') {
        const diffHours = Math.floor((end - start) / (3600 * 1000))
        const count = Math.max(1, diffHours)
        for (let i = 0; i <= count; i++) {
            const d = new Date(start + i * 3600 * 1000)
            dates.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:00`)
        }
    } else {
        const count = granularity === 'day' ? 7 : 6; // Default counts if not specified
        const diff = (endD.getTime() - startD.getTime()) / (count - 1 > 0 ? count - 1 : 1)

        for (let i = 0; i < count; i++) {
            const d = new Date(startD.getTime() + diff * i)
            if (granularity === 'month') {
                dates.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
            } else {
                dates.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
            }
        }
    }
    return dates;
}

export const operationReportApi = {
    async getGGRReport(params: OperationReportQuery): Promise<ApiResponse<GGRReportRecord[]>> {
        await delay(SIMULATE_DELAY)
        const dates = getMockDates(params.startTime, params.endTime, params.granularity)

        const mockData: GGRReportRecord[] = dates.map(date => {
            const bet = Math.floor(Math.random() * 100000) + 10000
            const rolling = bet * (Math.random() * 0.1 + 0.85) // 85-95% rolling
            const payout = Math.floor(bet * (Math.random() * 0.4 + 0.5)) // 50-90% payout

            return {
                date,
                playerId: params.targetType === 'player' ? params.targetId : 'P' + Math.floor(Math.random() * 1000000),
                currency: 'USD',
                betAmount: bet,
                rollingAmount: Math.floor(rolling),
                payoutAmount: payout,
                ggr: bet - payout,
                betCount: Math.floor(bet / (Math.random() * 50 + 10)),
                maxBet: Math.floor(Math.random() * 5000) + 500,
                maxWinRate: Number((Math.random() * 50 + 2).toFixed(2))
            }
        })

        return { code: 0, msg: 'success', data: mockData }
    },

    async getDepositReport(params: OperationReportQuery): Promise<ApiResponse<DepositReportRecord[]>> {
        await delay(SIMULATE_DELAY)
        const dates = getMockDates(params.startTime, params.endTime, params.granularity)

        const mockData: DepositReportRecord[] = dates.map(date => {
            const count = Math.floor(Math.random() * 500) + 50
            const total = count * (Math.floor(Math.random() * 500) + 100)

            return {
                date,
                playerId: params.targetType === 'player' ? params.targetId : 'P' + Math.floor(Math.random() * 1000000),
                totalDepositAmount: total,
                depositCount: count,
                maxDepositAmount: Math.floor(total / (Math.random() * 5 + 2)),
                averageDeposit: Math.floor(total / count)
            }
        })

        return { code: 0, msg: 'success', data: mockData }
    },

    async getPlayerActivityReport(params: OperationReportQuery): Promise<ApiResponse<PlayerActivityRecord[]>> {
        await delay(SIMULATE_DELAY)
        const dates = getMockDates(params.startTime, params.endTime, params.granularity)

        const mockData: PlayerActivityRecord[] = dates.map(date => {
            return {
                date,
                playerId: (params.targetType === 'player' && params.targetId) ? params.targetId : 'P' + Math.floor(Math.random() * 1000000),
                activeDays: Math.floor(Math.random() * 30) + 1,
                rollingAmount: Math.floor(Math.random() * 50000) + 5000,
                totalDepositAmount: Math.floor(Math.random() * 20000) + 2000
            }
        })

        return { code: 0, msg: 'success', data: mockData }
    },

    async getActivityBonusReport(params: OperationReportQuery): Promise<ApiResponse<ActivityBonusRecord[]>> {
        await delay(SIMULATE_DELAY)
        const dates = getMockDates(params.startTime, params.endTime, params.granularity)

        const mockData: ActivityBonusRecord[] = dates.map(date => {
            const distributed = Math.floor(Math.random() * 5000) + 500
            return {
                date,
                playerId: (params.targetType === 'player' && params.targetId) ? params.targetId : 'P' + Math.floor(Math.random() * 1000000),
                distributedAmount: distributed,
                recalledAmount: Math.floor(distributed * Math.random() * 0.2),
                convertedAmount: Math.floor(distributed * Math.random() * 0.5)
            }
        })

        return { code: 0, msg: 'success', data: mockData }
    },

    exportOperationReport(_params: OperationReportQuery): Promise<{ code: number; msg: string }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    code: 0,
                    msg: '報表已加入排隊，請至報表中心下載'
                })
            }, 500)
        })
    }
}
