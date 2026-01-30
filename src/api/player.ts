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

import { mockPlayers, mockAuditLogs } from '@/mocks/player' // We will create this next

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
            } else if (params.affiliation_type === 'referrer_id') {
                filtered = filtered.filter(p => p.referrer_id?.toLowerCase().includes(aq))
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
            phone: '',
            status: 'ACTIVE',
            tags: data.tags,
            vip_level: 0,
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
            is_online: false,
            is_muted: false,
            is_gift_disabled: false
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

    async getAuditLogs(playerId: string): Promise<ApiResponse<PlayerAuditLog[]>> {
        await delay(SIMULATE_DELAY)
        const logs = mockAuditLogs.filter(l => l.player_id === playerId)
        return { code: 0, msg: 'success', data: logs }
    }
}
