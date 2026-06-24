import type { AgentReportRecord, AgentPlayerDetailRecord } from '@/types/agentReport'

// ==========================================
// 代理報表 Mock Data Generator
// ==========================================

const generateAgents = (count: number): AgentReportRecord[] => {
  const agents: AgentReportRecord[] = []
  for (let i = 1; i <= count; i++) {
    const isMaster = i % 4 === 1 // 每 4 個有一個總代理
    const masterId = isMaster ? `AGT${i.toString().padStart(3, '0')}` : `AGT${(i - (i % 4) + 1).toString().padStart(3, '0')}`
    const masterName = isMaster ? `master_agent_${i}` : `master_agent_${i - (i % 4) + 1}`
    
    const agentId = `AGT${i.toString().padStart(3, '0')}`
    const agentUsername = isMaster ? masterName : `sub_agent_${i}`
    const agentUid = (10000 + i).toString()
    const identityType = isMaster ? 'MASTER' : 'SUB'
    const agentPath = isMaster ? `平台 > ${agentUsername}` : `平台 > ${masterName} > ${agentUsername}`

    const seed = i * 13
    const totalDepositAmount = (seed % 100 + 10) * 50000
    const totalTurnoverAmount = totalDepositAmount * (3 + (seed % 4))
    const totalCommissionCost = Math.floor(totalDepositAmount * 0.03)
    const totalPromoDistributed = Math.floor(totalDepositAmount * 0.02)
    const ggr = Math.floor(totalDepositAmount * 0.15)
    const ngr = ggr - totalCommissionCost - totalPromoDistributed

    agents.push({
      agentId,
      agentUsername,
      agentUid,
      identityType,
      agentPath,
      totalRegistrations: (seed % 500) + 50,
      totalFirstDepositors: (seed % 300) + 30,
      cpaQualifiedCount: (seed % 250) + 20,
      totalDepositAmount,
      totalTurnoverAmount,
      totalCommissionCost,
      totalPromoDistributed,
      ggr,
      ngr
    })
  }
  return agents
}

export const mockAgentReportRecords: AgentReportRecord[] = generateAgents(35)

// 玩家對帳明細 Mock Data (依代理分組)
const generatePlayerDetails = (agentId: string, count: number): AgentPlayerDetailRecord[] => {
  const names = [
    'player_star', 'user_zeus', 'ace_winner', 'lucky_seven', 'golden_hand',
    'night_rider', 'thunder_bolt', 'ice_king', 'fire_fox', 'shadow_play',
    'wind_chaser', 'moon_light', 'sun_rise', 'ocean_wave', 'sky_dancer',
    'rock_solid', 'swift_arrow', 'iron_will', 'silver_fox', 'cloud_nine'
  ]
  return Array.from({ length: count }, (_, i) => {
    const seed = (i + 1) * 17 + parseInt(agentId.replace(/\D/g, '')) * 3
    const totalDeposit = (seed % 50 + 1) * 10000
    const firstDeposit = Math.floor(totalDeposit * 0.35)
    const secondDeposit = Math.floor(totalDeposit * 0.25)
    const totalBet = totalDeposit * (2 + (seed % 5))
    const validBet = Math.floor(totalBet * 0.88)
    const payout = Math.floor(totalBet * (0.85 + (seed % 10) / 100))
    return {
      playerId: `UID${10000 + parseInt(agentId.replace(/\D/g, '')) * 100 + i + 1}`,
      playerUsername: `${names[i % names.length]}_${i + 1}`,
      agentId,
      firstDepositAmount: firstDeposit,
      secondDepositAmount: secondDeposit,
      totalDepositAmount: totalDeposit,
      totalBetAmount: totalBet,
      totalValidBetAmount: validBet,
      totalPayoutAmount: payout,
      p2pTransactionAmount: (seed % 3 === 0) ? (seed % 20 + 1) * 5000 : 0,
      activityBonusUsed: Math.floor(totalDeposit * 0.08),
      promoReceived: Math.floor(totalDeposit * 0.05)
    }
  })
}

export const mockAgentPlayerDetails: Record<string, AgentPlayerDetailRecord[]> = {}
mockAgentReportRecords.forEach(agent => {
  // 為每個代理生成 10 ~ 50 筆不等的玩家明細
  const count = (parseInt(agent.agentId.replace(/\D/g, '')) % 40) + 10
  mockAgentPlayerDetails[agent.agentId] = generatePlayerDetails(agent.agentId, count)
})

// 總代理選單選項 (用於下拉篩選)
export const masterAgentOptions = mockAgentReportRecords
  .filter(a => a.identityType === 'MASTER')
  .map(a => ({
    label: `${a.agentUsername} (UID: ${a.agentUid})`,
    value: a.agentId
  }))
masterAgentOptions.unshift({ label: '全部', value: '' })
