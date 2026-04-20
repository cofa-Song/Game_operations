<script setup lang="ts">
import { ref, reactive, onMounted, h, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NForm, NFormItem, NInput, NSelect, NButton, NDataTable, NTag, NSwitch, NModal, NCheckboxGroup, NCheckbox, NInputNumber, NGrid, NGridItem, NDatePicker, NSpace, NRadioGroup, NRadio, useMessage, DataTableColumns } from 'naive-ui'
import { SearchOutline, RefreshOutline, CreateOutline } from '@vicons/ionicons5'
import { gameListApi } from '@/api/game'
import { providerApi } from '@/api/provider'
import { configApi } from '@/api/config'
import type { Game, GameListSearchParams, GameUpdateRequest, MarketingTag, GameStatus, GameType } from '@/types/game'
import type { GameProvider } from '@/types/game'

const { t } = useI18n()
const message = useMessage()
const loading = ref(false)
const games = ref<Game[]>([])
const providers = ref<GameProvider[]>([])
const gameTypes = ref<GameType[]>([])

const searchForm = reactive<GameListSearchParams>({
    provider_id: undefined,
    type_id: undefined,
    marketing_tag: undefined,
    tag_source: undefined,
    game_id: '',
    name: '',
    status: undefined,
    date_start: undefined,
    date_end: undefined,
    page: 1,
    page_size: 20
})

// 遊戲 ID/名稱 切換
const gameSearchType = ref<'id' | 'name'>('id')
const gameSearchQuery = ref('')

// 數據粒度
const granularity = ref<'hour' | 'day' | 'month'>('day')
const granularityOptions = [
  { label: '時', value: 'hour' },
  { label: '日', value: 'day' },
  { label: '月', value: 'month' }
]

const dateRange = ref<[number, number] | null>(null)
const pendingChanges = ref<Record<string, GameStatus>>({})
const hasPendingChanges = computed(() => Object.keys(pendingChanges.value).length > 0)
const showSaveConfirmModal = ref(false)

const pagination = reactive({
    page: 1,
    pageSize: 20,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    onChange: (page: number) => {
        pagination.page = page
        searchForm.page = page
        fetchData()
    },
    onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
        searchForm.page_size = pageSize
        searchForm.page = 1
        fetchData()
    }
})

// Edit Modal
const showEditModal = ref(false)
const selectedGame = ref<Game | null>(null)
const editForm = ref<GameUpdateRequest>({
    marketing_tag: undefined,
    allowed_currencies: [],
    min_vip_level: 0,
    sort_order: 999,
    final_rate: 100,
    profit_rate: 5.0
})

const tagOptions = computed(() => [
    { label: t('game.list.tagOptions.none'), value: null as any },
    { label: t('game.list.tagOptions.hot'), value: 'HOT' as MarketingTag },
    { label: t('game.list.tagOptions.recommended'), value: 'RECOMMENDED' as MarketingTag },
    { label: t('game.list.tagOptions.double'), value: 'DOUBLE_TURNOVER' as MarketingTag }
])

// currencyOptions was unused, removed.

const providerOptions = computed(() => providers.value.map(p => ({ label: `${p.name} (${p.code})`, value: p.id })))
const statusFilterOptions = [
    { label: t('common.all'), value: undefined },
    { label: t('common.enable'), value: 'ACTIVE' as GameStatus },
    { label: t('common.disable'), value: 'DISABLED' as GameStatus },
    { label: t('game.list.maintenance'), value: 'MAINTENANCE' as GameStatus }
]

const typeOptions = computed(() => [
    { label: t('common.all'), value: undefined },
    ...gameTypes.value.map(t => ({ label: t.name, value: t.id }))
])

const columns: DataTableColumns<Game> = [
    { title: 'ID', key: 'id', width: 80, fixed: 'left' },
    { 
        title: t('game.list.vendor'), 
        key: 'provider_id', 
        width: 100,
        render: (row) => {
            const provider = providers.value.find(p => p.id === row.provider_id)
            return provider ? provider.code : row.provider_id
        }
    },
    { title: t('game.list.gameName'), key: 'name', width: 150, ellipsis: { tooltip: true } },
    {
        title: t('game.list.winRate'),
        key: 'win_rate',
        width: 100,
        render: (row) => {
            if (row.total_bet === 0) return '0.00%'
            const rtp = (row.total_payout / row.total_bet) * 100
            const color = rtp <= 100 ? 'text-green-600' : 'text-red-600'
            return h('span', { class: `font-mono font-bold ${color}` }, `${rtp.toFixed(2)}%`)
        }
    },
    { 
        title: t('game.list.cumulativeTurnover'), 
        key: 'cumulative_turnover', 
        width: 120,
        render: (row) => h('span', { class: 'font-mono text-blue-600 font-semibold' }, row.cumulative_turnover.toLocaleString())
    },
    {
        title: t('game.list.tag'),
        key: 'marketing_tag',
        width: 140,
        render: (row) => {
            if (!row.marketing_tag) return '-'
            const tagMap: Record<string, { label: string; type: 'success' | 'warning' | 'error' }> = {
                'HOT': { label: t('game.list.tagOptions.hot').split(' ')[0], type: 'error' },
                'RECOMMENDED': { label: t('game.list.tagOptions.recommended').split(' ')[0], type: 'warning' },
                'DOUBLE_TURNOVER': { label: t('game.list.tagOptions.double').split(' ')[0], type: 'success' }
            }
            const tag = tagMap[row.marketing_tag]
            return h(NTag, { type: tag.type, size: 'small' }, { default: () => tag.label })
        }
    },

    {
        title: t('game.list.effectiveTurnoverRate'),
        key: 'final_rate',
        width: 120,
        render: (row) => h('span', { class: row.final_rate > 100 ? 'text-green-600 font-bold' : 'font-mono' }, `${row.final_rate}%`)
    },
    {
        title: t('game.list.setProfitRate'),
        key: 'profit_rate',
        width: 100,
        render: (row) => h('span', { class: 'text-purple-600 font-mono font-bold' }, `${(100 - row.profit_rate).toFixed(2)}%`)
    },
    {
        title: t('game.list.enable'),
        key: 'is_enabled',
        width: 100,
        render: (row) => {
            const currentStatus = pendingChanges.value[row.id] || row.status
            const isEnabled = currentStatus !== 'DISABLED'
            return h(NSwitch, {
                value: isEnabled,
                onUpdateValue: (val: boolean) => {
                    handleStatusChange(row, val ? 'ACTIVE' : 'DISABLED')
                }
            })
        }
    },
    {
        title: t('game.list.maintenance'),
        key: 'is_maintenance',
        width: 100,
        render: (row) => {
            const currentStatus = pendingChanges.value[row.id] || row.status
            const isMaintenance = currentStatus === 'MAINTENANCE'
            const isEnabled = currentStatus !== 'DISABLED'
            return h(NSwitch, {
                value: isMaintenance,
                disabled: !isEnabled,
                onUpdateValue: (val: boolean) => {
                    handleStatusChange(row, val ? 'MAINTENANCE' : 'ACTIVE')
                }
            })
        }
    },
    {
        title: t('game.list.currency'),
        key: 'allowed_currencies',
        width: 120,
        render: (row) => {
            const labelMap: Record<string, string> = {
                'GOLD': t('common.gold'),
                'SILVER': t('common.silver'),
                'BRONZE': t('common.bronze')
            }
            return row.allowed_currencies.map(c => labelMap[c] || c).join(', ')
        }
    },
    { title: t('game.list.vip'), key: 'min_vip_level', width: 60 },
    { title: t('game.provider.sortOrder'), key: 'sort_order', width: 70 },
    {
        title: t('game.list.typeTag'),
        key: 'type_id',
        width: 120,
        render: (row) => {
            const type = gameTypes.value.find(t => t.id === row.type_id)
            return h(NTag, { size: 'small', type: 'info', bordered: false }, { default: () => type ? type.name : row.type_id })
        }
    },
    {
        title: t('common.action'),
        key: 'actions',
        width: 80,
        fixed: 'right',
        render: (row) => h(NButton, { size: 'small', secondary: true, onClick: () => handleEdit(row) }, { icon: () => h(CreateOutline) })
    }
]

const fetchData = async () => {
    loading.value = true
    pendingChanges.value = {} // Clear pending changes on fresh fetch
    
    if (dateRange.value) {
        searchForm.date_start = new Date(dateRange.value[0]).toISOString()
        searchForm.date_end = new Date(dateRange.value[1]).toISOString()
    } else {
        searchForm.date_start = undefined
        searchForm.date_end = undefined
    }

    try {
        const res = await gameListApi.getGames(searchForm)
        if (res.code === 0) {
            games.value = res.data.list
            pagination.itemCount = res.data.total
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error(t('common.error'))
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    // Default to past week
    const now = new Date()
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    dateRange.value = [lastWeek.getTime(), now.getTime()]

    const [pRes, tRes] = await Promise.all([
        providerApi.getProviders(),
        configApi.getGameTypes()
    ])
    if (pRes.code === 0) providers.value = pRes.data
    if (tRes.code === 0) gameTypes.value = tRes.data
    fetchData()
})

// 快速選擇時間
const handleQuickSelect = (type: string) => {
  const now = new Date()
  let start = new Date()
  let end = new Date()
  switch (type) {
    case 'today':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
      end = now
      break
    case 'yesterday':
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0, 0)
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999)
      break
    case 'thisWeek':
      const day = now.getDay() || 7
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1, 0, 0, 0, 0)
      end = now
      break
    case 'lastWeek':
      const day2 = now.getDay() || 7
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day2 - 6, 0, 0, 0, 0)
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day2, 23, 59, 59, 999)
      break
    case 'thisMonth':
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
      end = now
      break
    case 'lastMonth':
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)
      end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
      break
  }
  dateRange.value = [start.getTime(), end.getTime()]
}

const handleStatusChange = (row: Game, newStatus: GameStatus) => {
    if (row.status === newStatus) {
        delete pendingChanges.value[row.id]
    } else {
        pendingChanges.value[row.id] = newStatus
    }
}

const handleBatchSave = async () => {
    loading.value = true
    try {
        const promises = Object.entries(pendingChanges.value).map(([id, status]) => 
            gameListApi.updateGame(id, { status })
        )
        const results = await Promise.all(promises)
        const successCount = results.filter(r => r.code === 0).length
        
        if (successCount === results.length) {
            message.success(t('common.success'))
        } else {
            message.warning(`部分存取失敗 (${successCount}/${results.length})`)
        }
        
        showSaveConfirmModal.value = false
        fetchData()
    } catch (err) {
        message.error(t('common.error'))
    } finally {
        loading.value = false
    }
}

const handleSearch = () => {
    // 將合併欄位的值填回 searchForm
    if (gameSearchType.value === 'id') {
        searchForm.game_id = gameSearchQuery.value
        searchForm.name = ''
    } else {
        searchForm.name = gameSearchQuery.value
        searchForm.game_id = ''
    }
    searchForm.page = 1
    pagination.page = 1
    fetchData()
}

const handleEdit = (game: Game) => {
    selectedGame.value = game
    editForm.value = {
        marketing_tag: game.marketing_tag,
        allowed_currencies: game.allowed_currencies,
        min_vip_level: game.min_vip_level,
        sort_order: game.sort_order,
        final_rate: game.final_rate,
        profit_rate: game.profit_rate
    }
    showEditModal.value = true
}


const handleSubmit = async () => {
    if (!selectedGame.value) return
    
    try {
        const res = await gameListApi.updateGame(selectedGame.value.id, editForm.value)
        if (res.code === 0) {
            message.success(t('common.success'))
            showEditModal.value = false
            fetchData()
        } else {
            message.error(res.msg)
        }
    } catch (err) {
        message.error(t('common.error'))
    }
}


</script>

<template>
    <div class="p-6">
        <NCard :title="t('game.list.title')" class="mb-4">
            <NForm :model="searchForm" label-placement="left" label-width="auto" @keypress.enter="handleSearch">
              <div class="flex flex-col gap-4">
                <!-- 第一排: 遊戲搜尋 + 篩選 -->
                <div class="flex flex-wrap items-end gap-x-6 gap-y-4">
                    <NFormItem :label="t('game.list.gameName')" :show-feedback="false">
                        <div class="relative">
                            <NRadioGroup v-model:value="gameSearchType" name="gameSearchType" size="small" class="absolute -top-7 left-0 whitespace-nowrap">
                                <NRadio value="id">ID</NRadio>
                                <NRadio value="name">名稱</NRadio>
                            </NRadioGroup>
                            <NInput v-model:value="gameSearchQuery" :placeholder="gameSearchType === 'id' ? '請輸入遊戲 ID' : '請輸入遊戲名稱'" clearable style="width: 200px" />
                        </div>
                    </NFormItem>
                    <NFormItem :label="t('game.list.vendor')" :show-feedback="false">
                        <NSelect v-model:value="searchForm.provider_id" :options="providerOptions" :placeholder="t('common.all')" clearable style="width: 160px" />
                    </NFormItem>
                    <NFormItem :label="t('game.list.tag')" :show-feedback="false">
                        <NSelect v-model:value="searchForm.marketing_tag" :options="tagOptions" :placeholder="t('common.all')" clearable style="width: 140px" />
                    </NFormItem>
                    <NFormItem :label="t('game.list.typeTag')" :show-feedback="false">
                        <NSelect v-model:value="searchForm.type_id" :options="typeOptions" :placeholder="t('common.all')" clearable style="width: 140px" />
                    </NFormItem>
                    <NFormItem :label="t('common.status')" :show-feedback="false">
                        <NSelect v-model:value="searchForm.status" :options="statusFilterOptions" :placeholder="t('common.all')" clearable style="width: 120px" />
                    </NFormItem>
                </div>

                <!-- 第二排: 粒度 + 快選 + 時間 + 按鈕 -->
                <div class="flex flex-wrap items-end gap-x-6 gap-y-4">
                    <NFormItem :label="t('operationReport.granularity')" :show-feedback="false" style="width: 140px">
                        <NSelect v-model:value="granularity" :options="granularityOptions" class="bg-white/50" />
                    </NFormItem>
                    <NFormItem label="快速切換" :show-feedback="false">
                        <NSpace wrap>
                            <NButton size="small" @click="handleQuickSelect('today')">{{ t('operationReport.quickButtons.today') }}</NButton>
                            <NButton size="small" @click="handleQuickSelect('yesterday')">{{ t('operationReport.quickButtons.yesterday') }}</NButton>
                            <NButton size="small" @click="handleQuickSelect('thisWeek')">{{ t('operationReport.quickButtons.thisWeek') }}</NButton>
                            <NButton size="small" @click="handleQuickSelect('lastWeek')">{{ t('operationReport.quickButtons.lastWeek') }}</NButton>
                            <NButton size="small" @click="handleQuickSelect('thisMonth')">{{ t('operationReport.quickButtons.thisMonth') }}</NButton>
                            <NButton size="small" @click="handleQuickSelect('lastMonth')">{{ t('operationReport.quickButtons.lastMonth') }}</NButton>
                        </NSpace>
                    </NFormItem>
                    <NFormItem :label="t('game.list.dateRange')" :show-feedback="false" class="w-80">
                        <NDatePicker 
                          v-if="granularity === 'hour'"
                          v-model:value="dateRange" 
                          type="datetimerange" 
                          clearable 
                          format="yyyy-MM-dd HH:mm"
                          class="w-full bg-white/50"
                        />
                        <NDatePicker 
                          v-if="granularity === 'day'"
                          v-model:value="dateRange" 
                          type="daterange" 
                          clearable 
                          class="w-full bg-white/50"
                        />
                        <NDatePicker 
                          v-if="granularity === 'month'"
                          v-model:value="dateRange" 
                          type="monthrange" 
                          clearable 
                          class="w-full bg-white/50"
                        />
                    </NFormItem>
                    <div class="flex gap-2">
                        <NButton type="primary" @click="handleSearch" :loading="loading">
                            <template #icon><SearchOutline /></template>
                            {{ t('common.search') }}
                        </NButton>
                        <NButton secondary @click="() => { dateRange = null; fetchData() }" :loading="loading">
                            <template #icon><RefreshOutline /></template>
                            {{ t('common.all') }}
                        </NButton>
                    </div>
                </div>
              </div>
            </NForm>
        </NCard>

        <NCard>
            <div class="mb-4 flex gap-2">
                <NButton 
                    type="warning" 
                    :disabled="!hasPendingChanges" 
                    @click="showSaveConfirmModal = true"
                    :loading="loading"
                >
                    <template #icon><CreateOutline /></template>
                    {{ t('game.list.accessOperation') }}
                    <span v-if="hasPendingChanges" class="ml-1">({{ Object.keys(pendingChanges).length }})</span>
                </NButton>
            </div>
            <NDataTable
                :columns="columns"
                :data="games"
                :loading="loading"
                :pagination="pagination"
                :scroll-x="1600"
            />
        </NCard>

        <!-- Edit Modal -->
        <NModal v-model:show="showEditModal" preset="card" :title="t('game.list.editTitle')" style="width: 500px">
            <div v-if="selectedGame" class="mb-4 p-3 bg-gray-50 rounded">
                <div class="font-semibold">{{ selectedGame.name }} ({{ selectedGame.name_en }})</div>
                <div class="text-xs text-gray-500">{{ selectedGame.id }} | {{ selectedGame.provider_id }}</div>
            </div>

            <NForm :model="editForm" label-placement="left" label-width="100">
                <NFormItem :label="t('game.list.tag')">
                    <NSelect v-model:value="editForm.marketing_tag" :options="tagOptions" />
                </NFormItem>
                <NFormItem :label="t('game.list.currency')">
                    <NCheckboxGroup v-model:value="editForm.allowed_currencies">
                        <NCheckbox value="GOLD" :label="t('common.gold')" />
                        <NCheckbox value="SILVER" :label="t('common.silver')" />
                        <NCheckbox value="BRONZE" :label="t('common.bronze')" />
                    </NCheckboxGroup>
                </NFormItem>
                <NFormItem :label="t('game.list.vip')">
                    <NInputNumber v-model:value="editForm.min_vip_level" :min="0" :max="10" style="width: 100%" />
                </NFormItem>
                <NFormItem :label="t('game.list.effectiveTurnoverRate')">
                    <NInputNumber v-model:value="editForm.final_rate" :min="0" :max="1000" style="width: 100%">
                        <template #suffix>%</template>
                    </NInputNumber>
                </NFormItem>
                <NFormItem :label="t('game.list.profitRate')">
                    <NInputNumber 
                        :value="100 - (editForm.profit_rate ?? 0)" 
                        :min="0" :max="100" 
                        style="width: 100%"
                        @update:value="(v) => editForm.profit_rate = 100 - (v || 0)"
                    >
                        <template #suffix>%</template>
                    </NInputNumber>
                </NFormItem>
                <NFormItem :label="t('game.provider.sortOrder')">
                    <NInputNumber v-model:value="editForm.sort_order" :min="1" :max="999" style="width: 100%" />
                </NFormItem>
            </NForm>

            <template #footer>
                <div class="flex justify-end gap-2">
                    <NButton @click="showEditModal = false">{{ t('common.cancel') }}</NButton>
                    <NButton type="primary" @click="handleSubmit">{{ t('common.save') }}</NButton>
                </div>
            </template>
        </NModal>

        <!-- Status Batch Save Confirm -->
        <NModal
            v-model:show="showSaveConfirmModal"
            preset="dialog"
            type="warning"
            :title="t('common.warning')"
            :content="t('game.list.saveConfirm')"
            :positive-text="t('common.confirm')"
            :negative-text="t('common.cancel')"
            @positive-click="handleBatchSave"
        />
    </div>
</template>
