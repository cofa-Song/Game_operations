import { ApiResponse, PaginatedResponse } from '@/types'
import { Guild, GuildGlobalConfig, GuildQuery } from '@/types/guild'
import { mockGuilds, mockGuildGlobalConfig } from '@/mocks/guild'

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms))

export const guildApi = {
    async list(query: GuildQuery): Promise<ApiResponse<PaginatedResponse<Guild>>> {
        await delay()
        let filtered = [...mockGuilds]

        if (query.guild_id_or_name) {
            filtered = filtered.filter(g =>
                g.id.includes(query.guild_id_or_name!) ||
                g.name.includes(query.guild_id_or_name!)
            )
        }

        if (query.leader_id) {
            filtered = filtered.filter(g => g.leader_id.includes(query.leader_id!))
        }

        const start = (query.page - 1) * query.pageSize
        const data = filtered.slice(start, start + query.pageSize)

        return {
            code: 0,
            msg: 'success',
            data: {
                items: data,
                total: filtered.length,
                page: query.page,
                pageSize: query.pageSize
            }
        }
    },

    async getGlobalConfig(): Promise<ApiResponse<GuildGlobalConfig>> {
        await delay(100)
        return { code: 0, msg: 'success', data: mockGuildGlobalConfig }
    },

    async updateGlobalConfig(config: GuildGlobalConfig): Promise<ApiResponse<void>> {
        await delay()
        Object.assign(mockGuildGlobalConfig, config)
        return { code: 0, msg: 'success' }
    },

    async dissolve(id: string): Promise<ApiResponse<void>> {
        await delay()
        const index = mockGuilds.findIndex(g => g.id === id)
        if (index !== -1) {
            mockGuilds[index].status = 'DISSOLVED'
        }
        return { code: 0, msg: 'success' }
    },

    async mute(id: string): Promise<ApiResponse<void>> {
        await delay()
        const index = mockGuilds.findIndex(g => g.id === id)
        if (index !== -1) {
            mockGuilds[index].status = 'MUTED'
        }
        return { code: 0, msg: 'success' }
    },

    async transferLeader(guildId: string, newLeaderId: string): Promise<ApiResponse<void>> {
        await delay()
        const index = mockGuilds.findIndex(g => g.id === guildId)
        if (index !== -1) {
            mockGuilds[index].leader_id = newLeaderId
        }
        return { code: 0, msg: 'success' }
    }
}
