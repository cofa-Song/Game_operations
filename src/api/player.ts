import { ApiResponse, PaginatedResponse } from '@/types'
import {
    Player,
    PlayerSearchParams,
    CreatePlayerRequest,
    UpdatePlayerRequest,
    PlayerStatus,
    PlayerAuditLog
} from '@/types/player'

// Mock implementation will be replaced by real API calls later
// Ideally this should import from mocks if we want to run purely in browser without backend
// For now, we simulate API calls directly here or call a mock handler

import { mockPlayers, mockAuditLogs, mockPlayerTransfers } from '@/mocks/player' // We will create this next
import { mockAgents } from '@/mocks/agent'

const SIMULATE_DELAY = 500
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const playerApi = {
    async getPlayers(params: PlayerSearchParams): Promise<ApiResponse<PaginatedResponse<Player>>> {
        await delay(SIMULATE_DELAY)

        let filtered = [...mockPlayers]

        if (params.q) {
            const q = params.q.toLowerCase()
            if (params.search_type) {
                switch (params.search_type) {
                    case 'id':
                        filtered = filtered.filter(p => p.id.toLowerCase().includes(q))
                        break
                    case 'username':
                        filtered = filtered.filter(p => p.username.toLowerCase().includes(q))
                        break
                    case 'phone':
                        filtered = filtered.filter(p => p.phone.includes(q))
                        break
                }
            } else {
                // Fallback to all fields if no type specified (though UI will enforce one)
                filtered = filtered.filter(p =>
                    p.id.toLowerCase().includes(q) ||
                    p.username.toLowerCase().includes(q) ||
                    p.phone.includes(q)
                )
            }
        }

        if (params.status) {
            filtered = filtered.filter(p => p.status === params.status)
        }

        if (params.affiliation_query) {
            const aq = params.affiliation_query.toLowerCase()
            if (params.affiliation_type === 'invite_code') {
                filtered = filtered.filter(p => p.invite_code?.toLowerCase().includes(aq))
            } else if (params.affiliation_type === 'promo_code') {
                filtered = filtered.filter(p => p.promo_code?.toLowerCase().includes(aq))
            }
        }

        if (params.tags && params.tags.length > 0) {
            filtered = filtered.filter(p => params.tags!.some(tag => p.tags.includes(tag)))
        }

        if (params.register_ip) {
            filtered = filtered.filter(p => p.register_ip.includes(params.register_ip!))
        }

        if (params.register_date_start) {
            const start = new Date(params.register_date_start).getTime()
            filtered = filtered.filter(p => new Date(p.register_at).getTime() >= start)
        }

        if (params.register_date_end) {
            const end = new Date(params.register_date_end).getTime()
            filtered = filtered.filter(p => new Date(p.register_at).getTime() <= end)
        }

        const total = filtered.length
        const start = (params.page - 1) * params.page_size
        const end = start + params.page_size
        const items = filtered.slice(start, end)

        return {
            code: 0,
            msg: 'success',
            data: {
                items,
                total,
                page: params.page,
                pageSize: params.page_size
            }
        }
    },

    async getPlayerDetail(id: string): Promise<ApiResponse<Player>> {
        await delay(SIMULATE_DELAY)
        const player = mockPlayers.find(p => p.id === id)
        if (!player) {
            return { code: 404, msg: 'Player not found' }
        }
        return { code: 0, msg: 'success', data: player }
    },

    async createPlayer(data: CreatePlayerRequest): Promise<ApiResponse<Player>> {
        await delay(SIMULATE_DELAY)
        const newPlayer: Player = {
            id: `P${Math.floor(Math.random() * 100000)}`,
            username: data.username,
            display_name: data.display_name,
            phone: data.phone || '',
            status: 'ACTIVE',
            tags: data.tags || [],
            vip_level: data.vip_level || 0,
            promo_code: data.promo_code,
            gender: data.gender,
            birthday: data.birthday,
            email: data.email,
            is_retention_active: data.is_retention_active,
            is_muted: data.is_muted || 'NONE',
            is_gift_disabled: data.is_gift_disabled || false,
            is_deposit_disabled: data.is_deposit_disabled || false,
            is_play_disabled: data.is_play_disabled || false,
            register_source: 'Admin_Manual',
            register_ip: '127.0.0.1',
            register_at: new Date().toISOString(),
            wallets: [
                { type: 'CASH', currency: 'GOLD', balance: 0 },
                { type: 'CASH', currency: 'SILVER', balance: 0 },
                { type: 'BONUS', currency: 'SILVER', balance: 0 },
                { type: 'GAME', currency: 'BRONZE', balance: 0 },
                { type: 'SAFE', currency: 'GOLD', balance: 0 }
            ],
            is_online: false
        }
        mockPlayers.unshift(newPlayer)
        return { code: 0, msg: 'success', data: newPlayer }
    },

    async updatePlayer(id: string, data: UpdatePlayerRequest, reason: string): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const playerIndex = mockPlayers.findIndex(p => p.id === id)
        if (playerIndex === -1) return { code: 404, msg: 'Player not found' }

        // Log the change (Mock)
        console.log(`[Audit] Update Player ${id}:`, data, `Reason: ${reason}`)

        mockPlayers[playerIndex] = { ...mockPlayers[playerIndex], ...data }
        return { code: 0, msg: 'success' }
    },

    async updatePlayerStatus(id: string, status: PlayerStatus, reason: string, forceKick: boolean): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const player = mockPlayers.find(p => p.id === id)
        if (!player) return { code: 404, msg: 'Player not found' }

        player.status = status
        if (forceKick && (status === 'FROZEN' || status === 'SUSPENDED')) {
            player.is_online = false
            console.log(`[WebSocket] Kicking player ${id}`)
        }

        console.log(`[Audit] Update Status ${id} -> ${status}: ${reason}`)
        return { code: 0, msg: 'success' }
    },

    async abandonBonus(id: string, reason: string): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const player = mockPlayers.find(p => p.id === id)
        if (!player) return { code: 404, msg: 'Player not found' }

        const bonusWallet = player.wallets.find(w => w.type === 'BONUS')
        if (bonusWallet) {
            console.log(`[Audit] Abandon Bonus ${id}: ${bonusWallet.balance} -> 0. Reason: ${reason}`)
            bonusWallet.balance = 0
        }

        return { code: 0, msg: 'success' }
    },

    async forceApproveBonus(id: string, reason: string = 'Admin Force Approve'): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const player = mockPlayers.find(p => p.id === id)
        if (!player) return { code: 404, msg: 'Player not found' }

        console.log(`[Audit] Force Approve Bonus ${id}. Reason: ${reason}`)
        // The actual wallet transfer logic is handled by RolloverEngine in frontend for mock purposes
        return { code: 0, msg: 'success' }
    },

    async getAuditLogs(playerId: string, page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<PlayerAuditLog>>> {
        await delay(SIMULATE_DELAY)
        const allLogs = mockAuditLogs.filter(l => l.player_id === playerId)
        
        const total = allLogs.length
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const items = allLogs.slice(start, end)

        return { 
            code: 0, 
            msg: 'success', 
            data: {
                items,
                total,
                page,
                pageSize
            } 
        }
    },

    async transferPlayer(
        playerId: string,
        newAgentId: string,
        executionType: 'IMMEDIATE' | 'SCHEDULED',
        reason: string,
        executeAt?: string
    ): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const player = mockPlayers.find(p => p.id === playerId)
        if (!player) return { code: 404, msg: '找不到該玩家' }

        if (player.agent_id === newAgentId || player.agent_name === newAgentId) {
            return { code: 400, msg: '轉線失敗：目標代理不可與當前代理相同。' }
        }

        // Verify Agent
        const targetAgent = mockAgents.find(a => a.id === newAgentId || a.uid === newAgentId || a.username === newAgentId)
        if (!targetAgent) {
            return { code: 404, msg: '找不到目標代理' }
        }
        if (targetAgent.status !== 'NORMAL') {
            return { code: 400, msg: '轉線失敗：目標新代理目前處於停用狀態。' }
        }

        // Check if there is already a PENDING transfer
        const hasPending = mockPlayerTransfers.some(t => t.player_id === playerId && t.status === 'PENDING')
        if (hasPending) {
            return { code: 400, msg: '該玩家已存在一筆進行中的預約轉線排程，請先取消或等候執行。' }
        }

        const recordId = `TR_${Date.now()}_${Math.floor(Math.random() * 1000)}`
        const newRecord: import('@/types/player').PlayerTransferRecord = {
            id: recordId,
            player_id: playerId,
            original_agent_id: player.agent_id || '-',
            original_agent_name: player.agent_name || '-',
            new_agent_id: targetAgent.id,
            new_agent_name: targetAgent.username,
            execution_type: executionType,
            execute_at: executionType === 'IMMEDIATE' ? new Date().toISOString() : (executeAt || new Date().toISOString()),
            reason,
            status: executionType === 'IMMEDIATE' ? 'SUCCESS' : 'PENDING',
            created_at: new Date().toISOString(),
            operator: 'admin'
        }
        mockPlayerTransfers.unshift(newRecord)

        if (executionType === 'IMMEDIATE') {
            player.agent_id = targetAgent.id
            player.agent_name = targetAgent.username
        }

        return { code: 0, msg: 'success' }
    },

    async getPlayerTransferRecords(playerId: string): Promise<ApiResponse<import('@/types/player').PlayerTransferRecord[]>> {
        await delay(SIMULATE_DELAY)
        const records = mockPlayerTransfers.filter(r => r.player_id === playerId)
        return { code: 0, msg: 'success', data: records }
    },

    async cancelPlayerTransfer(recordId: string): Promise<ApiResponse<void>> {
        await delay(SIMULATE_DELAY)
        const record = mockPlayerTransfers.find(r => r.id === recordId)
        if (!record) return { code: 404, msg: '找不到該轉線紀錄' }
        if (record.status !== 'PENDING') return { code: 400, msg: '該紀錄不在可取消的狀態' }
        
        record.status = 'CANCELED'
        return { code: 0, msg: 'success' }
    }
}
