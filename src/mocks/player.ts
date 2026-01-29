import { Player, PlayerAuditLog, Wallet } from '@/types/player'
import { RolloverEngine } from './engine' // Import Engine

const generateWallets = (): Wallet[] => [
    { type: 'CASH', currency: 'GOLD', balance: Math.floor(Math.random() * 50000) },
    { type: 'BONUS', currency: 'SILVER', balance: Math.floor(Math.random() * 5000) },
    { type: 'GAME', currency: 'COPPER', balance: Math.floor(Math.random() * 1000) },
    { type: 'SAFE', currency: 'GOLD', balance: Math.floor(Math.random() * 10000) }
]

const names = ['Alex', 'Ben', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Helen']
const statuses = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'LOCKED', 'FROZEN', 'SUSPENDED'] as const

export const mockPlayers: Player[] = Array.from({ length: 50 }).map((_, i) => {
    // Generate base player
    const player: Player = {
        id: `P${10000 + i}`,
        username: `user_${10000 + i}`,
        display_name: `${names[i % names.length]}_${i}`,
        phone: `0912${String(i).padStart(6, '0')}`,
        status: statuses[i % 6] as any,
        tags: i % 10 === 0 ? ['TEST', 'VIP'] : ['NORMAL'],
        vip_level: Math.floor(Math.random() * 5),
        referrer_id: i % 5 === 0 ? `A${20000 + i}` : undefined,
        register_source: i % 3 === 0 ? 'Admin_Manual' : 'SEO_Google',
        register_ip: `192.168.1.${i % 255}`,
        register_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        last_login_at: new Date(Date.now() - Math.random() * 100000000).toISOString(),
        last_login_ip: `192.168.1.${i % 255}`,
        is_online: Math.random() > 0.7,
        wallets: generateWallets(),
        is_muted: false,
        is_gift_disabled: false,
        // Init Bonus Queue
        bonus_queue: i % 4 === 0 ? [
            RolloverEngine.createBonusCard(100, 10, 500, 7),
            RolloverEngine.createBonusCard(50, 5, 200, 3)
        ] : [],
        // Init Container (Every 5th player has active bonus)
        rollover_container: undefined
    }

    // Activate bonus for some players
    if (i % 5 === 0 && player.bonus_queue && player.bonus_queue.length > 0) {
        const card = player.bonus_queue.shift()!
        RolloverEngine.activateBonus(player, card)
    }

    return player
})

export const mockAuditLogs: PlayerAuditLog[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `LOG_${i}`,
    player_id: `P${10000 + (i % 5)}`,
    operator: 'admin',
    action: ['UPDATE_STATUS', 'UPDATE_INFO', 'ABANDON_BONUS'][i % 3],
    old_value: 'ACTIVE',
    new_value: 'LOCKED',
    reason: 'Suspicious activity detected',
    created_at: new Date(Date.now() - Math.random() * 1000000000).toISOString()
}))
