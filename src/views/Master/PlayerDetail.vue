<script setup lang="ts">
import { ref, onMounted, reactive, watch, computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  NCard, NTabs, NTabPane, NGrid, NGridItem, NDescriptions, NDescriptionsItem,
  NTag, NButton, NSpace, NAvatar, NStatistic, NList, NListItem, NThing,
  NModal, NForm, NFormItem, NInput, NSelect, NSwitch, useMessage,
  NProgress, NDivider, NDatePicker, NInputNumber, NDataTable, NPagination,
  NRadioGroup, NRadio, NIcon
} from 'naive-ui'
import { 
  WalletOutline, AlertCircleOutline, SearchOutline, SwapHorizontalOutline
} from '@vicons/ionicons5'
import { playerApi } from '@/api/player'
import { agentApi } from '@/api/agent'
import { logApi } from '@/api/log'
import { gameApi } from '@/api/game'
import { Player, PlayerAuditLog, UpdatePlayerRequest, PlayerStatus, WalletType, PlayerTransferRecord } from '@/types/player'
import { AssetLog } from '@/types/log'
import { GameLog } from '@/types/game'
import { RolloverEngine } from '@/mocks/engine'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const { t } = useI18n()

const playerId = route.params.id as string
const player = ref<Player | null>(null)

// History Tabs Data
const assetLogs = ref<AssetLog[]>([])
const gameLogs = ref<GameLog[]>([])
const auditLogs = ref<PlayerAuditLog[]>([])

// Pagination States
const auditPagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    onChange: (page: number) => {
        auditPagination.page = page
        fetchHistory()
    }
})

const assetPagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    onChange: (page: number) => {
        assetPagination.page = page
        fetchHistory()
    },
    onUpdatePageSize: (pageSize: number) => {
        assetPagination.pageSize = pageSize
        assetPagination.page = 1
        fetchHistory()
    }
})

const gamePagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    onChange: (page: number) => {
        gamePagination.page = page
        fetchHistory()
    },
    onUpdatePageSize: (pageSize: number) => {
        gamePagination.pageSize = pageSize
        gamePagination.page = 1
        fetchHistory()
    }
})

// History Filters
const auditFilter = reactive({
    timeRange: null as [number, number] | null
})

const assetFilter = reactive({
    currency: null as string | null,
    changeType: null as string | null,
    timeRange: null as [number, number] | null
})

const gameFilter = reactive({
    currency: 'all' as string,
    gameName: '',
    timeRange: null as [number, number] | null
})

const historyLoading = ref(false)
const currentTab = ref('wallet')
const loading = ref(false)

// Edit State
const showEditModal = ref(false)
const editModel = reactive<UpdatePlayerRequest>({})

// Status Change State
const showStatusModal = ref(false)
const statusModel = reactive({
  status: 'ACTIVE' as PlayerStatus,
  reason: '',
  forceKick: false,
  tags: [] as string[]
})
const tagOptions = [
    { label: '一般玩家 (NORMAL)', value: 'NORMAL' },
    { label: '測試帳號 (TEST)', value: 'TEST' },
    { label: 'VIP客戶 (VIP)', value: 'VIP' },
    { label: '高風險 (RISK)', value: 'RISK' },
    { label: '高價值 (HIGH_VALUE)', value: 'HIGH_VALUE' }
]
const statusOptions = [
  { label: '正常', value: 'ACTIVE' },
  { label: '鎖定', value: 'LOCKED' },
  { label: '凍結', value: 'FROZEN' },
  { label: '停權', value: 'SUSPENDED' }
]

const genderOptions = computed(() => [
    { label: t('player.gender.MALE'), value: 'MALE' },
    { label: t('player.gender.FEMALE'), value: 'FEMALE' },
    { label: t('player.gender.UNKNOWN'), value: 'UNKNOWN' }
])

const muteOptions = computed(() => [
    { label: t('player.muteOptions.NONE'), value: 'NONE' },
    { label: t('player.muteOptions.15M'), value: '15M' },
    { label: t('player.muteOptions.1H'), value: '1H' },
    { label: t('player.muteOptions.1D'), value: '1D' },
    { label: t('player.muteOptions.PERMANENT'), value: 'PERMANENT' }
])

const currencyOptions = [
    { label: '金幣 (Gold)', value: 'GOLD' },
    { label: '銀幣 (Silver)', value: 'SILVER' },
    { label: '銅幣 (Bronze)', value: 'BRONZE' }
]

const assetTypeOptions = [
    { label: '投注 (BET)', value: 'BET' },
    { label: '派彩 (WIN)', value: 'WIN' },
    { label: '領取 (CLAIM)', value: 'CLAIM' },
    { label: '解鎖 (UNLOCK)', value: 'UNLOCK' },
    { label: '清零 (WIPE)', value: 'WIPE' }
]

// Abandon Bonus State
const showAbandonModal = ref(false)
const abandonReason = ref('')

// Player Transfer State
const showPlayerTransferModal = ref(false)
const playerTransferForm = reactive({
    new_agent_id: '',
    execution_type: 'IMMEDIATE' as 'IMMEDIATE' | 'SCHEDULED',
    execute_at: undefined as string | undefined,
    reason: ''
})
const playerTransferLoading = ref(false)
const searchAgentLoading = ref(false)
const searchResultName = ref('')
const transferRecords = ref<PlayerTransferRecord[]>([])

const fetchTransferRecords = async () => {
    try {
        const res = await playerApi.getPlayerTransferRecords(playerId)
        if (res.code === 0 && res.data) {
            transferRecords.value = res.data
        }
    } catch (e) {
        console.error(e)
    }
}

const handleSearchAgent = async () => {
    if (!playerTransferForm.new_agent_id) {
        message.warning('請輸入新代理ID')
        return
    }
    searchAgentLoading.value = true
    searchResultName.value = ''
    try {
        // Mock search using getAgents
        const res = await agentApi.getAgents({ 
            search_type: 'uid', 
            q: playerTransferForm.new_agent_id, 
            page: 1, 
            page_size: 10 
        })
        const target = res.data?.items.find(a => a.uid === playerTransferForm.new_agent_id || a.id === playerTransferForm.new_agent_id || a.username === playerTransferForm.new_agent_id)
        if (target) {
            if (target.status !== 'NORMAL') {
                message.error('轉線失敗：目標新代理目前處於停用狀態。')
            } else {
                searchResultName.value = target.username
                message.success('檢索成功')
            }
        } else {
            message.error('找不到該代理')
        }
    } catch (e) {
        message.error('檢索失敗')
    } finally {
        searchAgentLoading.value = false
    }
}

const openPlayerTransferModal = () => {
    playerTransferForm.new_agent_id = ''
    playerTransferForm.execution_type = 'IMMEDIATE'
    playerTransferForm.execute_at = undefined
    playerTransferForm.reason = ''
    searchResultName.value = ''
    showPlayerTransferModal.value = true
}

const cancelTransferRecord = async (recordId: string) => {
    try {
        const res = await playerApi.cancelPlayerTransfer(recordId)
        if (res.code === 0) {
            message.success('取消預約成功')
            fetchTransferRecords()
        } else {
            message.error(res.msg)
        }
    } catch(e) {
        message.error('操作失敗')
    }
}

const submitPlayerTransfer = async () => {
    if (!playerTransferForm.new_agent_id || !searchResultName.value) {
        message.warning('請先檢索並確認目標新代理')
        return
    }
    if (!playerTransferForm.reason || playerTransferForm.reason.length < 5 || playerTransferForm.reason.length > 200) {
        message.warning('異動原因需在 5 到 200 字之間')
        return
    }
    if (playerTransferForm.execution_type === 'SCHEDULED') {
        if (!playerTransferForm.execute_at) {
            message.warning('請選擇預約時間')
            return
        }
        const executeTime = new Date(playerTransferForm.execute_at).getTime()
        if (executeTime < Date.now() + 9 * 60 * 1000) {
            message.warning('預約時間必須大於當前時間至少 10 分鐘')
            return
        }
    }

    playerTransferLoading.value = true
    try {
        const res = await playerApi.transferPlayer(
            playerId,
            playerTransferForm.new_agent_id,
            playerTransferForm.execution_type,
            playerTransferForm.reason,
            playerTransferForm.execute_at
        )
        if (res.code === 0) {
            message.success(playerTransferForm.execution_type === 'IMMEDIATE' ? '玩家轉線成功' : '預約轉線已建立')
            showPlayerTransferModal.value = false
            fetchData()
            fetchTransferRecords()
        } else {
            message.error(res.msg || '轉線失敗')
        }
    } catch (e) {
        message.error('轉線操作失敗')
    } finally {
        playerTransferLoading.value = false
    }
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await playerApi.getPlayerDetail(playerId)
    if (res.code === 0 && res.data) {
      player.value = res.data
    } else {
      message.error(res.msg)
      router.push('/admin/players')
    }
    
    // Fetch Audit Logs
    const logRes = await playerApi.getAuditLogs(playerId)
    if (logRes.code === 0 && logRes.data) {
        auditLogs.value = logRes.data
    }
    
    // Fetch Transfer Records
    fetchTransferRecords()
  } catch (err) {
    message.error('載入失敗')
  } finally {
    loading.value = false
  }
}

const handleEdit = () => {
    if (!player.value) return
    editModel.display_name = player.value.display_name
    editModel.phone = player.value.phone
    // Handle legacy boolean is_muted values
    editModel.is_muted = player.value.is_muted === true ? 'PERMANENT' : (player.value.is_muted === false ? 'NONE' : player.value.is_muted)
    editModel.is_gift_disabled = player.value.is_gift_disabled
    editModel.is_deposit_disabled = player.value.is_deposit_disabled
    editModel.is_play_disabled = player.value.is_play_disabled
    editModel.gender = player.value.gender
    editModel.birthday = player.value.birthday
    editModel.email = player.value.email
    editModel.vip_level = player.value.vip_level
    editModel.is_retention_active = player.value.is_retention_active
    showEditModal.value = true
}

const submitEdit = async () => {
    try {
        const res = await playerApi.updatePlayer(playerId, editModel, 'Admin Edit')
        if (res.code === 0) {
            message.success('更新成功')
            showEditModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (e) {
        message.error('更新失敗')
    }
}

// History Loaders & Search
const handleQuickSelect = (tab: string, type: string) => {
    const now = new Date()
    let start = new Date()
    let end = new Date()
    
    switch (type) {
        case 'today':
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
            end = now
            break
        case 'yesterday':
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0)
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59)
            break
        case 'thisWeek':
            const day = now.getDay() || 7
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1, 0, 0, 0)
            end = now
            break
        case 'lastWeek':
            const day2 = now.getDay() || 7
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day2 - 6, 0, 0, 0)
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day2, 23, 59, 59)
            break
        case 'thisMonth':
            start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
            end = now
            break
        case 'lastMonth':
            start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0)
            end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)
            break
    }
    
    const range: [number, number] = [start.getTime(), end.getTime()]
    if (tab === 'audit') auditFilter.timeRange = range
    if (tab === 'asset') assetFilter.timeRange = range
    if (tab === 'game') gameFilter.timeRange = range
}

const jumpToAssetLogs = () => {
    router.push({
        path: '/admin/asset-logs',
        query: { player_id: playerId }
    })
}

const jumpToGameLogs = () => {
    router.push({
        path: '/admin/game-logs',
        query: { player_id: playerId }
    })
}

// Columns definitions
const assetColumns = [
    { title: '時間', key: 'timestamp', width: 150, render: (row: AssetLog) => row.timestamp.replace('T', ' ').split('.')[0] },
    { title: '幣別', key: 'currency', width: 80, render: (row: AssetLog) => h(NTag, { size: 'small', type: row.currency === 'GOLD' ? 'warning' : 'info' }, { default: () => row.currency }) },
    { title: '類型', key: 'change_type', render: (row: AssetLog) => h(NTag, { size: 'small', bordered: false }, { default: () => row.change_type }) },
    { title: '金額', key: 'amount', align: 'right' as const, render: (row: AssetLog) => h('span', { class: row.amount > 0 ? 'text-green-600' : 'text-red-600' }, row.amount) },
    { title: '餘額', key: 'post_balance', align: 'right' as const }
]

const gameColumns = [
    { title: '結算時間', key: 'settle_time', width: 150, render: (row: GameLog) => row.settle_time.replace('T', ' ').split('.')[0] },
    { title: '遊戲', key: 'game_name' },
    { title: '幣別', key: 'currency', width: 80, render: (row: GameLog) => renderCurrencyIcon(row.currency) },
    { title: '投注', key: 'bet_amount', align: 'right' as const, render: (row: GameLog) => h(NSpace, { align: 'center', justify: 'end', size: 4 }, { default: () => [h('span', row.bet_amount), renderCurrencyIcon(row.currency, true)] }) },
    { title: '派彩', key: 'win_amount', align: 'right' as const, render: (row: GameLog) => h(NSpace, { align: 'center', justify: 'end', size: 4 }, { default: () => [h('span', row.win_amount), renderCurrencyIcon(row.currency, true)] }) },
    { title: '盈虧', key: 'net_amount', align: 'right' as const, render: (row: GameLog) => h(NSpace, { align: 'center', justify: 'end', size: 4 }, { default: () => [h('span', { class: row.net_amount >= 0 ? 'text-green-600' : 'text-red-600' }, row.net_amount), renderCurrencyIcon(row.currency, true)] }) }
]

const renderCurrencyIcon = (currency: string, small = false) => {
    const config: Record<string, { color: string; label: string; icon: string }> = {
        GOLD: { color: '#f0a020', label: '金', icon: '🟡' },
        SILVER: { color: '#909090', label: '銀', icon: '⚪' },
        BRONZE: { color: '#a05020', label: '銅', icon: '🟤' }
    }
    const c = config[currency] || { color: '#ccc', label: '?', icon: '❓' }
    
    if (small) {
        return h('span', { style: { color: c.color, fontSize: '12px' } }, c.icon)
    }

    return h(NTag, { size: 'small', bordered: false, style: { backgroundColor: c.color + '20', color: c.color } }, { 
        default: () => [h('span', { style: { marginRight: '4px' } }, c.icon), c.label] 
    })
}

const fetchHistory = async () => {
    if (!playerId) return
    historyLoading.value = true
    try {
        if (currentTab.value === 'asset') {
            const currency = assetFilter.currency === 'all' ? undefined : assetFilter.currency
            const res = await logApi.getLogs({ 
                player_id: playerId, 
                currency: currency || undefined, 
                change_type: assetFilter.changeType || undefined, 
                page: assetPagination.page, 
                page_size: assetPagination.pageSize 
            })
            if (res.code === 0 && res.data) {
                assetLogs.value = res.data.list
                assetPagination.itemCount = res.data.total
            }
        } else if (currentTab.value === 'game') {
            const res = await gameApi.getLogs({ 
                player_id: playerId, 
                currency: gameFilter.currency === 'all' ? undefined : gameFilter.currency, 
                game_name: gameFilter.gameName || undefined, 
                page: gamePagination.page, 
                page_size: gamePagination.pageSize 
            })
            if (res.code === 0 && res.data) {
                gameLogs.value = res.data.list
                gamePagination.itemCount = res.data.total
            }
        } else if (currentTab.value === 'audit') {
            const res = await playerApi.getAuditLogs(playerId, auditPagination.page, auditPagination.pageSize)
            if (res.code === 0 && res.data) {
                auditLogs.value = res.data.items
                auditPagination.itemCount = res.data.total
            }
        }
    } catch (e) {
        console.error('Fetch history failed', e)
    } finally {
        historyLoading.value = false
    }
}

watch(currentTab, () => {
    fetchHistory()
})

watch([assetFilter, gameFilter, auditFilter], () => {
    auditPagination.page = 1
    assetPagination.page = 1
    gamePagination.page = 1
    fetchHistory()
}, { deep: true })

const gameSummary = computed(() => {
    let bet = 0
    let win = 0
    let net = 0
    
    gameLogs.value.forEach(log => {
        let factor = 0
        if (log.currency === 'GOLD') factor = 1
        else if (log.currency === 'SILVER') factor = 0.01
        
        bet += log.bet_amount * factor
        win += log.win_amount * factor
        net += log.net_amount * factor
    })
    
    return { 
        bet: parseFloat(bet.toFixed(2)), 
        win: parseFloat(win.toFixed(2)), 
        net: parseFloat(net.toFixed(2)) 
    }
})

const handleStatusChange = () => {
    if (!player.value) return
    statusModel.status = player.value.status
    statusModel.tags = [...player.value.tags]
    statusModel.reason = ''
    statusModel.forceKick = false
    showStatusModal.value = true
}

const submitStatusChange = async () => {
    if (!statusModel.reason) {
        message.warning('請填寫異動原因')
        return
    }
    try {
        // Create an array of promises to execute
        const promises = []
        
        // Always update status
        promises.push(playerApi.updatePlayerStatus(playerId, statusModel.status, statusModel.reason, statusModel.forceKick))
        
        // Update tags if changed (simple comparison or just always update for now to keep reason sync)
        if (JSON.stringify(statusModel.tags) !== JSON.stringify(player.value?.tags)) {
             promises.push(playerApi.updatePlayer(playerId, { tags: statusModel.tags }, statusModel.reason))
        }

        const results = await Promise.all(promises)
        const allSuccess = results.every(r => r.code === 0)

        if (allSuccess) {
            message.success('更新成功')
            showStatusModal.value = false
            fetchData()
        } else {
            const errorMsg = results.find(r => r.code !== 0)?.msg || '更新失敗'
            message.error(errorMsg)
        }
    } catch (e) {
        message.error('狀態更新失敗')
    }
}

const handleAbandonBonus = () => {
    abandonReason.value = ''
    showAbandonModal.value = true
}

const submitAbandonBonus = async () => {
    if (!abandonReason.value) {
        message.warning('請填寫原因')
        return
    }
    try {
        const res = await playerApi.abandonBonus(playerId, abandonReason.value)
         if (res.code === 0) {
            message.success('已放棄獎勵')
            RolloverEngine.abandonBonus(player.value!) // Sync Mock Logic
            showAbandonModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (e) {
        message.error('操作失敗')
    }
}

const getWalletBalance = (type: string, currency?: string) => {
    if (!player.value) return 0
    const wallet = player.value.wallets.find(w => w.type === type && (!currency || w.currency === currency))
    return wallet ? wallet.balance : 0
}

const formatAmount = (val: number) => {
    return val.toLocaleString()
}


onMounted(() => {
  if (!playerId) {
    router.push('/admin/players')
    return
  }
  fetchData()
  fetchHistory()
})
</script>

<template>
  <div class="p-6" v-if="player">
    <NGrid :x-gap="12" :y-gap="12" cols="1 240:1 800:3">
      <!-- Left Column: Basic Info -->
      <NGridItem span="1">
        <NCard :title="t('player.list.basicInfo')" class="mb-4">
          <template #header-extra>
            <NSpace>
                <NButton size="small" type="primary" @click="handleEdit">{{ t('common.editInfo') }}</NButton>
                <NButton size="small" type="warning" @click="handleStatusChange">{{ t('player.list.statusManagement') }}</NButton>
                <NButton size="small" type="error" @click="openPlayerTransferModal">
                    <template #icon><NIcon><SwapHorizontalOutline /></NIcon></template>
                    玩家轉線
                </NButton>
            </NSpace>
          </template>
          <div class="flex flex-col items-center mb-6">
            <NAvatar round :size="80" class="mb-2">{{ player.username.substring(0, 1).toUpperCase() }}</NAvatar>
            <div class="text-xl font-bold">{{ player.display_name }}</div>
            <div class="text-gray-500">ID: {{ player.id }}</div>
            <NSpace class="mt-2">
                <NTag :type="player.status === 'ACTIVE' ? 'success' : 'error'">{{ player.status }}</NTag>
                <NTag v-if="player.is_online" type="success" bordered>ONLINE</NTag>
                <NTag v-else type="default" bordered>OFFLINE</NTag>
            </NSpace>
          </div>
          
          <NDescriptions :column="1" label-placement="left" bordered>
            <NDescriptionsItem label="帳號">{{ player.username }}</NDescriptionsItem>
            <NDescriptionsItem label="手機號碼">{{ player.phone || '-' }}</NDescriptionsItem>
            <NDescriptionsItem label="VIP 等級">LV.{{ player.vip_level }}</NDescriptionsItem>
            <NDescriptionsItem label="歸屬代理">
                <span v-if="player.agent_name">{{ player.agent_name }} <NTag size="tiny" :bordered="false">ID: {{ player.agent_id }}</NTag></span>
                <span v-else>-</span>
            </NDescriptionsItem>
            <NDescriptionsItem :label="t('navigation.promoCode')">{{ player.promo_code || '-' }}</NDescriptionsItem>
            <NDescriptionsItem label="自身邀請碼">{{ player.invite_code || '-' }}</NDescriptionsItem>
            <NDescriptionsItem label="註冊來源">{{ player.register_source }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.gender')">{{ player.gender ? t(`player.gender.${player.gender}`) : '-' }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.birthday')">{{ player.birthday || '-' }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.email')">{{ player.email || '-' }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.registerDate')">{{ player.register_at.split('T')[0] }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.registerIp')">{{ player.register_ip }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.lastLoginDate')">{{ player.last_login_at?.split('T')[0] || '-' }}</NDescriptionsItem>
            <NDescriptionsItem :label="t('player.list.lastLoginIp')">{{ player.last_login_ip || '-' }}</NDescriptionsItem>
          </NDescriptions>
        </NCard>
        
        <NCard title="帳號權限" size="small">
             <NDescriptions :column="1" label-placement="left">
                <NDescriptionsItem :label="t('player.list.muteStatus')">
                    <NTag :type="(player.is_muted === 'NONE' || player.is_muted === false) ? 'success' : 'error'">
                        {{ (player.is_muted === 'NONE' || player.is_muted === false) ? '正常' : t(`player.muteOptions.${player.is_muted}`) }}
                    </NTag>
                </NDescriptionsItem>
                <NDescriptionsItem :label="t('player.list.giftStatus')">
                    <NTag :type="player.is_gift_disabled ? 'error' : 'success'">{{ player.is_gift_disabled ? '開啟' : '關閉' }}</NTag>
                </NDescriptionsItem>
                <NDescriptionsItem :label="t('player.list.depositStatus')">
                    <NTag :type="player.is_deposit_disabled ? 'error' : 'success'">{{ player.is_deposit_disabled ? '開啟' : '關閉' }}</NTag>
                </NDescriptionsItem>
                <NDescriptionsItem :label="t('player.list.playStatus')">
                    <NTag :type="player.is_play_disabled ? 'error' : 'success'">{{ player.is_play_disabled ? '開啟' : '關閉' }}</NTag>
                </NDescriptionsItem>
             </NDescriptions>
        </NCard>
      </NGridItem>
      
      <!-- Right Column: Details Tabs -->
      <NGridItem span="2">
        <NCard content-style="padding: 0;">
          <NTabs v-model:value="currentTab" type="line" animated>
            <NTabPane name="wallet" :tab="t('player.list.walletMonitor')">
              <NGrid cols="2" :x-gap="12" :y-gap="12">
                 <NGridItem>
                    <NCard size="small" :title="t('player.list.depositWallet')">
                        <template #header-extra><WalletOutline class="w-5 h-5 text-blue-500" /></template>
                        <NSpace vertical size="small">
                            <NStatistic :label="t('common.goldBalance')" :value="formatAmount(getWalletBalance('CASH', 'GOLD'))">
                                <template #prefix>$ </template>
                            </NStatistic>
                            <NStatistic :label="t('common.silverBalance')" :value="formatAmount(getWalletBalance('CASH', 'SILVER'))">
                                <template #prefix>$ </template>
                            </NStatistic>
                        </NSpace>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" :title="t('player.list.activityWallet')">
                         <template #header-extra><WalletOutline class="w-5 h-5 text-orange-400" /></template>
                         <NStatistic :label="t('common.silverBalance')" :value="formatAmount(getWalletBalance('BONUS', 'SILVER'))">
                            <template #prefix>$ </template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" :title="t('player.list.gameWallet')">
                        <template #header-extra><WalletOutline class="w-5 h-5 text-yellow-800" /></template>
                        <NStatistic :label="t('common.bronzeBalance')" :value="formatAmount(getWalletBalance('GAME', 'BRONZE'))">
                            <template #prefix>$ </template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem>
                    <NCard size="small" :title="t('player.list.safeWallet')">
                        <template #header-extra><WalletOutline class="w-5 h-5 text-yellow-500" /></template>
                        <NStatistic :label="t('common.balance')" :value="formatAmount(getWalletBalance('SAFE', 'GOLD'))">
                            <template #prefix>$ </template>
                        </NStatistic>
                    </NCard>
                 </NGridItem>
                 <NGridItem class="col-span-2">
                    <NCard size="small" :title="t('player.list.rolloverMonitor')" class="mt-2">
                        <template #header-extra>
                            <NButton size="tiny" type="error" ghost @click="handleAbandonBonus">放棄獎勵</NButton>
                        </template>
                        
                        <div v-if="player.rollover_container?.status === 'ACTIVE'" class="mb-4">
                            <div class="flex justify-between text-xs text-gray-500 mb-1">
                                <span>流水監控 ({{ player.rollover_container.active_card_id }})</span>
                                <span>{{ player.rollover_container.current_wagering }} / {{ player.rollover_container.target_wagering }}</span>
                            </div>
                            <NProgress 
                                type="line" 
                                :percentage="Math.min(100, Math.round((player.rollover_container.current_wagering / player.rollover_container.target_wagering) * 100))" 
                                :color="player.rollover_container.current_wagering >= player.rollover_container.target_wagering ? '#18a058' : '#f0a020'"
                            />
                            <NGrid cols="3" class="mt-3 text-center">
                                <NGridItem>
                                    <div class="text-xs text-gray-400">當前餘額</div>
                                    <div class="text-lg font-bold">$ {{ formatAmount(player.rollover_container.lave_balance) }}</div>
                                </NGridItem>
                                <NGridItem>
                                    <div class="text-xs text-gray-400">初始金額</div>
                                    <div class="text-md">$ {{ formatAmount(player.rollover_container.start_balance) }}</div>
                                </NGridItem>
                                <NGridItem>
                                    <div class="text-xs text-gray-400">轉出上限</div>
                                    <div class="text-md">$ {{ formatAmount(player.rollover_container.cap) }}</div>
                                </NGridItem>
                            </NGrid>
                        </div>
                        <div v-else class="py-8 text-center text-gray-400">
                            <AlertCircleOutline class="w-8 h-8 mb-2 mx-auto op-50" />
                            <div>當前無進行中活動</div>
                        </div>

                        <NDivider class="my-2" />
                        
                        <div class="text-xs font-bold mb-2">待領取列表 (Queue)</div>
                        <NList size="small">
                             <NListItem v-for="card in player.bonus_queue" :key="card.id">
                                 <div class="flex justify-between items-center">
                                     <div>
                                         <NTag size="small" type="warning" class="mr-2">{{ t(`common.${card.currency.toLowerCase()}`) }}</NTag>
                                         <span class="text-xs">{{ card.id }}</span>
                                         <div class="text-xs text-gray-400">
                                            Roll: {{ card.multiplier }}x | Cap: $ {{ formatAmount(card.cap) }} | Exp: {{ card.end_time.split('T')[0] }}
                                         </div>
                                     </div>
                                     <div class="font-bold">$ +{{ formatAmount(card.lave_amount) }}</div>
                                 </div>
                             </NListItem>
                             <NListItem v-if="!player.bonus_queue?.length">
                                 <div class="text-center text-gray-400 text-xs">列表為空</div>
                             </NListItem>
                        </NList>
                    </NCard>
                 </NGridItem>
              </NGrid>
            </NTabPane>
            
            <NTabPane name="audit" :tab="t('player.list.auditHistory')">
                <div class="mb-4 flex gap-4 items-end">
                    <NFormItem label="快速切換" :show-feedback="false">
                        <NSpace>
                            <NButton size="small" @click="handleQuickSelect('audit', 'today')">本日</NButton>
                            <NButton size="small" @click="handleQuickSelect('audit', 'yesterday')">昨日</NButton>
                            <NButton size="small" @click="handleQuickSelect('audit', 'thisWeek')">本週</NButton>
                            <NButton size="small" @click="handleQuickSelect('audit', 'lastWeek')">上一週</NButton>
                            <NButton size="small" @click="handleQuickSelect('audit', 'thisMonth')">本月</NButton>
                            <NButton size="small" @click="handleQuickSelect('audit', 'lastMonth')">上個月</NButton>
                        </NSpace>
                    </NFormItem>
                    <NFormItem label="時間區間" :show-feedback="false">
                        <NDatePicker v-model:value="auditFilter.timeRange" type="daterange" clearable />
                    </NFormItem>
                    <NButton type="primary" @click="fetchHistory">查詢</NButton>
                </div>
                <NList>
                    <NListItem v-for="log in auditLogs" :key="log.id">
                        <NThing :title="log.action" :content-style="{ marginTop: '10px' }">
                            <template #description>
                                <NSpace size="small" style="margin-top: 4px">
                                    <NTag size="small" :bordered="false" type="info">{{ log.operator }}</NTag>
                                    <span class="text-xs text-gray-500">{{ log.created_at }}</span>
                                </NSpace>
                            </template>
                            <div v-if="log.old_value || log.new_value" class="text-xs text-gray-500 mb-2">
                                {{ log.old_value }} -> {{ log.new_value }}
                            </div>
                            <div>原因: {{ log.reason }}</div>
                        </NThing>
                    </NListItem>
                </NList>
                <div class="mt-4 flex justify-end">
                    <NPagination 
                        v-model:page="auditPagination.page" 
                        :item-count="auditPagination.itemCount" 
                        :page-size="auditPagination.pageSize"
                        @update:page="auditPagination.onChange"
                    />
                </div>
            </NTabPane>

            <NTabPane name="asset" :tab="t('player.list.assetHistory')">
                 <div class="mb-4 flex flex-wrap gap-4 items-end">
                    <NFormItem label="快速切換" :show-feedback="false">
                        <NSpace>
                            <NButton size="small" @click="handleQuickSelect('asset', 'today')">本日</NButton>
                            <NButton size="small" @click="handleQuickSelect('asset', 'yesterday')">昨日</NButton>
                            <NButton size="small" @click="handleQuickSelect('asset', 'thisWeek')">本週</NButton>
                            <NButton size="small" @click="handleQuickSelect('asset', 'lastWeek')">上一週</NButton>
                            <NButton size="small" @click="handleQuickSelect('asset', 'thisMonth')">本月</NButton>
                            <NButton size="small" @click="handleQuickSelect('asset', 'lastMonth')">上個月</NButton>
                        </NSpace>
                    </NFormItem>
                    <NFormItem label="幣別" :show-feedback="false">
                         <NSelect v-model:value="assetFilter.currency" :options="[{ label: '全部', value: 'all' }, ...currencyOptions]" style="width: 120px" placeholder="全部" />
                    </NFormItem>
                    <NFormItem label="變動類型" :show-feedback="false">
                         <NSelect v-model:value="assetFilter.changeType" :options="assetTypeOptions" style="width: 120px" placeholder="全部" clearable />
                    </NFormItem>
                    <NButton type="primary" @click="fetchHistory">查詢</NButton>
                    <NButton type="primary" secondary @click="jumpToAssetLogs">
                         <template #icon><SearchOutline /></template>
                         {{ t('player.list.advancedSearch') }}
                    </NButton>
                </div>
                <NDataTable 
                    remote
                    :columns="assetColumns" 
                    :data="assetLogs" 
                    :loading="historyLoading" 
                    :pagination="assetPagination"
                    size="small" 
                />
            </NTabPane>

            <NTabPane name="game" :tab="t('player.list.gameHistory')">
                <div class="mb-4 flex flex-wrap gap-4 items-end">
                    <NFormItem label="快速切換" :show-feedback="false">
                        <NSpace>
                            <NButton size="small" @click="handleQuickSelect('game', 'today')">本日</NButton>
                            <NButton size="small" @click="handleQuickSelect('game', 'yesterday')">昨日</NButton>
                            <NButton size="small" @click="handleQuickSelect('game', 'thisWeek')">本週</NButton>
                            <NButton size="small" @click="handleQuickSelect('game', 'lastWeek')">上一週</NButton>
                            <NButton size="small" @click="handleQuickSelect('game', 'thisMonth')">本月</NButton>
                            <NButton size="small" @click="handleQuickSelect('game', 'lastMonth')">上個月</NButton>
                        </NSpace>
                    </NFormItem>
                    <NFormItem label="幣別" :show-feedback="false">
                         <NSelect v-model:value="gameFilter.currency" :options="[{ label: '全部', value: 'all' }, ...currencyOptions]" style="width: 120px" />
                    </NFormItem>
                    <NFormItem label="遊戲名稱" :show-feedback="false">
                         <NInput v-model:value="gameFilter.gameName" style="width: 150px" placeholder="搜尋遊戲" clearable />
                    </NFormItem>
                    <NButton type="primary" @click="fetchHistory">查詢</NButton>
                    <NButton type="primary" secondary @click="jumpToGameLogs">
                         <template #icon><SearchOutline /></template>
                         {{ t('player.list.advancedSearch') }}
                    </NButton>
                </div>
                <div v-if="gameFilter.currency === 'all'" class="mb-4 bg-gray-50 p-4 rounded-lg flex justify-around border border-gray-100">
                    <div class="text-center">
                        <div class="text-xs text-gray-500 mb-1">轉折總投注 (Gold Unit)</div>
                        <div class="text-lg font-bold text-blue-600">{{ formatAmount(gameSummary.bet) }}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-500 mb-1">轉折總派彩 (Gold Unit)</div>
                        <div class="text-lg font-bold text-orange-600">{{ formatAmount(gameSummary.win) }}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-500 mb-1">轉折總盈虧 (Gold Unit)</div>
                        <div class="text-lg font-bold" :class="gameSummary.net >= 0 ? 'text-green-600' : 'text-red-600'">
                            {{ gameSummary.net >= 0 ? '+' : '' }}{{ formatAmount(gameSummary.net) }}
                        </div>
                    </div>
                </div>
                <NDataTable 
                    remote
                    :columns="gameColumns" 
                    :data="gameLogs" 
                    :loading="historyLoading" 
                    :pagination="gamePagination"
                    size="small" 
                />
            </NTabPane>

            <!-- Transfer Records Tab -->
            <NTabPane name="transfer" tab="轉線紀錄">
                <div v-if="transferRecords.length === 0" class="py-10 text-center text-gray-400">
                    尚無轉線紀錄
                </div>
                <NList v-else hoverable>
                    <NListItem v-for="record in transferRecords" :key="record.id">
                        <NThing>
                            <template #header>
                                <span class="font-bold">轉線排程：{{ record.id }}</span>
                                <NTag class="ml-2" size="small" :type="record.status === 'SUCCESS' ? 'success' : record.status === 'PENDING' ? 'warning' : record.status === 'CANCELED' ? 'error' : 'default'">
                                    {{ record.status }}
                                </NTag>
                            </template>
                            <template #header-extra>
                                <NButton v-if="record.status === 'PENDING'" size="small" type="error" @click="cancelTransferRecord(record.id)">取消預約</NButton>
                            </template>
                            <NDescriptions :column="2" size="small" class="mt-2">
                                <NDescriptionsItem label="原歸屬代理">{{ record.original_agent_name }} ({{ record.original_agent_id }})</NDescriptionsItem>
                                <NDescriptionsItem label="新歸屬代理">{{ record.new_agent_name }} ({{ record.new_agent_id }})</NDescriptionsItem>
                                <NDescriptionsItem label="執行類型">{{ record.execution_type === 'IMMEDIATE' ? '立即' : '排程' }}</NDescriptionsItem>
                                <NDescriptionsItem label="執行時間">{{ record.execute_at.replace('T', ' ').split('.')[0] }}</NDescriptionsItem>
                                <NDescriptionsItem label="建立時間">{{ record.created_at.replace('T', ' ').split('.')[0] }}</NDescriptionsItem>
                                <NDescriptionsItem label="異動原因">{{ record.reason }}</NDescriptionsItem>
                            </NDescriptions>
                        </NThing>
                    </NListItem>
                </NList>
            </NTabPane>
          </NTabs>
        </NCard>
      </NGridItem>
    </NGrid>
    
    <!-- Modals -->
    <NModal v-model:show="showEditModal" preset="card" title="編輯玩家資料" style="width: 500px">
        <NForm :model="editModel" label-placement="left" label-width="80">
            <NFormItem label="顯示名稱">
                <NInput v-model:value="editModel.display_name" />
            </NFormItem>
            <NFormItem label="手機號碼">
                <NInput v-model:value="editModel.phone" />
            </NFormItem>
            <NFormItem :label="t('player.list.gender')">
                <NSelect v-model:value="editModel.gender" :options="genderOptions" />
            </NFormItem>
            <NFormItem :label="t('player.list.birthday')">
                <NDatePicker v-model:formatted-value="editModel.birthday" value-format="yyyy-MM-dd" type="date" clearable />
            </NFormItem>
            <NFormItem :label="t('player.list.email')">
                 <NInput v-model:value="editModel.email" />
            </NFormItem>
            <NFormItem label="密碼">
                 <NInput v-model:value="editModel.password" type="password" show-password-on="click" placeholder="留空表示不修改密碼" clearable />
            </NFormItem>
            <NFormItem :label="t('player.list.vipLevel')">
                 <NInputNumber v-model:value="editModel.vip_level" :min="0" style="width: 100%" />
            </NFormItem>
             <NFormItem :label="t('player.list.muteStatus')">
                <NSelect v-model:value="editModel.is_muted" :options="muteOptions" />
            </NFormItem>
            <NFormItem :label="t('player.list.giftStatus')">
                <NSwitch v-model:value="editModel.is_gift_disabled" />
            </NFormItem>
            <NFormItem :label="t('player.list.depositStatus')">
                <NSwitch v-model:value="editModel.is_deposit_disabled" />
            </NFormItem>
            <NFormItem :label="t('player.list.playStatus')">
                <NSwitch v-model:value="editModel.is_play_disabled" />
            </NFormItem>
            <NFormItem :label="t('player.list.retentionCheck')">
                <NSwitch v-model:value="editModel.is_retention_active" />
            </NFormItem>
        </NForm>
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="showEditModal = false">取消</NButton>
                <NButton type="primary" @click="submitEdit">儲存</NButton>
            </div>
        </template>
    </NModal>
    
    <NModal v-model:show="showStatusModal" preset="card" title="變更帳戶狀態" style="width: 400px">
        <NForm :model="statusModel">
             <NFormItem label="狀態" required>
                 <NSelect v-model:value="statusModel.status" :options="statusOptions" />
             </NFormItem>
             <NFormItem label="強制踢線">
                <NSwitch v-model:value="statusModel.forceKick" />
                <span class="ml-2 text-xs text-gray-500">若勾選，玩家將被強制登出</span>
             </NFormItem>
             <NFormItem label="玩家標籤">
                 <NSelect v-model:value="statusModel.tags" multiple filterable tag :options="tagOptions" placeholder="選擇或輸入標籤" />
             </NFormItem>
             <NFormItem label="異動原因" required>
                 <NInput type="textarea" v-model:value="statusModel.reason" placeholder="請詳細說明原因..." />
             </NFormItem>
        </NForm>
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="showStatusModal = false">取消</NButton>
                <NButton type="primary" @click="submitStatusChange">確認變更</NButton>
            </div>
        </template>
    </NModal>

    <NModal v-model:show="showAbandonModal" preset="card" title="放棄當前獎勵" style="width: 400px">
        <div class="text-red-500 mb-4 bg-red-50 p-3 rounded">
            <AlertCircleOutline class="w-4 h-4 inline mr-1"/>
            警告：此操作將清空玩家當前活動進度與餘額，且無法復原。
        </div>
        <NInput type="textarea" v-model:value="abandonReason" placeholder="請填寫放棄原因..." />
        <template #footer>
            <div class="flex justify-end gap-2">
                <NButton @click="showAbandonModal = false">取消</NButton>
                <NButton type="error" @click="submitAbandonBonus">確認放棄</NButton>
            </div>
        </template>
    </NModal>

    <!-- Player Transfer Modal -->
    <NModal v-model:show="showPlayerTransferModal" preset="card" title="玩家轉線" style="width: 550px; border-radius: 20px;">
        <NForm :model="playerTransferForm" label-placement="left" label-width="120">
            <NDivider title-placement="left">目前歸屬</NDivider>
            <NFormItem label="當前歸屬代理">
                <div v-if="player?.agent_name" class="flex items-center gap-2">
                    <span class="font-bold">{{ player.agent_name }}</span>
                    <NTag size="small" type="info">ID: {{ player.agent_id }}</NTag>
                </div>
                <span v-else class="text-gray-400">尚無歸屬代理</span>
            </NFormItem>

            <NDivider title-placement="left">轉線設定</NDivider>
            <NFormItem label="新代理ID" required>
                <div class="flex-col w-full gap-2">
                    <div class="flex gap-2 w-full">
                        <NInput v-model:value="playerTransferForm.new_agent_id" placeholder="請輸入新的代理ID" @keydown.enter.prevent="handleSearchAgent" />
                        <NButton type="primary" :loading="searchAgentLoading" @click="handleSearchAgent">檢索</NButton>
                    </div>
                    <div v-if="searchResultName" class="text-green-600 text-sm mt-1 font-bold">
                        檢索成功：{{ searchResultName }}
                    </div>
                </div>
            </NFormItem>
            <NFormItem label="執行類型">
                <NRadioGroup v-model:value="playerTransferForm.execution_type">
                    <NRadio value="IMMEDIATE">立即轉線</NRadio>
                    <NRadio value="SCHEDULED">預定轉線</NRadio>
                </NRadioGroup>
            </NFormItem>
            <NFormItem v-if="playerTransferForm.execution_type === 'SCHEDULED'" label="預定執行時間" required>
                <NDatePicker
                    v-model:formatted-value="playerTransferForm.execute_at"
                    type="datetime"
                    clearable
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%"
                    placeholder="請選擇未來時間 (至少大於目前 10 分鐘)"
                />
            </NFormItem>
            <NFormItem label="異動原因" required>
                <NInput v-model:value="playerTransferForm.reason" type="textarea" :rows="3" placeholder="請輸入異動原因 (5-200字)" />
            </NFormItem>
        </NForm>
        <template #footer>
            <div class="flex justify-end gap-3">
                <NButton quaternary @click="showPlayerTransferModal = false">取消</NButton>
                <NButton type="primary" rounded @click="submitPlayerTransfer" :loading="playerTransferLoading" :disabled="!searchResultName">確認轉線</NButton>
            </div>
        </template>
    </NModal>
  </div>
</template>
